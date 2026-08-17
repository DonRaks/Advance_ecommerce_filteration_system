import { useState, useEffect } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  // ------------------------------------------------------------------
  // 1. DESTRUCTURE FILTER CONTEXT
  // ------------------------------------------------------------------
  // Pull filter state and setters from the custom FilterContext hook.
  // These manage the global filter state across the application.
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
  } = useFilter();

  // ------------------------------------------------------------------
  // 2. LOCAL STATE DECLARATIONS
  // ------------------------------------------------------------------
  // categories: stores the unique product categories fetched from the API.
  // keywords: static list of popular search keywords for quick filtering.
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  // ------------------------------------------------------------------
  // 3. FETCH CATEGORIES ON COMPONENT MOUNT
  // ------------------------------------------------------------------
  // useEffect runs once when the component mounts.
  // It fetches all products from the dummy API, extracts unique categories,
  // and updates the local state with them.
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        // Extract unique categories from the product list using Set
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this runs only once.

  // ------------------------------------------------------------------
  // 4. EVENT HANDLERS
  // ------------------------------------------------------------------

  // Updates the selected category when a radio button is clicked.
  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  // Sets the keyword filter when a keyword button is clicked.
  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  // Resets all filter values to their initial empty/undefined state.
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  // Handles changes to the minimum price input field.
  // Converts the input value to a number or undefined if empty.
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  // Handles changes to the maximum price input field.
  // Converts the input value to a number or undefined if empty.
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  // ------------------------------------------------------------------
  // 5. RENDER THE SIDEBAR UI
  // ------------------------------------------------------------------
  return (
    <div className="w-64 p-5 h-screen">
      {/* Application Title */}
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section>
        {/* ------------------------------------------------------------------
            5a. SEARCH INPUT
            ------------------------------------------------------------------ */}
        {/* Text input for searching products by name/description */}
        <input
          type="text"
          className="border-2 rounded px-2 p-2 sm:mb-0"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* ------------------------------------------------------------------
            5b. PRICE RANGE INPUTS
            ------------------------------------------------------------------ */}
        {/* Two number inputs for setting minimum and maximum price filters */}
        <div className="flex justify-center items-center">
          <input
            type="number"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            className="border-2  px-5 py-3 mb-5 mt-2 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* ------------------------------------------------------------------
            5c. CATEGORIES FILTER (RADIO BUTTONS)
            ------------------------------------------------------------------ */}
        {/* Dynamically rendered list of categories as radio buttons.
            Only one category can be selected at a time. */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          <div>
            {categories.map((category, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => handleRadioChangeCategories(category)}
                  checked={selectedCategory === category}
                  className="mr-2 w-[16px] h-[16px]"
                />
                {category.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            5d. KEYWORDS FILTER (BUTTONS)
            ------------------------------------------------------------------ */}
        {/* Static list of keyword buttons. Clicking a keyword applies it as a filter. */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            5e. RESET FILTERS BUTTON
            ------------------------------------------------------------------ */}
        {/* Button that clears all active filters and resets the filter state */}
        <button
          onClick={handleResetFilters}
          className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;