import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiCheckCircle } from "react-icons/fi";
import api from "../../../services/api";

const CustomerReviews = () => {

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchReviews();

    }, []);

    const fetchReviews = async () => {

        try {

            const response =
                await api.get("/products/home-reviews");

            setReviews(
                response.data.reviews || []
            );

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <section className="py-24 bg-slate-900">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid lg:grid-cols-3 gap-8">

                        {

                            [...Array(3)].map((_, index) => (

                                <div

                                    key={index}

                                    className="h-80 bg-slate-800 rounded-3xl animate-pulse"

                                />

                            ))

                        }

                    </div>

                </div>

            </section>

        );

    }

    return (

        <section className="py-24 bg-slate-900">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center">

                    <span className="bg-orange-500/10 text-orange-400 px-5 py-2 rounded-full">

                        Customer Reviews

                    </span>

                    <h2 className="text-5xl font-black mt-6">

                        Loved by

                        <span className="text-orange-500">

                            {" "}Thousands

                        </span>

                    </h2>

                    <p className="text-slate-400 mt-4">

                        Real feedback from our happy customers.

                    </p>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

                    {

                        reviews.map((review, index) => (

                            <motion.div

                                key={review._id}

                                initial={{
                                    opacity: 0,
                                    y: 40
                                }}

                                whileInView={{
                                    opacity: 1,
                                    y: 0
                                }}

                                viewport={{
                                    once: true
                                }}

                                transition={{
                                    duration: .5,
                                    delay: index * .1
                                }}

                                whileHover={{
                                    y: -10
                                }}

                                className="bg-slate-950 rounded-3xl border border-white/10 p-8"

                            >

                                <div className="flex items-center gap-4">

                                    <img

                                        src={

                                            review.customer?.profileImage ||

                                            "/images/default-user.png"

                                        }

                                        className="w-16 h-16 rounded-full object-cover"

                                        alt="customer"

                                    />

                                    <div>

                                        <h3 className="font-bold">

                                            {

                                                review.customerName

                                            }

                                        </h3>

                                        <div className="flex items-center gap-2 text-green-400 text-sm mt-1">

                                            <FiCheckCircle />

                                            Verified Purchase

                                        </div>

                                    </div>

                                </div>

                                <div className="flex gap-1 mt-6">

                                    {

                                        [...Array(review.rating)].map((_, i) => (

                                            <FiStar

                                                key={i}

                                                className="text-yellow-400 fill-yellow-400"

                                            />

                                        ))

                                    }

                                </div>

                                <p className="text-slate-300 leading-7 mt-6">

                                    "

                                    {

                                        review.comment

                                    }

                                    "

                                </p>

                                <div className="mt-8 border-t border-white/10 pt-6">

                                    <p className="font-semibold">

                                        {

                                            review.productName

                                        }

                                    </p>

                                    <p className="text-slate-500 text-sm mt-2">

                                        {

                                            new Date(

                                                review.createdAt

                                            ).toLocaleDateString()

                                        }

                                    </p>

                                </div>

                            </motion.div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

};

export default CustomerReviews;