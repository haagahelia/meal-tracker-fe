import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-screen-md items-center justify-between px-4 md:max-w-screen-lg md:px-6">
        <Link to="/" className="text-base font-semibold tracking-tight">
          Meal Tracker
        </Link>

        <nav className="hidden gap-6 text-sm text-slate-600 md:flex">
          <Link to="/recipes" className="hover:text-slate-900">
            Recipes
          </Link>
          <Link to="/products" className="hover:text-slate-900">
            Products
          </Link>
          <Link to="/tracker" className="hover:text-slate-900">
            Tracker
          </Link>
          <Link to="/settings" className="hover:text-slate-900">
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}