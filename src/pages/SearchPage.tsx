import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ShoppingCartIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { AiOutlineSearch } from "react-icons/ai";


function calculateAverageRating(reviews = []) {
  if (reviews.length === 0) return 0; // Sem reviews, retorna 0

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1); // Retorna a média com 1 casa decimal
}

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(location.state?.search || "");

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

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );


  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div>
      <header className="bg-white p-6 sticky top-0 z-50">
        <nav aria-label="Global" className="mx-auto flex justify-between">
          <div className="flex">
            <button
              type="button"
              onClick={() => navigate(-1)} // Voltar para a página anterior
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
            onClick={() => {}}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <div className="p-6">
        <div className="relative">
          <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search headphone"
            className="w-full h-[50px] text-black pl-12 py-2 px-4 bg-white border border-gray-500 rounded-[10px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <ul className="mt-4">
            {filteredProducts.map((product, index) => (
              
              <li className="flex flex-col justify-between mb-[15px] h-full">
                {/* Imagem e Informações */}
                <div className="flex items-center h-full">
                  {/* Imagem do Produto */}
                  <img
                    src={product.img || "https://via.placeholder.com/50"}
                    alt={product.name || "Unnamed Product"}
                    className="w-20 h-20 mr-4 rounded-md object-cover"
                  />
                  {/* Informações do Produto */}
                  <div className="flex flex-col justify-between flex-grow">
                    <p className="font-bold text-lg">{product.name || "Unnamed Product"}</p>
                    <p className="text-gray-700 font-semibold">USD {product.price?.toFixed(2) || "Price not available"}</p>
                    {/* Avaliações e Botão */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg">★</span>
                        <p className="text-sm text-gray-700 ml-2">
                          {calculateAverageRating(product.reviews)} {product.reviews?.length || 0} Reviews
                        </p>
                      </div>
                      <button className="text-gray-400">
                        <EllipsisVerticalIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
