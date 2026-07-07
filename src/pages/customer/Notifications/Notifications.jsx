import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaCheckCircle,
    FaHamburger,
    FaMotorcycle,
    FaBoxOpen,
    FaBell
} from "react-icons/fa";

import api from "../../../services/api";

const getIcon = status => {

    switch (status) {

        case "Accepted":
            return <FaCheckCircle className="text-cyan-400 text-2xl" />;

        case "Preparing":
            return <FaHamburger className="text-orange-400 text-2xl" />;

        case "Agent Assigned":
        case "Picked Up":
        case "On The Way":
            return <FaMotorcycle className="text-green-400 text-2xl" />;

        case "Delivered":
            return <FaBoxOpen className="text-green-500 text-2xl" />;

        default:
            return <FaBell className="text-yellow-400 text-2xl" />;

    }

};

const Notifications = () => {

    const navigate = useNavigate();

    const [

        notifications,

        setNotifications

    ] = useState([]);

    const [

        loading,

        setLoading

    ] = useState(true);

    useEffect(() => {

        fetchNotifications();

    }, []);

    const fetchNotifications = async () => {

        try {

            const res = await api.get(

                "/notifications"

            );

            setNotifications(

                res.data.notifications

            );

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const openNotification = async (notification) => {

        try {

            if (!notification.isRead) {

                await api.patch(

                    `/notifications/${notification._id}/read`

                );
                
                            await fetchNotifications();
                
                            await fetchUnreadCount();

            }

            navigate(

                `/track-order/${notification.order}`

            );

        }

        catch (error) {

            console.log(error);

        }

    };

    if (loading) {

        return (

            <div className="min-h-screen flex justify-center items-center">

                Loading...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-950 text-white pb-24">

            <div className="max-w-5xl mx-auto px-5 pt-8">

                <button

                    onClick={() => navigate(-1)}

                    className="flex items-center gap-3 text-orange-400"

                >

                    <FaArrowLeft />

                    Back

                </button>

                <h1 className="text-4xl font-bold mt-6">

                    Notifications

                </h1>

                <p className="text-slate-400 mt-2">

                    Latest updates about your orders

                </p>

                <div className="mt-8 space-y-5">

                    {

                        notifications.length === 0 ?

                            (

                                <div className="rounded-3xl bg-slate-900 p-12 text-center">

                                    <FaBell className="text-5xl mx-auto text-orange-400" />

                                    <h2 className="text-2xl font-bold mt-5">

                                        No Notifications

                                    </h2>

                                    <p className="text-slate-400 mt-3">

                                        You'll receive order updates here.

                                    </p>

                                </div>

                            )

                            :

                            notifications.map(notification => (

                                <div

                                    key={notification._id}

                                    onClick={() =>

                                        openNotification(

                                            notification

                                        )

                                    }

                                    className={`

                                        cursor-pointer

                                        rounded-3xl

                                        p-6

                                        transition

                                        border

                                        ${notification.isRead

                                            ? "bg-slate-900 border-white/10"

                                            : "bg-orange-500/10 border-orange-500"

                                        }

                                    `}

                                >

                                    <div className="flex gap-5">

                                        <div>

                                            {

                                                getIcon(

                                                    notification.status

                                                )

                                            }

                                        </div>

                                        <div className="flex-1">

                                            <div className="flex justify-between">

                                                <h3 className="text-xl font-semibold">

                                                    {

                                                        notification.title

                                                    }

                                                </h3>

                                                {

                                                    !notification.isRead && (

                                                        <div className="w-3 h-3 rounded-full bg-orange-500" />

                                                    )

                                                }

                                            </div>

                                            <p className="text-slate-400 mt-2">

                                                {

                                                    notification.message

                                                }

                                            </p>

                                            <p className="text-slate-500 text-sm mt-4">

                                                {

                                                    new Date(

                                                        notification.createdAt

                                                    ).toLocaleString()

                                                }

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))

                    }

                </div>

            </div>

        </div>

    );

};

export default Notifications;