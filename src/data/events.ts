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
    image: 'https://i.ibb.co/V06zd5dx/Save-Clip-App-581691390-18123718276512424-4472935210024812663-n.jpg',
    fallback: 'https://picsum.photos/id/857/800/600',
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
    image: 'https://i.ibb.co/p6Xbn0Rt/Save-Clip-App-584316658-18123718267512424-5020037727499504502-n.jpg',
    fallback: 'https://picsum.photos/id/829/800/600',
    ticketInfo: '🎟️ Regular Seat: ₦1,500 | VIP Seat: ₦10,000'
  },
  {
    id: 'e3',
    title: '7Rings Art & Cultural Exhibition',
    category: 'Music',
    date: 'Aug 12, 2026',
    time: '2:00 PM',
    venue: 'Muhammad Dikko Stadium (VIP Lounge)',
    description: 'A dedicated showcase of Northern Vietnams finest young visual artists, calligraphers, and photographers. Promoting artistic curation and empowering youth creatives.',
    image: 'https://i.ibb.co/twLZw1Pq/Save-Clip-App-659228844-18408400912176634-7455479025550447021-n.jpg',
    fallback: 'https://picsum.photos/id/353/800/600',
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
    image: 'https://i.ibb.co/fVvKzP9v/Save-Clip-App-654025080-18153476899394895-5793490402214125762-n.jpg',
    fallback: 'https://picsum.photos/id/442/800/600',
    ticketInfo: 'Volunteers Welcome!'
  }
];

