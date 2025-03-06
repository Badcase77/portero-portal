
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/MatchCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

interface Match {
  id: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  date: string;
  time: string;
  venue: string;
  competition: string;
  isPast?: boolean;
  result?: {
    homeScore: number;
    awayScore: number;
  };
}

// Sample match data
const matchData: Match[] = [
  // Upcoming matches
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
      name: "Valencia CF",
      logo: "https://logodownload.org/wp-content/uploads/2019/05/valencia-logo.png",
    },
    date: "2024-01-07",
    time: "16:15",
    venue: "Camp Nou, Barcelona",
    competition: "LaLiga",
  },
  {
    id: "4",
    homeTeam: {
      name: "Sevilla FC",
      logo: "https://logodownload.org/wp-content/uploads/2018/07/sevilla-fc-logo.png",
    },
    awayTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    date: "2024-01-14",
    time: "21:00",
    venue: "Ramón Sánchez Pizjuán, Sevilla",
    competition: "LaLiga",
  },
  // Past matches
  {
    id: "5",
    homeTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    awayTeam: {
      name: "Athletic Bilbao",
      logo: "https://logodownload.org/wp-content/uploads/2019/05/athletic-bilbao-logo.png",
    },
    date: "2023-11-26",
    time: "20:00",
    venue: "Camp Nou, Barcelona",
    competition: "LaLiga",
    isPast: true,
    result: {
      homeScore: 3,
      awayScore: 1,
    },
  },
  {
    id: "6",
    homeTeam: {
      name: "Real Sociedad",
      logo: "https://logodownload.org/wp-content/uploads/2019/05/real-sociedad-logo.png",
    },
    awayTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    date: "2023-11-19",
    time: "18:30",
    venue: "Reale Arena, San Sebastián",
    competition: "LaLiga",
    isPast: true,
    result: {
      homeScore: 0,
      awayScore: 1,
    },
  },
  {
    id: "7",
    homeTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    awayTeam: {
      name: "Osasuna",
      logo: "https://logodownload.org/wp-content/uploads/2019/05/osasuna-logo.png",
    },
    date: "2023-11-12",
    time: "16:15",
    venue: "Camp Nou, Barcelona",
    competition: "LaLiga",
    isPast: true,
    result: {
      homeScore: 2,
      awayScore: 0,
    },
  },
  {
    id: "8",
    homeTeam: {
      name: "Real Madrid",
      logo: "https://logodownload.org/wp-content/uploads/2018/07/real-madrid-logo.png",
    },
    awayTeam: {
      name: "FC Barcelona",
      logo: "https://logodownload.org/wp-content/uploads/2017/02/barcelona-fc-logo-0.png",
    },
    date: "2023-11-05",
    time: "21:00",
    venue: "Santiago Bernabéu, Madrid",
    competition: "LaLiga",
    isPast: true,
    result: {
      homeScore: 1,
      awayScore: 2,
    },
  },
];

const competitions = ["Todas", "LaLiga", "Champions League", "Copa del Rey", "Supercopa"];

const Matches = () => {
  const [activeTab, setActiveTab] = useState("próximos");
  const [activeCompetition, setActiveCompetition] = useState("Todas");
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    filterMatches();
  }, [activeTab, activeCompetition]);

  const filterMatches = () => {
    let results = matchData.filter(match => 
      activeTab === "próximos" ? !match.isPast : match.isPast
    );

    if (activeCompetition !== "Todas") {
      results = results.filter(match => match.competition === activeCompetition);
    }

    setFilteredMatches(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Partidos</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Calendario de próximos encuentros y resultados de partidos anteriores.
          </p>
        </div>
      </section>

      {/* Matches Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="próximos" className="mb-12" onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-2 w-full max-w-md">
                <TabsTrigger value="próximos">Próximos Partidos</TabsTrigger>
                <TabsTrigger value="pasados">Partidos Jugados</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {competitions.map((competition) => (
                <Button
                  key={competition}
                  variant={activeCompetition === competition ? "default" : "outline"}
                  onClick={() => setActiveCompetition(competition)}
                  className={cn(
                    "transition-all",
                    activeCompetition === competition ? "bg-primary" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {competition}
                </Button>
              ))}
            </div>

            <TabsContent value="próximos" className="mt-8">
              {filteredMatches.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMatches.map((match, index) => (
                    <div 
                      key={match.id} 
                      className={`animate-scale`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <MatchCard {...match} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No hay partidos programados</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    No hay próximos partidos para esta competición.
                  </p>
                  <Button onClick={() => setActiveCompetition("Todas")}>
                    Ver todas las competiciones
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pasados" className="mt-8">
              {filteredMatches.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMatches.map((match, index) => (
                    <div 
                      key={match.id} 
                      className={`animate-scale`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <MatchCard {...match} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No hay partidos registrados</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    No hay resultados disponibles para esta competición.
                  </p>
                  <Button onClick={() => setActiveCompetition("Todas")}>
                    Ver todas las competiciones
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Calendar navigation/pagination (could be expanded in the future) */}
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="icon" className="mr-2">
              <ChevronLeft size={18} />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Matches;
