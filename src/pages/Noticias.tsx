
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
}

// Sample expanded news data
const newsData: NewsItem[] = [
  {
    id: "1",
    title: "Victoria decisiva en el partido del fin de semana",
    excerpt: "Una actuación impecable con tres paradas cruciales que aseguraron los tres puntos para el equipo.",
    date: "2023-11-15",
    imageUrl: "https://images.unsplash.com/photo-1577223625816-5d0bee8bff07?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Partidos"
  },
  {
    id: "2",
    title: "Seleccionado para el equipo nacional",
    excerpt: "El entrenador nacional ha convocado a nuestro portero para los próximos partidos internacionales.",
    date: "2023-11-10",
    imageUrl: "https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Noticias"
  },
  {
    id: "3",
    title: "Nuevo método de entrenamiento implementado",
    excerpt: "Incorporando técnicas avanzadas de reacción y posicionamiento en las sesiones diarias.",
    date: "2023-11-05",
    imageUrl: "https://images.unsplash.com/photo-1613206485381-b028e578e791?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Entrenamientos"
  },
  {
    id: "4",
    title: "Récord personal de imbatibilidad",
    excerpt: "Fran Pérez alcanza su récord personal con 570 minutos sin recibir goles en competición oficial.",
    date: "2023-10-25",
    imageUrl: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Logros"
  },
  {
    id: "5",
    title: "Análisis táctico: Posicionamiento en córners",
    excerpt: "Un estudio detallado sobre la técnica de posicionamiento de Fran Pérez durante los saques de esquina.",
    date: "2023-10-18",
    imageUrl: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Análisis"
  },
  {
    id: "6",
    title: "Nominado a mejor portero del mes",
    excerpt: "La liga ha incluido a Fran Pérez entre los tres finalistas para el premio al mejor portero del mes.",
    date: "2023-10-12",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2362&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Premios"
  }
];

const Noticias = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(newsData);
  const [activeCategory, setActiveCategory] = useState<string>("Todas");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let filtered = newsData;
    
    // Apply category filter
    if (activeCategory !== "Todas") {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(query) || 
          item.excerpt.toLowerCase().includes(query)
      );
    }
    
    setFilteredNews(filtered);
  }, [searchQuery, activeCategory]);

  const categories = ["Todas", ...Array.from(new Set(newsData.map(item => item.category)))];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Noticias</h1>
          <p className="text-lg max-w-2xl mb-8 text-gray-600 dark:text-gray-300 animate-slide-up">
            Mantente al día con las últimas noticias, logros y eventos relacionados con Fran Pérez.
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar noticias..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* News Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news, index) => (
                <Card 
                  key={news.id}
                  className={cn(
                    "overflow-hidden card-hover border border-gray-100 dark:border-gray-800 h-full",
                    isLoaded ? "animate-scale" : "opacity-0"
                  )}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block py-1 px-2 bg-primary text-white text-xs font-medium rounded">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(news.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight">{news.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{news.excerpt}</p>
                    <Link to={`/noticias/${news.id}`} className="text-primary font-medium hover:underline">
                      Leer más
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No se encontraron noticias</h3>
              <p className="text-gray-500 mb-4">Prueba con otra búsqueda o categoría</p>
              <Button onClick={() => {setSearchQuery(""); setActiveCategory("Todas");}}>
                Ver todas las noticias
              </Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Noticias;
