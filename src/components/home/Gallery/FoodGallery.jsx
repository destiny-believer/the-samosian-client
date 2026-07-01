import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const gallery = [

    {
        id:1,
        title:"Veg Burger",
        category:"Burger",
        image:"/gallery/burger.jpg"
    },

    {
        id:2,
        title:"Veg Samosa",
        category:"Samosa",
        image:"/gallery/samosa.jpg"
    },

    {
        id:3,
        title:"French Fries",
        category:"Snacks",
        image:"/gallery/fries.jpg"
    },

    {
        id:4,
        title:"Lime Mojito",
        category:"Beverages",
        image:"/gallery/mojito.jpg"
    },

    {
        id:5,
        title:"Pizza",
        category:"Pizza",
        image:"/gallery/pizza.jpg"
    },

    {
        id:6,
        title:"Sandwich",
        category:"Sandwich",
        image:"/gallery/sandwich.jpg"
    }

];

const FoodGallery = () => {

    const navigate = useNavigate();

    return (

        <section className="py-24 bg-slate-900">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center">

                    <span className="bg-orange-500/10 text-orange-400 px-5 py-2 rounded-full">

                        Food Gallery

                    </span>

                    <h2 className="text-5xl font-black mt-6">

                        Freshly Prepared

                        <span className="text-orange-500">

                            {" "}Everyday

                        </span>

                    </h2>

                    <p className="text-slate-400 mt-5">

                        Every meal is freshly prepared after your order.

                    </p>

                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

                    {

                        gallery.map((item,index)=>(

                            <motion.div

                                key={item.id}

                                initial={{

                                    opacity:0,

                                    y:50

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

                                    y:-10

                                }}

                                className="relative rounded-3xl overflow-hidden group"

                            >

                                <img

                                    src={item.image}

                                    alt={item.title}

                                    className="w-full h-[420px] object-cover duration-500 group-hover:scale-110"

                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"/>

                                <div className="absolute bottom-0 left-0 w-full p-8">

                                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">

                                        {item.category}

                                    </span>

                                    <h3 className="text-3xl font-black mt-4">

                                        {item.title}

                                    </h3>

                                    <button

                                        onClick={()=>navigate("/menu")}

                                        className="mt-6 flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition"

                                    >

                                        Order Now

                                        <FiArrowRight/>

                                    </button>

                                </div>

                            </motion.div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

};

export default FoodGallery;