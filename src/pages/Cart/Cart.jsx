import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await api.get("/cart");
            setCart(response.data.cart);
        } catch (error) {
            console.log(error);
        }
    };

    const customerToken =
        localStorage.getItem("customerToken");

    const handleCheckout = () => {

        if (!customerToken) {

            navigate("/login", {
                state: {
                    from: "/checkout"
                }
            });

            return;

        }

        navigate("/checkout");

    };

    const updateQuantity = async (
        productId,
        variantName,
        quantity
    ) => {
        try {
            await api.patch("/cart/quantity", {
                productId,
                variantName,
                quantity,
            });

            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = async (
        productId,
        variantName
    ) => {
        try {
            await api.delete("/cart/remove", {
                data: {
                    productId,
                    variantName,
                },
            });

            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    const clearCart = async () => {
        try {
            await api.delete("/cart/clear");
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    if (!cart || cart.items.length === 0) {

        return (

            <div className="min-h-screen flex flex-col items-center justify-center text-center px-5">

                <div className="text-8xl">

                    🛒

                </div>

                <h1 className="text-5xl font-bold mt-8">

                    Your Cart is Empty

                </h1>

                <p className="text-slate-400 mt-4 max-w-md">

                    Looks like you haven't added any delicious dishes yet.

                </p>

                <button
                    onClick={() => navigate("/menu")}
                    className="mt-10 bg-orange-500 hover:bg-orange-400 px-8 py-4 rounded-2xl font-semibold transition-all"
                >

                    🍽 Explore Menu

                </button>

            </div>

        );

    }

    const deliveryCharge =
        cart?.totalAmount >= 350
            ? 0
            : 40;

    const grandTotal =
        cart?.totalAmount +
        deliveryCharge;

    return (

        <div className="max-w-7xl mx-auto px-5 pt-10 pb-10 text-white">
            {/* HERO */}

            <div className="bg-slate-900/70 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 mb-10">

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                    <div>

                        <p className="text-orange-400 text-sm font-medium">

                            SHOPPING CART

                        </p>

                        <h1 className="text-5xl font-bold mt-2">

                            My Cart

                        </h1>

                        <p className="text-slate-400 mt-3">

                            Review your selected items before placing your order.

                        </p>

                        <button
                            onClick={() => navigate("/menu")}
                            className="mt-6 border border-orange-500 px-6 py-3 rounded-xl hover:bg-orange-500 transition-all"
                        >

                            ← Continue Shopping

                        </button>

                    </div>



                    <div className="text-right">

                        <h2 className="text-5xl font-bold text-cyan-400">

                            {cart.items.length}

                        </h2>

                        <p className="text-slate-500">

                            Items Added

                        </p>

                    </div>

                </div>

            </div>

            <div className="mb-8 rounded-2xl bg-green-500/10 border border-green-500/20 p-5">

                <h3 className="text-green-400 font-bold">

                    🎉 Free Delivery on Orders Above ₹350

                </h3>

                <p className="text-slate-300 mt-2">

                    {cart.totalAmount >= 350

                        ? "Congratulations! Your order qualifies for FREE delivery."

                        : `Add ₹${350 - cart.totalAmount} more to unlock FREE delivery.`}

                </p>

            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* CART ITEMS */}

                <div className="lg:col-span-2 space-y-5">

                    {
                        cart.items.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="
            bg-slate-900/70
            backdrop-blur-xl
            border
            border-cyan-500/20
            rounded-3xl
            p-6
          "
                                >

                                    <div className="flex justify-between items-start">

                                        <div className="flex gap-5">

                                            <img
                                                src={item.product.image || "https://placehold.co/120x120?text=Food"}
                                                alt={item.product.name}
                                                className="w-28 h-28 rounded-2xl object-cover"
                                            />

                                            <div>

                                                <h2 className="text-2xl font-bold">

                                                    {item.product.name}

                                                </h2>

                                                <p className="text-slate-400 mt-1">

                                                    {item.variantName}

                                                </p>

                                                <p className="text-orange-400 font-semibold mt-3">

                                                    ₹{item.variantPrice}

                                                </p>

                                            </div>

                                        </div>

                                        <button
                                            onClick={() => {

                                                const confirmRemove = window.confirm(

                                                    `Remove "${item.product.name}" from your cart?`

                                                );

                                                if (confirmRemove) {

                                                    removeItem(

                                                        item.product._id,

                                                        item.variantName

                                                    );

                                                }

                                            }}
                                            className="
                px-4 py-2
                rounded-xl
                bg-red-500/20
                text-red-400
                hover:bg-red-500/30
              "
                                        >

                                            Remove

                                        </button>

                                    </div>

                                    <div className="flex justify-between items-center mt-6">

                                        <div className="flex items-center gap-4">

                                            <button
                                                onClick={() =>
                                                    item.quantity > 1 &&
                                                    updateQuantity(
                                                        item.product._id,
                                                        item.variantName,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="
                  w-12 h-12
                  rounded-xl
                  bg-white/10
                "
                                            >

                                                -

                                            </button>

                                            <span className="text-xl font-bold">

                                                {item.quantity}

                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product._id,
                                                        item.variantName,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="
                  w-12 h-12
                  rounded-xl
                  bg-white/10
                "
                                            >

                                                +

                                            </button>

                                        </div>

                                        <div>

                                            <h3 className="text-2xl font-bold text-cyan-400">

                                                ₹{
                                                    item.variantPrice *
                                                    item.quantity
                                                }

                                            </h3>

                                        </div>

                                    </div>

                                </div>

                            )
                        )
                    }

                </div>

                {/* SUMMARY */}

                <div>

                    <div className="
      sticky top-28
      bg-slate-900/70
      backdrop-blur-xl
      border
      border-orange-500/20
      rounded-3xl
      p-6
    ">

                        <h2 className="text-2xl font-bold mb-6">

                            🛒 Order Summary

                        </h2>

                        <div className="space-y-4">

                            <div className="flex justify-between">

                                <span className="text-slate-400">

                                    Items

                                </span>

                                <span>

                                    {cart.items.length}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-400">

                                    Subtotal

                                </span>

                                <span>

                                    ₹{cart.totalAmount}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-slate-400">

                                    Delivery

                                </span>

                                <span
                                    className={
                                        deliveryCharge === 0
                                            ? "text-green-400"
                                            : ""
                                    }
                                >

                                    {
                                        deliveryCharge === 0
                                            ? "FREE"
                                            : `₹${deliveryCharge}`
                                    }

                                </span>

                            </div>


                            <div className="flex justify-between">

                                <span className="text-slate-400">

                                    Minimum Delivery

                                </span>

                                <span>

                                    ₹350

                                </span>

                            </div>

                            <hr className="border-white/10" />

                            <div className="flex justify-between text-2xl font-bold">

                                <span>

                                    Total

                                </span>

                                <span className="text-cyan-400">

                                    ₹{grandTotal}

                                </span>

                            </div>


                        </div>

                        {
                            cart.totalAmount < 350 && (

                                <div className="mt-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">

                                    Add ₹
                                    {350 - cart.totalAmount}
                                    more to place delivery order.

                                    <div className="mt-4">

                                        <div className="w-full bg-white/10 rounded-full h-3">

                                            <div
                                                className="bg-orange-500 h-3 rounded-full transition-all"
                                                style={{
                                                    width: `${Math.min((cart.totalAmount / 350) * 100, 100)}%`
                                                }}
                                            ></div>

                                        </div>

                                    </div>

                                </div>



                            )
                        }

                        <div className="mt-6 rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4">

                            <p className="text-cyan-400 font-semibold">

                                🚚 Estimated Delivery

                            </p>

                            <p className="mt-2 text-slate-300">

                                25–35 Minutes

                            </p>

                        </div>

                        <p className="text-center text-slate-500 text-sm mt-6">

                            🔒 Your order details are securely processed.

                        </p>

                        <button
                            onClick={clearCart}
                            className="
        w-full
        mt-6
        py-3
        rounded-2xl
        border
        border-red-500
        text-red-400
      "
                        >

                            Clear Cart

                        </button>

                        <button
                            onClick={handleCheckout}
                            disabled={cart.totalAmount < 350}
                            className="
        w-full
        mt-4
        py-4
        rounded-2xl
        bg-orange-500
        hover:bg-orange-400
        font-semibold
        disabled:opacity-50
      "
                        >

                            Proceed To Checkout

                        </button>

                    </div>

                </div>

            </div>


        </div>

    );

};

export default Cart;