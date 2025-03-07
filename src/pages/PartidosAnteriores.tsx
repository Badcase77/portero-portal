
import { useState, useEffect } from "react";
import { Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatchCard from "@/components/MatchCard";
import { cn } from "@/lib/utils";

// Sample past matches data
const pastMatches = [
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
    date: "2023-11-01",
    time: "20:00",
    venue: "Camp Nou, Barcelona",
    competition: "LaLiga",
    isPast: true,
    result: {
      homeScore: 2,
      awayScore: 1,
    },
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
    date: "2023-10-15",
    time: "18:30",
    venue: "Wanda Metropolitano, Madrid",
    competition: "LaLiga",
    isPast: true,
    result: {
      homeScore: 0,
      awayScore: 0,
    },
  },
  {
    id: "3",
    homeTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    awayTeam: {
      name: "AC Milan",
      logo: "https://logodownload.org/wp-content/uploads/2016/10/ac-milan-logo-0.png",
    },
    date: "2023-10-03",
    time: "21:00",
    venue: "Camp Nou, Barcelona",
    competition: "Champions League",
    isPast: true,
    result: {
      homeScore: 3,
      awayScore: 1,
    },
  },
  {
    id: "4",
    homeTeam: {
      name: "Girona FC",
      logo: "https://logodownload.org/wp-content/uploads/2022/07/girona-fc-logo.png",
    },
    awayTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    date: "2023-09-23",
    time: "16:15",
    venue: "Montilivi, Girona",
    competition: "LaLiga",
    isPast: true,
    result: {
      homeScore: 0,
      awayScore: 2,
    },
  },
  {
    id: "5",
    homeTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    awayTeam: {
      name: "Real Betis",
      logo: "https://logodownload.org/wp-content/uploads/2019/05/real-betis-logo-0.png",
    },
    date: "2023-09-16",
    time: "20:00",
    venue: "Camp Nou, Barcelona",
    competition: "LaLiga",
    isPast: true,
    result: {
      homeScore: 5,
      awayScore: 0,
    },
  },
  {
    id: "6",
    homeTeam: {
      name: "Borussia Dortmund",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/bvb-borussia-dortmund-logo.png",
    },
    awayTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    date: "2023-09-05",
    time: "21:00",
    venue: "Signal Iduna Park, Dortmund",
    competition: "Champions League",
    isPast: true,
    result: {
      homeScore: 2,
      awayScore: 2,
    },
  }
];

const PartidosAnteriores = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredMatches, setFilteredMatches] = useState(pastMatches);
  const [competitionFilter, setCompetitionFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = [...pastMatches];
    
    // Apply competition filter
    if (competitionFilter !== "all") {
      filtered = filtered.filter(match => match.competition === competitionFilter);
    }
    
    // Apply sort order
    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    
    setFilteredMatches(filtered);
  }, [competitionFilter, sortOrder]);

  // Get unique competitions for filter
  const competitions = ["all", ...Array.from(new Set(pastMatches.map(match => match.competition)))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Partidos Anteriores</h1>
          <p className="text-lg max-w-2xl mb-8 text-gray-600 dark:text-gray-300 animate-slide-up">
            Revisa los resultados de los partidos disputados por Fran Pérez y su equipo en las distintas competiciones.
          </p>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm font-medium">Filtrar por:</span>
            </div>
            
            <Select value={competitionFilter} onValueChange={setCompetitionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Competición" />
              </SelectTrigger>
              <SelectContent>
                {competitions.map(comp => (
                  <SelectItem key={comp} value={comp}>
                    {comp === "all" ? "Todas las competiciones" : comp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más recientes primero</SelectItem>
                <SelectItem value="oldest">Más antiguos primero</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
      
      {/* Matches Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredMatches.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatches.map((match, index) => (
                <div 
                  key={match.id} 
                  className={`animate-scale`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <MatchCard {...match} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No se encontraron partidos</h3>
              <p className="text-gray-500 mb-4">No hay partidos que coincidan con los filtros seleccionados</p>
              <Button onClick={() => setCompetitionFilter("all")}>
                Ver todos los partidos
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PartidosAnteriores;
