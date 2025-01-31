import { useNavigate} from "react-router-dom";
import { Product, Review } from "../models/Product";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";

function calculateAverageRating(reviews : Review[]) {
  if (reviews.length === 0) return 0; // Sem reviews, retorna 0
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1); // Retorna a média com 1 casa decimal
}

export default function ProductCard({ product }: { product: Product }) {
    const navigate = useNavigate();

    return (
        
        <div 
            key={product.id}
            className="bg-white p-4 border rounded-lg shadow-sm flex flex-col justify-between"
            onClick={()=>navigate('/product-info', { state: { product } })}
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
                <div className="flex items-center justify-between ">
                    <div className="flex items-center">
                        <span className="text-yellow-500 text-lg">★</span>
                        <p className="text-sm text-gray-700 ml-2">
                            {calculateAverageRating(product.reviews)} {" "}
                            {product.reviews.length} Reviews
                        </p>
                    </div>
                </div>
                <button className="text-gray-400">
                    <EllipsisVerticalIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
        
    );
}
