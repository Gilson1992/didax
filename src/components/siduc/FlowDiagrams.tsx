import { motion } from 'framer-motion';
import { ClipboardList, Bus, Utensils, ArrowRight } from 'lucide-react';

const flows = [
  {
    title: 'Matrícula',
    icon: ClipboardList,
    steps: ['Pré-matrícula', 'Validação', 'Alocação', 'Acompanhamento'],
  },
  {
    title: 'Transporte',
    icon: Bus,
    steps: ['Cadastro de rotas', 'Ajustes', 'Monitoramento'],
  },
  {
    title: 'Merenda',
    icon: Utensils,
    steps: ['Registros', 'Consolidação', 'Relatórios'],
  },
];

export const FlowDiagrams = () => (
  <section className="py-20 lg:py-28 bg-muted/40">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <span className="section-badge mb-4">Fluxos</span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Fluxos integrados</h2>
        <p className="text-muted-foreground mt-3">
          Processos estruturados do início ao acompanhamento.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {flows.map((flow, i) => {
          const Icon = flow.icon;
          return (
            <motion.div
              key={flow.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-elevated p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{flow.title}</h3>
              </div>

              {/* Flow steps */}
              <div className="flex flex-wrap items-center gap-2">
                {flow.steps.map((step, j) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-foreground whitespace-nowrap">
                      {step}
                    </div>
                    {j < flow.steps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
