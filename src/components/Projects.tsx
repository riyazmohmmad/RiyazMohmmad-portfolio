import React from 'react';
import { motion } from 'motion/react';
import {
  Network,
  ShieldAlert,
  Lock,
  Layers,
  CheckCircle2,
  FolderGit2,
  Terminal,
  Cpu,
} from 'lucide-react';
import { portfolioData, ProjectItem } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/useReducedMotion';

export const Projects: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const getProjectIcon = (iconType: ProjectItem['icon']) => {
    switch (iconType) {
      case 'network':
        return <Network className="w-5 h-5 text-cyan-400" />;
      case 'shield-alert':
        return <ShieldAlert className="w-5 h-5 text-blue-400" />;
      case 'lock':
        return <Lock className="w-5 h-5 text-purple-400" />;
      default:
        return <FolderGit2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section
      id="projects"
      aria-label="Selected Projects"
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
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03 // ENGINEERING_PORTFOLIO</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          >
            Selected Projects
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base"
          >
            Practical work exploring cybersecurity, machine learning, cloud security, and security engineering.
          </motion.p>
        </div>

        {/* Bento Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {portfolioData.projects.map((project, index) => {
            const isFeatured = index === 0;
            return (
              <motion.article
                key={project.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { y: -4, transition: { duration: 0.2 } }
                }
                className={`group flex flex-col justify-between p-7 sm:p-9 rounded-3xl bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 shadow-xl relative overflow-hidden ${
                  isFeatured ? 'lg:col-span-12 bento-card-glow' : 'lg:col-span-6'
                }`}
              >
                {/* Top ambient accent glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Header with category and icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-slate-800 transition-colors shadow-sm">
                        {getProjectIcon(project.icon)}
                      </div>
                      {isFeatured && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          FEATURED_RESEARCH
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/50 border border-cyan-900/60 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Project Highlights (if present) */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-6 space-y-2.5 pt-4 border-t border-slate-800/60">
                      {project.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Technologies list */}
                <div className="pt-5 border-t border-slate-800/80 mt-auto">
                  <p className="text-[11px] uppercase tracking-wider font-mono text-slate-400 mb-3">
                    Technologies & Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono font-medium px-3 py-1 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 group-hover:border-slate-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
