import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, Sliders, Battery, Sparkles, Layers } from 'lucide-react';

// Shared Card Container
const BentoCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.01 }}
    className={`bg-[#151516] rounded-[30px] overflow-hidden relative border border-white/5 shadow-2xl flex flex-col ${className}`}
  >
    {children}
  </motion.div>
);

const TechSpecs: React.FC = () => {
  return (
    <section className="bg-black pb-32 pt-0 px-6 font-sans relative z-20">
      {/* 
         Negative margin pulls this section up to meet the previous section visually,
         simulating the tight stacking seen on Apple product pages.
      */}
      <div className="max-w-[1080px] mx-auto -mt-24 md:-mt-32 relative">
        
        {/* Section Headline */}
        <div className="text-center mb-16">
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-semibold text-gray-100 mb-2 tracking-tight leading-tight"
             >
                遥遥领先的 <span className="text-white font-bold">技术创新</span>
             </motion.h2>
             <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-3xl font-medium text-gray-400"
             >
                 为何能力如此强劲？
             </motion.p>
        </div>

        {/* 
           Apple-style Staggered Grid 
           Gap is tighter (gap-5) to match the compact feel.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* --- LEFT COLUMN --- */}
            <div className="flex flex-col gap-5">
                
                {/* 1. SPEED (Tall Card - Matches 'Speed up to 86x') */}
                {/* Height increased to 560px for dominance */}
                <BentoCard className="h-[560px] p-8 md:p-10 justify-end" delay={0.1}>
                     {/* Visual Layer: Top */}
                     <div className="absolute top-0 left-0 w-full h-[60%] overflow-hidden opacity-40">
                         {/* Abstract Speed Lines / Waveform */}
                         <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
                         {[...Array(5)].map((_, i) => (
                             <div 
                                key={i} 
                                className="absolute h-[1px] bg-blue-500 w-full" 
                                style={{ top: `${20 + i * 15}%`, opacity: 1 - i * 0.2 }} 
                             />
                         ))}
                         {/* Star Icon Overlay */}
                         <div className="absolute top-1/2 left-10 -translate-y-1/2">
                              <Sparkles className="w-20 h-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                         </div>
                     </div>

                     {/* Text Layer: Bottom */}
                     <div className="relative z-10 mt-auto">
                         <h3 className="text-4xl md:text-[42px] font-bold text-white mb-4 tracking-tight leading-[1.1]">
                             基于异步并发驱动的<br/>
                             <span className="text-blue-500">稀疏时序流水线</span>。
                         </h3>
                         <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-sm">
                             结合层次化缓存机制，最终实现一次性生成多章节小说，生产效率较传统提升 100 倍。
                         </p>
                     </div>
                </BentoCard>

                {/* 3. EDITING / DISPLAY (Short Card - Matches 'Liquid Retina XDR') */}
                {/* Height fixed to 260px, Horizontal Layout */}
                <BentoCard className="h-[260px] p-8 md:p-10 justify-center" delay={0.3}>
                     <div className="flex items-center gap-8 h-full">
                         {/* Icon Left */}
                         <div className="flex-shrink-0">
                             <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center">
                                 <Sliders className="w-8 h-8 text-orange-500" />
                             </div>
                             {/* Sun Ray effect */}
                             <div className="absolute left-8 top-1/2 -translate-y-1/2 w-32 h-32 bg-orange-500/10 blur-[40px] rounded-full pointer-events-none" />
                         </div>

                         {/* Text Right */}
                         <div className="flex-1">
                             <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
                                多模态潜空间解耦与<br/>
                                参数化重构技术。
                             </h3>
                             <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                 对已生成的画面进行特征、发音等 10+ 属性的微秒级重绘，精准控制每一帧。
                             </p>
                         </div>
                     </div>
                </BentoCard>

            </div>

            {/* --- RIGHT COLUMN --- */}
            <div className="flex flex-col gap-5">

                {/* 2. CONSISTENCY / NEURAL ENGINE (Short Card - Matches 'Neural Engine') */}
                {/* Height fixed to 260px, Horizontal Layout */}
                <BentoCard className="h-[260px] p-8 md:p-10 justify-center" delay={0.2}>
                     <div className="flex items-center gap-8 h-full">
                         {/* Icon Left */}
                         <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <Cpu className="w-8 h-8 text-purple-500" />
                            </div>
                            {/* Glow effect */}
                            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full pointer-events-none" />
                         </div>

                         {/* Text Right */}
                         <div className="flex-1">
                             <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
                                 采用跨镜头身份向量与<br/>
                                 一致性正则策略。
                             </h3>
                             <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                 在多个场景与不同片段内容中，主角神态与特征始终高度统一，拒绝崩坏。
                             </p>
                         </div>
                     </div>
                </BentoCard>

                {/* 4. WORKFLOW / BATTERY (Tall Card - Matches 'Battery Life') */}
                {/* Height increased to 560px */}
                <BentoCard className="h-[560px] p-8 md:p-10 justify-end" delay={0.4}>
                     {/* Visual Layer: Top/Center */}
                     <div className="absolute top-1/3 left-10 opacity-100">
                         {/* Battery Icon Style */}
                         <Battery className="w-20 h-20 text-green-500 fill-green-500/20" />
                         <div className="absolute inset-0 bg-green-500/30 blur-[40px] rounded-full" />
                     </div>

                     {/* Text Layer: Bottom */}
                     <div className="relative z-10 mt-auto">
                         <h3 className="text-4xl md:text-[42px] font-bold text-white mb-4 tracking-tight leading-[1.1]">
                             全栈非线性编辑数据流<br/>
                             与 <span className="text-green-500">工程映射协议</span>。
                         </h3>
                         <p className="text-gray-400 font-medium text-lg leading-relaxed max-w-sm">
                             打通底层渲染与剪辑软件的工程壁垒，无需二次剪辑，草稿一键导出。
                         </p>
                     </div>
                </BentoCard>

            </div>

        </div>

      </div>
    </section>
  );
};

export default TechSpecs;