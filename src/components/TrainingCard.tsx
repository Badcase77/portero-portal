
import { useState } from 'react';
import { Clock, Calendar, Play } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TrainingCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  duration: string;
  date: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

const TrainingCard = ({
  id,
  title,
  description,
  imageUrl,
  videoUrl,
  duration,
  date,
  difficulty,
  category
}: TrainingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      default:
        return '';
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-800 h-full",
        isHovered ? "shadow-glass-hover transform -translate-y-1" : "shadow-glass"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-105" : ""
          )}
          loading="lazy"
        />
        {videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Button size="icon" variant="ghost" className="rounded-full w-14 h-14 text-white bg-primary/30 backdrop-blur-sm hover:bg-primary/50">
              <Play size={24} fill="white" />
            </Button>
          </div>
        )}
        <div className="absolute top-3 left-3 flex space-x-2">
          <Badge variant="secondary" className="bg-primary text-white border-none">
            {category}
          </Badge>
          <Badge className={getDifficultyColor(difficulty)}>
            {getDifficultyLabel(difficulty)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-3 line-clamp-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{description}</p>
        
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(date)}</span>
          </div>
        </div>
        
        <Button className="w-full" variant={videoUrl ? "default" : "outline"}>
          {videoUrl ? 'Ver Entrenamiento' : 'Detalles'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrainingCard;
