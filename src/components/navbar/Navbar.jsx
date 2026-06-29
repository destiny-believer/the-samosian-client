import { FaShoppingCart } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../notifications/NotificationBell";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">

                <div>

                    <h1
                        style={{ fontFamily: "Outfit" }}
                        className="text-3xl font-extrabold text-orange-500"
                    >
                        The Samosian
                    </h1>

                </div>

                <div className="hidden lg:flex items-center gap-8 text-sm font-medium">

                    <Link
                        to="/"
                        className="hover:text-orange-400 transition-all"
                    >
                        Home
                    </Link>

                    <Link to="/menu"
                        className="hover:text-orange-400 cursor-pointer transition-all"
                    >
                        Menu
                    </Link>

                    {/* <a className="hover:text-orange-400 transition-all">
                        Offers
                    </a> */}

                    <Link
                        to="/Addresses"
                        className="hover:text-orange-400 transition-all"
                    >
                        Address
                    </Link>

                </div>

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => navigate("/login")}
                        className="px-5 py-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all">
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/cart")}
                        className="relative">
                        <FaShoppingCart size={22} />
                    </button>

                    <button className="lg:hidden">
                        <HiMenuAlt3 size={28} />
                    </button>

                    <NotificationBell />
                </div>

            </div>

        </nav >
    );
};

export default Navbar;