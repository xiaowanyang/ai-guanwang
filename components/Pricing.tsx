import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Check, Image as ImageIcon, Film, FileText, Music } from 'lucide-react';

const Pricing: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Animation Config ---
  // View 1 (Membership) exits from 0.3 to 0.5
  const opacityMembership = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const scaleMembership = useTransform(scrollYProgress, [0.3, 0.5], [1, 0.9]);
  const yMembership = useTransform(scrollYProgress, [0.3, 0.5], [0, -100]);
  const blurMembership = useTransform(scrollYProgress, [0.3, 0.5], [0, 20]);
  const filterMembership = useMotionTemplate`blur(${blurMembership}px)`;
  const pointerEventsMembership = useTransform(scrollYProgress, (v) => v < 0.45 ? 'auto' : 'none');

  // View 2 (Credits) enters from 0.5 to 0.7
  const opacityCredits = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const scaleCredits = useTransform(scrollYProgress, [0.5, 0.7], [0.9, 1]);
  const yCredits = useTransform(scrollYProgress, [0.5, 0.7], [100, 0]);
  const blurCredits = useTransform(scrollYProgress, [0.5, 0.7], [20, 0]);
  const filterCredits = useMotionTemplate`blur(${blurCredits}px)`;
  const pointerEventsCredits = useTransform(scrollYProgress, (v) => v > 0.45 ? 'auto' : 'none');

  return (
    <section ref={containerRef} id="pricing" className="relative h-[250vh] bg-black scroll-mt-32">
        
        {/* Sticky Container */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
            
            {/* --- VIEW 1: MEMBERSHIP --- */}
            <motion.div 
                style={{ 
                    opacity: opacityMembership,
                    scale: scaleMembership,
                    y: yMembership,
                    filter: filterMembership,
                    pointerEvents: pointerEventsMembership,
                    zIndex: 10
                }}
                className="absolute inset-0 flex items-center justify-center w-full px-6"
            >
                <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-12 items-center justify-center">
                    
                    {/* Left Text */}
                    <div className="flex-1 md:max-w-lg">
                        <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-6">
                            简单透明的<br />
                            <span className="text-gray-500">会员计划</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            解锁全功能与高级模型和生成通道，<br/>
                            无隐藏费用；
                        </p>
                        
                        {/* Membership Highlights */}
                        <div className="flex gap-4">
                            <div className="flex-1 text-center px-6 py-4 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center">
                                <div className="text-xl font-bold text-white mb-1">赠送 1000</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">积分</div>
                            </div>
                             <div className="flex-1 text-center px-6 py-4 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center">
                                <div className="text-xl font-bold text-white mb-1">20+ 独家</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">风格模型</div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="w-full md:w-[500px] relative perspective-[1000px]">
                         <div className="absolute inset-0 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
                         
                         <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl overflow-hidden group hover:border-white/20 transition-colors">
                             
                             <div className="flex justify-between items-start mb-8">
                                 <div>
                                     <h3 className="text-xl font-bold text-white">Pro Membership</h3>
                                     <p className="text-sm text-gray-500 mt-1 font-medium">会员订阅</p>
                                 </div>
                                 <span className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded tracking-wide">RECOMMENDED</span>
                             </div>

                             <div className="flex items-baseline gap-1 mb-8">
                                 <span className="text-5xl font-bold text-white tracking-tight">¥398</span>
                                 <span className="text-gray-500 font-medium">/ 年</span>
                             </div>

                             <div className="h-px w-full bg-white/10 mb-8" />

                             <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 mb-10">
                                {[
                                    '合成超高清晰度视频',
                                    '开通赠送 1000 积分',
                                    '支持 20+ 独家风格模型',
                                    '专属客户经理 1对1 服务',
                                    '快速通道生成，优先排队',
                                    '不限量生成小说视频',
                                    '支持生成动态漫画效果',
                                    '新功能优先体验权'
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check size={12} className="text-blue-500 stroke-[3px]" />
                                        </div>
                                        <span className="text-xs font-medium leading-snug">{feature}</span>
                                    </li>
                                ))}
                             </ul>

                             <button 
                                onClick={() => window.location.href = "https://comic-drama-user.yizhiknow.com/#/"}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
                             >
                                 立即注册开通
                             </button>
                             
                         </div>
                    </div>
                </div>
                
                {/* Scroll Prompt */}
                <motion.div 
                    style={{ opacity: opacityMembership }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
                >
                    <span className="text-xs font-medium tracking-widest uppercase">积分消耗说明</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
                </motion.div>
            </motion.div>

            {/* --- VIEW 2: CREDITS CONSUMPTION --- */}
            <motion.div 
                style={{ 
                    opacity: opacityCredits,
                    scale: scaleCredits,
                    y: yCredits,
                    filter: filterCredits,
                    pointerEvents: pointerEventsCredits,
                    zIndex: 20
                }}
                className="absolute inset-0 flex items-center justify-center w-full px-6"
            >
                <div className="max-w-6xl w-full mx-auto">
                     
                     {/* Title - Aligned with Membership Section - Reduced margin for better fit */}
                     <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                            灵活可控的<br />
                            <span className="text-gray-500">积分消耗</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            拒绝套餐浪费，按需扣除。<br/>
                            每一笔消耗都清晰可见。
                        </p>
                     </div>

                     {/* Apple Style Grid - Compact Gap */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         
                         {/* Card 1: Image */}
                         <ConsumptionCard 
                            icon={<ImageIcon />}
                            title="生图消耗"
                            price="4"
                            unit="积分 / 张"
                            desc="通用模型生成，包含角色卡、场景图生成与重绘。"
                            tags={['角色生成', '场景重绘', '封面设计']}
                            gradient="from-blue-500/20 to-indigo-500/5"
                            iconColor="text-blue-400"
                         />

                         {/* Card 2: Video (Updated) */}
                         <ConsumptionCard 
                            icon={<Film />}
                            title="片段视频消耗"
                            price="4"
                            unit="积分 / 15秒"
                            desc="人物角色视频渲染，分镜场景的动态视频合成。"
                            tags={['动态漫', '转场特效', '镜头运动']}
                            gradient="from-purple-500/20 to-pink-500/5"
                            iconColor="text-purple-400"
                         />

                         {/* Card 3: Text (Updated Price) */}
                         <ConsumptionCard 
                            icon={<FileText />}
                            title="文本消耗"
                            price="约 0.5"
                            unit="积分 / 千字"
                            desc="智能 AI 小说分析、剧本拆解与镜头语言构建。"
                            tags={['剧本解析', '分镜描写', '提示词优化']}
                            gradient="from-emerald-500/20 to-teal-500/5"
                            iconColor="text-emerald-400"
                         />

                         {/* Card 4: Audio (Updated Price) */}
                         <ConsumptionCard 
                            icon={<Music />}
                            title="音频消耗"
                            price="约 0.6"
                            unit="积分 / 千字符"
                            desc="多情感语音合成，自动匹配剧情氛围与角色性格。"
                            tags={['角色配音', '旁白解说', '背景音效']}
                            gradient="from-orange-500/20 to-red-500/5"
                            iconColor="text-orange-400"
                         />
                         
                     </div>
                </div>
            </motion.div>

        </div>
    </section>
  );
};

// --- Sub-Component: Consumption Card ---

interface ConsumptionCardProps {
    icon: React.ReactNode;
    title: string;
    price: string;
    unit: string;
    desc: string;
    tags: string[];
    gradient: string;
    iconColor: string;
}

const ConsumptionCard: React.FC<ConsumptionCardProps> = ({ icon, title, price, unit, desc, tags, gradient, iconColor }) => (
    // Height reduced to h-[240px] to ensure visibility on smaller screens
    <div className="group relative bg-[#151516] border border-white/10 rounded-[24px] p-6 md:p-8 overflow-hidden hover:bg-[#1a1a1a] transition-colors duration-500 flex flex-col h-[240px]">
         {/* Hover Gradient Blob */}
         <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${gradient} blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
         
         <div className="relative z-10 flex flex-col h-full">
            {/* Header: Icon + Price */}
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${iconColor} transition-transform duration-500 group-hover:scale-110`}>
                    {React.cloneElement(icon as React.ReactElement, { size: 28, strokeWidth: 1.5 })}
                </div>
                <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1.5">
                        <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{price}</span>
                        {/* Unit logic handles 'Integral / X' split properly */}
                        <span className="text-sm font-medium text-gray-500">{unit.includes('/') ? unit.split('/')[0] : unit}</span>
                    </div>
                    {unit.includes('/') && (
                         <div className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mt-0.5">/ {unit.split('/')[1]}</div>
                    )}
                </div>
            </div>

            {/* Content: Title + Desc */}
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{title}</h3>
            <p className="text-gray-400 leading-snug mb-4 text-sm font-medium max-w-sm flex-1">
                {desc}
            </p>

            {/* Footer: Tags */}
            <div className="mt-auto flex flex-wrap gap-2">
                {tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-gray-400 font-medium group-hover:text-white group-hover:bg-white/10 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
         </div>
    </div>
);

export default Pricing;