import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen pt-24 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 min-h-[90vh] grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
            <span>📍</span>
            <span className="text-sm text-gray-200">
              Hyderabad's Favourite Snacks
            </span>
          </div>

          <h1
            style={{ fontFamily: "Outfit" }}
            className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold leading-[0.95]"
          >
            Freshly Made

            <span className="block text-orange-500">
              Samosas
            </span>

            Delivered Fast
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl">
            Crispy, hot and freshly prepared snacks delivered to your doorstep with quality, freshness and speed.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <button
            onClick={() => navigate("/menu")}
            className="px-8 py-4 bg-orange-500 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/30">
              Order Now →
            </button>

            <button
            onClick={() => navigate("/menu")}
            className="px-8 py-4 border border-orange-500 rounded-2xl hover:bg-orange-500/10 transition-all duration-300">
              Explore Menu
            </button>

          </div>

          <div className="flex flex-wrap gap-8 mt-10">

            <div>
              <p className="font-semibold">
                🚴 Fast Delivery
              </p>
              <p className="text-gray-400 text-sm">
                30-40 mins
              </p>
            </div>

            <div>
              <p className="font-semibold">
                ⭐ Best Quality
              </p>
              <p className="text-gray-400 text-sm">
                Always Fresh
              </p>
            </div>

            <div>
              <p className="font-semibold">
                📞 24/7 Support
              </p>
              <p className="text-gray-400 text-sm">
                We're Here
              </p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >

          <img
            src="/hero-food.png"
            alt="Hero Food"
            className="w-full max-w-3xl object-contain"
          />

        </motion.div>

      </div>

    </section>
  );
};

export default HeroSection;