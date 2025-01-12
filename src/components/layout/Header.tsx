import { Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";

const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case "/":
      return "Overview";
    case "/transactions":
      return "Transactions";
    case "/accounts":
      return "Accounts";
    case "/investments":
      return "Investments";
    case "/credit-cards":
      return "Credit Cards";
    case "/loans":
      return "Loans";
    case "/services":
      return "Services";
    case "/privileges":
      return "My Privileges";
    case "/settings":
      return "Setting";
    default:
      return "Overview";
  }
};

export function Header() {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <header
      className="fixed top-0 right-0 left-52 z-40 flex h-16 items-center justify-between border-b bg-card px-6"
      role="banner"
    >
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold text-[#1A1D1F]">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            className="w-[280px] bg-[#F4F4F4] pl-9 text-sm"
            placeholder="Search for something"
            type="search"
            aria-label="Search"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            className="rounded-full p-2 hover:bg-muted"
            aria-label="Settings"
          >
            <Settings
              className="h-5 w-5 text-muted-foreground"
              aria-hidden="true"
            />
          </button>
          <button
            className="rounded-full p-2 hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell
              className="h-5 w-5 text-muted-foreground"
              aria-hidden="true"
            />
          </button>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
