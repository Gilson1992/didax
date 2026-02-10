import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { z } from "zod";
import { pool } from "./db";

const app = express();
app.use(helmet());
app.use(express.json({ limit: "250kb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

const leadSchema = z.object({
  product: z.string().min(2).max(30),                 // didax | siduc | eedu
  form_type: z.enum(["demo", "presentation"]),        // demo=agendar | presentation=solicitar

  name: z.string().min(2).max(120),
  role: z.string().max(120).optional().nullable(),
  municipality_uf: z.string().max(120).optional().nullable(), // "São Paulo / SP"
  email: z.string().email().max(190),
  whatsapp: z.string().max(30).optional().nullable(),

  // demo
  modules: z.array(z.string().max(50)).optional().nullable(), // ["alunos","merenda"...]
  observations: z.string().max(5000).optional().nullable(),

  // presentation
  interest: z.string().max(50).optional().nullable(), // code do select
  message: z.string().max(5000).optional().nullable(),

  utm: z.object({
    source: z.string().max(120).optional().nullable(),
    medium: z.string().max(120).optional().nullable(),
    campaign: z.string().max(120).optional().nullable(),
    term: z.string().max(120).optional().nullable(),
    content: z.string().max(120).optional().nullable()
  }).optional().nullable(),

  page_url: z.string().max(500).optional().nullable(),

  // honeypot (campo escondido; deve vir vazio)
  hp: z.string().max(200).optional().nullable()
});

function parseMunicipalityUf(municipality_uf?: string | null) {
  if (!municipality_uf) return { municipality: null as string | null, uf: null as string | null };
  const parts = municipality_uf.split("/").map((s) => s.trim());
  const municipality = parts[0] || null;
  const uf = (parts[1] || "").toUpperCase().slice(0, 2) || null;
  return { municipality, uf };
}

app.post("/api/public/leads", async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ message: "Invalid payload", errors: parsed.error.flatten() });
  }

  const data = parsed.data;

  // honeypot antispam
  if ((data.hp ?? "").trim() !== "") {
    return res.status(204).send();
  }

  const { municipality, uf } = parseMunicipalityUf(data.municipality_uf);

  const ip =
    (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    null;

  const userAgent = String(req.headers["user-agent"] || "").slice(0, 500);
  const utm = data.utm ?? {};

  // interest_id (se existir na tabela interests)
  let interestId: number | null = null;
  if (data.form_type === "presentation" && data.interest) {
    const [rows] = await pool.query<any[]>(
      `SELECT id FROM interests WHERE code = ? AND active = 1 LIMIT 1`,
      [data.interest]
    );
    interestId = rows?.[0]?.id ?? null;
  }

  // Inserir solicitação
  const [result] = await pool.query<any>(
    `INSERT INTO contact_requests
      (product, form_type, name, role, municipality, uf, email, whatsapp, interest_id,
       message, observations, page_url, utm_source, utm_medium, utm_campaign, utm_term, utm_content, ip, user_agent)
     VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?,
       ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.product,
      data.form_type,
      data.name,
      data.role ?? null,
      municipality,
      uf,
      data.email,
      data.whatsapp ?? null,
      interestId,

      data.message ?? null,
      data.observations ?? null,
      data.page_url ?? null,
      utm.source ?? null,
      utm.medium ?? null,
      utm.campaign ?? null,
      utm.term ?? null,
      utm.content ?? null,
      ip,
      userAgent
    ]
  );

  const requestId = Number(result.insertId);

  // Se for DEMO, vincular módulos (pivot)
  if (data.form_type === "demo" && Array.isArray(data.modules) && data.modules.length > 0) {
    const placeholders = data.modules.map(() => "?").join(",");
    const [mods] = await pool.query<any[]>(
      `SELECT id, code FROM modules WHERE code IN (${placeholders})`,
      data.modules
    );

    for (const m of mods) {
      await pool.query(
        `INSERT IGNORE INTO contact_request_modules (request_id, module_id) VALUES (?, ?)`,
        [requestId, m.id]
      );
    }
  }

  return res.status(201).json({ ok: true, id: requestId });
});

const port = Number(process.env.BACKEND_PORT || 3001);
app.listen(port, () => console.log(`Backend on :${port}`));
