import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Linkedin,
  Github,
  Code2,
  Instagram,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  MessageSquare,
  Shield,
  Sparkles,
  ArrowUpRight,
  Paperclip,
  Image as ImageIcon,
  FileText,
  File as FileIcon,
  UploadCloud,
  X,
  Plus,
  AlertCircle,
} from 'lucide-react';
import { portfolioData, SocialLink } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/useReducedMotion';

interface AttachedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  category: 'photo' | 'document' | 'file';
  previewUrl?: string;
  base64Data?: string;
}

export const Contact: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeAcceptFilter, setActiveAcceptFilter] = useState<string>('*/*');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Cybersecurity Inquiry for Riyaz Mohmmad',
    message: '',
  });
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyTemplate = (index: number) => {
    const template = portfolioData.contactSection.inquiryTemplates[index];
    if (template) {
      setSelectedTemplateIndex(index);
      setFormData((prev) => ({
        ...prev,
        subject: template.subject,
        message: template.message,
      }));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const determineCategory = (file: File): 'photo' | 'document' | 'file' => {
    if (file.type.startsWith('image/')) return 'photo';
    if (
      file.type === 'application/pdf' ||
      file.type.includes('document') ||
      file.type.includes('word') ||
      file.type.includes('text') ||
      file.name.endsWith('.pdf') ||
      file.name.endsWith('.docx') ||
      file.name.endsWith('.doc') ||
      file.name.endsWith('.txt') ||
      file.name.endsWith('.rtf')
    ) {
      return 'document';
    }
    return 'file';
  };

  const processFiles = (files: FileList | File[]) => {
    setFileError(null);
    const newFiles: AttachedFile[] = [];
    const maxFiles = 5;
    const maxSizeBytes = 15 * 1024 * 1024; // 15MB total limit

    let currentTotalSize = attachedFiles.reduce((acc, curr) => acc + curr.size, 0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (attachedFiles.length + newFiles.length >= maxFiles) {
        setFileError(`Maximum limit of ${maxFiles} files reached.`);
        break;
      }

      if (currentTotalSize + file.size > maxSizeBytes) {
        setFileError('Total attachment payload exceeds 15 MB limit.');
        break;
      }

      currentTotalSize += file.size;
      const category = determineCategory(file);
      const id = `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const previewUrl = category === 'photo' ? URL.createObjectURL(file) : undefined;

      newFiles.push({
        id,
        file,
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        category,
        previewUrl,
      });
    }

    if (newFiles.length > 0) {
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    // reset input so same file can be re-selected if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerUpload = (acceptPattern: string) => {
    setActiveAcceptFilter(acceptPattern);
    setFileError(null);
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.accept = acceptPattern;
        fileInputRef.current.click();
      }
    }, 50);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (id: string) => {
    setAttachedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
    setFileError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const emailTarget = portfolioData.personal.email || "riyazmohmmad80@gmail.com";
    
    // Format attachment summary for email body
    const attachmentSummary = attachedFiles.length > 0
      ? `\n\n[Attached Items (${attachedFiles.length})]:\n` +
        attachedFiles
          .map((f, i) => `${i + 1}. [${f.category.toUpperCase()}] ${f.name} (${formatFileSize(f.size)})`)
          .join('\n')
      : '';

    const mailtoUrl = `mailto:${emailTarget}?subject=${encodeURIComponent(
      formData.subject || "Cybersecurity Inquiry for Riyaz Mohmmad"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}${attachmentSummary}`
    )}`;

    try {
      // Direct async dispatch to riyazmohmmad80@gmail.com via FormSubmit API
      const res = await fetch(`https://formsubmit.co/ajax/${emailTarget}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Cybersecurity Portfolio Inquiry',
          message: formData.message,
          attachments: attachedFiles.map((f) => ({
            name: f.name,
            size: formatFileSize(f.size),
            category: f.category,
            type: f.type,
          })),
          _subject: `[Portfolio Inquiry] ${formData.subject || 'Message for Riyaz Mohmmad'}`,
          _replyto: formData.email,
          _template: 'table',
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: 'Cybersecurity Inquiry for Riyaz Mohmmad',
          message: '',
        });
        setAttachedFiles([]);
        setSelectedTemplateIndex(null);
      } else {
        // Fallback to mail client if service returns non-200
        window.location.href = mailtoUrl;
        setSubmitSuccess(true);
      }
    } catch {
      // In case of offline or network interruption, launch mail client directly
      window.location.href = mailtoUrl;
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 7000);
    }
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(portfolioData.personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const renderSocialIcon = (icon: SocialLink['icon']) => {
    switch (icon) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'leetcode':
        return <Code2 className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'mail':
        return <Mail className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const totalAttachmentSize = attachedFiles.reduce((acc, curr) => acc + curr.size, 0);

  return (
    <section
      id="contact"
      aria-label="Contact Riyaz Mohmmad"
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400 mb-3"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>07 // INQUIRY_AND_COMMS</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
          >
            {portfolioData.contactSection.heading}
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base leading-relaxed"
          >
            {portfolioData.contactSection.description}
          </motion.p>
        </div>

        {/* Quick Email Inquiry Bento Showcase */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8 p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-cyan-500/30 backdrop-blur-md shadow-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                  QUICK_EMAIL_INQUIRY
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Select an Inquiry Template to Pre-fill Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Click any inquiry type to automatically format your message or launch your mail client:
              </p>
            </div>

            {/* Direct Email Compose Button */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`mailto:${portfolioData.personal.email}?subject=Cybersecurity%20Inquiry%20for%20Riyaz%20Mohmmad`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all duration-200 shadow-md shadow-cyan-950/40 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-950/80 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs border border-slate-800 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preset Inquiry Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-800/80">
            {portfolioData.contactSection.inquiryTemplates.map((tpl, i) => (
              <button
                key={tpl.label}
                type="button"
                onClick={() => handleApplyTemplate(i)}
                className={`text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer font-mono ${
                  selectedTemplateIndex === i
                    ? 'bg-cyan-950/70 border-cyan-500/80 text-cyan-200 shadow-sm'
                    : 'bg-slate-950/70 hover:bg-slate-900 border-slate-800 text-slate-300 hover:text-cyan-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{tpl.label}</span>
                  <Sparkles className="w-3 h-3 text-cyan-400 opacity-70" />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{tpl.subject}</p>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Connection Channels Bento Card */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 sm:p-9 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-xl bento-card-glow">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>Direct Contact</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-mono">
                Encrypted communication channels & public professional profiles.
              </p>

              {/* Social Channels List */}
              <div className="space-y-3">
                {portfolioData.socials.map((social) => (
                  <div
                    key={social.name}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                        {renderSocialIcon(social.icon)}
                      </div>
                      <div>
                        <p className="text-xs font-mono text-slate-400 uppercase">
                          {social.name}
                        </p>
                        <p className="text-xs font-medium text-slate-200 truncate max-w-[170px] sm:max-w-[200px]">
                          {social.value || social.label}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {social.icon === 'mail' && (
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors cursor-pointer"
                          title="Copy email to clipboard"
                          aria-label="Copy email address"
                        >
                          {copiedEmail ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      )}

                      <a
                        href={social.url}
                        target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                        rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors cursor-pointer"
                        aria-label={`Open ${social.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Note */}
              <div className="mt-6 pt-5 border-t border-slate-800/60 flex items-center gap-2.5 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Response Time: Typically within 24–48 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form Bento Card */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Send a Message Inquiry</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-mono">
                Fill in the form to send your inquiry directly to {portfolioData.personal.email}.
              </p>

              {/* Success Notification */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 flex items-center gap-3 mb-6 shadow-xl text-sm font-mono"
                    role="alert"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold text-emerald-300">✓ Message Dispatched Successfully!</p>
                      <p className="text-xs text-emerald-400/90 mt-0.5">
                        Your inquiry has been sent directly to <span className="underline font-semibold">{portfolioData.personal.email}</span>.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2"
                    >
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2"
                    >
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. alex@security.org"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Internship Inquiry"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2"
                  >
                    Inquiry Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your inquiry, internship details, research topic, or questions..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                  />
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden"
                  aria-label="Upload file attachment"
                />

                {/* Photo / File / Document Attachment Module */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Attachments (Photo / Document / File)</span>
                    </span>
                    {attachedFiles.length > 0 && (
                      <span className="text-[11px] font-mono text-cyan-400">
                        {attachedFiles.length} file{attachedFiles.length > 1 ? 's' : ''} ({formatFileSize(totalAttachmentSize)})
                      </span>
                    )}
                  </div>

                  {/* Attachment Quick Buttons */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => triggerUpload('image/*')}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all duration-200 cursor-pointer shadow-sm"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="truncate">Add Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => triggerUpload('.pdf,.doc,.docx,.txt,.rtf,application/pdf')}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-blue-300 text-xs font-mono transition-all duration-200 cursor-pointer shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span className="truncate">Add Document</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => triggerUpload('*/*')}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-purple-300 text-xs font-mono transition-all duration-200 cursor-pointer shadow-sm"
                    >
                      <FileIcon className="w-3.5 h-3.5 text-purple-400" />
                      <span className="truncate">Attach File</span>
                    </button>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => triggerUpload('*/*')}
                    className={`relative rounded-2xl border-2 border-dashed p-4 text-center transition-all duration-200 cursor-pointer ${
                      isDragging
                        ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-950/80'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-cyan-400">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-slate-300 font-medium">
                        Drag & drop photos, documents (PDF/DOC), or any files here
                      </p>
                      <p className="text-[10px] font-mono text-slate-500">
                        PNG, JPG, PDF, DOCX, ZIP up to 15 MB total (Max 5 files)
                      </p>
                    </div>
                  </div>

                  {/* Error Notification */}
                  <AnimatePresence>
                    {fileError && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2.5 p-2.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-mono flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{fileError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Attached Files List */}
                  {attachedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {attachedFiles.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {item.previewUrl ? (
                              <img
                                src={item.previewUrl}
                                alt={item.name}
                                className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                              />
                            ) : item.category === 'document' ? (
                              <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
                                <FileText className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0">
                                <FileIcon className="w-4 h-4" />
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-[300px]">
                                {item.name}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span className="uppercase text-cyan-400 font-bold">{item.category}</span>
                                <span>•</span>
                                <span>{formatFileSize(item.size)}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveFile(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors cursor-pointer"
                            title="Remove attachment"
                            aria-label={`Remove ${item.name}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/25 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Dispatching Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>
                        Send Inquiry Message
                        {attachedFiles.length > 0 && ` (${attachedFiles.length} Attachment${attachedFiles.length > 1 ? 's' : ''})`}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

