import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bus, School, Users, Utensils, ClipboardList,
  BookOpen, BarChart3, FileText, Search, CreditCard, DatabaseZap, BookMarked,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'operacao', label: 'Operação' },
  { id: 'academico', label: 'Acadêmico' },
  { id: 'gestao', label: 'Gestão' },
];

const modules = [
  { id: 'transporte', category: 'operacao', title: 'Transporte', icon: Bus, shortDesc: 'Gestão de rotas, veículos e alunos transportados.', details: 'Cadastro de rotas, pontos de parada, veículos e motoristas. Vinculação de alunos, controle de capacidade e monitoramento de uso.', benefits: ['Redução de custos operacionais', 'Rastreabilidade por aluno', 'Relatórios de uso e cobertura'] },
  { id: 'escolas', category: 'gestao', title: 'Escolas', icon: School, shortDesc: 'Cadastro e gestão centralizada das unidades.', details: 'Cadastro de unidades com dados físicos, administrativos e pedagógicos. Gestão por distrito e rede.', benefits: ['Visão consolidada da rede', 'Dados atualizados por unidade', 'Gestão por distrito'] },
  { id: 'alunos', category: 'academico', title: 'Alunos', icon: Users, shortDesc: 'Base unificada com histórico completo.', details: 'Cadastro centralizado de alunos com dados pessoais, responsáveis, histórico escolar e vínculos.', benefits: ['Eliminação de duplicidades', 'Histórico completo', 'Busca rápida e filtros'] },
  { id: 'servidores', category: 'gestao', title: 'Servidores', icon: CreditCard, shortDesc: 'Gestão de servidores da rede educacional.', details: 'Cadastro de servidores com dados funcionais, vínculos por escola e função, controle de lotação e movimentação.', benefits: ['Controle de vínculos', 'Gestão de lotação', 'Relatórios de distribuição'] },
  { id: 'merenda', category: 'operacao', title: 'Merenda', icon: Utensils, shortDesc: 'Cardápios, insumos e distribuição.', details: 'Planejamento de cardápios, controle de estoque e distribuição por escola. Registro de consumo e relatórios.', benefits: ['Padronização de cardápios', 'Controle de estoque', 'Relatórios nutricionais'] },
  { id: 'pre-matricula', category: 'academico', title: 'Pré-matrícula', icon: ClipboardList, shortDesc: 'Pré-matrícula online com validação.', details: 'Processo de pré-matrícula digital com validação de documentos, alocação por critérios e acompanhamento de vagas.', benefits: ['Redução de filas', 'Alocação automática', 'Transparência no processo'] },
  { id: 'educasenso', category: 'gestao', title: 'EducaSenso', icon: DatabaseZap, shortDesc: 'Integração e preparação de dados para o Censo Escolar.', details: 'Exportação e validação de dados para o Censo Escolar (INEP). Verificação de consistência e correção de divergências antes do envio.', benefits: ['Conformidade com o INEP', 'Validação automática de dados', 'Redução de erros no envio'] },
  { id: 'diario-classe', category: 'academico', title: 'Diário de Classe', icon: BookOpen, shortDesc: 'Frequência, notas e registros por turma.', details: 'Registro digital de frequência, notas, conteúdos ministrados e observações pedagógicas por turma e disciplina.', benefits: ['Eliminação de diários em papel', 'Dados em tempo real', 'Histórico pedagógico'] },
  { id: 'relatorios', category: 'gestao', title: 'Relatórios e Indicadores', icon: BarChart3, shortDesc: 'Painéis e relatórios para gestão.', details: 'Dashboards interativos e relatórios configuráveis com indicadores de desempenho, uso e cobertura.', benefits: ['Visão em tempo real', 'Relatórios exportáveis', 'Indicadores personalizáveis'] },
  { id: 'auditoria', category: 'gestao', title: 'Auditoria', icon: FileText, shortDesc: 'Rastreabilidade de ações no sistema.', details: 'Registro automático de todas as operações sensíveis com identificação de usuário, data e hora.', benefits: ['Conformidade e governança', 'Rastreabilidade completa', 'Relatórios de auditoria'] },
  { id: 'caderneta', category: 'academico', title: 'Caderneta Eletrônica', icon: BookMarked, shortDesc: 'Acompanhamento individual do aluno.', details: 'Caderneta digital com registro de desempenho, frequência, observações e comunicação com responsáveis por aluno.', benefits: ['Acompanhamento individualizado', 'Comunicação com famílias', 'Registro contínuo'] },
];

export const ModuleExplorer = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('todos');
  const [selectedModule, setSelectedModule] = useState<typeof modules[0] | null>(null);

  const filtered = useMemo(() => {
    return modules.filter((m) => {
      const matchesCategory = category === 'todos' || m.category === category;
      const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.shortDesc.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <section id="modulos" className="py-20 lg:py-28 bg-muted/40">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="section-badge mb-4">Módulos</span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-4">Explore os módulos do SIDUC</h2>
          <p className="text-muted-foreground mt-3">Filtre por categoria ou busque pelo nome.</p>
        </motion.div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar módulo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  category === c.id
                    ? 'gradient-primary text-primary-foreground shadow-sm'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((m) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="card-elevated p-5 cursor-pointer"
                  onClick={() => setSelectedModule(m)}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5 text-sm">{m.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{m.shortDesc}</p>
                  <span className="inline-block mt-3 text-xs font-medium text-accent">Ver mais →</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm mt-8">Nenhum módulo encontrado.</p>
        )}

        {/* Module Detail Dialog */}
        <Dialog open={!!selectedModule} onOpenChange={() => setSelectedModule(null)}>
          <DialogContent className="sm:max-w-[480px]">
            {selectedModule && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <selectedModule.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <DialogTitle className="text-lg font-bold">{selectedModule.title}</DialogTitle>
                  </div>
                  <DialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {selectedModule.details}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-3">Benefícios</h4>
                  <ul className="space-y-2">
                    {selectedModule.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full gradient-primary mt-1.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
