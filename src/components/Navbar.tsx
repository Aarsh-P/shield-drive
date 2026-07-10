import { ShieldCheck, Star, Phone } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-blue-600">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            Shield<span className="text-blue-600">Drive</span>
          </span>
        </div>

        {/* Center: Trust badges */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
            Licensed in all 50 states
          </span>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
            <span className="text-slate-600 ml-1 text-xs">4.9/5 · 12,000+ reviews</span>
          </div>
        </div>

        {/* Right: CTA */}
        <a
          href="tel:18005555555"
          className="hidden sm:flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Phone className="h-4 w-4" />
          1-800-555-5555
        </a>
      </div>
    </header>
  );
}
