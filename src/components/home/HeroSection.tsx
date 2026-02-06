import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EcosystemMap } from './EcosystemMap';
import { PresentationModal } from '@/components/modals/PresentationModal';

const bullets = [
  'Integração de dados e rotinas',
  'Padronização por rede e unidade',
  'Indicadores para acompanhamento',
  'Segurança e governança',
];

export const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="section-badge mb-6">
              <span className="w-1.5 h-1.5 rounded-full gradient-primary" />
              Gestão educacional inteligente
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.15] tracking-tight text-foreground">
              Do operacional ao estratégico —{' '}
              <span className="gradient-text">em uma só plataforma.</span>
            </h1>

            <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Da escola à gestão: automação que libera tempo e fortalece a decisão.
            </p>

            <ul className="mt-6 space-y-3">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="gradient" size="lg" onClick={() => setModalOpen(true)}>
                Solicitar apresentação
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/siduc">
                  Conhecer o SIDUC
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="hidden md:block"
          >
            <EcosystemMap />
          </motion.div>
        </div>
      </div>

      <PresentationModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};
