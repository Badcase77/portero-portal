
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="font-bold text-xl tracking-tight">
                <span className="text-primary">Portero</span>
                <span className="text-gray-800 dark:text-gray-200">Pro</span>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Sitio oficial dedicado a compartir la trayectoria, entrenamientos y momentos destacados de un guardameta profesional.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Youtube">
                <Youtube size={18} />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: 'Inicio', path: '/' },
                { name: 'Noticias', path: '/noticias' },
                { name: 'Partidos', path: '/partidos' },
                { name: 'Torneos', path: '/torneos' },
                { name: 'Entrenamientos', path: '/entrenamientos' },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: 'Términos y Condiciones', path: '/terminos' },
                { name: 'Política de Privacidad', path: '/privacidad' },
                { name: 'Cookies', path: '/cookies' },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-lg mb-4">Boletín</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Suscríbete para recibir las últimas noticias y actualizaciones.
            </p>
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <Mail size={16} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <Input 
                  type="email" 
                  placeholder="Tu email" 
                  className="pl-10 pr-3 py-2 w-full"
                />
              </div>
              <Button>Suscribir</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} PorteroPro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
