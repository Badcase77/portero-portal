
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

export interface TeamStanding {
  position: number;
  team: {
    name: string;
    logo: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
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

// Function to fetch standings table from iSquad
export const fetchStandings = async (): Promise<TeamStanding[]> => {
  try {
    // Fetch data from iSquad with the standings URL provided by the user
    const response = await fetch('https://resultadosffcv.isquad.es/clasificacion.php?id_temp=20&id_modalidad=33345&id_competicion=903498791&id_torneo=28562919');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Parse the HTML to extract standings data
    const standings = parseStandingsFromHTML(html);
    
    return standings;
  } catch (error) {
    console.error("Error fetching iSquad standings data:", error);
    toast.error("No se pudo cargar la tabla de clasificación");
    
    // Return mock data as fallback
    return generateMockStandings();
  }
};

// Function to parse standings data from HTML
function parseStandingsFromHTML(html: string): TeamStanding[] {
  const standings: TeamStanding[] = [];
  
  try {
    // Find the standings table
    const tableRegex = /<table[^>]*class="[^"]*tabla_clasificacion[^"]*"[^>]*>([\s\S]*?)<\/table>/i;
    const tableMatch = html.match(tableRegex);
    
    if (!tableMatch) {
      console.error("Standings table not found in HTML");
      return [];
    }
    
    const tableContent = tableMatch[1];
    
    // Extract rows from the table (skipping header row)
    const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let rowMatch;
    let foundHeader = false;
    
    // Map to store team logo URLs
    const teamLogoMap = new Map<string, string>();
    
    // First, extract logos from the HTML
    const logoRegex = /<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"/gi;
    let logoMatch;
    
    while ((logoMatch = logoRegex.exec(html)) !== null) {
      const logoUrl = logoMatch[1];
      const teamName = logoMatch[2];
      
      if (logoUrl && teamName) {
        // Handle relative URLs
        const absoluteLogoUrl = logoUrl.startsWith('http') 
          ? logoUrl 
          : `https://resultadosffcv.isquad.es/${logoUrl.replace(/^\.\//, '')}`;
        teamLogoMap.set(teamName, absoluteLogoUrl);
      }
    }
    
    while ((rowMatch = rowRegex.exec(tableContent)) !== null) {
      const rowContent = rowMatch[1];
      
      // Skip header row
      if (!foundHeader) {
        if (rowContent.includes("<th") || rowContent.includes("EQUIPO")) {
          foundHeader = true;
          continue;
        }
      }
      
      // Extract cells from the row
      const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
      const cells: string[] = [];
      let cellMatch;
      
      while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        cells.push(cellMatch[1].trim().replace(/<[^>]*>/g, ''));
      }
      
      // Ensure we have enough cells for a valid standings row
      if (cells.length < 9) continue;
      
      // Extract team name - typically in the second cell
      const teamNameCell = cells[1];
      // Remove HTML tags and trim
      const teamName = teamNameCell.replace(/<[^>]*>/g, '').trim();
      
      // Get team logo from our map or use default
      const teamLogo = teamLogoMap.get(teamName) || DEFAULT_LOGO;
      
      // Create standing object
      const standing: TeamStanding = {
        position: parseInt(cells[0], 10) || 0,
        team: {
          name: teamName,
          logo: teamLogo
        },
        played: parseInt(cells[2], 10) || 0,
        won: parseInt(cells[3], 10) || 0,
        drawn: parseInt(cells[4], 10) || 0,
        lost: parseInt(cells[5], 10) || 0,
        goalsFor: parseInt(cells[6], 10) || 0,
        goalsAgainst: parseInt(cells[7], 10) || 0,
        goalDifference: parseInt(cells[8], 10) || 0,
        points: parseInt(cells[9], 10) || 0
      };
      
      standings.push(standing);
    }
    
    return standings;
  } catch (error) {
    console.error("Error parsing standings from HTML:", error);
    return [];
  }
}

// Function to parse matches from the HTML response
function parseMatchesFromHTML(html: string): TeamMatch[] {
  // This is a simple parser function to extract match data from HTML
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

// Helper function to generate mock standings data as fallback
function generateMockStandings(): TeamStanding[] {
  return [
    {
      position: 1,
      team: {
        name: "San José de Valencia",
        logo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=120&auto=format&fit=crop",
      },
      played: 10,
      won: 8,
      drawn: 1,
      lost: 1,
      goalsFor: 28,
      goalsAgainst: 10,
      goalDifference: 18,
      points: 25
    },
    {
      position: 2,
      team: {
        name: "FC Barcelona",
        logo: "https://logodownload.org/wp-content/uploads/2015/05/barcelona-logo-0.png",
      },
      played: 10,
      won: 7,
      drawn: 2,
      lost: 1,
      goalsFor: 25,
      goalsAgainst: 9,
      goalDifference: 16,
      points: 23
    },
    {
      position: 3,
      team: {
        name: "Real Madrid",
        logo: "https://logodownload.org/wp-content/uploads/2018/07/real-madrid-logo.png",
      },
      played: 10,
      won: 7,
      drawn: 1,
      lost: 2,
      goalsFor: 24,
      goalsAgainst: 10,
      goalDifference: 14,
      points: 22
    },
    {
      position: 4,
      team: {
        name: "Atlético Madrid",
        logo: "https://logodownload.org/wp-content/uploads/2017/02/atletico-madrid-logo.png",
      },
      played: 10,
      won: 6,
      drawn: 3,
      lost: 1,
      goalsFor: 20,
      goalsAgainst: 8,
      goalDifference: 12,
      points: 21
    },
    {
      position: 5,
      team: {
        name: "Sevilla FC",
        logo: DEFAULT_LOGO,
      },
      played: 10,
      won: 5,
      drawn: 3,
      lost: 2,
      goalsFor: 18,
      goalsAgainst: 10,
      goalDifference: 8,
      points: 18
    },
    {
      position: 6,
      team: {
        name: "Villarreal CF",
        logo: DEFAULT_LOGO,
      },
      played: 10,
      won: 5,
      drawn: 2,
      lost: 3,
      goalsFor: 19,
      goalsAgainst: 15,
      goalDifference: 4,
      points: 17
    },
    {
      position: 7,
      team: {
        name: "Real Sociedad",
        logo: DEFAULT_LOGO,
      },
      played: 10,
      won: 4,
      drawn: 4,
      lost: 2,
      goalsFor: 15,
      goalsAgainst: 12,
      goalDifference: 3,
      points: 16
    },
    {
      position: 8,
      team: {
        name: "Athletic Club",
        logo: DEFAULT_LOGO,
      },
      played: 10,
      won: 4,
      drawn: 3,
      lost: 3,
      goalsFor: 14,
      goalsAgainst: 12,
      goalDifference: 2,
      points: 15
    },
  ];
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

