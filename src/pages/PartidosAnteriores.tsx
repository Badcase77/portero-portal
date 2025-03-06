
import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MatchCard from "@/components/MatchCard";
import { fetchMatches, TeamMatch } from "@/services/iSquadService";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PartidosAnteriores = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pastMatches, setPastMatches] = useState<TeamMatch[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<TeamMatch[]>([]);
  const [competitionFilter, setCompetitionFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Fetch matches from iSquad
  useEffect(() => {
    const getMatches = async () => {
      setIsLoading(true);
      try {
        const { past } = await fetchMatches();
        setPastMatches(past);
      } catch (error) {
        console.error("Error loading matches:", error);
        toast.error("Error al cargar los partidos");
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    };

    getMatches();
  }, []);

  useEffect(() => {
    if (!pastMatches.length) return;
    
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
  }, [competitionFilter, sortOrder, pastMatches]);

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
          
          {!isLoading && pastMatches.length > 0 && (
            /* Filters */
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
          )}
        </div>
      </section>
      
      {/* Matches Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredMatches.length > 0 ? (
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
