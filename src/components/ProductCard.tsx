import { useNavigate } from "react-router-dom";
import { Product, Review } from "../models/Product";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";

function calculateAverageRating(reviews: Review[]) {
    if (reviews.length === 0) return 0; // Sem reviews, retorna 0
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Retorna a média com 1 casa decimal
}

export default function ProductCard({ product }: { product: Product }) {
    const navigate = useNavigate();

    return (
        <div
            key={product.id}
            className="bg-white px-[10px] py-[15px] border rounded-[15px] shadow-sm flex flex-col items-center"
            onClick={() => navigate('/product-info', { state: { product } })}
        >
            <img
                src={product.img}
                alt={product.name}
                className="w-[135px] h-[125px] object-cover rounded-lg mb-5"
            />
            <div className="flex flex-col justify-between h-full w-full">
                <div>
                    <p className="text-[14px] mb-1">{product.name}</p>
                    <p className="text-gray-700 font-bold text-[12px]">
                        USD {product.price.toFixed(2)}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center">
                            <span className="text-yellow-500 text-lg">★</span>
                            <p className="text-[11px] text-gray-700 ml-1 mt-1">
                                {calculateAverageRating(product.reviews)} {" "}
                            </p>
                            <p className="text-[11px] text-gray-700 ml-2 mt-1">
                                {product.reviews.length} Reviews
                            </p>
                        </div>
                    </div>
                    <button className="text-gray-400">
                        <EllipsisVerticalIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </div>

    );
}
