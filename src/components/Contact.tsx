import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Sponsorship');
  const [message, setMessage] = useState('');

  // Form State feedback
  const [loading, setLoading] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [formError, setFormError] = useState('');

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Form inputs validation checks
    if (!name.trim()) {
      setFormError('Your Name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid Email address.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setFormError('Message must be at least 10 characters long.');
      return;
    }

    setLoading(true);

    // Simulated network submit
    setTimeout(() => {
      setLoading(false);
      setSuccessToast(true);
      // Clean form state
      setName('');
      setEmail('');
      setMessage('');
      setSubject('Sponsorship');

      // Dismiss toast after 5 seconds
      setTimeout(() => {
        setSuccessToast(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Laser light beams */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-neon/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Contact Title Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-cyan-neon uppercase tracking-[0.4em] font-extrabold block mb-2">
            Get In Touch
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            CONNECT WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-neon to-gold-accent">7RINGS</span>
          </h2>
          <p className="mt-4 font-sans text-gray-400 text-sm max-w-2xl mx-auto">
            Want to sponsor our next Sallah Festival? Register a Futsal squad? Book an artist or project partner? Our board coordinates responds rapidly.
          </p>
        </div>

        {/* Core Double Grid: Info / Form & Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column A: Contact particulars (lg: 5-span) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-8 space-y-6">
              <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
                Headquarters
              </h3>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-zinc-900 border border-zinc-800 text-cyan-neon rounded shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-gray-400 uppercase tracking-wider">Office Address</h4>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed mt-1">
                    No. 14, GRA Road, Behind Old Government House LGA Area, Katsina State, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-zinc-900 border border-zinc-800 text-cyan-neon rounded shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-gray-400 uppercase tracking-wider">Inquiries Email</h4>
                  <a href="mailto:7ringx@gmail.com" className="font-sans text-sm text-gray-300 hover:text-cyan-neon transition-colors mt-1 block">
                    7ringx@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-zinc-900 border border-zinc-800 text-cyan-neon rounded shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-gray-400 uppercase tracking-wider">Phone Lines</h4>
                  <p className="font-sans text-sm text-gray-300 mt-1">
                    +234 814 777 0002 • +234 905 777 7 rings
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Location Map Embedding with Katsina GRA positioning */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-sm overflow-hidden h-64 relative group">
              <div className="absolute inset-x-0 top-0 bg-black/70 border-b border-zinc-900 p-2 text-center text-xs font-mono text-zinc-500 z-10 font-bold">
                KATSINA GRA AREA • GEO-COORDINATES
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15605.867208940505!2d7.6148386266014455!3d12.98993202952402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b5ff23b3fcdd6b%3A0xe54d6fb8fa8606c4!2sGRA%2C%20Katsina!5e0!3m2!1sen!2sng!4v1717231450259!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="grayscale brightness-75 contrast-125 opacity-70 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700"
                title="7 Rings HQ Location Map"
              ></iframe>
            </div>
          </div>

          {/* Column B: Interactive Contact Inquiry Form (lg: 7-span) */}
          <div className="lg:col-span-7 bg-zinc-950/60 border border-zinc-900 p-8 rounded-sm shadow-xl" id="contact-form-box">
            <h3 className="font-display font-bold text-2xl text-white uppercase mb-1">
              Submit an Inquiry
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 mb-6 font-semibold">
              Your inquiries are directed straight to our executive youth board.
            </p>

            {formError && (
              <div className="bg-rose-950/30 border border-rose-900 p-3.5 rounded text-rose-300 font-sans text-xs uppercase font-semibold mb-4 flex items-center space-x-2 animate-pulse">
                <span>⚠️ {formError}</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4" id="brand-inquiry-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="comp-contact-name" className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5 font-extrabold">
                    Your Name
                  </label>
                  <input
                    id="comp-contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ibrahim D. Gobarau"
                    className="w-full bg-black border border-zinc-800 focus:border-cyan-neon px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="comp-contact-email" className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5 font-extrabold">
                    Email Address
                  </label>
                  <input
                    id="comp-contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ibrahim@gobarau.com"
                    className="w-full bg-black border border-zinc-800 focus:border-cyan-neon px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2 font-extrabold">
                  Inquiry Category
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Sponsorship', label: 'Sponsor' },
                    { id: 'Booking', label: 'Concert booking' },
                    { id: 'General', label: 'General / Join' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSubject(sub.id)}
                      className={`py-2.5 rounded-sm font-space font-extrabold text-xs uppercase tracking-wider cursor-pointer border transition-colors ${
                        subject === sub.id
                          ? 'border-cyan-neon bg-cyan-neon/10 text-cyan-neon'
                          : 'border-zinc-850 bg-black text-gray-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="comp-contact-message" className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5 font-extrabold">
                  Message Description
                </label>
                <textarea
                  id="comp-contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your proposal, team, or request in details here..."
                  className="w-full bg-black border border-zinc-800 focus:border-cyan-neon p-4 text-white text-sm outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-neon to-blue-600 hover:brightness-110 text-white font-space font-black text-xs uppercase tracking-widest py-4 rounded-sm transition-all flex items-center justify-center space-x-2.5 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.2)]"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Transmitting Package...' : 'Send Transmission'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Contact Form Success Toast alert */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-100 bg-zinc-900 border-2 border-cyan-neon rounded p-4 text-white shadow-2xl max-w-sm flex items-start space-x-3 text-left"
            id="contact-submission-toast"
          >
            <div className="p-1 rounded-full bg-cyan-neon/10 text-cyan-neon shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-display font-bold text-sm uppercase text-white">Transmission Successful!</h5>
              <p className="font-sans text-xs text-gray-400 mt-1">
                Your message is stored securely in our active queues. An official representative of the 7 Rings Katsina team will get in touch via email. Let's grow together!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
