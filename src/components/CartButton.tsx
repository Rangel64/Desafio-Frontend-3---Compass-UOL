import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext"; 

export default function CartButton() {
    const navigate = useNavigate();
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); 

    return (
        <button
            type="button"
            onClick={() => navigate("/shopping-cart")}
            className="relative -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
            <ShoppingCartIcon aria-hidden="true" className="h-7 w-7" />

            {totalItems > 0 && (
                <span className="absolute bottom-0 right-2 top-5 transform translate-x-0 translate-y-0 bg-[#0ACF83] text-white text-[8px] font-bold rounded-full w-[12px] h-[12px] flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </button>
    );
}
