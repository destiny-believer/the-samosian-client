import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FiHeart,
    FiShoppingCart,
    FiStar
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import QuickViewModal from "../../../components/common/QuickViewModal"

const TrendingProducts = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {

        fetchTrendingProducts();

    }, []);

    const fetchTrendingProducts = async () => {

        try {

            const response = await api.get(
                "/products/trending"
            );

            setProducts(
                response.data.products
            );

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const addToCart = async (

        productId,

        variant,

        quantity

    ) => {

        try {

            await api.post("/cart", {

                productId,

                variantId: variant._id,

                quantity

            });

            setModalOpen(false);

        }

        catch (error) {

            console.log(error);

        }

    };


    return (

        <section className="py-20 bg-slate-950">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex items-center justify-between mb-10">

                    <div>

                        <h2 className="text-4xl font-black">

                            🔥 Trending Today

                        </h2>

                        <p className="text-slate-400 mt-2">

                            Most ordered by our customers

                        </p>

                    </div>

                    <button

                        onClick={() => navigate("/menu")}

                        className="hidden lg:block bg-orange-500 px-6 py-3 rounded-full hover:bg-orange-600 transition"

                    >

                        View All

                    </button>

                </div>

                {

                    loading ?

                        (

                            <div className="grid lg:grid-cols-4 gap-8">

                                {

                                    Array.from({ length: 8 }).map((_, index) => (

                                        <div

                                            key={index}

                                            className="h-[420px] bg-slate-900 rounded-3xl animate-pulse"

                                        />

                                    ))

                                }

                            </div>

                        )

                        :

                        (

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                                {

                                    products.map(product => (

                                        <motion.div

                                            key={product._id}

                                            whileHover={{

                                                y: -10

                                            }}

                                            className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500 transition"

                                        >

                                            <div className="relative">

                                                <img

                                                    src={
                                                        product.image ||
                                                        "/images/default-food.png"
                                                    }

                                                    alt={product.name}

                                                    className="w-full h-60 object-cover hover:scale-110 transition duration-500"

                                                />

                                                <button

                                                    onClick={() => {

                                                        setSelectedProduct(product);

                                                        setSelectedVariant(product.variants?.[0] || null);

                                                        setQuantity(1);

                                                        setModalOpen(true);

                                                    }}

                                                    className="absolute bottom-4 left-4 bg-white text-black px-4 py-2 rounded-xl"

                                                >

                                                    Quick View

                                                </button>

                                                {

                                                    product.bestSeller && (

                                                        <span className="absolute top-4 left-4 bg-red-500 px-3 py-1 rounded-full text-xs font-bold">

                                                            BEST SELLER

                                                        </span>

                                                    )

                                                }

                                                {

                                                    product.discount > 0 && (

                                                        <span className="absolute top-4 right-4 bg-green-500 px-3 py-1 rounded-full text-xs font-bold">

                                                            {product.discount}% OFF

                                                        </span>

                                                    )

                                                }

                                                <button

                                                    className="absolute bottom-4 right-4 bg-white rounded-full p-3"

                                                >

                                                    <FiHeart />

                                                </button>

                                            </div>

                                            <div className="p-5">

                                                <h3 className="font-bold text-xl">

                                                    {

                                                        product.name

                                                    }

                                                </h3>

                                                <div className="flex items-center gap-2 mt-3">

                                                    <FiStar

                                                        className="text-yellow-400"

                                                    />

                                                    <span>

                                                        {

                                                            product.rating || 4.8

                                                        }

                                                    </span>

                                                </div>

                                                <p className="text-slate-400 mt-3 line-clamp-2">

                                                    {

                                                        product.description

                                                    }

                                                </p>

                                                <div className="flex justify-between items-center mt-6">

                                                    <div>

                                                        <h4 className="text-2xl font-black text-orange-500">

                                                            ₹{product.variants?.[0]?.price}

                                                        </h4>

                                                    </div>

                                                    <button

                                                        onClick={() => {

                                                            addToCart(

                                                                product._id,

                                                                product.variants?.[0],

                                                                1

                                                            );

                                                        }}

                                                        className="bg-orange-500 hover:bg-orange-600 rounded-full w-12 h-12 flex items-center justify-center"

                                                    >

                                                        <FiShoppingCart />

                                                    </button>

                                                </div>

                                            </div>

                                        </motion.div>

                                    ))

                                }

                            </div>

                        )

                }

            </div>

        </section>



    );

    <QuickViewModal

            open={modalOpen}

            product={selectedProduct}

            quantity={quantity}

            selectedVariant={selectedVariant}

            onClose={() => setModalOpen(false)}

            onIncrease={() =>
                setQuantity(prev => prev + 1)
            }

            onDecrease={() => {

                if (quantity > 1) {

                    setQuantity(prev => prev - 1);

                }

            }}

            onVariantChange={setSelectedVariant}

            onAddToCart={() => {

                addToCart(

                    selectedProduct._id,

                    selectedVariant,

                    quantity

                );

            }}

        />

};

export default TrendingProducts;