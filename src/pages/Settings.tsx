import { useState } from "react";
import { cn } from "@/lib/utils";
import { EditProfileForm } from "@/components/settings/EditProfileForm";

const tabs = [
  { id: "profile", label: "Edit Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "security", label: "Security" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const handleKeyDown = (e: React.KeyboardEvent, tabId: TabId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(tabId);
    }
  };

  return (
    <div className="p-6">
      <div className="rounded-xl bg-white shadow-sm">
        {/* Tabs */}
        <div className="border-b px-6 pt-6" role="tablist">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                className={cn(
                  "pb-4 text-base font-medium transition-colors",
                  activeTab === tab.id
                    ? "border-b-2 border-primary text-primary"
                    : "text-[#94A3B8] hover:text-[#64748B]"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <div
            role="tabpanel"
            id="profile-panel"
            aria-labelledby="profile-tab"
            hidden={activeTab !== "profile"}
          >
            {activeTab === "profile" && <EditProfileForm />}
          </div>
          <div
            role="tabpanel"
            id="preferences-panel"
            aria-labelledby="preferences-tab"
            hidden={activeTab !== "preferences"}
          >
            {activeTab === "preferences" && <div />}
          </div>
          <div
            role="tabpanel"
            id="security-panel"
            aria-labelledby="security-tab"
            hidden={activeTab !== "security"}
          >
            {activeTab === "security" && <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
