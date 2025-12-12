import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { FileText, User, Clapperboard, Film, Wand2, Mic, Palette, MousePointer2, Layers, MonitorPlay, Sparkles, ScanFace, Settings2, Play, Image as ImageIcon, RefreshCw, Upload, Copy, Edit3, Volume2, Plus, Trash2, Eye, Headphones, MoreHorizontal, ChevronDown, Music, Type, MoveHorizontal, Sliders, FileJson, Download } from 'lucide-react';

// --- Shared Visual Components ---

const Tooltip = ({ text, icon: Icon, colorClass, x, y, delay = 0, align = 'left' }: { text: string, icon: any, colorClass: string, x: string, y: string, delay?: number, align?: 'left' | 'right' }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ 
            opacity: 1, 
            scale: 1, 
            y: [0, -6, 0] // Floating animation
        }}
        transition={{
            opacity: { duration: 0.5, delay },
            scale: { duration: 0.5, delay },
            y: { 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: delay + 0.5 // Start floating after appearance
            }
        }}
        className={`absolute z-50 pl-2 pr-4 py-2 bg-[#1a1a1a] border border-white/20 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center gap-3 whitespace-nowrap group pointer-events-none ${align === 'right' ? 'flex-row-reverse pr-2 pl-4' : ''}`}
        style={{ left: x, top: y }}
    >
        {/* Icon Box */}
        <div className={`w-8 h-8 rounded-lg ${colorClass} bg-opacity-20 flex items-center justify-center border border-white/5`}>
            <Icon size={14} className={colorClass.replace('bg-', 'text-')} />
        </div>
        {/* Text */}
        <div className="flex flex-col">
            <span className="text-[11px] font-bold text-gray-100">{text}</span>
        </div>
        
        {/* Arrow (Dynamic direction based on position could be added, fixed for now) */}
        <div className={`absolute top-1/2 w-3 h-3 bg-[#1a1a1a] border-l border-b border-white/20 rotate-45 -translate-y-1/2 ${align === 'right' ? '-right-1.5 border-r border-t border-l-0 border-b-0' : '-left-1.5'}`} />
    </motion.div>
);

