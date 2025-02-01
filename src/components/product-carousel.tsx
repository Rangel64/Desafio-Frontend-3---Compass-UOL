import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Product } from "../models/Product";
import ProductCardSmall from "./ProductCardSmall";


export default function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeOption, setActiveOption] = useState("Headphones");

  const navigate = useNavigate();

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
    <div className="bg-gray-100 h-auto rounded-t-3xl p-5">
      <div className="w-[95%] m-auto">
        {/* Options */}
        <nav className="flex gap-1 pt-5">
          {["Headphones", "Headsets"].map((option) => (
            <button
              key={option}
              className={`px-4 py-1 rounded-2xl text-[14px] ${activeOption === option
                  ? "bg-[#0ACF83] text-white"
                  : "bg-gray-100 text-gray-500"
                }`}
              onClick={() => setActiveOption(option)}
            >
              {option}
            </button>
          ))}
        </nav>

        {/* Carousel */}
        <div className="flex overflow-x-scroll mt-5 space-x-5">
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <p>Loading...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                className="flex-shrink-0 w-[326px] h-[178px] bg-white rounded-xl flex justify-between items-center shadow gap-3 px-[24px] py-[20px]"
                key={index}
              >
                <div className="flex flex-col h-full justify-between">
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
                  className="w-[117px] h-[135px] object-contain"
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
        <div className="flex justify-between mt-5 ">
          <h3 className="text-[16px] ">Featured Products</h3>
          <button onClick={() => navigate("/all-products", { state: { products } })}>
            <p className="text-gray-500 cursor-pointer text-[14px]">See All</p>
          </button>
        </div>

        {/* Product Cards */}
        <div className="flex overflow-x-scroll mt-5 space-x-5 ">
          {loading ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCardSmall product={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
}
