import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Ticket, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  CheckCircle2, 
  QrCode, 
  Printer, 
  ArrowRight, 
  ChevronRight, 
  Search, 
  Calendar, 
  MapPin, 
  Lock, 
  Plus, 
  Minus, 
  Info, 
  Loader2,
  Trash2,
  AlertCircle,
  LogIn
} from 'lucide-react';
import { upcomingEvents } from '../data/events';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, onSnapshot, doc, setDoc, updateDoc } from 'firebase/firestore';

interface TicketSalesProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedEventId: string | null;
}

interface BookedTicket {
  id: string; // 7R-XXXX-XXXX
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  tier: 'Regular' | 'VIP' | 'VVIP Sponsor';
  quantity: number;
  totalPaid: number;
  paymentMethod: string;
  bookedAt: string;
  status: 'PENDING_PAYMENT' | 'CONFIRMED' | 'REFUND_PENDING' | 'CANCELLED';
  paid: boolean;
}

export default function TicketSales({ isOpen, onClose, preselectedEventId }: TicketSalesProps) {
  const { user, loginWithGoogle, authError, setAuthError } = useAuth();
  const [activeTab, setActiveTab] = useState<'book' | 'wallet'>('book');
  
  // Step tracker: 1 = Tier & Quantity, 2 = Buyer Info, 3 = Payment Simulation, 4 = Success Badge
  const [bookingStep, setBookingStep] = useState<number>(1);
  
  // Selection States
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<'Regular' | 'VIP' | 'VVIP Sponsor'>('Regular');
  const [quantity, setQuantity] = useState<number>(1);
  
  // Form Info
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'ussd'>('card');
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [newlyBookedTicket, setNewlyBookedTicket] = useState<BookedTicket | null>(null);
  
  // Error handling
  const [formError, setFormError] = useState<string | null>(null);

  // Wallet database
  const [ticketWallet, setTicketWallet] = useState<BookedTicket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWalletTicket, setSelectedWalletTicket] = useState<BookedTicket | null>(null);
  const [walletLoading, setWalletLoading] = useState(false);

  // Auto-fill user profile info when logged in
  useEffect(() => {
    if (user) {
      setBuyerName(user.displayName || '');
      setBuyerEmail(user.email || '');
    }
  }, [user]);

  // Sync preselected event
  useEffect(() => {
    if (preselectedEventId) {
      setSelectedEventId(preselectedEventId);
      setActiveTab('book');
      setBookingStep(1);
    } else if (upcomingEvents.length > 0 && !selectedEventId) {
      setSelectedEventId(upcomingEvents[0].id);
    }
  }, [preselectedEventId, isOpen]);

  // Sync real wallet tickets Reactive listener from Firestore
  useEffect(() => {
    if (!isOpen || !user) {
      setTicketWallet([]);
      return;
    }

    setWalletLoading(true);
    const ticketsCollection = 'tickets';
    const q = query(
      collection(db, ticketsCollection),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tempWallet: BookedTicket[] = [];
        snapshot.forEach((snapDoc) => {
          tempWallet.push(snapDoc.data() as BookedTicket);
        });
        
        // Sort newest first
        tempWallet.sort((a, b) => new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime());
        setTicketWallet(tempWallet);
        
        // Sync the currently selected wallet item as well if active
        if (selectedWalletTicket) {
          const freshItem = tempWallet.find(t => t.id === selectedWalletTicket.id);
          if (freshItem) setSelectedWalletTicket(freshItem);
        }
        setWalletLoading(false);
      },
      (error) => {
        setWalletLoading(false);
        try {
          handleFirestoreError(error, OperationType.LIST, ticketsCollection);
        } catch (err: any) {
          console.error("Realtime ticket read failed: ", err.message);
        }
      }
    );

    return () => unsubscribe();
  }, [isOpen, user]);

  const getEventData = (id: string) => {
    return upcomingEvents.find(e => e.id === id) || upcomingEvents[0];
  };

  const activeEvent = getEventData(selectedEventId);

  // Get pricing based on tier and event structure
  const getTierPrice = (tierName: 'Regular' | 'VIP' | 'VVIP Sponsor', eventId: string) => {
    if (eventId === 'e4') return 0; // Community sweeps are free
    
    if (eventId === 'e1') { // 7RCL Grand Finale
      if (tierName === 'Regular') return 1000;
      if (tierName === 'VIP') return 5000;
      return 15000;
    }
    if (eventId === 'e2') { // Sallah Fiesta
      if (tierName === 'Regular') return 1500;
      if (tierName === 'VIP') return 10000;
      return 25000;
    }
    if (eventId === 'e3') { // Art and Culture
      if (tierName === 'Regular') return 1500;
      if (tierName === 'VIP') return 5000;
      return 12000;
    }
    
    // Default Fallbacks
    if (tierName === 'Regular') return 1000;
    if (tierName === 'VIP') return 5000;
    return 15000;
  };

  const currentPricePerTicket = getTierPrice(selectedTier, selectedEventId);
  const totalCost = currentPricePerTicket * quantity;
  const processingFee = totalCost > 0 ? 150 : 0; // standard flat processing fee
  const grandTotal = totalCost + processingFee;

  const handleNextStep = async () => {
    if (bookingStep === 1) {
      if (!selectedEventId) {
        setFormError('Please choose an event to purchase tickets for.');
        return;
      }
      setFormError(null);
      setBookingStep(2);
    } else if (bookingStep === 2) {
      if (!buyerName.trim()) {
        setFormError('Full Name is required.');
        return;
      }
      if (!buyerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setFormError('Please enter a valid email address.');
        return;
      }
      if (!buyerPhone.trim() || buyerPhone.length < 8) {
        setFormError('Please enter a valid active phone number.');
        return;
      }
      if (!user) {
        setFormError('Sign In/Registration required.');
        return;
      }

      setFormError(null);
      setSubmittingPayment(true);

      const uniqueRef = `7R-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const bookedRecord: BookedTicket = {
        id: uniqueRef,
        userId: user.uid,
        eventId: selectedEventId,
        eventTitle: activeEvent.title,
        eventDate: activeEvent.date,
        eventTime: activeEvent.time,
        eventVenue: activeEvent.venue,
        buyerName,
        buyerEmail,
        buyerPhone,
        tier: selectedTier,
        quantity,
        totalPaid: grandTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        bookedAt: new Date().toISOString(),
        status: 'PENDING_PAYMENT',
        paid: false
      };

      const path = `tickets/${uniqueRef}`;
      try {
        await setDoc(doc(db, 'tickets', uniqueRef), bookedRecord);
        setNewlyBookedTicket(bookedRecord);
        setBookingStep(3); // Proceed to simulated check-out gateway
      } catch (error) {
        try {
          handleFirestoreError(error, OperationType.CREATE, path);
        } catch (e: any) {
          setFormError(`Failed to save ticket reservation: ${e.message}`);
        }
      } finally {
        setSubmittingPayment(false);
      }
    }
  };

  const handleSimulatePayment = async () => {
    if (!newlyBookedTicket) return;
    setSubmittingPayment(true);
    setFormError(null);

    const path = `tickets/${newlyBookedTicket.id}`;
    try {
      await updateDoc(doc(db, 'tickets', newlyBookedTicket.id), {
        status: 'CONFIRMED',
        paid: true,
        paymentMethod: paymentMethod.toUpperCase()
      });

      setNewlyBookedTicket(prev => prev ? {
        ...prev,
        status: 'CONFIRMED',
        paid: true,
        paymentMethod: paymentMethod.toUpperCase()
      } : null);

      setBookingStep(4);
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.UPDATE, path);
      } catch (e: any) {
        setFormError(`Simulated payment gateway failed: ${e.message}`);
      }
    } finally {
      setSubmittingPayment(false);
    }
  };

  // Pay pending ticket directly from the user's digital wallet
  const handlePayWalletTicket = async (ticket: BookedTicket) => {
    setSubmittingPayment(true);
    const path = `tickets/${ticket.id}`;
    try {
      await updateDoc(doc(db, 'tickets', ticket.id), {
        status: 'CONFIRMED',
        paid: true
      });
      setSelectedWalletTicket(prev => prev ? { ...prev, status: 'CONFIRMED', paid: true } : null);
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.UPDATE, path);
      } catch (e) {
        console.error("Wallet ticket payment update failed: ", e);
      }
    } finally {
      setSubmittingPayment(false);
    }
  };

  const handleResetForNewBooking = () => {
    setBookingStep(1);
    setQuantity(1);
    setSelectedTier('Regular');
    setBuyerName(user?.displayName || '');
    setBuyerEmail(user?.email || '');
    setBuyerPhone('');
    setNewlyBookedTicket(null);
  };

  const handleRequestRefund = async (ticketId: string) => {
    const path = `tickets/${ticketId}`;
    try {
      await updateDoc(doc(db, 'tickets', ticketId), {
        status: 'REFUND_PENDING'
      });
      if (selectedWalletTicket && selectedWalletTicket.id === ticketId) {
        setSelectedWalletTicket(prev => prev ? { ...prev, status: 'REFUND_PENDING' } : null);
      }
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.UPDATE, path);
      } catch (e) {
        console.error("Requesting refund failed: ", e);
      }
    }
  };

  const printTicket = () => {
    window.print();
  };

  const filteredWallet = ticketWallet.filter(t => 
    t.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.buyerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  // Unauthenticated Registration and Login Screen overlay - strict goal requirement
  if (!user) {
    return (
      <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex justify-center items-center p-2 sm:p-4 overflow-y-auto select-none font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#080808] border border-zinc-900 rounded-sm w-full max-w-md p-6 sm:p-8 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] text-white"
          id="ticket-sales-login-container"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Ticket className="w-5 h-5 text-cyan-neon" />
              <h3 className="font-display font-black text-lg uppercase tracking-wider">
                7 RINGS <span className="text-cyan-neon">SECURE CENTRE</span>
              </h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer text-zinc-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center space-y-4 my-6">
            <div className="w-14 h-14 rounded-full bg-cyan-neon/10 border border-cyan-neon/20 flex items-center justify-center mx-auto text-cyan-neon">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base uppercase text-white">Identity Registration Required</h4>
              <p className="font-sans text-xs text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
                Connect your account securely. Verify details and access the automated Katsina payment clearing systems.
              </p>
            </div>
          </div>

          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-neon to-blue-700 hover:brightness-110 text-white font-space font-extrabold text-xs py-3 rounded-sm uppercase tracking-wider shadow-[0_0_20px_rgba(27,82,255,0.3)] transition-all cursor-pointer h-12"
          >
            <LogIn className="w-4 h-4 text-white" />
            <span>Register & Login with Google</span>
          </button>

          {authError && (
            <div className="mt-4 p-4 rounded bg-red-950/30 border border-red-900/50 text-red-100 text-xs text-left space-y-2">
              <div className="flex items-center space-x-2 text-red-400 font-bold uppercase tracking-wider font-mono">
                <AlertCircle className="w-4 h-4" />
                <span>Authentication Failure</span>
              </div>
              <p className="font-sans leading-relaxed text-zinc-300">
                {authError.message}
              </p>
              {(authError.code === 'auth/unauthorized-domain' || authError.message.includes('unauthorized-domain')) && (
                <div className="mt-3 pt-3 border-t border-red-950/40 space-y-2 font-sans bg-black/40 p-2.5 border border-red-900/20 rounded">
                  <span className="font-semibold text-yellow-500 uppercase block text-[10px] tracking-wide">💡 REQUIRED ACTION ON VERCEL:</span>
                  <p className="text-[11px] text-zinc-400">
                    To allow Google standard OAuth from this Vercel deployment, please authorize this origin in your Firebase Console:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px] text-zinc-300 mt-1">
                    <li>
                      Go to the <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-cyan-neon underline hover:text-cyan-400">Firebase Console</a>.
                    </li>
                    <li>
                      Go to your project, then click <strong>Authentication</strong> &rarr; <strong>Settings</strong> &rarr; <strong>Authorized domains</strong>.
                    </li>
                    <li>
                      Click <strong>Add domain</strong> and paste exactly: <code className="bg-red-950/50 border border-red-900/30 px-1 py-0.5 rounded text-yellow-300 font-mono text-[10px] break-all">{authError.domain || window.location.hostname}</code>
                    </li>
                    <li>
                      Click <strong>Add</strong> and then reload this page to retry.
                    </li>
                  </ol>
                </div>
              )}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setAuthError(null)}
                  className="px-2 py-1 rounded bg-[#0a0a0a] hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white uppercase font-mono text-[10px] tracking-wider transition-colors cursor-pointer"
                >
                  Clear &amp; Retry
                </button>
              </div>
            </div>
          )}

          <p className="text-[10px] text-center text-zinc-500 font-mono uppercase tracking-widest mt-6">
            🔒 CRYPTOGRAPHIC PASSES • CHIP ACCREDITATION
          </p>

          <div className="mt-5 border-t border-zinc-900/60 pt-4 text-center">
            <details className="group">
              <summary className="text-[10px] text-zinc-500 hover:text-zinc-350 cursor-pointer select-none uppercase font-mono tracking-widest list-none flex items-center justify-center space-x-1 outline-none">
                <span>🔧 Vercel Domain Settings Helper</span>
                <span className="transition-transform group-open:rotate-180 text-[7px]">&bull;</span>
              </summary>
              <div className="mt-3 text-left bg-black/40 border border-zinc-900 p-3 rounded-sm text-[11px] text-zinc-400 space-y-2 font-sans leading-relaxed">
                <p>
                  When deploying to a custom server or Vercel, Firebase blocks authentication popups from unauthorized domains.
                </p>
                <div className="bg-zinc-950/60 p-2.5 rounded border border-zinc-900 text-[10px] space-y-1">
                  <span className="font-mono text-zinc-500 block uppercase font-bold">Authorized Domains List</span>
                  <span>Confirm that <strong>{window.location.hostname}</strong> (and if applicable, matching <code>*.vercel.app</code> preview URLs) are added to <strong>Authorized domains</strong> in your Firebase Console.</span>
                </div>
              </div>
            </details>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex justify-center items-center p-2 sm:p-4 overflow-y-auto select-none font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#080808] border border-zinc-900 rounded-sm w-full max-w-4xl max-h-[96vh] sm:max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden text-white"
        id="ticket-sales-modal-container"
      >
        {/* Modal Top Header Bar */}
        <div className="px-6 py-4 bg-[#0a0a0a] border-b border-zinc-900 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-neon/10 border border-cyan-neon/20 rounded text-cyan-neon shrink-0">
              <Ticket className="w-5 h-5 text-cyan-neon" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-white">
                PASS <span className="text-cyan-neon glow-cyan">SECURE CENTRE</span>
              </h2>
              <p className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:block">
                Verified Cryptographic Tickets &amp; Gate Reservations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 px-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded text-zinc-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close ticket portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-[#030303] border-b border-zinc-950 px-6 shrink-0">
          <button
            onClick={() => setActiveTab('book')}
            className={`py-3.5 px-4 font-mono text-xs uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'book'
                ? 'border-cyan-neon text-cyan-neon'
                : 'border-transparent text-zinc-500 hover:text-zinc-350'
            }`}
          >
            🎟️ Reserve Real Passes
          </button>
          
          <button
            onClick={() => setActiveTab('wallet')}
            className={`py-3.5 px-4 font-mono text-xs uppercase tracking-widest font-bold border-b-2 transition-all cursor-pointer relative ${
              activeTab === 'wallet'
                ? 'border-cyan-neon text-cyan-neon'
                : 'border-transparent text-zinc-500 hover:text-zinc-350'
            }`}
          >
            💼 My Wallet ({ticketWallet.length})
            {ticketWallet.length > 0 && (
              <span className="absolute top-2 right-1.5 w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
            )}
          </button>
        </div>

        {/* Core Content Body - Scrollable */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto" id="ticket-modal-scroll-area">
          {activeTab === 'book' ? (
            /* ========================================================
               BOOKING WORKFLOW VIEW
               ======================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Main Steps Form Area */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  
                  {/* Graphical Step Bar Indicator */}
                  <div className="grid grid-cols-4 gap-2 mb-8" id="booking-stepper-visual">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <div key={stepNum} className="flex flex-col space-y-1">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            bookingStep >= stepNum
                              ? 'bg-cyan-neon shadow-[0_0_8px_rgba(0,243,255,0.4)]'
                              : 'bg-zinc-900 border border-zinc-950'
                          }`}
                        />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-center text-zinc-500 block">
                          {stepNum === 1 && "Tier"}
                          {stepNum === 2 && "Customer"}
                          {stepNum === 3 && "Pay Gate"}
                          {stepNum === 4 && "Ticket Ready"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Errors Block */}
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded bg-red-950/20 border border-red-900/40 text-red-400 text-xs sm:text-sm flex items-start space-x-2.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </motion.div>
                  )}

                  {/* Workflow steps switch */}
                  {bookingStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                      id="step-1-elements"
                    >
                      {/* Select Event */}
                      <div>
                        <label className="font-mono text-xs uppercase tracking-widest text-[#aaa] font-bold block mb-2">
                          1️⃣ SELECT EVENT PASS
                        </label>
                        <select
                          value={selectedEventId}
                          onChange={(e) => {
                            setSelectedEventId(e.target.value);
                            setQuantity(1);
                            setSelectedTier('Regular');
                          }}
                          className="w-full bg-[#030303] border border-zinc-900 hover:border-zinc-800 p-3 rounded text-sm text-white font-sans focus:outline-none focus:ring-1 focus:ring-cyan-neon"
                        >
                          {upcomingEvents.map((evt) => (
                            <option key={evt.id} value={evt.id}>
                              [{evt.category}] {evt.title} ({evt.date})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Tier Selector cards */}
                      <div>
                        <label className="font-mono text-xs uppercase tracking-widest text-[#aaa] font-bold block mb-2">
                          2️⃣ SELECT RESERVATION TIER
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          
                          {/* Tier Card: Regular */}
                          <button
                            onClick={() => setSelectedTier('Regular')}
                            type="button"
                            className={`p-4 rounded-sm border text-left flex flex-col justify-between transition-all relative cursor-pointer ${
                              selectedTier === 'Regular'
                                ? 'bg-[#0a0a0a] border-cyan-neon box-glow-cyan'
                                : 'bg-[#030303] border-zinc-900 hover:border-zinc-800'
                            }`}
                          >
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold block">
                                GATE LEVEL 01
                              </span>
                              <h4 className="font-display font-bold text-sm uppercase text-white mt-1">
                                Regular Pass
                              </h4>
                            </div>
                            <div className="mt-4">
                              <span className="font-mono text-base tracking-tight font-extrabold text-gold-accent block">
                                {selectedEventId === 'e4' ? 'FREE' : `₦${getTierPrice('Regular', selectedEventId).toLocaleString()}`}
                              </span>
                              <span className="text-[10px] text-zinc-500">General access</span>
                            </div>
                            {selectedTier === 'Regular' && (
                              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
                            )}
                          </button>

                          {/* Tier Card: VIP */}
                          <button
                            onClick={() => setSelectedTier('VIP')}
                            type="button"
                            className={`p-4 rounded-sm border text-left flex flex-col justify-between transition-all relative cursor-pointer ${
                              selectedTier === 'VIP'
                                ? 'bg-[#0a0a0a] border-cyan-neon box-glow-cyan'
                                : 'bg-[#030303] border-zinc-900 hover:border-zinc-800'
                            }`}
                          >
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold block">
                                GATE LEVEL 02
                              </span>
                              <h4 className="font-display font-bold text-sm uppercase text-white mt-1">
                                VIP Seat
                              </h4>
                            </div>
                            <div className="mt-4">
                              <span className="font-mono text-base tracking-tight font-extrabold text-gold-accent block">
                                {selectedEventId === 'e4' ? 'FREE' : `₦${getTierPrice('VIP', selectedEventId).toLocaleString()}`}
                              </span>
                              <span className="text-[10px] text-zinc-500">Soft drapes, closer court view</span>
                            </div>
                            {selectedTier === 'VIP' && (
                              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
                            )}
                          </button>

                          {/* Tier Card: Sponsor */}
                          <button
                            onClick={() => setSelectedTier('VVIP Sponsor')}
                            type="button"
                            className={`p-4 rounded-sm border text-left flex flex-col justify-between transition-all relative cursor-pointer ${
                              selectedTier === 'VVIP Sponsor'
                                ? 'bg-[#0a0a0a] border-cyan-neon box-glow-cyan'
                                : 'bg-[#030303] border-zinc-900 hover:border-zinc-800'
                            }`}
                          >
                            <div>
                              <span className="font-mono text-[9px] uppercase tracking-widest text-[#ffdf5e] font-black block">
                                GATE LEVEL LUX
                              </span>
                              <h4 className="font-display font-bold text-sm uppercase text-white mt-1">
                                VVIP Patron
                              </h4>
                            </div>
                            <div className="mt-4">
                              <span className="font-mono text-base tracking-tight font-extrabold text-gold-accent block">
                                {selectedEventId === 'e4' ? 'FREE' : `₦${getTierPrice('VVIP Sponsor', selectedEventId).toLocaleString()}`}
                              </span>
                              <span className="text-[10px] text-zinc-400">Front row, drinks &amp; custom merch</span>
                            </div>
                            {selectedTier === 'VVIP Sponsor' && (
                              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
                            )}
                          </button>

                        </div>
                      </div>

                      {/* Ticket Quantity selector */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="font-mono text-xs uppercase tracking-widest text-[#aaa] font-bold block">
                            3️⃣ SPECIFY QUANTITY
                          </label>
                          <span className="font-mono text-[10px] text-zinc-500 uppercase">
                            Max 10 passes per transaction
                          </span>
                        </div>
                        
                        <div className="inline-flex items-center space-x-1.5 p-1 bg-[#030303] border border-zinc-900 rounded-sm">
                          <button
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            type="button"
                            className="p-2 text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 rounded-sm cursor-pointer"
                            aria-label="Decrease passes"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <div className="w-12 text-center text-sm font-space font-extrabold text-white">
                            {quantity}
                          </div>

                          <button
                            onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                            type="button"
                            className="p-2 text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-900 hover:bg-zinc-900 rounded-sm cursor-pointer"
                            aria-label="Increase passes"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {bookingStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                      id="step-2-elements"
                    >
                      <div className="mb-4">
                        <span className="font-mono text-[10px] uppercase text-cyan-neon font-bold">Attendee Credentials Verification</span>
                        <h3 className="font-display font-bold text-lg text-white uppercase mt-0.5">Contact Clearance</h3>
                        <p className="text-zinc-500 text-xs font-sans">
                          A barcode token is attached statically to this attendee. Real-time updates sync directly to your account profile.
                        </p>
                      </div>

                      {/* Name input */}
                      <div className="relative">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold block mb-1.5">
                          🎟️ Attendee Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                          <input
                            type="text"
                            placeholder="e.g. Aminu Kabir Katsina"
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            className="w-full bg-[#030303] border border-zinc-900 p-3 pl-10 rounded text-sm text-white placeholder-zinc-650 focus:outline-none focus:ring-1 focus:ring-cyan-neon"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div className="relative">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold block mb-1.5">
                          📧 Email Address (Receipt Inbox)
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                          <input
                            type="email"
                            placeholder="e.g. aminu@domain.com"
                            value={buyerEmail}
                            onChange={(e) => setBuyerEmail(e.target.value)}
                            className="w-full bg-[#030303] border border-zinc-900 p-3 pl-10 rounded text-sm text-white placeholder-zinc-650 focus:outline-none focus:ring-1 focus:ring-cyan-neon"
                          />
                        </div>
                      </div>

                      {/* Phone input */}
                      <div className="relative">
                        <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold block mb-1.5">
                          📞 Active Mobile / WhatsApp Line
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                          <input
                            type="tel"
                            placeholder="e.g. +234 80 1234 5678"
                            value={buyerPhone}
                            onChange={(e) => setBuyerPhone(e.target.value)}
                            className="w-full bg-[#030303] border border-zinc-900 p-3 pl-10 rounded text-sm text-white placeholder-zinc-650 focus:outline-none focus:ring-1 focus:ring-cyan-neon"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === 3 && newlyBookedTicket && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                      id="step-3-elements"
                    >
                      <div className="mb-4">
                        <span className="font-mono text-[10px] uppercase text-zinc-400 font-bold">RESERVATION LOCKED • PAYMENT WAITING</span>
                        <h3 className="font-display font-bold text-lg text-white uppercase mt-0.5">Settle Gate Account</h3>
                        <p className="text-zinc-500 text-xs font-sans">
                          Tickets are reserved under code <strong className="text-gold-accent font-mono">{newlyBookedTicket.id}</strong> but remain completely locked and un-accredited until payment simulation is fulfilled.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Option 1: Card */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-4 rounded-sm border text-left cursor-pointer transition-all ${
                            paymentMethod === 'card'
                              ? 'bg-[#0a0a0a] border-cyan-neon box-glow-cyan'
                              : 'bg-[#030303] border-zinc-900'
                          }`}
                        >
                          <CreditCard className={`w-5 h-5 mb-2 ${paymentMethod === 'card' ? 'text-cyan-neon' : 'text-zinc-500'}`} />
                          <h4 className="font-display font-bold text-xs uppercase text-white">Card Checkout</h4>
                          <span className="text-[9px] text-zinc-500 block mt-1">Visa, Mastercard, Verve</span>
                        </button>

                        {/* Option 2: Bank Direct Transfer */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bank')}
                          className={`p-4 rounded-sm border text-left cursor-pointer transition-all ${
                            paymentMethod === 'bank'
                              ? 'bg-[#0a0a0a] border-cyan-neon box-glow-cyan'
                              : 'bg-[#030303] border-zinc-900'
                          }`}
                        >
                          <CheckCircle2 className={`w-5 h-5 mb-2 ${paymentMethod === 'bank' ? 'text-cyan-neon' : 'text-zinc-500'}`} />
                          <h4 className="font-display font-bold text-xs uppercase text-white">Direct Transfer</h4>
                          <span className="text-[9px] text-zinc-500 block mt-1">Simulate Bank transfer app</span>
                        </button>

                        {/* Option 3: Katsina Local USSD Transfer */}
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('ussd')}
                          className={`p-4 rounded-sm border text-left cursor-pointer transition-all ${
                            paymentMethod === 'ussd'
                              ? 'bg-[#0a0a0a] border-cyan-neon box-glow-cyan'
                              : 'bg-[#030303] border-zinc-900'
                          }`}
                        >
                          <span className="font-mono text-xs text-gold-accent font-black block mb-2">*901#</span>
                          <h4 className="font-display font-bold text-xs uppercase text-white">GRA USSD Code</h4>
                          <span className="text-[9px] text-zinc-500 block mt-1">Fast offline mobile USSD</span>
                        </button>
                      </div>

                      {/* Payment instruction box */}
                      <div className="bg-[#040404] border border-zinc-900 p-4 rounded-sm">
                        <div className="flex items-start space-x-2.5">
                          <Lock className="w-4 h-4 text-[#e6c875] shrink-0 mt-0.5" />
                          <div className="text-xs text-zinc-400 space-y-2">
                            {paymentMethod === 'card' && (
                              <p>⚡ This is a **simulated sandbox gateway**. Click below to complete mock payment. Invoices update reactively in Firestore database immediately.</p>
                            )}
                            {paymentMethod === 'bank' && (
                              <div className="space-y-1">
                                <p className="font-semibold text-white">🏦 Sandbox Bank Transfer Routing Details:</p>
                                <p>Bank Name: **7Rings Katsina Settlement Ltd**</p>
                                <p>Account Number: **4092 8133 8101**</p>
                                <p className="text-[10px] text-zinc-500">Upon successful checkout, the system verifies and clears the lock automatically.</p>
                              </div>
                            )}
                            {paymentMethod === 'ussd' && (
                              <p>📱 Dial **\*554\*778\*400#** on your registered line to invoke secure sandbox wire routing directly to 7Rings team organizers.</p>
                            )}
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {bookingStep === 4 && newlyBookedTicket && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                      id="step-4-elements"
                    >
                      <div className="text-center py-4">
                        <div className="mx-auto w-12 h-12 bg-emerald-950/20 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-bounce" />
                        </div>
                        <span className="font-mono text-[10px] tracking-widest text-[#10b981] font-black uppercase">RESERVATION ACCREDITED</span>
                        <h3 className="font-display font-black text-2xl text-white uppercase mt-1">PASS UNLOCKED!</h3>
                        <p className="text-zinc-400 text-xs font-sans max-w-sm mx-auto mt-1 leading-relaxed">
                          Your holographic ticket has cleared sandbox validation and has been fully saved. QR barcode is now completely accessible.
                        </p>
                      </div>

                      {/* PHYSICAL STYLE DIGITAL BADGE */}
                      <div className="bg-[#050505] p-5 sm:p-6 border border-zinc-800 rounded relative overflow-hidden shadow-2xl" id="printable-ticket-badge">
                        
                        {/* Background structural lines */}
                        <div className="absolute inset-y-0 left-0 w-1.5 bg-cyan-neon" />
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-neon/3 rounded-full blur-2xl pointer-events-none" />
                        
                        {/* Ticket meta info row */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-dashed border-zinc-800 pb-4 gap-4">
                          <div>
                            <span className="font-mono text-[9px] bg-cyan-neon text-black px-2 py-0.5 rounded font-black uppercase tracking-widest">
                              {newlyBookedTicket.tier} CATEGORY
                            </span>
                            <h4 className="font-display font-extrabold text-[#fff] text-base uppercase tracking-tight mt-1">
                              {newlyBookedTicket.eventTitle}
                            </h4>
                          </div>

                          <div className="flex flex-col items-start sm:items-end font-mono text-[10px] text-zinc-400">
                            <span className="text-zinc-500">TICKET REF</span>
                            <span className="text-gold-accent font-bold tracking-wider">{newlyBookedTicket.id}</span>
                          </div>
                        </div>

                        {/* Event specs block */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 text-xs">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-zinc-350">
                              <Calendar className="w-3.5 h-3.5 text-cyan-neon" />
                              <span>{newlyBookedTicket.eventDate} @ {newlyBookedTicket.eventTime}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-zinc-350">
                              <MapPin className="w-3.5 h-3.5 text-cyan-neon shrink-0" />
                              <span className="truncate max-w-[240px]">{newlyBookedTicket.eventVenue}</span>
                            </div>
                          </div>

                          <div className="space-y-1 font-sans text-[11px] text-zinc-400">
                            <p>🧑 Holder: <strong className="text-white uppercase font-display">{newlyBookedTicket.buyerName}</strong></p>
                            <p>📧 Email: <strong className="text-zinc-300">{newlyBookedTicket.buyerEmail}</strong></p>
                            <p>🎟️ Quantity: <strong className="text-white font-mono">{newlyBookedTicket.quantity} Passes</strong></p>
                          </div>
                        </div>

                        {/* Barcode/QR lock gate representation */}
                        <div className="border-t border-dashed border-zinc-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-5 bg-black/60 p-4 rounded-sm border border-zinc-900/60">
                          
                          <div className="flex items-center space-x-3 text-left">
                            <QrCode className="w-12 h-12 text-zinc-340 bg-white p-1 rounded-sm shrink-0" />
                            <div>
                              <span className="font-mono text-[9px] text-zinc-550 block">7R SCAN BARCODE</span>
                              <span className="text-xs text-white uppercase font-mono tracking-widest">{newlyBookedTicket.id}</span>
                              <span className="font-mono text-[9px] text-[#10b981] font-bold block">● STATUS: ACTIVE &amp; ACCESSIBLE</span>
                            </div>
                          </div>

                          <div className="text-left sm:text-right font-mono text-[11px]">
                            <span className="text-zinc-500 block">SIMULATED AMOUNT PAID</span>
                            <span className="text-gold-accent font-bold text-sm tracking-tight block">
                              {newlyBookedTicket.totalPaid === 0 ? 'FREE OUTREACH' : `₦${newlyBookedTicket.totalPaid.toLocaleString()}`}
                            </span>
                            <span className="text-[9px] text-zinc-650 block">Cleared via Sandbox</span>
                          </div>

                        </div>

                        {/* Action controllers on ticket card */}
                        <div className="mt-4 flex items-center justify-center space-x-3 print:hidden">
                          <button
                            onClick={printTicket}
                            className="text-xs font-mono font-bold bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-4 py-2 border border-zinc-800 hover:border-zinc-700 rounded transition-all cursor-pointer flex items-center space-x-1.5"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Save PDF / Print Ticket</span>
                          </button>
                        </div>

                      </div>

                      {/* Reset flow button */}
                      <div className="text-center mt-3">
                        <button
                          onClick={handleResetForNewBooking}
                          className="text-xs font-space font-extrabold tracking-widest text-cyan-neon hover:text-cyan-400 uppercase py-2 cursor-pointer inline-flex items-center space-x-1"
                        >
                          <span>Reserve another ticket pass</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </motion.div>
                  )}

                </div>

                {/* Form Navigation Actions Footer row */}
                {bookingStep < 4 && (
                  <div className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between shrink-0 bg-[#080808]">
                    
                    {bookingStep > 1 && bookingStep !== 3 ? (
                      <button
                        onClick={() => {
                          setBookingStep(prev => prev - 1);
                          setFormError(null);
                        }}
                        className="text-xs font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer bg-transparent border-0"
                        type="button"
                      >
                        ← Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {bookingStep === 3 ? (
                      <button
                        onClick={handleSimulatePayment}
                        disabled={submittingPayment}
                        className="flex items-center space-x-2 bg-gradient-to-r from-[#e6c875] to-gold-accent hover:brightness-110 text-black font-space font-extrabold text-xs px-6 py-3 rounded-sm uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(230,200,117,0.2)] disabled:opacity-50"
                      >
                        {submittingPayment ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            <span>Clearing Funds...</span>
                          </>
                        ) : (
                          <>
                            <span>Simulate Settlement Now</span>
                            <ChevronRight className="w-4 h-4 text-black" />
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextStep}
                        disabled={submittingPayment}
                        className="flex items-center space-x-1 bg-cyan-neon hover:brightness-110 text-black font-space font-extrabold text-xs px-6 py-3 rounded-sm uppercase tracking-wider transition-all cursor-pointer box-glow-cyan"
                      >
                        {submittingPayment ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>{bookingStep === 2 ? 'Reserve Slot' : 'Proceed to attendee'}</span>
                            <ArrowRight className="w-4 h-4 text-black" />
                          </>
                        )}
                      </button>
                    )}

                  </div>
                )}

              </div>

              {/* Sidebar Checklist details Column */}
              <div className="lg:col-span-5 bg-[#030303] border border-zinc-900 rounded-sm p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-4 border-b border-zinc-900 pb-2">
                    🛒 EXTRAS &amp; SETTLEMENT CHIPS
                  </h4>

                  {/* Active Pre-selected event review */}
                  <div className="mb-6">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-neon bg-cyan-neon/10 px-2 py-0.5 rounded">
                      Selected Event Context
                    </span>
                    <h5 className="font-display font-bold text-sm text-white mt-2 leading-tight uppercase">
                      {activeEvent?.title}
                    </h5>
                    
                    <div className="space-y-1 mt-3 font-sans text-xs text-zinc-400">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{activeEvent?.date} • {activeEvent?.time}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span className="truncate max-w-[220px]">{activeEvent?.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Overview Row */}
                  <div className="space-y-3 pt-4 border-t border-zinc-900">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Tier: {selectedTier}</span>
                      <span className="font-mono font-bold text-white">
                        {currentPricePerTicket === 0 ? 'FREE' : `₦${currentPricePerTicket.toLocaleString()}`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Pass Quantity</span>
                      <span className="font-mono font-bold text-white">x {quantity}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Gateway Processing Fee</span>
                      <span className="font-mono font-bold text-zinc-400">
                        {processingFee === 0 ? '₦0' : `₦${processingFee.toLocaleString()}`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-3 border-t border-dashed border-zinc-900">
                      <span className="text-zinc-400 font-semibold">Total Settlement</span>
                      <span className="font-mono text-base font-extrabold text-[#e6c875]">
                        {grandTotal === 0 ? 'FREE REGISTER' : `₦${grandTotal.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Secure Trust Badge */}
                <div className="mt-8 p-3 rounded bg-zinc-950 border border-zinc-900/60 flex items-center space-x-2.5">
                  <Lock className="w-4 h-4 text-[#e6c875] shrink-0" />
                  <p className="font-sans text-[9px] sm:text-[10px] text-zinc-500 leading-normal">
                    Secure checkout system connected live to Firestore database. Passes clear reactively upon mockup payments.
                  </p>
                </div>

              </div>

            </div>
          ) : (
            /* ========================================================
               WALLETS AND SAVED TICKETS VIEW
               ======================================================== */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-white uppercase">Your Digital Wallet Database</h3>
                  <p className="text-zinc-500 text-xs font-sans">
                    View active verified bookings synced with your registration profile in Firestore.
                  </p>
                </div>

                {/* Search */}
                <div className="relative shrink-0 w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search ticket, ref or buyer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#030303] border border-zinc-900 p-2 pl-9 rounded text-xs text-white placeholder-zinc-650 focus:outline-none focus:ring-1 focus:ring-cyan-neon"
                  />
                </div>
              </div>

              {walletLoading ? (
                <div className="py-16 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-neon mx-auto mb-3" />
                  <p className="text-xs text-zinc-500 font-mono">RETRIEVING ENCRYPTED TICKETS FROM FIRESTORE...</p>
                </div>
              ) : ticketWallet.length === 0 ? (
                /* Empty wallet state */
                <div className="py-16 text-center border border-dashed border-zinc-900 rounded-sm bg-[#040404]">
                  <Ticket className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                  <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">No Booked Seats Detected</h4>
                  <p className="font-sans text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                    You have not reserved any ticket passes yet! Click on the **"Reserve Real Passes"** tab above to secure your seat.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left Column list */}
                  <div className="md:col-span-5 space-y-3 max-h-[50vh] overflow-y-auto pr-1" id="wallet-items-list">
                    {filteredWallet.map((walletItem) => (
                      <button
                        key={walletItem.id}
                        onClick={() => setSelectedWalletTicket(walletItem)}
                        className={`w-full p-4 rounded-sm border text-left flex flex-col justify-between hover:border-zinc-700 transition-all cursor-pointer ${
                          selectedWalletTicket?.id === walletItem.id
                            ? 'bg-[#0a0a0a] border-cyan-neon box-glow-cyan'
                            : 'bg-[#030303] border-zinc-900'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-mono text-[8px] bg-zinc-900 px-2 py-0.5 rounded text-zinc-300 font-bold uppercase">
                            {walletItem.tier}
                          </span>
                          <span className={`font-mono text-[8px] px-1.5 py-0.5 rounded font-bold ${
                            walletItem.status === 'CONFIRMED' 
                              ? 'bg-emerald-950/40 text-emerald-450 border border-emerald-900/40' 
                              : walletItem.status === 'PENDING_PAYMENT'
                              ? 'bg-amber-950/40 text-amber-500 border border-amber-900/30'
                              : walletItem.status === 'REFUND_PENDING'
                              ? 'bg-[#1a1200] text-[#e6a100] border border-[#3c2a00]'
                              : 'bg-zinc-800 text-zinc-500'
                          }`}>
                            {walletItem.status === 'PENDING_PAYMENT' ? '🎰 PYMT PENDING' : walletItem.status}
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-xs text-white uppercase mt-2 truncate">
                          {walletItem.eventTitle}
                        </h4>

                        <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-zinc-500 border-t border-zinc-950 pt-2">
                          <span>Ref: {walletItem.id}</span>
                          <span className="text-gold-accent font-bold">₦{walletItem.totalPaid.toLocaleString()}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Right Column details viewer */}
                  <div className="md:col-span-7 bg-[#030303] border border-zinc-900 rounded p-5 relative">
                    {selectedWalletTicket ? (
                      <div className="space-y-4">
                        <div className="flex items-start justify-between border-b border-zinc-900 pb-3">
                          <div>
                            <span className="font-mono text-[8px] text-cyan-neon font-black block">VERIFIED PASS DETAILS</span>
                            <h4 className="font-display font-extrabold text-sm uppercase text-white mt-0.5 leading-tight">
                              {selectedWalletTicket.eventTitle}
                            </h4>
                          </div>

                          <div className="flex items-center space-x-1.5 print:hidden">
                            <button
                              onClick={() => handleRequestRefund(selectedWalletTicket.id)}
                              disabled={selectedWalletTicket.status !== 'CONFIRMED'}
                              className="text-[10px] font-mono text-zinc-500 hover:text-[#e6c875] py-1 px-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 hover:border-amber-900/30 rounded transition-colors disabled:opacity-30 disabled:pointer-events-none"
                              title="Request refund validation"
                            >
                              Refund
                            </button>
                          </div>
                        </div>

                        {/* Event specifications */}
                        <div className="space-y-2 text-xs sm:text-sm font-sans text-zinc-300">
                          <p>📌 Venue: <strong className="text-white">{selectedWalletTicket.eventVenue}</strong></p>
                          <p>🗓️ Time &amp; Date: <strong className="text-white">{selectedWalletTicket.eventDate} @ {selectedWalletTicket.eventTime}</strong></p>
                          <p>👤 Registered Attendee: <strong className="text-[#ffdf5e] uppercase">{selectedWalletTicket.buyerName}</strong></p>
                          <p>📞 Phone: <span className="text-zinc-200">{selectedWalletTicket.buyerPhone}</span></p>
                          <p>📧 Email: <span className="text-zinc-200">{selectedWalletTicket.buyerEmail}</span></p>
                          <p>🛍️ Settlement: <span className="font-mono font-bold text-gray-400">{selectedWalletTicket.paymentMethod}</span> ({selectedWalletTicket.quantity} Passes)</p>
                          <p>🕰️ Reserved On: <span className="text-[11px] text-zinc-550 font-mono">{new Date(selectedWalletTicket.bookedAt).toLocaleDateString()}</span></p>
                        </div>

                        {/* Lock / Unlocked payment conditional - exact user intent target */}
                        {!selectedWalletTicket.paid ? (
                          <div className="bg-amber-950/10 border border-amber-900/40 p-4 rounded-sm space-y-3 mt-6 text-center">
                            <div className="flex justify-center items-center space-x-2 text-amber-500">
                              <Lock className="w-5 h-5" />
                              <span className="font-display font-black text-xs uppercase tracking-wider">Pass Lock Enabled</span>
                            </div>
                            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm mx-auto">
                              Holographic scan stubs and printer drivers are locked because payment is pending. Simulate gateway settlement below to unlock.
                            </p>
                            <button
                              onClick={() => handlePayWalletTicket(selectedWalletTicket)}
                              disabled={submittingPayment}
                              className="mx-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-[#e6c875] to-gold-accent hover:brightness-110 text-black font-space font-extrabold text-xs px-5 py-2.5 rounded-sm uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(230,200,117,0.3)]"
                            >
                              {submittingPayment ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                                  <span>Authorizing Check...</span>
                                </>
                              ) : (
                                <>
                                  <span>Simulate Pay ₦{selectedWalletTicket.totalPaid.toLocaleString()} Now</span>
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="bg-[#050505] p-3.5 border border-zinc-900 rounded flex items-center justify-between gap-4 mt-6">
                            <div className="flex items-center space-x-2.5">
                              <QrCode className="w-10 h-10 text-zinc-400 bg-white p-1 rounded-sm shrink-0" />
                              <div>
                                <span className="font-mono text-[8px] text-zinc-600 block">7RINGS GATE VERIFIED</span>
                                <span className="text-xs font-mono font-black tracking-wider text-zinc-350">{selectedWalletTicket.id}</span>
                                <span className="text-[9px] uppercase font-mono text-cyan-neon font-black block">● ACTIVE CODE APPROVED</span>
                              </div>
                            </div>

                            <button
                              onClick={printTicket}
                              className="text-[10px] font-mono px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded hover:border-zinc-700 font-bold transition-all shrink-0 cursor-pointer"
                            >
                              Print Receipt
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col justify-center items-center py-16 text-center">
                        <Info className="w-8 h-8 text-zinc-750 mb-2" />
                        <h4 className="font-display font-extrabold text-xs text-[#aaa] uppercase select-none">No Ticket Selected</h4>
                        <p className="font-sans text-[11px] text-zinc-650 max-w-[200px] mt-0.5">
                          Select a ticket in the left pane to check locks, simulate offline clearance, requests refunds, or handle prints.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}
        </div>

        {/* Modal overall Bottom Info banner */}
        <div className="px-6 py-3 bg-[#030303] border-t border-zinc-900/60 text-center font-mono text-[10px] text-zinc-650 uppercase tracking-widest shrink-0 hidden sm:block">
          🛡️ CONTEXT-AWARE CHECKSUMS • ACCREDITED FUTSAL &amp; FESTIVALS CORRIDOR
        </div>

      </motion.div>
    </div>
  );
}
