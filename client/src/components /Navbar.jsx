import { Link, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import clsx from "clsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/exam/verbal", label: "Practice" },
  { to: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-gray-900">
          <GraduationCap className="text-brand-teal" size={24} />
          GRE & GMAT Prep Hub
        </Link>
        <nav className="flex gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={clsx(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === link.to
                  ? "bg-brand-mint/50 text-brand-purple"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
