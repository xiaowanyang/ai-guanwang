import React, { useState, useEffect } from 'react';
import { Menu, X, Gift, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Exported for reuse in Hero
export const WizardHatLogo = ({ className = "" }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`shrink-0 ${className}`}>
    <defs>
      <linearGradient id="paint0_linear" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#2563EB" />
      </linearGradient>
      <filter id="glow" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    {/* Solid background circle to match the provided image */}
    <circle cx="20" cy="20" r="18" fill="url(#paint0_linear)" />
    <path d="M20 10L28 28H12L20 10Z" fill="white" />
    <path d="M12 28H28C28 28 29 30 20 30C11 30 12 28 12 28Z" fill="white" />
    {/* Lighter stroke for visibility on solid blue */}
    <path d="M18 16L22 22" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="10" r="2" fill="#fff" filter="url(#glow)" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: '案例', href: '#gallery' },
    { name: '核心亮点', href: '#features' },
    { name: '价格', href: '#pricing' },
  ];

  // Optimized Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // 1. Handle Background style
      setIsScrolled(scrollY > 20);

      // 2. HERO CHECK (Fix for locked selection)
      // If we are in the Hero section (top 50% of the first screen), do NOT select anything.
      // This solves the issue where "Invite" or "Gallery" might be falsely selected at the top.
      if (scrollY < innerHeight * 0.5) {
          if (activeSection !== '') setActiveSection('');
          return;
      }

      // 3. Bottom of page check (Invite)
      // Only trigger if we have scrolled significantly (> 100px) and are truly at the bottom
      if (scrollY > 100 && (Math.ceil(innerHeight + scrollY) >= scrollHeight - 10)) {
          if (activeSection !== '#invite') setActiveSection('#invite');
          return;
      }

      // 4. Section Spy Logic
      const sections = [
          { id: 'invite', href: '#invite' },
          { id: 'pricing', href: '#pricing' },
          { id: 'features', href: '#features' },
          { id: 'gallery', href: '#gallery' },
      ];
      
      const triggerLine = scrollY + 150;
      let current = ''; 

      for (const section of sections) {
          const el = document.getElementById(section.id);
          if (el) {
              // CRITICAL FIX: Use getBoundingClientRect to get absolute position relative to viewport,
              // then add scrollY to get absolute position relative to document.
              // el.offsetTop can return 0 if the parent has 'position: relative' or transforms (like motion.div),
              // which caused the logic to think every section was at the top of the page.
              const rect = el.getBoundingClientRect();
              const absoluteTop = rect.top + scrollY;

              if (triggerLine >= absoluteTop) {
                  current = section.href;
                  break; 
              }
          }
      }

      if (current !== activeSection) {
          setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Smooth Scroll Handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
          const navHeightOffset = 85; 
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navHeightOffset;

          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
          });
          
          setActiveSection(href);
      }
      setMobileMenuOpen(false);
  };

  const handleExternalLink = () => {
      window.location.href = "https://comic-drama-user.yizhiknow.com/#/";
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 font-sans ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3' 
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        
        {/* Left Side: Logo + Navigation */}
        <div className="flex items-center gap-10">
            {/* Logo Section */}
            <a 
                href="#" 
                className="flex items-center gap-3 group" 
                onClick={(e) => { 
                    e.preventDefault(); 
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    setActiveSection(''); // Explicitly clear selection when going to top
                }}
            >
               <WizardHatLogo />
               <span className="text-2xl font-bold tracking-tight text-white font-serif italic select-none flex items-baseline">
                 <span className="not-italic mr-0.5 tracking-normal">希言</span>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 font-sans italic pr-1">Ai</span>
               </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a 
                      key={link.name} 
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`px-5 py-2 text-[15px] transition-all duration-300 relative ${
                          isActive 
                              ? 'text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' 
                              : 'text-gray-400 hover:text-white font-medium'
                      }`}
                  >
                    {link.name}
                    {isActive && (
                        <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-1 left-5 right-5 h-[2px] bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                  </a>
                );
              })}
              
              {/* Invite Friend */}
               <a 
                href="#invite"
                onClick={(e) => scrollToSection(e, '#invite')}
                className={`ml-4 px-5 py-2 flex items-center gap-1.5 text-[15px] font-medium transition-colors duration-200 relative ${
                    activeSection === '#invite' ? 'text-amber-400 font-bold' : 'text-amber-400/80 hover:text-amber-300'
                }`}
              >
                 <Gift size={16} className="mb-0.5" />
                 <span>邀请有礼</span>
                 {activeSection === '#invite' && (
                        <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-1 left-5 right-5 h-[2px] bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
              </a>
            </div>
        </div>

        {/* Right Side: CTA */}
        <div className="hidden md:flex items-center gap-6">
            <button 
                onClick={handleExternalLink}
                className="h-9 px-6 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 active:scale-95 text-[13px] tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
               立即体验
            </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute top-0 right-0 w-full md:w-[400px] h-screen bg-[#0a0a0a] border-l border-white/10 pt-32 px-8 flex flex-col gap-6 md:hidden z-40"
          >
            {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className={`text-xl flex items-center justify-between group py-4 border-b border-white/5 ${
                    activeSection === item.href ? 'font-bold text-white' : 'font-medium text-gray-300'
                }`}
                onClick={(e) => scrollToSection(e, item.href)}
              >
                {item.name}
                <ChevronRight className={`transition-opacity ${activeSection === item.href ? 'opacity-100 text-blue-500' : 'opacity-0 group-hover:opacity-100'}`} />
              </a>
            ))}
            <a 
                href="#invite" 
                className={`text-xl font-medium text-amber-400 flex items-center justify-between group py-4 border-b border-white/5 ${
                    activeSection === '#invite' ? 'font-bold' : ''
                }`}
                onClick={(e) => scrollToSection(e, '#invite')}
            >
                邀请有礼
                <Gift className="text-amber-400" />
            </a>
            
            <div className="mt-8 flex flex-col gap-4">
               <button 
                  onClick={handleExternalLink}
                  className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-gray-200"
               >
                  立即体验
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;