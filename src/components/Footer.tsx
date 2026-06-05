import { Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
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

  const socialLinks = [
    { name: 'Instagram', handle: '@x_7rings', icon: Instagram, url: 'https://instagram.com/x_7rings' },
    { name: 'X / Twitter', handle: '@7Rings909', icon: Twitter, url: 'https://x.com/7Rings909' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer id="brand-footer" className="relative bg-[#050505] border-t border-gray-900 py-16 text-gray-500 font-sans text-sm overflow-hidden">
      {/* Decorative linear laser lighting */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-neon/0 via-cyan-neon/30 to-gold-accent/0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Core Double Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Col 1: Stylized Logo Block */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => scrollTo('home')}>
              <Logo size="sm" showText={true} variant="dark" className="-ml-3 -my-2" />
            </div>
            
            <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-xs antialiased">
              We leverage sport, creativity, and music to foster active youth incubation, counter substance restiveness, and distribute valuable nutritional resources in Katsina state.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Quick Channels</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans">
              {[
                { label: 'Home Entrance', id: 'home' },
                { label: 'About Story', id: 'about' },
                { label: '7RCL Standings', id: 'sports', tabId: 'standings' },
                { label: 'Register Squad', id: 'sports', tabId: 'register' },
                { label: 'Event Calendar', id: 'events' },
                { label: 'Media Gallery', id: 'gallery' },
                { label: 'Contact Office', id: 'contact' }
              ].map((lnk, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (lnk.tabId) {
                      window.dispatchEvent(new CustomEvent('set-sports-tab', { detail: { tabId: lnk.tabId } }));
                    }
                    scrollTo(lnk.id);
                  }}
                  className="text-left text-gray-400 hover:text-cyan-neon transition-colors cursor-pointer font-sans"
                >
                  {lnk.label}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Social Anchors */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Social Outposts</h4>
            <div className="space-y-2">
              {socialLinks.map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4 text-cyan-neon" />
                    <span>{soc.name}: <span className="font-bold text-gray-300">{soc.handle}</span></span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 border-t border-zinc-950 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-600 gap-4">
          <p className="font-sans text-center sm:text-left">
            © {currentYear} 7 Rings Katsina. All rights reserved. Developed to benefit the youth demographics of Northern Nigeria.
          </p>
          
          <div className="flex items-center space-x-4 font-mono uppercase tracking-widest text-[9px] font-black">
            <span className="text-zinc-700">GRA, Katsina</span>
            <span className="text-zinc-800">•</span>
            <span className="text-zinc-700">Old Govt House Road</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
