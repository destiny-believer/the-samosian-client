import {
    FaHome,
    FaUtensils,
    FaShoppingCart,
    FaClipboardList,
    FaUser
} from "react-icons/fa";

import {
    NavLink
} from "react-router-dom";
import { useLocation } from "react-router-dom";

const BottomNavbar = () => {

    const location = useLocation();
    const navItems = [

        {
            title: "Home",
            path: "/",
            icon: <FaHome />
        },

        {
            title: "Menu",
            path: "/menu",
            icon: <FaUtensils />
        },

        {
            title: "Cart",
            path: "/cart",
            icon: <FaShoppingCart />
        },

        {
            title: "Orders",
            path: "/orders",
            icon: <FaClipboardList />
        },

        {
            title: "Account",
            path: "/account",
            icon: <FaUser />
        }

    ];
    const hideRoutes = [

        "/login",

        "/register",

        "/order-success"

    ];

    if (hideRoutes.includes(location.pathname)) {

        return null;

    }
    return (

        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-slate-950 border-t border-white/10 z-50">

            <div className="grid grid-cols-5">

                {

                    navItems.map(item => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex flex-col items-center justify-center py-3 text-xs transition-all ${isActive
                                    ? "text-orange-500"
                                    : "text-gray-400"
                                }`

                            }

                        >

                            <span className="text-xl">

                                {item.icon}

                            </span>

                            <span className="mt-1">

                                {item.title}

                            </span>

                        </NavLink>

                    ))

                }

            </div>

        </div>

    );

};

export default BottomNavbar;