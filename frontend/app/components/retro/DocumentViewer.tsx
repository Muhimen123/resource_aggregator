"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import AnnotationCanvas from "./AnnotationCanvas";

// ── Types ────────────────────────────────────────────────────────────────────
interface DocumentViewerProps {
  resourceId: string;
  totalPages: number;
  initialProgress?: number;
  resourceType?: string;
  mediaUrl?: string;
  onProgressUpdate: (progressPct: number) => void;
}

type Tool = "pan" | "pen" | "highlight" | "eraser";

const COLORS = ["#FFE066", "#FF6B6B", "#6BCEFF", "#B5FF6B", "#FF9EFF", "#FFFFFF"];
const BRUSH_SIZES = [2, 5, 10];

// ── Annotation Toolbar ───────────────────────────────────────────────────────
function AnnotationToolbar({
  tool,
  color,
  brushSize,
  onToolChange,
  onColorChange,
  onBrushSizeChange,
  onClearPage,
}: {
  tool: Tool;
  color: string;
  brushSize: number;
  onToolChange: (t: Tool) => void;
  onColorChange: (c: string) => void;
  onBrushSizeChange: (s: number) => void;
  onClearPage: () => void;
}) {
  const btnBase: React.CSSProperties = {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "9px",
    padding: "6px 10px",
    border: "2px solid #EAD09D",
    borderRadius: "6px",
    color: "#EAD09D",
    background: "transparent",
    cursor: "pointer",
    transition: "background 0.15s",
    outline: "none",
  };

  const activeBtnStyle: React.CSSProperties = {
    ...btnBase,
    background: "rgba(234, 208, 157, 0.2)",
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-2 flex-wrap select-none"
      style={{
        borderBottom: "2px solid rgba(234, 208, 157, 0.2)",
        background: "rgba(0,0,0,0.2)",
      }}
    >
      {/* Tool buttons */}
      <div className="flex gap-2">
        {(["pan", "pen", "highlight", "eraser"] as Tool[]).map((t) => (
          <button
            key={t}
            onClick={() => onToolChange(t)}
            style={tool === t ? activeBtnStyle : btnBase}
          >
            {t === "pan" ? "✋ PAN" : t === "pen" ? "✏ PEN" : t === "highlight" ? "🖊 MARK" : "⌫ ERASE"}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, background: "rgba(234,208,157,0.3)" }} />

      {/* Color swatches */}
      <div className="flex items-center gap-1">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => onColorChange(c)}
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: c,
              border: color === c ? "2.5px solid #fff" : "2px solid transparent",
              cursor: "pointer",
              outline: "none",
              padding: 0,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, background: "rgba(234,208,157,0.3)" }} />

      {/* Brush size */}
      <div className="flex items-center gap-2">
        {BRUSH_SIZES.map((s) => (
          <button
            key={s}
            onClick={() => onBrushSizeChange(s)}
            style={{
              width: s === 2 ? 10 : s === 5 ? 14 : 18,
              height: s === 2 ? 10 : s === 5 ? 14 : 18,
              borderRadius: "50%",
              background: brushSize === s ? "#EAD09D" : "transparent",
              border: "2px solid #EAD09D",
              cursor: "pointer",
              outline: "none",
              padding: 0,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, background: "rgba(234,208,157,0.3)" }} />

      {/* Clear page */}
      <button onClick={onClearPage} style={btnBase}>
        🗑 CLEAR
      </button>
    </div>
  );
}

// ── Main Document Viewer ─────────────────────────────────────────────────────
export default function DocumentViewer({
  resourceId,
  totalPages,
  initialProgress = 0,
  resourceType,
  mediaUrl,
  onProgressUpdate,
}: DocumentViewerProps) {
  const [currentPage, setCurrentPage] = useState<number>(
    Math.max(1, Math.floor((initialProgress / 100) * totalPages))
  );
  const [tool, setTool] = useState<Tool>("pan");
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1]);
  const [clearSignal, setClearSignal] = useState<number[]>([]);
  const [isDraggingPan, setIsDraggingPan] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const pagesContainerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

  const isPanning = useRef(false);
  const lastPanPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isPanning.current || !pagesContainerRef.current) return;
      const dx = e.clientX - lastPanPos.current.x;
      const dy = e.clientY - lastPanPos.current.y;
      lastPanPos.current = { x: e.clientX, y: e.clientY };
      pagesContainerRef.current.scrollTop -= dy;
      pagesContainerRef.current.scrollLeft -= dx;
    };

    const handleWindowMouseUp = () => {
      if (isPanning.current) {
        isPanning.current = false;
        setIsDraggingPan(false);
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (tool !== "pan") return;
    isPanning.current = true;
    setIsDraggingPan(true);
    lastPanPos.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  const reportProgress = useCallback(
    (page: number) => {
      const pct = Math.floor((page / totalPages) * 100);
      onProgressUpdate(pct);

      fetch(`/api/resources/${resourceId}/progress`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": "123e4567-e89b-12d3-a456-426614174000",
        },
        body: JSON.stringify({ currentSlide: page, totalSlides: totalPages }),
      }).catch(err => console.error("Failed to save progress", err));
    },
    [resourceId, totalPages, onProgressUpdate]
  );

  const handleMediaTimeUpdate = () => {
    if (!mediaRef.current) return;
    const pct = Math.floor((mediaRef.current.currentTime / (mediaRef.current.duration || 1)) * 100);
    onProgressUpdate(pct);

    if (pct % 5 === 0) {
      fetch(`/api/resources/${resourceId}/progress`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-User-Id": "123e4567-e89b-12d3-a456-426614174000" },
        body: JSON.stringify({ currentSlide: pct, totalSlides: 100 }),
      }).catch(err => console.error("Failed to save media progress", err));
    }
  };

  const currentPageRef = useRef(currentPage);
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    if (!pagesContainerRef.current) return;
    if (resourceType === "VIDEO" || resourceType === "AUDIO") return;

    // Small defer to ensure page divs are in the DOM
    const timer = setTimeout(() => {
      if (!pagesContainerRef.current) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const pageNum = parseInt((entry.target as HTMLElement).dataset.page || "1", 10);
            if (pageNum !== currentPageRef.current) {
              setCurrentPage(pageNum);
              reportProgress(pageNum);
            }
          });
        },
        {
          root: pagesContainerRef.current,
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );

      const images = pagesContainerRef.current.querySelectorAll(".document-page-img");
      images.forEach(img => observerRef.current?.observe(img));
    }, 100);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [reportProgress, resourceType, totalPages]);

  // ── Video / Audio players ────────────────────────────────────────────────
  if (resourceType === "VIDEO") {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <video
          ref={mediaRef as React.Ref<HTMLVideoElement>}
          controls
          className="max-w-full max-h-[80vh] shadow-xl bg-black"
          onTimeUpdate={handleMediaTimeUpdate}
          src={mediaUrl}
        />
      </div>
    );
  }

  if (resourceType === "AUDIO") {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <audio
          ref={mediaRef as React.Ref<HTMLAudioElement>}
          controls
          className="w-full max-w-2xl shadow-xl"
          onTimeUpdate={handleMediaTimeUpdate}
          src={mediaUrl}
        />
      </div>
    );
  }

  // ── Document viewer with annotation toolbar ──────────────────────────────
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* Annotation toolbar */}
      <AnnotationToolbar
        tool={tool}
        color={color}
        brushSize={brushSize}
        onToolChange={setTool}
        onColorChange={setColor}
        onBrushSizeChange={setBrushSize}
        onClearPage={() => setClearSignal(prev => [...prev, currentPage])}
      />

      {/* Scrollable pages */}
      <div
        ref={pagesContainerRef}
        className="document-scroll-container flex flex-col items-center flex-1 gap-6 py-6 px-4 overflow-y-scroll overflow-x-hidden min-h-0"
        style={{
          cursor: tool === "pan" ? (isDraggingPan ? "grabbing" : "grab") : tool === "eraser" ? "cell" : "crosshair",
        }}
        onMouseDown={handleMouseDown}
      >
        {pages.map(pageNum => (
          <PageWithCanvas
            key={pageNum}
            pageNum={pageNum}
            resourceId={resourceId}
            tool={tool}
            color={color}
            brushSize={brushSize}
            clearSignal={clearSignal.filter(p => p === pageNum).length}
          />
        ))}
      </div>
    </div>
  );
}

