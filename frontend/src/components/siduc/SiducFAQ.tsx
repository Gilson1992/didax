import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { id: 'fases', q: 'Dá para implantar por fases?', a: 'Sim. O SIDUC é modular e pode ser implantado de forma gradual, começando pelos módulos de maior prioridade e expandindo conforme a maturidade da rede.' },
  { id: 'integra', q: 'Integra com sistemas existentes?', a: 'Sim. Trabalhamos com importação de dados e integrações com sistemas já utilizados, garantindo continuidade e aproveitamento de informações existentes.' },
  { id: 'acesso', q: 'Quem vê o quê no sistema?', a: 'Cada usuário recebe um perfil com permissões específicas por módulo, escola e função. A secretaria gerencia centralmente quem acessa o quê.' },
  { id: 'modular', q: 'O SIDUC é modular?', a: 'Sim. Cada módulo funciona de forma integrada mas pode ser ativado independentemente, permitindo que a rede evolua no ritmo adequado.' },
];

export const SiducFAQ = () => (
  <section className="py-20 lg:py-28">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <span className="section-badge mb-4">FAQ</span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Perguntas frequentes sobre o SIDUC</h2>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-sm font-medium text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);
