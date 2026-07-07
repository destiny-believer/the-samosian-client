import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils/image";

const RecentlyViewed = () => {

    const navigate = useNavigate();

    const [recentProducts, setRecentProducts] =
        useState([]);

    useEffect(() => {

        const recent =
            JSON.parse(
                localStorage.getItem(
                    "recentProducts"
                )
            ) || [];

        setRecentProducts(recent);

    }, []);

    if (recentProducts.length === 0) {

        return null;

    }

    return (

        <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16">

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h2
                        style={{
                            fontFamily: "Outfit"
                        }}
                        className="text-4xl font-bold"
                    >

                        👀 Recently Viewed

                    </h2>

                    <p className="text-slate-400 mt-2">

                        Continue where you left off

                    </p>

                </div>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {

                    recentProducts.map((product) => (

                        <div

                            key={product._id}

                            onClick={() =>

                                navigate(`/product/${product._id}`)

                            }

                            className="

                cursor-pointer

                rounded-3xl

                bg-white/5

                border

                border-orange-500/20

                overflow-hidden

                hover:-translate-y-2

                hover:shadow-2xl

                hover:shadow-orange-500/20

                transition-all

                "

                        >

                            <div className="relative">

                                <img

                                    src={

                                        getImageUrl(product.image)

                                    }

                                    alt={product.name}

                                    className="

                        w-full

                        aspect-square

                        object-cover

                        "

                                />

                                <div

                                    className="

                        absolute

                        bottom-4

                        left-4

                        bg-black/70

                        px-3

                        py-1

                        rounded-full

                        text-sm

                        font-bold

                        "

                                >

                                    {

                                        product.totalRatings > 0

                                            ?

                                            `⭐ ${product.rating.toFixed(1)}`

                                            :

                                            "🆕 New"

                                    }

                                </div>

                            </div>

                            <div className="p-5">

                                <h3

                                    style={{

                                        fontFamily: "Outfit"

                                    }}

                                    className="

                        text-2xl

                        font-bold

                        "

                                >

                                    {product.name}

                                </h3>

                                <p className="text-slate-400 mt-2">

                                    {

                                        product.description ||

                                        "Freshly prepared with premium ingredients."

                                    }

                                </p>

                                <div className="flex flex-wrap gap-3 mt-4 text-sm">

                                    <span>

                                        {

                                            product.isVeg

                                                ? "🟢 Veg"

                                                : "🍗 Non Veg"

                                        }

                                    </span>

                                    <span>

                                        ⏱ {product.preparationTime} mins

                                    </span>

                                    {

                                        product.isFeatured && (

                                            <span className="text-orange-500">

                                                🔥 Featured

                                            </span>

                                        )

                                    }

                                </div>

                                <div className="mt-5 flex justify-between items-center">

                                    <div>

                                        <h2 className="text-3xl text-orange-500 font-bold">

                                            ₹{product.variants?.[0]?.price}

                                        </h2>

                                        <p className="text-sm text-slate-400">

                                            Inclusive of all taxes

                                        </p>

                                    </div>

                                    <button

                                        onClick={(e) => {

                                            e.stopPropagation();

                                            navigate(`/product/${product._id}`);

                                        }}

                                        className="

                            px-5

                            py-3

                            rounded-xl

                            bg-orange-500

                            hover:bg-orange-400

                            transition-all

                            "

                                    >

                                        View Again

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default RecentlyViewed;