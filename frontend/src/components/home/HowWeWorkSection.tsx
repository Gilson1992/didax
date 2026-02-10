import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Settings, Users, TrendingUp } from 'lucide-react';

const steps = [
  { number: '01', title: 'Diagnóstico', desc: 'Entendemos a estrutura, os processos e os desafios da rede para mapear o cenário atual e definir prioridades.', icon: Search },
  { number: '02', title: 'Implantação', desc: 'Configuramos os módulos, integramos dados existentes e preparamos o ambiente para operação.', icon: Settings },
  { number: '03', title: 'Capacitação', desc: 'Treinamos gestores, equipes de secretaria e usuários-chave para uso autônomo e eficaz.', icon: Users },
  { number: '04', title: 'Acompanhamento', desc: 'Suporte contínuo, evolução do sistema e monitoramento de indicadores de uso e resultado.', icon: TrendingUp },
];

const StepItem = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex gap-5 sm:gap-8"
    >
      {/* Line + Circle */}
      <div className="flex flex-col items-center">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-500 flex-shrink-0 ${
            isInView ? 'gradient-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground'
          }`}
        >
          {step.number}
        </div>
        {index < steps.length - 1 && <div className="w-px flex-1 bg-border mt-3" />}
      </div>

      {/* Content */}
      <div className="pb-12 pt-1.5">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{step.desc}</p>
      </div>
    </motion.div>
  );
};

export const HowWeWorkSection = () => (
  <section id="como-atuamos" className="py-20 lg:py-28">
    <div className="section-container">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge mb-4">Processo</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-4">Como atuamos</h2>
          <p className="text-muted-foreground mt-3 max-w-md">
            Um processo estruturado para implantar com segurança e gerar resultados desde o início.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <StepItem key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);
