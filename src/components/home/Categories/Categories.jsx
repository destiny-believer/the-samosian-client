import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const Categories = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {

        fetchCategories();

    }, []);

    const fetchCategories = async () => {

        try {

            const response = await api.get("/categories");

            setCategories(response.data.categories);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const openCategory = (category) => {

        setActiveCategory(category._id);

       navigate(`/menu?category=${category.name}`); 
    };

    return (

        <section
            id="categories"
            className="py-20 bg-slate-950"
        >

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex items-center justify-between mb-10">

                    <div>

                        <h2 className="text-4xl font-black">

                            Explore Categories

                        </h2>

                        <p className="text-slate-400 mt-2">

                            Find your favourite food instantly

                        </p>

                    </div>

                    <button

                        onClick={() => navigate("/menu")}

                        className="hidden lg:block px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 transition"

                    >

                        View Full Menu

                    </button>

                </div>

                {

                    loading ?

                    (

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

                            {

                                Array.from({ length: 6 }).map((_, index) => (

                                    <div

                                        key={index}

                                        className="h-48 rounded-3xl bg-slate-900 animate-pulse"

                                    />

                                ))

                            }

                        </div>

                    )

                    :

                    (

                        <div className="flex lg:grid lg:grid-cols-6 gap-6 overflow-x-auto scrollbar-hide pb-4">

                            {

                                categories.map((category) => (

                                    <motion.div

                                        key={category._id}

                                        whileHover={{

                                            y: -10,

                                            scale: 1.03

                                        }}

                                        whileTap={{

                                            scale: .96

                                        }}

                                        onClick={() => openCategory(category)}

                                        className={`

                                            min-w-[180px]

                                            lg:min-w-0

                                            cursor-pointer

                                            rounded-3xl

                                            overflow-hidden

                                            transition-all

                                            border

                                            ${

                                                activeCategory === category._id

                                                ?

                                                "border-orange-500 bg-orange-500/10"

                                                :

                                                "border-white/10 bg-slate-900 hover:border-orange-400"

                                            }

                                        `}

                                    >

                                        <div className="h-36 overflow-hidden">

                                            <img

                                                src={category.image}

                                                alt={category.name}

                                                className="w-full h-full object-cover transition duration-500 hover:scale-110"

                                            />

                                        </div>

                                        <div className="p-5">

                                            <h3 className="font-bold text-lg">

                                                {category.name}

                                            </h3>

                                            <p className="text-slate-400 text-sm mt-2">

                                                {category.productCount || 0} Items

                                            </p>

                                        </div>

                                    </motion.div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </section>

    );

};

export default Categories;