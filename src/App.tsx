import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Sidenav } from "@/components/layout/Sidenav";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/pages/Dashboard";
import { Transactions } from "@/pages/Transactions";
import { Accounts } from "@/pages/Accounts";
import { Investments } from "@/pages/Investments";
import { CreditCards } from "@/pages/CreditCards";
import { Loans } from "@/pages/Loans";
import { Services } from "@/pages/Services";
import { Privileges } from "@/pages/Privileges";
import { Settings } from "@/pages/Settings";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="grid h-screen md:grid-cols-[208px_1fr] md:grid-rows-[64px_1fr]">
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-primary"
        >
          Skip to main content
        </a>

        {/* Desktop Sidenav */}
        <div className="hidden md:block md:row-span-2">
          <Sidenav />
        </div>

        {/* Mobile Sidenav */}
        <div
          className={cn(
            "fixed inset-0 z-50 md:hidden",
            isMobileMenuOpen ? "block" : "hidden"
          )}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Sidenav */}
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-52 transform bg-white shadow-xl transition-transform duration-300 ease-in-out",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <Sidenav onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block md:col-start-2">
          <Header />
        </div>

        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-40 space-y-4 border-b bg-card p-4 md:hidden">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <h1 className="text-xl font-semibold">Overview</h1>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              className="w-full bg-[#F4F4F4] pl-9 text-sm"
              placeholder="Search for something"
              type="search"
              aria-label="Search"
            />
          </div>
        </div>

        <main
          id="main-content"
          className="relative overflow-auto md:col-start-2 md:row-start-2"
        >
          <div className="min-h-full pt-[116px] md:pt-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/credit-cards" element={<CreditCards />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/services" element={<Services />} />
              <Route path="/privileges" element={<Privileges />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
