import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { SlEqualizer } from "react-icons/sl";
import { Product } from "../models/Product";
import ProductCard from "../components/ProductCard";
import CartButton from "../components/CartButton";
import { AnimatePresence, motion } from "framer-motion";


export default function AllProducts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>(location.state?.products || []);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("popularity");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/e257213a-c80c-4336-90c9-5e370dccbb73"
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const { data } = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const applyFilter = () => {
    let filtered = [...products];

    // Filtro por categoria
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Ordenar os produtos
    if (sortOption === "popularity") {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOption === "high-price") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "low-price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOption === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    setFilteredProducts(filtered);
    setIsFilterOpen(false); // Fecha o card de filtro
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <header className="bg-white p-6 sticky top-0 z-50">
        <nav aria-label="Global" className="mx-auto flex justify-between">
          <div className="flex">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <ArrowLeftIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <CartButton />
        </nav>
      </header>

      <div className="">
        <div className="flex justify-between items-center  px-6 py-3">
          <h1 className="text-[25px] font-bold">All Products</h1>
        </div>

        {/* Botão de Filtro */}
        <div className="flex justify-center items-center h-full mb-5 px-6 py-3 ">
          <button
            onClick={toggleFilter}
            className="flex items-center px-4 py-2 border border-gray-500 rounded-lg w-full justify-center"
          >
            <SlEqualizer className="mr-2" />
            <span className="mr-2">Filter</span>
          </button>
        </div>

        {/* Card de Filtro */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-6 rounded-[20px] z-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[24px] font-bold">Filter</h2>
                <button onClick={toggleFilter} className="h-[24px] w-[24px]">
                  ✕
                </button>
              </div>

              {/* Categoria */}
              <div className="mb-6">
                <h3 className="text-[16px] mb-2">Category</h3>
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-1 rounded-2xl text-[14px] ${selectedCategory === "headphones"
                      ? "bg-[#0ACF83] text-white"
                      : "text-gray-500"
                      }`}
                    onClick={() => setSelectedCategory("headphones")}
                  >
                    Headphones
                  </button>
                  <button
                    className={`px-4 py-1 rounded-2xl text-[14px] ${selectedCategory === "headsets"
                      ? "bg-[#0ACF83] text-white"
                      : "text-gray-500"
                      }`}
                    onClick={() => setSelectedCategory("headsets")}
                  >
                    Headsets
                  </button>
                </div>
              </div>

              {/* Ordenar por */}
              <div className="mb-8 max-w-[275px]">
                <h3 className="text-[16px] mb-2">Sort By</h3>
                <div className="flex flex-wrap gap-3 text-[14px]">
                  {[
                    { label: "Popularity", value: "popularity" },
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                    { label: "High Price", value: "high-price" },
                    { label: "Low Price", value: "low-price" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      className={`px-2 py-2 rounded-[10px] ${sortOption === option.value
                        ? "bg-[#0ACF83] text-white"
                        : "border border-gray-500"
                        }`}
                      onClick={() => setSortOption(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão de Aplicar */}
              <button
                onClick={applyFilter}
                className="w-full h-[50px] bg-[#0ACF83] text-white py-2 rounded-[10px] font-semibold"
              >
                Apply Filter
              </button>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Grade de Produtos */}
        <div className="grid grid-cols-2 gap-4 bg-[#F3F3F3]  h-auto rounded-t-3xl p-6">
          {filteredProducts.map((product: Product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
