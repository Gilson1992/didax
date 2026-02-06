import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import eeduLogo from '@/assets/eedu-logo.png';

export const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="section-container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
          <div className="flex items-center mb-4">
            <img src={eeduLogo} alt="EEDU" className="h-10 brightness-0 invert" />
          </div>
          <p className="text-sm opacity-60 leading-relaxed max-w-[240px]">
            Gestão integrada para a educação acontecer.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold mb-4 uppercase tracking-widest opacity-40">Soluções</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/siduc" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
                SIDUC
              </Link>
            </li>
            <li>
              <span className="text-sm opacity-60">Integrações & Dados</span>
            </li>
            <li>
              <span className="text-sm opacity-60">Dashboards & Indicadores</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold mb-4 uppercase tracking-widest opacity-40">Empresa</h4>
          <ul className="space-y-3">
            <li>
              <span className="text-sm opacity-60">Sobre a EEDU</span>
            </li>
            <li>
              <span className="text-sm opacity-60">Como atuamos</span>
            </li>
            <li>
              <span className="text-sm opacity-60">Segurança</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold mb-4 uppercase tracking-widest opacity-40">Contato</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm opacity-60">
              <Mail className="w-4 h-4 flex-shrink-0" /> contato@eedu.com.br
            </li>
            <li className="flex items-center gap-2 text-sm opacity-60">
              <Phone className="w-4 h-4 flex-shrink-0" /> (11) 0000-0000
            </li>
            <li className="flex items-center gap-2 text-sm opacity-60">
              <MapPin className="w-4 h-4 flex-shrink-0" /> São Paulo, SP
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs opacity-40">© 2024 EEDU. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <button className="text-xs opacity-40 hover:opacity-70 transition-opacity">Privacidade</button>
          <button className="text-xs opacity-40 hover:opacity-70 transition-opacity">Termos de Uso</button>
        </div>
      </div>
    </div>
  </footer>
);
