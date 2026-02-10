import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { PresentationModal } from '@/components/modals/PresentationModal';
import heroBg from '@/assets/didax-hero-bg.png';

const bullets = [
  'Uma fonte única de verdade da rede',
  'Alertas e priorização por risco',
  'Painéis por escola, turma e aluno',
  'Auditoria, segurança e LGPD',
];

export const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBg})`, backgroundPosition: 'center 10%' }}>
      <div className="absolute inset-0 bg-background/40" />
      <div className="section-container">
        <div className="relative z-10 max-w-2xl">
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
              Da escola à gestão:{' '}
              <span className="gradient-text">rotinas organizadas, gestão com visão</span>
            </h1>

            <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl">
              A DIDAX conecta pessoas e dados para simplificar a operação e ampliar a visão estratégica, com dashboards e alertas que ajudam a agir antes que o problema cresça.
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
        </div>
      </div>

      <PresentationModal open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};
