'use client';

import { useEffect, useRef } from 'react';

export function PhoneAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Set canvas size in CSS
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Phone dimensions
    const phoneWidth = 180;
    const phoneHeight = 360;
    const borderRadius = 30;
    const screenWidth = phoneWidth - 20;
    const screenHeight = phoneHeight - 60;
    // const screenX = (rect.width - screenWidth) / 2;
    // const screenY = (rect.height - screenHeight) / 2;

    // Blueprint style
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(14, 165, 233, 0.01)';

    // Animation variables
    let animationFrame: number;
    let startTime: number | null = null;
    const animationDuration = 5000; // 5 seconds for full animation cycle

    // Draw grid
    const drawGrid = () => {
      ctx.beginPath();
      const gridSize = 10;

      for (let x = 0; x < rect.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
      }

      for (let y = 0; y < rect.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
      }

      ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
      ctx.stroke();
    };

    // Draw phone outline
    const drawPhone = (progress: number) => {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw grid
      drawGrid();

      // Draw phone outline
      ctx.beginPath();
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 1.5;

      // Calculate drawing progress
      const phoneOutlineProgress = Math.min(1, progress * 2);

      if (phoneOutlineProgress > 0) {
        // Phone body
        roundedRect(
          ctx,
          centerX - phoneWidth / 2,
          centerY - phoneHeight / 2,
          phoneWidth,
          phoneHeight,
          borderRadius,
          phoneOutlineProgress,
        );

        ctx.stroke();
      }

      // Screen (starts after phone outline is 50% complete)
      if (progress > 0.5) {
        const screenProgress = Math.min(1, (progress - 0.5) * 2);

        ctx.beginPath();
        roundedRect(
          ctx,
          centerX - screenWidth / 2,
          centerY - screenHeight / 2,
          screenWidth,
          screenHeight,
          borderRadius - 10,
          screenProgress,
        );

        ctx.stroke();
      }

      // Components (starts after screen is 50% complete)
      if (progress > 0.75) {
        const componentsProgress = Math.min(1, (progress - 0.75) * 4);

        // Home indicator
        if (componentsProgress > 0.2) {
          ctx.beginPath();
          const homeWidth = 60 * Math.min(1, (componentsProgress - 0.2) * 5);
          ctx.moveTo(centerX - homeWidth / 2, centerY + screenHeight / 2 - 15);
          ctx.lineTo(centerX + homeWidth / 2, centerY + screenHeight / 2 - 15);
          ctx.stroke();
        }

        // Camera notch
        if (componentsProgress > 0.4) {
          ctx.beginPath();
          const notchWidth = 60 * Math.min(1, (componentsProgress - 0.4) * 5);
          const notchHeight = 15 * Math.min(1, (componentsProgress - 0.4) * 5);
          roundedRect(
            ctx,
            centerX - notchWidth / 2,
            centerY - screenHeight / 2 + 5,
            notchWidth,
            notchHeight,
            10,
            1,
          );
          ctx.stroke();
        }

        // React Native logo hint
        if (componentsProgress > 0.6) {
          const logoOpacity = Math.min(1, (componentsProgress - 0.6) * 2.5);
          ctx.globalAlpha = logoOpacity;

          // Atom-like symbol
          const atomRadius = 30;
          ctx.beginPath();
          ctx.ellipse(
            centerX,
            centerY,
            atomRadius,
            atomRadius / 3,
            0,
            0,
            Math.PI * 2,
          );
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(
            centerX,
            centerY,
            atomRadius,
            atomRadius / 3,
            Math.PI / 3,
            0,
            Math.PI * 2,
          );
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(
            centerX,
            centerY,
            atomRadius,
            atomRadius / 3,
            -Math.PI / 3,
            0,
            Math.PI * 2,
          );
          ctx.stroke();

          // Nucleus
          ctx.beginPath();
          ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(14, 165, 233, 0.5)';
          ctx.fill();

          ctx.globalAlpha = 1;
        }

        // Blueprint measurements and labels
        if (componentsProgress > 0.8) {
          const textOpacity = Math.min(1, (componentsProgress - 0.8) * 5);
          ctx.globalAlpha = textOpacity;

          ctx.font = '12px monospace';
          ctx.fillStyle = '#0ea5e9';

          // Width measurement
          ctx.beginPath();
          ctx.moveTo(
            centerX - phoneWidth / 2 - 10,
            centerY - phoneHeight / 2 - 10,
          );
          ctx.lineTo(
            centerX + phoneWidth / 2 + 10,
            centerY - phoneHeight / 2 - 10,
          );
          ctx.stroke();

          ctx.fillText(
            `${phoneWidth}px`,
            centerX - 15,
            centerY - phoneHeight / 2 - 20,
          );

          // Height measurement
          ctx.beginPath();
          ctx.moveTo(
            centerX + phoneWidth / 2 + 10,
            centerY - phoneHeight / 2 - 10,
          );
          ctx.lineTo(
            centerX + phoneWidth / 2 + 10,
            centerY + phoneHeight / 2 + 10,
          );
          ctx.stroke();

          ctx.save();
          ctx.translate(centerX + phoneWidth / 2 + 25, centerY);
          ctx.rotate(Math.PI / 2);
          ctx.fillText(`${phoneHeight}px`, -15, 0);
          ctx.restore();

          ctx.globalAlpha = 1;
        }
      }

      // Draw some blueprint-style dots at corners
      const dotRadius = 2;
      if (progress > 0.9) {
        ctx.fillStyle = '#0ea5e9';

        // Phone corners
        ctx.beginPath();
        ctx.arc(
          centerX - phoneWidth / 2,
          centerY - phoneHeight / 2,
          dotRadius,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          centerX + phoneWidth / 2,
          centerY - phoneHeight / 2,
          dotRadius,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          centerX - phoneWidth / 2,
          centerY + phoneHeight / 2,
          dotRadius,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        ctx.beginPath();
        ctx.arc(
          centerX + phoneWidth / 2,
          centerY + phoneHeight / 2,
          dotRadius,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    };

    // Helper function to draw rounded rectangle with animation progress
    function roundedRect(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
      progress: number,
    ) {
      const totalLength =
        2 * (width + height) + 2 * Math.PI * radius - 8 * radius;
      let currentPos = 0;

      // Top-left corner
      ctx.moveTo(x + radius, y);

      // Top edge
      const topEdgeLength = width - 2 * radius;
      const topEdgeProgress = Math.min(
        1,
        (progress * totalLength - currentPos) / topEdgeLength,
      );
      if (topEdgeProgress > 0) {
        ctx.lineTo(x + radius + topEdgeLength * topEdgeProgress, y);
        if (topEdgeProgress < 1) return;
      }
      currentPos += topEdgeLength;

      // Top-right corner
      const trCornerLength = (radius * Math.PI) / 2;
      const trCornerProgress = Math.min(
        1,
        (progress * totalLength - currentPos) / trCornerLength,
      );
      if (trCornerProgress > 0) {
        ctx.arcTo(x + width, y, x + width, y + radius, radius);
        if (trCornerProgress < 1) return;
      }
      currentPos += trCornerLength;

      // Right edge
      const rightEdgeLength = height - 2 * radius;
      const rightEdgeProgress = Math.min(
        1,
        (progress * totalLength - currentPos) / rightEdgeLength,
      );
      if (rightEdgeProgress > 0) {
        ctx.lineTo(x + width, y + radius + rightEdgeLength * rightEdgeProgress);
        if (rightEdgeProgress < 1) return;
      }
      currentPos += rightEdgeLength;

      // Bottom-right corner
      const brCornerLength = (radius * Math.PI) / 2;
      const brCornerProgress = Math.min(
        1,
        (progress * totalLength - currentPos) / brCornerLength,
      );
      if (brCornerProgress > 0) {
        ctx.arcTo(
          x + width,
          y + height,
          x + width - radius,
          y + height,
          radius,
        );
        if (brCornerProgress < 1) return;
      }
      currentPos += brCornerLength;

      // Bottom edge
      const bottomEdgeLength = width - 2 * radius;
      const bottomEdgeProgress = Math.min(
        1,
        (progress * totalLength - currentPos) / bottomEdgeLength,
      );
      if (bottomEdgeProgress > 0) {
        ctx.lineTo(
          x + width - radius - bottomEdgeLength * bottomEdgeProgress,
          y + height,
        );
        if (bottomEdgeProgress < 1) return;
      }
      currentPos += bottomEdgeLength;

      // Bottom-left corner
      const blCornerLength = (radius * Math.PI) / 2;
      const blCornerProgress = Math.min(
        1,
        (progress * totalLength - currentPos) / blCornerLength,
      );
      if (blCornerProgress > 0) {
        ctx.arcTo(x, y + height, x, y + height - radius, radius);
        if (blCornerProgress < 1) return;
      }
      currentPos += blCornerLength;

      // Left edge
      const leftEdgeLength = height - 2 * radius;
      const leftEdgeProgress = Math.min(
        1,
        (progress * totalLength - currentPos) / leftEdgeLength,
      );
      if (leftEdgeProgress > 0) {
        ctx.lineTo(x, y + height - radius - leftEdgeLength * leftEdgeProgress);
        if (leftEdgeProgress < 1) return;
      }
      currentPos += leftEdgeLength;

      // Top-left corner (closing)
      const tlCornerLength = (radius * Math.PI) / 2;
      const tlCornerProgress = Math.min(
        1,
        (progress * totalLength - currentPos) / tlCornerLength,
      );
      if (tlCornerProgress > 0) {
        ctx.arcTo(x, y, x + radius, y, radius);
      }
    }

    // Animation runs once
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate progress (0 to 1) capped at 1
      const progress = Math.min(1, elapsed / animationDuration);

      drawPhone(progress);

      // Continue animation until complete
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Start animation
    animationFrame = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md aspect-square">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
