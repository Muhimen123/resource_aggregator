"use client";

import { useState } from "react";
import ProgressHeader from "../components/retro/ProgressHeader";
import TabNavigation from "../components/retro/TabNavigation";
import RetroFrame from "../components/retro/RetroFrame";

const TABS = [
  { id: "suggestion", label: "Suggestion" },
  { id: "ct1", label: "CT1" },
];

export default function ContentViewerPage() {
  const [activeTab, setActiveTab] = useState("suggestion");

  return (
    <main
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: "url('/assets/bg_inside.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      />

      {/* Page layout: progress header + glass frame fill the viewport */}
      <div
        className="relative z-10 flex flex-col h-full w-full max-w-[1600px] mx-auto"
        style={{ padding: "16px 48px 24px" }}
      >
        {/* Progress Header — compact row at the top */}
        <ProgressHeader progressValue={70} likeCount={102} />

        {/* Glass frame fills the remaining viewport height */}
        <RetroFrame
          className="w-full flex-1 mt-2"
          header={
            <TabNavigation
              tabs={TABS}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onAddTag={() => console.log("Add Tag clicked")}
            />
          }
        >
          {/* Placeholder — replace with slide/PDF viewer later */}
          <div className="flex flex-col items-center justify-center h-full select-none">
            <h3
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "18px",
                color: "#EAD09D",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              {activeTab === "suggestion" ? "Suggestion Content" : "CT1 Content"}
            </h3>
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "14px",
                color: "#8a8a8a",
              }}
            >
              {activeTab === "suggestion"
                ? "Awaiting suggestion data..."
                : "Awaiting CT1 data..."}
            </p>
          </div>
        </RetroFrame>
      </div>
    </main>
  );
}