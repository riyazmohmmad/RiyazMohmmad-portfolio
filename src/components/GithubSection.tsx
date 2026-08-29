import React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, GitBranch, Terminal, Code2, Shield } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/useReducedMotion';

export const GithubSection: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="github"
      aria-label="GitHub Activity"
      className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 p-8 sm:p-12 backdrop-blur-md shadow-2xl text-center overflow-hidden group transition-all duration-300 bento-card-glow"
        >
          {/* Subtle Cyber Accent Ambient */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* GitHub Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-slate-800/90 border border-slate-700/80 mx-auto flex items-center justify-center text-white mb-6 shadow-lg group-hover:border-cyan-500/50 group-hover:scale-105 transition-all duration-300">
            <Github className="w-8 h-8 text-cyan-400" />
          </div>

          {/* Terminal Subtitle */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-xs font-mono text-cyan-400 mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>07 // OPEN_SOURCE_WORKSPACE</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            {portfolioData.githubSection.heading}
          </h2>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            {portfolioData.githubSection.text}
          </p>

          {/* Highlights Mini Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-xl mx-auto mb-10 text-left">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Security Tools</span>
              </div>
              <p className="text-xs text-slate-300">Defensive scripts & automation</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-mono mb-1">
                <Code2 className="w-3.5 h-3.5" />
                <span>ML Architectures</span>
              </div>
              <p className="text-xs text-slate-300">GNN & LSTM anomaly models</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-mono mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Network Analysis</span>
              </div>
              <p className="text-xs text-slate-300">Packet inspection & Linux labs</p>
            </div>
          </div>

          {/* Action Button */}
          <a
            id="github-profile-button"
            href={portfolioData.githubSection.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-slate-950/90 hover:bg-slate-900 text-white font-semibold text-sm border border-slate-700 hover:border-cyan-400 shadow-xl transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Github className="w-5 h-5 text-cyan-400" />
            <span>{portfolioData.githubSection.buttonText}</span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
