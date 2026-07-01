import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
    FiStar,
    FiTruck,
    FiUsers,
    FiShoppingBag
} from "react-icons/fi";

const stats = [

    {
        icon: FiShoppingBag,
        number: 10000,
        suffix: "+",
        title: "Orders Delivered",
        color: "text-orange-500"
    },

    {
        icon: FiUsers,
        number: 6500,
        suffix: "+",
        title: "Happy Customers",
        color: "text-cyan-400"
    },

    {
        icon: FiTruck,
        number: 25,
        suffix: " Min",
        title: "Average Delivery",
        color: "text-green-400"
    },

    {
        icon: FiStar,
        number: 4.9,
        decimals: 1,
        suffix: "/5",
        title: "Customer Rating",
        color: "text-yellow-400"
    }

];

const Stats = () => {

    return (

        <section className="py-20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

                    {

                        stats.map((item,index)=>{

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

                                        delay:index*.15

                                    }}

                                    whileHover={{

                                        y:-8

                                    }}

                                    className="bg-slate-900 border border-white/10 rounded-3xl p-8 text-center"

                                >

                                    <div className="flex justify-center">

                                        <div className={`

                                            w-20

                                            h-20

                                            rounded-full

                                            bg-slate-800

                                            flex

                                            items-center

                                            justify-center

                                            ${item.color}

                                        `}>

                                            <Icon size={34}/>

                                        </div>

                                    </div>

                                    <h2 className="text-5xl font-black mt-8">

                                        <CountUp

                                            end={item.number}

                                            duration={3}

                                            decimals={item.decimals || 0}

                                        />

                                        {item.suffix}

                                    </h2>

                                    <p className="text-slate-400 mt-4">

                                        {item.title}

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

export default Stats;