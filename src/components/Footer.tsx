import React from 'react';
import {
  Shield,
  ArrowUp,
  Github,
  Linkedin,
  Code2,
  Mail,
  Instagram,
  ExternalLink,
} from 'lucide-react';
import { portfolioData, SocialLink } from '../data/portfolio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSocialIcon = (icon: SocialLink['icon']) => {
    switch (icon) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'leetcode':
        return <Code2 className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'mail':
        return <Mail className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <footer
      id="main-footer"
      className="relative z-10 pt-8 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-11 h-11 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-cyan-400 shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm tracking-wider uppercase font-mono text-white">
                {portfolioData.personal.name}
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Cyber Security Engineering
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            {portfolioData.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="p-3 rounded-2xl bg-slate-950/80 hover:bg-cyan-950/40 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                aria-label={social.label}
              >
                {renderSocialIcon(social.icon)}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 text-xs font-mono text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-slate-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono text-center sm:text-left">
          <p>© 2026 RIYAZ MOHMMAD. All rights reserved.</p>
          <p className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Integrated M.Tech Cyber Security • VIT Bhopal University</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
