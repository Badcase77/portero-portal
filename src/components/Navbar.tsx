import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Noticias', path: '/noticias' },
    { name: 'Partidos', path: '/partidos' },
    { name: 'Torneos', path: '/torneos' },
    { name: 'Entrenamientos', path: '/entrenamientos' },
    { name: 'Destacados', path: '/destacados' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4",
        isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 z-10">
          <div className="font-bold text-xl md:text-2xl tracking-tight relative">
            <span className="text-primary">Fran</span>
            <span className="text-gray-800 dark:text-gray-200">Pérez</span>
            <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-md font-medium transition-all duration-200 relative group",
                isActive(link.path) 
                  ? "text-primary" 
                  : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              )}
            >
              {link.name}
              <div className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1 rounded-full bg-primary transition-all duration-300",
                isActive(link.path) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )} />
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-6 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={cn(
                "py-3 px-4 text-lg font-medium border-b border-gray-100 dark:border-gray-800",
                isActive(link.path) 
                  ? "text-primary border-primary" 
                  : "text-gray-700 dark:text-gray-300"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
