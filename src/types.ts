export interface Stat {
  id: string;
  value: number; // For counting up
  suffix: string; // e.g. "+", " members"
  label: string;
  description: string;
}

export interface TeamStanding {
  id: string;
  rank: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  form: ('W' | 'D' | 'L')[];
}

export interface MatchFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  homeScore?: number;
  awayScore?: number;
}

export interface PlayerStat {
  id: string;
  name: string;
  team: string;
  goals: number;
  assists: number;
  matchesPlayed: number;
}

export interface PastWinner {
  year: string;
  champion: string;
  runnerUp: string;
  score: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Sports' | 'Festival' | 'Music' | 'Community';
  date: string; // e.g. "June 15, 2026"
  time: string; // e.g. "4:00 PM"
  venue: string;
  description: string;
  image: string;
  fallback?: string;
  ticketInfo: string; // e.g. "Free Entry", "🎟️ Regular: ₦2,000"
}

export interface GalleryItem {
  id: string;
  category: 'sports' | 'festivals' | 'community' | 'behind-scenes';
  title: string;
  description: string;
  url: string;
  fallback?: string;
}
