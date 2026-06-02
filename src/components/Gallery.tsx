import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Instagram, Eye } from 'lucide-react';
import { galleryItems } from '../data/events';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter gallery items based on selection
  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'sports', label: 'Sports (Futsal)' },
    { id: 'festivals', label: 'Festivals & Culture' },
    { id: 'community', label: 'Community Outreaches' },
    { id: 'behind-scenes', label: 'Behind the Scenes' }
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredItems.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredItems.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <section id="gallery" className="relative py-28 bg-dark-bg border-b border-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Gallery Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-cyan-neon uppercase tracking-[0.4em] font-extrabold block mb-2">
            Visual Broadcasts
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            MEDIA <span className="text-gold-accent">ARCHIVES</span>
          </h2>
          <p className="mt-4 font-sans text-gray-400 text-sm max-w-2xl mx-auto">
            Glimpse into high-energy game-winning goals, immersive crowd sound stages, and food relief drives held right here in Katsina.
          </p>
        </div>

        {/* Filter Selection Controls */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12" id="gallery-category-chips">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setLightboxIndex(null); // safely invalidate lightbox scope
              }}
              className={`px-3 py-1.5 sm:px-4.5 sm:py-2 rounded-sm font-space font-extrabold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest cursor-pointer transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-neon text-black box-glow-cyan font-black'
                  : 'bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active Grid Section */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-24"
          id="gallery-masonry"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="relative aspect-square bg-[#0c0c0c] border border-zinc-900 rounded-sm overflow-hidden group cursor-pointer"
                id={`gallery-item-${item.id}`}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Visual Accent Hover Veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Animated labels popping up on hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-neon font-black block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-display font-extrabold text-base text-white uppercase tracking-tight truncate">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-gray-400 min-h-0 truncate">
                    {item.description}
                  </p>
                  
                  <div className="mt-3 inline-flex items-center space-x-1.5 text-xs text-gold-accent font-mono font-bold">
                    <Eye className="w-3.5 h-3.5 text-gold-accent" />
                    <span>Click to enlarge</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Featured Live Media Source Feed (e.g. Instagram Showcase Block) */}
        <div id="gallery-social-source" className="bg-[#050505] border border-zinc-900 rounded-sm p-8 flex flex-col lg:flex-row items-center justify-between gap-8 box-glow-gold">
          <div className="flex items-center space-x-4 max-w-lg">
            <div className="p-4 rounded bg-rose-950/20 text-rose-400 border border-rose-900/40 shrink-0">
              <Instagram className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-display font-black text-xl text-white uppercase">Follow @x_7rings</h4>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                Connect with our active socials to look behind the curtains, view video updates, match highlights, tournament streaming, and get notified on our weekly outreach agendas.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://instagram.com/x_7rings"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-sm bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 font-space font-black text-xs text-white uppercase tracking-widest hover:brightness-110 transition-all flex items-center space-x-2"
            >
              <span>Verify Instagram Feed</span>
            </a>
            
            <a
              href="https://x.com/7Rings909"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-sm bg-black border border-zinc-800 text-gray-300 font-space font-semibold text-xs uppercase tracking-widest hover:border-gray-600 transition-colors"
            >
              <span>Follow X @7Rings909</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Overlay Viewer */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-500 bg-black/98 backdrop-blur-md flex flex-col justify-center items-center p-4 select-none"
            id="gallery-lightbox"
          >
            {/* Safe Close Button area */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2.5 bg-zinc-950/80 border border-zinc-800 rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-neon"
              aria-label="Close image viewer"
            >
              <Close className="w-6 h-6 border-none" />
            </button>

            {/* Content Core Grid */}
            <div className="relative max-w-4xl w-full flex items-center justify-center">
              
              {/* Previous Clicker Column */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:-left-16 z-20 text-gray-400 hover:text-white p-3 rounded-full bg-zinc-950/60 border border-zinc-850 cursor-pointer focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Core Image frame */}
              <div className="flex flex-col items-center bg-black/40 border border-zinc-900 rounded p-3 shadow-2xl relative max-h-[80vh] w-full max-w-2xl overflow-hidden justify-center">
                <img
                  referrerPolicy="no-referrer"
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[60vh] object-contain rounded-sm"
                />
                
                <div className="mt-4 text-center w-full px-4">
                  <span className="font-mono text-[9px] text-cyan-neon font-black uppercase tracking-widest block mb-1">
                    Category: {filteredItems[lightboxIndex].category}
                  </span>
                  <h4 className="font-display font-extrabold text-lg text-white uppercase tracking-tight leading-none mb-1">
                    {filteredItems[lightboxIndex].title}
                  </h4>
                  <p className="font-sans text-xs text-gray-400 leading-normal max-w-md mx-auto">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>
              </div>

              {/* Next Clicker Column */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:-right-16 z-20 text-gray-400 hover:text-white p-3 rounded-full bg-zinc-950/60 border border-zinc-850 cursor-pointer focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>

            {/* Quick Helper guidelines line */}
            <div className="absolute bottom-6 font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden sm:block">
              Use keyboard ← or → keys to navigate • Esc to dismiss
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Lightbox custom icon bridges because "lucide-react" exports "X" for Close
function Close({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
