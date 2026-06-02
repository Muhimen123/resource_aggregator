"use client";

interface ProgressHeaderProps {
  progressValue?: number;
  likeCount?: number;
  onBack?: () => void;
}

const BACK_ARROW_SIZE = 36;

function PixelBackArrow() {
  return (
    <svg
      width={BACK_ARROW_SIZE}
      height={Math.round(BACK_ARROW_SIZE * 0.78)}
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      <path
        d="M4 0h1v1H4V0zm-1 1h1v1H3V1zm2 0h1v1H5V1zm-3 1h1v1H2V2zm4 0h1v1H6V2zm-5 1h5v1H1V3zm6 0h7v1H7V3zM0 4h1v3H0V4zm13 0h1v3h-1V4zm-12 3h1v1H1V7zm6 0h7v1H7V7zm-5 1h1v1H2V8zm4 0h1v1H6V8zm-3 1h1v1H3V9zm2 0h1v1H5V9zm-1 1h1v1H4V10z"
        fill="#EAD09D"
      />
      <path
        d="M4 1h1v1H4V1zm-1 1h3v1H3V2zm-1 1h5v1H2V3zm-1 1h12v3H1V4zm1 3h5v1H2V7zm1 1h3v1H3V8zm1 1h1v1H4V9z"
        fill="#3D4030"
      />
    </svg>
  );
}

const HEART_SIZE = 32;
const POTION_SIZE = 44;

export default function ProgressHeader({
  progressValue = 70,
  likeCount = 102,
  onBack,
}: ProgressHeaderProps) {
  const totalHearts = 10;
  const filledCount = Math.round(progressValue / 10);

  const handleBack = onBack ?? (() => window.history.back());

  return (
    <div
      className="flex items-end justify-between w-full select-none"
      style={{ padding: "12px 4px 8px" }}
    >
      {/* Left: back arrow → title → hearts */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="bg-transparent border-none p-0 cursor-pointer flex items-center justify-center"
          style={{ transition: "opacity 150ms" }}
          aria-label="Go back"
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <PixelBackArrow />
        </button>

        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "18px",
            lineHeight: "1",
            color: "#EAD09D",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Progress Bar
        </span>

        <div className="flex items-center" style={{ gap: "4px", marginLeft: "12px" }}>
          {Array.from({ length: totalHearts }).map((_, i) => (
            <img
              key={i}
              src={i < filledCount ? "/assets/heart.png" : "/assets/heart_empty.png"}
              alt={i < filledCount ? "Heart" : "Empty heart"}
              width={HEART_SIZE}
              height={HEART_SIZE}
              style={{ imageRendering: "pixelated" }}
            />
          ))}
        </div>
      </div>

      {/* Right: potion icon stacked above like count */}
      <div className="flex flex-col items-center">
        <img
          src="/assets/red_potion_heart.png"
          alt="Like potion"
          width={POTION_SIZE}
          height={POTION_SIZE}
          style={{ imageRendering: "pixelated", marginBottom: "4px" }}
        />
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "16px",
            lineHeight: "1",
            color: "#EAD09D",
            letterSpacing: "0.06em",
          }}
        >
          Liked by {likeCount} People
        </span>
      </div>
    </div>
  );
}
