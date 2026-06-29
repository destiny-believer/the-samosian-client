import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const OrderDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] =
        useState(null);

    useEffect(() => {

        fetchOrder();

    }, []);

    const fetchOrder =
        async () => {

            try {

                const response =
                    await api.get(
                        `/orders/${id}`
                    );

                setOrder(
                    response.data.order
                );

            } catch (error) {

                console.log(error);

            }

        };

    const cancelOrder =
        async () => {

            try {

                await api.patch(
                    `/orders/cancel/${id}`
                );

                fetchOrder();

            } catch (error) {

                alert(
                    error.response?.data?.message
                );

            }

        };

    if (!order) {

        return (
            <div className="pt-32 text-center">
                Loading...
            </div>
        );

    }

    return (

        <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-10">

            <h1
                style={{ fontFamily: "Outfit" }}
                className="text-4xl font-bold mb-8"
            >
                Order Details
            </h1>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* LEFT */}

                <div className="lg:col-span-2">

                    <div className="p-6 rounded-3xl bg-white/5 border border-orange-500/20">

                        <h2 className="text-2xl font-semibold mb-4">

                            Order #{order._id.slice(-6)}

                        </h2>

                        <p className="text-orange-500">

                            {order.orderStatus}

                        </p>

                        <p className="mt-2 text-gray-400">

                            ETA :
                            {" "}
                            {order.estimatedDeliveryTime}
                            {" "}
                            mins

                        </p>

                    </div>

                    <div className="mt-6 p-6 rounded-3xl bg-white/5 border border-orange-500/20">

                        <h2 className="text-xl font-semibold mb-4">
                            Ordered Items
                        </h2>

                        {order.items.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between py-3 border-b border-white/10"
                                >

                                    <div>

                                        <p>
                                            {item.productName}
                                        </p>

                                        <p className="text-sm text-gray-400">
                                            {item.variantName}
                                        </p>

                                    </div>

                                    <div>

                                        {item.quantity}
                                        {" x "}
                                        ₹{item.variantPrice}

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </div>

                {/* RIGHT */}

                <div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-orange-500/20">

                        <h2 className="text-xl font-semibold mb-4">
                            Delivery Address
                        </h2>

                        <p>
                            {order.address.houseNo}
                        </p>

                        <p>
                            {order.address.street}
                        </p>

                        <p>
                            {order.address.city}
                        </p>

                        <p>
                            {order.address.pincode}
                        </p>

                    </div>

                    <div className="mt-6 p-6 rounded-3xl bg-white/5 border border-orange-500/20">

                        <div className="flex justify-between">

                            <span>Total</span>

                            <span>
                                ₹{order.totalAmount}
                            </span>

                        </div>

                    </div>

                    <button
                        onClick={() =>
                            navigate(
                                `/track-order/${order._id}`
                            )
                        }
                        className="w-full mt-4 py-4 bg-orange-500 rounded-2xl"
                    >
                        Track Order
                    </button>

                    {(order.orderStatus === "Pending" ||
                        order.orderStatus === "Accepted") && (

                            <button
                                onClick={cancelOrder}
                                className="w-full mt-6 py-4 bg-red-500 rounded-2xl"
                            >
                                Cancel Order
                            </button>

                        )}

                </div>

            </div>

        </div>

    );

};

export default OrderDetails;