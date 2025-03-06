
import { useState, useEffect } from "react";
import { Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatchCard from "@/components/MatchCard";
import { cn } from "@/lib/utils";

// Sample upcoming matches data
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
  {
    id: "3",
    homeTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    awayTeam: {
      name: "Paris Saint-Germain",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/paris-saint-germain-psg-logo.png",
    },
    date: "2024-01-10",
    time: "21:00",
    venue: "Camp Nou, Barcelona",
    competition: "Champions League",
  },
  {
    id: "4",
    homeTeam: {
      name: "Valencia CF",
      logo: "https://logodownload.org/wp-content/uploads/2019/05/valencia-cf-logo.png",
    },
    awayTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    date: "2024-01-21",
    time: "16:15",
    venue: "Mestalla, Valencia",
    competition: "LaLiga",
  },
  {
    id: "5",
    homeTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    awayTeam: {
      name: "Athletic Bilbao",
      logo: "https://logodownload.org/wp-content/uploads/2018/11/athletic-bilbao-logo.png",
    },
    date: "2024-01-28",
    time: "18:30",
    venue: "Camp Nou, Barcelona",
    competition: "Copa del Rey",
  },
  {
    id: "6",
    homeTeam: {
      name: "Bayern Munich",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/bayern-munchen-logo.png",
    },
    awayTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    date: "2024-02-14",
    time: "21:00",
    venue: "Allianz Arena, Munich",
    competition: "Champions League",
  }
];

const ProximosPartidos = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredMatches, setFilteredMatches] = useState(upcomingMatches);
  const [competitionFilter, setCompetitionFilter] = useState("all");
  const [nextMatch, setNextMatch] = useState(upcomingMatches[0]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Find the next match (closest to current date)
    const today = new Date();
    const sorted = [...upcomingMatches].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const upcoming = sorted.find(match => new Date(match.date) >= today);
    if (upcoming) {
      setNextMatch(upcoming);
    }
  }, []);

  useEffect(() => {
    let filtered = [...upcomingMatches];
    
    // Apply competition filter
    if (competitionFilter !== "all") {
      filtered = filtered.filter(match => match.competition === competitionFilter);
    }
    
    // Always sort by date (closest first)
    filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setFilteredMatches(filtered);
  }, [competitionFilter]);

  // Get unique competitions for filter
  const competitions = ["all", ...Array.from(new Set(upcomingMatches.map(match => match.competition)))];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const daysUntilMatch = (dateString: string) => {
    const matchDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(matchDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Next Match */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Próximos Partidos</h1>
          <p className="text-lg max-w-2xl mb-12 text-gray-600 dark:text-gray-300 animate-slide-up">
            Consulta el calendario de los próximos encuentros de Fran Pérez y sigue su trayectoria en todas las competiciones.
          </p>
          
          {/* Next Match Feature */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 mb-12">
            <div className="bg-primary/10 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="bg-primary">Próximo Partido</Badge>
                  <span className="text-sm font-medium">{daysUntilMatch(nextMatch.date)} días</span>
                </div>
                <Button size="sm" variant="outline" className="gap-1">
                  <Bell size={16} />
                  <span className="hidden sm:inline">Recordármelo</span>
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
                  {/* Home Team */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 overflow-hidden">
                      <img 
                        src={nextMatch.homeTeam.logo} 
                        alt={nextMatch.homeTeam.name}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">{nextMatch.homeTeam.name}</h3>
                  </div>
                  
                  {/* Match Info */}
                  <div className="flex flex-col items-center justify-center my-6 md:my-0">
                    <div className="text-xl font-bold mb-2">VS</div>
                    <div className="text-sm text-gray-500">{formatDate(nextMatch.date)}</div>
                    <div className="text-sm text-gray-500">{nextMatch.time}</div>
                    <div className="mt-2 text-primary font-medium">{nextMatch.competition}</div>
                  </div>
                  
                  {/* Away Team */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 overflow-hidden">
                      <img 
                        src={nextMatch.awayTeam.logo} 
                        alt={nextMatch.awayTeam.name}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">{nextMatch.awayTeam.name}</h3>
                  </div>
                </div>
                
                <div className="w-full md:w-auto text-center md:text-right">
                  <div className="text-sm text-gray-500 mb-1">{nextMatch.venue}</div>
                  <Button className="w-full md:w-auto">Ver Detalles</Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-500" />
              <span className="text-sm font-medium">Filtrar por:</span>
            </div>
            
            <Select value={competitionFilter} onValueChange={setCompetitionFilter}>
              <SelectTrigger className="w-48">
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
              <p className="text-gray-500 mb-4">No hay partidos programados para la competición seleccionada</p>
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

export default ProximosPartidos;
