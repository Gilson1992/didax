import { useState } from "react";
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

const interestOptions = [
  { label: "Apresentação geral", value: "geral" },
  { label: "SIDUC", value: "siduc" },
  { label: "Integrações", value: "integracoes" },
  { label: "Outro", value: "outro" },
];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        product: "didax",            // ou "siduc" se você quiser separar por produto
        form_type: "presentation",   // importante pra diferenciar do demo
        name: name.trim(),
        role: role.trim() || undefined,
        municipality_uf: cityUf.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim() || undefined,
        interest: interest || undefined,
        message: message.trim() || undefined,
        hp: "",
      };

      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type") || "";
        const body = contentType.includes("application/json")
          ? JSON.stringify(await res.json())
          : await res.text();

        console.error("API ERROR", res.status, body);
        alert(`Erro ${res.status}: ${body}`);
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
                <Label htmlFor="pres-name">Nome</Label>
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
                <Label htmlFor="pres-city">Município / UF</Label>
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
                <Label htmlFor="pres-email">E-mail</Label>
                <Input
                  id="pres-email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
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
                <Label htmlFor="pres-interest">Interesse</Label>
                <Select value={interest} onValueChange={setInterest} disabled={loading}>
                  <SelectTrigger id="pres-interest">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {interestOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pres-message">Mensagem</Label>
              <Textarea
                id="pres-message"
                placeholder="Conte-nos sobre seu cenário ou dúvidas"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
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
