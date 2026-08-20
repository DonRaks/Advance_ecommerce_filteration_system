import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
  thumbnail: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const cartBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
          const defaultImg =
            response.data.images && response.data.images.length > 0
              ? response.data.images[0]
              : response.data.thumbnail;
          setSelectedImage(defaultImg);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product data: ", error);
          setLoading(false);
        });
    }
  }, [id]);

  // GSAP animation on product load
  useEffect(() => {
    if (!loading && product && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          galleryRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        );

        if (mainImgRef.current) {
          gsap.fromTo(
            mainImgRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
          );
        }

        gsap.fromTo(
          detailsRef.current ? detailsRef.current.children : [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power2.out", delay: 0.1 }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [loading, product]);

  const handleImageSelect = (img: string) => {
    if (img === selectedImage) return;

    if (mainImgRef.current) {
      gsap.timeline()
        .to(mainImgRef.current, { opacity: 0.3, scale: 0.95, duration: 0.12 })
        .call(() => setSelectedImage(img))
        .to(mainImgRef.current, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
    } else {
      setSelectedImage(img);
    }
  };

  const handleAddToCart = () => {
    if (cartBtnRef.current) {
      gsap.timeline()
        .to(cartBtnRef.current, { scale: 0.92, duration: 0.1 })
        .to(cartBtnRef.current, { scale: 1.05, duration: 0.15, ease: "back.out(2)" })
        .to(cartBtnRef.current, { scale: 1, duration: 0.1 });
    }

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs animate-pulse flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 h-80 bg-slate-100 rounded-2xl" />
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="h-6 bg-slate-100 rounded w-1/4" />
          <div className="h-8 bg-slate-100 rounded w-3/4" />
          <div className="h-4 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-2/3" />
          <div className="h-10 bg-slate-100 rounded w-1/3 mt-6" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-6 text-sm">
          The item you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const currentDisplayedImg =
    selectedImage || product.images?.[0] || product.thumbnail;

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-6">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>Back to Products</span>
        </button>

        <div className="text-xs font-medium text-slate-400 hidden sm:block">
          <Link to="/" className="hover:underline text-slate-600">
            Home
          </Link>{" "}
          / <span className="capitalize">{product.category}</span> /{" "}
          <span className="text-slate-900 font-semibold">{product.title}</span>
        </div>
      </div>

      {/* Main Product Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 lg:p-8 shadow-xs flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Gallery */}
        <div ref={galleryRef} className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center p-6">
            <img
              ref={mainImgRef}
              src={currentDisplayedImg}
              alt={product.title}
              className="w-full h-full object-contain"
            />
            {product.category && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                {product.category}
              </span>
            )}
          </div>

          {/* Image Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleImageSelect(img)}
                  className={`w-16 h-16 rounded-xl border-2 p-1 bg-slate-50 shrink-0 transition-all cursor-pointer ${
                    currentDisplayedImg === img
                      ? "border-indigo-600 ring-2 ring-indigo-500/20 scale-105"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Section */}
        <div ref={detailsRef} className="w-full lg:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Rating & Stock */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span>{product.rating.toFixed(1)} Rating</span>
              </div>

              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-semibold">
                In Stock ({product.stock || 45} left)
              </span>
            </div>

            {/* Title & Brand */}
            <div>
              {product.brand && (
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {product.brand}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mt-1">
                {product.title}
              </h1>
            </div>

            {/* Price Tag */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-black text-indigo-600">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-slate-400 line-through">
                ${(product.price * 1.25).toFixed(2)}
              </span>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[11px] font-bold">
                Save 20%
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="pt-4 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-lg text-slate-600 hover:bg-white hover:shadow-2xs transition-all cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-lg text-slate-600 hover:bg-white hover:shadow-2xs transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                ref={cartBtnRef}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
                  addedToCart
                    ? "bg-emerald-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25"
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button className="flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-sm font-bold transition-all active:scale-95 cursor-pointer">
                <Zap className="w-4 h-4 fill-current text-amber-400" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-indigo-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">Free Express</span>
              <span className="text-[10px] text-slate-400">On orders $50+</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-indigo-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">2-Year Warranty</span>
              <span className="text-[10px] text-slate-400">100% Authentic</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-5 h-5 text-indigo-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-800">30-Day Returns</span>
              <span className="text-[10px] text-slate-400">Hassle free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
