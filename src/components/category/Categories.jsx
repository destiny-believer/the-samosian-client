import { motion } from "framer-motion";

const categories = [
  {
    name: "Fried Chicken",
    image: "/categories/fried-chicken.png",
  },
  {
    name: "Pizza",
    image: "/categories/pizza.png",
  },
  {
    name: "Burgers",
    image: "/categories/burger.png",
  },
  {
    name: "Sandwiches",
    image: "/categories/sandwich.png",
  },
  {
    name: "Momos",
    image: "/categories/momos.png",
  },
  {
    name: "Mojitos",
    image: "/categories/mojito.png",
  },
  {
    name: "Milkshakes",
    image: "/categories/milkshake.png",
  },
  {
    name: "French Fries",
    image: "/categories/fries.png",
  },
];

const Categories = () => {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="text-center mb-14">

          <p className="text-orange-500 font-semibold uppercase tracking-widest">
            Explore Categories
          </p>

          <h2
            style={{ fontFamily: "Outfit" }}
            className="mt-3 text-4xl md:text-5xl font-bold"
          >
            What's Your Craving Today?
          </h2>

          <p className="mt-4 text-gray-400">
            Choose from your favourite snacks and beverages
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {categories.map((item, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-orange-500/20 rounded-3xl p-5 backdrop-blur-lg cursor-pointer hover:border-orange-500 transition-all duration-300"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-contain"
              />

              <h3
                style={{ fontFamily: "Outfit" }}
                className="mt-4 text-center text-lg font-semibold"
              >
                {item.name}
              </h3>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Categories;