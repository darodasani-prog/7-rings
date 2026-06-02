import { motion } from 'motion/react';
import { Calendar, MapPin, Tag, ArrowUpRight, Award, Music, Sparkles } from 'lucide-react';
import { upcomingEvents } from '../data/events';

export default function Events({ onOpenTickets }: { onOpenTickets: (eventId: string) => void }) {
  const venuePartners = [
    {
      name: 'Capital One Star Event Complex',
      location: 'GRA Area, Katsina (Near Old Government House)',
      features: 'High capacity outdoor stage, floodlights, premium security, air-conditioned VIP domes, custom food parks.',
      image: 'https://i.ibb.co/0pXTC63n/Save-Clip-App-708967344-18142802164512424-6944440201580021835-n.jpg'
    },
    {
      name: 'Muhammad Dikko Stadium',
      location: 'Futsal Main Arena, Katsina State',
      features: 'Full audience seating, synthetic pro futsal flooring, secure team locker rooms, digital scoreboard.',
      image: 'https://i.ibb.co/21GVk3ZS/Save-Clip-App-612492757-18434990020104472-1418675101823816177-n.jpg'
    }
  ];

  const pastEventPreviews = [
    {
      title: '2025 Sallah Music Fest',
      date: 'Eid-El-Kabir 2025',
      spectators: '5,000+ Youth',
      bgImg: 'https://i.ibb.co/Pv9m1fbs/Save-Clip-App-608425459-18128413468512424-1110371233661330437-n.jpg'
    },
    {
      title: '7RCL Championship Game 2025',
      date: 'December 2025',
      spectators: 'Full Capacity Crowd',
      bgImg: 'https://i.ibb.co/7dDFQtP8/Save-Clip-App-612594851-18434989867104472-5998431100374540038-n.jpg'
    },
    {
      title: '7Rings Katsina Art Fair',
      date: 'September 2025',
      spectators: '30+ Artists Showcased',
      bgImg: 'https://i.ibb.co/1t5xMRZW/Save-Clip-App-612098626-18434990029104472-2863604098205038663-n.jpg'
    }
  ];

  return (
    <section id="events" className="relative py-28 bg-[#050505] overflow-hidden border-b border-gray-900">
      {/* Background vector accents */}
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-cyan-neon/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header Block */}
        <div className="text-center mb-20">
          <span className="font-mono text-xs text-gold-accent uppercase tracking-[0.4em] font-black block mb-2">
            The Event Agenda
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Upcoming <span className="text-cyan-neon glow-cyan">Fiestas &amp; Tournaments</span>
          </h2>
          <p className="mt-4 font-sans text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Experience Katsinas premier entertainment calendar, engineered by the youth for the community. Secure your passes early.
          </p>
        </div>

        {/* Calendar Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24" id="events-grid">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              onClick={() => onOpenTickets(event.id)}
              className="bg-black/80 border border-zinc-900 rounded-sm overflow-hidden flex flex-col justify-between group cursor-pointer shadow-xl relative"
              id={`event-card-${event.id}`}
            >
              {/* Outer Cyan Laser Border on Hover */}
              <div className="absolute inset-0 border border-cyan-neon/0 group-hover:border-cyan-neon/30 transition-colors pointer-events-none z-30" />

              {/* Event Image Container with Zoom effect */}
              <div className="relative h-64 overflow-hidden shrink-0">
                <img
                  referrerPolicy="no-referrer"
                  src={event.image}
                  alt={event.title}
                  onError={(e) => {
                    if (event.fallback && e.currentTarget.src !== event.fallback) {
                      e.currentTarget.src = event.fallback;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Category Badge Floating */}
                <span className="absolute top-4 left-4 font-mono text-[10px] font-extrabold uppercase tracking-widest text-black bg-cyan-neon px-3 py-1 rounded">
                  {event.category}
                </span>

                {/* Ticket floating price info */}
                <span className="absolute bottom-4 right-4 font-sans text-xs font-bold text-white bg-black/70 border border-zinc-800 px-3 py-1 rounded backdrop-blur-xs">
                  {event.ticketInfo}
                </span>
              </div>

              {/* Event Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-4 font-mono text-xs text-gold-accent mb-3 font-semibold">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-neon transition-colors leading-tight mb-3">
                    {event.title}
                  </h3>

                  <p className="font-sans text-gray-400 text-sm leading-relaxed mb-6">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-gray-500">
                    <MapPin className="w-4 h-4 text-cyan-neon shrink-0" />
                    <span className="font-sans text-xs font-bold text-gray-400 max-w-[200px] truncate">
                      {event.venue}
                    </span>
                  </div>

                  <span className="font-space font-extrabold text-[11px] text-cyan-neon uppercase tracking-wide flex items-center space-x-1 group-hover:text-gold-accent transition-colors">
                    <span>Reserve Passes</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Venue Partners Showcase */}
        <div className="mb-24" id="venue-partners-showcase">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-cyan-neon uppercase tracking-[0.4em] font-extrabold">
              Elite Arenas
            </span>
            <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-wider block mt-2">
              Our Strategic Venue Partners
            </h3>
            <p className="font-sans text-gray-400 text-sm mt-1">
              Hosting premium tournaments, festivals, and cultural activities in safe GRA zones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {venuePartners.map((venue, idx) => (
              <div
                key={idx}
                className="bg-zinc-950 border border-zinc-900 rounded-sm p-4 flex flex-col md:flex-row items-center gap-6 group hover:border-gray-800 transition-all"
                id={`partner-venue-${idx}`}
              >
                <div className="relative w-full md:w-44 h-28 overflow-hidden rounded-sm shrink-0">
                  <img
                    referrerPolicy="no-referrer"
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <div>
                  <h4 className="font-display font-bold text-lg text-white uppercase group-hover:text-cyan-neon transition-colors">
                    {venue.name}
                  </h4>
                  <div className="flex items-center space-x-1 text-gold-accent mt-1 mb-2">
                    <MapPin className="w-3 h-3 text-gold-accent shrink-0" />
                    <span className="font-sans text-[11px] text-gray-400 font-bold">{venue.location}</span>
                  </div>
                  <p className="font-sans text-gray-400 text-xs leading-relaxed">
                    {venue.features}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Historic Event Recaps */}
        <div id="past-events-recap-gallery">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-gold-accent uppercase tracking-[0.4em] font-extrabold">
              Chronicles
            </span>
            <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-wider block mt-2">
              Legacy Event Glows
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEventPreviews.map((pre, idx) => (
              <div
                key={idx}
                className="relative h-64 overflow-hidden rounded-sm group cursor-pointer shadow-lg"
                id={`past-recap-card-${idx}`}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={pre.bgImg}
                  alt={pre.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-750"
                />
                
                {/* Visual Glass Dimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Sliding metadata overlays */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="font-mono text-[10px] text-gold-accent font-semibold uppercase tracking-wider mb-1">
                    {pre.date}
                  </span>
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                    {pre.title}
                  </h4>
                  
                  <div className="h-0 group-hover:h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2">
                    <p className="font-mono text-xs text-cyan-neon uppercase font-bold flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Impact: {pre.spectators}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
