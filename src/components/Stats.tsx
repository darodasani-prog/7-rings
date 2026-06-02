import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { statsData } from '../data/stats';
import { Award, Users, ShieldCheck, Heart } from 'lucide-react';

export default function Stats() {
  return (
    <section 
      id="stats-section"
      className="relative py-24 bg-darker-bg border-y border-gray-900 overflow-hidden"
    >
      {/* Decorative gradient lines */}
      <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-cyan-neon/20 via-transparent to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-px h-full bg-gradient-to-t from-gold-accent/15 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center mb-16">
          <h2 className="font-mono text-xs text-cyan-neon uppercase tracking-[0.4em] mb-2 font-black">
            Our Footprint in Katsina
          </h2>
          <p className="font-display font-bold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Youth Empowerment <span className="text-gradient bg-clip-text bg-gradient-to-r from-cyan-neon to-gold-accent text-transparent">&amp; Community Growth</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, i) => {
            // Pick a matching icon for each stat
            let IconComp = Users;
            if (stat.id === 'meals') IconComp = Heart;
            if (stat.id === 'members') IconComp = Users;
            if (stat.id === 'founded') IconComp = ShieldCheck;
            if (stat.id === 'athletes') IconComp = Award;

            return (
              <StatCard key={stat.id} stat={stat} Icon={IconComp} index={i} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  stat: any;
  Icon: any;
  index: number;
  key?: string | number;
}

function StatCard({ stat, Icon, index }: StatCardProps) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = stat.value;
      const duration = 2000; // ms
      const startTime = performance.now();

      const animateCount = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= duration) {
          setCount(end);
          return;
        }
        
        // Ease out quadratic
        const progress = elapsedTime / duration;
        const easeOutQuad = progress * (2 - progress);
        const currentCount = Math.round(start + (end - start) * easeOutQuad);
        
        setCount(currentCount);
        requestAnimationFrame(animateCount);
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative bg-black/60 border border-gray-800 rounded-sm p-6 hover:border-cyan-neon/35 transition-all duration-300 group shadow-lg flex flex-col justify-between"
      id={`stat-card-${stat.id}`}
    >
      {/* Glow highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-neon/0 to-cyan-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded bg-zinc-900 border border-zinc-800 text-cyan-neon group-hover:text-gold-accent group-hover:border-gold-accent/30 transition-colors duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <span className="font-mono text-xs text-zinc-600 font-extrabold select-none">
            0{index + 1}
          </span>
        </div>

        <div className="mt-2 flex items-baseline">
          <span className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tighter">
            {stat.id === 'founded' ? count : count.toLocaleString()}
          </span>
          <span className="font-display font-extrabold text-3xl text-cyan-neon ml-0.5">
            {stat.suffix}
          </span>
        </div>
        
        <h3 className="font-space font-bold text-lg text-white mt-1 group-hover:text-cyan-neon transition-colors">
          {stat.label}
        </h3>
        
        <p className="font-sans text-sm text-gray-400 mt-2 leading-relaxed">
          {stat.description}
        </p>
      </div>

      {/* Futuristic bottom highlight line */}
      <div className="w-full h-0.5 bg-zinc-800 mt-6 group-hover:bg-gradient-to-r group-hover:from-cyan-neon group-hover:to-gold-accent transition-all duration-500" />
    </motion.div>
  );
}
