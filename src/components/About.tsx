import { motion } from 'motion/react';
import { Target, Compass, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function About() {
  const coreValues = [
    {
      icon: Target,
      title: 'Youth Empowerment',
      desc: 'Active coaching, business skill mentoring, and creative support networks built for young Katsina visionaries.'
    },
    {
      icon: Compass,
      title: 'Community Integration',
      desc: 'Hosting social concerts, cultural art galleries, clean-ups, and regional aid events to promote lasting solidarity.'
    },
    {
      icon: Award,
      title: 'Global Performance',
      desc: 'Raising local futsal to professional athletic standards with international rules, certified coaching, and scout events.'
    }
  ];

  const teamMembers = [
    {
      name: 'Abdul-Rahman Yusuf',
      role: 'Founder & Chief Director',
      bio: 'Visionary behind 7 Rings, orchestrates overall community impact partnerships across Katsina and Northern Nigeria.',
      image: 'https://i.ibb.co/ZtjRFSX/Save-Clip-App-502732956-18105965230512424-6356013861276583811-n.jpg'
    },
    {
      name: 'Bashir Dikko',
      role: 'Director of Futsal Operations',
      bio: 'Leads the 7Rings Champions League logistics, safety, venue administration, and grassroots athletic training.',
      image: 'https://i.ibb.co/9m7f3KXG/Save-Clip-App-582421801-18123718303512424-2154724019465476571-n.jpg'
    },
    {
      name: 'Fatima Katsina',
      role: 'Creative Production & Arts Lead',
      bio: 'Curator of Sallah fiestas, exhibitions, and musical festivals, amplifying Katsinas rich artistic heritage.',
      image: 'https://i.ibb.co/rfcVBrWc/Save-Clip-App-707509538-18142534663512424-71640399992815418-n.jpg'
    },
    {
      name: 'Kabir GRA',
      role: 'Community Welfare Coordinator',
      bio: 'Manages the 10,000+ free hot meals outreach agendas and coordinates local GRA volunteer recruitment.',
      image: 'https://i.ibb.co/twLZw1Pq/Save-Clip-App-659228844-18408400912176634-7455479025550447021-n.jpg'
    }
  ];

  const milestones = [
    { year: '2019', title: 'The Genesis', desc: '7 Rings formed as a small, passionate group of friends near Old Government House, Katsina.' },
    { year: '2021', title: 'Food & Athletic Pivot', desc: 'Inaugurated our first weekly feeding initiative and organized the first local street-futsal cup.' },
    { year: '2023', title: 'Launch of 7RCL', desc: 'The 7Rings Champions League launched, welcoming 8 elite regional squads under modern futsal rules.' },
    { year: '2026', title: 'Cultural Domination', desc: 'Expanding to annual Sallah concert fiestas, hosting over 5,000 active youngsters.' }
  ];

  return (
    <section id="about" className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-cyan-neon/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Intro Grid: Heading & Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <span className="font-mono text-xs text-cyan-neon uppercase tracking-[0.4em] block mb-2 font-black">
              Who We Are
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
              Pioneering <span className="text-cyan-neon glow-cyan">Youth-Led</span>
              <br />
              Socio-Cultural Transformation
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-neon to-gold-accent mt-6" />
            
            <p className="mt-8 font-sans text-gray-300 leading-relaxed text-lg">
              Established in 2019 in Katsina, Nigeria, <span className="text-white font-bold">7 Rings</span> is a stellar non-profit initiative driving a cultural renaissance. Our operations are centered near the GRA and the Old Government House, acting as the ultimate hub for talent incubation.
            </p>
            <p className="mt-4 font-sans text-gray-400 leading-relaxed">
              We leverage the high-octane energy of Futsal and major musical celebrations as catalysts. By offering young people secure team structures, meal networks, and professional event stages, we foster community growth, elevate artistic careers, and combat drug abuse and youth restiveness.
            </p>
          </div>

          {/* Core Vision & Mission Cards */}
          <div className="bg-black/40 border border-gray-900 rounded-sm p-8 flex flex-col space-y-8 box-shadow box-glow-cyan">
            <div className="border-b border-gray-800 pb-6">
              <div className="flex items-center space-x-3 text-gold-accent mb-3">
                <Heart className="w-5 h-5" />
                <h3 className="font-display uppercase font-extrabold tracking-wider text-white">Our Mission</h3>
              </div>
              <p className="font-sans text-gray-300 antialiased">
                To create a healthy, productive ecosystem where youth can showcase talent, obtain secure livelihood support, and experience world-class entertainment without leaving Katsina.
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-3 text-cyan-neon mb-3">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-display uppercase font-extrabold tracking-wider text-white">Our Vision</h3>
              </div>
              <p className="font-sans text-gray-300 antialiased">
                Becoming the foremost athletic and creative model in West Africa, demonstrating how grassroot sports and arts drive economic self-reliance and regional peace.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 border border-zinc-900 rounded-sm p-8 hover:border-gray-800 group transition-all"
              id={`pillar-${idx}`}
            >
              <div className="text-cyan-neon mb-5 p-3 rounded bg-black/40 inline-block border border-gray-900 group-hover:text-gold-accent group-hover:border-gold-accent/20 transition-all duration-300">
                <val.icon className="w-6 h-6 animate-pulse" />
              </div>
              <h4 className="font-display font-bold text-xl text-white uppercase tracking-tight mb-2">
                {val.title}
              </h4>
              <p className="font-sans text-gray-400 text-sm leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        {/* History / Timelines Timeline */}
        <div className="mb-28">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-gold-accent uppercase tracking-[0.4em] font-extrabold">
              Our Journey
            </span>
            <h3 className="font-display font-extrabold text-3xl text-white uppercase tracking-wider block mt-2">
              Timeline of Grassroots Growth
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Horizontal timeline connector */}
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-cyan-neon/30 via-gold-accent/30 to-cyan-neon/30 z-0" />
            
            {milestones.map((ms, idx) => (
              <div key={idx} className="relative z-10 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-2 border-zinc-800 bg-black flex items-center justify-center font-display font-black text-white text-lg tracking-tight mb-4 group hover:border-cyan-neon shadow-lg transition-colors">
                  <span className="text-cyan-neon group-hover:text-white transition-colors">{ms.year}</span>
                </div>
                <h4 className="font-display font-bold text-base text-white uppercase mb-1">{ms.title}</h4>
                <p className="font-sans text-gray-400 text-xs px-4 leading-relaxed">{ms.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Members / Leadership Profiles */}
        <div id="team-section">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-cyan-neon uppercase tracking-[0.4em] font-extrabold">
              The Crew
            </span>
            <h3 className="font-display font-extrabold text-3xl text-white uppercase tracking-wider block mt-2">
              Youth Leading The Cult
            </h3>
            <p className="font-sans text-gray-400 text-sm mt-1">
              Guiding 7 Rings initiatives to build safe creative sanctuaries in Katsina state.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-black/40 border border-gray-900 rounded-sm p-4 hover:border-cyan-neon/20 transition-all duration-300 group shadow-md"
                id={`team-member-${idx}`}
              >
                <div className="relative overflow-hidden rounded-sm mb-4 aspect-square">
                  <img
                    referrerPolicy="no-referrer"
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                </div>
                <h4 className="font-display font-bold text-lg text-white tracking-tight uppercase group-hover:text-cyan-neon transition-colors">
                  {member.name}
                </h4>
                <p className="font-mono text-[11px] text-gold-accent font-semibold tracking-wider uppercase mb-3">
                  {member.role}
                </p>
                <p className="font-sans text-gray-400 text-xs leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
