import {
    FaMotorcycle,
    FaPhoneAlt,
    FaStar,
    FaMapMarkerAlt
} from "react-icons/fa";

const DeliveryPartnerCard = ({ order }) => {

    const agent = order.agent;

    if (
        !agent ||
        ![
            "Agent Assigned",
            "Picked Up",
            "On The Way"
        ].includes(order.orderStatus)
    ) {
        return null;
    }

    return (

        <div className="mt-8 bg-slate-900 rounded-3xl border border-white/10 overflow-hidden">

            <div className="p-8">

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-5">

                        <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-800">

                            {

                                agent.agentPhoto

                                    ?

                                    <img
                                        src={agent.agentPhoto}
                                        alt={agent.name}
                                        className="w-full h-full object-cover"
                                    />

                                    :

                                    <div className="w-full h-full flex items-center justify-center">

                                        <FaMotorcycle
                                            size={35}
                                            className="text-orange-500"
                                        />

                                    </div>

                            }

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold">

                                {agent.name}

                            </h2>

                            <p className="text-slate-400 mt-1">

                                Delivery Partner

                            </p>

                            <div className="flex items-center gap-3 mt-3">

                                <span className="bg-green-600 px-3 py-1 rounded-full flex items-center gap-2">

                                    <FaStar />

                                    4.9

                                </span>

                                <span className="bg-slate-800 px-3 py-1 rounded-full">

                                    {agent.vehicleType}

                                </span>

                            </div>

                        </div>

                    </div>

                    <a

                        href={`tel:${agent.phone}`}

                        className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center"

                    >

                        <FaPhoneAlt
                            size={22}
                        />

                    </a>

                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">

                    <div className="bg-slate-800 rounded-2xl p-5">

                        <p className="text-slate-400">

                            Vehicle Number

                        </p>

                        <h3 className="text-2xl font-bold mt-2">

                            {agent.vehicleNumber}

                        </h3>

                    </div>

                    <div className="bg-slate-800 rounded-2xl p-5">

                        <p className="text-slate-400">

                            Current Status

                        </p>

                        <h3 className="text-2xl font-bold mt-2 flex items-center gap-3">

                            <FaMapMarkerAlt
                                className="text-orange-500"
                            />

                            {order.orderStatus}

                        </h3>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default DeliveryPartnerCard;