export const galleryItems: GalleryItem[] = [
  // Sports category
  {
    id: 'g1',
    category: 'sports',
    title: 'Championship Trophy',
    description: 'Winning the 7Rings Champion League Gold Cup and celebrating victory in Katsina.',
    url: 'https://i.ibb.co/V06zd5dx/Save-Clip-App-581691390-18123718276512424-4472935210024812663-n.jpg',
    fallback: 'https://picsum.photos/id/1058/800/800'
  },
  {
    id: 'g2',
    category: 'sports',
    title: 'Official 7Rings Team Uniform',
    description: 'Team members proudly presenting the official 7 Rings Art & Entertainment custom jerseys.',
    url: 'https://i.ibb.co/0pXTC63n/Save-Clip-App-708967344-18142802164512424-6944440201580021835-n.jpg',
    fallback: 'https://picsum.photos/id/1071/800/800'
  },
  {
    id: 'g3',
    category: 'sports',
    title: 'Leader Medals & Awards',
    description: 'Gold and silver medals prepared for the grand prize presentations of the tournament.',
    url: 'https://i.ibb.co/WNHpfVwF/Save-Clip-App-653993884-18093264559864687-5787243770548531931-n.jpg',
    fallback: 'https://picsum.photos/id/342/800/800'
  },
  {
    id: 'g3-b',
    category: 'sports',
    title: 'Trophy Display Cabinet',
    description: 'The golden championship trophy placed on the administrative presentation desk.',
    url: 'https://i.ibb.co/wNLY5cbY/Save-Clip-App-649228410-18131664610535244-1809602899638030740-n.jpg',
    fallback: 'https://picsum.photos/id/111/800/800'
  },
  // Festivals
  {
    id: 'g4',
    category: 'festivals',
    title: '7Rings Kallon Sallah Joint',
    description: 'The official event flyer capturing local vendors, ticket details, and security safeguards at Katsina.',
    url: 'https://i.ibb.co/p6Xbn0Rt/Save-Clip-App-584316658-18123718267512424-5020037727499504502-n.jpg',
    fallback: 'https://picsum.photos/id/111/800/800'
  },
  {
    id: 'g5',
    category: 'festivals',
    title: 'Katsina Durbar Horse Riding Heritage',
    description: 'Spectacular traditional Durbar horse procession celebrating northern custom.',
    url: 'https://i.ibb.co/gFhJm4Jh/Save-Clip-App-708488662-18142802983512424-676758296547457732-n.jpg',
    fallback: 'https://picsum.photos/id/319/800/800'
  },
  {
    id: 'g5-b',
    category: 'festivals',
    title: 'Sallah Fiesta Canopy Crowd',
    description: 'Massive audience gathered in community spirit under structured canopies in Katsina.',
    url: 'https://i.ibb.co/rRyNSmX3/Save-Clip-App-650768747-18127905763483122-36542067532795576-n.jpg',
    fallback: 'https://picsum.photos/id/111/800/800'
  },
  {
    id: 'g5-c',
    category: 'festivals',
    title: 'Outdoor Assembly Seating',
    description: 'Dignitaries and community members waiting for the cultural and sports events to open under shades.',
    url: 'https://i.ibb.co/N2TWvLtR/Save-Clip-App-706537643-18142802917512424-1556437736538690687-n.jpg',
    fallback: 'https://picsum.photos/id/111/800/800'
  },
  // Community
  {
    id: 'g6',
    category: 'community',
    title: 'GRA Feed Program Audience',
    description: 'Large community gatherings for youth outreach programs and meals distribution under tents.',
    url: 'https://i.ibb.co/fVvKzP9v/Save-Clip-App-654025080-18153476899394895-5793490402214125762-n.jpg',
    fallback: 'https://picsum.photos/id/454/800/800'
  },
  {
    id: 'g7',
    category: 'community',
    title: 'Government Sports Curation Meeting',
    description: '7Rings group presenting the championship trophy to the sports commissioner Ahmed Sodangi.',
    url: 'https://i.ibb.co/twLZw1Pq/Save-Clip-App-659228844-18408400912176634-7455479025550447021-n.jpg',
    fallback: 'https://picsum.photos/id/364/800/800'
  },
  {
    id: 'g7-b',
    category: 'community',
    title: 'Youth Advisory Dialogues',
    description: 'Collaborating with community elders and executives to curate youth entertainment projects.',
    url: 'https://i.ibb.co/9m7f3KXG/Save-Clip-App-582421801-18123718303512424-2154724019465476571-n.jpg',
    fallback: 'https://picsum.photos/id/364/800/800'
  },
  {
    id: 'g7-c',
    category: 'community',
    title: 'Kallon Sallah Food Support',
    description: 'Volunteers and local vendors serving refreshments and traditional meals to the community.',
    url: 'https://i.ibb.co/dJfB97Km/Save-Clip-App-709326026-2218332742268384-6240568668249596070-n.jpg',
    fallback: 'https://picsum.photos/id/364/800/800'
  },
  {
    id: 'g7-d',
    category: 'community',
    title: 'Youth Audience Seating Row',
    description: 'Local children, volunteers, and participants enjoying community and holiday outreach events.',
    url: 'https://i.ibb.co/qFNYLxcZ/Save-Clip-App-709265785-18142802077512424-5545461323682316098-n.jpg',
    fallback: 'https://picsum.photos/id/364/800/800'
  },
  // Behind-scenes
  {
    id: 'g8',
    category: 'behind-scenes',
    title: 'Apparel Design and Photoshoots',
    description: '7Rings creative designers modeling white and black collections behind the scenes.',
    url: 'https://i.ibb.co/rfcVBrWc/Save-Clip-App-707509538-18142534663512424-71640399992815418-n.jpg',
    fallback: 'https://picsum.photos/id/338/800/800'
  },
  {
    id: 'g9',
    category: 'behind-scenes',
    title: 'Our Executive Core Members',
    description: 'The founders and core team behind 7Rings Art & Entertainment gatherings in Katsina.',
    url: 'https://i.ibb.co/9FKZGkC/Save-Clip-App-651824541-18126394300495852-4899708957434712568-n.jpg',
    fallback: 'https://picsum.photos/id/447/800/800'
  },
  {
    id: 'g9-b',
    category: 'behind-scenes',
    title: '7Rings Merchandise Shoot',
    description: 'Promotional photoshoot showing custom crewnecks styled with premium minimal embroidery details.',
    url: 'https://i.ibb.co/VpBLKwYN/Save-Clip-App-583348484-18123718294512424-4801092342616016727-n.jpg',
    fallback: 'https://picsum.photos/id/447/800/800'
  },
  {
    id: 'g9-c',
    category: 'behind-scenes',
    title: 'Core Creative Studio Session',
    description: 'Founders presenting official branded wear during team assemblies in Katsina.',
    url: 'https://i.ibb.co/sd0S3NNj/Save-Clip-App-649474129-18113149723655861-2380016703338961957-n.jpg',
    fallback: 'https://picsum.photos/id/447/800/800'
  },
  {
    id: 'g9-d',
    category: 'behind-scenes',
    title: '7Rings Branding Emblem',
    description: 'Official branding seal designed for high-resolution graphics, jersey prints, and flags.',
    url: 'https://i.ibb.co/TxXPn1XD/Save-Clip-App-707912711-18142802068512424-8347525257418168244-n.jpg',
    fallback: 'https://picsum.photos/id/447/800/800'
  },
  {
    id: 'g10',
    category: 'behind-scenes',
    title: 'Creative Team Briefing',
    description: 'Interactive reviews of custom apparel mockups and upcoming tournament planning agendas.',
    url: 'https://i.ibb.co/m5ShjfkN/Save-Clip-App-710351498-18142802146512424-5438432834428332580-n.jpg',
    fallback: 'https://picsum.photos/id/447/800/800'
  },
  {
    id: 'g11',
    category: 'behind-scenes',
    title: 'Core Director Close-up',
    description: 'One of the lead executive directors of 7Rings reviewing plans in our office.',
    url: 'https://i.ibb.co/ZtjRFSX/Save-Clip-App-502732956-18105965230512424-6356013861276583811-n.jpg',
    fallback: 'https://picsum.photos/id/447/800/800'
  }
];
