import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Calendar,
  Building,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  FileCheck,
  X,
  Info,
  Linkedin,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { portfolioData, CertificationItem } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/useReducedMotion';

export const Certifications: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  const handleViewCertificate = (cert: CertificationItem) => {
    if (cert.certificateUrl && cert.certificateUrl !== '#') {
      window.open(cert.certificateUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedCert(cert);
    }
  };

  const linkedInProfileUrl = "http://www.linkedin.com/in/riyaz-mohmmad-aa66b4328";

  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400 mb-3"
          >
            <Award className="w-3.5 h-3.5" />
            <span>06 // CREDENTIALS_VERIFICATION</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          >
            Certifications & Verification
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base"
          >
            Verified credentials in programming, networking, blockchain, and open source systems. All certificates can be authenticated directly on LinkedIn.
          </motion.p>
        </div>

        {/* Prominent LinkedIn Verification Bento Callout */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-900/80 via-blue-950/30 to-slate-900/80 border border-cyan-500/40 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#0A66C2]/20 border border-[#0A66C2]/40 flex items-center justify-center text-[#0A66C2] shrink-0 shadow-sm">
              <Linkedin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                  OFFICIAL_CREDENTIALS_REGISTRY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Authenticate Certificates on LinkedIn
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                View verified licenses, course completions, and endorsements on Riyaz Mohmmad's official profile.
              </p>
            </div>
          </div>

          <a
            href={linkedInProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold text-xs font-mono tracking-wide shadow-lg shadow-blue-950/50 transition-all duration-200 hover:-translate-y-0.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
            <span>Verify on LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* 5 Professional Certification Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { y: -4, transition: { duration: 0.2 } }
              }
              className="group flex flex-col justify-between p-7 rounded-3xl bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Certificate Icon & Issuer Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:bg-slate-800 transition-colors shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800/80 text-cyan-400 border border-slate-700/80">
                    {cert.issuer}
                  </span>
                </div>

                {/* Certificate Name */}
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors leading-snug">
                  {cert.title}
                </h3>

                {/* Issuing Organization & Date */}
                <div className="space-y-1.5 mb-4 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Issuer: {cert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Issued: {cert.issueDate}</span>
                  </div>
                </div>

                {/* Skills covered chips if present */}
                {cert.skillsCovered && cert.skillsCovered.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cert.skillsCovered.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-400 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* View Certificate & LinkedIn Verify Buttons */}
              <div className="pt-4 border-t border-slate-800/60 space-y-2">
                <a
                  href={cert.verificationUrl || linkedInProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 hover:text-white font-mono text-xs font-medium border border-cyan-500/40 hover:border-cyan-400 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer shadow-sm"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verify on LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <button
                  type="button"
                  onClick={() => handleViewCertificate(cert)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 font-mono text-[11px] font-medium border border-slate-800 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                  aria-label={`Inspect Details for ${cert.title}`}
                >
                  <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Inspect Credential Details</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Clean Modal for Certificate Details */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-dialog-title"
            >
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                aria-label="Close certificate dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-cyan-400">
                    Credential Record
                  </span>
                  <h4 id="cert-dialog-title" className="text-base font-bold text-white">
                    {selectedCert.title}
                  </h4>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-slate-300 mb-5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Issuing Body:</span>
                  <span className="text-white font-semibold">{selectedCert.issuer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Issue Date:</span>
                  <span className="text-cyan-300">{selectedCert.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Credential ID:</span>
                  <span className="text-slate-200 font-mono">{selectedCert.credentialId || 'VERIFIED-RECORD'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verification:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>LinkedIn Authenticated</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <a
                  href={selectedCert.verificationUrl || linkedInProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold text-xs font-mono transition-colors shadow-md cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Verify on LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-medium text-xs font-mono transition-colors cursor-pointer"
                >
                  Close Record View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

