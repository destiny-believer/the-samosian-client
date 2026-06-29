import {
    FaHome,
    FaUtensils,
    FaShoppingCart,
    FaClipboardList,
    FaUser
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const BottomNavbar = () => {

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

    return (

        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-lg z-50">

            <div className="grid grid-cols-5">

                {

                    navItems.map(item => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({isActive})=>

                                `flex flex-col items-center py-3 ${
                                    isActive
                                    ? "text-orange-500"
                                    : "text-gray-500"
                                }`

                            }

                        >

                            <span className="text-xl">

                                {item.icon}

                            </span>

                            <span className="text-xs mt-1">

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