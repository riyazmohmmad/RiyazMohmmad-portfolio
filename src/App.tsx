import React from 'react';
import { CyberBackground } from './components/CyberBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { GithubSection } from './components/GithubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 relative selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Subtle Interactive Cyber Background & Grid */}
      <CyberBackground />

      {/* Sticky Responsive Translucent Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <GithubSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

