export const DashboardPreview = () => (
  <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
    <div className="flex" style={{ height: 'clamp(260px, 30vw, 400px)' }}>
      {/* Mini sidebar */}
      <div className="w-12 sm:w-14 bg-foreground flex-shrink-0 flex flex-col items-center py-4 gap-3">
        <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground text-[9px] font-bold">S</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2 mt-4">
          {[0, 1, 2, 3, 4].map((j) => (
            <div
              key={j}
              className={`w-5 h-5 rounded-md ${j === 0 ? 'bg-accent/30' : 'bg-primary-foreground/10'}`}
            />
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-3 sm:p-4 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-7 flex-1 max-w-[180px] rounded-md bg-muted" />
          <div className="h-7 w-7 rounded-full bg-accent/15" />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { l: 'Alunos', v: '2.847' },
            { l: 'Escolas', v: '142' },
            { l: 'Professores', v: '891' },
            { l: 'Rotas', v: '67' },
          ].map((m) => (
            <div key={m.l} className="rounded-lg bg-muted p-2">
              <p className="text-[7px] sm:text-[8px] text-muted-foreground truncate">{m.l}</p>
              <p className="text-xs sm:text-sm font-bold text-foreground">{m.v}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-lg bg-muted p-2 sm:p-3 mb-3 flex items-end gap-[3px]" style={{ height: '35%' }}>
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t gradient-primary opacity-50"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Table rows */}
        <div className="rounded-lg bg-muted overflow-hidden">
          {[0, 1, 2].map((r) => (
            <div
              key={r}
              className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 ${r > 0 ? 'border-t border-border/30' : ''}`}
            >
              <div className="w-5 h-5 rounded bg-accent/15 flex-shrink-0" />
              <div className="flex-1 h-2.5 rounded bg-border/50" />
              <div className="w-12 h-2.5 rounded bg-border/50 hidden sm:block" />
              <div className="w-10 h-2.5 rounded bg-accent/25" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
