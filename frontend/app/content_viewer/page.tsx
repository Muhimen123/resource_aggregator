"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProgressHeader from "../components/retro/ProgressHeader";
import TabNavigation from "../components/retro/TabNavigation";
import RetroFrame from "../components/retro/RetroFrame";
import DocumentViewer from "../components/retro/DocumentViewer";

const TABS = [
  { id: "suggestion", label: "Suggestion" },
  { id: "ct1", label: "CT1" },
];

function ContentViewerPageContent() {
  const searchParams = useSearchParams();
  const resourceId = searchParams.get("resourceId");

  const [activeTab, setActiveTab] = useState("suggestion");
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<{ totalPages: number } | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (resourceId) {
      setIsLoading(true);
      fetch(`/api/resources/${resourceId}/metadata`)
        .then(res => res.json())
        .then(data => {
          setMetadata(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch metadata", err);
          setIsLoading(false);
        });
    }
  }, [resourceId]);

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
        <ProgressHeader progressValue={progress} likeCount={102} />

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
          {/* Document Viewer Content */}
          {activeTab === "suggestion" ? (
            <div className="absolute inset-0">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="press-start-font text-sm text-[#8a8a8a]">Loading document...</p>
                </div>
              ) : resourceId && metadata ? (
                <DocumentViewer
                  resourceId={resourceId}
                  totalPages={metadata.totalPages}
                  initialProgress={progress}
                  resourceType={(metadata as any).resourceType}
                  mediaUrl={(metadata as any).mediaUrl}
                  onProgressUpdate={setProgress}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="press-start-font text-sm text-[#8a8a8a]">
                    No resource specified. Add ?resourceId=UUID to the URL.
                  </p>
                </div>
              )}
            </div>
          ) : (
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
                CT1 Content
              </h3>
              <p
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "14px",
                  color: "#8a8a8a",
                }}
              >
                Awaiting CT1 data...
              </p>
            </div>
          )}
        </RetroFrame>
      </div>
    </main>
  );
}

export default function ContentViewerPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-[#0F0F0F]" />}>
      <ContentViewerPageContent />
    </Suspense>
  );
}