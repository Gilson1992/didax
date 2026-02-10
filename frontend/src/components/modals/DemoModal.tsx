import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Send } from 'lucide-react';

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const moduleOptions = [
  'Transporte Escolar',
  'Escolas',
  'Alunos',
  'Professores',
  'Merenda',
  'Pré-matrícula / Matrícula',
  'Diário do Aluno',
  'Relatórios & Indicadores',
  'Usuários e Permissões',
];

export const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const toggleModule = (mod: string) => {
    setSelectedModules((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedModules([]);
      onOpenChange(false);
    }, 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                <Label htmlFor="demo-name">Nome</Label>
                <Input id="demo-name" placeholder="Seu nome completo" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-role">Cargo</Label>
                <Input id="demo-role" placeholder="Ex: Coordenador(a)" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demo-city">Município / UF</Label>
                <Input id="demo-city" placeholder="Ex: São Paulo / SP" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-email">E-mail</Label>
                <Input id="demo-email" type="email" placeholder="seu@email.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-whatsapp">WhatsApp</Label>
              <Input id="demo-whatsapp" placeholder="(00) 00000-0000" />
            </div>
            <div className="space-y-2">
              <Label>Módulos de interesse</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {moduleOptions.map((mod) => (
                  <label
                    key={mod}
                    className="flex items-center gap-2 text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Checkbox
                      checked={selectedModules.includes(mod)}
                      onCheckedChange={() => toggleModule(mod)}
                    />
                    {mod}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-obs">Observações</Label>
              <Textarea id="demo-obs" placeholder="Informações adicionais" rows={3} />
            </div>
            <Button type="submit" variant="gradient" className="w-full">
              Agendar demonstração
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
