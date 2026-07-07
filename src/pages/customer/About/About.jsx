import {

    FaArrowLeft,

    FaUtensils,

    FaPhoneAlt,

    FaEnvelope,

    FaMapMarkerAlt,

    FaCheckCircle

} from "react-icons/fa";

import {

    useNavigate

} from "react-router-dom";

import {

    COMPANY

} from "../../../constants/companyInfo";

const features = [

    "Fresh Ingredients",

    "Free Delivery",

    "Hygienic Kitchen",

    "Fast Preparation",

    "Affordable Prices",

    "Quality Food"

];

const About = () => {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen bg-slate-950 text-white pb-24">

            <div className="max-w-5xl mx-auto px-5 pt-8">

                <button

                    onClick={() => navigate(-1)}

                    className="flex items-center gap-3 text-orange-400"

                >

                    <FaArrowLeft />

                    Back

                </button>

                <div className="text-center mt-10">

                    <div className="w-28 h-28 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto">

                        <FaUtensils className="text-5xl text-orange-400" />

                    </div>

                    <h1 className="text-5xl font-black mt-6">

                        THE SAMOSIAN

                    </h1>

                    <p className="text-orange-400 mt-3">

                        Fresh • Tasty • Delivered

                    </p>

                </div>

                <div className="mt-14 rounded-3xl bg-slate-900 border border-orange-500/20 p-8">

                    <h2 className="text-3xl font-bold">

                        Our Story

                    </h2>

                    <p className="text-slate-300 mt-5 leading-8">

                        The Samosian was started with one simple vision —

                        serve fresh, hygienic and delicious food with

                        fast delivery and excellent customer service.

                        Instead of charging customers unnecessary fees,

                        we believe in providing complimentary delivery

                        within our service area while maintaining quality

                        and affordability.

                    </p>

                </div>

                <div className="mt-8 rounded-3xl bg-slate-900 border border-orange-500/20 p-8">

                    <h2 className="text-3xl font-bold">

                        Our Mission

                    </h2>

                    <p className="text-slate-300 mt-5 leading-8">

                        To become the most trusted local food brand by

                        delivering quality food quickly while keeping

                        the customer experience simple, transparent

                        and enjoyable.

                    </p>

                </div>

                {/* Why Choose Us */}

                <div className="mt-8 rounded-3xl bg-slate-900 border border-orange-500/20 p-8">

                    <h2 className="text-3xl font-bold">

                        Why Choose Us

                    </h2>

                    <div className="grid md:grid-cols-2 gap-5 mt-8">

                        {

                            features.map((feature, index) => (

                                <div

                                    key={index}

                                    className="flex items-center gap-4"

                                >

                                    <FaCheckCircle className="text-green-400 text-xl" />

                                    <span className="text-lg">

                                        {feature}

                                    </span>

                                </div>

                            ))

                        }

                    </div>

                </div>



                {/* Company Information */}

                <div className="mt-8 rounded-3xl bg-slate-900 border border-orange-500/20 p-8">

                    <h2 className="text-3xl font-bold">

                        App Information

                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">

                        <div>

                            <p className="text-slate-400">

                                App Version

                            </p>

                            <h3 className="text-xl font-semibold mt-2">

                                Version 1.0.0

                            </h3>

                        </div>

                        <div>

                            <p className="text-slate-400">

                                Platform

                            </p>

                            <h3 className="text-xl font-semibold mt-2">

                                MERN Stack

                            </h3>

                        </div>

                        <div>

                            <p className="text-slate-400">

                                Developed By

                            </p>

                            <h3 className="text-xl font-semibold mt-2">

                                The Samosian Team

                            </h3>

                        </div>

                        <div>

                            <p className="text-slate-400">

                                Service Area

                            </p>

                            <h3 className="text-xl font-semibold mt-2">

                                Within 3 KM Radius

                            </h3>

                        </div>

                    </div>

                </div>



                {/* Contact */}

                <div className="mt-8 rounded-3xl bg-slate-900 border border-orange-500/20 p-8">

                    <h2 className="text-3xl font-bold">

                        Contact Information

                    </h2>

                    <div className="space-y-6 mt-8">

                        <div className="flex items-center gap-5">

                            <FaPhoneAlt className="text-orange-400 text-2xl" />

                            <span className="text-lg">

                                {COMPANY.phone}

                            </span>

                        </div>

                        <div className="flex items-center gap-5">

                            <FaEnvelope className="text-orange-400 text-2xl" />

                            <span className="text-lg">

                                {COMPANY.email}

                            </span>

                        </div>

                        <div className="flex items-center gap-5">

                            <FaMapMarkerAlt className="text-orange-400 text-2xl" />

                            <span className="text-lg">

                                {COMPANY.address}

                            </span>

                        </div>

                    </div>

                </div>



                {/* Footer */}

                <div className="text-center mt-14">

                    <h2 className="text-3xl font-bold">

                        Thank You ❤️

                    </h2>

                    <p className="text-slate-400 mt-4">

                        Thank you for choosing

                        <span className="text-orange-400 font-semibold">

                            {" "}The Samosian

                        </span>

                    </p>

                    <p className="text-slate-500 mt-3">

                        Fresh • Tasty • Delivered

                    </p>

                    <p className="text-slate-600 mt-8 text-sm">

                        © {new Date().getFullYear()} The Samosian.

                        All Rights Reserved.

                    </p>

                </div>

            </div>

        </div>

    );

};

export default About;