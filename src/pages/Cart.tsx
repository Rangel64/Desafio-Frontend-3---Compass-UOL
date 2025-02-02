import React from "react";
import { useCart } from "../context/CartContext";
import { ArrowLeftIcon, ArrowRightIcon, MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const ShoppingCart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="flex flex-col min-h-screen">
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
                        <h1 className="text-[16px] font-bold ">Shopping Cart</h1>
                    </div>

                    <button
                        type="button"
                        onClick={clearCart}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <TrashIcon className="h-6 w-6 text-gray-500" />
                    </button>
                </nav>
            </header>

            <div className="flex-grow p-5">
                {/* Cart Items */}
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center  mb-4 bg-white  rounded-lg shadow-sm"
                        >
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-[87px] h-[87px] rounded-lg object-cover"
                            />

                            <div className="flex justify-between w-full">
                                <div>
                                    <div className="flex-1 ml-4">
                                        <h2 className="text-[16px]">{item.name}</h2>
                                        <p className="text-[14px] font-bold">USD {item.price}</p>
                                    </div>
                                    <div className="flex items-center space-x-5 ml-4 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-[30px] h-[30px] flex items-center justify-center rounded-[10px] border border-gray-500"
                                        >
                                            <MinusIcon className="w-[20px] h-[20px]" />
                                        </button>
                                        <span className="text-[16px]">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-[30px] h-[30px] flex items-center justify-center rounded-[10px] border border-gray-500"
                                        >
                                            <PlusIcon className="w-[20px] h-[20px]" />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-3 text-gray-500"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    ))
                )}
            </div>

            {/* Total and Checkout */}
            <div className="mt-6 p-6 ">
                <div className="flex justify-between items-center text-lg font-semibold mb-4">
                    <span>Total {cart.length} Items</span>
                    <span>USD {total}</span>
                </div>
                <button className="w-full bg-[#0ACF83] text-white py-[20px] rounded-lg font-semibold flex px-[30px] justify-between">
                    <p>
                        Proceed to Checkout
                    </p>
                    <ArrowRightIcon aria-hidden="true" className="h-6 w-6" />
                </button>
            </div>
        </div>

    );
};

export default ShoppingCart;
