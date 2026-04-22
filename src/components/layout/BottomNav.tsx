import { Home, BookOpen, Package, ChartColumn, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/recipes", label: "Recipes", icon: BookOpen },
  { to: "/products", label: "Products", icon: Package },
  { to: "/tracker", label: "Tracker", icon: ChartColumn },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white md:hidden">
      <div className="mx-auto grid max-w-screen-md grid-cols-5">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium",
                isActive ? "text-slate-900" : "text-slate-500",
              )
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}