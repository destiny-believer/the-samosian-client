import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const PopularCombos = () => {

    const navigate = useNavigate();

    const [combos, setCombos] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchCombos();

    }, []);

    const fetchCombos = async () => {

        try {

            const response =
                await api.get("/combos");

            setCombos(response.data.combos);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const addCombo = async (comboId) => {

        try {

            await api.post(`/cart/combo/${comboId}`);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (loading) {

        return (

            <section className="py-24 bg-slate-950">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid lg:grid-cols-3 gap-8">

                        {

                            [...Array(3)].map((_, index)=>(

                                <div

                                    key={index}

                                    className="h-[520px] rounded-3xl bg-slate-900 animate-pulse"

                                />

                            ))

                        }

                    </div>

                </div>

            </section>

        );

    }

    return (

        <section className="py-24 bg-slate-950">

            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-between items-center mb-14">

                    <div>

                        <span className="bg-orange-500/10 text-orange-400 px-5 py-2 rounded-full">

                            Best Value

                        </span>

                        <h2 className="text-5xl font-black mt-5">

                            Popular Combos

                        </h2>

                        <p className="text-slate-400 mt-3">

                            Save more with specially curated meal combos.

                        </p>

                    </div>

                    <button

                        onClick={()=>navigate("/menu")}

                        className="hidden lg:flex items-center gap-2 bg-orange-500 px-6 py-3 rounded-full hover:bg-orange-600"

                    >

                        View Menu

                        <FiArrowRight/>

                    </button>

                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {

                        combos.map(combo=>(

                            <motion.div

                                key={combo._id}

                                whileHover={{

                                    y:-12

                                }}

                                className="rounded-3xl overflow-hidden bg-slate-900 border border-white/10"

                            >

                                <img

                                    src={combo.image}

                                    alt={combo.name}

                                    className="h-64 w-full object-cover"

                                />

                                <div className="p-8">

                                    <h3 className="text-3xl font-black">

                                        {combo.name}

                                    </h3>

                                    <p className="text-slate-400 mt-4">

                                        {combo.description}

                                    </p>

                                    <div className="mt-8 space-y-3">

                                        {

                                            combo.items.map(item=>(

                                                <div

                                                    key={item._id}

                                                    className="flex justify-between"

                                                >

                                                    <span>

                                                        {item.productName}

                                                    </span>

                                                    <span>

                                                        × {item.quantity}

                                                    </span>

                                                </div>

                                            ))

                                        }

                                    </div>

                                    <div className="flex justify-between items-center mt-10">

                                        <div>

                                            <p className="text-slate-400 line-through">

                                                ₹{combo.originalPrice}

                                            </p>

                                            <h4 className="text-4xl font-black text-orange-500">

                                                ₹{combo.comboPrice}

                                            </h4>

                                        </div>

                                        <span className="bg-green-500 px-4 py-2 rounded-full">

                                            Save ₹{combo.originalPrice - combo.comboPrice}

                                        </span>

                                    </div>

                                    <button

                                        onClick={()=>addCombo(combo._id)}

                                        className="w-full mt-8 bg-orange-500 hover:bg-orange-600 py-4 rounded-xl flex justify-center items-center gap-3 font-bold"

                                    >

                                        <FiShoppingCart/>

                                        Add Combo

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

export default PopularCombos;