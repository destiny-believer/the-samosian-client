import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiClock,
    FiInstagram,
    FiFacebook,
    FiArrowUp
} from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {

    const scrollTop = () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    return (

        <footer className="bg-black border-t border-white/10">

            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

                    {/* Brand */}

                    <div>

                        <img

                            src="/logo.png"

                            className="w-24"

                            alt="logo"

                        />

                        <h2 className="text-3xl font-black mt-5">

                            THE

                            <span className="text-orange-500">

                                {" "}SAMOSIAN

                            </span>

                        </h2>

                        <p className="text-slate-400 mt-5 leading-8">

                            Freshly prepared snacks,

                            burgers,

                            fries,

                            mojitos,

                            sandwiches

                            and much more.

                        </p>

                        <div className="flex gap-4 mt-8">

                            <a

                                href="#"

                                className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center hover:bg-orange-500 transition"

                            >

                                <FiInstagram size={20}/>

                            </a>

                            <a

                                href="#"

                                className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center hover:bg-orange-500 transition"

                            >

                                <FiFacebook size={20}/>

                            </a>

                            <a

                                href="#"

                                className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center hover:bg-orange-500 transition"

                            >

                                <FaWhatsapp size={20}/>

                            </a>

                        </div>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="text-xl font-bold mb-6">

                            Quick Links

                        </h3>

                        <div className="space-y-4">

                            <Link to="/" className="block hover:text-orange-500">

                                Home

                            </Link>

                            <Link to="/menu" className="block hover:text-orange-500">

                                Menu

                            </Link>

                            <Link to="/favorites" className="block hover:text-orange-500">

                                Favorites

                            </Link>

                            <Link to="/cart" className="block hover:text-orange-500">

                                Cart

                            </Link>

                            <Link to="/account" className="block hover:text-orange-500">

                                My Account

                            </Link>

                        </div>

                    </div>

                    {/* Contact */}

                    <div>

                        <h3 className="text-xl font-bold mb-6">

                            Contact

                        </h3>

                        <div className="space-y-6">

                            <div className="flex gap-4">

                                <FiPhone className="text-orange-500 mt-1"/>

                                <span>

                                    +91 XXXXXXXXXX

                                </span>

                            </div>

                            <div className="flex gap-4">

                                <FiMail className="text-orange-500 mt-1"/>

                                <span>

                                    thesamosian@gmail.com

                                </span>

                            </div>

                            <div className="flex gap-4">

                                <FiMapPin className="text-orange-500 mt-1"/>

                                <span>

                                    Hyderabad,
                                    Telangana

                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Business Hours */}

                    <div>

                        <h3 className="text-xl font-bold mb-6">

                            Opening Hours

                        </h3>

                        <div className="space-y-5">

                            <div className="flex gap-4">

                                <FiClock className="text-orange-500 mt-1"/>

                                <div>

                                    <h4>

                                        Monday - Sunday

                                    </h4>

                                    <p className="text-slate-400">

                                        10:00 AM - 11:00 PM

                                    </p>

                                </div>

                            </div>

                            <button

                                onClick={scrollTop}

                                className="mt-8 bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-full flex items-center gap-3"

                            >

                                <FiArrowUp/>

                                Back To Top

                            </button>

                        </div>

                    </div>

                </div>

                <div className="border-t border-white/10 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center">

                    <p className="text-slate-400">

                        © {new Date().getFullYear()} The Samosian.

                        All Rights Reserved.

                    </p>

                    <div className="flex gap-8 mt-6 lg:mt-0">

                        <Link

                            to="/privacy-policy"

                            className="hover:text-orange-500"

                        >

                            Privacy Policy

                        </Link>

                        <Link

                            to="/terms"

                            className="hover:text-orange-500"

                        >

                            Terms & Conditions

                        </Link>

                    </div>

                </div>

            </div>

        </footer>

    );

};

export default Footer;