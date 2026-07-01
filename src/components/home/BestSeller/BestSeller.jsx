import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FiArrowRight,
    FiHeart,
    FiShoppingCart,
    FiStar
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const BestSeller = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBestSellers();

    }, []);

    const fetchBestSellers = async () => {

        try {

            const response =
                await api.get("/products/best-sellers");

            setProducts(response.data.products);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const addToCart = async (productId) => {

        try {

            await api.post("/cart", {

                productId,

                quantity: 1

            });

        }

        catch (error) {

            console.log(error);

        }

    };

    if (loading) {

        return (

            <section className="py-20 bg-slate-950">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid lg:grid-cols-2 gap-8">

                        {

                            [...Array(4)].map((_, index)=>(

                                <div

                                    key={index}

                                    className="h-56 bg-slate-900 rounded-3xl animate-pulse"

                                />

                            ))

                        }

                    </div>

                </div>

            </section>

        );

    }

    return (

        <section className="py-24 bg-slate-950">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-between items-center mb-12">

                    <div>

                        <h2 className="text-5xl font-black">

                            ⭐ Best Sellers

                        </h2>

                        <p className="text-slate-400 mt-3">

                            Customer favourites loved every day

                        </p>

                    </div>

                    <button

                        onClick={() => navigate("/menu")}

                        className="hidden lg:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full"

                    >

                        Explore Menu

                        <FiArrowRight/>

                    </button>

                </div>

                <div className="grid md:grid-cols-2 gap-8">

                    {

                        products.map(product=>(

                            <motion.div

                                key={product._id}

                                whileHover={{

                                    scale:1.02

                                }}

                                className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10"

                            >

                                <div className="grid grid-cols-2">

                                    <div>

                                        <img

                                            src={product.images?.[0]}

                                            alt={product.productName}

                                            className="w-full h-full object-cover"

                                        />

                                    </div>

                                    <div className="p-6 flex flex-col justify-between">

                                        <div>

                                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">

                                                BEST SELLER

                                            </span>

                                            <h3 className="text-2xl font-bold mt-4">

                                                {product.productName}

                                            </h3>

                                            <div className="flex items-center gap-2 mt-3">

                                                <FiStar className="text-yellow-400"/>

                                                <span>

                                                    {product.averageRating || 4.9}

                                                </span>

                                            </div>

                                            <p className="text-slate-400 mt-4 line-clamp-3">

                                                {product.description}

                                            </p>

                                        </div>

                                        <div>

                                            <div className="flex justify-between items-center">

                                                <span className="text-3xl font-black text-orange-500">

                                                    ₹{product.basePrice}

                                                </span>

                                                <button>

                                                    <FiHeart size={22}/>

                                                </button>

                                            </div>

                                            <button

                                                onClick={()=>

                                                    addToCart(product._id)

                                                }

                                                className="mt-5 w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl flex justify-center items-center gap-3 font-bold"

                                            >

                                                <FiShoppingCart/>

                                                Add To Cart

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </motion.div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

};

export default BestSeller;