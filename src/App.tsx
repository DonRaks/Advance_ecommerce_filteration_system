import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header.tsx";
import Sidebar from "./components/Sidebar.tsx";
import MainContent from "./components/MainContent.tsx";
import ProductPage from "./components/ProductPage.tsx";
import TopSellers from "./components/TopSellers.tsx";
import PopularBlogs from "./components/PopularBlogs.tsx";

const App = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
        {/* Top Navigation Header */}
        <Header onToggleMobileFilter={() => setMobileFilterOpen(true)} />

        {/* Main Body Container */}
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Filter Sidebar (Desktop + Mobile Drawer) */}
            <Sidebar
              isMobileOpen={mobileFilterOpen}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />

            {/* Main Content Area + Right Side Widgets */}
            <div className="flex-1 min-w-0 w-full flex flex-col xl:flex-row gap-6 lg:gap-8 items-start">
              <div className="flex-1 min-w-0 w-full">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <MainContent
                        onOpenMobileFilter={() => setMobileFilterOpen(true)}
                      />
                    }
                  />
                  <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
              </div>

              {/* Right Side Widgets (Top Sellers & Popular Blogs) */}
              <aside className="w-full xl:w-80 shrink-0 space-y-6 sticky top-20 self-start">
                <TopSellers />
                <PopularBlogs />
              </aside>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200/80 mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs text-slate-400 font-medium">
              © {new Date().getFullYear()} NovaMart Inc. All rights reserved. Powered by Tailwind CSS & React.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;