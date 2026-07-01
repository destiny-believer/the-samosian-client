import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiMenu,
    FiX,
    FiShoppingCart,
    FiUser,
    FiSearch
} from "react-icons/fi";

const NavbarV2 = () => {

    const navigate = useNavigate();

    const [mobileMenu, setMobileMenu] =
        useState(false);

    const [scrolled, setScrolled] =
        useState(false);

    const [cartCount, setCartCount] =
        useState(0);

    const customer =
        JSON.parse(
            localStorage.getItem("customer")
        );

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(
                window.scrollY > 30
            );

        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );

    }, []);

    useEffect(() => {

        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            );

        if (cart?.items) {

            setCartCount(
                cart.items.length
            );

        }

    }, []);

    const logout = () => {

        localStorage.removeItem(
            "customer"
        );

        localStorage.removeItem(
            "customerToken"
        );

        navigate("/");

    };

    const navItems = [

        {
            title: "Home",
            path: "/"
        },

        {
            title: "Menu",
            path: "/menu"
        },

        {
            title: "Track Order",
            path: "/orders"
        },

        {
            title: "Contact",
            path: "/contact"
        }

    ];

    return (

        <motion.header

            initial={{
                y: -100
            }}

            animate={{
                y: 0
            }}

            className={`

                fixed

                top-0

                left-0

                w-full

                z-50

                transition-all

                duration-500

                ${

                    scrolled

                        ?

                        "backdrop-blur-xl bg-slate-950/85 border-b border-white/10 shadow-2xl"

                        :

                        "bg-transparent"

                }

            `}

        >

            <div className="max-w-7xl mx-auto px-6">

                <div className="h-20 flex items-center justify-between">

                    {/* Logo */}

                    <Link

                        to="/"

                        className="flex items-center gap-3"

                    >

                        <img

                            src="/logo.png"

                            alt="logo"

                            className="w-12"

                        />

                        <div>

                            <h1 className="font-black text-2xl">

                                THE

                                <span className="text-orange-500">

                                    {" "}SAMOSIAN

                                </span>

                            </h1>

                            <p className="text-xs text-slate-400">

                                Taste That Brings You Back

                            </p>

                        </div>

                    </Link>

                    {/* Desktop Menu */}

                    <nav className="hidden lg:flex items-center gap-8">

                        {

                            navItems.map(item => (

                                <NavLink

                                    key={item.title}

                                    to={item.path}

                                    className={({ isActive }) =>

                                        `

                                        relative

                                        font-semibold

                                        transition

                                        hover:text-orange-500

                                        ${

                                            isActive

                                                ?

                                                "text-orange-500"

                                                :

                                                "text-white"

                                        }

                                    `

                                    }

                                >

                                    {item.title}

                                </NavLink>

                            ))

                        }

                    </nav>

                    {/* Right Side */}

                    <div className="hidden lg:flex items-center gap-5">

                        <button>

                            <FiSearch

                                size={22}

                            />

                        </button>

                        <button

                            className="relative"

                            onClick={()=>

                                navigate("/cart")

                            }

                        >

                            <FiShoppingCart

                                size={24}

                            />

                            {

                                cartCount > 0 && (

                                    <span

                                        className="absolute -top-2 -right-2 bg-orange-500 w-5 h-5 rounded-full text-xs flex items-center justify-center"

                                    >

                                        {

                                            cartCount

                                        }

                                    </span>

                                )

                            }

                        </button>

                        {

                            customer

                                ?

                                <button

                                    onClick={()=>

                                        navigate("/account")

                                    }

                                    className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-full font-semibold"

                                >

                                    {customer.name}

                                </button>

                                :

                                <button

                                    onClick={()=>

                                        navigate("/login")

                                    }

                                    className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-full font-semibold"

                                >

                                    Login

                                </button>

                        }

                    </div>

                    {/* Mobile */}

                    <button

                        className="lg:hidden"

                        onClick={()=>

                            setMobileMenu(

                                !mobileMenu

                            )

                        }

                    >

                        {

                            mobileMenu

                                ?

                                <FiX size={30}/>

                                :

                                <FiMenu size={30}/>

                        }

                    </button>

                </div>

            </div>

            {/* Mobile Drawer */}

            <AnimatePresence>

                {

                    mobileMenu && (

                        <motion.div

                            initial={{

                                x: "100%"

                            }}

                            animate={{

                                x:0

                            }}

                            exit={{

                                x:"100%"

                            }}

                            transition={{

                                duration:.35

                            }}

                            className="fixed right-0 top-0 h-screen w-72 bg-slate-900 shadow-2xl p-8"

                        >

                            <div className="space-y-7 mt-10">

                                {

                                    navItems.map(item=>(

                                        <NavLink

                                            key={item.title}

                                            to={item.path}

                                            onClick={()=>

                                                setMobileMenu(false)

                                            }

                                            className="block text-xl"

                                        >

                                            {item.title}

                                        </NavLink>

                                    ))

                                }

                                <button

                                    onClick={()=>

                                        navigate("/cart")

                                    }

                                    className="block"

                                >

                                    Cart

                                </button>

                                {

                                    customer

                                        ?

                                        <>

                                            <button

                                                onClick={()=>

                                                    navigate("/account")

                                                }

                                                className="block"

                                            >

                                                Profile

                                            </button>

                                            <button

                                                onClick={logout}

                                                className="text-red-500"

                                            >

                                                Logout

                                            </button>

                                        </>

                                        :

                                        <button

                                            onClick={()=>

                                                navigate("/login")

                                            }

                                        >

                                            Login

                                        </button>

                                }

                            </div>

                        </motion.div>

                    )

                }

            </AnimatePresence>

        </motion.header>

    );

};

export default NavbarV2;