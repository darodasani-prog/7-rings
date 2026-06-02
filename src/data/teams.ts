import { TeamStanding, MatchFixture, PlayerStat, PastWinner } from '../types';

export const teamStandings: TeamStanding[] = [
  {
    id: 'gobarau',
    rank: 1,
    name: 'Gobarau United',
    played: 7,
    won: 5,
    drawn: 2,
    lost: 0,
    goalsFor: 18,
    goalsAgainst: 8,
    points: 17,
    form: ['W', 'D', 'W', 'W', 'W', 'D', 'W'],
  },
  {
    id: 'gra-titans',
    rank: 2,
    name: 'GRA Titans',
    played: 7,
    won: 4,
    drawn: 2,
    lost: 1,
    goalsFor: 14,
    goalsAgainst: 9,
    points: 14,
    form: ['W', 'W', 'L', 'D', 'W', 'W', 'D'],
  },
  {
    id: 'durbi-strikers',
    rank: 3,
    name: 'Kofar Durbi Futsal',
    played: 7,
    won: 4,
    drawn: 1,
    lost: 2,
    goalsFor: 16,
    goalsAgainst: 12,
    points: 13,
    form: ['W', 'L', 'W', 'D', 'W', 'L', 'W'],
  },
  {
    id: 'dikko-warriors',
    rank: 4,
    name: 'Dikko Warriors',
    played: 7,
    won: 3,
    drawn: 2,
    lost: 2,
    goalsFor: 12,
    goalsAgainst: 11,
    points: 11,
    form: ['L', 'W', 'W', 'D', 'L', 'D', 'W'],
  },
  {
    id: 'kaura-kings',
    rank: 5,
    name: 'Kofar Kaura Kings',
    played: 7,
    won: 2,
    drawn: 1,
    lost: 4,
    goalsFor: 9,
    goalsAgainst: 13,
    points: 7,
    form: ['L', 'L', 'W', 'L', 'D', 'W', 'L'],
  },
  {
    id: 'capital-stars',
    rank: 6,
    name: 'Capital Star FC',
    played: 7,
    won: 1,
    drawn: 2,
    lost: 4,
    goalsFor: 10,
    goalsAgainst: 16,
    points: 5,
    form: ['D', 'L', 'L', 'W', 'L', 'L', 'D'],
  },
  {
    id: 'kwaya-rangers',
    rank: 7,
    name: 'Kofar Kwaya Rangers',
    played: 7,
    won: 1,
    drawn: 1,
    lost: 5,
    goalsFor: 8,
    goalsAgainst: 15,
    points: 4,
    form: ['L', 'W', 'L', 'L', 'L', 'D', 'L'],
  },
  {
    id: 'sauri-athletic',
    rank: 8,
    name: 'Kofar Sauri Athletic',
    played: 7,
    won: 0,
    drawn: 3,
    lost: 4,
    goalsFor: 7,
    goalsAgainst: 15,
    points: 3,
    form: ['L', 'D', 'L', 'D', 'L', 'D', 'L'],
  }
];

export const matchFixtures: MatchFixture[] = [
  {
    id: 'f-live-1',
    homeTeam: 'Gobarau United',
    awayTeam: 'GRA Titans',
    date: 'Jun 4, 2026',
    time: '7:30 PM',
    venue: 'Capital One Star Event Complex',
    status: 'UPCOMING'
  },
  {
    id: 'f-up-1',
    homeTeam: 'Kofar Durbi Futsal',
    awayTeam: 'Dikko Warriors',
    date: 'Jun 5, 2026',
    time: '6:00 PM',
    venue: 'Muhammad Dikko Stadium (Futsal Arena)',
    status: 'UPCOMING'
  },
  {
    id: 'f-up-2',
    homeTeam: 'Kofar Kaura Kings',
    awayTeam: 'Capital Star FC',
    date: 'Jun 5, 2026',
    time: '8:00 PM',
    venue: 'Muhammad Dikko Stadium (Futsal Arena)',
    status: 'UPCOMING'
  },
  {
    id: 'f-done-1',
    homeTeam: 'Gobarau United',
    awayTeam: 'Kofar Kwaya Rangers',
    date: 'May 28, 2026',
    time: '7:00 PM',
    venue: 'Capital One Star Event Complex',
    status: 'COMPLETED',
    homeScore: 3,
    awayScore: 1
  },
  {
    id: 'f-done-2',
    homeTeam: 'GRA Titans',
    awayTeam: 'Kofar Sauri Athletic',
    date: 'May 27, 2026',
    time: '8:30 PM',
    venue: 'Capital One Star Event Complex',
    status: 'COMPLETED',
    homeScore: 2,
    awayScore: 2
  }
];

export const playerStats: PlayerStat[] = [
  {
    id: 'p1',
    name: 'Aminu Katsina',
    team: 'Gobarau United',
    goals: 9,
    assists: 4,
    matchesPlayed: 7
  },
  {
    id: 'p2',
    name: 'Shehu Dikko',
    team: 'Kof Durbi Futsal',
    goals: 7,
    assists: 3,
    matchesPlayed: 6
  },
  {
    id: 'p3',
    name: 'Farouk GRA',
    team: 'GRA Titans',
    goals: 6,
    assists: 5,
    matchesPlayed: 7
  },
  {
    id: 'p4',
    name: 'Bello Danmariya',
    team: 'Dikko Warriors',
    goals: 5,
    assists: 6,
    matchesPlayed: 7
  }
];

export const pastWinners: PastWinner[] = [
  {
    year: '2025',
    champion: 'GRA Titans',
    runnerUp: 'Gobarau United',
    score: '4 - 3'
  },
  {
    year: '2024',
    champion: 'Gobarau United',
    runnerUp: 'Kofar Durbi Futsal',
    score: '2 - 0'
  },
  {
    year: '2023',
    champion: 'Muhammad Dikko FC',
    runnerUp: 'GRA Titans',
    score: '5 - 2'
  }
];
