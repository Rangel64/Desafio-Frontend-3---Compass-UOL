import { useNavigate} from "react-router-dom";
import { Product} from "../models/Product";


export default function ProductCardSmall({ product }: { product: Product }) {
    const navigate = useNavigate();

    return (
        
        <div
            className="bg-white p-4 rounded-lg shadow-md flex flex-col  flex-shrink-0 justify-between"
            style={{width: "155px"}}
            onClick={()=>navigate('/product-info', { state: { product } })}
        >
            <img
                src={product.img}
                alt={product.name}
                className="object-contain"
                style={{ width: "135px", height: "125px" }}
            />
            <div>
                <h3 className="text-gray-800 text-[14px] ">
                    {product.name}
                </h3>
                <p className="font-bold text-black text-[12px]">
                    USD {product.price}
                </p>
            </div>
        </div>
    
    );
}
