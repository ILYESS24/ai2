'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Box {
  id: string;
  x: number;
  y: number;
}

export function BackgroundRippleEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const boxSize = 50;
  const gap = 4;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateBoxes = () => {
      const rect = container.getBoundingClientRect();
      const cols = Math.ceil(rect.width / (boxSize + gap));
      const rows = Math.ceil(rect.height / (boxSize + gap));
      
      const newBoxes: Box[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          newBoxes.push({
            id: `${row}-${col}`,
            x: col * (boxSize + gap),
            y: row * (boxSize + gap),
          });
        }
      }
      setBoxes(newBoxes);
    };

    updateBoxes();
    window.addEventListener('resize', updateBoxes);

    return () => {
      window.removeEventListener('resize', updateBoxes);
    };
  }, []);

  const createRipple = (e: React.MouseEvent<HTMLDivElement>, boxId: string) => {
    const boxElement = e.currentTarget;
    const ripple = document.createElement('div');
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const size = boxSize * 2;
    const x = e.clientX - containerRect.left - size / 2;
    const y = e.clientY - containerRect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.8s ease-out';
    ripple.style.zIndex = '10';

    const container = containerRef.current;
    if (container) {
      container.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 800);
    }
  };

  // Add CSS animation if not already added
  useEffect(() => {
    if (!document.getElementById('ripple-animation-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-animation-style';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    >
      {boxes.map((box) => (
        <div
          key={box.id}
          onClick={(e) => createRipple(e, box.id)}
          className="absolute border border-[#1a1a1a]/30 hover:border-[#2a2a2a]/50 transition-colors cursor-pointer"
          style={{
            left: `${box.x}px`,
            top: `${box.y}px`,
            width: `${boxSize}px`,
            height: `${boxSize}px`,
            backgroundColor: 'transparent',
          }}
        />
      ))}
    </div>
  );
}
