import { useLocation, useNavigate } from "react-router-dom";
import { Product, Review } from "../models/Product";

import { useEffect, useState } from "react";
import ProductCardSmall from "../components/ProductCardSmall";
import { ArrowLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";


export default function ProductInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState<Product>(location.state.product);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeOption, setActiveOption] = useState("Overview");

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



    return (

        <div>
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
                
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                </button>
                </nav>
            </header>

            {/* Product Details */}
            <div className="mb-6 p-6">
                <p className="text-green-600 font-semibold text-sm">USD {product.price}</p>
                <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
                <div className="flex gap-4 mb-4">
                    
                    <nav className="flex gap-5 pt-5">
                        {["Overview", "Features"].map((option) => (
                            <button
                            key={option}
                            className={`${
                                activeOption === option
                                ? "border-b-2 border-green-500 font-semibold"
                                : "text-gray-500"
                            }`}
                            onClick={() => setActiveOption(option)}
                            >
                            {option}
                            </button>
                        ))}
                    </nav>
                </div>

                {activeOption==="Features" && (
                    <div >
                        <p className="text-gray-600 font-bold">Highly Detailed Audio</p>
                        <p className="text-gray-600">{product.details}</p>
                    </div>
                )}
                
                {activeOption==="Overview" && (
                    <div className="rounded-xl overflow-hidden mb-6">
                        <img src={product.img} alt={product.name} className="w-full" />
                    </div>
                )}
                
            </div>

            {activeOption === "Overview" && (
                <div>
                    {/* Reviews Section */}
                    {product?.reviews?.length > 0 ? (
                        <div className="mb-6 p-6">
                            <h3 className="text-lg mb-4">Reviews ({product.reviews.length})</h3>
                            {product.reviews.map((review) => (
                                <div key={review.userId} className="mb-4">
                                    <div className="flex items-center gap-4 mb-1">
                                        <img
                                            src={`https://i.pravatar.cc/40?u=${review.userId}`}
                                            alt={review.userName}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="font-bold">{review.userName}</p>
                                            <p>
                                                {"★".repeat(review.rating)}
                                                {"☆".repeat(5 - review.rating)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No reviews available.</p>
                    )}

                    {/* Related Products Section */}
                    <div className="bg-gray-100 h-auto rounded-t-3xl p-5">
                        <div className="w-[95%] m-auto">
                            <div className="flex justify-between mt-5">
                                <h3 className="text-lg">Another Product</h3>
                                <button
                                    onClick={() => navigate("/all-products", { state: { products } })}
                                >
                                    <p className="text-gray-500 cursor-pointer">See All</p>
                                </button>
                            </div>

                            <div className="flex overflow-x-scroll mt-5 space-x-5 px-2">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : products?.length > 0 ? (
                                    products.map((product) => (
                                        <ProductCardSmall key={product.id} product={product} />
                                    ))
                                ) : (
                                    <p>No products available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            
            
            <div className="bottom-5 left-0 right-0 px-5 p-10">
                <button className="w-full bg-green-600 text-white text-lg font-bold py-3 rounded-lg">
                    Add To Cart
                </button>
            </div>
            

        </div>
    );
}
