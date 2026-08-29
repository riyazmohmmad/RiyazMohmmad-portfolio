import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/useReducedMotion';

export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Reduced density for clean, professional cybersecurity aesthetic
    const nodeCount = Math.min(Math.floor(width / 35), 45);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      pulseSpeed: number;
      pulseOffset: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1.2,
        opacity: Math.random() * 0.35 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connections
      const maxDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = Math.sin(time * node.pulseSpeed * 20 + node.pulseOffset);
        const currentAlpha = node.opacity + pulse * 0.1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${Math.max(0.05, currentAlpha)})`;
        ctx.fill();

        // Position update
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0) node.x = width;
          else if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          else if (node.y > height) node.y = 0;
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dark background base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Bento grid overlay */}
      <div className="absolute inset-0 bento-grid-bg opacity-70" />
      <div className="absolute inset-0 bento-dots opacity-40" />

      {/* Ambient glowing radial spots */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-950/20 blur-[130px] animate-pulse-slow" />
      <div className="absolute top-[40%] right-[-5%] w-[450px] h-[450px] rounded-full bg-blue-950/20 blur-[140px] animate-pulse-slow" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-indigo-950/20 blur-[120px] animate-pulse-slow" />

      {/* Interactive canvas for subtle nodes & connections */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-65" />
    </div>
  );
};
