
import { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  id: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  date: string;
  time: string;
  venue: string;
  competition: string;
  isPast?: boolean;
  result?: {
    homeScore: number;
    awayScore: number;
  };
}

const MatchCard = ({
  id,
  homeTeam,
  awayTeam,
  date,
  time,
  venue,
  competition,
  isPast = false,
  result
}: MatchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-800",
        isHovered ? "shadow-glass-hover transform -translate-y-1" : "shadow-glass"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="bg-secondary p-2 text-center text-sm font-medium">
          {competition}
        </div>
        
        <div className="px-6 py-8">
          {/* Match information */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 space-x-4">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{time}</span>
            </div>
          </div>
          
          {/* Teams */}
          <div className="flex items-center justify-between mb-6">
            {/* Home Team */}
            <div className="flex flex-col items-center text-center w-2/5">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 overflow-hidden">
                <img 
                  src={homeTeam.logo} 
                  alt={homeTeam.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="font-semibold">{homeTeam.name}</h3>
            </div>
            
            {/* Score or VS */}
            <div className="w-1/5 flex items-center justify-center">
              {isPast && result ? (
                <div className="text-2xl font-bold flex items-center">
                  <span className={result.homeScore > result.awayScore ? "text-primary" : ""}>{result.homeScore}</span>
                  <span className="mx-2 text-gray-400">-</span>
                  <span className={result.awayScore > result.homeScore ? "text-primary" : ""}>{result.awayScore}</span>
                </div>
              ) : (
                <div className="text-lg font-medium text-gray-500">VS</div>
              )}
            </div>
            
            {/* Away Team */}
            <div className="flex flex-col items-center text-center w-2/5">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 overflow-hidden">
                <img 
                  src={awayTeam.logo} 
                  alt={awayTeam.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="font-semibold">{awayTeam.name}</h3>
            </div>
          </div>
          
          {/* Venue */}
          <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <MapPin size={14} className="mr-1" />
            <span>{venue}</span>
          </div>
          
          {/* Action Button */}
          <div className="text-center">
            {isPast ? (
              <Button variant="outline" className="w-full" asChild>
                <Link to="/partidos/anteriores">Ver Resumen</Link>
              </Button>
            ) : (
              <Button className="w-full" asChild>
                <Link to="/partidos">Recordatorio</Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
