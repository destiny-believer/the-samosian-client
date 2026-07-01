import { motion } from "framer-motion";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TodaySpecial = () => {

    const navigate = useNavigate();

    return (

        <section className="py-24 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 overflow-hidden">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 items-center gap-12">

                    {/* LEFT */}

                    <motion.div

                        initial={{ opacity:0, x:-60 }}

                        whileInView={{ opacity:1, x:0 }}

                        viewport={{ once:true }}

                    >

                        <span className="bg-white text-orange-600 px-5 py-2 rounded-full font-bold">

                            🔥 Today's Special

                        </span>

                        <h2 className="text-6xl font-black text-white mt-8">

                            Buy 2 Burgers

                            <span className="block">

                                Get Fries FREE

                            </span>

                        </h2>

                        <p className="text-orange-100 text-lg mt-6 leading-8">

                            Limited time offer.

                            Order today and enjoy crispy fries absolutely FREE.

                        </p>

                        <div className="flex items-center gap-3 mt-10">

                            <FiClock size={24}/>

                            <span className="font-bold">

                                Offer Ends Today

                            </span>

                        </div>

                        <button

                            onClick={()=>navigate("/menu")}

                            className="mt-10 bg-white text-orange-600 px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition"

                        >

                            Order Now

                            <FiArrowRight/>

                        </button>

                    </motion.div>

                    {/* RIGHT */}

                    <motion.div

                        initial={{ opacity:0, x:60 }}

                        whileInView={{ opacity:1, x:0 }}

                        viewport={{ once:true }}

                        className="relative"

                    >

                        <img

                            src="/offers/burger-combo.png"

                            alt="Offer"

                            className="w-full"

                        />

                    </motion.div>

                </div>

            </div>

        </section>

    );

};

export default TodaySpecial;