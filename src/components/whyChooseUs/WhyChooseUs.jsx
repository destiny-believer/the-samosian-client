import {
  FaMotorcycle,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

import {
  MdFastfood,
  MdPayments,
} from "react-icons/md";

const features = [
  {
    icon: <FaMotorcycle size={32} />,
    title: "Fast Delivery",
    description: "Quick delivery within your area.",
  },
  {
    icon: <MdFastfood size={32} />,
    title: "Freshly Prepared",
    description: "Made only after your order is placed.",
  },
  {
    icon: <MdPayments size={32} />,
    title: "No Hidden Charges",
    description: "Transparent pricing every time.",
  },
  {
    icon: <FaMapMarkerAlt size={32} />,
    title: "Delivery Within 3 KM",
    description: "Focused service for maximum freshness.",
  },
  {
    icon: <FaStar size={32} />,
    title: "Premium Quality",
    description: "Best ingredients and taste.",
  },
  {
    icon: <FaShieldAlt size={32} />,
    title: "Safe Packaging",
    description: "Hygienic and secure packing.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="text-center mb-16">

          <p className="text-orange-500 font-semibold uppercase tracking-widest">
            Why Choose Us
          </p>

          <h2
            style={{ fontFamily: "Outfit" }}
            className="mt-3 text-4xl md:text-5xl font-bold"
          >
            Why Customers Love The Samosian
          </h2>

          <p className="mt-4 text-gray-400">
            Fresh food, fast delivery and quality service.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((item, index) => (

            <div
              key={index}
              className="p-8 rounded-3xl bg-white/5 border border-orange-500/20 backdrop-blur-lg hover:border-orange-500 hover:-translate-y-2 transition-all duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-5">
                {item.icon}
              </div>

              <h3
                style={{ fontFamily: "Outfit" }}
                className="text-2xl font-semibold mb-3"
              >
                {item.title}
              </h3>

              <p className="text-gray-400">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;