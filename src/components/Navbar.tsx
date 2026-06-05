import { useState, useEffect } from 'react';
import { Menu, X, Trophy, Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenTickets }: { onOpenTickets: (eventId?: string | null) => void }) {
  const { user, loginWithGoogle, logout, authError, setAuthError } = useAuth();
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
          <div className="hidden md:flex items-center space-x-3" id="nav-cta-container">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-800 text-gray-400 hover:text-cyan-neon hover:border-cyan-neon/30 bg-black/40 transition-all cursor-pointer flex items-center justify-center h-8.5 w-8.5"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
              ) : (
                <Sun className="w-4 h-4 text-gold-accent" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-2 border border-zinc-805 bg-black/50 px-2.5 py-1 rounded-sm h-8.5">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-5 h-5 rounded-full border border-zinc-700" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-cyan-neon/20 border border-cyan-neon/40 flex items-center justify-center text-[10px] text-cyan-neon font-black uppercase">
                    {(user.displayName || 'U')[0]}
                  </div>
                )}
                <span className="text-zinc-350 text-[11px] font-sans font-medium max-w-[70px] truncate">{user.displayName || 'Member'}</span>
                <button
                  onClick={logout}
                  className="text-[9px] font-mono text-zinc-500 hover:text-red-400 transition-colors uppercase font-bold pl-2 border-l border-zinc-800"
                  title="Sign Out"
                >
                  Out
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-sm border border-zinc-800 hover:border-zinc-750 bg-black/40 hover:bg-zinc-900 text-zinc-300 hover:text-white font-space font-extrabold text-[10px] uppercase tracking-wider transition-all cursor-pointer h-8.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => onOpenTickets(null)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-sm border border-cyan-neon/40 bg-black/40 hover:bg-cyan-neon/10 text-white font-space font-extrabold text-[10px] uppercase tracking-wider transition-all cursor-pointer box-glow-cyan h-8.5"
            >
              <span>🎟️ Tickets</span>
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('set-sports-tab', { detail: { tabId: 'register' } }));
                scrollToSection('sports');
              }}
              className="flex items-center space-x-1 bg-gradient-to-r from-cyan-neon to-blue-700 hover:brightness-110 text-white font-space font-extrabold text-[10px] px-3.5 py-1.5 rounded-sm uppercase tracking-wider shadow-[0_0_15px_rgba(27,82,255,0.3)] transition-all cursor-pointer h-8.5"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Register</span>
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
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('set-sports-tab', { detail: { tabId: 'register' } }));
                    scrollToSection('sports');
                  }}
                  className="w-full text-center flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-neon to-blue-700 text-white font-space font-extrabold py-3 rounded-sm uppercase tracking-wider shadow-[0_0_20px_rgba(27,82,255,0.3)]"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Register Futsal Team</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenTickets(null);
                  }}
                  className="w-full text-center flex items-center justify-center space-x-2 bg-zinc-950 border border-cyan-neon/30 text-cyan-neon hover:text-white hover:bg-cyan-neon/10 font-space font-extrabold py-3 rounded-sm uppercase tracking-wider transition-all cursor-pointer"
                >
                  <span>🎟️ Buy Event Tickets</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Absolute Toast Alert for Firebase/Vercel configuration issues */}
      <AnimatePresence>
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 z-[9999] max-w-sm w-full bg-[#0a0a0a] border border-red-900/50 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-4 text-white font-sans text-xs"
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900/60 mb-2">
              <span className="font-mono uppercase font-black text-red-500 tracking-wider flex items-center">
                🚨 Auth Sync Blocked
              </span>
              <button
                onClick={() => setAuthError(null)}
                className="p-1 hover:bg-zinc-900 text-zinc-500 hover:text-white rounded cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-zinc-300 leading-relaxed font-sans mb-3 text-[11px]">
              {authError.message}
            </p>
            {(authError.code === 'auth/unauthorized-domain' || authError.message.includes('unauthorized-domain')) && (
              <div className="bg-black/40 border border-red-900/10 p-2.5 rounded text-[11px] space-y-1.5 leading-relaxed text-zinc-350">
                <span className="font-bold text-yellow-500 uppercase text-[9px] block">⚙️ ACTION REQUIRED:</span>
                <p>
                  Add <code className="bg-red-950/40 px-1 py-0.5 rounded text-yellow-300 select-all font-mono text-[10px]">{authError.domain || window.location.hostname}</code> to <strong>Authorized Domains</strong> in your Firebase Console authentication settings.
                </p>
              </div>
            )}
            <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-zinc-900/60">
              <button
                onClick={() => setAuthError(null)}
                className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setAuthError(null);
                  loginWithGoogle();
                }}
                className="px-2.5 py-1 rounded bg-gradient-to-r from-cyan-neon to-blue-700 text-white font-mono text-[9px] uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer font-bold"
              >
                Retry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
