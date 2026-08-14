import React, { useEffect, useState } from 'react'



// Define the product interface to represent the structure of a product object
interface product{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
//
interface fetchresponse{
  products: product[];
}


const Sidebar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  {/* setting keywords for search functionality */}
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  

{/*fetching api data */}
useEffect(() => {
  // Log when the effect starts.
  console.log("useEffect is running");

  const fetchCategories = async () => {
    try {
      // Log before making the request.
      console.log("Fetching categories...");

      const response = await fetch(
        "https://dummyjson.com/products"
      );

      const data:fetchresponse= await response.json();

      // Extract unique categories from the products.
      const uniqueCategories = Array.from(
        new Set(data.products.map((product) => product.category))
      );

      // Log the unique categories.
      console.log("Unique Categories:", uniqueCategories);


      // Save the categories.
      setCategories(uniqueCategories);
    } catch (error) {
      // Log the error.
      console.error("Error fetching categories:", error);
    }
  };

  // Run the fetch function.
  fetchCategories();
}, []);

return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section>
        <input
          type="text"
          className="border-2 rounded px-2 p-2 sm:mb-0"
          placeholder="Search Product"
         
        />
        <div className="flex justify-center items-center">
          <input
            type="number"
            className="border-2 mr-2 px-5 py-3 mb-3 w-full"
            placeholder="Min"
          />
          <input
            type="number"
            className="border-2  px-5 py-3 mb-5 mt-2 w-full"
            placeholder="Max"
          />
        </div>

        {/* Categories Section */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
          <div>
            {categories.map((category, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  className="mr-2 w-[16px] h-[16px]"
                />
                {category.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
          Apply Filters
        </button>

      </section>
    </div>
  );
};


export default Sidebar