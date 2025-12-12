import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence, useInView } from 'framer-motion';
import { Zap, User, Boxes, Check, Search, MousePointer2, CheckCircle2, Wand2, Play, Monitor, ScanFace, Sparkles, Sliders, Edit3, Mic, RefreshCw, Image as ImageIcon, ChevronDown, Copy, Upload, Settings2, Scissors, Type, Music, MoveHorizontal, Layers, Film, Share, Download, FileJson } from 'lucide-react';

// --- Data ---
const advantages = [
    {
        id: 0,
        title: "多线程异步引擎",
        subtitle: "效率倍增器",
        description: "支持多部作品、多章节并行处理。最快仅需15分钟即可完成一部短篇小说漫改。规模化产出，让创作不再受限于时间。",
        icon: <Zap size={24} />,
        color: "text-amber-400",
        gradient: "from-amber-500 to-orange-600",
        bgGradient: "from-amber-500/10 to-orange-600/5"
    },
    {
        id: 1,
        title: "角色形象一致性",
        subtitle: "永不跑偏",
        description: "不论镜头和场景如何切换，人物角色的外观、语音与情绪在不同镜头与章节间高度适配和一致；解决你的最大痛点。",
        icon: <User size={24} />,
        color: "text-blue-400",
        gradient: "from-blue-500 to-cyan-600",
        bgGradient: "from-blue-500/10 to-cyan-600/5"
    },
    {
        id: 2,
        title: "全链路自由编辑",
        subtitle: "直到满意为止",
        description: "角色、场景图属性自由可调，更有提示词重写与上传参考素材等能力；让小说视频每帧可反复生成，直到满意为止。",
        icon: <Sliders size={24} />,
        color: "text-purple-400",
        gradient: "from-purple-500 to-pink-600",
        bgGradient: "from-purple-500/10 to-pink-600/5"
    },
    {
        id: 3,
        title: "一站式剪辑集成",
        subtitle: "零门槛上手",
        description: "在工具内直接完成封面、字幕、配音、转场与关键帧便捷配置，无需会剪辑；倘若需二次剪辑，支持导出可直接导入剪映的草稿，工作流无缝衔接。",
        icon: <Scissors size={24} />,
        color: "text-green-400",
        gradient: "from-green-500 to-emerald-600",
        bgGradient: "from-green-500/10 to-emerald-600/5"
    }
];

// --- Visual Components (Enhanced) ---

interface VisualProps {
    isActive: boolean;
}

