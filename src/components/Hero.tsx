import { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { upcomingEvents } from '../data/events';
import Logo from './Logo';

const heroSlides = [
  {
    id: 'intro',
    subtitle: 'Est. 2019 • Katsina, Nigeria',
    titleLine1: "Katsina's Epicenter",
    titleLine2: "of Energy",
    description: "7 Rings is a youth-led pioneer collective dedicated to driving community impact, sporting excellence via futsal, and epic cultural entertainment across Northern Nigeria.",
    tagline: "PREMIER ARTS, SPORTS, & ENTERTAINMENT",
    imageUrl: null, // represents the solid cinematic/neon backdrop
    isIntroLogo: true
  },
  {
    id: 'sports',
    subtitle: '7Rings Champions League (7RCL)',
    titleLine1: "Futsal Elite",
    titleLine2: "Tournaments",
    description: "Unleashing raw athletic potential under state-of-the-art floodlights. Experience Katsina's most fiercely contested futsal sporting season.",
    tagline: "ATHLETIC EXCELLENCE & GLORY",
    imageUrl: "https://i.ibb.co/V06zd5dx/Save-Clip-App-581691390-18123718276512424-4472935210024812663-n.jpg",
    isIntroLogo: false
  },
  {
    id: 'festivals',
    subtitle: 'Katsina Annual Sallah Youth Fiesta',
    titleLine1: "Unrivaled Cultural",
    titleLine2: "Festivals",
    description: "Fusing traditional Northern Nigerian heritage with electric youth concerts, laser show stages, and stunning visual art exhibitions.",
    tagline: "CULTURE • ART • MUSIC",
    imageUrl: "https://i.ibb.co/gFhJm4Jh/Save-Clip-App-708488662-18142802983512424-676758296547457732-n.jpg",
    isIntroLogo: false
  },
  {
    id: 'community',
    subtitle: 'GRA Community Outreaches',
    titleLine1: "Active Civic",
    titleLine2: "Impact",
    description: "Empowering Katsina youth through city sweepups, recycling programs, and the GRA Food Relief Drive distributing over 2,000+ hot meals.",
    tagline: "YOUTH-LED SOLIDARITY & MUTUAL AID",
    imageUrl: "https://i.ibb.co/fVvKzP9v/Save-Clip-App-654025080-18153476899394895-5793490402214125762-n.jpg",
    isIntroLogo: false
  }
];

export default function Hero({ onOpenTickets }: { onOpenTickets: (eventId: string | null) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play interval for background slide looping
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Transitions comfortably every 6 seconds
    return () => clearInterval(timer);
  }, []);

  // Handle smooth scroll to page sections
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Extract events for scrolling ticker loop
  const liveEvents = upcomingEvents.slice(0, 3);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center bg-[#050505] overflow-hidden pt-20"
    >
      {/* Cinematic Glowing Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <AnimatePresence mode="popLayout">
          {heroSlides.map((slide, idx) => {
            if (idx !== currentSlide) return null;
            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {slide.imageUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={slide.imageUrl}
                      alt={slide.titleLine1}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Multi-layered dark and neon overlays for absolute readability */}
                    <div className="absolute inset-0 bg-black/75 dark:bg-black/85" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                  </div>
                ) : (
                  // Deep atmospheric home gradient
                  <div className="w-full h-full bg-[#050505] relative">
                    <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-neon/10 blur-[130px] animate-pulse duration-[8000ms]" />
                    <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gold-accent/5 blur-[150px] animate-pulse duration-[12000ms]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Global Structural Grids & Floating Lines */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" 
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-neon/20 to-transparent" />
      </div>

      {/* Floating Sparkles/Particle Nodes */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-cyan-neon rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(0,229,255,0.8)',
              animation: `floatUp ${8 + Math.random() * 12}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Hero Content Area */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Content Slideshow Wrapper (crossfades details dynamically) */}
        <div className="min-h-[380px] sm:min-h-[440px] flex flex-col justify-center items-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full"
            >
              {/* Centerpiece Branding representation */}
              <div className="mb-4 transform transition-all duration-700 select-none pb-2">
                {heroSlides[currentSlide].isIntroLogo ? (
                  <Logo size="hero" showText={true} variant="dark" className="drop-shadow-[0_0_35px_rgba(27,82,255,0.4)]" />
                ) : (
                  <div className="scale-90 hover:scale-100 duration-300">
                    <Logo size="md" showText={false} variant="dark" className="drop-shadow-[0_0_20px_rgba(27,82,255,0.45)] hover:brightness-110" />
                  </div>
                )}
              </div>

              {/* Active Tagline Badge - Placed below the logo for optimum visibility */}
              <div
                className="inline-flex items-center space-x-2 bg-black/85 border border-zinc-800/80 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                id="hero-tagline-badge"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-neon animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-cyan-neon font-extrabold">
                  {heroSlides[currentSlide].tagline}
                </span>
              </div>

              {/* Title Section */}
              <div className="space-y-2 mt-1" id="hero-main-header">
                <h3 className="font-mono text-xs sm:text-sm text-gold-accent font-extrabold uppercase tracking-[0.25em] leading-none glow-gold">
                  {heroSlides[currentSlide].subtitle}
                </h3>
                <h1 className="font-display font-black text-3xl sm:text-5xl md:text-7xl text-white uppercase tracking-tight leading-none">
                  {heroSlides[currentSlide].titleLine1}{" "}
                  <br className="sm:hidden" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-neon via-white to-gold-accent">
                    {heroSlides[currentSlide].titleLine2}
                  </span>
                </h1>
              </div>

              {/* Description body */}
              <p className="mt-5 font-sans text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed" id="hero-subtitle">
                {heroSlides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-5 z-30"
          id="hero-ctas"
        >
          <button
            onClick={() => scrollTo('events')}
            className="group flex items-center justify-center space-x-2.5 bg-gradient-to-r from-cyan-neon to-blue-700 text-white font-space font-black text-xs uppercase tracking-wider py-4 px-8 rounded-sm cursor-pointer shadow-[0_4px_30px_rgba(27,82,255,0.4)] hover:shadow-[0_4px_45px_rgba(27,82,255,0.6)] transition-all transform hover:scale-103 hover:brightness-110"
            id="hero-cta-explore-events"
          >
            <span>Explore Events</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => scrollTo('sports')}
            className="flex items-center justify-center space-x-2 bg-transparent border border-white/60 hover:border-cyan-neon hover:text-white text-white font-space font-black text-xs uppercase tracking-wider py-4 px-8 rounded-sm cursor-pointer transition-all hover:scale-103 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            id="hero-cta-register-team"
          >
            <span>Register Team</span>
          </button>
        </motion.div>

        {/* Manual Slideshow Controls / Progress Index indicators */}
        <div className="flex justify-center items-center space-x-2.5 mt-10 z-30 mb-8" id="hero-slide-indicators">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentSlide === idx 
                  ? 'w-9 bg-cyan-neon shadow-[0_0_10px_rgba(0,229,255,0.85)]' 
                  : 'w-2.5 bg-gray-600 hover:bg-gray-400'
              }`}
              title={`Slide ${idx + 1}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Dynamic News Scrolling Event Ticker */}
      <div 
        className="absolute bottom-0 left-0 w-full bg-black/90 border-y border-zinc-900 py-3.5 backdrop-blur-sm z-30"
        id="hero-news-ticker"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden">
          <div className="flex items-center space-x-2 text-cyan-neon shrink-0 font-mono text-xs uppercase tracking-widest font-black mr-6 border-r border-zinc-800 pr-6">
            <span className="w-2.5 h-2.5 bg-cyan-neon rounded-full animate-ping" />
            <span>Next Up:</span>
          </div>
          
          <div className="w-full relative overflow-hidden h-6 flex items-center">
            <div className="animate-ticker flex space-x-16 text-sm font-sans text-gray-300 select-none whitespace-nowrap">
              {liveEvents.map((evt, idx) => (
                <div key={idx} className="flex items-center space-x-3 cursor-pointer hover:text-white" onClick={() => onOpenTickets(evt.id)}>
                  <Calendar className="w-4 h-4 text-gold-accent" />
                  <span className="font-bold text-white">{evt.date}</span>
                  <span className="text-gray-400">|</span>
                  <span className="uppercase text-xs tracking-wider border border-cyan-neon/30 rounded px-1.5 py-0.2 font-mono text-cyan-neon">
                    {evt.category}
                  </span>
                  <span>{evt.title}</span>
                  <span className="text-xs text-gray-500">({evt.venue})</span>
                </div>
              ))}
              {/* Duplicate loop */}
              {liveEvents.map((evt, idx) => (
                <div key={`dup-${idx}`} className="flex items-center space-x-3 cursor-pointer hover:text-white" onClick={() => onOpenTickets(evt.id)}>
                  <Calendar className="w-4 h-4 text-gold-accent" />
                  <span className="font-bold text-white">{evt.date}</span>
                  <span className="text-gray-400">|</span>
                  <span className="uppercase text-xs tracking-wider border border-cyan-neon/30 rounded px-1.5 py-0.2 font-mono text-cyan-neon">
                    {evt.category}
                  </span>
                  <span>{evt.title}</span>
                  <span className="text-xs text-gray-500">({evt.venue})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Spark Keyframe Styling */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100px) scale(0.8);
            opacity: 0;
          }
          20% { opacity: 0.7; }
          80% { opacity: 0.7; }
          100% {
            transform: translateY(-200px) scale(1.3);
            opacity: 0;
          }
        }
        @keyframes ticker-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker-slide 30s infinite linear;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
