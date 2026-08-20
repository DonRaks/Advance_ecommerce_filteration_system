import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFilter } from "./FilterContext";
import BookCard from "./BookCard";
import HeroBanner from "./HeroBanner";
import {
  ArrowUpDown,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  PackageSearch,
  Check,
  X,
} from "lucide-react";
import gsap from "gsap";

interface MainContentProps {
  onOpenMobileFilter?: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ onOpenMobileFilter }) => {
  const {
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    keyword,
    setSearchQuery,
    setSelectedCategory,
    setMinPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 12;

  const gridRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [currentPage, keyword]);

  // GSAP Stagger Animation when products load or change
  useEffect(() => {
    if (!loading && gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".product-card");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          }
        );
      }
    }
  }, [loading, products, filter, selectedCategory, minPrice, maxPrice, searchQuery]);

  const getFilteredProducts = () => {
    let filteredProducts = [...products];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();
  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - (currentPage - 1)));
    }
    if (currentPage + 2 > totalPages) {
      startPage = Math.max(1, startPage - (2 - (totalPages - currentPage)));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  const activeFilters = [
    selectedCategory && {
      type: "category",
      label: selectedCategory,
      clear: () => setSelectedCategory(""),
    },
    keyword && {
      type: "keyword",
      label: `#${keyword}`,
      clear: () => setKeyword(""),
    },
    searchQuery && {
      type: "search",
      label: `"${searchQuery}"`,
      clear: () => setSearchQuery(""),
    },
    minPrice !== undefined && {
      type: "minPrice",
      label: `Min: $${minPrice}`,
      clear: () => setMinPrice(undefined),
    },
    maxPrice !== undefined && {
      type: "maxPrice",
      label: `Max: $${maxPrice}`,
      clear: () => setMaxPrice(undefined),
    },
  ].filter(Boolean);

  return (
    <section className="flex-1 w-full min-w-0">
      {/* Hero Banner with GSAP animations */}
      <HeroBanner onShopNowClick={() => window.scrollTo({ top: 400, behavior: "smooth" })} />

      {/* Top Filter & Sorting Toolbar */}
      <div
        ref={toolbarRef}
        className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        {/* Left Toolbar Stats & Mobile Trigger */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          {onOpenMobileFilter && (
            <button
              onClick={onOpenMobileFilter}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <span>Filters</span>
            </button>
          )}

          <div>
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
              Featured Products
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Showing {filteredProducts.length} items
            </p>
          </div>
        </div>

        {/* Right Toolbar Sorting Dropdown */}
        <div className="relative w-full sm:w-auto flex justify-end">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors w-full sm:w-auto cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>
                Sort by:{" "}
                <span className="text-slate-900 font-bold capitalize">
                  {filter === "all"
                    ? "Default"
                    : filter === "cheap"
                    ? "Price: Low to High"
                    : filter === "expensive"
                    ? "Price: High to Low"
                    : "Highest Rated"}
                </span>
              </span>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200/90 rounded-2xl shadow-xl z-20 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150">
              {[
                { id: "all", label: "Default" },
                { id: "cheap", label: "Price: Low to High" },
                { id: "expensive", label: "Price: High to Low" },
                { id: "popular", label: "Highest Rated" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setFilter(item.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium transition-colors ${
                    filter === item.id
                      ? "bg-indigo-50 text-indigo-700 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{item.label}</span>
                  {filter === item.id && (
                    <Check className="w-3.5 h-3.5 text-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-slate-400 mr-1">
            Active filters:
          </span>
          {activeFilters.map((f: any, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 shadow-2xs"
            >
              <span className="capitalize">{f.label}</span>
              <button
                onClick={f.clear}
                className="hover:bg-slate-100 rounded-full p-0.5 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={clearAllFilters}
            className="text-xs text-indigo-600 hover:underline font-semibold ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Products Grid with GSAP animations */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[1400px]:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 animate-pulse h-80 flex flex-col justify-between"
            >
              <div className="bg-slate-100 rounded-xl h-44 w-full mb-4" />
              <div className="bg-slate-100 rounded h-5 w-3/4 mb-2" />
              <div className="bg-slate-100 rounded h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 min-[1400px]:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
              rating={product.rating}
              category={product.category}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center my-6 flex flex-col items-center justify-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No products found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mb-5">
            We couldn't find any items matching your active search or filter criteria.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              currentPage === 1
                ? "text-slate-300 bg-slate-50 cursor-not-allowed"
                : "text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex flex-wrap items-center gap-1.5 justify-center">
            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  page === currentPage
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105"
                    : "text-slate-600 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              currentPage === totalPages
                ? "text-slate-300 bg-slate-50 cursor-not-allowed"
                : "text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 cursor-pointer"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};

export default MainContent;
