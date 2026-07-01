import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../services/api";

const FloatingCartBar = () => {

    const navigate = useNavigate();

    const {

        cart,

        totalItems,

        totalAmount

    } = useCart(); const [cart, setCart] = useState(null);

    useEffect(() => {

        fetchCart();

    }, []);

    const fetchCart = async () => {

        try {

            const response =
                await api.get("/cart");

            setCart(response.data.cart);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (

        !cart ||

        cart.items.length === 0

    ) {

        return null;

    }

    const totalItems =

        cart.items.reduce(

            (sum, item) =>

                sum + item.quantity,

            0

        );

    return (

        <AnimatePresence>

            <motion.div

                initial={{

                    y: 120

                }}

                animate={{

                    y: 0

                }}

                exit={{

                    y: 120

                }}

                transition={{

                    duration: .35

                }}

                className="

                    fixed

                    bottom-4

                    left-4

                    right-4

                    lg:hidden

                    z-50

                "

            >

                <div

                    onClick={() =>

                        navigate("/cart")

                    }

                    className="

                        bg-orange-500

                        rounded-2xl

                        px-5

                        py-4

                        shadow-2xl

                        cursor-pointer

                        flex

                        justify-between

                        items-center

                    "

                >

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">

                            <FiShoppingCart size={24} />

                        </div>

                        <div>

                            <h3 className="font-bold text-lg">

                                {totalItems} Items

                            </h3>

                            <p>

                                ₹{cart.totalAmount}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-2 font-bold">

                        View Cart

                        <FiArrowRight />

                    </div>

                </div>

            </motion.div>

        </AnimatePresence>

    );

};

export default FloatingCartBar;