import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, RefreshCcw, EyeOff, Shuffle, Link2, Shield, BarChart3, Check } from 'lucide-react';

const beforeItems = [
  { icon: Layers, title: 'Sistemas isolados', desc: 'Dados espalhados em planilhas e ferramentas sem conexão.' },
  { icon: RefreshCcw, title: 'Retrabalho constante', desc: 'Informações duplicadas e processos manuais repetitivos.' },
  { icon: EyeOff, title: 'Baixa rastreabilidade', desc: 'Sem histórico confiável de alterações e decisões.' },
  { icon: Shuffle, title: 'Visão fragmentada', desc: 'Gestores sem indicadores consolidados da rede.' },
];

const afterItems = [
  { icon: Link2, title: 'Integração real', desc: 'Um ecossistema conectando todas as rotinas da rede.' },
  { icon: Check, title: 'Padronização', desc: 'Processos e dados estruturados por unidade e rede.' },
  { icon: BarChart3, title: 'Visão completa', desc: 'Indicadores consolidados para decisão e acompanhamento.' },
  { icon: Shield, title: 'Rastreabilidade', desc: 'Histórico completo com auditoria e controle de acesso.' },
];

export const BeforeAfterSection = () => {
  const [view, setView] = useState<'before' | 'after'>('before');
  const items = view === 'before' ? beforeItems : afterItems;

  return (
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="section-badge mb-4">Transformação</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-4">Do cenário atual à gestão integrada</h2>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex rounded-full bg-muted p-1">
            <button
              onClick={() => setView('before')}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                view === 'before' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Antes
            </button>
            <button
              onClick={() => setView('after')}
              className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                view === 'after' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              Depois
            </button>
            <motion.div
              className="absolute top-1 bottom-1 rounded-full gradient-primary"
              animate={{
                left: view === 'before' ? '4px' : '50%',
                width: 'calc(50% - 4px)',
              }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {items.map((item) => {
              const Icon = item.icon;
              const isAfter = view === 'after';
              return (
                <div
                  key={item.title}
                  className={`card-elevated p-6 ${isAfter ? 'border-accent/20' : ''}`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                      isAfter ? 'gradient-primary' : 'bg-muted'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isAfter ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-lg sm:text-xl font-semibold gradient-text max-w-xl mx-auto">
            "Integração, padronização e visão — para a gestão acontecer com consistência."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
