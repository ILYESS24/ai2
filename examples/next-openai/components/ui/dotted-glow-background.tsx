'use client';

import React, { useEffect, useRef } from 'react';

interface DottedGlowBackgroundProps {
  className?: string;
  opacity?: number;
  gap?: number;
  radius?: number;
  colorLightVar?: string;
  glowColorLightVar?: string;
  colorDarkVar?: string;
  glowColorDarkVar?: string;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
}

export function DottedGlowBackground({
  className = '',
  opacity = 0.5,
  gap = 10,
  radius = 1.6,
  colorLightVar = '--color-neutral-500',
  glowColorLightVar = '--color-neutral-600',
  colorDarkVar = '--color-neutral-500',
  glowColorDarkVar = '--color-sky-800',
  backgroundOpacity = 0,
  speedMin = 0.3,
  speedMax = 1.6,
  speedScale = 1,
}: DottedGlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Get colors from CSS variables or defaults
    const getColor = (varName: string, defaultColor: string) => {
      if (typeof window !== 'undefined') {
        const computedStyle = getComputedStyle(document.documentElement);
        const color = computedStyle.getPropertyValue(varName).trim();
        return color || defaultColor;
      }
      return defaultColor;
    };

    // Use white dots for dark theme
    const dotColor = 'rgba(255, 255, 255, 0.15)';
    const glowColor = 'rgba(255, 255, 255, 0.3)';

    // Create dots array
    const dots: Array<{
      x: number;
      y: number;
      speed: number;
      radius: number;
      phaseX: number;
      phaseY: number;
    }> = [];

    const cols = Math.ceil(canvas.width / gap);
    const rows = Math.ceil(canvas.height / gap);

    // Initialize dots
    for (let i = 0; i < cols * rows; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const speed = (Math.random() * (speedMax - speedMin) + speedMin) * speedScale;
      
      dots.push({
        x: col * gap + gap / 2,
        y: row * gap + gap / 2,
        speed,
        radius: radius * (0.5 + Math.random() * 0.5),
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.01;

      dots.forEach((dot) => {
        // Animate position with more visible movement
        const offsetX = Math.sin(time * dot.speed + dot.phaseX) * 3;
        const offsetY = Math.cos(time * dot.speed + dot.phaseY) * 3;

        const x = dot.x + offsetX;
        const y = dot.y + offsetY;

        // Draw glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, dot.radius * 3);
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(0.5, dotColor);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, dot.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw dot
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(x, y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gap, radius, opacity, speedMin, speedMax, speedScale]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity }}
    />
  );
}

