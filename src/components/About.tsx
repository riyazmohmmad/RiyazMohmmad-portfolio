import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  ShieldCheck,
  Building2,
  Cpu,
  Terminal,
  Layers,
} from 'lucide-react';
import { portfolioData, AboutCard } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/useReducedMotion';

export const About: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const getAboutIcon = (iconType: AboutCard['icon']) => {
    switch (iconType) {
      case 'graduation-cap':
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case 'shield-check':
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case 'building-2':
        return <Building2 className="w-5 h-5 text-purple-400" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section
      id="about"
      aria-label="About Riyaz Mohmmad"
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400 mb-3"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // PROFILE_OVERVIEW</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-xl text-left relative overflow-hidden bento-card-glow"
          >
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>CORE_STATEMENT</span>
            </div>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {portfolioData.personal.aboutParagraph}
            </p>
          </motion.div>
        </div>

        {/* 4 Professional Information Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.aboutCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { y: -4, transition: { duration: 0.2 } }
              }
              className="group relative p-7 rounded-3xl bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-6 group-hover:border-cyan-500/50 group-hover:bg-slate-800 transition-colors shadow-sm">
                  {getAboutIcon(card.icon)}
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  {card.subtitle}
                </span>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-slate-500">BENTO_0{index + 1}</span>
                <span className="text-cyan-500/80 group-hover:text-cyan-300 transition-colors">
                  VERIFIED
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
