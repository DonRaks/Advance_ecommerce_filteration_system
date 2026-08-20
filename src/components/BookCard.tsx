import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Eye } from "lucide-react";
import gsap from "gsap";

interface BookCardProps {
  id: string | number;
  title: string;
  image: string;
  price: number;
  rating?: number;
  category?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  image,
  price,
  rating = 4.5,
  category,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1.08,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleButtonClick = () => {
    if (btnRef.current) {
      gsap.timeline()
        .to(btnRef.current, { scale: 0.9, duration: 0.1, ease: "power1.in" })
        .to(btnRef.current, { scale: 1.05, duration: 0.15, ease: "back.out(2)" })
        .to(btnRef.current, { scale: 1, duration: 0.1 });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="product-card group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-48 sm:h-52 bg-gradient-to-b from-slate-50 to-slate-100/50 overflow-hidden flex items-center justify-center p-4">
        <img
          ref={imgRef}
          src={image}
          alt={title}
          className="w-full h-full object-contain p-2 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10 gap-2">
          {category ? (
            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wide uppercase text-slate-700 shadow-xs border border-slate-200/60 truncate max-w-[60%]">
              {category.replace(/-/g, " ")}
            </span>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white rounded-full text-[11px] font-bold shadow-xs shrink-0">
            <Star className="w-3.5 h-3.5 fill-current text-amber-100" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Quick View Overlay Action */}
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 pointer-events-none z-10">
          <Link
            to={`/product/${id}`}
            className="pointer-events-auto flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-900 font-bold text-xs shadow-lg hover:bg-indigo-600 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </Link>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <Link to={`/product/${id}`}>
            <h2 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 hover:text-indigo-600 transition-colors leading-snug mb-2 min-h-[2.5rem] flex items-center">
              {title}
            </h2>
          </Link>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex flex-col shrink-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Price
            </span>
            <span className="text-base sm:text-lg font-extrabold text-indigo-600 tracking-tight">
              ${price.toFixed(2)}
            </span>
          </div>

          <Link
            ref={btnRef}
            to={`/product/${id}`}
            onClick={handleButtonClick}
            className="shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md hover:shadow-indigo-600/20 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
