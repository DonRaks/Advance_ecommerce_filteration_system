import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  SlidersHorizontal,
  Search,
  Heart,
  User,
  Sparkles,
} from "lucide-react";
import { useFilter } from "./FilterContext";
import gsap from "gsap";

interface HeaderProps {
  onToggleMobileFilter?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleMobileFilter }) => {
  const { searchQuery, setSearchQuery } = useFilter();
  const cartBadgeRef = useRef<HTMLSpanElement>(null);
  const heartBtnRef = useRef<HTMLButtonElement>(null);

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    gsap.timeline()
      .to(btn, { scale: 0.85, duration: 0.1 })
      .to(btn, { scale: 1.15, duration: 0.15, ease: "back.out(2)" })
      .to(btn, { scale: 1, duration: 0.1 });

    if (cartBadgeRef.current) {
      gsap.fromTo(
        cartBadgeRef.current,
        { scale: 0.7, opacity: 0.5 },
        { scale: 1.3, opacity: 1, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    }
  };

  const handleHeartClick = () => {
    if (heartBtnRef.current) {
      gsap.timeline()
        .to(heartBtnRef.current, { scale: 0.8, duration: 0.1 })
        .to(heartBtnRef.current, { scale: 1.2, duration: 0.15, ease: "back.out(2)" })
        .to(heartBtnRef.current, { scale: 1, duration: 0.1 });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 border-b border-slate-200/80 shadow-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left section: Mobile menu button + Brand Logo */}
          <div className="flex items-center gap-3">
            {onToggleMobileFilter && (
              <button
                onClick={onToggleMobileFilter}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Toggle Filters"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            )}

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-tight">
                  REACT<span className="text-indigo-600">STORE</span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 -mt-0.5 tracking-wider uppercase">
                  Classic Collection
                </span>
              </div>
            </Link>
          </div>

          {/* Center section: Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog, brands, categories..."
                className="w-full pl-10 pr-8 py-2 text-sm bg-slate-100/80 border border-transparent rounded-full focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-200/60 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Right section: Quick Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Free Shipping $50+</span>
            </div>

            <button
              ref={heartBtnRef}
              onClick={handleHeartClick}
              className="p-2.5 rounded-full text-slate-600 hover:bg-slate-100 hover:text-rose-600 transition-colors relative cursor-pointer"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
            </button>

            <button
              onClick={handleCartClick}
              className="p-2.5 rounded-full text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors relative cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span
                ref={cartBadgeRef}
                className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs"
              >
                3
              </span>
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <button className="flex items-center gap-2 p-1.5 rounded-full text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                <User className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (visible only on small screens) */}
        <div className="pb-3 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-full focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-800"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
