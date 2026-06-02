"use client";

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onAddTag?: () => void;
}

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  onAddTag,
}: TabNavigationProps) {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 select-none">
      {/* Left side: Tabs list */}
      <div className="flex gap-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="press-start-font cursor-pointer transition-all duration-150 active:translate-y-0.5"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "12px",
                padding: "12px 28px",
                border: "2px solid #EAD09D",
                borderRadius: "10px",
                color: isActive ? "#EAD09D" : "#bca67c",
                background: isActive ? "rgba(234, 208, 157, 0.12)" : "transparent",
                opacity: 1,
                outline: "none",
                lineHeight: "1",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = "rgba(234, 208, 157, 0.06)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right side: Add Tag action button */}
      <button
        onClick={onAddTag || (() => console.log("Add Tag clicked"))}
        className="press-start-font cursor-pointer transition-all duration-150 active:translate-y-0.5"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "12px",
          padding: "12px 28px",
          border: "2px solid #EAD09D",
          borderRadius: "10px",
          color: "#EAD09D",
          background: "transparent",
          outline: "none",
          lineHeight: "1",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(234, 208, 157, 0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        Add Tag +
      </button>
    </div>
  );
}
