import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const order = state?.order;

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">

            <div className="max-w-lg w-full bg-slate-900 border border-green-500/20 rounded-3xl p-10 text-center">

                <FaCheckCircle
                    size={90}
                    className="mx-auto text-green-500"
                />

                <h1 className="text-4xl font-bold mt-8">

                    Order Placed Successfully!

                </h1>

                <p className="text-gray-400 mt-5">

                    Thank you for ordering from

                    <span className="text-orange-500">

                        {" "}The Samosian

                    </span>

                </p>

                {

                    order && (

                        <>

                            <div className="mt-8">

                                <p className="text-gray-400">

                                    Order ID

                                </p>

                                <h2 className="text-2xl font-bold mt-2">

                                    #

                                    {order._id.slice(-6)}

                                </h2>

                            </div>

                            <div className="mt-6">

                                <p className="text-gray-400">

                                    Estimated Delivery

                                </p>

                                <h2 className="text-xl font-semibold mt-2">

                                    25 - 35 Minutes

                                </h2>

                            </div>

                        </>

                    )

                }

                <div className="flex flex-col gap-4 mt-10">

                    <button

                        onClick={()=>

                            navigate(

                                `/track-order/${order._id}`

                            )

                        }

                        className="w-full py-4 rounded-xl bg-orange-500 font-bold"

                    >

                        Track Order

                    </button>

                    <button

                        onClick={()=>navigate("/menu")}

                        className="w-full py-4 rounded-xl border border-orange-500"

                    >

                        Continue Shopping

                    </button>

                </div>

            </div>

        </div>

    );

};

export default OrderSuccess;