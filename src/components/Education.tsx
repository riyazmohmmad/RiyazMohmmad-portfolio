import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Building, School, BookOpen } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/useReducedMotion';

export const Education: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="education"
      aria-label="Education History"
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400 mb-3"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>05 // ACADEMIC_RECORD</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          >
            Education
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base"
          >
            Academic background and formal training in cybersecurity engineering and science foundations.
          </motion.p>
        </div>

        {/* Minimal Clean Vertical Bento Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800/80 ml-4 sm:ml-8 space-y-12">
          {portfolioData.education.map((edu, index) => {
            const isUniversity = edu.institution.toLowerCase().includes('vit') || edu.institution.toLowerCase().includes('university');

            return (
              <motion.div
                key={edu.institution}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Circular Timeline Node */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-3 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                {/* Education Bento Card */}
                <div className="p-7 sm:p-9 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 backdrop-blur-md shadow-xl transition-all duration-300 bento-card-glow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-5 border-b border-slate-800/70">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">
                          {isUniversity ? 'HIGHER_EDUCATION // POST_GRADUATE' : 'SENIOR_SECONDARY // CLASS_12'}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-2 text-cyan-300 font-medium text-sm mt-1.5">
                        {isUniversity ? (
                          <Building className="w-4 h-4 text-cyan-400 shrink-0" />
                        ) : (
                          <School className="w-4 h-4 text-cyan-400 shrink-0" />
                        )}
                        <span>{edu.institution}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-xs font-mono">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{edu.period}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{edu.location}</span>
                    </div>
                    <span className="text-slate-700">•</span>
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{edu.status}</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
