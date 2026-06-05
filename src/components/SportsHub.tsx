import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Calendar, Users, Award, ShieldAlert, CheckCircle2, UserCheck, Star } from 'lucide-react';
import { teamStandings, matchFixtures, playerStats, pastWinners } from '../data/teams';

export default function SportsHub() {
  const [activeTab, setActiveTab] = useState<'standings' | 'fixtures' | 'players' | 'hall' | 'register'>('standings');

  // Programmatically change tabs from other sections via custom events
  useEffect(() => {
    const handleSetTab = (e: Event) => {
      const customEvent = e as CustomEvent<{ tabId: 'standings' | 'fixtures' | 'players' | 'hall' | 'register' }>;
      if (customEvent.detail && customEvent.detail.tabId) {
        setActiveTab(customEvent.detail.tabId);
      }
    };
    window.addEventListener('set-sports-tab', handleSetTab);
    return () => window.removeEventListener('set-sports-tab', handleSetTab);
  }, []);
  
  // Registration Form State
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [contact, setContact] = useState('');
  const [playerCount, setPlayerCount] = useState('5');
  const [referral, setReferral] = useState('Instagram');

  // Validation States
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Inline validation
    if (!teamName.trim()) {
      setErrorMsg('Team Name is required.');
      return;
    }
    if (!captainName.trim()) {
      setErrorMsg('Captain Name is required.');
      return;
    }
    if (!contact.trim() || contact.length < 8) {
      setErrorMsg('Please enter a valid Phone Number or WhatsApp contact.');
      return;
    }
    const numPlayers = parseInt(playerCount);
    if (isNaN(numPlayers) || numPlayers < 5 || numPlayers > 12) {
      setErrorMsg('Futsal teams must register between 5 to 12 squad members.');
      return;
    }

    setIsSubmitLoading(true);

    // Simulate Network Request
    setTimeout(() => {
      setIsSubmitLoading(false);
      setSuccessToast(true);
      // Reset form fields
      setTeamName('');
      setCaptainName('');
      setContact('');
      setPlayerCount('5');

      // Dismiss toast after 5s
      setTimeout(() => {
        setSuccessToast(false);
      }, 5000);
    }, 1200);
  };

  const tabs = [
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'fixtures', label: 'Fixtures & Results', icon: Calendar },
    { id: 'players', label: 'Top Scorers', icon: Award },
    { id: 'hall', label: 'Hall of Fame', icon: Star },
    { id: 'register', label: 'Register Team', icon: Users },
  ] as const;

  return (
    <section id="sports" className="relative py-28 bg-dark-bg border-b border-gray-900 overflow-hidden">
      {/* Absolute vector design lines */}
      <div className="absolute top-1/4 -left-16 w-32 h-96 bg-gradient-to-br from-cyan-neon/10 to-transparent blur-[80px]" />
      <div className="absolute bottom-1/4 -right-16 w-32 h-96 bg-gradient-to-tl from-gold-accent/10 to-transparent blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Hub Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-cyan-neon uppercase tracking-[0.4em] font-extrabold block mb-2">
            7R Sports Division
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            7RINGS CHAMPIONS <span className="text-gold-accent glow-gold">LEAGUE</span>
          </h2>
          <p className="mt-4 font-sans text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            The heart of Katsina futsal. Providing an elite league structure, certified referees, high-speed camera coverage, and scout scouting networks for grassroots talent.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" id="sports-tabs-row">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setErrorMsg('');
                }}
                className={`flex items-center space-x-2 px-3 py-2 sm:px-5 sm:py-3 rounded-sm font-space font-extrabold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-neon to-blue-600 text-white shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:scale-103'
                    : 'bg-zinc-950 border border-gray-900 text-gray-400 hover:text-white hover:border-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Board */}
        <div className="bg-black/60 border border-zinc-900 rounded-sm p-6 sm:p-8 min-h-[420px]" id="sports-hub-board">
          <AnimatePresence mode="wait">
            
            {/* Standings Tab */}
            {activeTab === 'standings' && (
              <motion.div
                key="standings-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="overflow-x-auto"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white uppercase">2026 Season Standing Log</h3>
                    <p className="font-mono text-xs text-gray-400">7RCL PRO Futsal • Katsina State Division</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className="flex items-center space-x-1.5 font-mono text-[11px] text-cyan-neon bg-cyan-neon/5 px-2.5 py-1 rounded border border-cyan-neon/10">
                      <span className="w-2 h-2 bg-cyan-neon rounded-full animate-pulse" />
                      <span>Season Active</span>
                    </span>
                  </div>
                </div>

                <table className="w-full text-left font-sans text-sm border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-xs uppercase font-extrabold pb-3">
                      <th className="py-3 px-2">Rank</th>
                      <th className="py-3">Team</th>
                      <th className="py-3 text-center">Played</th>
                      <th className="py-3 text-center">W</th>
                      <th className="py-3 text-center">D</th>
                      <th className="py-3 text-center">L</th>
                      <th className="py-3 text-center">GD</th>
                      <th className="py-3 text-center">Points</th>
                      <th className="py-3 text-center px-2">Form</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {teamStandings.map((team, idx) => {
                      const goldBadge = idx === 0;
                      const silverBadge = idx === 1;
                      const redZone = idx >= 6;
                      return (
                        <tr 
                          key={team.id}
                          className="hover:bg-zinc-900/40 transition-colors"
                        >
                          <td className="py-4 px-2 font-mono font-bold">
                            {goldBadge ? (
                              <span className="text-gold-accent glow-gold">1🏆</span>
                            ) : silverBadge ? (
                              <span className="text-cyan-neon">2🥈</span>
                            ) : (
                              <span className="text-gray-400">{team.rank}</span>
                            )}
                          </td>
                          <td className="py-4 font-display font-bold text-white tracking-wide">
                            {team.name}
                          </td>
                          <td className="py-4 text-center text-gray-300 font-mono">{team.played}</td>
                          <td className="py-4 text-center text-gray-300 font-mono">{team.won}</td>
                          <td className="py-4 text-center text-gray-300 font-mono">{team.drawn}</td>
                          <td className="py-4 text-center text-gray-300 font-mono">{team.lost}</td>
                          <td className="py-4 text-center font-mono text-gray-400">
                            {team.goalsFor - team.goalsAgainst > 0 ? `+${team.goalsFor - team.goalsAgainst}` : team.goalsFor - team.goalsAgainst}
                          </td>
                          <td className="py-4 text-center font-display font-black text-white text-base">
                            {team.points}
                          </td>
                          <td className="py-4 px-2">
                            <div className="flex gap-1 justify-center">
                              {team.form.map((f, i) => (
                                <span
                                  key={i}
                                  className={`w-5 h-5 rounded-sm flex items-center justify-center font-mono text-[9px] font-black ${
                                    f === 'W'
                                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                                      : f === 'D'
                                      ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                      : 'bg-rose-950 text-rose-400 border border-rose-900'
                                  }`}
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* Fixtures Tab */}
            {activeTab === 'fixtures' && (
              <motion.div
                key="fixtures-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display font-bold text-xl text-white uppercase">Match Fixtures &amp; History</h3>
                  <p className="font-mono text-xs text-gray-400">Hosted weekly at Muhammad Dikko Stadium and Capital One Complex</p>
                </div>

                <div className="space-y-4">
                  {matchFixtures.map((fixture) => {
                    const isCompleted = fixture.status === 'COMPLETED';
                    return (
                      <div
                        key={fixture.id}
                        className="bg-zinc-950 border border-zinc-900 p-5 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:border-zinc-800 transition-all duration-300"
                      >
                        {/* Status tag */}
                        <div className="md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-extrabold ${
                            isCompleted 
                              ? 'bg-zinc-900 text-zinc-400 border border-zinc-800' 
                              : 'bg-cyan-neon/10 text-cyan-neon border border-cyan-neon/20 animate-pulse'
                          }`}>
                            {fixture.status}
                          </span>
                          <span className="font-mono text-xs text-gray-500 mt-2">{fixture.date} • {fixture.time}</span>
                        </div>

                        {/* Match scoreboard */}
                        <div className="flex-1 flex items-center justify-center space-x-6">
                          <div className="text-right w-5/12">
                            <span className="font-display font-extrabold text-base sm:text-lg text-white block truncate">
                              {fixture.homeTeam}
                            </span>
                          </div>

                          {/* Scores */}
                          <div className="flex items-center justify-center space-x-3 bg-zinc-900/60 px-4 py-2 border border-zinc-850 rounded-sm">
                            <span className="font-display font-black text-2xl text-cyan-neon min-w-[18px] text-center">
                              {isCompleted ? fixture.homeScore : '-'}
                            </span>
                            <span className="font-mono text-xs text-zinc-600 font-bold">:</span>
                            <span className="font-display font-black text-2xl text-cyan-neon min-w-[18px] text-center">
                              {isCompleted ? fixture.awayScore : '-'}
                            </span>
                          </div>

                          <div className="text-left w-5/12">
                            <span className="font-display font-extrabold text-base sm:text-lg text-white block truncate">
                              {fixture.awayTeam}
                            </span>
                          </div>
                        </div>

                        {/* Venue Detail */}
                        <div className="md:w-1/4 text-center md:text-right">
                          <span className="font-sans text-xs text-gray-400 block font-semibold">Venue</span>
                          <span className="font-sans text-xs text-gray-500 block">{fixture.venue}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Players Scorers Tab */}
            {activeTab === 'players' && (
              <motion.div
                key="players-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display font-bold text-xl text-white uppercase">Player Stats Leaderboard</h3>
                  <p className="font-mono text-xs text-gray-400">Top offensive metrics for current 7RCL season</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {playerStats.map((p, idx) => (
                    <div
                      key={p.id}
                      className="bg-zinc-950 border border-zinc-900 rounded-sm p-5 flex flex-col justify-between group hover:border-cyan-neon/30 transition-all"
                      id={`player-stat-card-${idx}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs text-cyan-neon/40 font-extrabold">0{idx + 1}</span>
                        <div className="w-8 h-8 rounded-full bg-cyan-neon/10 border border-cyan-neon/20 flex items-center justify-center">
                          <UserCheck className="w-4 h-4 text-cyan-neon" />
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-display font-extrabold text-lg text-white tracking-wide">{p.name}</h4>
                        <p className="font-sans text-xs text-gray-400 font-semibold">{p.team}</p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-900 grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-gray-500 block">Goals</span>
                          <span className="font-display font-black text-emerald-400 text-lg">{p.goals}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono text-gray-500 block">Assists</span>
                          <span className="font-display font-black text-cyan-neon text-lg">{p.assists}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono text-gray-500 block">Matches</span>
                          <span className="font-display font-black text-white text-lg">{p.matchesPlayed}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Hall of Fame Tab */}
            {activeTab === 'hall' && (
              <motion.div
                key="hall-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display font-bold text-xl text-white uppercase font-black">7RChampions League Hall of Fame</h3>
                  <p className="font-mono text-xs text-gray-400">Previous champions and historic score sheets</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pastWinners.map((winner, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-b from-zinc-950 to-black border-2 border-zinc-900 rounded-sm p-6 flex flex-col justify-center items-center text-center relative group hover:border-gold-accent/20 transition-all duration-500"
                    >
                      <div className="absolute -top-4 bg-gold-accent text-black font-space font-black text-xs px-3 py-0.5 uppercase tracking-wider rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                        {winner.year} Winner
                      </div>

                      <div className="w-12 h-12 rounded-full bg-gold-accent/10 flex items-center justify-center mb-4 mt-2">
                        <Trophy className="w-6 h-6 text-gold-accent" />
                      </div>

                      <h4 className="font-display font-extrabold text-xl text-white uppercase tracking-wide">
                        {winner.champion}
                      </h4>
                      <p className="font-sans text-xs text-gray-400 mt-1">Defeated: {winner.runnerUp}</p>
                      
                      <div className="mt-4 bg-zinc-900 border border-zinc-800 text-gold-accent px-4 py-1 rounded font-mono text-sm font-bold">
                        Winner Score: {winner.score}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Register Team Form Tab */}
            {activeTab === 'register' && (
              <motion.div
                key="register-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="text-center">
                  <h3 className="font-display font-bold text-xl text-white uppercase">Register Your Futsal Team</h3>
                  <p className="font-mono text-xs text-gray-400">Join the upcoming 7RCL season. Applications undergo committee reviews.</p>
                </div>

                {errorMsg && (
                  <div className="bg-rose-950/40 border border-rose-900 px-4 py-3 rounded text-rose-300 font-sans text-xs flex items-center space-x-2">
                    <ShieldAlert className="w-4.5 h-4.5 text-rose-400 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-4" id="futsal-onboarding-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="comp-team-name" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
                        Team Name
                      </label>
                      <input
                        id="comp-team-name"
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. GRA Titans"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-neon px-4 py-2.5 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="comp-captain-name" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
                        Captain Name
                      </label>
                      <input
                        id="comp-captain-name"
                        type="text"
                        value={captainName}
                        onChange={(e) => setCaptainName(e.target.value)}
                        placeholder="e.g. Aminu Katsina"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-neon px-4 py-2.5 text-white text-sm outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="comp-captain-contact" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
                        WhatsApp / Contact
                      </label>
                      <input
                        id="comp-captain-contact"
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="e.g. +234 803 123 4567"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-neon px-4 py-2.5 text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="comp-member-count" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
                        Squad Size (5 to 12 players)
                      </label>
                      <select
                        id="comp-member-count"
                        value={playerCount}
                        onChange={(e) => setPlayerCount(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-neon px-4 py-3 text-white text-sm outline-none transition-colors"
                      >
                        <option value="5">5 Players (Standard Futsal Lineup)</option>
                        <option value="6">6 Players</option>
                        <option value="7">7 Players</option>
                        <option value="8">8 Players</option>
                        <option value="10">10 Players</option>
                        <option value="12">12 Players (Max Roster)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comp-referral" className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
                      How did you hear about 7Rings?
                    </label>
                    <select
                      id="comp-referral"
                      value={referral}
                      onChange={(e) => setReferral(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-cyan-neon px-4 py-3 text-white text-sm outline-none transition-colors"
                    >
                      <option value="Instagram">Instagram @x_7rings</option>
                      <option value="X">X @7Rings909</option>
                      <option value="Word of Mouth">GRA Community Word of Mouth</option>
                      <option value="Fiesta">Concerts / Sallah Youth Fiesta</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitLoading}
                    className="w-full bg-gradient-to-r from-cyan-neon to-blue-600 hover:brightness-110 text-white font-space font-extrabold text-sm uppercase tracking-wider py-4 rounded-sm transition-all focus:ring-1 focus:ring-cyan-neon cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                  >
                    {isSubmitLoading ? 'Validating Application...' : 'Submit Registration request'}
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Floating Success Toast notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-100 bg-zinc-900 border-2 border-emerald-500 rounded p-4 text-white shadow-2xl max-w-sm flex items-start space-x-3"
            id="futsal-registration-toast"
          >
            <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-display font-bold text-sm uppercase text-white">Application Received!</h5>
              <p className="font-sans text-xs text-gray-400 mt-1">
                Your team registration for the 7RCL has been saved. Our board members will reach out via WhatsApp soon. Matches are hosted at Capital One and Muhammad Dikko Stadium.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
