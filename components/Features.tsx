import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Palette, Mic, Settings, Play, MousePointer2, Sliders, Layers, RefreshCw, Wand2, Image as ImageIcon, Edit3, CheckCircle2, MoreHorizontal } from 'lucide-react';

// --- Visual Components (Preserved logic, resized for new layout) ---

const AutoModeVisual = () => {
    const [phase, setPhase] = useState<'setup' | 'clicking' | 'playing'>('setup');
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const sequence = async () => {
            while (isMounted) {
                setPhase('setup');
                setCurrentFrame(0);
                await new Promise(r => setTimeout(r, 2500)); // Show inputs for 2.5s
                
                setPhase('clicking');
                await new Promise(r => setTimeout(r, 1500)); // Click action
                
                setPhase('playing');
                await new Promise(r => setTimeout(r, 6000)); // Play video
            }
        };
        sequence();
        return () => { isMounted = false; };
    }, []);

    // Frame switching for "Video" playback
    useEffect(() => {
        if (phase === 'playing') {
            const interval = setInterval(() => {
                setCurrentFrame(prev => (prev + 1) % 2);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [phase]);

    // Anime style frames for realistic output simulation
    const frames = [
        {
            src: "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?q=80&w=1000&auto=format&fit=crop", // Cyberpunk Girl
            text: "在这座永夜之城，每个人都有秘密..."
        },
        {
            src: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=1000&auto=format&fit=crop", // Neon City / Rain
            text: "而她的秘密，藏在那双机械义眼之后。"
        }
    ];

    return (
        <div className="w-full h-full flex items-center justify-center relative bg-zinc-900 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            
            <AnimatePresence mode="wait">
                {phase !== 'playing' ? (
                    <motion.div 
                        key="setup"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 flex flex-col items-center justify-center w-full h-full"
                    >
                        {/* Orbiting Config Items */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {/* Style */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-16 md:-top-24 flex flex-col items-center gap-2"
                            >
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center backdrop-blur-md">
                                    <Palette className="w-6 h-6 text-purple-400" />
                                </div>
                                <span className="text-xs font-medium text-purple-300 bg-black/50 px-2 py-1 rounded-full border border-white/5">二次元风格</span>
                            </motion.div>

                            {/* Voice */}
                            <motion.div 
                                animate={{ x: [0, -10, 0], y: [0, 5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -left-20 md:-left-32 flex flex-col items-center gap-2"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center backdrop-blur-md">
                                    <Mic className="w-6 h-6 text-blue-400" />
                                </div>
                                <span className="text-xs font-medium text-blue-300 bg-black/50 px-2 py-1 rounded-full border border-white/5">中文配音</span>
                            </motion.div>

                            {/* Settings */}
                            <motion.div 
                                animate={{ x: [0, 10, 0], y: [0, 5, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute -right-20 md:-right-32 flex flex-col items-center gap-2"
                            >
                                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center backdrop-blur-md">
                                    <Settings className="w-6 h-6 text-green-400" />
                                </div>
                                <span className="text-xs font-medium text-green-300 bg-black/50 px-2 py-1 rounded-full border border-white/5">4K 超清</span>
                            </motion.div>
                        </div>

                        {/* Central Novel Input */}
                        <div className="relative mb-8">
                             <motion.div 
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-32 h-40 bg-zinc-800 rounded-xl border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-3 relative z-10"
                             >
                                <FileText className="w-10 h-10 text-white/80" />
                                <div className="w-16 h-2 bg-white/10 rounded-full" />
                                <div className="w-20 h-2 bg-white/10 rounded-full" />
                                <div className="w-12 h-2 bg-white/10 rounded-full" />
                             </motion.div>
                             <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full -z-10 animate-pulse" />
                             <div className="mt-4 text-center">
                                 <div className="text-sm font-bold text-white">小说文本</div>
                                 <div className="text-xs text-gray-500">Input Novel</div>
                             </div>
                        </div>

                        {/* Generate Button */}
                        <motion.div 
                            animate={phase === 'clicking' ? { scale: 0.95 } : { scale: 1 }}
                            className={`px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 ${phase === 'clicking' ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-white text-black shadow-lg'}`}
                        >
                            <Wand2 className="w-4 h-4" />
                            一键生成
                        </motion.div>

                        {/* Mouse Cursor Animation */}
                        {phase === 'clicking' && (
                            <motion.div
                                initial={{ x: 100, y: 100, opacity: 0 }}
                                animate={{ x: 0, y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute z-50 pointer-events-none mt-20 ml-20"
                            >
                                <MousePointer2 className="w-8 h-8 text-white fill-black drop-shadow-xl" />
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    className="absolute -top-2 -left-2 w-12 h-12 bg-white/50 rounded-full"
                                />
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="player"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative z-20 w-[80%] aspect-video bg-black rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                        {/* Video Content Animation */}
                        <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.img 
                                    key={currentFrame}
                                    src={frames[currentFrame].src}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.1, opacity: 0.5 }}
                                    animate={{ 
                                        scale: 1, 
                                        opacity: 1,
                                        x: currentFrame % 2 === 0 ? [-10, 0] : [0, -10] // Subtle Pan
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2 }}
                                />
                            </AnimatePresence>
                            
                            {/* Cinematic Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                            
                            {/* Subtitles */}
                            <div className="absolute bottom-16 w-full flex justify-center px-8 z-20">
                                <AnimatePresence mode="wait">
                                    <motion.div 
                                        key={currentFrame}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-lg border border-white/5 text-white/90 text-sm md:text-base font-medium text-center shadow-lg"
                                    >
                                        {frames[currentFrame].text}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Player UI Overlay */}
                        <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-black/80 to-transparent flex items-center px-4 gap-3 z-30">
                            <Play className="w-3 h-3 text-white fill-white" />
                            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 6, ease: "linear" }}
                                    className="h-full bg-blue-500"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const DirectorModeVisual = () => {
    const [selectedImageIdx, setSelectedImageIdx] = useState(0);
    const [textVersion, setTextVersion] = useState(0); // 0: Original, 1: Edited
    const [cursorState, setCursorState] = useState<'idle' | 'editing_text' | 'selecting_image'>('idle');

    // Scene Text Data
    const sceneText = [
        "沈梦云躺在床上熟睡，月光透过窗帘缝隙。", // Original
        "沈梦云躺在床上，月光洒在她的侧脸，神情不安。" // Edited
    ];

    // Anime Images for the Director's Grid
    const storyboardImages = [
        "https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?q=80&w=500&auto=format&fit=crop", // Close up / Portrait
        "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=500&auto=format&fit=crop", // Bedroom / Mood
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop", // Expression / Face
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=500&auto=format&fit=crop"  // Alternate angle / Scenery
    ];

    useEffect(() => {
        let isMounted = true;
        const loop = async () => {
            while (isMounted) {
                // Initial State
                setCursorState('idle');
                setTextVersion(0);
                setSelectedImageIdx(0);
                await new Promise(r => setTimeout(r, 2000));

                // 1. Edit Text Animation
                setCursorState('editing_text');
                await new Promise(r => setTimeout(r, 1000)); // Move to text
                setTextVersion(1); // Change text
                await new Promise(r => setTimeout(r, 1000)); // Pause

                // 2. Select Image Animation
                setCursorState('selecting_image');
                await new Promise(r => setTimeout(r, 1000)); // Move to image
                setSelectedImageIdx(2); // Select 3rd image (index 2)
                await new Promise(r => setTimeout(r, 2000)); // Pause to show selection

                // Reset
                setCursorState('idle');
            }
        };
        loop();
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="w-full h-full bg-[#0a0a0a] flex flex-col p-6 relative overflow-hidden font-sans">
             {/* Mock App Header */}
             <div className="h-8 flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                 <div className="flex items-center gap-2">
                     <span className="text-xs font-mono text-gray-500">SCENE 001</span>
                     <span className="text-sm font-bold text-white">月夜·卧室</span>
                 </div>
                 <MoreHorizontal size={16} className="text-gray-600" />
             </div>

             <div className="flex-1 flex gap-4 h-full">
                 
                 {/* LEFT: Script & Storyboard List */}
                 <div className="w-[35%] flex flex-col gap-3">
                     {/* Script Item (Avatar + Text) */}
                     <div className="flex gap-3 mb-2 opacity-50">
                         <div className="w-8 h-8 rounded-full bg-indigo-900/50 flex-shrink-0" />
                         <div className="flex-1 space-y-1">
                             <div className="h-2 w-12 bg-white/10 rounded" />
                             <div className="h-2 w-full bg-white/10 rounded" />
                         </div>
                     </div>
                     <div className="flex gap-3 mb-6 opacity-50">
                         <div className="w-8 h-8 rounded-full bg-purple-900/50 flex-shrink-0" />
                         <div className="flex-1 space-y-1">
                             <div className="h-2 w-12 bg-white/10 rounded" />
                             <div className="h-2 w-2/3 bg-white/10 rounded" />
                         </div>
                     </div>

                     {/* Active Storyboard Card */}
                     <div className="flex-1 bg-zinc-900 rounded-xl border border-blue-500/30 p-4 relative overflow-hidden group">
                         <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                         
                         <div className="flex justify-between items-center mb-3">
                             <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">分镜 1</span>
                             <div className="flex gap-1">
                                <div className="p-1 hover:bg-white/10 rounded"><Edit3 size={12} className="text-gray-400" /></div>
                             </div>
                         </div>
                         
                         <div className="space-y-2">
                             <span className="text-[10px] text-gray-500 uppercase tracking-wider">描述 Description</span>
                             {/* Editable Text Area */}
                             <motion.p 
                                key={textVersion}
                                initial={{ opacity: 0.5 }}
                                animate={{ opacity: 1 }}
                                className={`text-sm leading-relaxed text-gray-200 p-2 rounded transition-colors ${cursorState === 'editing_text' ? 'bg-white/10' : ''}`}
                             >
                                 {sceneText[textVersion]}
                                 {cursorState === 'editing_text' && <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 align-middle animate-pulse" />}
                             </motion.p>
                         </div>

                         {/* Mock Buttons */}
                         <div className="flex gap-2 mt-4">
                             <div className="px-3 py-1.5 bg-blue-600 rounded text-[10px] font-medium text-white flex items-center gap-1">
                                 <PlusIcon /> 插入分镜
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* RIGHT: Visual Generation Grid */}
                 <div className="flex-1 bg-zinc-900/50 rounded-xl border border-white/5 p-4 flex flex-col">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-gray-400 flex items-center gap-2">
                            <ImageIcon size={12} /> 场景分镜 (视频首帧)
                        </span>
                        <div className="flex gap-2">
                            <button className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-300 hover:bg-white/10">上传参考图</button>
                            <button className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-300 hover:bg-white/10">自定义生图</button>
                        </div>
                     </div>

                     {/* Image Grid */}
                     <div className="grid grid-cols-2 gap-3 flex-1">
                         {[0, 1, 2, 3].map((idx) => {
                             const isSelected = selectedImageIdx === idx;
                             return (
                                 <motion.div 
                                    key={idx}
                                    className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 group ${isSelected ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-transparent hover:border-white/20'}`}
                                 >
                                     {/* Anime Image Content */}
                                     <img 
                                        src={storyboardImages[idx]} 
                                        alt={`Storyboard variation ${idx}`}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                     />
                                     <div className={`absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 ${isSelected ? 'bg-transparent' : ''}`} />
                                     
                                     {/* Details Overlay */}
                                     <div className="absolute inset-0 p-3 flex flex-col justify-between z-10">
                                         <div className="flex justify-end">
                                            {isSelected && <div className="bg-blue-500 rounded-full p-0.5 shadow-md"><CheckCircle2 size={12} className="text-white" /></div>}
                                         </div>
                                         <div className="w-full h-6 bg-black/60 backdrop-blur-sm rounded flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                                             <Play size={8} className="text-white" />
                                             <span className="text-[9px] text-white font-medium">生成视频</span>
                                         </div>
                                     </div>
                                 </motion.div>
                             );
                         })}
                     </div>
                 </div>
             </div>

             {/* Animated Cursor Overlay */}
             <CursorOverlay state={cursorState} />
        </div>
    );
};

// --- Helpers ---

const PlusIcon = () => (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14"/>
    </svg>
);

const CursorOverlay: React.FC<{ state: 'idle' | 'editing_text' | 'selecting_image' }> = ({ state }) => {
    // Define cursor positions (approximate % for simplicity in responsive layout)
    const positions = {
        idle: { x: '100%', y: '100%', opacity: 0 },
        editing_text: { top: '55%', left: '15%', opacity: 1 }, // Over text area
        selecting_image: { top: '75%', left: '65%', opacity: 1 }, // Over 3rd image (bottom left of grid)
    };

    const isIdle = state === 'idle';

    return (
        <motion.div
            className="absolute z-50 pointer-events-none"
            initial={positions.idle}
            animate={isIdle ? positions.idle : positions[state] as any}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <MousePointer2 className="w-6 h-6 text-white fill-black drop-shadow-xl" />
            
            {/* Click Ripple Effect */}
            {!isIdle && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute -top-3 -left-3 w-12 h-12 bg-white/30 rounded-full"
                />
            )}
        </motion.div>
    );
};

// --- New FeatureRow Component ---

const FeatureRow = ({ 
    title, 
    desc, 
    visual, 
    reversed = false 
}: { 
    title: string, 
    desc: string, 
    visual: React.ReactNode, 
    reversed?: boolean 
}) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className={`group w-full bg-[#0a0a0a] rounded-[40px] border border-white/10 overflow-hidden flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
        >
            {/* Text Section */}
            <div className={`w-full lg:w-[40%] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 ${reversed ? 'lg:pl-8' : 'lg:pr-8'}`}>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                    {title}
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed font-medium">
                    {desc}
                </p>
            </div>

            {/* Visual Section */}
            <div className={`w-full lg:w-[60%] h-[400px] md:h-[500px] lg:h-[700px] relative bg-zinc-900 overflow-hidden border-t lg:border-t-0 border-white/5 ${reversed ? 'lg:border-r' : 'lg:border-l'}`}>
                {visual}
            </div>
        </motion.div>
    );
};

// --- Main Component ---

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-black px-6 border-t border-white/5 scroll-mt-32">
        <div className="max-w-[1400px] mx-auto">
            {/* Header Section */}
            <div className="text-center mb-24 max-w-4xl mx-auto">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8"
                >
                    多维创作方式，<br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        一样出色
                    </span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-gray-400 font-medium"
                >
                    一键自动成片，或逐镜精细打磨。<br className="hidden md:block" />
                    自由适配不同创作习惯
                </motion.p>
            </div>

            {/* Rows Container */}
            <div className="flex flex-col gap-12 lg:gap-24">
                
                {/* Row 1: Auto Mode (Text Left, Image Right) */}
                <FeatureRow 
                    title="全自动 · 一键成片"
                    desc="粘贴小说、选风格与配音、点击生成，AI 接手全自动拆镜、构建角色与场景图片并合成视频，全程无需干预，无需剪辑经验，也能快速产出完整作品。"
                    visual={<AutoModeVisual />}
                    reversed={false}
                />

                {/* Row 2: Director Mode (Image Left, Text Right) */}
                <FeatureRow 
                    title="精细化 · 导演模式"
                    desc="随时编辑角色、对白与镜头；逐镜逐图优化与反复生成挑选，直到每一帧都达到预期。所见即所得的专业级控制台。"
                    visual={<DirectorModeVisual />}
                    reversed={true}
                />

            </div>
        </div>
    </section>
  );
};

export default Features;