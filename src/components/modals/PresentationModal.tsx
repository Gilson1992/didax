import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';

interface PresentationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PresentationModal = ({ open, onOpenChange }: PresentationModalProps) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
    }, 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                <Input id="pres-name" placeholder="Seu nome completo" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pres-role">Cargo</Label>
                <Input id="pres-role" placeholder="Ex: Secretário(a) de Educação" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pres-city">Município / UF</Label>
                <Input id="pres-city" placeholder="Ex: São Paulo / SP" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pres-email">E-mail</Label>
                <Input id="pres-email" type="email" placeholder="seu@email.com" required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pres-whatsapp">WhatsApp</Label>
                <Input id="pres-whatsapp" placeholder="(00) 00000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pres-interest">Interesse</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral">Apresentação geral</SelectItem>
                    <SelectItem value="siduc">SIDUC</SelectItem>
                    <SelectItem value="integracoes">Integrações</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pres-message">Mensagem</Label>
              <Textarea id="pres-message" placeholder="Conte-nos sobre seu cenário ou dúvidas" rows={3} />
            </div>
            <Button type="submit" variant="gradient" className="w-full">
              Enviar solicitação
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
