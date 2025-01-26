import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOption, setActiveOption] = useState("Headphones");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/e257213a-c80c-4336-90c9-5e370dccbb73"
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const { data } = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category === activeOption.toLowerCase()
  );

  return (
    <div className="bg-gray-100 min-h-screen h-auto rounded-t-3xl p-5">
      <div className="w-[95%] m-auto">
        {/* Options */}
        <nav className="flex gap-5 pt-5">
          {["Headphones", "Headsets"].map((option) => (
            <button
              key={option}
              className={`px-4 py-1 rounded-2xl font-bold ${
                activeOption === option
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
              onClick={() => setActiveOption(option)}
            >
              {option}
            </button>
          ))}
        </nav>

        {/* Carousel */}
        <div className="flex overflow-x-scroll mt-5 space-x-5 px-2">
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <p>Loading...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                className="flex-shrink-0 w-[326px] h-[178px] p-5 bg-white rounded-xl flex justify-between items-center shadow"
                key={index}
              >
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <button className="flex items-center gap-2 text-green-500 font-bold">
                    Shop now <FaArrowRight size={16} />
                  </button>
                </div>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-24 h-24 object-contain"
                />
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full">
              <p>No products found</p>
            </div>
          )}
        </div>

        {/* Featured Products */}
        <div className="flex justify-between mt-5">
          <h3 className="text-lg font-bold">Featured Products</h3>
          <p className="text-gray-500 cursor-pointer">See All</p>
        </div>

        {/* Product Cards */}
        <div className="flex overflow-x-scroll mt-5 space-x-5 px-2">
        {loading ? (
            <p>Loading...</p>
        ) : products.length > 0 ? (
            products.map((product, index) => (
            <div
                className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-y-2 flex-shrink-0"
                style={{
                width: "155px"}}
                key={index}
            >
                <img
                src={product.img}
                alt={product.name}
                className="object-contain"
                style={{ width: "135px", height: "135px" }}
                />
                <h3 className="text-gray-800 text-[14px] ">
                {product.name}
                </h3>
                <p className="font-bold text-black text-[12px]">
                USD {product.price}
                </p>
            </div>
            ))
        ) : (
            <p>No products available</p>
        )}
        </div>
      </div>
    </div>
  );
}
