import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  ArrowLeftRight,
  Users,
  LineChart,
  CreditCard,
  PiggyBank,
  Wrench,
  Award,
  Settings,
  X,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { name: "Accounts", href: "/accounts", icon: Users },
  { name: "Investments", href: "/investments", icon: LineChart },
  { name: "Credit Cards", href: "/credit-cards", icon: CreditCard },
  { name: "Loans", href: "/loans", icon: PiggyBank },
  { name: "Services", href: "/services", icon: Wrench },
  { name: "My Privileges", href: "/privileges", icon: Award },
  { name: "Setting", href: "/settings", icon: Settings },
];

interface SidenavProps {
  onClose?: () => void;
}

export function Sidenav({ onClose }: SidenavProps) {
  const location = useLocation();

  return (
    <nav
      className="fixed top-0 left-0 h-screen w-52 border-r bg-card py-4"
      aria-label="Main navigation"
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 md:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <div className="flex items-center gap-2 px-3 py-2">
        <CreditCard className="h-6 w-6 text-primary" aria-hidden="true" />
        <span className="text-lg font-semibold">Soar Task</span>
      </div>

      <div className="mt-6 space-y-1" role="navigation">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <div key={item.name} className="relative">
              {isActive && (
                <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-sm bg-primary" />
              )}
              <Link
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "font-black"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
