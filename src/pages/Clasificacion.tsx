
import { useState, useEffect } from "react";
import { Trophy, Users, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchStandings, TeamStanding } from "@/services/iSquadService";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Clasificacion = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [standings, setStandings] = useState<TeamStanding[]>([]);

  // Fetch standings from iSquad
  useEffect(() => {
    const getStandings = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStandings();
        setStandings(data);
      } catch (error) {
        console.error("Error loading standings:", error);
        toast.error("Error al cargar la clasificación");
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    };

    getStandings();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Clasificación</h1>
          <div className="flex items-center gap-4 mb-6">
            <Trophy className="h-8 w-8 text-primary" />
            <p className="text-lg max-w-2xl text-gray-600 dark:text-gray-300 animate-slide-up">
              Tabla de clasificación actualizada con la posición de nuestro equipo en la liga.
            </p>
          </div>
        </div>
      </section>
      
      {/* Standings Table */}
      <section className="py-12 px-6 mb-auto">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : standings.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 animate-fade-in">
              <table className="w-full min-w-[800px] text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    <th className="px-4 py-3 text-left font-medium">Pos</th>
                    <th className="px-4 py-3 text-left font-medium">Equipo</th>
                    <th className="px-4 py-3 text-center font-medium">PJ</th>
                    <th className="px-4 py-3 text-center font-medium">G</th>
                    <th className="px-4 py-3 text-center font-medium">E</th>
                    <th className="px-4 py-3 text-center font-medium">P</th>
                    <th className="px-4 py-3 text-center font-medium">GF</th>
                    <th className="px-4 py-3 text-center font-medium">GC</th>
                    <th className="px-4 py-3 text-center font-medium">DG</th>
                    <th className="px-4 py-3 text-center font-medium">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((team, index) => {
                    // Determine the row color (highlight your team or top positions)
                    const isTopTeam = index < 4;
                    const isOurTeam = team.team.name.includes("San José") || team.team.name.includes("San Jose");
                    
                    return (
                      <tr
                        key={`team-${team.position}`}
                        className={cn(
                          "border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors",
                          {
                            "bg-green-50 dark:bg-green-900/20": isOurTeam,
                            "font-medium": isTopTeam || isOurTeam
                          }
                        )}
                      >
                        <td className="px-4 py-4 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{team.position}</span>
                            {index === 0 && <Trophy size={16} className="text-yellow-500" />}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                              <img 
                                src={team.team.logo} 
                                alt={team.team.name} 
                                className="h-full w-full object-contain"
                                onError={(e) => {
                                  // Fallback if image fails to load
                                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=120&auto=format&fit=crop";
                                }}
                              />
                            </div>
                            <span className="font-medium">{team.team.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">{team.played}</td>
                        <td className="px-4 py-4 text-center">{team.won}</td>
                        <td className="px-4 py-4 text-center">{team.drawn}</td>
                        <td className="px-4 py-4 text-center">{team.lost}</td>
                        <td className="px-4 py-4 text-center">{team.goalsFor}</td>
                        <td className="px-4 py-4 text-center">{team.goalsAgainst}</td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {team.goalDifference > 0 ? (
                              <ArrowUp size={14} className="text-green-500" />
                            ) : team.goalDifference < 0 ? (
                              <ArrowDown size={14} className="text-red-500" />
                            ) : null}
                            <span className={cn({
                              "text-green-600 dark:text-green-400": team.goalDifference > 0,
                              "text-red-600 dark:text-red-400": team.goalDifference < 0
                            })}>
                              {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-bold">{team.points}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No hay datos de clasificación disponibles</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">No se pudo cargar la tabla de clasificación en este momento. Por favor, inténtalo de nuevo más tarde.</p>
              <Button onClick={() => window.location.reload()}>
                Actualizar página
              </Button>
            </div>
          )}
          
          {isLoaded && standings.length > 0 && (
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
              <p>Última actualización: {new Date().toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Clasificacion;
