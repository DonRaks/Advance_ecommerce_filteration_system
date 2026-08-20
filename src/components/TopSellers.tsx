import { useState, useEffect, useRef } from "react";
import { UserPlus, UserCheck, Award } from "lucide-react";
import gsap from "gsap";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=4");
        const data = await response.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));
        setAuthors(authorsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // GSAP animation for seller items when loaded
  useEffect(() => {
    if (!loading && listRef.current) {
      const items = listRef.current.querySelectorAll(".seller-item");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    }
  }, [loading]);

  const handleFollowClick = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    gsap.timeline()
      .to(btn, { scale: 0.9, duration: 0.08 })
      .to(btn, { scale: 1.08, duration: 0.12, ease: "back.out(2)" })
      .to(btn, { scale: 1, duration: 0.08 });

    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs w-full">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">Top Sellers</h2>
        </div>
        <span className="text-[11px] font-semibold text-slate-400">Featured</span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="bg-slate-100 rounded h-3.5 w-3/4" />
                <div className="bg-slate-100 rounded h-2.5 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul ref={listRef} className="space-y-3.5">
          {authors.map((author, index) => (
            <li
              key={index}
              className="seller-item flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={author.image}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-indigo-500 transition-all"
                    alt={author.name}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                    {author.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Verified Merchant
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => handleFollowClick(index, e)}
                className={`inline-flex items-center gap-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  author.isFollowing
                    ? "bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
                }`}
              >
                {author.isFollowing ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopSellers;
