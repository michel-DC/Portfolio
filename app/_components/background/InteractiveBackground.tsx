"use client";
import { useEffect, useRef } from "react";

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gradientRadius = 200;

    const draw = (x: number, y: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, gradientRadius);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.15)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      draw(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-10] mix-blend-overlay opacity-50"
    />
  );
};

export default InteractiveBackground;
