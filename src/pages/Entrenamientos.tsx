import { useState, useEffect } from "react";
import { Search, Filter, Clock, Calendar, Tag, Video, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

interface TrainingItem {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  category: string;
  intensity: "low" | "medium" | "high";
  videoUrl: string;
  thumbnailUrl: string;
  coach: string;
}

// Sample training data
const trainings: TrainingItem[] = [
  {
    id: "1",
    title: "Entrenamiento de reflejos y reacción",
    description: "Sesión intensiva centrada en mejorar los tiempos de reacción y reflejos ante disparos a corta distancia.",
    date: "2023-11-20",
    duration: "60 min",
    category: "Técnica",
    intensity: "high",
    videoUrl: "https://example.com/videos/training-reflexes",
    thumbnailUrl: "https://images.unsplash.com/photo-1644157463080-19ef59870914?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    coach: "Carlos Rodríguez"
  },
  {
    id: "2",
    title: "Posicionamiento en el área",
    description: "Trabajo táctico sobre el posicionamiento correcto dentro del área para reducir ángulos de tiro.",
    date: "2023-11-17",
    duration: "45 min",
    category: "Táctica",
    intensity: "medium",
    videoUrl: "https://example.com/videos/positioning",
    thumbnailUrl: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    coach: "Miguel Torres"
  },
  {
    id: "3",
    title: "Saques de puerta y precisión de pases",
    description: "Enfoque en la distribución del balón, precisión en pases largos y construcción de juego desde atrás.",
    date: "2023-11-15",
    duration: "75 min",
    category: "Técnica",
    intensity: "medium",
    videoUrl: "https://example.com/videos/goal-kicks",
    thumbnailUrl: "https://images.unsplash.com/photo-1577223625816-5d0bee8bff07?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    coach: "Carlos Rodríguez"
  },
  {
    id: "4",
    title: "Entrenamiento físico específico para porteros",
    description: "Sesión centrada en la preparación física con ejercicios adaptados a las exigencias del puesto de portero.",
    date: "2023-11-12",
    duration: "90 min",
    category: "Físico",
    intensity: "high",
    videoUrl: "https://example.com/videos/physical-training",
    thumbnailUrl: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    coach: "Laura Sánchez"
  },
  {
    id: "5",
    title: "Salidas aéreas y control del área",
    description: "Práctica de interceptación de centros, coordinación con la defensa y dominio aéreo.",
    date: "2023-11-08",
    duration: "60 min",
    category: "Técnica",
    intensity: "high",
    videoUrl: "https://example.com/videos/aerial-control",
    thumbnailUrl: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    coach: "Miguel Torres"
  },
  {
    id: "6",
    title: "Análisis de vídeo y estrategia",
    description: "Sesión de análisis de partidos anteriores y estudio de comportamiento de delanteros rivales.",
    date: "2023-11-05",
    duration: "45 min",
    category: "Táctica",
    intensity: "low",
    videoUrl: "https://example.com/videos/video-analysis",
    thumbnailUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3",
    coach: "Carlos Rodríguez"
  }
];

const Entrenamientos = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTrainings, setFilteredTrainings] = useState<TrainingItem[]>(trainings);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [intensityFilter, setIntensityFilter] = useState("all");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = trainings;
    
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
    
    // Apply intensity filter
    if (intensityFilter !== "all") {
      filtered = filtered.filter(item => item.intensity === intensityFilter);
    }
    
    // Sort by date (newest first)
    filtered = [...filtered].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setFilteredTrainings(filtered);
  }, [searchQuery, categoryFilter, intensityFilter]);

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(trainings.map(item => item.category)))];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Entrenamientos</h1>
          <p className="text-lg max-w-2xl mb-8 text-gray-600 dark:text-gray-300 animate-slide-up">
            Explora las sesiones de entrenamiento específicas para porteros que realiza Fran Pérez para mantener su nivel de élite en el San José de Valencia.
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar entrenamientos..."
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
              
              <Select value={intensityFilter} onValueChange={setIntensityFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Intensidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las intensidades</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trainings Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredTrainings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrainings.map((training, index) => (
                <Card 
                  key={training.id}
                  className={cn(
                    "overflow-hidden h-full transition-all duration-300 hover:shadow-md",
                    isLoaded ? "animate-scale" : "opacity-0"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative aspect-video overflow-hidden group">
                    <img 
                      src={training.thumbnailUrl}
                      alt={training.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge>{training.category}</Badge>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge className={`${getIntensityColor(training.intensity)} border-none`}>
                        Intensidad {training.intensity === "low" ? "Baja" : training.intensity === "medium" ? "Media" : "Alta"}
                      </Badge>
                    </div>
                    
                    {/* Video Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="rounded-full w-16 h-16 bg-white/30 hover:bg-white/50 text-white">
                        <Play size={30} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{training.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{training.description}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(training.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{training.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag size={14} className="mr-1" />
                        <span>{training.coach}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full flex items-center gap-2"
                      as="a"
                      href={training.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Video size={16} />
                      Ver Entrenamiento
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No se encontraron entrenamientos</h3>
              <p className="text-gray-500 mb-4">Prueba con otros criterios de búsqueda</p>
              <Button onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setIntensityFilter("all");
              }}>
                Ver todos los entrenamientos
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Entrenamientos;
