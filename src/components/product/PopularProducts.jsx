import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const products = [
  {
    name: "Chicken Burger",
    price: 149,
    image: "/products/burger.png",
    rating: 4.8,
  },
  {
    name: "Chicken Pizza",
    price: 249,
    image: "/products/pizza.png",
    rating: 4.9,
  },
  {
    name: "Oreo Milkshake",
    price: 129,
    image: "/products/milkshake.png",
    rating: 4.7,
  },
  {
    name: "Blue Curacao Mojito",
    price: 99,
    image: "/products/mojito.png",
    rating: 4.8,
  },
  {
    name: "Chicken Wings",
    price: 199,
    image: "/products/wings.png",
    rating: 4.9,
  },
  {
    name: "Veg Momos",
    price: 119,
    image: "/products/momos.png",
    rating: 4.6,
  },
];

const PopularProducts = () => {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="text-center mb-14">

          <p className="text-orange-500 font-semibold uppercase tracking-widest">
            Popular Products
          </p>

          <h2
            style={{ fontFamily: "Outfit" }}
            className="mt-3 text-4xl md:text-5xl font-bold"
          >
            Customer Favorites
          </h2>

          <p className="mt-4 text-gray-400">
            Most loved items from The Samosian
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="overflow-hidden rounded-3xl bg-white/5 border border-orange-500/20 backdrop-blur-lg hover:border-orange-500 transition-all duration-300"
            >

              <div className="p-5">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-contain"
                />

              </div>

              <div className="px-5 pb-5">

                <div className="flex justify-between items-center">

                  <h3
                    style={{ fontFamily: "Outfit" }}
                    className="text-xl font-semibold"
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 text-yellow-400">

                    <FaStar />

                    <span>{product.rating}</span>

                  </div>

                </div>

                <div className="mt-4 flex justify-between items-center">

                  <span className="text-orange-500 text-xl font-bold">
                    ₹{product.price}
                  </span>

                  <button className="px-4 py-2 bg-orange-500 rounded-xl hover:bg-orange-600 transition-all duration-300">
                    Add
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default PopularProducts;