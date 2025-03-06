
import { toast } from "sonner";

export interface TeamMatch {
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

// Default team logo to use when logos aren't available
const DEFAULT_LOGO = "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=120&auto=format&fit=crop";

// Mock function to fetch from iSquad API
// In a real implementation, this would make an actual API call
export const fetchMatches = async (): Promise<{
  upcoming: TeamMatch[];
  past: TeamMatch[];
}> => {
  try {
    // This is where you would fetch from the actual iSquad API
    // const response = await fetch('https://isquad-api.example.com/calendar');
    // const data = await response.json();
    
    // For now, we'll return mock data with a small delay to simulate a network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Process the data into our TeamMatch format
    const mockResponse = generateMockMatches();
    
    return {
      upcoming: mockResponse.upcoming,
      past: mockResponse.past
    };
  } catch (error) {
    console.error("Error fetching iSquad data:", error);
    toast.error("No se pudo cargar el calendario de partidos");
    return {
      upcoming: [],
      past: []
    };
  }
};

// Helper function to generate mock data
// This would be replaced with actual data processing from the iSquad API
function generateMockMatches() {
  const today = new Date();
  
  // Sample upcoming matches data
  const upcomingMatches = [
    {
      id: "1",
      homeTeam: {
        name: "San José de Valencia",
        logo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=120&auto=format&fit=crop",
      },
      awayTeam: {
        name: "Real Madrid",
        logo: "https://logodownload.org/wp-content/uploads/2018/07/real-madrid-logo.png",
      },
      date: formatDateForUpcoming(7), // 7 days from now
      time: "20:00",
      venue: "Estadio San José, Valencia",
      competition: "LaLiga",
    },
    {
      id: "2",
      homeTeam: {
        name: "Atlético Madrid",
        logo: "https://logodownload.org/wp-content/uploads/2017/02/atletico-madrid-logo.png",
      },
      awayTeam: {
        name: "San José de Valencia",
        logo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=120&auto=format&fit=crop",
      },
      date: formatDateForUpcoming(14), // 14 days from now
      time: "18:30",
      venue: "Wanda Metropolitano, Madrid",
      competition: "LaLiga",
    },
    {
      id: "3",
      homeTeam: {
        name: "San José de Valencia",
        logo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=120&auto=format&fit=crop",
      },
      awayTeam: {
        name: "Paris Saint-Germain",
        logo: "https://logodownload.org/wp-content/uploads/2017/02/paris-saint-germain-psg-logo.png",
      },
      date: formatDateForUpcoming(21), // 21 days from now
      time: "21:00",
      venue: "Estadio San José, Valencia",
      competition: "Champions League",
    },
  ];

  // Sample past matches data
  const pastMatches = [
    {
      id: "4",
      homeTeam: {
        name: "San José de Valencia",
        logo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=120&auto=format&fit=crop",
      },
      awayTeam: {
        name: "Real Madrid",
        logo: "https://logodownload.org/wp-content/uploads/2018/07/real-madrid-logo.png",
      },
      date: formatDateForPast(7), // 7 days ago
      time: "20:00",
      venue: "Estadio San José, Valencia",
      competition: "LaLiga",
      isPast: true,
      result: {
        homeScore: 2,
        awayScore: 1,
      },
    },
    {
      id: "5",
      homeTeam: {
        name: "Atlético Madrid",
        logo: "https://logodownload.org/wp-content/uploads/2017/02/atletico-madrid-logo.png",
      },
      awayTeam: {
        name: "San José de Valencia",
        logo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=120&auto=format&fit=crop",
      },
      date: formatDateForPast(14), // 14 days ago
      time: "18:30",
      venue: "Wanda Metropolitano, Madrid",
      competition: "LaLiga",
      isPast: true,
      result: {
        homeScore: 0,
        awayScore: 0,
      },
    },
    {
      id: "6",
      homeTeam: {
        name: "San José de Valencia",
        logo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=120&auto=format&fit=crop",
      },
      awayTeam: {
        name: "AC Milan",
        logo: "https://logodownload.org/wp-content/uploads/2016/10/ac-milan-logo-0.png",
      },
      date: formatDateForPast(21), // 21 days ago
      time: "21:00",
      venue: "Estadio San José, Valencia",
      competition: "Champions League",
      isPast: true,
      result: {
        homeScore: 3,
        awayScore: 1,
      },
    },
  ];

  return { upcoming: upcomingMatches, past: pastMatches };
}

// Helper function to generate dates for upcoming matches
function formatDateForUpcoming(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

// Helper function to generate dates for past matches
function formatDateForPast(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}
