import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  Terminal,
  Shield,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/useReducedMotion';

export const Experience: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="experience"
      aria-label="Experience and Leadership"
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
            <Briefcase className="w-3.5 h-3.5" />
            <span>04 // EXPERIENCE & LEADERSHIP</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          >
            Experience & Activities
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base"
          >
            Student leadership, technical club participation, and collaborative community roles.
          </motion.p>
        </div>

        {/* Experience Bento Cards */}
        <div className="space-y-8">
          {portfolioData.experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              id={`experience-card-${exp.id}`}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-7 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-md shadow-xl transition-all duration-300 bento-card-glow group"
            >
              {/* Subtle top glow */}
              <div className="absolute top-0 right-1/4 w-64 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6 pb-6 border-b border-slate-800/80">
                {/* Role and Organization Title */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono uppercase text-cyan-400 tracking-wider">
                        STUDENT_LEADERSHIP // TECHNICAL_SOCIETY
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {exp.role}{' '}
                      <span className="text-cyan-400 font-semibold font-mono">
                        @ {exp.organization}
                      </span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                      {exp.type}
                    </p>
                  </div>
                </div>

                {/* Badges: Period, Status, Location */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-mono shadow-sm">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{exp.status}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 text-xs font-mono">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* Main Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
                {exp.description}
              </p>

              {/* Responsibilities & Contributions */}
              <div className="mb-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3.5 text-xs font-mono uppercase tracking-wider text-slate-300">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Key Responsibilities & Contributions:</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills and Domain Tags */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Competencies & Domain Focus:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs font-mono hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
