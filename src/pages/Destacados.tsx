
import { useState, useEffect } from "react";
import { Search, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HighlightCard from "@/components/HighlightCard";
import { cn } from "@/lib/utils";

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
  },
  {
    id: "4",
    title: "Salida perfecta al área y corte de centro",
    description: "Gran anticipación y valentia para adelantarse al delantero rival y despejar un centro peligroso.",
    date: "2023-08-20",
    thumbnailUrl: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    videoUrl: "#",
    views: 12500,
    likes: 1100,
    duration: "0:45",
    category: "Partidos"
  },
  {
    id: "5",
    title: "Entrevista post-partido: Final de Champions",
    description: "Declaraciones tras la histórica victoria en la final de la Champions League con actuación destacada.",
    date: "2023-06-10",
    thumbnailUrl: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    videoUrl: "#",
    views: 32800,
    likes: 2750,
    duration: "4:20",
    category: "Entrevistas"
  },
  {
    id: "6",
    title: "Jugada del año: Triple parada y contraataque",
    description: "Una secuencia impresionante que comenzó con tres paradas consecutivas y terminó en gol tras un preciso lanzamiento.",
    date: "2022-12-15",
    thumbnailUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    videoUrl: "#",
    views: 42600,
    likes: 3800,
    duration: "1:30",
    category: "Partidos"
  },
  {
    id: "7",
    title: "Sesión de análisis táctico: Posicionamiento en el arco",
    description: "Análisis detallado sobre las técnicas de posicionamiento para reducir ángulos de tiro y mejorar las estadísticas.",
    date: "2023-07-18",
    thumbnailUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3",
    videoUrl: "#",
    views: 18300,
    likes: 1450,
    duration: "12:30",
    category: "Análisis"
  },
  {
    id: "8",
    title: "Ejercicios específicos para porteros: Elasticidad y reflejos",
    description: "Rutina completa de ejercicios diseñados para mejorar la elasticidad lateral y los reflejos en disparos rápidos.",
    date: "2023-05-22",
    thumbnailUrl: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    videoUrl: "#",
    views: 15700,
    likes: 2100,
    duration: "8:45",
    category: "Entrenamientos"
  },
  {
    id: "9",
    title: "El partido perfecto: Portería a cero y asistencia",
    description: "Resumen del partido donde no solo mantuvo la portería a cero sino que también dio una asistencia de gol con un preciso lanzamiento.",
    date: "2023-04-05",
    thumbnailUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2362&auto=format&fit=crop&ixlib=rb-4.0.3",
    videoUrl: "#",
    views: 23400,
    likes: 1950,
    duration: "3:25",
    category: "Partidos"
  }
];

const Destacados = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHighlights, setFilteredHighlights] = useState(highlights);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = highlights;
    
    // Apply tab filter
    if (activeTab !== "all") {
      if (activeTab === "popular") {
        filtered = [...filtered].sort((a, b) => b.views - a.views).slice(0, 6);
      } else if (activeTab === "trending") {
        filtered = [...filtered].sort((a, b) => b.likes - a.likes).slice(0, 6);
      }
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Apply sorting
    if (sortBy === "recent") {
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "popular") {
      filtered = [...filtered].sort((a, b) => b.views - a.views);
    } else if (sortBy === "liked") {
      filtered = [...filtered].sort((a, b) => b.likes - a.likes);
    }
    
    setFilteredHighlights(filtered);
  }, [searchQuery, categoryFilter, sortBy, activeTab]);

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(highlights.map(item => item.category)))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Destacados</h1>
          <p className="text-lg max-w-2xl mb-8 text-gray-600 dark:text-gray-300 animate-slide-up">
            Los mejores momentos de la carrera de Fran Pérez: paradas espectaculares, jugadas decisivas y contenido exclusivo.
          </p>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="mb-8">
              <TabsTrigger value="all" className="flex items-center gap-1">
                Todos los destacados
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500" />
                Más vistos
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-1">
                Tendencia
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Buscar destacados..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <Filter size={18} className="text-gray-500" />
                  <span className="text-sm font-medium mr-2">Filtrar por:</span>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat === "all" ? "Todas las categorías" : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Más recientes</SelectItem>
                      <SelectItem value="popular">Más vistos</SelectItem>
                      <SelectItem value="liked">Más gustados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-0">
              <h3 className="text-xl font-semibold mb-4">Los videos más vistos</h3>
            </TabsContent>
            
            <TabsContent value="trending" className="mt-0">
              <h3 className="text-xl font-semibold mb-4">Contenido en tendencia</h3>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Highlights Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredHighlights.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHighlights.map((highlight, index) => (
                <div 
                  key={highlight.id} 
                  className={`animate-scale`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <HighlightCard {...highlight} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No se encontraron destacados</h3>
              <p className="text-gray-500 mb-4">Prueba con otros criterios de búsqueda</p>
              <Button onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setSortBy("recent");
              }}>
                Ver todos los destacados
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Destacados;
