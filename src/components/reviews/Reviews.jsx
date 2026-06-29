import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Rahul",
    rating: 5,
    review:
      "Best samosas I've had in Hyderabad. Crispy and fresh every time.",
  },
  {
    name: "Priya",
    rating: 5,
    review:
      "Fast delivery and amazing packaging. Mojitos are my favorite.",
  },
  {
    name: "Arjun",
    rating: 5,
    review:
      "The burgers and fries are incredible. Definitely ordering again.",
  },
];

const Reviews = () => {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        <div className="text-center mb-16">

          <p className="text-orange-500 font-semibold uppercase tracking-widest">
            Customer Reviews
          </p>

          <h2
            style={{ fontFamily: "Outfit" }}
            className="mt-3 text-4xl md:text-5xl font-bold"
          >
            Loved By Our Customers
          </h2>

          <p className="mt-4 text-gray-400">
            Real feedback from food lovers.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review, index) => (

            <div
              key={index}
              className="p-8 rounded-3xl bg-white/5 border border-orange-500/20 backdrop-blur-lg hover:border-orange-500 transition-all duration-300"
            >

              <div className="flex gap-1 text-yellow-400 mb-4">

                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}

              </div>

              <p className="text-gray-300 mb-6">
                "{review.review}"
              </p>

              <h3
                style={{ fontFamily: "Outfit" }}
                className="text-xl font-semibold"
              >
                {review.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Reviews;