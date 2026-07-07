import { useEffect, useState } from "react";
import ProductCard from "../../components/common/ProductCard";
import api from "../../services/api";
import { useCart } from "../../context/CartContext";

const Wishlist = () => {

    const {
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity
    } = useCart();

    const [favorites, setFavorites] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchWishlist();

    }, []);

    const fetchWishlist = async () => {

        try {

            const response = await api.get(
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

    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                Loading Wishlist...

            </div>

        );

    }

    if (favorites.length === 0) {

        return (

            <div className="min-h-screen flex flex-col justify-center items-center">

                <h1 className="text-4xl font-bold">

                    ❤️ Wishlist

                </h1>

                <p className="mt-5 text-slate-400">

                    No favourite products yet.

                </p>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-5 py-10">

            <h1
                className="text-4xl font-bold mb-10"
                style={{
                    fontFamily: "Outfit"
                }}
            >

                ❤️ Wishlist

            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {

                    favorites.map(product => (

                        <ProductCard

                            key={product._id}

                            product={product}

                            cart={cart}

                            addToCart={addToCart}

                            increaseQuantity={increaseQuantity}

                            decreaseQuantity={decreaseQuantity}

                        />

                    ))

                }

            </div>

        </div>

    );

};

export default Wishlist;