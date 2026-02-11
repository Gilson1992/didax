import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Loader2 } from "lucide-react";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const moduleOptions = [
  { label: "Transporte Escolar", code: "transporte_escolar" },
  { label: "Escolas", code: "escolas" },
  { label: "Alunos", code: "alunos" },
  { label: "Professores", code: "professores" },
  { label: "Merenda", code: "merenda" },
  { label: "Pré-matrícula / Matrícula", code: "pre_matricula_matricula" },
  { label: "Diário do Aluno", code: "diario_do_aluno" },
  { label: "Relatórios & Indicadores", code: "relatorios_indicadores" },
  { label: "Usuários e Permissões", code: "usuarios_permissoes" },
];

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

function friendlyApiError(status: number, bodyText: string) {

  try {
    const parsed = JSON.parse(bodyText);
    const fieldErrors = parsed?.errors?.fieldErrors;

    if (fieldErrors?.email?.[0]) return "Informe um e-mail válido (ex: nome@dominio.com).";
    if (parsed?.message && typeof parsed.message === "string") return parsed.message;
  } catch {}

  if (status === 422) return "Verifique os campos e tente novamente.";
  return `Erro ${status}. Tente novamente.`;
}

export const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  // campos do form
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [cityUf, setCityUf] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [obs, setObs] = useState("");

  const toggleModule = (code: string) => {
    setSelectedModules((prev) =>
      prev.includes(code) ? prev.filter((m) => m !== code) : [...prev, code]
    );
  };

  const resetForm = () => {
    setSelectedModules([]);
    setName("");
    setRole("");
    setCityUf("");
    setEmail("");
    setWhatsapp("");
    setObs("");
  };

  const emailOk = useMemo(() => isValidEmail(email), [email]);
  const canSubmit = useMemo(() => {
    return (
      !loading &&
      name.trim().length > 0 &&
      cityUf.trim().length > 0 &&
      emailOk &&
      selectedModules.length > 0
    );
  }, [loading, name, cityUf, emailOk, selectedModules.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return alert("Informe seu nome.");
    if (!cityUf.trim()) return alert("Informe Município / UF.");
    if (!emailOk) return alert("Informe um e-mail válido (ex: nome@dominio.com).");
    if (selectedModules.length === 0) return alert("Selecione ao menos 1 módulo.");

    try {
      setLoading(true);

      const payload = {
        product: "didax",
        form_type: "demo",
        name: name.trim(),
        role: role.trim() || undefined,
        municipality_uf: cityUf.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim() || undefined,
        modules: selectedModules,
        observations: obs.trim() || undefined,
        hp: "",
      };

      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type") || "";
        const bodyText = contentType.includes("application/json")
          ? JSON.stringify(await res.json())
          : await res.text();

        console.error("API ERROR", res.status, bodyText);
        alert(friendlyApiError(res.status, bodyText));
        return;
      }

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        resetForm();
        onOpenChange(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Falha de rede ao enviar. Veja o console (F12).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setSubmitted(false);
          setLoading(false);
        }
        onOpenChange(v);
      }}
    >
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Agendar demonstração</DialogTitle>
          <DialogDescription>
            Preencha os dados e escolha os módulos de interesse.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <Send className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-lg font-semibold">Obrigado!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Agendaremos sua demonstração em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demo-name">Nome *</Label>
                <Input
                  id="demo-name"
                  placeholder="Seu nome completo"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-role">Cargo</Label>
                <Input
                  id="demo-role"
                  placeholder="Ex: Coordenador(a)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demo-city">Município / UF *</Label>
                <Input
                  id="demo-city"
                  placeholder="Ex: São Paulo / SP"
                  required
                  value={cityUf}
                  onChange={(e) => setCityUf(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-email">E-mail *</Label>
                <Input
                  id="demo-email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                {!emailOk && email.trim().length > 0 ? (
                  <p className="text-xs text-destructive">Informe um e-mail válido.</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-whatsapp">WhatsApp</Label>
              <Input
                id="demo-whatsapp"
                placeholder="(00) 00000-0000"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label>Módulos de interesse *</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {moduleOptions.map((opt) => (
                  <label
                    key={opt.code}
                    className="flex items-center gap-2 text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Checkbox
                      checked={selectedModules.includes(opt.code)}
                      onCheckedChange={() => toggleModule(opt.code)}
                      disabled={loading}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              {selectedModules.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Selecione ao menos 1 módulo.
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-obs">Observações</Label>
              <Textarea
                id="demo-obs"
                placeholder="Informações adicionais"
                rows={3}
                value={obs}
                onChange={(e) => setObs(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              disabled={!canSubmit}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Agendar demonstração"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
