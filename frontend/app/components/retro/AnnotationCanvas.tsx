"use client";

import React, {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

interface AnnotationCanvasProps {
  tool: "pan" | "highlight" | "pen" | "eraser";
  color: string;
  brushSize: number;
  pageNum: number;
}

// Canvas is purely a drawing surface — pointer-events are handled by the parent div
const AnnotationCanvas = forwardRef<HTMLCanvasElement, AnnotationCanvasProps>(
  function AnnotationCanvas({ tool, color, brushSize }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current!, []);

    // Keep canvas bitmap dimensions in sync with its CSS size
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ro = new ResizeObserver(() => {
        const snapshot = canvas.toDataURL();
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        if (snapshot === "data:,") return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const img = new Image();
        img.src = snapshot;
        img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      });

      ro.observe(canvas);
      return () => ro.disconnect();
    }, []);

    return (
      <canvas
        ref={canvasRef}
        // pointer-events: none — the parent div handles all mouse/touch events
        // so scroll events pass through to the scroll container naturally
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    );
  }
);

export default AnnotationCanvas;
