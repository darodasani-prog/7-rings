import { useState, useEffect } from 'react';
import { Menu, X, Trophy, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      return 'dark'; // default is dark mode
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: '7RCL Sports', id: 'sports' },
    { label: 'Events', id: 'events' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple active link detection
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const element = document.getElementById(link.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-bg/90 backdrop-blur-md border-b border-gray-800 py-4 shadow-lg'
          : 'bg-transparent py-6 navbar-top-unscrolled'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Stylized Logo Area */}
          <div 
            onClick={() => scrollToSection('home')}
            className="flex items-center cursor-pointer group"
            id="nav-logo-container"
          >
            <Logo size="sm" showText={true} variant={(!isScrolled || theme === 'dark') ? 'dark' : 'light'} className="-my-2" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" id="desktop-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative font-sans text-sm uppercase tracking-wider font-semibold transition-colors duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? 'text-cyan-neon'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-cyan-neon"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Call To Action Buttons */}
          <div className="hidden md:flex items-center space-x-4" id="nav-cta-container">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-gray-800 text-gray-400 hover:text-cyan-neon hover:border-cyan-neon/30 bg-black/40 transition-all cursor-pointer flex items-center justify-center h-9 w-9"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
              ) : (
                <Sun className="w-4 h-4 text-gold-accent" />
              )}
            </button>

            <button
              onClick={() => scrollToSection('sports')}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-neon to-blue-700 hover:brightness-110 text-white font-space font-extrabold text-xs px-5 py-2.5 rounded-sm uppercase tracking-wider shadow-[0_0_20px_rgba(27,82,255,0.4)] transition-all cursor-pointer hover:scale-103"
            >
              <Trophy className="w-4 h-4" />
              <span>7RCL Register</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center" id="mobile-hamburger-btn">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-gray-800"
            id="mobile-menu-drawer"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-3 py-2.5 rounded text-base uppercase tracking-widest font-semibold ${
                    activeSection === link.id
                      ? 'text-cyan-neon bg-cyan-neon/10 border-l-2 border-cyan-neon'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-zinc-800 px-3 flex flex-col space-y-3">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center space-x-2.5 bg-zinc-900 border border-gray-800 hover:border-cyan-neon text-gray-300 py-3 rounded-sm uppercase tracking-wider font-semibold text-xs"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4 text-zinc-500" />
                      <span>Switch to Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 text-gold-accent" />
                      <span>Switch to Light Mode</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => scrollToSection('sports')}
                  className="w-full text-center flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-neon to-blue-700 text-white font-space font-extrabold py-3 rounded-sm uppercase tracking-wider shadow-[0_0_20px_rgba(27,82,255,0.3)]"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Register Futsal Team</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
