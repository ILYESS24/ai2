"use client";
import React, { useEffect, useRef } from "react";

export function BackgroundRippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let boxes: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      rippleX: number;
      rippleY: number;
      rippleSize: number;
      rippleOpacity: number;
    }> = [];

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const boxSize = 50;
      const gap = 4;
      boxes = [];

      const cols = Math.ceil(canvas.width / (boxSize + gap));
      const rows = Math.ceil(canvas.height / (boxSize + gap));

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          boxes.push({
            x: col * (boxSize + gap),
            y: row * (boxSize + gap),
            width: boxSize,
            height: boxSize,
            rippleX: -1,
            rippleY: -1,
            rippleSize: 0,
            rippleOpacity: 0,
          });
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      boxes.forEach((box) => {
        if (
          mouseX >= box.x &&
          mouseX <= box.x + box.width &&
          mouseY >= box.y &&
          mouseY <= box.y + box.height
        ) {
          box.rippleX = mouseX - box.x;
          box.rippleY = mouseY - box.y;
          box.rippleSize = 0;
          box.rippleOpacity = 0.6;
        }
      });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      boxes.forEach((box) => {
        if (
          mouseX >= box.x &&
          mouseX <= box.x + box.width &&
          mouseY >= box.y &&
          mouseY <= box.y + box.height
        ) {
          box.rippleX = box.width / 2;
          box.rippleY = box.height / 2;
          box.rippleSize = 0;
          box.rippleOpacity = 0.6;
        }
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      boxes.forEach((box) => {
        // Draw box border
        ctx.strokeStyle = "rgba(26, 26, 26, 0.3)";
        ctx.lineWidth = 1;
        ctx.strokeRect(box.x, box.y, box.width, box.height);

        // Draw ripple effect
        if (box.rippleOpacity > 0 && box.rippleX >= 0 && box.rippleY >= 0) {
          const gradient = ctx.createRadialGradient(
            box.x + box.rippleX,
            box.y + box.rippleY,
            0,
            box.x + box.rippleX,
            box.y + box.rippleY,
            box.rippleSize
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${box.rippleOpacity})`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${box.rippleOpacity * 0.5})`);
          gradient.addColorStop(1, "transparent");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(
            box.x + box.rippleX,
            box.y + box.rippleY,
            box.rippleSize,
            0,
            Math.PI * 2
          );
          ctx.fill();

          // Animate ripple
          box.rippleSize += 8;
          box.rippleOpacity -= 0.02;

          if (box.rippleOpacity <= 0) {
            box.rippleSize = 0;
            box.rippleX = -1;
            box.rippleY = -1;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
