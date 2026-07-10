import LeadForm from "@/components/LeadForm";
import { ShieldCheck, Users, Banknote, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation / Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900 tracking-tight">ShieldDrive</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
            <span>Licensed in all 50 states</span>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1 text-green-600">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <span className="text-slate-600 ml-1">4.9/5 Average Rating</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Trust Signals */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                Stop Overpaying for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Auto Insurance</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-lg">
                Compare rates from top-rated carriers in minutes. Drivers who switch save an average of <strong className="text-slate-900">$536 a year</strong>.
              </p>
            </div>

            {/* Trust Signals / Benefits */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 text-blue-600">
                    <Banknote className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">Maximum Savings</h3>
                  <p className="mt-1 text-sm text-slate-500">We search multiple carriers to find your lowest possible rate.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-indigo-100 text-indigo-600">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-900">Over 1M Drivers</h3>
                  <p className="mt-1 text-sm text-slate-500">Join the thousands of drivers who trust us every month.</p>
                </div>
              </div>
            </div>

            {/* Testimonial Snippet */}
            <div className="bg-white p-4 rounded-xl border shadow-sm max-w-md hidden sm:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <span className="text-slate-500 font-medium">SJ</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Sarah Jenkins</p>
                  <p className="text-xs text-slate-500">Saved $420/year</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 italic">
                &ldquo;I was skeptical at first, but filling out the form took 2 minutes and they cut my monthly premium nearly in half. Highly recommended!&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="flex justify-center">
            <div className="form-wrapper w-full max-w-lg px-4">
              {/* Decorative background blob */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-indigo-100 rounded-3xl transform rotate-3 scale-105 opacity-50 -z-10 blur-xl hidden lg:block" />
                <LeadForm />
              </div>
            </div>
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© {new Date().getFullYear()} ShieldDrive Insurance Services. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Licenses</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
