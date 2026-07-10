"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Review {
  initials: string;
  name: string;
  saved: string;
  text: string;
}

const reviews: Review[] = [
  {
    initials: "SJ",
    name: "Sarah Jenkins",
    saved: "$420/year",
    text: "I was skeptical at first, but filling out the form took 2 minutes and they cut my monthly premium nearly in half. Highly recommended!",
  },
  {
    initials: "MR",
    name: "Marcus Rivera",
    saved: "$612/year",
    text: "My old policy was way overpriced. ShieldDrive found me the same coverage for way less. The whole process was seamless and fast.",
  },
  {
    initials: "KL",
    name: "Karen Liu",
    saved: "$348/year",
    text: "After my rates went up for no reason, I decided to shop around. ShieldDrive made it incredibly easy to compare and switch. I'm saving every month now.",
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const review = reviews[current];

  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm max-w-md hidden sm:block">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-full bg-slate-300 overflow-hidden flex-shrink-0 flex items-center justify-center">
          <span className="text-slate-700 font-semibold text-sm">{review.initials}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{review.name}</p>
          <div className="flex items-center gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
            <span className="text-slate-600 text-xs ml-1">Saved {review.saved}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-700 italic leading-relaxed">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {reviews.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === current ? "bg-blue-600" : "bg-slate-300"
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
