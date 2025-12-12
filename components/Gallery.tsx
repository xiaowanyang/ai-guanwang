import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play } from 'lucide-react';

// --- Data ---
const videoItems = [
    {
        id: 1,
        title: "赛博纪元",
        image: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "古风仙侠",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "皮克斯风",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "史诗战争",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "唯美治愈",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "未来机甲",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
    }
];

// --- Components ---

interface VideoCardProps {
    item: any;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ item, isHovered, onHover, onLeave }) => {
    return (
        <motion.div 
            className={`relative flex-shrink-0 w-[300px] md:w-[400px] aspect-video rounded-xl overflow-hidden cursor-pointer border border-white/5 bg-zinc-900 mx-3 transition-all duration-500 ease-out ${isHovered ? 'z-50 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'z-0 grayscale-[50%] hover:grayscale-0'}`}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {/* Image Layer */}
            <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-5 flex flex-col justify-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-90'}`}>
                
                <div className="flex justify-between items-end w-full">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white tracking-wide drop-shadow-md">{item.title}</h3>
                    
                    {/* Play Button - Only visible on hover */}
                    <div className={`w-10 h-10 rounded-full bg-blue-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform transition-all duration-300 ${isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                        <Play size={16} fill="white" className="text-white ml-0.5" />
                    </div>
                </div>
                
            </div>
        </motion.div>
    );
};

interface MarqueeRowProps {
    items: any[];
    direction?: 'left' | 'right';
    speed?: number;
    isPaused: boolean;
    hoveredId: number | null;
    setHoveredId: (id: number | null) => void;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction = 'left', speed = 50, isPaused, hoveredId, setHoveredId }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const controls = useAnimation();

    // Duplicate items multiple times to ensure seamless loop on large screens
    const displayItems = [...items, ...items, ...items, ...items];

    useEffect(() => {
        if (containerRef.current) {
            // Measure the width of the container content.
            // Since we duplicated items 4 times, the "loop unit" width is total / 4.
            // We ensure the container has rendered before measuring.
            const totalWidth = containerRef.current.scrollWidth;
            if (totalWidth > 0) {
                 setContentWidth(totalWidth / 4);
            }
        }
    }, []);

    useEffect(() => {
        if (!contentWidth) return;

        if (isPaused) {
            controls.stop();
            return;
        }

        // Animation Logic
        // Left: 0 -> -contentWidth
        // Right: -contentWidth -> 0
        if (direction === 'left') {
            controls.start({
                x: -contentWidth,
                transition: {
                    ease: "linear",
                    duration: speed,
                    repeat: Infinity,
                    from: 0 // Explicit start
                }
            });
        } else {
             controls.start({
                x: 0,
                transition: {
                    ease: "linear",
                    duration: speed,
                    repeat: Infinity,
                    from: -contentWidth // Explicit start
                }
            });
        }
    }, [isPaused, contentWidth, direction, speed, controls]);

    return (
        <div className="flex overflow-hidden py-4 select-none mask-gradient-horizontal">
            <motion.div 
                ref={containerRef}
                className="flex items-center"
                animate={controls}
                style={{ x: direction === 'left' ? 0 : -contentWidth }} // Initial position
            >
                {displayItems.map((item, idx) => (
                    <VideoCard 
                        key={`${item.id}-${idx}-${direction}`}
                        item={item}
                        isHovered={hoveredId === item.id}
                        onHover={() => setHoveredId(item.id)}
                        onLeave={() => setHoveredId(null)}
                    />
                ))}
            </motion.div>
        </div>
    );
};

const Gallery: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-black py-24 border-t border-white/5 relative overflow-hidden scroll-mt-32">
        
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                创作者集锦
            </h2>
            <p className="text-lg text-gray-400">
                均生成于 <span className="text-blue-400 font-serif italic">希言Ai</span>，激发无限创意
            </p>
        </div>

        {/* Video Wall Container */}
        <div 
            className="w-full relative space-y-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
             {/* Gradient Masks */}
             <div className="absolute top-0 left-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black via-black/60 to-transparent z-20 pointer-events-none" />
             <div className="absolute top-0 right-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black via-black/60 to-transparent z-20 pointer-events-none" />

             {/* Row 1: Left to Right */}
             <MarqueeRow 
                items={videoItems} 
                direction="right" 
                speed={50} 
                isPaused={isPaused} 
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
             />

             {/* Row 2: Right to Left (Reverse items for variety) */}
             <MarqueeRow 
                items={[...videoItems].reverse()} 
                direction="left" 
                speed={50} 
                isPaused={isPaused} 
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
             />

        </div>
    </section>
  );
};

export default Gallery;