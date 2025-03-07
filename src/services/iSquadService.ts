
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

// Function to fetch matches from iSquad
export const fetchMatches = async (): Promise<{
  upcoming: TeamMatch[];
  past: TeamMatch[];
}> => {
  try {
    // Fetch data from iSquad with the URL provided by the user
    const response = await fetch('https://resultadosffcv.isquad.es/calendario.php?id_temp=20&id_modalidad=33345&id_competicion=903498791&id_torneo=28562919');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Parse the HTML to extract match data
    const matches = parseMatchesFromHTML(html);
    
    return {
      upcoming: matches.filter(match => !match.isPast),
      past: matches.filter(match => match.isPast)
    };
  } catch (error) {
    console.error("Error fetching iSquad data:", error);
    toast.error("No se pudo cargar el calendario de partidos");
    
    // Return mock data as fallback
    const mockResponse = generateMockMatches();
    return {
      upcoming: mockResponse.upcoming,
      past: mockResponse.past
    };
  }
};

// Function to parse matches from the HTML response
function parseMatchesFromHTML(html: string): TeamMatch[] {
  // This is a simple parser function to extract match data from HTML
  // In a real implementation, you would use a more robust parsing method
  const matches: TeamMatch[] = [];
  const today = new Date();
  
  try {
    // Find table rows with match data
    const tableRowRegex = /<tr[^>]*class="fila[^"]*"[^>]*>([\s\S]*?)<\/tr>/g;
    let match;
    let id = 1;
    
    while ((match = tableRowRegex.exec(html)) !== null) {
      const rowContent = match[1];
      
      // Extract date and time
      const dateMatch = rowContent.match(/<td[^>]*>([\d\/]+)<\/td>/);
      const timeMatch = rowContent.match(/<td[^>]*>([\d:]+)<\/td>/);
      
      // Extract team names
      const teamMatches = rowContent.match(/<td[^>]*class="equipo"[^>]*>([\s\S]*?)<\/td>/g);
      if (!teamMatches || teamMatches.length < 2 || !dateMatch || !timeMatch) continue;
      
      const homeTeamNameMatch = teamMatches[0].match(/>([^<]+)</);
      const awayTeamNameMatch = teamMatches[1].match(/>([^<]+)</);
      
      if (!homeTeamNameMatch || !awayTeamNameMatch) continue;
      
      // Extract result if available
      const resultMatch = rowContent.match(/<td[^>]*class="resultado"[^>]*>([\s\S]*?)<\/td>/);
      let homeScore: number | undefined;
      let awayScore: number | undefined;
      let isPast = false;
      
      if (resultMatch && resultMatch[1].includes('-')) {
        const scoresParts = resultMatch[1].trim().split('-');
        if (scoresParts.length === 2) {
          homeScore = parseInt(scoresParts[0].trim(), 10);
          awayScore = parseInt(scoresParts[1].trim(), 10);
          isPast = !isNaN(homeScore) && !isNaN(awayScore);
        }
      }
      
      // Parse date
      const dateParts = dateMatch[1].split('/');
      if (dateParts.length !== 3) continue;
      
      const matchDate = new Date(
        parseInt('20' + dateParts[2], 10),
        parseInt(dateParts[1], 10) - 1,
        parseInt(dateParts[0], 10)
      );
      
      // Check if match is past or upcoming based on date and result
      if (!isPast) {
        isPast = matchDate < today;
      }
      
      // Extract venue if available (or use default)
      let venue = "Campo por confirmar";
      const venueMatch = rowContent.match(/<td[^>]*class="campo"[^>]*>([\s\S]*?)<\/td>/);
      if (venueMatch && venueMatch[1].trim() !== '') {
        const venueText = venueMatch[1].replace(/<[^>]*>/g, '').trim();
        if (venueText) venue = venueText;
      }
      
      // Get competition name
      let competition = "Liga";
      // Try to extract competition from parent elements or headers in the HTML
      const competitionMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
      if (competitionMatch && competitionMatch[1].trim() !== '') {
        competition = competitionMatch[1].trim();
      }
      
      // Create match object
      const matchObj: TeamMatch = {
        id: `${id++}`,
        homeTeam: {
          name: homeTeamNameMatch[1].trim(),
          logo: DEFAULT_LOGO
        },
        awayTeam: {
          name: awayTeamNameMatch[1].trim(),
          logo: DEFAULT_LOGO
        },
        date: matchDate.toISOString().split('T')[0],
        time: timeMatch[1],
        venue: venue,
        competition: competition,
        isPast
      };
      
      // Add result if it's a past match
      if (isPast && typeof homeScore === 'number' && typeof awayScore === 'number') {
        matchObj.result = {
          homeScore,
          awayScore
        };
      }
      
      matches.push(matchObj);
    }
    
    return matches;
  } catch (error) {
    console.error("Error parsing matches from HTML:", error);
    return [];
  }
}

// Helper function to generate mock data as fallback
// This would be used if the real data fetch fails
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
