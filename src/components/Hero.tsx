import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Code2,
  Instagram,
  Lock,
  Cpu,
  Terminal,
  ExternalLink,
  Sparkles,
  Maximize2,
  X,
  CheckCircle2,
  Award,
  RotateCw,
} from 'lucide-react';
import { portfolioData, SocialLink } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/useReducedMotion';

export const Hero: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalFlipped, setIsModalFlipped] = useState(false);

  // Typing effect for the tagline
  const fullTagline = portfolioData.personal.taglineStatic;
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(fullTagline);
      setIsTypingComplete(true);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullTagline.length) {
        setDisplayedText(fullTagline.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [fullTagline, prefersReducedMotion]);

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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navbar = document.getElementById('main-navbar');
      const navOffset = navbar ? navbar.offsetHeight : 70;
      const elementRect = el.getBoundingClientRect();
      const absoluteTop = elementRect.top + window.pageYOffset;
      const scrollTarget = sectionId === 'home' ? 0 : absoluteTop - navOffset - 16;

      window.scrollTo({
        top: scrollTarget > 0 ? scrollTarget : 0,
        behavior: 'smooth',
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-6">
        {/* Main Hero Bento Grid (Dual Column Layout for prominent Hero Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Hero Intro, Dynamic Tagline & Direct CTAs */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl bg-slate-900/40 border border-slate-800/80 p-8 sm:p-10 lg:p-12 backdrop-blur-md shadow-2xl overflow-hidden bento-card-glow flex flex-col justify-between relative"
          >
            {/* Ambient Radial Glow */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Status Header Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/40 text-slate-200 text-xs font-mono shadow-sm backdrop-blur-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-cyan-400 font-semibold">SEC_OPERATOR:</span>
                  <span>Open to Internships</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-400">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>VIT Bhopal (2024–Present)</span>
                </div>
              </div>

              {/* Name */}
              <motion.h1
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                  {portfolioData.personal.name}
                </span>
              </motion.h1>

              {/* Interactive Typing Tagline */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="min-h-[2.5rem] flex items-center mb-5"
              >
                <p className="text-lg sm:text-xl font-mono font-semibold text-cyan-400 tracking-wide flex items-center">
                  <span>{displayedText}</span>
                  <span
                    className={`inline-block w-2.5 h-5 ml-1.5 bg-cyan-400 ${
                      isTypingComplete ? 'animate-pulse' : ''
                    }`}
                    aria-hidden="true"
                  />
                </p>
              </motion.div>

              {/* Short Bio */}
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-normal max-w-xl"
              >
                {portfolioData.personal.shortBio}
              </motion.p>
            </div>

            <div>
              {/* Action Buttons */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3 mb-6"
              >
                <button
                  id="hero-cta-projects"
                  onClick={() => scrollToSection('projects')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/25 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-cta-inquiry"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-950/90 hover:bg-slate-900 text-cyan-300 hover:text-cyan-200 font-semibold text-xs sm:text-sm border border-cyan-500/40 hover:border-cyan-400 backdrop-blur-sm transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer shadow-md"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Direct Inquiry</span>
                </button>

                <a
                  id="hero-cta-linkedin"
                  href="http://www.linkedin.com/in/riyaz-mohmmad-aa66b4328"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white font-medium text-xs sm:text-sm border border-slate-800 hover:border-slate-700 backdrop-blur-sm transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </motion.div>

              {/* Profiles & Verification Footer */}
              <div className="pt-5 border-t border-slate-800/70 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-widest text-slate-400 font-mono">
                    PROFILES:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {portfolioData.socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                        rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/90 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-950/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        aria-label={social.label}
                      >
                        {renderSocialIcon(social.icon)}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>5x Certified</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Prominent Hero Image Showcase Card & Cyber HUD */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 rounded-3xl bg-slate-900/50 border border-cyan-500/40 p-6 sm:p-7 backdrop-blur-md shadow-2xl overflow-hidden bento-card-glow flex flex-col justify-between relative group"
          >
            {/* Top HUD Bar */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white tracking-wider">
                  SECURITY_ID // RM-2024
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                ACTIVE
              </span>
            </div>

            {/* Main Hero Portrait Frame with 3D Flip */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/90 shadow-inner group/photo [perspective:1000px]">
              {/* Ambient Glow behind image */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 blur-lg opacity-40 group-hover/photo:opacity-75 transition-opacity duration-500 pointer-events-none" />

              {/* 3D Flippable Card Container */}
              <div
                id="hero-photo-flip-card"
                role="button"
                tabIndex={0}
                aria-label={`Hero photo. Currently showing ${isFlipped ? 'alternative portrait' : 'primary portrait'}. Click or press Enter to flip.`}
                onClick={() => setIsFlipped((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsFlipped((prev) => !prev);
                  }
                }}
                className="relative aspect-[4/4.5] sm:aspect-square w-full cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl"
              >
                <motion.div
                  className="w-full h-full relative"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* FRONT FACE: Primary Profile Photo (Original Style) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <img
                      src={portfolioData.personal.profileImage}
                      alt="Riyaz Mohmmad - Cybersecurity Specialist"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-95 group-hover/photo:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=600&h=600&q=80';
                      }}
                    />

                    {/* Cyber Corner HUD Brackets */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/80 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none" />

                    {/* Live Cyber Scanline / Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-slate-950/80 pointer-events-none" />

                    {/* Interactive Flip Hint Badge (Top Right) */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-950/85 border border-cyan-500/50 backdrop-blur-md shadow-md text-cyan-300 text-[10px] font-mono">
                      <RotateCw className="w-3 h-3 text-cyan-400 animate-[spin_8s_linear_infinite]" />
                      <span>CLICK TO FLIP</span>
                    </div>

                    {/* Overlaid Identity Badge at bottom of photo (Original) */}
                    <div className="absolute bottom-3 left-3 right-14 p-2.5 rounded-xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-md shadow-lg">
                      <p className="text-xs font-bold text-white font-mono truncate">
                        RIYAZ MOHMMAD
                      </p>
                      <p className="text-[11px] text-cyan-300 font-mono truncate flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>Cyber Security Engineer</span>
                      </p>
                    </div>
                  </div>

                  {/* BACK FACE: Flipped Alternative Photo (Complete, Uncropped) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center p-1.5"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <img
                      src={portfolioData.personal.flipProfileImage}
                      alt="Riyaz Mohmmad - Alternative Portrait"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter contrast-[1.02] brightness-95 group-hover/photo:scale-[1.02] transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://i.ibb.co/TxhqGKKJ/20260829-161444.jpg';
                      }}
                    />

                    {/* Cyber Corner HUD Brackets */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-blue-400/80 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-blue-400/80 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-blue-400/80 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-blue-400/80 pointer-events-none" />

                    {/* Interactive Flip Hint Badge (Top Right) */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-950/85 border border-blue-500/50 backdrop-blur-md shadow-md text-blue-300 text-[10px] font-mono">
                      <RotateCw className="w-3 h-3 text-blue-400 animate-[spin_8s_linear_infinite]" />
                      <span>FLIP BACK</span>
                    </div>
                  </div>
                </motion.div>

                {/* Expand Image Trigger Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageModalOpen(true);
                  }}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-950/85 hover:bg-slate-900 border border-slate-700/80 text-cyan-400 transition-colors duration-200 cursor-pointer shadow-lg z-20"
                  title="Expand Full Photo"
                  aria-label="Expand Full Photo"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom HUD Specs */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-left font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Degree Program</span>
                <span className="text-xs font-bold text-slate-200">Int. M.Tech Cyber</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Campus</span>
                <span className="text-xs font-bold text-slate-200">VIT Bhopal Univ</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4-Card Bento Pillar Grid */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left"
        >
          <div className="p-5 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400/80 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">DOMAIN</span>
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Specialization</span>
            <p className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">Cyber Security</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 backdrop-blur-md transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-blue-400/80 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">CAMPUS</span>
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Institution</span>
            <p className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors">VIT Bhopal University</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/40 backdrop-blur-md transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-purple-400/80 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">RESEARCH</span>
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Research Focus</span>
            <p className="text-sm font-bold text-slate-100 group-hover:text-purple-300 transition-colors">ML Anomaly Detection</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/40 backdrop-blur-md transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400/80 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">SYSTEMS</span>
            </div>
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">Infrastructure</span>
            <p className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">Linux & Cloud Security</p>
          </div>
        </motion.div>
      </div>

      {/* Hero Image Fullscreen / High-Res Preview Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-slate-900 border border-cyan-500/50 rounded-3xl p-6 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-mono font-bold text-white">
                    RIYAZ MOHMMAD // {isModalFlipped ? 'PORTRAIT 2' : 'PORTRAIT 1'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalFlipped((prev) => !prev)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-mono border border-cyan-500/30 transition-colors cursor-pointer"
                    title="Flip portrait view"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Flip</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsImageModalOpen(false)}
                    className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => setIsModalFlipped((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsModalFlipped((prev) => !prev);
                  }
                }}
                className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 cursor-pointer relative [perspective:1000px] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Click to flip photo preview"
              >
                <motion.div
                  animate={{ rotateY: isModalFlipped ? 180 : 0 }}
                  transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-full relative"
                >
                  <div
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    className="w-full flex items-center justify-center bg-slate-950 min-h-[360px]"
                  >
                    <img
                      src={portfolioData.personal.profileImage}
                      alt={portfolioData.personal.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[70vh] object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=600&h=600&q=80';
                      }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <img
                      src={portfolioData.personal.flipProfileImage}
                      alt="Riyaz Mohmmad Alternative Portrait"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[70vh] object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://i.ibb.co/TxhqGKKJ/20260829-161444.jpg';
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Integrated M.Tech Cyber Security</span>
                <span className="text-cyan-400">VIT Bhopal University</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
