import React from 'react';
import { WizardHatLogo } from './Navbar';
import { ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
          const navHeightOffset = 85;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navHeightOffset;
          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
          });
      }
  };

  return (
    <footer className="bg-black py-16 px-6 border-t border-white/5 font-sans relative z-10">
        <div className="max-w-[1200px] mx-auto">
            
            <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24 mb-16">
                
                {/* Brand Section */}
                <div className="md:w-1/3 space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <WizardHatLogo className="w-8 h-8" />
                        <span className="text-xl font-bold font-serif italic tracking-tight">
                            希言<span className="text-blue-500 not-italic ml-0.5">Ai</span>
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                        专业级 AI 小说转漫画视频创作平台。<br/>
                        赋予故事新的生命，让创作触手可及。
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                    
                    {/* Column 1 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold">探索产品</h4>
                        <button onClick={() => scrollToSection('features')} className="text-gray-500 hover:text-white text-left transition-colors">核心亮点</button>
                        <button onClick={() => scrollToSection('gallery')} className="text-gray-500 hover:text-white text-left transition-colors">生成案例</button>
                        <button onClick={() => scrollToSection('advantages')} className="text-gray-500 hover:text-white text-left transition-colors">技术优势</button>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold">服务与权益</h4>
                        <button onClick={() => scrollToSection('pricing')} className="text-gray-500 hover:text-white text-left transition-colors">价格方案</button>
                        <button onClick={() => scrollToSection('invite')} className="text-gray-500 hover:text-white text-left transition-colors">合伙人计划</button>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white font-bold">开始创作</h4>
                        <a 
                            href="https://comic-drama-user.yizhiknow.com/#/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group"
                        >
                            登录工作台 
                            <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-600">
                <div className="flex gap-4">
                    <span>Copyright © 2024 Xiyan AI. All rights reserved.</span>
                </div>
                <div className="flex gap-6">
                    {/* Placeholder links that are standard for footers, can be removed if strictly not needed */}
                    <span className="hover:text-gray-400 cursor-pointer transition-colors">隐私政策</span>
                    <span className="hover:text-gray-400 cursor-pointer transition-colors">服务条款</span>
                    <span>京ICP备XXXXXXXX号</span>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;