const HighlightBox = ({ className, children, color = "blue" }: { className?: string, children?: React.ReactNode, color?: string }) => {
    const borderColor = color === "blue" ? "border-blue-400/50" : color === "purple" ? "border-purple-400/50" : "border-green-400/50";
    const shadowColor = color === "blue" ? "shadow-[0_0_20px_rgba(59,130,246,0.3)]" : color === "purple" ? "shadow-[0_0_20px_rgba(168,85,247,0.3)]" : "shadow-[0_0_20px_rgba(34,197,94,0.3)]";
    const dotColor = color === "blue" ? "bg-blue-400 shadow-[0_0_8px_#60a5fa]" : color === "purple" ? "bg-purple-400 shadow-[0_0_8px_#c084fc]" : "bg-green-400 shadow-[0_0_8px_#4ade80]";

    return (
        <div className={`relative ${className}`}>
            {children}
            {/* Stronger Pulse Effect */}
            <div className={`absolute -inset-2 rounded-xl border-2 ${borderColor} ${shadowColor} animate-pulse pointer-events-none`} />
            
            {/* Decorative Corner Dots for Visibility */}
            <div className={`absolute -top-1 -right-1 w-1.5 h-1.5 ${dotColor} rounded-full z-10`} />
            <div className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 ${dotColor} rounded-full z-10`} />
        </div>
    );
};

// --- Types ---
interface Step {
    id: number;
    tagIcon: React.ReactNode;
    tagName: string;
    title: string;
    desc: string;
}

const steps: Step[] = [
    {
        id: 0,
        tagIcon: <FileText size={16} />,
        tagName: "漫画输入",
        title: "小说输入，全面配置",
        desc: "粘贴或上传小说文本，一键设定作品名称、画面比例与声音风格。支持静态漫与动态漫双重模式，满足不同创作节奏与分发需求。"
    },
    {
        id: 1,
        tagIcon: <User size={16} />,
        tagName: "角色预览",
        title: "角色一致可控",
        desc: "系统根据文本提取角色属性并生成候选形象与配音。可查看姓名、外貌特征、情绪谱与声音样例，甚至修改角色生成的提示词；如果不满意还可以自己上传参考"
    },
    {
        id: 2,
        tagIcon: <Clapperboard size={16} />,
        tagName: "分镜绘制",
        title: "分镜，掌控每一帧",
        desc: "系统智能拆分小说为若干分镜，每段包含镜头描述、对白、与场景细节等。用户随时编辑任何信息，生成对应信息的分镜画面或者视频，可重复生成多个然后进行选择，直到满意为止。"
    },
    {
        id: 3,
        tagIcon: <Film size={16} />,
        tagName: "成片导出",
        title: "合成，出片！",
        desc: "系统将已经生成好的分镜场景图片准备好进行合成视频，在合成页可设置封面、转场、关键帧、背景音乐与字幕等导出参数；系统会按你的设置自动合成成片。若需深度二次剪辑，可导出剪映草稿，一键导入第三方剪辑工具"
    }
];

// --- Visual Components ---

const BrowserFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-full h-full bg-[#0f0f0f] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col font-sans relative select-none">
        {/* Browser Header */}
        <div className="h-8 md:h-10 bg-[#1a1a1a] border-b border-white/5 flex items-center px-4 gap-3 shrink-0">
            <div className="flex gap-1.5 opacity-60">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 px-4">
                <div className="w-full max-w-[200px] h-5 md:h-6 bg-black/40 rounded flex items-center justify-center mx-auto text-[10px] text-gray-600 font-mono gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    editor.xiyan.ai
                </div>
            </div>
        </div>
        {/* Content */}
        <div className="flex-1 relative overflow-hidden bg-[#0a0a0a]">
            {children}
        </div>
    </div>
);

// 1. Text Analysis Visual (Manga Input Mockup)
const Step1Visual = () => {
    const [mouseState, setMouseState] = useState<'hidden' | 'entering' | 'hovering'>('hidden');

    // Mouse Animation Sequence
    useEffect(() => {
        const seq = async () => {
            setMouseState('entering');
            await new Promise(r => setTimeout(r, 800)); // Delay entrance slightly
            setMouseState('hovering');
        };
        seq();
    }, []);

    return (
        <BrowserFrame>
            <div className="flex h-full bg-[#0a0a0a] text-gray-400 text-[10px] font-sans">
                
                {/* --- LEFT SIDEBAR (Config) --- */}
                <div className="w-[280px] border-r border-white/5 p-4 flex flex-col gap-5 overflow-visible relative z-10 bg-[#0a0a0a]">
                    
                    {/* Title Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs text-gray-500">漫画名称 <span className="text-red-500">*</span></label>
                        <div className="w-full h-8 bg-[#141414] rounded border border-white/10 flex items-center px-3 text-gray-500">
                            给你的创作取一个标题吧
                        </div>
                    </div>

                    {/* Generation Type (All Active) */}
                    <HighlightBox className="space-y-1.5 relative">
                         <label className="text-xs text-gray-500">生成类型 <span className="text-red-500">*</span></label>
                         <div className="grid grid-cols-2 gap-2">
                             <div className="h-10 rounded bg-[#141414] border border-white/10 flex flex-col items-center justify-center gap-0.5 opacity-50">
                                 <ImageIcon size={10} />
                                 <span>图片漫画</span>
                             </div>
                             <div className="h-10 rounded bg-blue-500/10 border border-blue-500/50 text-blue-400 flex flex-col items-center justify-center gap-0.5 relative">
                                 <Film size={10} />
                                 <span>动态漫画</span>
                                 <div className="absolute top-1 right-1 w-1 h-1 bg-blue-500 rounded-full" />
                             </div>
                         </div>
                         <Tooltip 
                            text="静态PPT漫、动态漫多类可选" 
                            icon={Layers}
                            colorClass="bg-purple-500"
                            x="105%" y="10%" 
                            delay={0.2}
                        />
                    </HighlightBox>

                    {/* Voice Selection (All Active) */}
                    <HighlightBox className="space-y-1.5 relative">
                        <label className="text-xs text-gray-500">旁白配音 <span className="text-red-500">*</span></label>
                        <div className="w-full h-12 bg-[#141414] rounded border border-white/10 flex items-center justify-center flex-col gap-1 cursor-pointer">
                            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                                <Mic size={10} />
                            </div>
                            <span>点击添加旁白音色</span>
                        </div>
                        <Tooltip 
                            text="多情感、多语种 AI 配音库" 
                            icon={Mic}
                            colorClass="bg-green-500"
                            x="105%" y="20%"
                            delay={0.4}
                        />
                    </HighlightBox>

                    {/* Aspect Ratio (All Active) */}
                    <HighlightBox className="space-y-1.5 relative">
                        <label className="text-xs text-gray-500">画面比例 <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-6 gap-1">
                            {['1:1', '3:2', '2:3', '4:3', '3:4', '16:9'].map((r, i) => (
                                <div key={r} className={`aspect-square rounded border flex flex-col items-center justify-center gap-0.5 ${i === 5 ? 'bg-blue-500/20 border-blue-500 text-white' : 'border-white/10 bg-[#141414] text-gray-600'}`}>
                                    <div className={`border border-current opacity-50 ${i === 5 ? 'w-3 h-1.5' : 'w-2 h-2'}`} />
                                </div>
                            ))}
                        </div>
                         <Tooltip 
                            text="支持横屏 / 竖屏 / 电影宽幅" 
                            icon={MonitorPlay}
                            colorClass="bg-orange-500"
                            x="105%" y="15%"
                            delay={0.6}
                        />
                    </HighlightBox>

                    {/* Style Selection (All Active) */}
                    <HighlightBox className="space-y-1.5 flex-1 relative">
                        <label className="text-xs text-gray-500">风格选择 <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-3 gap-2">
                             {[
                                 "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=100&auto=format&fit=crop",
                                 "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=100&auto=format&fit=crop",
                                 "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=100&auto=format&fit=crop"
                             ].map((src, i) => (
                                 <div key={i} className={`aspect-[3/4] rounded overflow-hidden border relative ${i===1 ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-white/10'}`}>
                                     <img src={src} className="w-full h-full object-cover" alt="" />
                                     {i===1 && <div className="absolute inset-0 bg-blue-500/20" />}
                                 </div>
                             ))}
                        </div>
                        <Tooltip 
                            text="20+ 主流漫画风格模型" 
                            icon={Palette}
                            colorClass="bg-pink-500"
                            x="105%" y="30%" 
                            delay={0.8}
                        />
                    </HighlightBox>
                </div>

                {/* --- RIGHT CONTENT (Editor) --- */}
                <div className="flex-1 flex flex-col bg-[#0f0f0f] relative">
                    
                    {/* Header Tabs */}
                    <div className="h-10 border-b border-white/5 flex items-end px-4 gap-1">
                        <div className="px-4 py-2 bg-[#1a1a1a] rounded-t-lg text-white border-t border-x border-white/10 text-xs font-bold relative">
                            第一集
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500 rounded-full" />
                        </div>
                        <div className="px-4 py-2 text-gray-600 text-xs hover:bg-white/5 rounded-t-lg cursor-pointer">第二集</div>
                        <div className="ml-auto p-1.5 hover:bg-white/5 rounded text-gray-500"><Settings2 size={12} /></div>
                    </div>

                    {/* Novel Content Area (Abstract) */}
                    <div className="flex-1 p-6 space-y-4 overflow-hidden relative">
                        {/* Title Line */}
                        <div className="w-1/3 h-4 bg-white/10 rounded" />
                        
                        {/* Paragraphs */}
                        <div className="space-y-2 opacity-60">
                            <div className="w-full h-2 bg-white/5 rounded" />
                            <div className="w-[95%] h-2 bg-white/5 rounded" />
                            <div className="w-[90%] h-2 bg-white/5 rounded" />
                            <div className="w-[80%] h-2 bg-white/5 rounded" />
                        </div>

                        <div className="space-y-2 opacity-60 pt-4">
                            <div className="w-[98%] h-2 bg-white/5 rounded" />
                            <div className="w-full h-2 bg-white/5 rounded" />
                            <div className="w-[85%] h-2 bg-white/5 rounded" />
                        </div>

                        {/* Floating Action within Text */}
                        <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 flex items-center gap-1.5 w-fit">
                             <Sparkles size={10} />
                             <span>AI 爆款润色</span>
                        </div>
                        
                         <div className="absolute bottom-6 right-6 text-gray-600">
                             0/50000 字
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="h-14 border-t border-white/10 bg-[#141414] px-6 flex items-center justify-between relative z-20">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-4 bg-white/10 rounded-full relative cursor-pointer">
                                <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white/50 rounded-full" />
                            </div>
                            <span className="text-gray-500">角色信息预览</span>
                        </div>

                        {/* GENERATE BUTTON + POPUP MENU */}
                        <div className="relative">
                            
                            {/* The Menu (Persistent when hovering) */}
                            <AnimatePresence>
                                {mouseState === 'hovering' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute bottom-[130%] right-0 w-40 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl p-1.5 flex flex-col gap-1 overflow-hidden z-30"
                                    >
                                        <div className="px-3 py-2 hover:bg-white/5 rounded flex items-center gap-2 cursor-pointer group">
                                            <User size={12} className="text-blue-400" />
                                            <span className="text-gray-300 group-hover:text-white">生成角色</span>
                                        </div>
                                        <div className="px-3 py-2 hover:bg-white/5 rounded flex items-center gap-2 cursor-pointer group">
                                            <Clapperboard size={12} className="text-purple-400" />
                                            <span className="text-gray-300 group-hover:text-white">生成分镜</span>
                                        </div>
                                        <div className="h-[1px] bg-white/5 my-0.5" />
                                        <div className="px-3 py-2 bg-blue-600 rounded flex items-center gap-2 cursor-pointer hover:bg-blue-500 transition-colors">
                                            <Wand2 size={12} className="text-white" />
                                            <span className="text-white font-bold">直接成片</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* The Main Button */}
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center gap-2 relative z-20"
                            >
                                <Sparkles size={14} className={mouseState === 'hovering' ? "animate-spin" : ""} />
                                立即生成
                            </motion.button>
                            
                            {/* Simulated Cursor */}
                            <motion.div
                                animate={mouseState === 'hovering' 
                                    ? { opacity: 1, x: 20, y: 20 } 
                                    : { opacity: 0, x: 100, y: 100 }
                                }
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="absolute top-1/2 left-1/2 ml-0 mt-0 pointer-events-none z-50"
                            >
                                <MousePointer2 className="w-8 h-8 text-white fill-black drop-shadow-xl" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </BrowserFrame>
    );
};

