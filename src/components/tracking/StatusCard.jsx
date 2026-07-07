import {
    FaCheckCircle,
    FaHamburger,
    FaMotorcycle,
    FaBoxOpen,
    FaClock,
    FaHome
} from "react-icons/fa";

const statusData = {

    "Pending": {

        icon: <FaCheckCircle />,

        title: "Order Confirmed",

        subtitle: "We've received your order and will start shortly.",

        color: "text-yellow-400"

    },

    "Accepted": {

        icon: <FaCheckCircle />,

        title: "Restaurant Accepted",

        subtitle: "Our kitchen has accepted your order.",

        color: "text-cyan-400"

    },

    "Preparing": {

        icon: <FaHamburger />,

        title: "Preparing Your Food",

        subtitle: "Fresh ingredients. Fresh taste. Your meal is being prepared.",

        color: "text-orange-400"

    },

    "Agent Assigned": {

        icon: <FaMotorcycle />,

        title: "Delivery Partner Assigned",

        subtitle: "",

        color: "text-sky-400"

    },

    "Picked Up": {

        icon: <FaBoxOpen />,

        title: "Order Picked Up",

        subtitle: "",

        color: "text-green-400"

    },

    "On The Way": {

        icon: <FaMotorcycle />,

        title: "On The Way",

        subtitle: "",

        color: "text-green-400"

    },

    "Delivered": {

        icon: <FaHome />,

        title: "Delivered Successfully",

        subtitle: "Enjoy your meal ❤️",

        color: "text-green-400"

    }

};

const StatusCard = ({ order, liveEta }) => {

    const status =
        statusData[
        order.orderStatus
        ] || statusData.Pending;

    let subtitle = status.subtitle;

    switch (order.orderStatus) {

        case "Agent Assigned":

            subtitle =
                `${order.agent?.name || "Our rider"} is heading to the restaurant.`;

            break;

        case "Picked Up":

            subtitle =
                `${order.agent?.name || "Our rider"} has picked up your order.`;

            break;

        case "On The Way":

            subtitle =
                `${order.agent?.name || "Our rider"} is on the way.`;

            break;

        default:

            break;

    }

    const progressWidth = {

        "Pending": "15%",

        "Accepted": "30%",

        "Preparing": "45%",

        "Agent Assigned": "60%",

        "Picked Up": "75%",

        "On The Way": "90%",

        "Delivered": "100%"

    }[order.orderStatus] || "0%";

    return (

        <div className={`rounded-3xl overflow-hidden bg-gradient-to-r ${status.color}`}>

            <div className="bg-slate-950/70 backdrop-blur-xl p-8 lg:p-10">

                <div className="flex flex-col lg:flex-row justify-between gap-10">

                    <div className="flex gap-5">

                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${status.color}`}>

                            {status.icon}

                        </div>

                        <div>

                            <p className="uppercase tracking-widest text-sm text-slate-300">

                                Live Order Tracking

                            </p>

                            <h1
                                className={`text-5xl font-black mt-3 ${status.color}`}
                            >

                                {status.title}

                            </h1>

                            <p className="text-slate-300 text-lg mt-4 max-w-xl">

                                {subtitle}

                            </p>

                        </div>

                    </div>

                    <div className="flex flex-col justify-center lg:items-end">

                        <div className="bg-white/10 rounded-2xl px-6 py-5">

                            <div className="flex items-center gap-2 text-cyan-300">

                                <FaClock />

                                <span>

                                    {
                                        order.orderStatus === "Delivered"
                                            ? "Delivered At"
                                            : "Estimated Delivery"
                                    }

                                </span>

                            </div>

                            <h2 className="text-5xl font-black mt-2">

                                {
                                    order.orderStatus === "Delivered"
                                        ? new Date(order.updatedAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })
                                        : (liveEta || `${order.estimatedDeliveryTime} mins`)
                                }

                            </h2>

                            <p className="text-slate-300 mt-3">

                                Order #

                                {order._id
                                    .slice(-6)
                                    .toUpperCase()}

                            </p>

                        </div>

                    </div>

                </div>

                <div className="mt-8 h-2 rounded-full bg-white/10 overflow-hidden">

                    <div

                        className={`h-full bg-gradient-to-r ${status.color}`}

                        style={{
                            width: progressWidth
                        }}
                    />

                </div>

            </div>

        </div>

    );

};

export default StatusCard;