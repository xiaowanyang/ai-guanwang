import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Features from './components/Features';
import Advantages from './components/Advantages';
import Workflow from './components/Workflow';
import TechSpecs from './components/TechSpecs';
import Pricing from './components/Pricing';
import Invite from './components/Invite';
import Footer from './components/Footer';

// Apple-style Reveal Wrapper
// Gives a subtle "float in" effect as sections enter the viewport
const SectionReveal = ({ children }: { children?: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }} // Triggers when 10% into view
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // "Apple-esque" cubic bezier
      className="relative z-10 bg-black" // Ensure background continuity
    >
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500/30 font-sans">
      <Navbar />
      <main>
        {/* Hero usually doesn't need the standard reveal as it's the first view */}
        <Hero />
        
        <SectionReveal>
          <Gallery />
        </SectionReveal>

        <SectionReveal>
          <Features />
        </SectionReveal>

        <SectionReveal>
          <Advantages />
        </SectionReveal>

        <SectionReveal>
          <TechSpecs />
        </SectionReveal>

        <SectionReveal>
          <Workflow />
        </SectionReveal>

        <SectionReveal>
          <Pricing />
        </SectionReveal>

        <SectionReveal>
          <Invite />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
};

export default App;