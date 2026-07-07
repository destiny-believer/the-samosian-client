import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import OrderCard from "./OrderCard";

const Orders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/orders/my-orders");
            setOrders(response.data.orders);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const activeOrders = orders.filter(
        (order) =>
            order.orderStatus !== "Delivered" &&
            order.orderStatus !== "Cancelled"
    );

    const previousOrders = orders.filter(
        (order) =>
            order.orderStatus === "Delivered" ||
            order.orderStatus === "Cancelled"
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Orders...
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold">No Orders Yet</h2>
                <p className="text-gray-500 mt-2">
                    Place your first delicious order 🍔
                </p>
            </div>
        );
    }

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
        return (
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6">

                <div className="flex justify-between items-start">

                    <div>
                        <h2 className="text-xl font-bold">
                            Order #{order._id.slice(-6)}
                        </h2>

                        <p className="text-gray-400 mt-2">
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>

                    <span
                        className={`px-4 py-2 rounded-full ${getStatusColor(
                            order.orderStatus
                        )}`}
                    >
                        {order.orderStatus}
                    </span>

                </div>

                <div className="mt-6">
                    <h3 className="font-semibold">Items</h3>

                    {order.items.map((item) => (
                        <div
                            key={item._id}
                            className="flex justify-between mt-2"
                        >
                            <span>
                                {item?.productName} x {item.quantity}
                            </span>
                            <span>₹{item.variantPrice}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 justify-between items-center mt-8">

                    <h2 className="text-2xl font-bold">
                        ₹{order.totalAmount}
                    </h2>

                    <div className="flex gap-3 flex-wrap">

                        <button
                            onClick={() =>
                                navigate(`/track-order/${order._id}`)
                            }
                            className="px-5 py-3 bg-orange-500 rounded-xl font-semibold"
                        >
                            Track Order
                        </button>

                        {order.orderStatus === "Delivered" && (
                            <>
                                <button className="px-5 py-3 border border-orange-500 rounded-xl">
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
                        )}

                    </div>

                </div>

            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-28 pb-24">
            <div className="max-w-6xl mx-auto px-5">
                <h1 className="text-4xl font-bold mb-10">My Orders</h1>

                {/* Active Orders */}
                <h2 className="text-2xl font-bold mb-6">Active Orders</h2>

                <div className="space-y-6">
                    {activeOrders.map(order => (

                        <OrderCard

                            key={order._id}

                            order={order}

                        />

                    ))}
                </div>

                {/* Order History */}
                <h2 className="text-2xl font-bold mt-14 mb-6">
                    Order History
                </h2>

                <div className="space-y-6">
                    {previousOrders.map(order => (
                        <OrderCard key={order._id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;