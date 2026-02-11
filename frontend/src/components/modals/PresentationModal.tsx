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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Loader2 } from "lucide-react";

interface PresentationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export const PresentationModal = ({ open, onOpenChange }: PresentationModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [cityUf, setCityUf] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [interest, setInterest] = useState<string>("");
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setName("");
    setRole("");
    setCityUf("");
    setEmail("");
    setWhatsapp("");
    setInterest("");
    setMessage("");
  };

  const emailOk = useMemo(() => isValidEmail(email), [email]);

  const canSubmit = useMemo(() => {
    return (
      !loading &&
      name.trim().length > 0 &&
      cityUf.trim().length > 0 &&
      emailOk &&
      interest.trim().length > 0 &&
      message.trim().length > 0
    );
  }, [loading, name, cityUf, emailOk, interest, message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return alert("Informe seu nome.");
    if (!cityUf.trim()) return alert("Informe Município / UF.");
    if (!emailOk) return alert("Informe um e-mail válido (ex: nome@dominio.com).");
    if (!interest) return alert("Selecione o interesse.");
    if (!message.trim()) return alert("Escreva uma mensagem.");

    try {
      setLoading(true);

      const payload = {
        product: "didax",
        form_type: "presentation",
        name: name.trim(),
        role: role.trim() || undefined,
        municipality_uf: cityUf.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim() || undefined,
        interest,
        message: message.trim(),
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
          <DialogTitle className="text-xl font-bold">Solicitar apresentação</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo e nossa equipe entrará em contato.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <Send className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="text-lg font-semibold">Obrigado!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Recebemos sua solicitação. Retornaremos em breve.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pres-name">Nome *</Label>
                <Input
                  id="pres-name"
                  placeholder="Seu nome completo"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pres-role">Cargo</Label>
                <Input
                  id="pres-role"
                  placeholder="Ex: Secretário(a) de Educação"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pres-city">Município / UF *</Label>
                <Input
                  id="pres-city"
                  placeholder="Ex: São Paulo / SP"
                  required
                  value={cityUf}
                  onChange={(e) => setCityUf(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pres-email">E-mail *</Label>
                <Input
                  id="pres-email"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pres-whatsapp">WhatsApp</Label>
                <Input
                  id="pres-whatsapp"
                  placeholder="(00) 00000-0000"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pres-interest">Interesse *</Label>
                <Select value={interest} onValueChange={setInterest} disabled={loading}>
                  <SelectTrigger id="pres-interest">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral">Apresentação geral</SelectItem>
                    <SelectItem value="siduc">SIDUC</SelectItem>
                    <SelectItem value="integracoes">Integrações</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                {!interest ? (
                  <p className="text-xs text-muted-foreground">Selecione uma opção.</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pres-message">Mensagem *</Label>
              <Textarea
                id="pres-message"
                placeholder="Conte-nos sobre seu cenário ou dúvidas"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
                "Enviar solicitação"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
