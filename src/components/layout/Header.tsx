import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import didaxLogo from '@/assets/didax-logo.png';
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
        <div className="section-container flex items-center gap-8 h-16 lg:h-[72px]">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={didaxLogo} alt="DIDAX" className="h-12" />
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

          <div className="hidden lg:block ml-auto">
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
                <Link to="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                  <img src={didaxLogo} alt="DIDAX" className="h-11" />
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
