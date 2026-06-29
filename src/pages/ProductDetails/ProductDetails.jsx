import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../../services/api";

const ProductDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [showCartDrawer, setShowCartDrawer] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [customer, setCustomer] = useState(null);
    const [myReview, setMyReview] = useState(null);
    const [showReviewBox, setShowReviewBox] = useState(false);

    const fetchProduct = async () => {

        try {

            const response =
                await api.get(`/products/product/${id}`);

            const fetchedProduct = response.data.product;

            setProduct(fetchedProduct);

            await fetchRelatedProducts(fetchedProduct);

            const storedCustomer = JSON.parse(
                localStorage.getItem("customer")
            );

            if (storedCustomer) {

                const review = fetchedProduct.reviews?.find(

                    item =>

                        item.customer?._id === storedCustomer._id

                );

                if (review) {

                    setMyReview(review);

                }

            }

            if (fetchedProduct.variants?.length) {

                setSelectedVariant(fetchedProduct.variants[0]);

            }

            fetchFavoriteStatus(fetchedProduct._id);

        } catch (error) {

            console.log(error);

        }

    };


    const fetchRelatedProducts = async (currentProduct) => {

        try {

            const response = await api.get("/products");

            const products = response.data.products;

            let related = products.filter(item =>

                item._id !== currentProduct._id &&
                item.category?._id === currentProduct.category?._id &&
                item.isAvailable

            );

            if (related.length < 4) {

                const additionalProducts = products.filter(item =>

                    item._id !== currentProduct._id &&
                    !related.some(product => product._id === item._id) &&
                    item.isAvailable

                );

                related = [...related, ...additionalProducts];

            }

            setRelatedProducts(related.slice(0, 4));

        }

        catch (error) {

            console.log(error);

        }

    };

    const addToCart = async () => {

        const token =
            localStorage.getItem(
                "customerToken"
            );

        if (!token) {

            navigate("/login");

            return;
        }


        try {

            await api.post(
                "/cart/add",
                {
                    productId: product._id,
                    variantName:
                        selectedVariant.name,
                    quantity
                }
            );

            setShowCartDrawer(true);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchFavoriteStatus = async (productId) => {

        try {

            const response = await api.get("/customers/favorites");

            const favorite = response.data.favorites.some(

                item => item._id === productId

            );

            setIsFavorite(favorite);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchProduct();

        const storedCustomer = JSON.parse(
            localStorage.getItem("customer")
        );

        if (storedCustomer) {

            setCustomer(storedCustomer);

        }

    }, []);

    const toggleFavorite =
        async () => {

            try {

                const response =
                    await api.patch(

                        `/customers/favorite/${product._id}`

                    );

                setIsFavorite(
                    response.data.favorite
                );

            }

            catch (error) {

                console.log(error);

            }

        };

    if (!product) {
        return (
            <div className="pt-32 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-2 max-w-7xl mx-auto px-5 lg:px-8">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-orange-500 font-semibold mb-8 hover:text-orange-400 transition-all"
            >
                ← Back to Menu
            </button>

            <div className="grid lg:grid-cols-2 gap-8">

                <div>

                    <img
                        ssrc={
                            product.image ||
                            "https://placehold.co/500x500?text=No+Image"
                        }
                        alt={product.name}
                        className="w-full rounded-3xl"
                    />

                </div>

                <div>

                    <h1
                        style={{ fontFamily: "Outfit" }}
                        className="text-5xl font-bold py-5"
                    >

                        {product.name}

                    </h1>

                    <div className="relative">

                        <img
                            src={product.image || "https://placehold.co/700x500?text=No+Image"}
                            alt={product.name}
                            className="w-full h-[500px] object-cover rounded-3xl"
                        />

                        <button
                            onClick={toggleFavorite}
                            className="absolute top-5 right-5 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl hover:scale-110 transition-all"
                        >

                            {isFavorite ? "❤️" : "🤍"}

                        </button>

                        <div className="absolute bottom-5 left-5 bg-black/70 text-white px-4 py-2 rounded-full font-semibold">

                            ⭐ {product.rating?.toFixed(1)}

                        </div>

                        {

                            product.isFeatured &&

                            (

                                <div className="absolute top-5 left-5 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">

                                    🔥 Featured

                                </div>

                            )

                        }

                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">

                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">

                            {product.isVeg ? "🟢 Veg" : "🍗 Non Veg"}

                        </span>

                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">

                            ⏱ {product.preparationTime} mins

                        </span>

                        <span className={`${product.isAvailable ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"} px-3 py-1 rounded-full text-sm`}>

                            {product.isAvailable ? "Available" : "Unavailable"}

                        </span>

                        {

                            product.isFeatured &&

                            (

                                <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">

                                    🔥 Featured

                                </span>

                            )

                        }

                    </div>

                    {/* <div className="mt-8">

                        <h2 className="text-2xl font-bold mb-3">

                            Description

                        </h2>

                        <p className="text-slate-400 leading-8">

                            {product.description || "No description available."}

                        </p>

                        <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10">

                            <h2 className="text-xl font-bold mb-4">

                                Delivery Information

                            </h2>

                            <div className="space-y-3">

                                <p>🚚 Free Delivery</p>

                                <p>📍 Delivery available within 3 KM</p>

                                <p>⏱ Estimated delivery: {product.preparationTime + 15} mins</p>

                            </div>

                            <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10">

                                <h2 className="text-xl font-bold mb-4">

                                    Why You'll Love It

                                </h2>

                                <ul className="space-y-2 text-slate-300">

                                    <li>✔ Freshly Prepared After Order</li>

                                    <li>✔ Premium Quality Ingredients</li>

                                    <li>✔ Hygienically Packed</li>

                                    <li>✔ Served Hot & Fresh</li>

                                </ul>

                            </div>

                        </div>

                    </div> */}

                    <div className="mt-8">

                        <h2 className="text-2xl font-bold mb-5">

                            Choose Your Variant

                        </h2>

                        <div className="flex flex-wrap gap-4">

                            {product.variants?.map(
                                (variant) => (

                                    <button
                                        key={variant.name}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`w-full flex justify-between items-center p-5 rounded-2xl border transition-all ${selectedVariant?.name === variant.name ? "border-orange-500 bg-orange-500/10" : "border-white/10 hover:border-orange-400"}`}
                                    >

                                        <div className="flex items-center gap-4">

                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedVariant?.name === variant.name ? "border-orange-500" : "border-gray-500"}`}>

                                                {

                                                    selectedVariant?.name === variant.name &&

                                                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>

                                                }

                                            </div>

                                            <span className="text-lg font-semibold">

                                                {variant.name}

                                            </span>

                                        </div>

                                        <span className="text-orange-500 font-bold text-xl">

                                            ₹{variant.price}

                                        </span>

                                    </button>

                                )
                            )}

                            <button

                                onClick={toggleFavorite}

                                className="text-4xl"

                            >

                                {

                                    isFavorite

                                        ?

                                        "❤️"

                                        :

                                        "🤍"

                                }

                            </button>

                        </div>

                    </div>

                    <div className="mt-8">

                        <h2 className="text-xl font-semibold mb-4">
                            Quantity
                        </h2>

                        <div className="flex items-center gap-5">

                            <button
                                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                className="w-12 h-12 rounded-full bg-orange-500 text-2xl font-bold hover:bg-orange-400 transition-all"
                            >

                                -

                            </button>

                            <span className="text-2xl font-bold w-10 text-center">

                                {quantity}

                            </span>

                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-12 h-12 rounded-full bg-orange-500 text-2xl font-bold hover:bg-orange-400 transition-all"
                            >

                                +

                            </button>

                        </div>

                    </div>

                    <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">

                        <div>

                            <h2 className="text-4xl font-bold text-orange-500">

                                ₹{selectedVariant?.price}

                            </h2>

                            <p className="text-slate-400">

                                Inclusive of all taxes

                            </p>

                        </div>

                        <button
                            onClick={addToCart}
                            className="px-10 py-4 bg-orange-500 rounded-2xl text-lg font-semibold hover:bg-orange-400 transition-all"
                        >

                            🛒 Add To Cart

                        </button>

                    </div>
                    <div className="mt-12 border-t border-white/10 pt-10">

                        <div className="flex items-center justify-between mb-8">

                            <h2 className="text-3xl font-bold">

                                ⭐ Customer Reviews

                            </h2>

                            <span className="text-orange-500 font-semibold">

                                {product.totalRatings} Reviews

                            </span>

                        </div>

                        <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">

                            <div className="text-5xl font-bold text-orange-500">

                                {product.rating?.toFixed(1)}

                            </div>

                            <div>

                                <div className="text-yellow-400 text-2xl">

                                    ⭐⭐⭐⭐⭐

                                </div>

                                <p className="text-slate-400">

                                    Based on {product.totalRatings} customer reviews

                                </p>

                            </div>

                        </div>

                        {

                            product.reviews?.length === 0

                                ?

                                (

                                    <div className="text-center py-10">

                                        <h3 className="text-2xl font-semibold">

                                            No Reviews Yet

                                        </h3>

                                        <p className="text-slate-400 mt-3">

                                            Be the first customer to review this product after delivery.

                                        </p>

                                    </div>

                                )

                                :

                                (

                                    <div className="space-y-6">

                                        {

                                            product.reviews

                                                .slice(0, 3)

                                                .map((review) => (

                                                    <div
                                                        key={review._id}
                                                        className="bg-white/5 border border-white/10 rounded-2xl p-6"
                                                    >

                                                        <div className="flex justify-between items-center mb-3">

                                                            <div>

                                                                <h3 className="text-lg font-bold">

                                                                    {

                                                                        review.customerName ||

                                                                        "Customer"

                                                                    }

                                                                </h3>

                                                                <p className="text-yellow-400">

                                                                    {

                                                                        "⭐".repeat(review.rating)

                                                                    }

                                                                </p>

                                                            </div>

                                                            <p className="text-slate-500 text-sm">

                                                                {

                                                                    new Date(

                                                                        review.createdAt

                                                                    ).toLocaleDateString()

                                                                }

                                                            </p>

                                                        </div>

                                                        <p className="text-slate-300 leading-7">

                                                            {

                                                                review.comment

                                                            }

                                                        </p>

                                                    </div>

                                                ))

                                        }

                                        {

                                            product.reviews.length > 3 &&

                                            (

                                                <div className="text-center mt-8">

                                                    <button
                                                        className="px-6 py-3 border border-orange-500 rounded-xl hover:bg-orange-500 transition-all"
                                                    >

                                                        View All Reviews

                                                    </button>

                                                </div>

                                            )

                                        }
                                    </div>

                                )

                        }

                    </div>

                </div>

            </div>

            {
                showCartDrawer && (

                    <div
                        className="
      fixed
      inset-0
      z-50
      bg-black/60
      backdrop-blur-sm
    "
                        onClick={() =>
                            setShowCartDrawer(false)
                        }
                    >

                        <div
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                            className="
        absolute
        right-0
        top-0
        h-full
        w-full
        max-w-md
        bg-slate-900
        border-l
        border-cyan-500/20
        p-6
      "
                        >

                            <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

                                <h2 className="
            text-2xl
            font-bold
          ">

                                    🛒 Added To Cart

                                </h2>

                                <button
                                    onClick={() =>
                                        setShowCartDrawer(false)
                                    }
                                >

                                    ✕

                                </button>

                            </div>

                            <div className="space-y-4">

                                <div className="flex items-center gap-3 mt-3">

                                    <div className="
    bg-green-500
    px-3
    py-1
    rounded-full
    text-sm
    font-semibold
  ">

                                        ⭐ {product.rating?.toFixed(1)}

                                    </div>

                                    <span className="text-slate-400">

                                        ({product.totalRatings} Reviews)

                                    </span>

                                </div>

                                <p>

                                    {selectedVariant.name}

                                </p>

                                <p>

                                    Quantity:
                                    {" "}
                                    {quantity}

                                </p>

                            </div>

                            <div className="
          mt-8
          space-y-3
        ">

                                <button
                                    onClick={() =>
                                        setShowCartDrawer(false)
                                    }
                                    className="
            w-full
            py-4
            rounded-2xl
            border
            border-white/10
          "
                                >

                                    Continue Shopping

                                </button>

                                <button
                                    onClick={() =>
                                        navigate("/cart")
                                    }
                                    className="
            w-full
            py-4
            rounded-2xl
            bg-orange-500
          "
                                >

                                    View Cart

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }
            {relatedProducts.length > 0 ? (

                <div className="mt-16">

                    <h2 className="text-3xl font-bold mb-8">

                        🍽️ You May Also Like

                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">



                    </div>

                </div>

            )

                :

                (

                    <div className="mt-16 rounded-3xl border border-dashed border-orange-500/30 bg-white/5 p-10 text-center">

                        <div className="text-6xl">

                            🍽️

                        </div>

                        <h2 className="mt-5 text-3xl font-bold">

                            No Related Dishes Available

                        </h2>

                        <p className="mt-3 text-slate-400">

                            We're preparing more delicious dishes in this category.

                        </p>

                        <button
                            onClick={() => navigate("/menu")}
                            className="mt-8 bg-orange-500 hover:bg-orange-400 px-8 py-3 rounded-xl font-semibold transition-all"
                        >

                            Explore Full Menu

                        </button>

                    </div>

                )
            }

            <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-orange-500/20 p-4 z-50">

                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    <div>

                        <h2 className="text-3xl font-bold text-orange-500">

                            ₹{selectedVariant?.price * quantity}

                        </h2>

                        <p className="text-slate-400">

                            Total Price

                        </p>

                    </div>

                    <button
                        onClick={addToCart}
                        className="bg-orange-500 hover:bg-orange-400 px-8 py-4 rounded-2xl text-lg font-bold transition-all"
                    >

                        🛒 Add To Cart

                    </button>

                </div>

            </div>
        </div>
    );
};

export default ProductDetails;