const BatchProductionVisual: React.FC<VisualProps> = ({ isActive }) => {
    // Unique Anime Covers for each item
    const animeCovers = [
        "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=400&auto=format&fit=crop", // Abstract Anime 1
        "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=400&auto=format&fit=crop", // Anime Portrait
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop", // Scenery
        "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?q=80&w=400&auto=format&fit=crop", // Cyberpunk
        "https://images.unsplash.com/photo-1569701813229-33284b643e3c?q=80&w=400&auto=format&fit=crop", // Fantasy
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop", // Ancient
        "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=400&auto=format&fit=crop", // Sci-Fi City
        "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=400&auto=format&fit=crop"  // Neon
    ];

    const items = Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        title: i % 2 === 0 ? `西游记_第${i + 1}章_大闹天宫` : `赛博朋克_场景_${i + 10}_夜之城`,
        date: '2025-11-08 17:02:12',
        imageUrl: animeCovers[i % animeCovers.length]
    }));

    // Only render/animate if active to save resources and reset state on re-entry
    if (!isActive) return <div className="w-full h-full bg-[#0d0d0d]" />;

    return (
        <div className="w-full h-full bg-[#0d0d0d] relative overflow-hidden flex flex-col font-sans select-none rounded-r-[40px] md:rounded-r-none md:rounded-l-none">
            <div className="h-16 border-b border-white/5 flex items-center px-8 bg-[#0d0d0d] z-20 shrink-0 justify-between shadow-sm">
                 <div className="flex items-center gap-3">
                     <span className="text-lg font-bold text-gray-100 tracking-tight">作品列表</span>
                     <span className="text-xs font-mono text-gray-600 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">BATCH PROCESSING</span>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <Search size={14} className="text-gray-500" />
                 </div>
            </div>

            <div className="flex-1 relative overflow-hidden bg-[#0a0a0a]">
                <motion.div
                    className="w-full p-6 space-y-4 origin-[50%_70%]"
                    animate={{ 
                        y: [0, -320, -320, 0],
                        scale: [1, 1, 1.35, 1]
                    }} 
                    transition={{ 
                        duration: 12, 
                        times: [0, 0.5, 0.85, 1],
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {items.map((item, idx) => (
                        <div key={item.id} className="h-32 bg-[#141414] rounded-2xl border border-white/5 p-4 flex gap-6 items-center shadow-lg relative overflow-hidden group">
                             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                             
                             <div className="w-40 h-full rounded-xl overflow-hidden relative flex-shrink-0 border border-white/5 group-hover:border-white/20 transition-colors">
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
                                />
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_#22c55e]" />
                             </div>
                             
                             <div className="flex-1 flex flex-col justify-center h-full py-1">
                                 <div className="flex justify-between items-start mb-3">
                                     <div>
                                         <div className="text-lg font-bold text-gray-100 tracking-tight mb-1">{item.title}</div>
                                         <div className="text-[11px] text-gray-600 font-mono tracking-wide">{item.date}</div>
                                     </div>
                                     <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold tracking-wider">
                                         生成成功
                                     </div>
                                 </div>
                                 
                                 <div className="flex items-center w-full relative mt-auto">
                                     <div className="absolute top-1/2 left-0 w-full h-[2px] bg-zinc-800 -z-10 rounded-full" />
                                     <div className="absolute top-1/2 left-0 w-full h-[2px] bg-green-500/30 -z-10 rounded-full" />
                                     
                                     {['脚本', '角色', '分镜', '视频', '合成'].map((step, sIdx) => (
                                         <div key={step} className="flex-1 flex items-center relative">
                                              <div className="flex flex-col items-center gap-1.5 z-10 bg-[#141414] px-1">
                                                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_8px_rgba(34,197,94,0.4)]">
                                                      <Check size={10} className="text-black font-bold" />
                                                  </div>
                                                  <span className="text-[10px] font-medium text-gray-500">{step}</span>
                                              </div>
                                              {sIdx < 4 && <div className="flex-1 h-[2px] bg-green-500 mx-2 shadow-[0_0_5px_rgba(34,197,94,0.3)]" />}
                                         </div>
                                     ))}
                                 </div>
                             </div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    className="absolute z-40 pointer-events-none"
                    initial={{ opacity: 0, top: "60%", left: "80%" }}
                    animate={{ 
                        opacity: [0, 0, 1, 1, 0],
                        top: ["60%", "60%", "58%", "58%", "60%"],
                        left: ["80%", "80%", "30%", "70%", "80%"]
                    }}
                    transition={{
                        duration: 12,
                        times: [0, 0.5, 0.6, 0.8, 1],
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                     <MousePointer2 className="w-8 h-8 text-white fill-black drop-shadow-2xl" />
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: -20, x: "-50%" }}
                    animate={{ 
                        opacity: [0, 0, 1, 1, 0], 
                        scale: [0.9, 0.9, 1, 1, 0.9], 
                        y: [-20, -20, 50, 50, -20] 
                    }}
                    transition={{ 
                        duration: 12, 
                        times: [0, 0.6, 0.65, 0.85, 0.95],
                        repeat: Infinity,
                    }}
                    className="absolute top-0 left-1/2 z-50 w-full max-w-sm"
                >
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 flex items-center gap-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-shimmer" />
                        
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <div className="text-white font-bold text-lg leading-tight">批量生成完成</div>
                            <div className="text-gray-400 text-xs mt-1">
                                已成功生成 <span className="text-green-400 font-bold">100+</span> 部作品
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const ConsistencyVisual: React.FC<VisualProps> = ({ isActive }) => {
    // 1. Image Assets
    // Updated to match the requested image: Female, short dark hair, black dress (Anime/Illustration Style)
    const characterImg = "https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?q=80&w=600&auto=format&fit=crop"; 
    
    // Background scenes to cycle through - Expanded to 6 scenes
    const scenes = [
        { id: 'city', src: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=800", name: "SCENE 01: NEO TOKYO" },
        { id: 'forest', src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800", name: "SCENE 02: ANCIENT RUINS" },
        { id: 'snow', src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800", name: "SCENE 03: FROST PEAKS" },
        { id: 'desert', src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800", name: "SCENE 04: RED DESERT" },
        { id: 'cyber', src: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800", name: "SCENE 05: CYBER LAB" },
        { id: 'space', src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800", name: "SCENE 06: DEEP SPACE" },
    ];

    // 2. Animation Logic
    const [state, setState] = useState<'card' | 'card_clicking' | 'video' | 'video_clicking'>('card');
    const [currentScene, setCurrentScene] = useState(0);

    useEffect(() => {
        if (!isActive) {
            // Reset to initial state when out of view
            setState('card');
            setCurrentScene(0);
            return;
        }

        let mounted = true;
        const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

        const sequence = async () => {
            while (mounted) {
                // Phase 1: Card Display
                setState('card');
                setCurrentScene(0); 
                await delay(2500);

                // Phase 2: Mouse Interaction (Card Click)
                setState('card_clicking');
                await delay(800); // Move in
                // Click happens
                await delay(200);

                // Phase 3: Transform to Video
                setState('video');
                // Wait for expansion animation
                await delay(800);
                
                // Phase 4: Cycle through scenes with simulated clicks
                // Start iterating from scene 0 to end
                for (let i = 0; i < scenes.length; i++) {
                    if (!mounted) return;
                    
                    // If it's not the first scene, we click to advance
                    if (i > 0) {
                        // Wait viewing time for previous scene
                        await delay(1500);
                        
                        // Simulate click to advance
                        setState('video_clicking');
                        await delay(300); // Cursor appears
                        // Ripple happens via animation delay in CSS
                        await delay(200);
                        
                        // Change scene
                        setCurrentScene(i);
                        // Return to video state (cursor might disappear or stay, we'll hide it to simulate 'interaction done')
                        setState('video'); 
                    } else {
                        // First scene (already shown by default)
                        setCurrentScene(0);
                    }
                }
                
                // Final viewing time
                await delay(2000);
            }
        };
        sequence();
        return () => { mounted = false; };
    }, [isActive]);

    // 3. Render Helpers
    const isVideo = state === 'video' || state === 'video_clicking';
    
    return (
        <div className="w-full h-full relative bg-[#050505] flex items-center justify-center p-8 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            {/* MAIN TRANSFORMING CONTAINER */}
            <motion.div 
                layout
                className={`relative overflow-hidden bg-black shadow-2xl transition-all duration-700 ease-[0.22,1,0.36,1]
                    ${isVideo ? 'w-full h-[80%] rounded-xl' : 'w-[280px] h-[400px] rounded-2xl hover:scale-105'}
                `}
                style={{
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                {/* A. SCENE BACKGROUNDS */}
                <div className="absolute inset-0 bg-zinc-900">
                    <AnimatePresence mode="popLayout">
                        {isVideo ? (
                            <motion.img 
                                key={scenes[currentScene].id}
                                src={scenes[currentScene].src}
                                alt="Background"
                                initial={{ opacity: 1 }} // Full brightness
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            // Card Background (Static or Abstract)
                            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black opacity-80" />
                        )}
                    </AnimatePresence>
                </div>

                {/* B. CHARACTER LAYER (Consistent Identity) */}
                <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden z-10">
                    <motion.div 
                        className="relative h-[95%] w-auto aspect-[2/3] origin-bottom"
                        animate={isVideo ? {
                            opacity: 0, // Hide character in video mode
                            scale: 1
                        } : {
                            opacity: 1,
                            scaleX: 1, scale: 1, x: 0
                        }}
                        transition={{ duration: 0.4 }}
                    >
                         <img 
                            src={characterImg} 
                            alt="Anime Character" 
                            className="w-full h-full object-cover drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                            style={{ 
                                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                            }}
                         />
                    </motion.div>
                </div>

                {/* C. UI OVERLAYS */}
                
                {/* 1. Card Label (Visible in Card Mode only) */}
                <motion.div 
                    className="absolute top-4 left-4 z-20"
                    animate={{ opacity: isVideo ? 0 : 1 }}
                >
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2">
                        <Sparkles size={12} className="text-blue-400" />
                        <span className="text-xs font-bold text-white tracking-wide">角色信息</span>
                    </div>
                </motion.div>

                <motion.div 
                    className="absolute bottom-0 w-full p-5 bg-gradient-to-t from-black via-black/80 to-transparent z-20"
                    animate={{ opacity: isVideo ? 0 : 1, y: isVideo ? 20 : 0 }}
                >
                    <div className="text-2xl font-bold text-white mb-1">莎莎</div>
                    <div className="flex gap-2">
                         <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded border border-pink-500/20">女性♀</span>
                         <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">身高170</span>
                    </div>
                </motion.div>

                {/* Play Button Overlay (Click Indication) */}
                <AnimatePresence>
                    {!isVideo && (
                        <motion.div 
                            className="absolute inset-0 z-20 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                                <Play size={24} className="text-white fill-white ml-1" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>

            {/* CURSOR ANIMATION */}
            <AnimatePresence>
                {(state === 'card_clicking' || state === 'video_clicking') && (
                    <motion.div
                        initial={{ x: 100, y: 100, opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute z-50 pointer-events-none top-1/2 left-1/2 -ml-5 -mt-5" // Centered relative to container
                    >
                        <MousePointer2 className="w-10 h-10 text-white fill-black drop-shadow-2xl stroke-[1.5px]" />
                        {/* Click Ripple */}
                        <motion.div
                             initial={{ scale: 0, opacity: 0 }}
                             animate={{ scale: 2.5, opacity: 0 }}
                             transition={{ duration: 0.5, delay: 0.4 }}
                             className="absolute -top-4 -left-4 w-16 h-16 bg-white/50 rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const EditingVisual: React.FC<VisualProps> = ({ isActive }) => {
    // Phase Loop: idle -> zoom_prompt -> edit_prompt -> zoom_voice -> edit_voice -> zoom_image -> select_image -> idle
    const [phase, setPhase] = useState('idle');
    const [promptText, setPromptText] = useState("28岁东亚女性，身高165cm，体重50kg，及肩微卷黑发，鹅蛋脸，杏眼坚定。小巧鼻子，唇形清晰。白皙皮肤。身穿简约干练的米白色西装...");
    const [voice, setVoice] = useState("影视解说小帅");
    const [selectedImg, setSelectedImg] = useState(0);

    // Marisa / Female style images
    const images = [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    ];

    useEffect(() => {
        if (!isActive) {
            setPhase('idle');
            return;
        }

        let isMounted = true;
        const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
        
        const run = async () => {
            while (isMounted) {
                // Initial State
                setPhase('idle');
                setPromptText("28岁东亚女性，身高165cm，及肩微卷黑发，神情冷漠...");
                setVoice("影视解说小帅");
                setSelectedImg(0);
                await delay(2000);

                // 1. Edit Prompt (Zoom In Bottom Left)
                setPhase('focus_prompt');
                await delay(1000);
                setPhase('editing_prompt');
                await delay(300);
                // Simulate Typing
                setPromptText("28岁东亚女性，身高165cm，及肩微卷黑发，神情温柔，嘴角上扬...");
                await delay(1000);

                // 2. Edit Voice (Zoom In Top Left)
                setPhase('focus_voice');
                await delay(1000);
                setPhase('editing_voice');
                await delay(300);
                setVoice("情感治愈 · 暖暖");
                await delay(800);

                // 3. Select Image (Zoom In Right)
                setPhase('focus_images');
                await delay(1000);
                setPhase('selecting_image');
                await delay(500); // Wait for cursor to arrive
                setSelectedImg(1); // Select the 2nd image (index 1), visually the 3rd box (Placeholder -> Img 0 -> Img 1)
                await delay(1000);

                // 4. Return to Full View
                setPhase('idle');
                await delay(3000);
            }
        };
        run();
        return () => { isMounted = false; };
    }, [isActive]);

    // Camera Transform Logic
    // We adjust x/y to force the focused area to the center of the viewport
    const getTransform = () => {
        switch (phase) {
            case 'idle':
                return { x: '0%', y: '0%', scale: 1 };
            case 'focus_prompt':
            case 'editing_prompt':
                // Focus Bottom Left: Move Container UP and RIGHT to center the bottom-left corner
                return { x: '32%', y: '-35%', scale: 1.8 }; 
            case 'focus_voice':
            case 'editing_voice':
                // Focus Top Left: Move Container DOWN and RIGHT to center the top-left area
                return { x: '32%', y: '25%', scale: 1.8 };
            case 'focus_images':
            case 'selecting_image':
                // Focus Top Right Grid: Move Container LEFT and DOWN to center the top-right area
                return { x: '-20%', y: '20%', scale: 1.5 };
            default:
                return { x: '0%', y: '0%', scale: 1 };
        }
    };

    const transform = getTransform();

    return (
        <div className="w-full h-full bg-[#050505] relative overflow-hidden flex items-center justify-center">
             {/* Background Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

             {/* MAIN CONTAINER (The "Screen" we zoom into) */}
             <motion.div 
                className="w-[92%] h-[88%] bg-[#121212] rounded-xl border border-white/10 shadow-2xl flex overflow-hidden relative"
                animate={transform}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
             >
                {/* --- LEFT PANEL --- */}
                <div className="w-[36%] h-full border-r border-white/5 bg-[#0f0f0f] flex flex-col p-4 relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-white">玛丽莎</h2>
                            <span className="text-xs bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-gray-400">ID:9527</span>
                        </div>
                        <div className="flex gap-2">
                             <div className="p-1.5 hover:bg-white/5 rounded text-gray-400"><Edit3 size={14} /></div>
                             <div className="p-1.5 hover:bg-white/5 rounded text-red-400"><div className="w-3.5 h-3.5 border border-red-400/50 rounded flex items-center justify-center text-[10px]">✕</div></div>
                        </div>
                    </div>

                    {/* Voice Selection (Focus Target) */}
                    <div className={`mb-6 p-3 rounded-lg border transition-colors duration-300 ${phase.includes('voice') ? 'bg-purple-500/10 border-purple-500/50' : 'bg-[#161616] border-white/5'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Mic size={10} /> 配音音色</span>
                            <span className="text-[10px] text-blue-400 cursor-pointer">试听</span>
                        </div>
                        <div className="flex items-center justify-between">
                             <span className="text-sm text-gray-200 font-medium">{voice}</span>
                             <ChevronDown size={14} className="text-gray-600" />
                        </div>
                    </div>

                    {/* Attributes Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="p-3 rounded bg-[#161616] border border-white/5">
                            <div className="text-[10px] text-gray-500 mb-1">性别</div>
                            <div className="text-sm text-gray-200">女</div>
                        </div>
                        <div className="p-3 rounded bg-[#161616] border border-white/5">
                            <div className="text-[10px] text-gray-500 mb-1">年龄</div>
                            <div className="text-sm text-gray-200">18</div>
                        </div>
                        <div className="col-span-2 p-3 rounded bg-[#161616] border border-white/5">
                            <div className="text-[10px] text-gray-500 mb-1">核心特征</div>
                            <div className="text-xs text-gray-400 leading-relaxed line-clamp-2">气质从温婉转为清冷果决，右手无名指有长期戴戒痕迹...</div>
                        </div>
                    </div>

                    {/* Prompt Area (Focus Target) */}
                    <div className="mt-auto">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">生图提示词</span>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500"><Copy size={10} /> 复制</div>
                        </div>
                        <div className={`h-40 rounded-lg border p-3 text-xs leading-relaxed text-gray-300 transition-colors duration-300 ${phase.includes('prompt') ? 'bg-blue-500/5 border-blue-500/50' : 'bg-[#161616] border-white/5'}`}>
                             {promptText}
                             {phase === 'editing_prompt' && <span className="inline-block w-0.5 h-3 bg-blue-500 ml-0.5 align-middle animate-pulse" />}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT PANEL --- */}
                <div className="flex-1 bg-[#141414] p-6 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                         <div className="flex items-center gap-2">
                             <ImageIcon size={16} className="text-gray-400" />
                             <span className="font-bold text-white">角色形象</span>
                         </div>
                         <div className="flex gap-2">
                             <button className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 flex items-center gap-1">
                                 <Upload size={10} /> 上传图片
                             </button>
                             <button className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 flex items-center gap-1">
                                 <Settings2 size={10} /> 自定义生图
                             </button>
                         </div>
                    </div>

                    {/* Image Grid (Focus Target) */}
                    <div className="flex gap-4 overflow-hidden mb-8">
                        {/* New Generation Placeholder (Box 1) */}
                        <div className="w-32 h-44 rounded-lg border border-dashed border-blue-500/30 bg-blue-500/5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-500/10 transition-colors flex-shrink-0">
                             <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><Sparkles size={14} className="text-blue-400" /></div>
                             <span className="text-[10px] text-blue-400 font-medium">生成新图片</span>
                        </div>

                        {/* Images (Boxes 2, 3, 4, 5) */}
                        {images.map((img, i) => (
                            <motion.div 
                                key={i}
                                className={`w-32 h-44 rounded-lg overflow-hidden border relative group cursor-pointer flex-shrink-0
                                    ${selectedImg === i ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-white/5'}
                                `}
                                whileHover={{ scale: 1.05 }}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                                     <div className="flex items-center gap-1 text-[9px] text-white">
                                         <Monitor size={10} /> 生成视频
                                     </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Video Preview Section */}
                    <div className="flex-1">
                         <div className="flex items-center gap-2 mb-3">
                             <Monitor size={16} className="text-gray-400" />
                             <span className="font-bold text-white">角色动态视频</span>
                         </div>
                         <div className="flex gap-4">
                             <div className="w-48 aspect-video rounded-lg border border-white/10 bg-black relative overflow-hidden group">
                                  {/* Video preview follows selected image */}
                                  <img src={images[selectedImg]} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"><Play size={12} className="text-white fill-white ml-0.5" /></div>
                                  </div>
                                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-blue-500 rounded text-[9px] text-white font-bold">已启用</div>
                             </div>
                         </div>
                    </div>
                </div>

                {/* --- CURSOR --- */}
                <CursorOverlay phase={phase} />

             </motion.div>
        </div>
    );
};

const CursorOverlay: React.FC<{ phase: string }> = ({ phase }) => {
    // Relative coordinates for the cursor inside the zoomed container
    const positions: Record<string, { top: string, left: string, opacity: number, scale?: number }> = {
        idle: { top: '100%', left: '100%', opacity: 0 },
        
        focus_prompt: { top: '85%', left: '15%', opacity: 1 },
        editing_prompt: { top: '85%', left: '20%', opacity: 1 }, // Move slightly while editing
        
        focus_voice: { top: '25%', left: '15%', opacity: 1 },
        editing_voice: { top: '25%', left: '15%', opacity: 1, scale: 0.9 }, // Click
        
        // Corrected left position to hit the 3rd box (Img 1), not the 2nd (Img 0).
        // Visual Grid: [Box 1: New] [Box 2: Img 0] [Box 3: Img 1] [Box 4: Img 2] ...
        // 68% landed on Box 2. 79% targets Box 3 properly.
        focus_images: { top: '22%', left: '79%', opacity: 1 }, 
        selecting_image: { top: '22%', left: '79%', opacity: 1, scale: 0.9 }, 
    };

    const pos = positions[phase] || positions.idle;

    return (
        <motion.div
            className="absolute z-50 pointer-events-none"
            initial={false}
            animate={{ 
                top: pos.top, 
                left: pos.left, 
                opacity: pos.opacity,
                scale: pos.scale || 1
            }}
            transition={{ duration: 0.5, ease: "circOut" }}
        >
            <MousePointer2 className="w-8 h-8 text-white fill-black drop-shadow-2xl stroke-[1.5px]" />
            
            {/* Click Ripple */}
            {(phase === 'editing_voice' || phase === 'selecting_image') && (
                <motion.div
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute -top-3 -left-3 w-14 h-14 bg-white/40 rounded-full"
                />
            )}
        </motion.div>
    );
};

const TypewriterText = ({ text, active }: { text: string; active: boolean }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        if (!active) {
            setDisplayed("");
            return;
        }
        let current = "";
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                current += text[i];
                setDisplayed(current);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [active, text]);

    return <span>{displayed}</span>;
};

const IntegratedEditingVisual: React.FC<VisualProps> = ({ isActive }) => {
    const [configState, setConfigState] = useState<Record<string, 'off' | 'auto' | 'manual'>>({
        cover: 'off',
        subs: 'off',
        bgm: 'off',
        trans: 'off',
        keyframe: 'off'
    });
    const [cursorTarget, setCursorTarget] = useState<number | 'export_video' | 'export_draft' | null>(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    // Settings Configuration
    const settings = [
        { id: 'cover', label: '视频封面', icon: <ImageIcon size={14} />, color: 'bg-purple-500' },
        { id: 'subs', label: '智能字幕', icon: <Type size={14} />, color: 'bg-blue-500' },
        { id: 'bgm', label: '背景音乐', icon: <Music size={14} />, color: 'bg-green-500' },
        { id: 'trans', label: '转场特效', icon: <MoveHorizontal size={14} />, color: 'bg-orange-500' },
        { id: 'keyframe', label: '关键帧动画', icon: <ScanFace size={14} />, color: 'bg-pink-500' },
    ];

    // Image Cycle Logic (Transitions)
    useEffect(() => {
        if (configState.trans === 'auto') {
            const interval = setInterval(() => {
                // Faster interval (1.2s) for "rapid" effect
                setCurrentImageIdx(prev => (prev + 1) % 3);
            }, 1200);
            return () => clearInterval(interval);
        } else {
            setCurrentImageIdx(0);
        }
    }, [configState.trans]);

    // Main Sequence Animation
    useEffect(() => {
        if (!isActive) {
            setConfigState({ cover: 'off', subs: 'off', bgm: 'off', trans: 'off', keyframe: 'off' });
            setCursorTarget(null);
            return;
        }

        let isMounted = true;
        const sequence = async () => {
            while (isMounted) {
                // Reset State
                setConfigState({ cover: 'off', subs: 'off', bgm: 'off', trans: 'off', keyframe: 'off' });
                setCursorTarget(null);
                await new Promise(r => setTimeout(r, 1500));

                // 1. Iterate through Settings
                for (let i = 0; i < settings.length; i++) {
                    if (!isMounted) return;
                    
                    setCursorTarget(i); // Move cursor to setting row
                    await new Promise(r => setTimeout(r, 600));

                    // Toggle State
                    const settingId = settings[i].id;
                    setConfigState(prev => ({ ...prev, [settingId]: 'auto' }));
                    
                    // Specific wait times based on effect
                    if (settingId === 'trans') {
                        // Pause for 2s to show transition effect
                         await new Promise(r => setTimeout(r, 2000));
                    } else if (settingId === 'keyframe') {
                         // Pause for 2s to show keyframe animation
                         await new Promise(r => setTimeout(r, 2000));
                    } else {
                         // Standard wait
                         await new Promise(r => setTimeout(r, 800));
                    }
                }

                // 2. Click Export Video (Primary)
                setCursorTarget('export_video');
                await new Promise(r => setTimeout(r, 800));
                // Simulate click effect via separate state if needed, or just visual pause
                await new Promise(r => setTimeout(r, 400));

                // 3. Click Export Draft (Secondary)
                setCursorTarget('export_draft');
                await new Promise(r => setTimeout(r, 800));
                await new Promise(r => setTimeout(r, 400));

                // 4. Reset Pause
                setCursorTarget(null); // Move cursor away
                await new Promise(r => setTimeout(r, 4000));
            }
        };
        sequence();
        return () => { isMounted = false; };
    }, [isActive]);

    // Anime images for the visual
    const images = [
        "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=600&auto=format&fit=crop", // Anime Portrait 1
        "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?q=80&w=600&auto=format&fit=crop", // Cyberpunk Girl
        "https://images.unsplash.com/photo-1569701813229-33284b643e3c?q=80&w=600&auto=format&fit=crop", // Fantasy Character
    ];

    const getCursorPosition = () => {
        if (cursorTarget === 'export_video') return { top: '88%', left: '75%' };
        if (cursorTarget === 'export_draft') return { top: '88%', left: '25%' };
        if (typeof cursorTarget === 'number') return { top: `${15 + (cursorTarget * 13)}%`, left: '75%' };
        return { top: '110%', left: '110%' };
    };

    const cursorPos = getCursorPosition();

    return (
        <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-[800px] h-[480px] bg-[#141414] rounded-xl border border-white/5 flex overflow-hidden shadow-2xl relative">
                
                {/* --- Left: Preview --- */}
                <div className="w-[45%] h-full bg-[#000] border-r border-white/5 relative flex items-center justify-center overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-20">
                         <div className="w-full h-full bg-[linear-gradient(45deg,#1a1a1a_25%,transparent_25%,transparent_75%,#1a1a1a_75%,#1a1a1a),linear-gradient(45deg,#1a1a1a_25%,transparent_25%,transparent_75%,#1a1a1a_75%,#1a1a1a)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-6 w-full px-6">
                        
                        {/* Cover Image + Keyframe Animation + Transitions */}
                        <div className="w-full aspect-video rounded-lg bg-zinc-800 border border-white/10 relative overflow-hidden flex items-center justify-center">
                             {configState.cover === 'auto' ? (
                                <div className="w-full h-full relative overflow-hidden">
                                     <AnimatePresence mode="popLayout">
                                         <motion.img 
                                            key={currentImageIdx} // Triggers transition when index changes
                                            src={images[currentImageIdx]}
                                            className="w-full h-full object-cover absolute inset-0"
                                            initial={configState.trans === 'auto' ? { opacity: 0, scale: 1.1 } : { opacity: 0 }}
                                            animate={{ 
                                                opacity: 1,
                                                // Dynamic Keyframe: Rapid zoom out (1.4 -> 1)
                                                scale: configState.keyframe === 'auto' ? [1, 1.4, 1] : 1
                                            }}
                                            exit={configState.trans === 'auto' ? { opacity: 0 } : undefined}
                                            transition={{
                                                opacity: { duration: 0.5 },
                                                scale: configState.keyframe === 'auto' 
                                                    ? { duration: 3, repeat: Infinity, ease: "easeInOut" } // Faster zoom (3s)
                                                    : { duration: 0.5 }
                                            }}
                                         />
                                     </AnimatePresence>
                                </div>
                             ) : (
                                 <div className="text-zinc-600 text-xs">NO COVER</div>
                             )}
                        </div>

                        {/* Subtitles */}
                        <motion.div 
                            className="w-full bg-zinc-800 rounded px-3 py-2 min-h-[40px] flex items-center justify-center"
                            animate={{ 
                                backgroundColor: configState.subs === 'auto' ? 'rgba(59, 130, 246, 0.2)' : '#27272a',
                                border: configState.subs === 'auto' ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent'
                            }}
                        >
                            <div className="text-xs font-medium text-center text-blue-200">
                                <TypewriterText active={configState.subs === 'auto'} text="这一刻，我终于明白了..." />
                            </div>
                        </motion.div>
                        
                        {/* Music Waveform */}
                        <div className="w-full h-12 flex items-end justify-center gap-1 relative">
                            {/* Floating Notes */}
                            <AnimatePresence>
                                {configState.bgm === 'auto' && (
                                    <>
                                        {[1,2,3].map(n => (
                                            <motion.div
                                                key={n}
                                                initial={{ opacity: 0, y: 10, x: 0 }}
                                                animate={{ 
                                                    opacity: [0, 1, 0], 
                                                    y: -40, 
                                                    x: Math.sin(n) * 20 
                                                }}
                                                transition={{ 
                                                    duration: 2, 
                                                    repeat: Infinity, 
                                                    delay: n * 0.5,
                                                    ease: "easeOut"
                                                }}
                                                className="absolute bottom-full mb-2 left-1/2"
                                            >
                                                <Music size={12} className="text-green-400" />
                                            </motion.div>
                                        ))}
                                    </>
                                )}
                            </AnimatePresence>

                            {/* Bars */}
                            {configState.bgm === 'off' ? (
                                <div className="text-zinc-700 text-[10px]">NO AUDIO</div>
                            ) : (
                                [1,2,3,4,5,6,7,8,7,6,5,4,3,2,1].map((h, idx) => (
                                    <motion.div 
                                        key={idx}
                                        className="w-1.5 bg-zinc-700 rounded-full"
                                        animate={{ 
                                            height: [8, 24 + Math.random() * 16, 8],
                                            backgroundColor: '#22c55e'
                                        }}
                                        transition={{ repeat: Infinity, duration: 0.8, delay: idx * 0.05 }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Right: Settings List --- */}
                <div className="flex-1 p-6 flex flex-col relative">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white font-bold text-lg">视频配置</h3>
                        <div className="text-xs text-gray-500 font-mono">AUTO-CONFIG</div>
                    </div>

                    <div className="space-y-3 relative">
                        {settings.map((setting, idx) => (
                            <div key={setting.id} className="flex items-center justify-between p-2.5 rounded-lg bg-[#1a1a1a] border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-7 h-7 rounded-full ${setting.color} bg-opacity-10 flex items-center justify-center text-gray-300`}>
                                        {setting.icon}
                                    </div>
                                    <span className="text-sm text-gray-300 font-medium">{setting.label}</span>
                                </div>
                                
                                {/* Segmented Control */}
                                <div className="flex bg-black rounded-md p-0.5 gap-0.5">
                                    <div className={`px-2 py-1 rounded text-[9px] transition-colors ${configState[setting.id] === 'off' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}>关闭</div>
                                    <div className={`px-2 py-1 rounded text-[9px] transition-colors ${configState[setting.id] === 'auto' ? 'bg-blue-600 text-white shadow-[0_0_8px_rgba(37,99,235,0.4)]' : 'text-zinc-600'}`}>自动</div>
                                    <div className={`px-2 py-1 rounded text-[9px] transition-colors ${configState[setting.id] === 'manual' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}>手动</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5 flex gap-3">
                         {/* Secondary Button */}
                         <button className={`flex-1 py-3 rounded-lg border border-white/10 flex items-center justify-center gap-2 transition-all duration-300 ${cursorTarget === 'export_draft' ? 'bg-zinc-800 text-white scale-95' : 'bg-transparent text-gray-400 hover:bg-white/5'}`}>
                            <FileJson size={16} />
                            <span className="text-xs font-bold">导出草稿</span>
                        </button>
                        
                        {/* Primary Button */}
                        <button className={`flex-1 py-3 rounded-lg bg-blue-600 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${cursorTarget === 'export_video' ? 'scale-95 bg-blue-500' : 'hover:bg-blue-500'}`}>
                            <Download size={16} className="text-white" />
                            <span className="text-xs font-bold text-white">导出视频</span>
                        </button>
                    </div>

                    {/* Virtual Cursor */}
                    <AnimatePresence>
                        {cursorTarget !== null && (
                            <motion.div 
                                className="absolute pointer-events-none z-50"
                                initial={{ top: '100%', left: '100%', opacity: 0 }}
                                animate={{ 
                                    top: cursorPos.top,
                                    left: cursorPos.left,
                                    opacity: 1 
                                }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                            >
                                <MousePointer2 className="w-6 h-6 text-white fill-black drop-shadow-xl stroke-[1.5px]" />
                                {/* Click Ripple */}
                                <motion.div
                                    key={`click-${cursorTarget}`} 
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 }} // Delay slightly to match arrival
                                    className="absolute -top-3 -left-3 w-12 h-12 bg-white/40 rounded-full"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const VisualRenderer = ({ id, isActive }: { id: number; isActive: boolean }) => {
    switch(id) {
        case 0: return <BatchProductionVisual isActive={isActive} />;
        case 1: return <ConsistencyVisual isActive={isActive} />;
        case 2: return <EditingVisual isActive={isActive} />;
        case 3: return <IntegratedEditingVisual isActive={isActive} />;
        default: return <BatchProductionVisual isActive={isActive} />;
    }
};

// --- Card Component ---

interface CardProps {
    data: typeof advantages[0];
    i: number;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

const Card: React.FC<CardProps> = ({ data, i, progress, range, targetScale }) => {
    const scale = useTransform(progress, range, [1, targetScale]);
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });
    
    return (
        <div ref={ref} className="h-screen w-full flex items-center justify-center sticky top-0">
            <motion.div 
                style={{ 
                    scale,
                    top: `calc(10vh + ${i * 25}px)` 
                }}
                className="relative w-full max-w-[1200px] h-[60vh] md:h-[70vh] rounded-[40px] bg-[#0a0a0a] border border-white/10 overflow-hidden origin-top shadow-2xl flex flex-col md:flex-row"
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${data.bgGradient} opacity-30 pointer-events-none`} />
                
                <div className="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-center relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 ${data.color}`}>
                        {data.icon}
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        {data.title}
                    </h3>
                    
                    <div className={`text-sm md:text-base font-bold tracking-widest uppercase mb-6 ${data.color}`}>
                        {data.subtitle}
                    </div>

                    <p className="text-lg text-gray-400 leading-relaxed font-medium">
                        {data.description}
                    </p>
                </div>

                <div className="w-full md:w-[55%] h-full relative overflow-hidden bg-black/20 border-t md:border-t-0 md:border-l border-white/5">
                    <VisualRenderer id={data.id} isActive={isInView} />
                </div>

            </motion.div>
        </div>
    );
};

// --- Main Section Component ---

const Advantages: React.FC = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={container} className="relative bg-black" id="advantages">
             <div className="pt-24 pb-8 px-6 max-w-[1400px] mx-auto text-center sticky top-0 z-0 h-screen flex flex-col justify-start pointer-events-none">
                 <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4"
                 >
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">一次使用</span>
                     就能感受到的差距
                 </motion.h2>
                 <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-gray-500 font-medium"
                >
                     你与优秀创作者就差一个工具
                 </motion.p>
             </div>

             <div className="mt-[-80vh] pb-[20vh] relative z-10">
                {advantages.map((adv, i) => {
                    const targetScale = 1 - ( (advantages.length - i) * 0.05 );
                    return (
                        <Card 
                            key={i} 
                            i={i} 
                            data={adv}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    )
                })}
             </div>
        </section>
    );
};

export default Advantages;