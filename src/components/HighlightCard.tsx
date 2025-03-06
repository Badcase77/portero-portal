
import { useState } from 'react';
import { Play, ThumbsUp, Calendar, Share2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HighlightCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  likes: number;
  duration: string;
  category: string;
}

const HighlightCard = ({
  id,
  title,
  description,
  date,
  thumbnailUrl,
  videoUrl,
  views,
  likes,
  duration,
  category
}: HighlightCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  const formatNumber = (num: number) => {
    return num > 999 ? `${(num / 1000).toFixed(1)}k` : num;
  };

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
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
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={thumbnailUrl}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-105" : ""
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="ghost" className="rounded-full w-16 h-16 text-white bg-primary/40 backdrop-blur-sm hover:bg-primary/60">
            <Play size={30} fill="white" />
          </Button>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium py-1 px-2 rounded backdrop-blur-sm">
          {duration}
        </div>
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-white border-none">
            {category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(date)}</span>
          <span className="mx-2">•</span>
          <span>{formatNumber(views)} visualizaciones</span>
        </div>
        
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "flex items-center gap-1",
              liked ? "text-primary" : "text-gray-600 dark:text-gray-300"
            )}
            onClick={handleLike}
          >
            <ThumbsUp size={16} className={liked ? "fill-primary" : ""} />
            <span>{formatNumber(likeCount)}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share2 size={16} />
            <span>Compartir</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighlightCard;
