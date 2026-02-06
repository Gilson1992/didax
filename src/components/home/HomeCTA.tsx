import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PresentationModal } from '@/components/modals/PresentationModal';

export const HomeCTA = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="contato" className="py-20 lg:py-28 bg-muted/40">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">Vamos conversar sobre o seu cenário?</h2>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Solicite uma apresentação e receba um direcionamento inicial sobre módulos, implantação e próximos passos.
          </p>
          <Button variant="gradient" size="lg" className="mt-8" onClick={() => setModalOpen(true)}>
            Solicitar apresentação
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
      <PresentationModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};
