
import { useState, useEffect } from "react";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

// Sample news data
const allNews: NewsItem[] = [
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
    title: "Renovación de contrato con el club por tres temporadas más",
    excerpt: "Después de una excelente temporada, el club ha ofrecido una renovación por tres años adicionales.",
    date: "2023-10-28",
    imageUrl: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Noticias"
  },
  {
    id: "5",
    title: "Nominado al premio de mejor portero de la temporada",
    excerpt: "La excelente campaña ha llevado a una nominación para el prestigioso galardón anual.",
    date: "2023-10-20",
    imageUrl: "https://images.unsplash.com/photo-1531956944257-88d0219e1595?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Premios"
  },
  {
    id: "6",
    title: "Entrevista exclusiva: El camino hacia la élite",
    excerpt: "Reflexiones personales sobre el viaje desde las categorías inferiores hasta el fútbol profesional.",
    date: "2023-10-12",
    imageUrl: "https://images.unsplash.com/photo-1661034103472-27e177f4d1a9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Entrevistas"
  }
];

const categories = ["Todas", "Partidos", "Noticias", "Entrenamientos", "Premios", "Entrevistas"];

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(allNews);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    filterNews();
  }, [searchTerm, activeCategory]);

  const filterNews = () => {
    let results = allNews;

    // Filter by category
    if (activeCategory !== "Todas") {
      results = results.filter(item => item.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        item => 
          item.title.toLowerCase().includes(term) || 
          item.excerpt.toLowerCase().includes(term)
      );
    }

    setFilteredNews(results);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Noticias</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Mantente al día con las últimas novedades, logros y acontecimientos.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Buscar noticias..."
              className="pl-10 py-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "transition-all",
                  activeCategory === category ? "bg-primary" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 px-6">
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
                  style={{ animationDelay: `${index * 100}ms` }}
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
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>
                    <Button variant="link" className="p-0 text-primary">
                      Leer más
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No se encontraron resultados</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                No hay noticias que coincidan con tu búsqueda.
              </p>
              <Button onClick={() => { setSearchTerm(""); setActiveCategory("Todas"); }}>
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

export default News;
