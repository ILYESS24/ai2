'use client';

import React, { useEffect, useRef } from 'react';

export function BackgroundRippleEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createRipple = (e: MouseEvent) => {
      // Throttle ripples to avoid too many
      if (rippleTimeoutRef.current) return;
      
      const ripple = document.createElement('div');
      const rect = container.getBoundingClientRect();
      const size = 200; // Fixed size for better visibility
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 1s ease-out';
      ripple.style.zIndex = '1';

      container.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 1000);

      // Throttle: wait 100ms before allowing next ripple
      rippleTimeoutRef.current = setTimeout(() => {
        rippleTimeoutRef.current = null;
      }, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      createRipple(e);
    };

    // Add event listener to the parent container (main content area)
    const parentElement = container.parentElement;
    if (parentElement) {
      parentElement.addEventListener('mousemove', handleMouseMove);
    }

    // Add CSS animation if not already added
    if (!document.getElementById('ripple-animation-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-animation-style';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(3);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      if (parentElement) {
        parentElement.removeEventListener('mousemove', handleMouseMove);
      }
      if (rippleTimeoutRef.current) {
        clearTimeout(rippleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

