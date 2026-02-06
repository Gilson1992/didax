import { motion } from 'framer-motion';
import { Shield, FileText, Lock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const pillars = [
  { icon: Shield, title: 'Controle de acesso', desc: 'Perfis granulares com permissões por módulo, unidade e função.' },
  { icon: FileText, title: 'Auditoria', desc: 'Registro de ações críticas com rastreabilidade completa.' },
  { icon: Lock, title: 'LGPD e boas práticas', desc: 'Tratamento de dados conforme legislação vigente.' },
];

const accordionItems = [
  { id: 'acesso', title: 'Como funciona o controle de acesso?', content: 'Cada usuário recebe um perfil com permissões específicas por módulo, escola e função. A gestão de acessos é centralizada pela secretaria, garantindo que cada pessoa acesse apenas o que é pertinente ao seu papel.' },
  { id: 'auditoria', title: 'Quais ações são auditadas?', content: 'Todas as operações sensíveis — criação, edição, exclusão e exportação de dados — são registradas com identificação de usuário, data e hora. Isso permite rastreabilidade completa e análise de conformidade.' },
  { id: 'lgpd', title: 'Como vocês tratam dados pessoais?', content: 'Seguimos as diretrizes da LGPD com criptografia, controle de acesso e políticas de retenção de dados. Dados pessoais de alunos e responsáveis são protegidos com camadas adicionais de segurança.' },
];

export const SecuritySection = () => (
  <section id="seguranca" className="py-20 lg:py-28 bg-muted/40">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <span className="section-badge mb-4">Segurança</span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Segurança e Governança</h2>
        <p className="text-muted-foreground mt-3">
          Proteção de dados, controle de acesso e rastreabilidade como pilares fundamentais.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {pillars.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-elevated p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {accordionItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-sm font-medium text-left">{item.title}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);
