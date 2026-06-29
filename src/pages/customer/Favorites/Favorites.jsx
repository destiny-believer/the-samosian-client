import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import MainLayout from "../../../layouts/MainLayout";
import FloatingCartBar from "../../Cart/FloatingCartBar";
import CartDrawer from "../../Cart/CartDrawer";

const Favorites = () => {

    const navigate = useNavigate();

    const [favorites, setFavorites] =
        useState([]);

    const [cartSummary, setCartSummary] =
        useState({

            itemCount: 0,

            totalAmount: 0

        });

    const [cartItems, setCartItems] =
        useState([]);

    const [drawerProduct, setDrawerProduct] =
        useState(null);

    const [showCartDrawer, setShowCartDrawer] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const fetchFavorites =
        async () => {

            try {

                const response =
                    await api.get(
                        "/customers/favorites"
                    );

                setFavorites(
                    response.data.favorites
                );

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        };

    const fetchCartSummary =
        async () => {

            try {

                const response =
                    await api.get("/cart");

                const cart =
                    response.data.cart;

                const itemCount =
                    cart.items.reduce(

                        (total, item) =>

                            total +
                            item.quantity,

                        0

                    );

                setCartItems(
                    cart.items
                );

                setCartSummary({

                    itemCount,

                    totalAmount:
                        cart.totalAmount

                });

            }

            catch (error) {

                console.log(error);

            }

        };

    const getProductQuantity =
        (productId) => {

            const item =
                cartItems.find(

                    cartItem =>

                        cartItem.product._id ===
                        productId

                );

            return item
                ? item.quantity
                : 0;

        };

    const addDirectly =
        async (product) => {

            try {

                await api.post(

                    "/cart/add",

                    {

                        productId:
                            product._id,

                        variantName:
                            product.variants[0].name,

                        quantity: 1

                    }

                );

                await fetchCartSummary();

                setDrawerProduct(
                    product
                );

                setShowCartDrawer(
                    true
                );

            }

            catch (error) {

                console.log(error);

            }

        };

    const increaseQuantity =
        async (product) => {

            try {

                const qty =
                    getProductQuantity(
                        product._id
                    );

                await api.patch(

                    "/cart/quantity",

                    {

                        productId:
                            product._id,

                        variantName:
                            product.variants[0].name,

                        quantity:
                            qty + 1

                    }

                );

                fetchCartSummary();

            }

            catch (error) {

                console.log(error);

            }

        };

    const decreaseQuantity =
        async (product) => {

            try {

                const qty =
                    getProductQuantity(
                        product._id
                    );

                if (qty <= 1) {

                    await api.delete(

                        "/cart/remove",

                        {

                            data: {

                                productId:
                                    product._id,

                                variantName:
                                    product.variants[0].name

                            }

                        }

                    );

                }

                else {

                    await api.patch(

                        "/cart/quantity",

                        {

                            productId:
                                product._id,

                            variantName:
                                product.variants[0].name,

                            quantity:
                                qty - 1

                        }

                    );

                }

                fetchCartSummary();

            }

            catch (error) {

                console.log(error);

            }

        };

    const removeFavorite =
        async (productId) => {

            try {

                await api.patch(

                    `/customers/favorite/${productId}`

                );

                setFavorites(

                    prev =>

                        prev.filter(

                            product =>

                                product._id !==
                                productId

                        )

                );

            }

            catch (error) {

                console.log(error);

            }

        };

    useEffect(() => {

        fetchFavorites();

        fetchCartSummary();

    }, []);

    if (loading) {

        return (

            <MainLayout>

                <Navbar />

                <div className="pt-40 text-center">

                    Loading Favorites...

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <Navbar />

            <div className="

                min-h-screen

                pt-10

                max-w-7xl

                mx-auto

                px-5

                lg:px-8

            ">

                <h1

                    style={{
                        fontFamily: "Outfit"
                    }}

                    className="

                        text-4xl

                        font-bold

                        mb-8

                    "

                >

                    ❤️ My Favorites

                </h1>

                {

                    favorites.length === 0

                        ?

                        (

                            <div className="

                            flex

                            flex-col

                            items-center

                            justify-center

                            py-32

                        ">

                                <div className="text-8xl">

                                    ❤️

                                </div>

                                <h2 className="

                                text-3xl

                                font-bold

                                mt-6

                            ">

                                    No Favorites Yet

                                </h2>

                                <p className="

                                text-slate-400

                                mt-4

                            ">

                                    Save your favourite dishes here.

                                </p>

                                <button

                                    onClick={() =>

                                        navigate("/menu")

                                    }

                                    className="

                                    mt-8

                                    bg-orange-500

                                    px-8

                                    py-3

                                    rounded-xl

                                "

                                >

                                    Explore Menu

                                </button>

                            </div>

                        )

                        :

                        (

                            <div className="

                            grid

                            sm:grid-cols-2

                            lg:grid-cols-3

                            gap-8

                        ">

                                {

                                    favorites.map(

                                        product => (

                                            <div

                                                key={product._id}

                                                className="

                                                rounded-3xl

                                                overflow-hidden

                                                bg-white/5

                                                border

                                                border-orange-500/20

                                            "

                                            >

                                                {

                                                    product.image &&

                                                    (

                                                        <img

                                                            src={product.image}

                                                            alt={product.name}

                                                            className="

                                                            w-full

                                                            h-60

                                                            object-cover

                                                        "

                                                        />

                                                    )

                                                }

                                                <div className="p-5">

                                                    <div className="

                                                    flex

                                                    justify-between

                                                    items-center

                                                ">

                                                        <h2

                                                            style={{

                                                                fontFamily: "Outfit"

                                                            }}

                                                            className="

                                                            text-2xl

                                                            font-bold

                                                        "

                                                        >

                                                            {

                                                                product.name

                                                            }

                                                        </h2>

                                                        <button

                                                            onClick={() =>

                                                                removeFavorite(

                                                                    product._id

                                                                )

                                                            }

                                                            className="

                                                            text-3xl

                                                        "

                                                        >

                                                            ❤️

                                                        </button>

                                                    </div>

                                                    <div className="

                                                    flex

                                                    items-center

                                                    gap-3

                                                    mt-4

                                                    text-sm

                                                    text-slate-400

                                                ">

                                                        <span>

                                                            {

                                                                product.isVeg

                                                                    ?

                                                                    "🟢 Veg"

                                                                    :

                                                                    "🔴 Non Veg"

                                                            }

                                                        </span>

                                                        <span>

                                                            ⏱ {

                                                                product.preparationTime

                                                            } mins

                                                        </span>

                                                    </div>

                                                    <div className="

                                                    mt-3

                                                    text-yellow-400

                                                ">

                                                        ⭐ {

                                                            product.rating

                                                        }

                                                        (

                                                        {

                                                            product.totalRatings

                                                        }

                                                        )

                                                    </div>

                                                    <div className="

                                                    mt-5

                                                    flex

                                                    justify-between

                                                    items-center

                                                ">

                                                        <span className="

                                                        text-orange-500

                                                        font-bold

                                                        text-2xl

                                                    ">

                                                            ₹{

                                                                product.variants?.[0]?.price

                                                            }

                                                        </span>

                                                        <button

                                                            onClick={() => navigate(

                                                                `/product/${product._id}`

                                                            )}

                                                            className="

                                                            px-4

                                                            py-2

                                                            border

                                                            border-white/10

                                                            rounded-xl

                                                        "

                                                        >

                                                            View

                                                        </button>

                                                    </div>

                                                    <div className="mt-6">                                                    {

                                                        getProductQuantity(
                                                            product._id
                                                        ) === 0

                                                            ?

                                                            (

                                                                <button

                                                                    onClick={() =>
                                                                        addDirectly(
                                                                            product
                                                                        )
                                                                    }

                                                                    className="
                                                                    w-full
                                                                    py-3
                                                                    rounded-xl
                                                                    bg-orange-500
                                                                    hover:bg-orange-400
                                                                    transition-all
                                                                "

                                                                >

                                                                    + Add To Cart

                                                                </button>

                                                            )

                                                            :

                                                            (

                                                                <div
                                                                    className="
                                                                    flex
                                                                    justify-center
                                                                    items-center
                                                                    gap-6
                                                                    bg-orange-500
                                                                    rounded-xl
                                                                    py-3
                                                                "
                                                                >

                                                                    <button

                                                                        onClick={() =>
                                                                            decreaseQuantity(
                                                                                product
                                                                            )
                                                                        }

                                                                        className="
                                                                        text-xl
                                                                        font-bold
                                                                    "

                                                                    >

                                                                        -

                                                                    </button>

                                                                    <span
                                                                        className="
                                                                        text-lg
                                                                        font-bold
                                                                    "
                                                                    >

                                                                        {

                                                                            getProductQuantity(
                                                                                product._id
                                                                            )

                                                                        }

                                                                    </span>

                                                                    <button

                                                                        onClick={() =>
                                                                            increaseQuantity(
                                                                                product
                                                                            )
                                                                        }

                                                                        className="
                                                                        text-xl
                                                                        font-bold
                                                                    "

                                                                    >

                                                                        +

                                                                    </button>

                                                                </div>

                                                            )

                                                    }

                                                    </div>

                                                </div>

                                            </div>

                                        )

                                    )

                                }

                            </div>

                        )

                }

            </div>

            <FloatingCartBar

                itemCount={
                    cartSummary.itemCount
                }

                totalAmount={
                    cartSummary.totalAmount
                }

            />

            <CartDrawer

                isOpen={
                    showCartDrawer
                }

                onClose={() =>
                    setShowCartDrawer(
                        false
                    )
                }

                product={
                    drawerProduct
                }

                quantity={1}

            />

        </MainLayout>

    );

};

export default Favorites;