import { motion } from 'framer-motion';
import { Database, Shuffle, EyeOff, RefreshCcw } from 'lucide-react';

const challenges = [
  { icon: Database, title: 'Dados dispersos', desc: 'Informações espalhadas em planilhas, sistemas isolados e documentos sem integração.' },
  { icon: Shuffle, title: 'Rotinas críticas sem fluxo', desc: 'Processos operando sem padronização, com retrabalho e perda de informação.' },
  { icon: EyeOff, title: 'Pouca visibilidade gerencial', desc: 'Gestores sem indicadores confiáveis para decisão e acompanhamento da rede.' },
  { icon: RefreshCcw, title: 'Esforço alto para manter', desc: 'Operações manuais consumindo tempo em atividades que poderiam ser automatizadas.' },
];

export const ChallengesSection = () => (
  <section className="py-20 lg:py-28 bg-muted/40">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <span className="section-badge mb-4">Desafios</span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">O cenário que a gestão educacional enfrenta</h2>
        <p className="text-muted-foreground mt-3">
          Problemas comuns que limitam a eficiência e a visão estratégica da rede.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {challenges.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-elevated p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
