import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import MainLayout from "../../layouts/MainLayout";
import FloatingCartBar from "../Cart/FloatingCartBar";
import CartDrawer from "../Cart/CartDrawer";
import { getImageUrl } from "../../utils/image.js";

const Menu = () => {

  const navigate = useNavigate();

  const [cartSummary, setCartSummary] =
    useState({
      itemCount: 0,
      totalAmount: 0
    });

  const [drawerProduct, setDrawerProduct] = useState(null);

  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [favorites, setFavorites] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false);

  const [sortBy, setSortBy] = useState("default");

  const categories = [

    "All",

    ...new Set(

      products.map(

        product =>

          product.category?.name

      )

    )

  ];

  const fetchProducts =
    async () => {

      try {

        const response =
          await api.get("/products");

        setProducts(response.data.products
        );

        setFilteredProducts(
          response.data.products
        );

      } catch (error) {

        console.log(error);

      }

    };

  const searchProducts = async (keyword) => {

    try {

      if (!keyword.trim()) {

        const filtered =

          selectedCategory === "All"

            ? products

            : products.filter(

              product =>

                product.category?.name ===

                selectedCategory

            );

        setFilteredProducts(sortProducts(filtered));

        return;

      }

      setSearchLoading(true);

      const response = await api.get(

        `/products/search?keyword=${keyword}`

      );

      let data = response.data.products;

      if (selectedCategory !== "All") {

        data = data.filter(

          product =>

            product.category?.name ===

            selectedCategory

        );

      }

      setFilteredProducts(sortProducts(data));

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setSearchLoading(false);

    }

  };

  const sortProducts = (products) => {

    let sorted = [...products];

    switch (sortBy) {

      case "price-low":

        sorted.sort(

          (a, b) =>

            a.variants[0].price -

            b.variants[0].price

        );

        break;

      case "price-high":

        sorted.sort(

          (a, b) =>

            b.variants[0].price -

            a.variants[0].price

        );

        break;

      case "rating":

        sorted.sort(

          (a, b) =>

            b.rating -

            a.rating

        );

        break;

      case "preparation":

        sorted.sort(

          (a, b) =>

            a.preparationTime -

            b.preparationTime

        );

        break;

      case "featured":

        sorted.sort(

          (a, b) =>

            b.isFeatured -

            a.isFeatured

        );

        break;

      default:

        break;

    }

    return sorted;

  };

  useEffect(() => {

    const timer = setTimeout(() => {

      searchProducts(search);

    }, 300);

    return () => clearTimeout(timer);

  }, [search, selectedCategory, sortBy, products]);

  const handleQuickAdd = (
    product
  ) => {
    addDirectly(product);
  };

  const addDirectly = async (
    product
  ) => {


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

      // setShowCartDrawer(
      //   true
      // );

    } catch (error) {

      console.log(error);

    }

  };

  const fetchCartSummary =
    async () => {

      try {

        const response =
          await api.get("/cart");

        const cart = response.data.cart || {
          items: response.data.items || [],
          totalAmount: response.data.totalAmount || 0,
        };

        const itemCount =
          cart.items.reduce(
            (total, item) =>
              total + item.quantity,
            0
          );
        setCartItems(
          response.data.cart.items
        );
        setCartSummary({
          itemCount,
          totalAmount: cart.totalAmount,
        });


      } catch (error) {

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

      } catch (error) {

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

        } else {

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

      } catch (error) {

        console.log(error);

      }

    };

  const fetchFavorites =
    async () => {

      try {

        const response =
          await api.get(
            "/customers/favorites"
          );

        const ids =
          response.data.favorites.map(
            product => product._id
          );

        setFavorites(ids);

      }

      catch (error) {

        console.log(error);

      }

    };

  const toggleFavorite =
    async (productId) => {

      try {

        const response =
          await api.patch(

            `/customers/favorite/${productId}`

          );

        if (response.data.favorite) {

          setFavorites(prev => [
            ...prev,
            productId
          ]);

        }

        else {

          setFavorites(prev =>

            prev.filter(
              id => id !== productId
            )

          );

        }

      }

      catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchProducts();

    fetchCartSummary();

    fetchFavorites();

  }, []);

  return (

    <MainLayout>
      <Navbar />
      <div className="min-h-screen pt-10 max-w-7xl mx-auto px-5 lg:px-8">

        <h1
          style={{ fontFamily: "Outfit" }}
          className="text-4xl shadow-lg font-bold mb-2"
        >
          Explore Menu
        </h1>
        <div className="sticky top-20 z-40 bg-[#0f172a]">

          <div
            className="
        mb-2
    "
          >

            <div
              className="
            flex
            items-center
            bg-white/5
            border
            border-orange-500/20
            rounded-full
            px-5
            py-2
        "
            >

              <span
                className="
                text-lg
            "
              >

                🔍

              </span>

              <input

                type="text"

                placeholder="
Search for your favourite food...
"

                value={search}

                onChange={
                  (e) =>

                    setSearch(
                      e.target.value
                    )
                }

                className="
                flex-1
                bg-transparent
                outline-none
                ml-2
                text-lg
            "

              />

            </div>

          </div>

          <div
            className="
        flex
        gap-3
        overflow-x-auto
        mb-2
        scrollbar-hide
    "
          >

            {

              categories.map(

                category => (

                  <button

                    key={category}

                    onClick={() =>
                      setSelectedCategory(category)
                    }

                    className={
                      selectedCategory === category
                        ? "px-5 py-2 rounded-full bg-orange-500 shadow-lg shadow-orange-500/30 scale-105 transition-all whitespace-nowrap"
                        : "px-5 py-2 rounded-full bg-white/5 border border-orange-500/20 hover:bg-orange-500/10 hover:border-orange-400 transition-all whitespace-nowrap"
                    }

                  >

                    <>
                      {
                        category === "All"
                          ? "🍽"
                          : category === "Fried Chicken"
                            ? "🍗"
                            : category === "Samosas"
                              ? "🥟"
                              : category === "Burgers"
                                ? "🍔"
                                : category === "Pizza"
                                  ? "🍕"
                                  : category === "French Fries"
                                    ? "🍟"
                                    : category === "Sandwich"
                                      ? "🥪"
                                      : category === "Momos"
                                        ? "🥟"
                                        : category === "Mojitos"
                                          ? "🥤"
                                          : category === "Wraps"
                                            ? "🌯"
                                            : "🍴"
                      }

                      {" "}

                      {category}

                      {" ("}

                      {
                        category === "All"
                          ? products.length
                          : products.filter(
                            product =>
                              product.category?.name === category
                          ).length
                      }

                      {")"}
                    </>

                  </button>

                )

              )

            }

          </div>

        </div>
        <div>

          <div className="flex justify-between items-center mb-3">

            <p className="text-slate-400">

              Showing

              <span className="text-orange-500 font-bold">

                {" "}
                {filteredProducts.length}
                {" "}

              </span>

              dishes

            </p>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide">

              <button

                onClick={() => setSortBy("default")}

                className={

                  sortBy === "default"

                    ?

                    "px-5 py-2 rounded-full bg-orange-500 whitespace-nowrap"

                    :

                    "px-5 py-2 rounded-full bg-white/5 border border-orange-500/20 whitespace-nowrap"

                }

              >

                ⭐ Recommended

              </button>

              <button

                onClick={() => setSortBy("price-low")}

                className={

                  sortBy === "price-low"

                    ?

                    "px-5 py-2 rounded-full bg-orange-500 whitespace-nowrap"

                    :

                    "px-5 py-2 rounded-full bg-white/5 border border-orange-500/20 whitespace-nowrap"

                }

              >

                ₹ Low → High

              </button>

              <button

                onClick={() => setSortBy("price-high")}

                className={

                  sortBy === "price-high"

                    ?

                    "px-5 py-2 rounded-full bg-orange-500 whitespace-nowrap"

                    :

                    "px-5 py-2 rounded-full bg-white/5 border border-orange-500/20 whitespace-nowrap"

                }

              >

                ₹ High → Low

              </button>

              <button

                onClick={() => setSortBy("rating")}

                className={

                  sortBy === "rating"

                    ?

                    "px-5 py-2 rounded-full bg-orange-500 whitespace-nowrap"

                    :

                    "px-5 py-2 rounded-full bg-white/5 border border-orange-500/20 whitespace-nowrap"

                }

              >

                ⭐ Highest Rated

              </button>

              <button

                onClick={() => setSortBy("preparation")}

                className={

                  sortBy === "preparation"

                    ?

                    "px-5 py-2 rounded-full bg-orange-500 whitespace-nowrap"

                    :

                    "px-5 py-2 rounded-full bg-white/5 border border-orange-500/20 whitespace-nowrap"

                }

              >

                ⏱ Fastest

              </button>

              <button

                onClick={() => setSortBy("featured")}

                className={

                  sortBy === "featured"

                    ?

                    "px-5 py-2 rounded-full bg-orange-500 whitespace-nowrap"

                    :

                    "px-5 py-2 rounded-full bg-white/5 border border-orange-500/20 whitespace-nowrap"

                }

              >

                🔥 Featured

              </button>

            </div>

          </div>

        </div>
        {

          searchLoading && (

            <div className="flex justify-center py-20">

              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

            </div>

          )

        }

        {
          !searchLoading &&

            filteredProducts.length === 0

            ?

            (

              <div className="flex flex-col items-center justify-center py-24">

                <h1 className="text-7xl">

                  😔

                </h1>

                <h2
                  className="

text-3xl

font-bold

mt-5"

                >

                  No Food Found

                </h2>

                <p
                  className="

text-slate-400

mt-3

"

                >

                  Try another keyword.

                </p>

                <button

                  onClick={() => {

                    setSearch("");

                    setSelectedCategory("All");

                  }}

                  className="

mt-8

bg-orange-500

px-8

py-3

rounded-xl

"

                >

                  Clear Search

                </button>

              </div>

            )

            :

            (

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {filteredProducts.map((product) => (



                  <div

                    key={product._id}

                    className="rounded-3xl bg-white/5 border border-orange-500/20 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"

                  >



                    <div className="relative">



                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}

                        className="

            w-full

            aspect-square

            object-contain
            rounded-t-3xl

        "

                      />



                      {/* Favorite */}



                      <button



                        onClick={() =>

                          toggleFavorite(product._id)

                        }



                        className="

            absolute

            top-4

            right-4

            text-3xl

            bg-white/80

            rounded-full

            w-12

            h-12

            flex

            items-center

            justify-center

            shadow-lg

            hover:scale-110

            transition-all

        "



                      >



                        {



                          favorites.includes(product._id)



                            ? "❤️"



                            : "🤍"



                        }



                      </button>



                      {/* Rating */}



                      <div

                        className="

            absolute

            bottom-4

            left-4

            bg-black/70

            text-white

            px-3

            py-1

            rounded-full

            text-sm

            font-bold

        "

                      >



                        {
                          product.totalRatings > 0
                            ? `⭐ ${product.rating.toFixed(1)}`
                            : "🆕 New"
                        }



                      </div>



                    </div>



                    <div className="p-5">



                      <div className="flex justify-between items-start">



                        <h2

                          style={{

                            fontFamily: "Outfit"

                          }}

                          className="

            text-2xl

            font-bold

        "

                        >



                          {product.name}



                        </h2>



                        {



                          product.isFeatured && (



                            <span

                              className="

                    bg-red-500

                    text-white

                    text-xs

                    px-2

                    py-1

                    rounded-full

                "

                            >



                              🔥 Featured



                            </span>



                          )



                        }



                      </div>





                      <p className="text-gray-400 mt-2">

                        {
                          product.description ||
                          "Freshly prepared with premium ingredients."
                        }

                      </p>



                      <div

                        className="

        flex

        flex-wrap

        gap-3

        mt-4

        text-sm

    "

                      >



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



                        <span>



                          {



                            product.isAvailable



                              ? "🟢 Available"



                              : "🔴 Unavailable"



                          }



                        </span>



                      </div>



                      <div className="mt-5 flex justify-between items-center">



                        <div>



                          <h2

                            className="

            text-3xl

            text-orange-500

            font-bold

        "

                          >



                            ₹{product.variants?.[0]?.price}



                          </h2>



                          <p

                            className="

            text-sm

            text-slate-400

        "

                          >



                            Inclusive of all taxes



                          </p>



                        </div>



                        <div className="flex gap-2">



                          <button

                            onClick={() =>

                              navigate(

                                `/product/${product._id}`

                              )

                            }

                            className="

    px-4

    py-2

    rounded-xl

    border

    border-white/10

  "

                          >



                            View



                          </button>



                          {

                            getProductQuantity(

                              product._id

                            ) === 0

                              ? (



                                <button

                                  onClick={() =>

                                    handleQuickAdd(

                                      product

                                    )

                                  }

                                  className="

      px-4

      py-2

      rounded-xl

      bg-orange-500

      hover:bg-orange-400

      transition-all

      "

                                >



                                  Add



                                </button>



                              )

                              : (



                                <div

                                  className="

      flex

      items-center

      gap-4

      bg-orange-500

      rounded-xl

      px-4

      py-2

      "

                                >



                                  <button

                                    onClick={() =>

                                      decreaseQuantity(

                                        product

                                      )

                                    }

                                    className="

        font-bold

        text-lg

        "

                                  >



                                    -



                                  </button>



                                  <span

                                    className="

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

        font-bold

        text-lg

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



                  </div>



                ))}

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

export default Menu;