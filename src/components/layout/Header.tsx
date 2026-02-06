import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PresentationModal } from '@/components/modals/PresentationModal';

const navLinks = [
  { label: 'Soluções', href: '/#solucoes' },
  { label: 'Como atuamos', href: '/#como-atuamos' },
  { label: 'Segurança', href: '/#seguranca' },
  { label: 'SIDUC', href: '/siduc' },
  { label: 'Contato', href: '/#contato' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-header shadow-sm' : ''
        }`}
      >
        <div className="section-container flex items-center justify-between h-16 lg:h-[72px]">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground text-sm font-extrabold">
              E
            </div>
            <span className="text-xl font-bold gradient-text tracking-tight">EEDU</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isRoute = link.href === '/siduc';
              const isActive = isRoute && location.pathname === '/siduc';

              return isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button variant="gradient" size="sm" onClick={() => setModalOpen(true)}>
              Solicitar apresentação
            </Button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground text-xs font-extrabold">
                    E
                  </div>
                  <span className="text-lg font-bold gradient-text">EEDU</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) =>
                    link.href === '/siduc' ? (
                      <Link
                        key={link.label}
                        to="/siduc"
                        onClick={() => setMobileOpen(false)}
                        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        key={link.label}
                        onClick={() => handleNavClick(link.href)}
                        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    )
                  )}
                </nav>
                <Button
                  variant="gradient"
                  onClick={() => {
                    setMobileOpen(false);
                    setModalOpen(true);
                  }}
                  className="mt-4"
                >
                  Solicitar apresentação
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <PresentationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};
