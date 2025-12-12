import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Infinity as InfinityIcon, Sparkles, Network, Zap, Wallet } from 'lucide-react';

const BentoCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className={`bg-[#151516] border border-white/5 rounded-[30px] overflow-hidden relative ${className}`}
    >
        {children}
    </motion.div>
);

const Invite: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section id="invite" ref={containerRef} className="bg-black py-32 px-6 relative overflow-hidden scroll-mt-32">
        
        {/* Ambient Background Glow */}
        <motion.div 
            style={{ y: yBg }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none" 
        />

        <div className="max-w-[1080px] mx-auto relative z-10">
            
            {/* Header */}
            <div className="text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-6"
                >
                    <Sparkles size={12} /> 希言合伙人计划
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6"
                >
                    创作从共鸣开始。
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200"
                >
                    邀请即得，共同富裕。
                </motion.p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* --- CARD 1: The Mechanism (Full Width) --- */}
                <BentoCard className="md:col-span-2 p-8 md:p-12 min-h-[420px] flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-[#151516] via-[#151516] to-amber-900/5">
                    
                    {/* Text Content */}
                    <div className="flex-1 space-y-6 order-2 md:order-1 text-center md:text-left">
                        <div>
                             <h3 className="text-3xl font-bold text-white mb-4">关系绑定，积分共享</h3>
                             <p className="text-gray-400 leading-relaxed text-lg">
                                邀请好友注册并绑定关系。当好友进行积分充值时，您将自动获得其充值额度一定比例的<span className="text-amber-400 font-bold px-1">积分奖励</span>。
                             </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4">
                             <div className="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                                 <Network className="text-amber-500 mb-3" size={28}/>
                                 <div className="text-base font-bold text-white mb-1">永久绑定</div>
                                 <div className="text-xs text-gray-500">一次邀请，终身受益</div>
                             </div>
                             <div className="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm">
                                 <Zap className="text-amber-500 mb-3" size={28}/>
                                 <div className="text-base font-bold text-white mb-1">实时到账</div>
                                 <div className="text-xs text-gray-500">好友充值，即刻返点</div>
                             </div>
                        </div>
                    </div>
                    
                    {/* Abstract Visualization: Central Hub */}
                    <div className="flex-1 w-full h-[320px] order-1 md:order-2 bg-gradient-to-b from-black/40 to-amber-500/5 rounded-[40px] border border-white/5 relative flex items-center justify-center overflow-hidden">
                         
                         {/* Connection Lines Background */}
                         <div className="absolute inset-0 opacity-20">
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-[1px] bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
                         </div>

                         {/* Center Node (You) */}
                         <div className="w-28 h-28 rounded-full bg-amber-500/10 border border-amber-500/50 flex items-center justify-center shadow-[0_0_80px_rgba(245,158,11,0.2)] z-20 relative backdrop-blur-sm">
                             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg relative overflow-hidden">
                                 <span className="relative z-10">YOU</span>
                                 <div className="absolute inset-0 bg-white/20 animate-[pulse_3s_infinite]" />
                             </div>
                             {/* Ripple Effect */}
                             <div className="absolute inset-0 border border-amber-500 rounded-full animate-ping opacity-20" />
                         </div>

                         {/* Satellite Nodes (Friends) */}
                         <motion.div 
                            className="absolute w-[280px] h-[280px] rounded-full animate-[spin_30s_linear_infinite]"
                         >
                             {[0, 90, 180, 270].map((deg, i) => (
                                 <div 
                                    key={i} 
                                    className="absolute w-14 h-14 bg-[#1a1a1a] border border-white/20 rounded-full flex items-center justify-center shadow-xl"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${deg}deg) translate(140px) rotate(-${deg}deg)`
                                    }}
                                 >
                                     <Users size={20} className="text-gray-400"/>
                                 </div>
                             ))}
                         </motion.div>

                         {/* Incoming Energy Particles */}
                         <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                             {[0, 1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]"
                                    initial={{ x: 0, y: 0, opacity: 0 }}
                                    animate={{ 
                                        x: [
                                            Math.cos(i * 1.57) * 140, // Start at outer circle
                                            0 // End at center
                                        ],
                                        y: [
                                            Math.sin(i * 1.57) * 140,
                                            0
                                        ],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: "easeInOut"
                                    }}
                                />
                             ))}
                         </div>
                    </div>
                </BentoCard>

                {/* --- CARD 2: Unlimited --- */}
                <BentoCard className="p-10 flex flex-col items-center text-center justify-center min-h-[360px]">
                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 relative">
                        <InfinityIcon size={48} className="text-white relative z-10" />
                        <div className="absolute inset-0 border-2 border-white/10 rounded-full border-t-white/50 animate-spin" />
                        <div className="absolute inset-2 border-2 border-white/5 rounded-full border-b-white/30 animate-[spin_3s_linear_infinite_reverse]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">邀请无上限</h3>
                    <p className="text-gray-400 leading-relaxed">
                        您的影响力没有边界。<br/>
                        邀请人数无限制，奖励累积无封顶。
                    </p>
                </BentoCard>

                {/* --- CARD 3: Points Utility --- */}
                <BentoCard className="p-10 flex flex-col items-center text-center justify-center min-h-[360px] bg-gradient-to-br from-[#151516] to-amber-900/10">
                     <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center mb-8 relative border border-amber-500/20">
                        <Sparkles size={40} className="text-amber-400" />
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl" 
                        />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">积分即生产力</h3>
                    <p className="text-gray-400 leading-relaxed">
                        奖励积分等同于充值积分。<br/>
                        可直接用于生成漫画、视频等所有付费功能。
                    </p>
                </BentoCard>

            </div>
        </div>
    </section>
  );
};

export default Invite;