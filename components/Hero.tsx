import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, Trophy, Palette, MonitorPlay, ChevronsRight, Sparkles } from 'lucide-react';

// --- Shared Constants & Types ---

const STAT_HEIGHT = 80; // Fixed height for data rows
const STAT_TEXT_CLASS = "text-3xl md:text-4xl lg:text-5xl font-bold text-white font-mono leading-none tracking-tight";

// --- Components ---

// 1. Smooth Fade In Stat (Replaces RollingTicker/RollingNumber)
const FadeInStat: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
    <div style={{ height: STAT_HEIGHT }} className="w-full flex items-center overflow-hidden">
        <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }} // Apple-style ease
            className={`w-full flex items-center justify-start ${STAT_TEXT_CLASS}`}
        >
            {children}
        </motion.div>
    </div>
);

// 2. Data Card Component
const DataCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    description: string;
    colorClass: string;
    children: React.ReactNode;
}> = ({ icon, label, description, colorClass, children }) => (
    // Optimized Glassmorphism
    <div className="relative group bg-black/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-[180px] hover:bg-black/40 hover:backdrop-blur-md hover:border-white/20 transition-all duration-500">
        {/* Top Label */}
        <div className={`flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest ${colorClass} mb-2 opacity-80 group-hover:opacity-100 transition-opacity`}>
            {icon}
            <span>{label}</span>
        </div>
        
        {/* Value Area */}
        <div className="flex-1 flex items-center overflow-hidden">
            {children}
        </div>

        {/* Bottom Description */}
        <div className="text-sm text-gray-400 font-medium whitespace-nowrap pt-3 border-t border-white/5 group-hover:border-white/10 transition-colors">
            {description}
        </div>

        {/* Decorative Corner */}
        <div className={`absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colorClass}`}>
           <Sparkles size={16} />
        </div>
    </div>
);

// --- Main Hero Component ---

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#020202] flex flex-col items-center justify-between font-sans selection:bg-indigo-500/30">
      
      {/* 1. Cinematic Background Layer */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
         {/* Atmospheric Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#020202] z-10" />
         
         {/* Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] z-10" />

         <img 
            src="https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=2518&auto=format&fit=crop" 
            alt="Astronaut Background" 
            className="w-full h-full object-cover scale-105 opacity-60"
         />
      </motion.div>

      {/* 2. Main Title Content - Center Stage */}
      <motion.div
        style={{ opacity: opacityText }}
        className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 w-full text-center pt-4"
      >
        
        {/* Massive Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-8 tracking-tighter leading-none"
        >
          {/* Top Line */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">小说</span>
              
              {/* Animated Arrow Icon */}
              <div className="relative flex items-center justify-center text-blue-500">
                 <ChevronsRight className="w-12 h-12 md:w-20 md:h-20 opacity-50 absolute animate-ping" />
                 <ChevronsRight className="w-12 h-12 md:w-20 md:h-20 relative z-10" />
              </div>
              
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">漫画视频</span>
          </div>

          {/* Bottom Line */}
          <span className="block text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-indigo-200 animate-pulse">
             只需点一次
          </span>
        </motion.h1>
        
        {/* Cinematic Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm md:text-lg text-gray-400 font-light tracking-[0.3em] uppercase mb-12 max-w-2xl mx-auto"
        >
          Redefining the Future of AI Storytelling
        </motion.p>

        {/* The "Magic" Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
            <a 
                href="https://comic-drama-user.yizhiknow.com/#/" 
                target="_self"
                className="relative group cursor-pointer inline-block"
            >
                {/* Rotating Gradient Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                
                {/* Main Button Body */}
                <div className="relative px-12 py-5 bg-black rounded-full leading-none flex items-center divide-x divide-gray-600">
                    <span className="flex items-center gap-3 pr-6 text-gray-100 group-hover:text-white transition-colors">
                        <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
                        <span className="font-bold text-lg tracking-wide">开始创作</span>
                    </span>
                    <span className="pl-6 text-indigo-400 group-hover:text-indigo-300 transition duration-200">
                         <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </a>
        </motion.div>

      </motion.div>

      {/* 3. Modular Data Deck - Bottom Layout */}
      <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative z-30 w-full px-4 pb-8 md:pb-12"
      >
           <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Monetization */}
                <DataCard 
                    icon={<Trophy size={14} />} 
                    label="Monetization" 
                    description="助力创作者变现" 
                    colorClass="text-blue-400"
                >
                    <FadeInStat delay={1.0}>
                        <span>1000</span>
                        <span className="text-2xl text-white/50 ml-1 font-sans font-medium translate-y-1">+</span>
                    </FadeInStat>
                </DataCard>

                {/* Card 2: Styles */}
                <DataCard 
                    icon={<Palette size={14} />} 
                    label="Styles" 
                    description="风格模型支持" 
                    colorClass="text-purple-400"
                >
                    <FadeInStat delay={1.2}>
                         <span>20</span>
                         <span className="text-2xl text-white/50 ml-1 font-sans font-medium translate-y-1">+</span>
                    </FadeInStat>
                </DataCard>

                {/* Card 3: Resolution */}
                <DataCard 
                    icon={<MonitorPlay size={14} />} 
                    label="Resolution" 
                    description="影院级超清画质" 
                    colorClass="text-indigo-400"
                >
                    <FadeInStat delay={1.4}>
                         <span>4K</span>
                    </FadeInStat>
                </DataCard>

                {/* Card 4: Velocity */}
                <DataCard 
                    icon={<Zap size={14} />} 
                    label="Velocity" 
                    description="最快生产效率" 
                    colorClass="text-green-400"
                >
                    <FadeInStat delay={1.6}>
                        <div className="flex items-baseline w-full whitespace-nowrap">
                            <span>10min</span>
                            <span className="text-xl lg:text-2xl text-white/50 font-sans font-medium ml-1">/部小说</span>
                        </div>
                    </FadeInStat>
                </DataCard>

           </div>
      </motion.div>

    </section>
  );
};

export default Hero;