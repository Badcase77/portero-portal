
import { useState } from 'react';
import { Calendar, Trophy, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TournamentCardProps {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  teams: number;
  imageUrl: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  result?: {
    position: number;
    totalMatches: number;
    cleanSheets: number;
  };
}

const TournamentCard = ({
  id,
  name,
  startDate,
  endDate,
  location,
  teams,
  imageUrl,
  status,
  result
}: TournamentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDateRange = (start: string, end: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const startDate = new Date(start).toLocaleDateString('es-ES', options);
    const endDate = new Date(end).toLocaleDateString('es-ES', options);
    return `${startDate} - ${endDate}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'ongoing':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Próximamente';
      case 'ongoing':
        return 'En Curso';
      case 'completed':
        return 'Completado';
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
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-105" : ""
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white text-xl font-bold mb-2">{name}</h3>
          <Badge className={cn("self-start", getStatusColor(status))}>
            {getStatusLabel(status)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} className="mr-2" />
            <span>{formatDateRange(startDate, endDate)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={16} className="mr-2" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users size={16} className="mr-2" />
            <span>{teams} equipos</span>
          </div>
          
          {status === 'completed' && result && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <div className="flex items-center mb-2">
                <Trophy size={18} className="mr-2 text-amber-500" />
                <span className="font-semibold">Posición: {result.position}º</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400">Partidos</span>
                  <span className="font-medium">{result.totalMatches}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400">Porterías a cero</span>
                  <span className="font-medium">{result.cleanSheets}</span>
                </div>
              </div>
            </div>
          )}
          
          <Button className="w-full mt-2" variant={status === 'completed' ? "outline" : "default"}>
            {status === 'completed' ? 'Ver detalles' : 'Más información'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TournamentCard;
