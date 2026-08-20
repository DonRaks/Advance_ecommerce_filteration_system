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
      className="product-card group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-200/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Top Image Container */}
      <div className="relative w-full pt-[80%] bg-slate-50/80 overflow-hidden flex items-center justify-center p-4">
        <img
          ref={imgRef}
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {category ? (
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-wide uppercase text-slate-700 shadow-2xs border border-slate-200/50">
              {category.replace(/-/g, " ")}
            </span>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/90 backdrop-blur-md text-white rounded-full text-[11px] font-bold shadow-2xs">
            <Star className="w-3 h-3 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Quick View Overlay Action */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none z-10">
          <Link
            to={`/product/${id}`}
            className="pointer-events-auto p-2.5 rounded-full bg-white text-slate-900 shadow-lg hover:bg-indigo-600 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <Link to={`/product/${id}`}>
            <h2 className="font-semibold text-slate-900 text-sm line-clamp-2 hover:text-indigo-600 transition-colors leading-snug mb-1">
              {title}
            </h2>
          </Link>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Price
            </span>
            <span className="text-base font-extrabold text-indigo-600">
              ${price.toFixed(2)}
            </span>
          </div>

          <Link
            ref={btnRef}
            to={`/product/${id}`}
            onClick={handleButtonClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>View</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
