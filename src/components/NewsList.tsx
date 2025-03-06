
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  }
];

const NewsList = ({ limit = 3 }: { limit?: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    setDisplayedNews(newsData.slice(0, limit));
  }, [limit]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <section className="py-16 px-6" id="content">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block text-sm font-medium text-primary mb-2">ACTUALIDAD</span>
            <h2 className="text-3xl md:text-4xl font-bold">Últimas Noticias</h2>
          </div>
          <Link to="/noticias" className="mt-4 md:mt-0">
            <Button variant="outline">Ver todas las noticias</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedNews.map((news, index) => (
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
      </div>
    </section>
  );
};

export default NewsList;
