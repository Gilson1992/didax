import { motion } from 'framer-motion';
import { Building2, School, Settings, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const personas = [
  {
    id: 'gestao',
    label: 'Gestão',
    icon: Building2,
    title: 'Secretaria de Educação',
    bullets: [
      'Visão consolidada da rede com indicadores em tempo real',
      'Controle de acesso e auditoria centralizada',
      'Relatórios para prestação de contas e planejamento',
      'Padronização de processos entre unidades',
    ],
  },
  {
    id: 'direcao',
    label: 'Direção',
    icon: School,
    title: 'Direção / Escola',
    bullets: [
      'Acompanhamento de alunos, turmas e frequência',
      'Gestão de professores e grade horária',
      'Comunicação padronizada com a secretaria',
      'Relatórios por unidade com indicadores próprios',
    ],
  },
  {
    id: 'operacao',
    label: 'Operação',
    icon: Settings,
    title: 'Transporte / Merenda',
    bullets: [
      'Controle de rotas, veículos e capacidade (transporte)',
      'Gestão de cardápios, estoque e distribuição (merenda)',
      'Processos de matrícula e alocação de vagas',
      'Registros de diário, frequência e ocorrências',
    ],
  },
  {
    id: 'usuarios',
    label: 'Usuários',
    icon: UserCheck,
    title: 'Usuários Autorizados',
    bullets: [
      'Acesso restrito a módulos pertinentes ao perfil',
      'Interface simplificada por função',
      'Consulta de informações sem risco de alteração indevida',
      'Rastreabilidade de todas as ações realizadas',
    ],
  },
];

export const PersonaTabs = () => (
  <section className="py-20 lg:py-28">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <span className="section-badge mb-4">Personas</span>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Para quem é o SIDUC?</h2>
        <p className="text-muted-foreground mt-3">
          Cada perfil acessa o que é relevante para sua função.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="gestao" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted">
            {personas.map((p) => {
              const Icon = p.icon;
              return (
                <TabsTrigger
                  key={p.id}
                  value={p.id}
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2.5 text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{p.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {personas.map((p) => (
            <TabsContent key={p.id} value={p.id}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card-elevated p-6 sm:p-8 mt-4"
              >
                <h3 className="text-lg font-semibold mb-4">{p.title}</h3>
                <ul className="space-y-3">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full gradient-primary mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  </section>
);