// 2. Character Definition Visual
const Step2Visual = () => {
    return (
        <BrowserFrame>
            <div className="w-full h-full flex bg-[#0a0a0a] font-sans">
                
                {/* --- LEFT SIDEBAR (Attributes) --- */}
                <div className="w-[280px] bg-[#0f0f0f] border-r border-white/5 flex flex-col p-4 gap-4 relative z-10">
                    
                    {/* Header: Name & Voice */}
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            孙
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-bold text-sm">孙悟空</h3>
                                <div className="flex gap-1.5">
                                    <div className="p-1 hover:bg-white/10 rounded text-gray-400 cursor-pointer"><Edit3 size={12} /></div>
                                    <div className="p-1 hover:bg-white/10 rounded text-red-400 cursor-pointer opacity-60">✕</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500 bg-[#161616] px-2 py-1 rounded w-fit cursor-pointer hover:text-gray-300">
                                <Volume2 size={10} />
                                <span>影视解说小帅</span>
                                <Play size={8} className="fill-current ml-1" />
                            </div>
                        </div>
                    </div>

                    {/* Attributes Grid */}
                    <HighlightBox color="blue" className="relative">
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="bg-[#141414] border border-white/5 rounded p-2">
                                <span className="text-[10px] text-gray-500 block mb-0.5">性别</span>
                                <span className="text-xs text-white">男</span>
                            </div>
                             <div className="bg-[#141414] border border-white/5 rounded p-2">
                                <span className="text-[10px] text-gray-500 block mb-0.5">年龄</span>
                                <span className="text-xs text-white">18</span>
                            </div>
                        </div>
                        <div className="bg-[#141414] border border-white/5 rounded p-3 space-y-2">
                            <span className="text-[10px] text-gray-500 block">核心特征</span>
                            <p className="text-[10px] text-gray-300 leading-relaxed">
                                气质从温婉转为<span className="text-blue-400">清冷果决</span>，右手无名指有长期戴戒痕迹；曾因熬夜工作有轻微黑眼圈。
                            </p>
                        </div>
                         <div className="bg-[#141414] border border-white/5 rounded p-2 mt-2">
                            <span className="text-[10px] text-gray-500 block mb-0.5">发型</span>
                            <span className="text-xs text-white">无</span>
                        </div>
                         <Tooltip 
                            text="AI 自动提取小说角色特征" 
                            icon={ScanFace}
                            colorClass="bg-blue-500"
                            x="95%" y="10%" 
                            delay={0.2}
                        />
                    </HighlightBox>

                    {/* Prompt Editor */}
                    <HighlightBox color="purple" className="flex-1 flex flex-col mt-auto pt-2 relative">
                        <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] text-gray-500">生图提示词</span>
                             <div className="text-[10px] text-blue-400 flex items-center gap-1 cursor-pointer"><Copy size={10} /> 复制</div>
                        </div>
                        <div className="flex-1 bg-[#141414] border border-white/5 rounded-lg p-3 text-[10px] text-gray-400 leading-relaxed overflow-hidden relative">
                             28岁东亚女性，身高165cm，体重50kg，及肩微卷黑发，鹅蛋脸，杏眼坚定...
                             <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#141414] to-transparent" />
                        </div>
                         <Tooltip 
                            text="重构自定义提示词" 
                            icon={Edit3}
                            colorClass="bg-purple-500"
                            x="105%" y="50%" 
                            delay={0.6}
                        />
                    </HighlightBox>
                </div>

                {/* --- RIGHT CONTENT (Gallery) --- */}
                <div className="flex-1 p-6 flex flex-col gap-6 bg-[#0a0a0a]">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center h-8">
                         <div className="flex items-center gap-2">
                             <ImageIcon size={16} className="text-white" />
                             <span className="text-sm font-bold text-white">角色形象</span>
                         </div>
                         <div className="flex gap-2">
                             <HighlightBox color="green" className="flex">
                                 <button className="px-3 py-1.5 rounded bg-[#1a1a1a] border border-white/10 text-[10px] text-gray-300 flex items-center gap-1.5 hover:bg-white/5 transition-colors">
                                     <Upload size={10} /> 上传图片
                                 </button>
                                 <button className="px-3 py-1.5 rounded bg-[#1a1a1a] border border-white/10 text-[10px] text-gray-300 flex items-center gap-1.5 ml-2 hover:bg-white/5 transition-colors">
                                     <Settings2 size={10} /> 自定义生图
                                 </button>
                                  <Tooltip 
                                    text="支持垫图 / 自定义修改" 
                                    icon={Settings2}
                                    colorClass="bg-green-500"
                                    x="-10%" y="120%" 
                                    delay={0.8}
                                />
                             </HighlightBox>
                         </div>
                    </div>

                    {/* Character Grid */}
                    <HighlightBox color="purple" className="relative">
                        <div className="grid grid-cols-5 gap-3">
                            {/* Create New */}
                            <div className="aspect-[3/4] rounded-lg border border-dashed border-blue-500/30 bg-blue-500/5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-500/10 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Sparkles size={14} />
                                </div>
                                <span className="text-[10px] text-blue-400 font-medium">生成新图片</span>
                            </div>

                            {/* Generated Images */}
                            {[
                                "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=300&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=300&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?q=80&w=300&auto=format&fit=crop"
                            ].map((src, i) => (
                                <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20">
                                    <img src={src} className="w-full h-full object-cover" alt="" />
                                    {/* Hover Action */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                        <div className="px-2 py-1 rounded bg-white/10 backdrop-blur border border-white/10 text-[9px] text-white flex items-center gap-1">
                                            <MonitorPlay size={10} /> 生成视频
                                        </div>
                                    </div>
                                    {/* Selection Indicator */}
                                    {i === 1 && (
                                        <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                         <Tooltip 
                            text="批量生成候选形象" 
                            icon={ImageIcon}
                            colorClass="bg-purple-500"
                            x="50%" y="105%" 
                            delay={0.4}
                        />
                    </HighlightBox>

                    {/* Video Section */}
                    <div className="flex-1 flex flex-col gap-3 min-h-0">
                         <div className="flex items-center gap-2">
                             <MonitorPlay size={16} className="text-white" />
                             <span className="text-sm font-bold text-white">角色动态视频</span>
                         </div>
                         
                         <HighlightBox color="blue" className="flex-1 w-fit relative">
                            <div className="h-full aspect-video bg-black rounded-lg border border-white/10 relative overflow-hidden group">
                                <img src="https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="" />
                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/20 flex items-center justify-center shadow-lg">
                                        <Play size={16} className="fill-white text-white ml-0.5" />
                                    </div>
                                </div>
                                {/* Badge */}
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-600/90 text-[10px] text-white rounded font-bold">
                                    已启用
                                </div>
                            </div>
                             <Tooltip 
                                text="一键生成动态视频" 
                                icon={Film}
                                colorClass="bg-blue-500"
                                x="105%" y="40%" 
                                delay={0.6}
                            />
                         </HighlightBox>
                    </div>

                </div>
            </div>
        </BrowserFrame>
    );
};

// 3. Storyboard Visual
const Step3Visual = () => {
    return (
        <BrowserFrame>
             <div className="w-full h-full flex bg-[#0a0a0a] font-sans">
                 
                 {/* --- LEFT SIDEBAR (Script & Storyboard) --- */}
                 <div className="w-[38%] bg-[#0f0f0f] border-r border-white/5 flex flex-col z-30 relative shadow-xl">
                     {/* Header */}
                     <div className="h-10 flex items-center justify-between px-4 border-b border-white/5 bg-[#141414]">
                         <div className="flex items-center gap-2">
                             <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-mono">SCENE 01</span>
                             <span className="text-xs font-bold text-white">酒店惊魂</span>
                         </div>
                         <MoreHorizontal size={14} className="text-gray-500 cursor-pointer" />
                     </div>
                     
                     {/* Character Avatars Row */}
                     <div className="px-4 py-3 border-b border-white/5 bg-[#0f0f0f]">
                         <div className="flex gap-2">
                             {[1,2].map(i => (
                                 <div key={i} className="flex items-center gap-1.5 bg-[#1a1a1a] rounded-full pr-2 border border-white/5">
                                     <div className="w-5 h-5 rounded-full bg-gray-700 overflow-hidden">
                                          <img src={`https://images.unsplash.com/photo-${i === 1 ? '1615592389070-bcc97e05ad01' : '1534528741775-53994a69daeb'}?w=50&h=50&fit=crop`} className="w-full h-full object-cover" alt="" />
                                     </div>
                                     <span className="text-[9px] text-gray-300">林薇</span>
                                 </div>
                             ))}
                         </div>
                     </div>

                     {/* Script List */}
                     <div className="flex-1 relative p-3 flex flex-col gap-3">
                         
                         {/* Card 1 (Active) */}
                         <HighlightBox color="blue" className="bg-[#141414] rounded-lg border border-blue-500/50 p-0 flex flex-col gap-0 relative overflow-visible group">
                             {/* Card Header */}
                             <div className="flex justify-between items-center p-2 border-b border-white/5 bg-[#1a1a1a] rounded-t-lg">
                                 <div className="px-1.5 py-0.5 bg-blue-500 text-white rounded text-[9px] font-bold">分镜 1</div>
                                 <div className="flex gap-2">
                                     <Trash2 size={12} className="text-gray-500 hover:text-red-400 cursor-pointer" />
                                 </div>
                             </div>
                             
                             <div className="p-2 space-y-2">
                                 {/* Audio Block */}
                                 <div className="bg-[#0a0a0a] rounded border border-white/5 p-2 flex gap-2 items-start relative">
                                     <div className="w-4 h-4 rounded bg-gray-800 flex items-center justify-center shrink-0 mt-0.5"><Mic size={10} className="text-gray-400" /></div>
                                     <div className="flex-1">
                                         <p className="text-[10px] text-gray-300 leading-snug mb-1">
                                             <span className="text-blue-400 font-bold mr-1">旁白:</span>
                                             远离工作和烦心事，她在酒店睡了个好觉。
                                         </p>
                                         <div className="flex gap-1">
                                             <span className="text-[8px] px-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/20">情绪：舒缓</span>
                                             <span className="text-[8px] px-1 rounded bg-gray-700 text-gray-400 border border-white/5 flex items-center gap-1"><Volume2 size={8} /> 试听</span>
                                         </div>
                                     </div>
                                 </div>

                                 {/* Visual Block */}
                                 <div className="bg-[#0a0a0a] rounded border border-white/5 p-2 flex gap-2 items-start relative">
                                     <div className="w-4 h-4 rounded bg-gray-800 flex items-center justify-center shrink-0 mt-0.5"><Eye size={10} className="text-gray-400" /></div>
                                     <div className="flex-1">
                                         <p className="text-[10px] text-gray-300 leading-snug mb-1">
                                             沈梦云躺在床上熟睡，月光透过窗帘缝隙洒在脸上。
                                         </p>
                                         <div className="flex gap-1">
                                             <span className="text-[8px] px-1 rounded bg-orange-500/20 text-orange-300 border border-orange-500/20">运镜：推镜头</span>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             
                             <Tooltip 
                                text="即时查看/调整对白和场景描述" 
                                icon={Edit3}
                                colorClass="bg-purple-500"
                                x="105%" y="40%" 
                                delay={0.2}
                            />
                         </HighlightBox>

                         {/* Insert Button */}
                         <div className="flex justify-center my-1 relative group/btn">
                             <div className="px-3 py-1 bg-[#1a1a1a] border border-blue-500/30 rounded-full flex items-center gap-1 text-[10px] text-blue-400 font-bold hover:bg-blue-500 hover:text-white transition-all cursor-pointer">
                                 <Plus size={10} /> 插入分镜
                             </div>
                         </div>

                         {/* Card 2 (Inactive) */}
                         <div className="bg-[#141414] rounded-lg border border-white/5 p-0 flex flex-col gap-0 opacity-50 grayscale">
                             <div className="flex justify-between items-center p-2 border-b border-white/5 bg-[#1a1a1a]">
                                 <div className="px-1.5 py-0.5 bg-gray-700 text-gray-300 rounded text-[9px] font-bold">分镜 2</div>
                             </div>
                             <div className="p-2 space-y-2">
                                  <div className="bg-[#0a0a0a] rounded border border-white/5 p-2 flex gap-2">
                                     <Mic size={10} className="text-gray-500" />
                                     <div className="h-2 w-20 bg-white/10 rounded" />
                                  </div>
                                  <div className="bg-[#0a0a0a] rounded border border-white/5 p-2 flex gap-2">
                                     <Eye size={10} className="text-gray-500" />
                                     <div className="h-2 w-24 bg-white/10 rounded" />
                                  </div>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* --- RIGHT CONTENT (Visual Generation) --- */}
                 <div className="flex-1 bg-[#0a0a0a] flex flex-col p-4 gap-4 z-10 relative">
                     
                     {/* Section 1: Scene Images */}
                     <div className="flex-1 flex flex-col gap-3 min-h-0">
                         <div className="flex justify-between items-center h-6 shrink-0">
                             <div className="flex items-center gap-2">
                                 <ImageIcon size={14} className="text-white" />
                                 <span className="text-xs font-bold text-white">场景分镜</span>
                             </div>
                             <HighlightBox color="green" className="flex gap-2">
                                <button className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] text-gray-300 hover:bg-white/10 flex items-center gap-1">
                                     <Upload size={10} /> 上传参考图
                                </button>
                                <button className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] text-gray-300 hover:bg-white/10 flex items-center gap-1">
                                     <Settings2 size={10} /> 自定义生图
                                </button>
                                <Tooltip 
                                    text="支持垫图/自定义修改" 
                                    icon={Upload}
                                    colorClass="bg-green-500"
                                    x="-80%" y="130%" 
                                    delay={0.8}
                                />
                             </HighlightBox>
                         </div>

                         <HighlightBox color="blue" className="flex-1 overflow-hidden relative">
                             <div className="grid grid-cols-3 gap-3 h-full">
                                 {/* New Gen */}
                                 <div className="aspect-[9/16] rounded-lg border border-dashed border-blue-500/30 bg-blue-500/5 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-blue-500/10 transition-colors">
                                     <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><RefreshCw size={14} /></div>
                                     <span className="text-[9px] text-blue-400 font-bold text-center px-2">重新生成</span>
                                 </div>
                                 {/* Results (9:16) */}
                                 {[
                                     "https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=400&auto=format&fit=crop", // Woman sleeping/bed
                                     "https://images.unsplash.com/photo-1500320821405-8fc1732209ca?q=80&w=400&auto=format&fit=crop"  // Window light
                                 ].map((src, i) => (
                                     <div key={i} className="relative aspect-[9/16] rounded-lg overflow-hidden group border border-white/5 hover:border-blue-500 transition-colors">
                                         <img src={src} className="w-full h-full object-cover" alt="" />
                                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end pb-3 gap-1">
                                             <div className="px-2 py-1 bg-blue-600 rounded text-[9px] text-white flex items-center gap-1 cursor-pointer hover:bg-blue-500 shadow-lg">
                                                 <MonitorPlay size={10} /> 生成视频
                                             </div>
                                         </div>
                                         {i === 0 && <div className="absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full border border-white shadow-sm" />}
                                     </div>
                                 ))}
                             </div>
                             <Tooltip 
                                text="多次重复生成选择最满意为止" 
                                icon={RefreshCw}
                                colorClass="bg-blue-500"
                                x="50%" y="105%" 
                                delay={0.6}
                            />
                         </HighlightBox>
                     </div>

                     {/* Section 2: Character Video */}
                     <div className="h-[120px] flex flex-col gap-2 shrink-0">
                         <div className="flex items-center gap-2">
                             <MonitorPlay size={14} className="text-white" />
                             <span className="text-xs font-bold text-white">动态预览</span>
                         </div>
                         <div className="flex gap-3 h-full">
                             <div className="aspect-video h-full bg-black rounded-lg border border-blue-500/50 relative overflow-hidden group shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                 <img src="https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=600&fit=crop" className="w-full h-full object-cover opacity-80" alt="" />
                                 <div className="absolute inset-0 flex items-center justify-center">
                                     <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"><Play size={12} className="text-white fill-white ml-0.5" /></div>
                                 </div>
                                 <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur rounded flex items-center gap-1 border border-white/10">
                                     <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                     <span className="text-[8px] text-gray-300">源于选中图</span>
                                 </div>
                             </div>
                         </div>
                     </div>

                 </div>

             </div>
        </BrowserFrame>
    );
};

// 4. Advanced Synthesis Config Visual
const Step4Visual = () => {
    // --- Sub-components for Setting Sections ---
    const SettingSection = ({ title, icon: Icon, children, color = "blue", toggled = true, isActive = false }: any) => {
        // Explicit styles for color variants to avoid purging and ensure dynamic class construction works safely.
        const borderStyle = isActive 
            ? color === 'blue' ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/20'
            : color === 'purple' ? 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-500/20'
            : color === 'green' ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] ring-1 ring-green-500/20'
            : color === 'orange' ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/20'
            : 'border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] ring-1 ring-pink-500/20'
            : 'border-white/5 hover:border-white/20';

        return (
            <div className={`bg-[#141414] border rounded-xl p-3 md:p-4 space-y-3 relative group transition-all duration-300 ${borderStyle}`}>
                <div className="flex items-center gap-2 mb-1">
                    <div className={`p-1.5 rounded-lg bg-${color}-500/10 text-${color}-400`}>
                        <Icon size={14} />
                    </div>
                    <span className="text-sm font-bold text-gray-200">{title}</span>
                    <div className="ml-auto flex bg-black rounded p-0.5 border border-white/10">
                        <div className={`px-2 py-0.5 text-[9px] rounded transition-colors ${!toggled ? 'bg-white/10 text-white' : 'text-gray-500'}`}>关闭</div>
                        <div className={`px-2 py-0.5 text-[9px] rounded transition-colors ${toggled ? `bg-${color === 'white' ? 'gray' : color}-600 text-white shadow-sm` : 'text-gray-500'}`}>自动</div>
                        <div className="px-2 py-0.5 text-[9px] text-gray-500">手动</div>
                    </div>
                </div>
                {children}
                {isActive && (
                    <div className={`absolute -inset-[2px] rounded-xl border-2 border-${color}-500/30 animate-pulse pointer-events-none`} />
                )}
            </div>
        );
    };

    // --- Animation Sequence Logic ---
    const [cursorState, setCursorState] = useState<'hidden' | 'cover' | 'trans' | 'keyframe' | 'bgm' | 'subs' | 'export_draft'>('hidden');

    useEffect(() => {
        const loop = async () => {
            while (true) {
                setCursorState('hidden');
                await new Promise(r => setTimeout(r, 1000));
                
                // 1. Cover
                setCursorState('cover');
                await new Promise(r => setTimeout(r, 1500));

                // 2. Transitions
                setCursorState('trans');
                await new Promise(r => setTimeout(r, 1500));
                
                // 3. Keyframes
                setCursorState('keyframe');
                await new Promise(r => setTimeout(r, 1500));

                // 4. BGM
                setCursorState('bgm');
                await new Promise(r => setTimeout(r, 1500));
                
                // 5. Subtitles
                setCursorState('subs');
                await new Promise(r => setTimeout(r, 1500));
                
                // 6. Export Draft
                setCursorState('export_draft');
                await new Promise(r => setTimeout(r, 2000));
            }
        };
        loop();
    }, []);

    const scrollY = {
        hidden: 0,
        cover: 0,
        trans: -50,
        keyframe: -180,
        bgm: -300,
        subs: -420,
        export_draft: -480
    };

    // Adjusted cursor positions relative to the moving viewport to simulate tracking
    const cursorPositions = {
        hidden: { top: '120%', left: '50%' },
        cover: { top: '15%', left: '85%' }, // Near Toggle
        trans: { top: '40%', left: '40%' }, // On Fade transition
        keyframe: { top: '45%', left: '70%' }, // On Sliders
        bgm: { top: '40%', left: '80%' }, // On Audio bar
        subs: { top: '45%', left: '50%' }, // On Style
        export_draft: { top: '92%', left: '62%' } // On Draft Button
    };

    const currentCursor = cursorPositions[cursorState];

    return (
        <BrowserFrame>
            <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden font-sans flex flex-col">
                {/* Fixed Header */}
                <div className="h-10 border-b border-white/5 bg-[#141414] flex items-center justify-between px-4 z-20 shrink-0">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Settings2 size={12} className="text-gray-400"/> 高级合成配置
                    </span>
                    <div className="flex gap-2">
                         <div className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] rounded border border-blue-500/20">Auto-Save</div>
                    </div>
                </div>

                {/* Scrollable Settings Content */}
                <div className="flex-1 relative overflow-hidden">
                    <motion.div 
                        className="w-full p-4 space-y-4 absolute top-0 left-0"
                        animate={{ y: scrollY[cursorState] }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        {/* 1. Video Cover */}
                        <SettingSection title="视频封面" icon={ImageIcon} color="purple" isActive={cursorState === 'cover'}>
                             <div className="flex gap-4">
                                 <div className="w-24 aspect-[9/16] bg-zinc-800 rounded-md border border-white/5 relative overflow-hidden">
                                     <img src="https://images.unsplash.com/photo-1612151855475-877969f4a6cc?w=200" className="w-full h-full object-cover opacity-80" alt="Cover" />
                                     <div className="absolute bottom-0 w-full bg-black/60 text-[8px] text-center text-white py-0.5">自动生成</div>
                                 </div>
                                 <div className="flex-1 space-y-2 py-1">
                                     <div className="h-2 w-2/3 bg-white/10 rounded" />
                                     <div className="h-2 w-1/2 bg-white/10 rounded" />
                                     <div className="mt-2 text-[10px] text-gray-500">系统自动选取高光帧作为封面，支持上传自定义封面图片。</div>
                                 </div>
                             </div>
                             {cursorState === 'cover' && (
                                <Tooltip text="自动生成精美封面" icon={Sparkles} colorClass="bg-purple-500" x="60%" y="40%" delay={0.1} />
                             )}
                        </SettingSection>

                        {/* 2. Transitions */}
                        <SettingSection title="转场动画" icon={MoveHorizontal} color="blue" isActive={cursorState === 'trans'}>
                             <div className="flex items-center gap-3">
                                 <span className="text-[10px] text-gray-500">应用模式:</span>
                                 <div className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">随机智能匹配</div>
                             </div>
                             <div className="grid grid-cols-4 gap-2 mt-2">
                                 {['叠化', '推拉', '运镜', '故障'].map((t, i) => (
                                     <div key={t} className={`h-12 rounded bg-black border ${i===1 ? 'border-blue-500 bg-blue-500/5' : 'border-white/5'} flex flex-col items-center justify-center gap-1`}>
                                         <div className={`w-4 h-4 rounded-full ${i===1 ? 'bg-blue-500' : 'bg-zinc-800'}`} />
                                         <span className="text-[9px] text-gray-500">{t}</span>
                                     </div>
                                 ))}
                             </div>
                             {cursorState === 'trans' && (
                                <Tooltip text="批量应用转场特效" icon={Wand2} colorClass="bg-blue-500" x="40%" y="50%" delay={0.1} />
                             )}
                        </SettingSection>

                        {/* 3. Keyframes */}
                        <SettingSection title="关键帧" icon={ScanFace} color="pink" isActive={cursorState === 'keyframe'}>
                            <div className="flex gap-4">
                                <div className="w-32 aspect-video bg-zinc-800 rounded border border-white/5 relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1560972550-aba3456b5564?w=300" className="w-full h-full object-cover opacity-60" alt="" />
                                    {/* Abstract Rects */}
                                    <div className="absolute top-2 left-2 w-20 h-12 border border-blue-500/50 rounded-sm" />
                                    <div className="absolute bottom-2 right-2 w-24 h-14 border border-green-500/50 rounded-sm" />
                                </div>
                                <div className="flex-1 space-y-3 pt-1">
                                    {['缩放 Scale', '位移 X', '位移 Y'].map(label => (
                                        <div key={label} className="space-y-1">
                                            <div className="flex justify-between text-[9px] text-gray-500">
                                                <span>{label}</span>
                                                <span>120%</span>
                                            </div>
                                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full w-2/3 bg-pink-500 rounded-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {cursorState === 'keyframe' && (
                                <Tooltip text="关键帧位置大小随意编排" icon={ScanFace} colorClass="bg-pink-500" x="50%" y="20%" delay={0.1} />
                             )}
                        </SettingSection>
                        
                        {/* 4. Background Music (Full Width) */}
                        <SettingSection title="背景音乐" icon={Music} color="green" isActive={cursorState === 'bgm'}>
                            <div className="space-y-3">
                                <div className="h-10 bg-black rounded border border-white/5 flex items-center px-3 gap-3">
                                    <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center"><Play size={10} className="fill-green-500 text-green-500"/></div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <div className="h-1.5 w-24 bg-white/10 rounded" />
                                        <div className="h-1.5 w-16 bg-white/5 rounded" />
                                    </div>
                                    <div className="text-[10px] text-gray-500">03:45</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Volume2 size={12} className="text-gray-500" />
                                    <div className="h-1.5 flex-1 bg-white/10 rounded-full relative group cursor-pointer">
                                        <div className="w-3/4 h-full bg-green-500 rounded-full" />
                                        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-[9px] text-gray-400">80%</span>
                                </div>
                            </div>
                            {cursorState === 'bgm' && (
                                <Tooltip text="添加喜欢的背景音乐" icon={Music} colorClass="bg-green-500" x="60%" y="30%" delay={0.1} />
                            )}
                        </SettingSection>
                        
                        {/* 5. Subtitles (Full Width) */}
                        <SettingSection title="字幕" icon={Type} color="orange" isActive={cursorState === 'subs'}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="w-full h-16 bg-black rounded flex items-center justify-center border border-white/5 relative overflow-hidden group">
                                    <img src="https://images.unsplash.com/photo-1515462277126-2dd0c162007a?w=200" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
                                    <span className="relative z-10 text-[10px] text-white font-bold drop-shadow-md px-2 py-1 bg-black/40 rounded backdrop-blur-sm border border-white/10">预设字幕预览效果</span>
                                </div>
                                <div className="flex flex-col justify-center gap-2">
                                     <div className="flex gap-2">
                                        <span className="text-[9px] text-gray-500">字体</span>
                                        <div className="flex-1 h-4 bg-white/10 rounded" />
                                     </div>
                                     <div className="flex gap-2">
                                        <span className="text-[9px] text-gray-500">样式</span>
                                        <div className="flex gap-1.5">
                                            {[1,2,3,4].map(i => <div key={i} className={`h-4 w-4 rounded-full border border-white/10 ${i===1 ? 'bg-orange-500 ring-2 ring-orange-500/30' : 'bg-white/5 hover:bg-white/10'}`} />)}
                                        </div>
                                     </div>
                                </div>
                            </div>
                            {cursorState === 'subs' && (
                                <Tooltip text="调整预览全局解说字幕样式" icon={Type} colorClass="bg-orange-500" x="20%" y="-30%" delay={0.1} />
                            )}
                        </SettingSection>
                        
                        {/* Spacer for scroll */}
                        <div className="h-20" />
                    </motion.div>
                </div>

                {/* Fixed Bottom Bar (Export) */}
                <div className="h-16 bg-[#141414] border-t border-white/5 shrink-0 flex items-center px-6 gap-3 z-20 relative">
                     <div className="flex-1">
                         <div className="text-[10px] text-gray-500">预计生成时间</div>
                         <div className="text-xs font-bold text-gray-300">~ 2 分钟</div>
                     </div>
                     
                     {/* Export Draft Button */}
                     <motion.button 
                        animate={cursorState === 'export_draft' ? { scale: 0.95 } : { scale: 1 }}
                        className="h-9 px-4 rounded-lg bg-zinc-800 border border-white/10 text-white text-xs font-bold flex items-center gap-2 hover:bg-zinc-700 transition-colors"
                    >
                         <FileJson size={14} className="text-gray-400" />
                         导出剪映草稿
                     </motion.button>
                     
                     {/* Export Video Button */}
                     <button className="h-9 px-4 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20">
                         <Download size={14} />
                         导出视频
                     </button>

                     {/* Tooltip for Export */}
                     {cursorState === 'export_draft' && (
                        <Tooltip text="无缝衔接剪映深度二创" icon={FileJson} colorClass="bg-zinc-700" x="45%" y="-120%" delay={0.1} />
                     )}
                </div>

                {/* Animated Cursor */}
                <motion.div
                    className="absolute z-50 pointer-events-none"
                    animate={{ 
                        top: currentCursor?.top || '120%', 
                        left: currentCursor?.left || '50%',
                        opacity: cursorState === 'hidden' ? 0 : 1
                    }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                >
                    <MousePointer2 className="w-8 h-8 text-white fill-black drop-shadow-2xl stroke-[1.5px]" />
                    {(cursorState !== 'hidden' && cursorState !== 'cover') && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.4, repeat: 1 }}
                            className="absolute -top-3 -left-3 w-14 h-14 bg-white/30 rounded-full"
                        />
                    )}
                </motion.div>
            </div>
        </BrowserFrame>
    );
};

const Workflow: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    // Scroll Logic: Track the outer container (400vh tall)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Determine active step based on scroll range
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.25) setActiveStep(0);
        else if (latest < 0.50) setActiveStep(1);
        else if (latest < 0.75) setActiveStep(2);
        else setActiveStep(3);
    });

    return (
        <section ref={containerRef} className="relative bg-black h-[400vh]">
            {/* Sticky Container: Holds the actual content viewport */}
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
                
                {/* 1. Header Section */}
                <div className="pt-20 md:pt-24 px-6 text-center z-20 bg-black/50 backdrop-blur-sm pb-8 border-b border-white/5 md:border-none">
                     <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4"
                     >
                        来看看，让我们如何
                        <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 ml-2">精细成片</span>
                     </motion.h2>
                     <p className="text-gray-500 text-sm md:text-base font-medium uppercase tracking-[0.2em]">Workflow Breakdown</p>
                </div>

                {/* 2. Main Content Area */}
                <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* LEFT: Text Content (Smaller Width) */}
                    <div className="lg:col-span-4 flex flex-col justify-center relative min-h-[300px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="flex flex-col items-start"
                            >
                                {/* Stylish Tag */}
                                <div className="inline-flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                    <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-sm">
                                        {steps[activeStep].tagIcon}
                                    </div>
                                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                                        {steps[activeStep].tagName}
                                    </span>
                                </div>

                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                    {steps[activeStep].title}
                                </h3>
                                <p className="text-base lg:text-lg text-gray-400 leading-relaxed font-medium">
                                    {steps[activeStep].desc}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: Visuals (Larger Width) */}
                    <div className="lg:col-span-8 h-[400px] lg:h-[550px] relative perspective-[2000px] pl-0 lg:pl-10">
                        
                        {/* Render all visuals stacked, animate based on activeStep */}
                        {steps.map((step, index) => {
                            const isPast = index < activeStep;
                            const isActive = index === activeStep;
                            const isFuture = index > activeStep;

                            return (
                                <motion.div
                                    key={step.id}
                                    className="absolute inset-0 w-full h-full"
                                    initial={false}
                                    animate={{
                                        y: isPast ? "-120%" : isActive ? "0%" : `${(index - activeStep) * 110}%`,
                                        scale: isActive ? 1 : 0.9,
                                        opacity: isActive ? 1 : isFuture ? 0.4 : 0,
                                        zIndex: steps.length - index,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 40 }}
                                    style={{
                                        zIndex: isActive ? 10 : 10 - Math.abs(index - activeStep)
                                    }}
                                >
                                    <div className={`w-full h-full transition-all duration-500 ${isActive ? 'brightness-100 shadow-2xl' : 'brightness-50 grayscale'}`}>
                                         {index === 0 && <Step1Visual />}
                                         {index === 1 && <Step2Visual />}
                                         {index === 2 && <Step3Visual />}
                                         {index === 3 && <Step4Visual />}
                                    </div>
                                    
                                    {/* Overlay for "Future" cards */}
                                    {isFuture && (
                                        <div className="absolute inset-0 bg-black/60 z-20 rounded-2xl border border-white/5" />
                                    )}
                                </motion.div>
                            );
                        })}

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Workflow;