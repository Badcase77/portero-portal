
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import NewsList from "@/components/NewsList";
import MatchCard from "@/components/MatchCard";
import HighlightCard from "@/components/HighlightCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample match data
const upcomingMatches = [
  {
    id: "1",
    homeTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    awayTeam: {
      name: "Real Madrid",
      logo: "https://logodownload.org/wp-content/uploads/2018/07/real-madrid-logo.png",
    },
    date: "2023-12-15",
    time: "20:00",
    venue: "Camp Nou, Barcelona",
    competition: "LaLiga",
  },
  {
    id: "2",
    homeTeam: {
      name: "Atlético Madrid",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/atletico-madrid-logo.png",
    },
    awayTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    date: "2023-12-22",
    time: "18:30",
    venue: "Wanda Metropolitano, Madrid",
    competition: "LaLiga",
  },
];

// Sample highlights data
const highlights = [
  {
    id: "1",
    title: "Triple parada contra el Real Madrid",
    description: "Secuencia increíble de tres paradas consecutivas que salvaron el partido en el último minuto.",
    date: "2023-10-28",
    thumbnailUrl: "https://images.unsplash.com/photo-1519766304817-4f37bda74b38?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    videoUrl: "#",
    views: 15420,
    likes: 1250,
    duration: "2:15",
    category: "Partidos"
  },
  {
    id: "2",
    title: "Penalti atajado en la final de copa",
    description: "Momento decisivo del torneo con una parada espectacular que dio el trofeo al equipo.",
    date: "2023-09-15",
    thumbnailUrl: "https://images.unsplash.com/photo-1550656398-8cda9d21fe3b?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    videoUrl: "#",
    views: 20325,
    likes: 1800,
    duration: "1:45",
    category: "Torneos"
  },
  {
    id: "3",
    title: "Rutina de entrenamiento de reflejos",
    description: "Entrenamiento especializado para mejorar los tiempos de reacción ante disparos rápidos.",
    date: "2023-11-02",
    thumbnailUrl: "https://images.unsplash.com/photo-1644157463080-19ef59870914?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    videoUrl: "#",
    views: 8740,
    likes: 950,
    duration: "5:30",
    category: "Entrenamientos"
  }
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* News Section */}
      <NewsList />
      
      {/* Upcoming Matches Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-block text-sm font-medium text-primary mb-2">CALENDARIO</span>
              <h2 className="text-3xl md:text-4xl font-bold">Próximos Partidos</h2>
            </div>
            <Link to="/partidos" className="mt-4 md:mt-0">
              <Button variant="outline">Ver calendario completo</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingMatches.map((match, index) => (
              <div 
                key={match.id} 
                className={`animate-scale`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <MatchCard {...match} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Highlighted Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-block text-sm font-medium text-primary mb-2">LO MEJOR</span>
              <h2 className="text-3xl md:text-4xl font-bold">Contenido Destacado</h2>
            </div>
            <Link to="/destacados" className="mt-4 md:mt-0">
              <Button variant="outline">Ver todo</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={highlight.id} 
                className={`animate-scale`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <HighlightCard {...highlight} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616279969862-55a217a19638?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Únete a la Comunidad</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Forma parte de nuestra comunidad de aficionados, recibe contenido exclusivo y participa en eventos especiales.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Registrarse Ahora
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Más Información
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
