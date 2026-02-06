import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Utensils, ClipboardList, BookOpen, School, Users, GraduationCap } from 'lucide-react';

const center = { x: 270, y: 220 };

const nodes = [
  { id: 'merenda', label: 'Merenda', x: 270, y: 40, icon: Utensils, desc: 'Controle de cardápios, insumos e distribuição por unidade escolar.' },
  { id: 'matricula', label: 'Matrícula', x: 440, y: 110, icon: ClipboardList, desc: 'Pré-matrícula online com validação e alocação automática de vagas.' },
  { id: 'diario', label: 'Diário', x: 470, y: 270, icon: BookOpen, desc: 'Registro digital de frequência, notas e ocorrências.' },
  { id: 'escolas', label: 'Escolas', x: 380, y: 390, icon: School, desc: 'Cadastro e gestão centralizada das unidades escolares.' },
  { id: 'alunos', label: 'Alunos', x: 160, y: 390, icon: Users, desc: 'Base unificada de alunos com histórico completo.' },
  { id: 'professores', label: 'Professores', x: 70, y: 270, icon: GraduationCap, desc: 'Gestão de docentes, vínculos e alocações.' },
  { id: 'transporte', label: 'Transporte', x: 100, y: 110, icon: Bus, desc: 'Rotas, veículos, alunos transportados e monitoramento.' },
];

export const EcosystemMap = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-[540px] mx-auto" style={{ aspectRatio: '540 / 440' }}>
      {/* SVG Lines */}
      <svg viewBox="0 0 540 440" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(187 85% 43%)" />
            <stop offset="100%" stopColor="hsl(212 80% 42%)" />
          </linearGradient>
        </defs>
        {nodes.map((node) => (
          <line
            key={node.id}
            x1={center.x}
            y1={center.y}
            x2={node.x}
            y2={node.y}
            stroke="url(#line-grad)"
            className={`ecosystem-line ${activeNode === node.id ? 'active' : ''}`}
          />
        ))}
      </svg>

      {/* Center Node */}
      <div
        className="absolute gradient-primary rounded-2xl flex items-center justify-center pulse-glow z-10"
        style={{
          width: '90px',
          height: '90px',
          left: `${(center.x / 540) * 100}%`,
          top: `${(center.y / 440) * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <span className="text-primary-foreground font-bold text-base tracking-wide">SIDUC</span>
      </div>

      {/* Peripheral Nodes */}
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            className="absolute z-20 cursor-pointer"
            style={{
              left: `${(node.x / 540) * 100}%`,
              top: `${(node.y / 440) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 * i, duration: 0.4, ease: 'easeOut' }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <div
              className={`flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-xl bg-card border transition-all duration-200 ${
                activeNode === node.id
                  ? 'shadow-lg border-accent/40 scale-110'
                  : 'shadow-sm border-border/50 hover:shadow-md'
              }`}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-foreground whitespace-nowrap">
                {node.label}
              </span>
            </div>

            <AnimatePresence>
              {activeNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-30 bg-popover border border-border rounded-lg shadow-xl p-3 w-[200px]"
                >
                  <p className="text-xs text-muted-foreground leading-relaxed">{node.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
