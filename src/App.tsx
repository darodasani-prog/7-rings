import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import SportsHub from './components/SportsHub';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TicketSales from './components/TicketSales';

export default function App() {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleOpenTickets = (eventId: string | null = null) => {
    setSelectedEventId(eventId);
    setIsTicketModalOpen(true);
  };

  return (
    <div className="bg-dark-bg min-h-screen relative overflow-x-hidden selection:bg-cyan-neon selection:text-black">
      {/* Decorative Outer Border Lines (Anti-Slop Framing / Human Curation style) */}
      <div className="fixed inset-y-0 left-0 w-1 sm:w-1.5 bg-gradient-to-b from-cyan-neon via-transparent to-gold-accent opacity-40 z-50 pointer-events-none" />
      <div className="fixed inset-y-0 right-0 w-1 sm:w-1.5 bg-gradient-to-t from-cyan-neon via-transparent to-gold-accent opacity-40 z-50 pointer-events-none" />

      {/* Structured Single Page Layout */}
      <Navbar onOpenTickets={handleOpenTickets} />
      
      <main className="flex flex-col w-full relative z-10" id="main-content-flow">
        <Hero onOpenTickets={handleOpenTickets} />
        
        {/* We place Stats right after Hero to draw immediate eyes to the brand's social impact metrics */}
        <Stats />
        
        <About />
        
        <SportsHub />
        
        <Events onOpenTickets={handleOpenTickets} />
        
        <Gallery />
        
        <Contact />
      </main>

      <Footer />

      {/* Dynamic Ticketing Modal Overlay */}
      <TicketSales 
        isOpen={isTicketModalOpen} 
        onClose={() => setIsTicketModalOpen(false)} 
        preselectedEventId={selectedEventId} 
      />
    </div>
  );
}
