import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DemoModal } from '@/components/modals/DemoModal';

export const SiducCTA = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">
            Quer ver o SIDUC aplicado ao seu contexto?
          </h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Agende uma demonstração e veja como os módulos se aplicam à realidade da sua rede.
          </p>
          <Button variant="gradient" size="lg" className="mt-8" onClick={() => setModalOpen(true)}>
            Agendar demonstração
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
      <DemoModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};
