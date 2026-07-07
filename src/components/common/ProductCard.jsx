import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getImageUrl } from "../../utils/image";

const ProductCard = ({
    product,
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity
}) => {

    const navigate = useNavigate();

    const [favorite, setFavorite] = useState(false);

    useEffect(() => {

        if (product.favorite !== undefined) {

            setFavorite(product.favorite);

        }

    }, [product]);

    const toggleWishlist = async (e) => {

        e.stopPropagation();

        try {

            const response = await api.patch(
                `/customers/favorite/${product._id}`
            );

            setFavorite(response.data.favorite);

        }

        catch (error) {

            console.log(error);

        }

    };

    const quantity =
        cart?.items?.find(
            item => item.product._id === product._id
        )?.quantity || 0;

    return (

        <div
            onClick={() =>
                navigate(`/product/${product._id}`)
            }
            className="group bg-slate-500 rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500 duration-300 cursor-pointer"
        >

            <div className="relative">

                <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="h-56 w-full object-cover group-hover:scale-105 duration-300"
                />

                <button
                    onClick={toggleWishlist}
                    className="absolute top-4 right-4 h-11 w-11 rounded-full bg-black/50 flex items-center justify-center"
                >

                    {

                        favorite ?

                            <FaHeart
                                size={20}
                                className="text-red-500"
                            />

                            :

                            <FaRegHeart
                                size={20}
                                className="text-white"
                            />

                    }

                </button>

                {

                    product.bestSeller && (

                        <span className="absolute left-4 top-4 bg-orange-500 text-xs px-3 py-1 rounded-full">

                            Bestseller

                        </span>

                    )

                }

            </div>

            <div className="p-5">

                <div className="flex justify-between">

                    <h2 className="font-bold text-xl">

                        {product.name}

                    </h2>

                    <div className="flex items-center gap-1">

                        <FaStar className="text-yellow-400" />

                        <span>

                            {product.rating || 4.8}

                        </span>

                    </div>

                </div>

                <p className="text-slate-400 mt-2">

                    {product.category?.name}

                </p>

                <div className="flex items-center justify-between mt-5">

                    <div>

                        <p className="text-2xl font-bold text-orange-400">

                            ₹{product.variants[0].price}

                        </p>

                    </div>

                    {

                        quantity === 0 ?

                            <button

                                onClick={(e) => {

                                    e.stopPropagation();

                                    addToCart(product);

                                }}

                                className="bg-orange-500 px-5 py-2 rounded-xl"

                            >

                                ADD

                            </button>

                            :

                            <div className="flex items-center gap-4">

                                <button

                                    onClick={(e) => {

                                        e.stopPropagation();

                                        decreaseQuantity(product);

                                    }}

                                    className="h-9 w-9 rounded-full bg-red-500"

                                >

                                    -

                                </button>

                                <span>

                                    {quantity}

                                </span>

                                <button

                                    onClick={(e) => {

                                        e.stopPropagation();

                                        increaseQuantity(product);

                                    }}

                                    className="h-9 w-9 rounded-full bg-green-500"

                                >

                                    +

                                </button>

                            </div>

                    }

                </div>

            </div>

        </div>

    );

};

export default ProductCard;