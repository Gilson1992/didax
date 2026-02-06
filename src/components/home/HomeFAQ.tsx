import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { id: 'rede', q: 'A EEDU atende rede municipal e privada?', a: 'Nosso foco principal são redes públicas municipais, mas a plataforma pode ser adaptada para outros contextos educacionais conforme a demanda.' },
  { id: 'implantacao', q: 'Vocês fazem implantação e capacitação?', a: 'Sim. A implantação é acompanhada por nossa equipe, incluindo configuração, migração de dados e capacitação dos usuários. O processo é gradual e estruturado.' },
  { id: 'integracao', q: 'É possível integrar com sistemas existentes?', a: 'Sim. Trabalhamos com integrações e importações de dados de sistemas já utilizados pela rede, garantindo continuidade e aproveitamento de informações.' },
  { id: 'acesso', q: 'Como funciona o controle de acesso?', a: 'O sistema permite a criação de perfis com permissões específicas por módulo, unidade e função, garantindo que cada usuário acesse apenas o que é pertinente ao seu papel.' },
];

export const HomeFAQ = () => (
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
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Perguntas frequentes</h2>
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
