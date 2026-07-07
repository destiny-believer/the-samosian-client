import { useNavigate } from "react-router-dom";

const getStatusColor = (status) => {

    switch (status) {

        case "Pending":
            return "bg-yellow-500/20 text-yellow-400";

        case "Accepted":
            return "bg-blue-500/20 text-blue-400";

        case "Preparing":
            return "bg-orange-500/20 text-orange-400";

        case "Agent Assigned":
            return "bg-purple-500/20 text-purple-400";

        case "On The Way":
            return "bg-cyan-500/20 text-cyan-400";

        case "Delivered":
            return "bg-green-500/20 text-green-400";

        case "Cancelled":
            return "bg-red-500/20 text-red-400";

        default:
            return "bg-gray-500/20 text-gray-300";

    }

};

const OrderCard = ({ order }) => {

    const navigate = useNavigate();

    return (

        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 hover:border-orange-500/50 transition-all">

            {/* Header */}

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-bold">

                        Order #

                        {order._id.slice(-6)}

                    </h2>

                    <p className="text-gray-400 text-sm mt-2">

                        {

                            new Date(

                                order.createdAt

                            ).toLocaleString()

                        }

                    </p>

                </div>

                <span

                    className={`px-4 py-2 rounded-full ${getStatusColor(order.orderStatus)}`}

                >

                    {order.orderStatus}

                </span>

            </div>

            {/* Products */}

            <div className="mt-6 space-y-5">

                {

                    order.items.map(item => (

                        <div

                            key={item._id}

                            className="flex justify-between items-center bg-slate-800 rounded-2xl p-4"

                        >

                            <div className="flex gap-4">

                                <img
                                    src={`http://localhost:5000${product.image}`}

                                    alt={item.product?.name}

                                    className="w-20 h-20 rounded-xl object-cover"

                                />

                                <div>

                                    <h3 className="font-semibold">

                                        {item.product?.name}

                                    </h3>

                                    <p className="text-gray-400">

                                        Qty : {item.quantity}

                                    </p>

                                </div>

                            </div>

                            <div className="font-bold">

                                ₹{item.price}

                            </div>

                        </div>

                    ))

                }

            </div>

            {/* Delivery Address */}

            <div className="mt-6 border-t border-white/10 pt-5">

                <h4 className="font-semibold">

                    Delivery Address

                </h4>

                <p className="text-gray-400 mt-2">

                    {

                        order.address?.houseNo

                    },

                    {

                        order.address?.street

                    },

                    {

                        order.address?.city

                    }

                </p>

            </div>

            <div className="mt-8">

                <h3 className="font-semibold mb-4">

                    Delivery Progress

                </h3>

                <div className="flex justify-between text-sm">

                    <span>Pending</span>

                    <span>Preparing</span>

                    <span>On The Way</span>

                    <span>Delivered</span>

                </div>

            </div>

            {

                order.agent && (

                    <div className="mt-8 bg-slate-800 rounded-2xl p-5">

                        <h3 className="font-semibold">

                            Delivery Partner

                        </h3>

                        <p className="mt-3">

                            🚴 {order.agent.name}

                        </p>

                        <p>

                            📞 {order.agent.phone}

                        </p>

                    </div>

                )

            }

            <div className="mt-6 flex justify-between">

                <span>

                    Payment Method

                </span>

                <span className="font-semibold">

                    Cash On Delivery

                </span>

            </div>

            {

                order.orderStatus !== "Delivered" && (

                    <div className="mt-6 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">

                        Estimated Delivery

                        15-20 Minutes

                    </div>

                )

            }

            {/* Total */}

            <div className="flex justify-between mt-6">

                <span>

                    Total Amount

                </span>

                <span className="text-2xl font-bold text-orange-400">

                    ₹

                    {order.totalAmount}

                </span>

            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-3 mt-8">

                <button

                    onClick={() =>

                        navigate(

                            `/track-order/${order._id}`

                        )

                    }

                    className="px-5 py-3 bg-orange-500 rounded-xl font-semibold"

                >

                    Live Tracking

                </button>

                {

                    order.orderStatus === "Delivered" && (

                        <>

                            <button

                                className="px-5 py-3 border border-orange-500 rounded-xl"

                            >

                                Reorder

                            </button>

                            <button

                                onClick={() =>

                                    navigate(

                                        `/product/${order.items[0].product._id}`

                                    )

                                }

                                className="px-5 py-3 border border-green-500 rounded-xl"

                            >

                                Review

                            </button>

                        </>

                    )

                }

            </div>

        </div>

    );

};

export default OrderCard;