import { ShieldCheck, Star } from "lucide-react";

const footerLinks = {
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Contact Us", "Claims", "FAQs"],
  Legal: ["Privacy Policy", "Terms of Service", "Licenses", "Accessibility"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-600">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Shield<span className="text-blue-400">Drive</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Helping drivers across the US find the best auto insurance rates since 2015.
            </p>
            {/* Stars */}
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="text-slate-400 text-xs ml-1">4.9/5 Average Rating</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="space-y-3">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                {group}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} ShieldDrive Insurance Services. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
            Licensed &amp; regulated in all 50 states
          </p>
        </div>
      </div>
    </footer>
  );
}
