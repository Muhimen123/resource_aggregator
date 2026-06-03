import React from "react";

interface RetroFrameProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export default function RetroFrame({
  children,
  header,
  className = "",
}: RetroFrameProps) {
  return (
    <div
      className={`relative flex flex-col ${className}`}
      style={{
        border: "2.5px solid #EAD09D",
        borderRadius: "12px",
        background: "rgba(20, 25, 20, 0.65)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow:
          "0 15px 35px rgba(0, 0, 0, 0.7), inset 0 0 20px rgba(234, 208, 157, 0.15)",
      }}
    >
      {/* Tab header pinned at the top */}
      {header && (
        <div
          className="w-full flex-shrink-0"
          style={{ borderBottom: "2.5px solid #EAD09D" }}
        >
          {header}
        </div>
      )}

      {/* Body — overflow-hidden so inner viewer owns scrolling */}
      <div
        className="relative w-full flex-1 overflow-hidden"
        style={{ minHeight: 0 }}
      >
        {children}
      </div>
    </div>
  );
}
