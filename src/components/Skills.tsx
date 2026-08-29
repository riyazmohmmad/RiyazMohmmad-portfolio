import React from 'react';
import { motion } from 'motion/react';
import {
  Code,
  Shield,
  Cloud,
  Wrench,
  Terminal,
  CheckCircle2,
  Cpu,
  Server,
  Binary,
  Layers,
} from 'lucide-react';
import { portfolioData, SkillCategory } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/useReducedMotion';

export const Skills: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const getCategoryIcon = (iconType: SkillCategory['icon']) => {
    switch (iconType) {
      case 'code':
        return <Code className="w-5 h-5 text-cyan-400" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-blue-400" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-purple-400" />;
      case 'wrench':
        return <Wrench className="w-5 h-5 text-emerald-400" />;
      default:
        return <Terminal className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getSkillCategoryBorderColor = (id: string) => {
    switch (id) {
      case 'programming':
        return 'hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)]';
      case 'cyber-security':
        return 'hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]';
      case 'cloud-systems':
        return 'hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.12)]';
      case 'tools':
        return 'hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]';
      default:
        return 'hover:border-cyan-500/50';
    }
  };

  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400 mb-3"
          >
            <Binary className="w-3.5 h-3.5" />
            <span>02 // DOMAIN_COMPETENCIES</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          >
            Technical Skills
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base"
          >
            Core competencies across software engineering, security fundamentals, cloud infrastructure, and operational tools.
          </motion.p>
        </div>

        {/* 4 Skill Category Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {portfolioData.skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { y: -3, transition: { duration: 0.2 } }
              }
              className={`p-7 sm:p-9 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md transition-all duration-300 shadow-xl ${getSkillCategoryBorderColor(
                category.id
              )}`}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-800/80">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shadow-sm">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {category.skills.length} Technical Modules
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800">
                  CAT_0{index + 1}
                </span>
              </div>

              {/* Category Description */}
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Skills List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group/item flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-sm font-semibold text-slate-200 group-hover/item:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                    {skill.tag && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                        {skill.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
