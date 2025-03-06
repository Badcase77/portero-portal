
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-hero-pattern">
        <div 
          className={cn(
            "absolute inset-0 bg-center bg-cover transition-opacity duration-1000",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2362&auto=format&fit=crop&ixlib=rb-4.0.3')",
            backgroundPosition: "center 30%",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <span className={cn(
          "inline-block py-1 px-3 rounded-full bg-primary/90 text-white text-xs font-medium mb-6 tracking-wider backdrop-blur-sm",
          isLoaded ? "animate-fade-in" : "opacity-0"
        )}>
          PORTERO PROFESIONAL
        </span>

        <h1 className={cn(
          "text-4xl md:text-5xl lg:text-7xl font-bold mb-6 max-w-4xl leading-tight",
          isLoaded ? "animate-slide-up" : "opacity-0"
        )}
          style={{ animationDelay: "200ms" }}
        >
          Fran Pérez
        </h1>

        <p className={cn(
          "text-lg md:text-xl max-w-2xl mb-8 text-gray-100",
          isLoaded ? "animate-slide-up" : "opacity-0"
        )}
          style={{ animationDelay: "400ms" }}
        >
          Descubre el mundo de Fran Pérez, guardameta de élite, sus entrenamientos, partidos y momentos destacados a lo largo de su carrera profesional.
        </p>

        <div className={cn(
          "flex flex-wrap gap-4 justify-center",
          isLoaded ? "animate-slide-up" : "opacity-0"
        )}
          style={{ animationDelay: "600ms" }}
        >
          <Button size="lg" className="text-md font-medium">
            Ver Últimos Partidos
          </Button>
          <Button size="lg" variant="outline" className="text-md font-medium bg-white/10 backdrop-blur-sm hover:bg-white/20">
            Destacados
          </Button>
        </div>

        {/* Scroll down indicator */}
        <div 
          className={cn(
            "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer",
            isLoaded ? "animate-fade-in animate-bounce-subtle" : "opacity-0"
          )}
          onClick={scrollToContent}
          style={{ animationDelay: "800ms" }}
        >
          <span className="text-sm mb-2">Descubre más</span>
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