// ── Single page + canvas overlay ─────────────────────────────────────────────
function PageWithCanvas({
  pageNum,
  resourceId,
  tool,
  color,
  brushSize,
  clearSignal,
}: {
  pageNum: number;
  resourceId: string;
  tool: Tool;
  color: string;
  brushSize: number;
  clearSignal: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevClearSignal = useRef(0);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (clearSignal > prevClearSignal.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      prevClearSignal.current = clearSignal;
    }
  }, [clearSignal]);

  const getPos = (e: React.MouseEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDraw = (e: React.MouseEvent) => {
    if (tool === "pan") return;
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    lastPos.current = getPos(e, canvas);
    e.preventDefault();
  };

  const onDraw = (e: React.MouseEvent) => {
    if (!isDrawing.current || tool === "pan") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !lastPos.current) return;

    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = brushSize * 3;
      ctx.globalAlpha = 1;
    } else if (tool === "highlight") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize * 2.5;
      ctx.globalAlpha = 0.35;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.globalAlpha = 1;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    lastPos.current = pos;
  };

  const stopDraw = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  return (
    <div
      data-page={pageNum}
      className="document-page-img relative w-full max-w-4xl"
      style={{
        background: "#fff",
        borderRadius: 4,
        border: "2px solid rgba(234, 208, 157, 0.3)",
        minHeight: 500,
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        cursor: "inherit",
      }}
      onMouseDown={startDraw}
      onMouseMove={onDraw}
      onMouseUp={stopDraw}
      onMouseLeave={stopDraw}
    >
      <img
        src={`/api/resources/${resourceId}/slides/${pageNum}`}
        alt={`Page ${pageNum}`}
        loading="lazy"
        className="w-full h-auto object-contain block select-none"
        style={{ display: "block", minHeight: 500, pointerEvents: "none" }}
        draggable={false}
      />
      <AnnotationCanvas
        pageNum={pageNum}
        tool={tool}
        color={color}
        brushSize={brushSize}
        ref={canvasRef}
      />
    </div>
  );
}

