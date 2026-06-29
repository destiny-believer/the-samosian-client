import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 mt-20">

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          <div>

            <h2
              style={{ fontFamily: "Outfit" }}
              className="text-3xl font-bold text-orange-500"
            >
              The Samosian
            </h2>

            <p className="mt-4 text-gray-400">
              Fresh snacks and beverages delivered fast.
            </p>

          </div>

          <div>

            <h3 className="font-semibold mb-4">
              Quick Links
            </h3>

            <div className="space-y-2 text-gray-400">

              <Link to="/">Home</Link>
              <Link to="/menu">Menu</Link>
              <p>Offers</p>
              <p>Contact</p>

            </div>

          </div>

          <div>

            <h3 className="font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-2 text-gray-400">

              <p>📍 Hyderabad</p>

              <p>📞 +91 9490343702</p>

              <p>✉ support@thesamosian.com</p>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500">

          © 2020 The Samosian. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;