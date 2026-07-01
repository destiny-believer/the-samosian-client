import { motion } from "framer-motion";
import {
    FiTruck,
    FiClock,
    FiAward,
    FiShield,
    FiStar,
    FiSmile
} from "react-icons/fi";

const features = [

    {
        icon: FiTruck,
        title: "Free Delivery",
        subtitle: "Within 3 KM Radius",
        color: "text-orange-500"
    },

    {
        icon: FiClock,
        title: "Fast Delivery",
        subtitle: "25 - 35 Minutes",
        color: "text-cyan-400"
    },

    {
        icon: FiAward,
        title: "Premium Quality",
        subtitle: "Fresh Ingredients",
        color: "text-yellow-400"
    },

    {
        icon: FiShield,
        title: "100% Hygienic",
        subtitle: "Prepared Fresh",
        color: "text-green-400"
    },

    {
        icon: FiStar,
        title: "Top Rated",
        subtitle: "4.9 Customer Rating",
        color: "text-pink-400"
    },

    {
        icon: FiSmile,
        title: "Happy Customers",
        subtitle: "10000+ Orders Served",
        color: "text-purple-400"
    }

];

const WhyChooseUs = () => {

    return (

        <section className="py-24 bg-slate-950">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center">

                    <span className="bg-orange-500/10 text-orange-400 px-5 py-2 rounded-full">

                        Why Choose Us

                    </span>

                    <h2 className="text-5xl font-black mt-6">

                        Why Customers Love

                        <span className="text-orange-500">

                            {" "}The Samosian

                        </span>

                    </h2>

                    <p className="text-slate-400 mt-5 max-w-2xl mx-auto">

                        We don't just serve food.
                        We serve freshness,
                        quality,
                        hygiene,
                        and happiness in every order.

                    </p>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

                    {

                        features.map((item,index)=>{

                            const Icon = item.icon;

                            return(

                                <motion.div

                                    key={index}

                                    initial={{
                                        opacity:0,
                                        y:40
                                    }}

                                    whileInView={{
                                        opacity:1,
                                        y:0
                                    }}

                                    viewport={{
                                        once:true
                                    }}

                                    transition={{
                                        duration:.5,
                                        delay:index*.1
                                    }}

                                    whileHover={{
                                        y:-12
                                    }}

                                    className="bg-slate-900 border border-white/10 rounded-3xl p-8 hover:border-orange-500 transition"

                                >

                                    <div className={`

                                        w-16

                                        h-16

                                        rounded-2xl

                                        bg-slate-800

                                        flex

                                        items-center

                                        justify-center

                                        ${item.color}

                                    `}>

                                        <Icon size={32}/>

                                    </div>

                                    <h3 className="text-2xl font-bold mt-8">

                                        {item.title}

                                    </h3>

                                    <p className="text-slate-400 mt-3">

                                        {item.subtitle}

                                    </p>

                                </motion.div>

                            )

                        })

                    }

                </div>

            </div>

        </section>

    );

};

export default WhyChooseUs;