import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { SlEqualizer } from "react-icons/sl";
import { Product, Review } from "../models/Product";

function calculateAverageRating(reviews : Review[]) {
  if (reviews.length === 0) return 0; // Sem reviews, retorna 0
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1); // Retorna a média com 1 casa decimal
}

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
    setIsFilterOpen(!isFilterOpen);
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
          <div className="flex">
            <h1 className="text-[19.05px] ml-[10px] font-bold ">Search</h1>
          </div>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
        </div>

        {/* Botão de Filtro */}
        <div className="flex justify-center items-center h-full mb-10">
          <button
            onClick={toggleFilter}
            className="flex items-center px-4 py-2 border rounded-lg w-full justify-center"
          >
            <SlEqualizer className="mr-2" />
            <span className="mr-2">Filter</span>
          </button>
        </div>

        {/* Card de Filtro */}
        {isFilterOpen && (
          <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-6 transform translate-y-0 transition-transform duration-300 ease-in-out z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filter</h2>
              <button onClick={toggleFilter} className="text-gray-500">
                ✕
              </button>
            </div>

            {/* Categoria */}
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Category</h3>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === "all"
                      ? "bg-green-500 text-white"
                      : "border"
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  All
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === "headphones"
                      ? "bg-green-500 text-white"
                      : "border"
                  }`}
                  onClick={() => setSelectedCategory("headphones")}
                >
                  Headphones
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === "headsets"
                      ? "bg-green-500 text-white"
                      : "border"
                  }`}
                  onClick={() => setSelectedCategory("headsets")}
                >
                  Headsets
                </button>
              </div>
            </div>

            {/* Ordenar por */}
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Sort By</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Popularity", value: "popularity" },
                  { label: "High Price", value: "high-price" },
                  { label: "Low Price", value: "low-price" },
                  { label: "Newest", value: "newest" },
                  { label: "Oldest", value: "oldest" },
                ].map((option) => (
                  <button
                    key={option.value}
                    className={`px-4 py-2 rounded-lg ${
                      sortOption === option.value
                        ? "bg-green-500 text-white"
                        : "border"
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
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold"
            >
              Apply Filter
            </button>
          </div>
        )}

        {/* Grade de Produtos */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 border rounded-lg shadow-sm flex flex-col justify-between"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <div>
                <p className="font-bold text-lg">{product.name}</p>
                <p className="text-gray-700 font-semibold">
                  USD {product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <span className="text-yellow-500 text-lg">★</span>
                  <p className="text-sm text-gray-700 ml-2">
                    {calculateAverageRating(product.reviews)} ★ |{" "}
                    {product.reviews.length} Reviews
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
