"use client";
import React, { useEffect, useRef } from "react";

export function BackgroundRippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    rippleX: number;
    rippleY: number;
    rippleSize: number;
    rippleOpacity: number;
  }>>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      console.error("Canvas or container not found!");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Cannot get 2d context!");
      return;
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const boxSize = 50;
      const gap = 4;
      const boxes: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
        rippleX: number;
        rippleY: number;
        rippleSize: number;
        rippleOpacity: number;
      }> = [];

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
      boxesRef.current = boxes;
      console.log(`Created ${boxes.length} boxes`);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      boxesRef.current.forEach((box) => {
        if (
          mouseX >= box.x &&
          mouseX <= box.x + box.width &&
          mouseY >= box.y &&
          mouseY <= box.y + box.height
        ) {
          box.rippleX = mouseX - box.x;
          box.rippleY = mouseY - box.y;
          box.rippleSize = 10;
          box.rippleOpacity = 1.0;
          console.log("Ripple created at:", box.rippleX, box.rippleY);
        }
      });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      boxesRef.current.forEach((box) => {
        if (
          mouseX >= box.x &&
          mouseX <= box.x + box.width &&
          mouseY >= box.y &&
          mouseY <= box.y + box.height
        ) {
          box.rippleX = box.width / 2;
          box.rippleY = box.height / 2;
          box.rippleSize = 10;
          box.rippleOpacity = 1.0;
          console.log("Click ripple created");
        }
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      if (frameCount % 60 === 0) {
        console.log("Animation running, frame:", frameCount);
      }

      // Clear canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let activeRipples = 0;
      boxesRef.current.forEach((box) => {
        // Draw box border - WHITE for visibility
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 1;
        ctx.strokeRect(box.x, box.y, box.width, box.height);

        // Draw ripple effect
        if (box.rippleOpacity > 0 && box.rippleX >= 0 && box.rippleY >= 0) {
          activeRipples++;
          const maxSize = Math.max(box.width, box.height) * 4;
          
          if (box.rippleSize < maxSize && box.rippleOpacity > 0) {
            // Create very visible gradient - BRIGHT WHITE
            const gradient = ctx.createRadialGradient(
              box.x + box.rippleX,
              box.y + box.rippleY,
              0,
              box.x + box.rippleX,
              box.y + box.rippleY,
              box.rippleSize
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${Math.min(box.rippleOpacity, 1)})`);
            gradient.addColorStop(0.2, `rgba(255, 255, 255, ${box.rippleOpacity * 0.8})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${box.rippleOpacity * 0.5})`);
            gradient.addColorStop(0.8, `rgba(255, 255, 255, ${box.rippleOpacity * 0.2})`);
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

            // Animate ripple - very fast
            box.rippleSize += 20;
            box.rippleOpacity -= 0.08;

            if (box.rippleOpacity <= 0 || box.rippleSize >= maxSize) {
              box.rippleSize = 0;
              box.rippleOpacity = 0;
              box.rippleX = -1;
              box.rippleY = -1;
            }
          } else {
            box.rippleSize = 0;
            box.rippleOpacity = 0;
            box.rippleX = -1;
            box.rippleY = -1;
          }
        }
      });

      if (activeRipples > 0 && frameCount % 10 === 0) {
        console.log("Active ripples:", activeRipples);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation immediately
    console.log("Starting animation...");
    animate();

    return () => {
      console.log("Cleaning up...");
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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
