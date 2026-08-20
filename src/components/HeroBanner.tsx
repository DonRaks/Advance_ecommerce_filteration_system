import React, { useEffect, useRef } from "react";
import { Sparkles, ArrowRight, ShoppingBag, ShieldCheck, Zap } from "lucide-react";
import gsap from "gsap";

interface HeroBannerProps {
  onShopNowClick?: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNowClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          buttonsRef.current ? buttonsRef.current.children : [],
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.15 },
          "-=0.3"
        )
        .fromTo(
          statsRef.current ? statsRef.current.children : [],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          "-=0.2"
        )
        .fromTo(
          cardRef.current,
          { opacity: 0, x: 30, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7 },
          "-=0.8"
        );

      // Continuous subtle floating animation for right card
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.easeInOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 lg:p-10 mb-8 border border-indigo-500/20 shadow-2xl"
    >
      {/* Background Decorative Glow Circles */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Text Content */}
        <div className="flex-1 space-y-5 text-center lg:text-left">
          <div ref={badgeRef} className="inline-flex items-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wide uppercase shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Next-Gen E-Commerce Experience
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
          >
            Discover Premium <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Tech & Essentials
            </span>
          </h1>

          <p
            ref={descRef}
            className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal"
          >
            Explore curated collections of top-rated electronics, fashion, and lifestyle items. Enjoy instant filtering, fast delivery, and verified quality.
          </p>

          {/* Action Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
          >
            <button
              onClick={onShopNowClick}
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Trending Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onShopNowClick}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 rounded-2xl font-bold text-xs sm:text-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Limited Offers</span>
            </button>
          </div>

          {/* Trust stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-md mx-auto lg:mx-0"
          >
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black text-white">10K+</span>
              <span className="text-[11px] text-slate-400 font-medium">Curated Items</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black text-indigo-400">4.9 ★</span>
              <span className="text-[11px] text-slate-400 font-medium">Customer Rating</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black text-purple-400">100%</span>
              <span className="text-[11px] text-slate-400 font-medium">Money Back Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Glass Card Graphic */}
        <div ref={cardRef} className="w-full lg:w-72 shrink-0">
          <div className="relative p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-full bg-rose-500/80 text-white text-[10px] font-black uppercase tracking-wider">
                Hot Deal
              </span>
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-xs font-semibold text-slate-300">Season Special</div>
              <div className="text-xl font-bold text-white leading-tight">
                Up to 40% Off Premium Picks
              </div>
            </div>

            <div className="flex items-baseline gap-2 pt-2 border-t border-white/10">
              <span className="text-xs text-slate-400">Starting from</span>
              <span className="text-2xl font-black text-indigo-300">$19.99</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
