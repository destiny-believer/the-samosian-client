import { motion } from "framer-motion";
import { FiArrowRight, FiMapPin, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Hero = () => {

    const navigate = useNavigate();

    const scrollToCategories = () => {

        document
            .getElementById("categories")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    };

    return (

        <section className="relative min-h-screen overflow-hidden bg-slate-950">

            {/* Background */}

            <div className="absolute inset-0">

                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 blur-[170px]" />

                <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyan-500/20 blur-[170px]" />

            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-20">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT */}

                    <motion.div

                        initial={{
                            opacity:0,
                            x:-60
                        }}

                        animate={{
                            opacity:1,
                            x:0
                        }}

                        transition={{
                            duration:.8
                        }}

                    >

                        <span
                            className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold"
                        >

                            Hyderabad's Favourite Snack Destination

                        </span>

                        <h1 className="text-5xl lg:text-7xl font-black leading-tight mt-8">

                            Taste That

                            <span className="block text-orange-500">

                                Brings You

                            </span>

                            Back.

                        </h1>

                        <p className="text-slate-400 text-lg mt-8 leading-8">

                            Freshly prepared burgers,

                            crispy samosas,

                            delicious fries,

                            refreshing mojitos

                            and much more.

                        </p>

                        <div className="flex flex-wrap gap-5 mt-10">

                            <button

                                onClick={()=>

                                    navigate("/menu")

                                }

                                className="px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 transition flex items-center gap-3 font-bold"

                            >

                                Order Now

                                <FiArrowRight/>

                            </button>

                            <button

                                onClick={scrollToCategories}

                                className="px-8 py-4 rounded-full border border-white/20 hover:border-orange-500 hover:text-orange-500 transition"

                            >

                                Explore Menu

                            </button>

                        </div>

                        <div className="grid grid-cols-3 gap-6 mt-14">

                            <div>

                                <h2 className="text-4xl font-black">

                                    4.9★

                                </h2>

                                <p className="text-slate-400">

                                    Customer Rating

                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-black">

                                    25m

                                </h2>

                                <p className="text-slate-400">

                                    Delivery Time

                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-black">

                                    3 KM

                                </h2>

                                <p className="text-slate-400">

                                    Free Delivery

                                </p>

                            </div>

                        </div>

                    </motion.div>

                    {/* RIGHT */}

                    <motion.div

                        initial={{
                            opacity:0,
                            x:60
                        }}

                        animate={{
                            opacity:1,
                            x:0
                        }}

                        transition={{
                            duration:1
                        }}

                        className="relative h-[650px] hidden lg:block"

                    >

                        {/* Main Circle */}

                        <div className="absolute inset-0 rounded-full border border-white/10"/>

                        {/* Burger */}

                        <motion.img

                            animate={{
                                y:[0,-20,0]
                            }}

                            transition={{
                                repeat:Infinity,
                                duration:4
                            }}

                            src="/hero/burger.png"

                            className="absolute top-0 left-20 w-56"

                        />

                        {/* Fries */}

                        <motion.img

                            animate={{
                                y:[0,18,0]
                            }}

                            transition={{
                                repeat:Infinity,
                                duration:3
                            }}

                            src="/hero/fries.png"

                            className="absolute bottom-16 left-0 w-52"

                        />

                        {/* Mojito */}

                        <motion.img

                            animate={{
                                y:[0,-15,0]
                            }}

                            transition={{
                                repeat:Infinity,
                                duration:5
                            }}

                            src="/hero/mojito.png"

                            className="absolute right-0 top-16 w-52"

                        />

                        {/* Samosa */}

                        <motion.img

                            animate={{
                                y:[0,15,0]
                            }}

                            transition={{
                                repeat:Infinity,
                                duration:4
                            }}

                            src="/hero/samosa.png"

                            className="absolute bottom-0 right-24 w-56"

                        />

                        {/* Floating Card */}

                        <motion.div

                            animate={{
                                y:[0,-10,0]
                            }}

                            transition={{
                                repeat:Infinity,
                                duration:3
                            }}

                            className="absolute top-60 left-44 bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10"

                        >

                            <div className="flex items-center gap-3">

                                <FiClock className="text-orange-500"/>

                                <div>

                                    <h3 className="font-bold">

                                        Fast Delivery

                                    </h3>

                                    <p className="text-slate-400 text-sm">

                                        25-35 Minutes

                                    </p>

                                </div>

                            </div>

                        </motion.div>

                        <motion.div

                            animate={{
                                y:[0,10,0]
                            }}

                            transition={{
                                repeat:Infinity,
                                duration:4
                            }}

                            className="absolute bottom-48 right-32 bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10"

                        >

                            <div className="flex items-center gap-3">

                                <FiMapPin className="text-cyan-400"/>

                                <div>

                                    <h3 className="font-bold">

                                        Free Delivery

                                    </h3>

                                    <p className="text-slate-400 text-sm">

                                        Within 3 KM

                                    </p>

                                </div>

                            </div>

                        </motion.div>

                    </motion.div>

                </div>

            </div>

        </section>

    );

};

export default Hero;