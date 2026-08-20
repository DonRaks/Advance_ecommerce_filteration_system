import React, { useState, useEffect, useRef } from "react";
import { useFilter } from "./FilterContext";
import {
  SlidersHorizontal,
  RotateCcw,
  Tag,
  DollarSign,
  Grid,
  Search,
  X,
  Check,
} from "lucide-react";
import gsap from "gsap";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen = false, onCloseMobile }) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
    keyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  const categoriesContainerRef = useRef<HTMLDivElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);

  // GSAP animation for categories list & tag chips when mounted
  useEffect(() => {
    if (categories.length > 0 && categoriesContainerRef.current) {
      const items = categoriesContainerRef.current.querySelectorAll(".category-btn");
      gsap.fromTo(
        items,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.04, ease: "power1.out" }
      );
    }
  }, [categories]);

  useEffect(() => {
    if (tagsContainerRef.current) {
      const chips = tagsContainerRef.current.querySelectorAll(".tag-chip");
      gsap.fromTo(
        chips,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.5)" }
      );
    }
  }, [keywords]);

  const handleRadioChangeCategories = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  };

  const handleKeywordClick = (selectedKw: string) => {
    if (keyword === selectedKw) {
      setKeyword("");
    } else {
      setKeyword(selectedKw);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory ? 1 : 0) +
    (minPrice !== undefined ? 1 : 0) +
    (maxPrice !== undefined ? 1 : 0) +
    (keyword ? 1 : 0);

  const filterContent = (
    <div className="space-y-6">
      {/* Search Input (Inside sidebar for mobile/desktop fallback) */}
      <div className="lg:hidden">
        <label className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-2 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5" />
          Search Catalog
        </label>
        <div className="relative">
          <input
            type="text"
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            Price Range ($)
          </span>
          {(minPrice !== undefined || maxPrice !== undefined) && (
            <button
              onClick={() => {
                setMinPrice(undefined);
                setMaxPrice(undefined);
              }}
              className="text-[11px] text-indigo-600 hover:underline font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
              $
            </span>
            <input
              type="number"
              min="0"
              className="w-full pl-6 pr-2 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-800 transition-colors"
              placeholder="Min"
              value={minPrice ?? ""}
              onChange={handleMinPriceChange}
            />
          </div>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
              $
            </span>
            <input
              type="number"
              min="0"
              className="w-full pl-6 pr-2 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-800 transition-colors"
              placeholder="Max"
              value={maxPrice ?? ""}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Grid className="w-3.5 h-3.5" />
            Categories
          </span>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory("")}
              className="text-[11px] text-indigo-600 hover:underline font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </label>
        <div ref={categoriesContainerRef} className="space-y-1 max-h-56 overflow-y-auto pr-1">
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleRadioChangeCategories(category)}
                className={`category-btn w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all text-left cursor-pointer ${
                  isSelected
                    ? "bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80 shadow-2xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span className="capitalize">{category.replace(/-/g, " ")}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Keywords */}
      <div>
        <label className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            Popular Tags
          </span>
          {keyword && (
            <button
              onClick={() => setKeyword("")}
              className="text-[11px] text-indigo-600 hover:underline font-semibold cursor-pointer"
            >
              Clear
            </button>
          )}
        </label>
        <div ref={tagsContainerRef} className="flex flex-wrap gap-1.5">
          {keywords.map((kw, index) => {
            const isSelected = keyword.toLowerCase() === kw.toLowerCase();
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleKeywordClick(kw)}
                className={`tag-chip px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                #{kw}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleResetFilters}
        disabled={activeFiltersCount === 0}
        className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          activeFiltersCount > 0
            ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/10 active:scale-[0.99]"
            : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters ({activeFiltersCount})</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Layout */}
      <aside className="hidden lg:block w-64 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs sticky top-20 self-start">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Filters</span>
          </div>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-[11px] font-bold">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        {filterContent}
      </aside>

      {/* Mobile Slide-Over Off-Canvas Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Filter Products</span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto flex-1">{filterContent}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;