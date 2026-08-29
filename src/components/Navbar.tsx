import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Shield, Terminal, ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../data/portfolio';

interface NavItem {
  name: string;
  href: string;
  code: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home', code: '00' },
  { name: 'About', href: '#about', code: '01' },
  { name: 'Skills', href: '#skills', code: '02' },
  { name: 'Projects', href: '#projects', code: '03' },
  { name: 'Experience', href: '#experience', code: '04' },
  { name: 'Education', href: '#education', code: '05' },
  { name: 'Certifications', href: '#certifications', code: '06' },
  { name: 'GitHub', href: '#github', code: '07' },
  { name: 'Contact', href: '#contact', code: '08' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navHeaderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for active section tracking
    const sectionIds = navItems.map((item) => item.href.substring(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
      if (intersectingEntries.length > 0) {
        intersectingEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topIntersecting = intersectingEntries[0];
        if (topIntersecting && topIntersecting.target.id) {
          setActiveSection(topIntersecting.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-80px 0px -40% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75],
    });

    elements.forEach((el) => observer.observe(el));

    // Fallback scroll spy for boundary positions (very top and very bottom)
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPos < 100) {
        setActiveSection('home');
      } else if (scrollPos + windowHeight >= documentHeight - 60) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollSpy);
      observer.disconnect();
    };
  }, []);

  // Handle hash on initial mount
  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      const targetElement = document.getElementById(hashId);
      if (targetElement) {
        setTimeout(() => {
          const navbar = navHeaderRef.current;
          const navOffset = navbar ? navbar.offsetHeight : 70;
          const elementRect = targetElement.getBoundingClientRect();
          const absoluteTop = elementRect.top + window.pageYOffset;
          const scrollTarget = hashId === 'home' ? 0 : absoluteTop - navOffset - 16;
          window.scrollTo({
            top: scrollTarget > 0 ? scrollTarget : 0,
            behavior: 'smooth',
          });
        }, 150);
      }
    }
  }, []);

  // Handle escape key and window resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1280 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);

      const targetId = href.startsWith('#') ? href.substring(1) : href;
      setActiveSection(targetId);

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        if (targetId === 'home') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        } else {
          // Use fixed navbar height constant so calculations remain accurate even when drawer collapses
          const FIXED_NAV_OFFSET = 76;
          const elementRect = targetElement.getBoundingClientRect();
          const absoluteTop = elementRect.top + window.pageYOffset;
          const scrollTarget = absoluteTop - FIXED_NAV_OFFSET;

          window.scrollTo({
            top: Math.max(0, scrollTarget),
            behavior: 'smooth',
          });
        }

        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', `#${targetId}`);
        }
      }
    },
    []
  );

  return (
    <>
      <header
        id="main-navbar"
        ref={navHeaderRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#020617]/95 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl shadow-black/60 py-3'
            : 'bg-slate-950/50 backdrop-blur-md border-b border-slate-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Logo */}
            <a
              id="brand-logo"
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center gap-2.5 text-slate-100 hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl px-1.5 py-1 shrink-0"
              aria-label="RIYAZ MOHMMAD - Return to home section"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-all duration-300 shadow-sm">
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-wider uppercase font-mono text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {portfolioData.personal.name}
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CYBER SECURITY
                </span>
              </div>
            </a>

            {/* Desktop Navigation (Screens >= 1280px / XL) */}
            <nav
              className="hidden xl:flex items-center gap-1 p-1 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md"
              aria-label="Main Navigation"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    id={`desktop-nav-${item.name.toLowerCase()}`}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)] font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>

            {/* Right Action: Quick Connect & Mobile / Tablet Menu Button */}
            <div className="flex items-center gap-2.5">
              {/* Quick Connect (visible on sm+) */}
              <a
                id="quick-connect-btn"
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900/60 hover:border-cyan-400 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-sm cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Connect</span>
              </a>

              {/* Menu Toggle Button (Visible on Mobile & Tablet < 1280px) */}
              <button
                id="mobile-menu-toggle"
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className={`xl:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer text-xs font-mono font-medium active:scale-95 ${
                  mobileMenuOpen
                    ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/90 hover:border-cyan-500/40'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? (
                  <>
                    <X className="w-4 h-4 text-cyan-400" />
                    <span>Close</span>
                  </>
                ) : (
                  <>
                    <Menu className="w-4 h-4 text-cyan-400" />
                    <span>Menu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu Drawer Dropdown for Mobile & Tablet */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="xl:hidden bg-[#020617]/98 backdrop-blur-2xl border-t border-slate-800/90 overflow-hidden shadow-2xl mt-3"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
                <div className="flex items-center justify-between px-3 py-1.5 mb-1 border-b border-slate-800/70">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>NAVIGATION_DIRECTORY</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {navItems.length} SECTIONS AVAILABLE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <a
                        key={item.name}
                        id={`menu-item-${item.name.toLowerCase()}`}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer min-h-[48px] active:scale-[0.98] ${
                          isActive
                            ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 shadow-md font-semibold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900/90 active:bg-slate-800 border border-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-cyan-400/80 w-5">
                            {item.code}
                          </span>
                          <span className="text-sm tracking-wide">{item.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {isActive && (
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              Active
                            </span>
                          )}
                          <ChevronRight
                            className={`w-4 h-4 ${
                              isActive ? 'text-cyan-400' : 'text-slate-600'
                            }`}
                          />
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-4 mt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
                  <a
                    id="mobile-inquiry-cta"
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Open Inquiry Message Form</span>
                  </a>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4 text-xs text-slate-400 font-mono px-2 pt-1 sm:pt-0">
                    <span className="text-[11px]">VIT Bhopal University</span>
                    <a
                      href={
                        portfolioData.personal.email
                          ? `mailto:${portfolioData.personal.email}`
                          : '#contact'
                      }
                      className="inline-flex items-center gap-1 text-[11px] text-cyan-400 font-mono hover:underline"
                    >
                      <span>Direct Email</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay for mobile & tablet menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 xl:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

