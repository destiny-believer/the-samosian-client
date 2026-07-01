import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchCart();

    }, []);

    const fetchCart = async () => {

        try {

            const res = await api.get("/cart");

            setCart(res.data.cart);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    const addToCart = async (

        productId,

        variantId,

        quantity

    ) => {

        try {

            const res = await api.post("/cart", {

                productId,

                variantId,

                quantity

            });

            setCart(res.data.cart);

        }

        catch (err) {

            console.log(err);

        }

    };

    const updateQuantity = async (

        productId,

        variantId,

        quantity

    ) => {

        try {

            const res = await api.put("/cart", {

                productId,

                variantId,

                quantity

            });

            setCart(res.data.cart);

        }

        catch (err) {

            console.log(err);

        }

    };

    const removeItem = async (

        productId,

        variantId

    ) => {

        try {

            const res = await api.delete("/cart", {

                data: {

                    productId,

                    variantId

                }

            });

            setCart(res.data.cart);

        }

        catch (err) {

            console.log(err);

        }

    };

    const totalItems = cart?.items?.reduce(

        (total, item) => total + item.quantity,

        0

    ) || 0;

    const totalAmount = cart?.totalAmount || 0;

    return (

        <CartContext.Provider

            value={{

                cart,

                totalItems,

                totalAmount,

                loading,

                fetchCart,

                addToCart,

                updateQuantity,

                removeItem

            }}

        >

            {children}

        </CartContext.Provider>

    );

};

export const useCart = () => useContext(CartContext);