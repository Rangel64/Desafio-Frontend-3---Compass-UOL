import { useLocation, useNavigate } from "react-router-dom";
import { Product } from "../models/Product";

import { useEffect, useState } from "react";
import ProductCardSmall from "../components/ProductCardSmall";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import CartButton from "../components/CartButton";



export default function ProductInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState<Product | null>(location.state.product);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeOption, setActiveOption] = useState("Overview");
    const { addToCart } = useCart();
    const productImages: string[] = [product!.img, "/phone.png"];


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

    useEffect(() => {
        if (location.state?.product) {
            setProduct(location.state.product);
        } else {
            console.warn("No product found in location.state.");
            navigate("/"); // Redireciona para home caso não tenha um produto
        }
    }, [location, navigate]);

    const handleAddToCart = () => {
        addToCart(product!);
        alert(`${product!.name} added to cart!`);
    };

    return (

        <div className=" relative">
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

                    <CartButton/>
                </nav>
            </header>

            {/* Product Details */}
            <div className="px-6">
                <p className="text-[#0ACF83] font-semibold text-[16px]">USD {product!.price}</p>
                <h1 className="text-[28px] font-bold mb-3">{product!.name}</h1>
                <div className="flex gap-4 mb-4">

                    <nav className="flex gap-5 ">
                        {["Overview", "Features"].map((option) => (
                            <button
                                key={option}
                                className={`${activeOption === option
                                    ? "border-b-2 border-[#0ACF83] font-semibold"
                                    : "text-gray-500"
                                    }`}
                                onClick={() => setActiveOption(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </nav>
                </div>

                {activeOption === "Features" && (
                    <div>
                        <div >
                            <p className="text-gray-600 font-bold">Highly Detailed Audio</p>
                            <p className="text-gray-600">{product!.details}</p>
                        </div>
                        <div className="fixed bottom-5 left-0 right-0 px-5">
                            <button
                                className="w-full bg-[#0ACF83] text-white text-lg font-bold py-3 rounded-lg"
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>


                )}


                {activeOption === "Overview" && (
                    <div className="mt-5">
                        {/* Carousel Container */}
                        <div className="flex overflow-x-scroll space-x-5 px-2 scrollbar-hide">
                            {productImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl overflow-hidden mb-2 shrink-0 w-[285px] h-[381px]">
                                    <img
                                        src={image}
                                        alt={product!.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {activeOption === "Overview" && (
                <div>
                    {/* Reviews Section */}
                    {product!.reviews?.length > 0 ? (
                        <div className="mb-6 p-6">
                            <h3 className="text-[16px] mb-4 ">Reviews ({product!.reviews.length})</h3>
                            {product!.reviews.map((review) => (
                                <div key={review.userId} className="mb-4">
                                    <div className="flex items-center gap-4 mb-1">
                                        <img
                                            src={`https://i.pravatar.cc/40?u=${review.userId}`}
                                            alt={review.userName}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-[16px]">{review.userName}</p>
                                            <div className="flex">
                                                <p className="text-yellow-500">
                                                    {"★".repeat(review.rating)}
                                                </p>
                                                <p className="text-gray-400">
                                                    {"☆".repeat(5 - review.rating)}
                                                </p>
                                            </div>
                                            <p className=" text-[14px]">{review.comment}</p>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No reviews available.</p>
                    )}

                    {/* Related Products Section */}
                    <div className="bg-[#F3F3F3] h-auto rounded-t-3xl px-6 py-3">
                        <div className="w-[95%] m-auto">
                            <div className="flex justify-between mt-5">
                                <h3 className="text-[16px]">Another Product</h3>
                                <button
                                    onClick={() => navigate("/all-products", { state: { products } })}
                                >
                                    <p className="text-gray-500 cursor-pointer">See All</p>
                                </button>
                            </div>

                            <div className="flex overflow-x-scroll mt-5 space-x-[15px] ">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : products?.length > 0 ? (
                                    products
                                        .filter((product_) => (product_.category === product!.category)&&(product_.id !== product!.id))
                                        .map((product_) => (
                                            <ProductCardSmall key={product_.id} product={product_} /> 
                                        ))
                                ) : (
                                    <p>No products available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="h-[30px]"></div>

                    <div className="sticky bottom-5 left-0 right-0 px-6">
                        <button
                            className="w-full bg-[#0ACF83] text-white text-lg font-bold py-3 rounded-lg"
                            onClick={handleAddToCart}
                        >
                            Add To Cart
                        </button>
                    </div>

                    <div className="h-[30px]"></div>
                </div>

            )}
        </div>
    );
}
