import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Plug, BarChart3, Rocket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const solutions = [
  {
    id: 'siduc',
    title: 'SIDUC',
    desc: 'Sistema integrado para gestão do ecossistema educacional. Transporte, escolas, alunos, professores, merenda e mais — conectados.',
    icon: LayoutGrid,
    featured: true,
  },
  {
    id: 'integracoes',
    title: 'Integrações & Dados',
    desc: 'Conexão com bases de dados existentes, importação e padronização de informações da rede.',
    icon: Plug,
  },
  {
    id: 'dashboards',
    title: 'Dashboards & Indicadores',
    desc: 'Painéis para acompanhamento de desempenho, uso e gestão consolidada da rede.',
    icon: BarChart3,
  },
  {
    id: 'implantacao',
    title: 'Implantação & Evolução',
    desc: 'Diagnóstico, configuração, capacitação e acompanhamento contínuo com a sua equipe.',
    icon: Rocket,
  },
];

export const SolutionsSection = () => (
  <section id="solucoes" className="py-20 lg:py-28 bg-muted/40">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <span className="section-badge mb-4">Soluções</span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Como a EEDU atua</h2>
        <p className="text-muted-foreground mt-3">
          Soluções complementares para diferentes estágios de maturidade da gestão.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {solutions.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`card-elevated p-7 flex flex-col ${
                s.featured ? 'md:col-span-2 border-accent/20 bg-gradient-to-br from-card to-accent/[0.03]' : ''
              }`}
            >
              <div className="flex items-start gap-5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    s.featured ? 'gradient-primary' : 'bg-muted'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${s.featured ? 'text-primary-foreground' : 'text-primary'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                    {s.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary/15 text-secondary border border-secondary/20">
                        DESTAQUE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  {s.featured && (
                    <Button variant="gradient" size="sm" className="mt-5" asChild>
                      <Link to="/siduc">
                        Ver detalhes do SIDUC
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
