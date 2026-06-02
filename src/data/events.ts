import { EventItem, GalleryItem } from '../types';

export const upcomingEvents: EventItem[] = [
  {
    id: 'e1',
    title: '7Rings Champions League Grand Finale',
    category: 'Sports',
    date: 'Jun 14, 2026',
    time: '6:30 PM',
    venue: 'Capital One Star Event Complex',
    description: 'The spectacular final showdown of the Katsina Futsal season. Elite play, live DJ sets, trophy presentation under the stars, and guest celebrity appearances.',
    image: 'https://picsum.photos/id/857/800/600', // Athletic arena vibe
    ticketInfo: '🎟️ Regular: ₦1,000 | VIP: ₦5,000'
  },
  {
    id: 'e2',
    title: 'Katsina Annual Sallah Youth Fiesta',
    category: 'Festival',
    date: 'Jul 2, 2026',
    time: '4:00 PM',
    venue: 'Capital One Star Event Complex',
    description: 'Celebrating cultural heritage and unity with the largest youth concert in Katsina. Featuring traditional and modern musical performances, food stalls, and art installations.',
    image: 'https://picsum.photos/id/829/800/600', // Concert/Crowd lighting
    ticketInfo: '🎟️ Entry: Free (Sponsorship Supported)'
  },
  {
    id: 'e3',
    title: '7Rings Art & Cultural Exhibition',
    category: 'Music',
    date: 'Aug 12, 2026',
    time: '2:00 PM',
    venue: 'Muhammad Dikko Stadium (VIP Lounge)',
    description: 'A dedicated showcase of Northern Nigerias finest young visual artists, calligraphers, and photographers. Promoting artistic curation and empowering youth creatives.',
    image: 'https://picsum.photos/id/353/800/600', // Artistic/Gallery setting
    ticketInfo: '🎟️ Invitation Only / General Pass ₦1,500'
  },
  {
    id: 'e4',
    title: 'Katsina GRA Community Clean Outreach',
    category: 'Community',
    date: 'Sep 5, 2026',
    time: '8:00 AM',
    venue: 'Old Government House GRA Roundabout',
    description: 'Empowering youth through environmental action. Giving back to Katsina through city sweepups, recycling drives, and distributing 2,000+ free hot meals to kids.',
    image: 'https://picsum.photos/id/442/800/600', // Teamwork/Outdoors
    ticketInfo: 'Volunteers Welcome!'
  }
];

export const galleryItems: GalleryItem[] = [
  // Sports category
  {
    id: 'g1',
    category: 'sports',
    title: 'Championship Trophy Lift',
    description: 'Winning team holding up the 7Rings golden cup in front of a packed stadium.',
    url: 'https://picsum.photos/id/1058/800/800'
  },
  {
    id: 'g2',
    category: 'sports',
    title: 'Bicycle Kick under floodlights',
    description: 'Stunning overhead strike caught in high-speed motion in Katsina GRA.',
    url: 'https://picsum.photos/id/1071/800/800'
  },
  {
    id: 'g3',
    category: 'sports',
    title: 'Futsal High intensity duel',
    description: 'Intense 1-on-1 dribble during the group stages of 7RCL.',
    url: 'https://picsum.photos/id/342/800/800'
  },
  // Festivals
  {
    id: 'g4',
    category: 'festivals',
    title: 'Sallah Fiesta Stage',
    description: 'Laser projections illuminating 5,000 attendees hands raised high in Katsina.',
    url: 'https://picsum.photos/id/111/800/800'
  },
  {
    id: 'g5',
    category: 'festivals',
    title: 'Durbar Royal Horse-riders',
    description: 'Traditional Katsina horsemen displaying intricate royal robes during Eid celebrations.',
    url: 'https://picsum.photos/id/319/800/800'
  },
  // Community
  {
    id: 'g6',
    category: 'community',
    title: 'GRA Feed Program Distribution',
    description: '7 Rings volunteers distributing packed meal bags and water in Katsina.',
    url: 'https://picsum.photos/id/454/800/800'
  },
  {
    id: 'g7',
    category: 'community',
    title: 'Youth Mentorship Forum',
    description: 'Providing business and content-creation guidelines to aspiring creatives.',
    url: 'https://picsum.photos/id/364/800/800'
  },
  // Behind-scenes
  {
    id: 'g8',
    category: 'behind-scenes',
    title: 'Sound Check Session',
    description: 'Laying down tech lines and heavy bass rigs for the Sallah Concert.',
    url: 'https://picsum.photos/id/338/800/800'
  },
  {
    id: 'g9',
    category: 'behind-scenes',
    title: 'Strategy Talk in Locker Room',
    description: 'Gobarau United coach sketch layout adjustments on the chalkboard.',
    url: 'https://picsum.photos/id/447/800/800'
  }
];
