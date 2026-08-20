import { useEffect, useRef } from "react";
import { MessageCircle, ThumbsUp, BookOpen } from "lucide-react";
import gsap from "gsap";

const PopularBlogs = () => {
  const listRef = useRef<HTMLUListElement>(null);

  const blogs = [
    {
      title: "Top Tech Trends Shaping 2026 E-Commerce",
      author: "Jordan Smith",
      likes: 142,
      comments: 44,
      readTime: "4 min read",
    },
    {
      title: "How to Choose the Best Smart Wearables",
      author: "John Doe",
      likes: 153,
      comments: 25,
      readTime: "6 min read",
    },
    {
      title: "Minimalist Design Guide for Everyday Essentials",
      author: "Alex Morgan",
      likes: 89,
      comments: 18,
      readTime: "3 min read",
    },
  ];

  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll(".blog-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    }
  }, []);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs w-full">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">Popular Stories</h2>
        </div>
        <span className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer">
          View all
        </span>
      </div>

      <ul ref={listRef} className="space-y-4">
        {blogs.map((blog, index) => (
          <li key={index} className="blog-item group cursor-pointer">
            <h3 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-1">
              {blog.title}
            </h3>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
              <span className="font-medium text-slate-500">
                By {blog.author}
              </span>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  <span>{blog.likes}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  <span>{blog.comments}</span>
                </span>
              </div>
            </div>
            {index < blogs.length - 1 && (
              <div className="border-b border-slate-100 mt-3" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularBlogs;
