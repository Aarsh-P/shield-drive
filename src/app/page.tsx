// import LeadFormContainer from "@/components/LeadFormContainer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Banknote, Users } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
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
                  <h2 className="text-lg font-medium text-slate-900">Maximum Savings</h2>
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
                  <h2 className="text-lg font-medium text-slate-900">Over 1M Drivers</h2>
                  <p className="mt-1 text-sm text-slate-500">Join the thousands of drivers who trust us every month.</p>
                </div>
              </div>
            </div>

            <TestimonialCarousel />
          </div>

          {/* Right Column: Lead Form */}
          <div className="flex justify-center">
            <div className="form-wrapper w-full max-w-lg px-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 to-indigo-100 rounded-3xl transform rotate-3 scale-105 opacity-50 -z-10 blur-xl hidden lg:block" />
                <LeadForm />
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

