import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import socket from "../../services/socket";

import {
    GoogleMap,
    LoadScript,
    Marker,
    DirectionsRenderer
} from "@react-google-maps/api";


const allStatuses = [
    "Pending",
    "Accepted",
    "Preparing",
    "Agent Assigned",
    "Picked Up",
    "On The Way",
    "Delivered"
];

const statusMessages = {

    Pending:
        "🎉 Order confirmed! We're getting started.",

    Accepted:
        "✅ Order accepted by restaurant.",

    Preparing:
        "🍳 Our chefs are preparing your order.",

    "Agent Assigned":
        "🛵 Delivery partner assigned.",

    "Picked Up":
        "📦 Order picked up by delivery partner.",

    "On The Way":
        "📍 Your order is on the way!",

    Delivered:
        "🍽️ Order delivered. Enjoy your meal!"

};

const shopLocation = {
    lat: 17.314251,
    lng: 78.444970
};

const mapContainerStyle = {
    width: "100%",
    height: "500px"
};

const TrackOrder = () => {

    const { id } = useParams();

    const [order, setOrder] =
        useState(null);

    const [agentLocation,
        setAgentLocation] =
        useState(null);

    const [directions,
        setDirections] =
        useState(null);

    const [reviewedProducts,
        setReviewedProducts] =
        useState([]);

    const [reviews, setReviews] = useState({});

    const [myReviews, setMyReviews] = useState({});

    const [reviewLoading, setReviewLoading] = useState(false);
    // Fetch Order

    const fetchOrder =
        async () => {

            try {

                const response =
                    await api.get(
                        `/orders/${id}`
                    );
                console.log(
                    "ORDER DATA:",
                    response.data.order
                );
                setOrder(
                    response.data.order
                );

                await fetchMyReviews(
                    response.data.order
                );

            } catch (error) {

                console.log(error);

            }

        };

    // Socket Connection & Event Listeners

    useEffect(() => {

        fetchOrder();

        // Helper function to join room
        const joinOrderRoom = () => {
            if (socket.connected) {
                socket.emit(
                    "join-order-room",
                    id
                );
                console.log(`✅ Joined room: order_${id}`);
            } else {
                console.log("⏳ Waiting for socket to connect...");
            }
        };

        // Join room if already connected
        joinOrderRoom();

        // Handle connection event to rejoin if reconnected
        const handleConnect = () => {
            console.log("🔄 Socket reconnected, rejoining room");
            joinOrderRoom();
        };

        // Event listeners
        const handleOrderStatusUpdate = (data) => {
            console.log(
                "📨 ORDER STATUS UPDATE RECEIVED:",
                data
            );

            setOrder(prev => ({
                ...prev,
                orderStatus: data.status,
                statusHistory: data.statusHistory
            }));
        };

        const handleAgentLocationUpdate = (data) => {
            console.log(
                "📍 AGENT LOCATION UPDATE:",
                data
            );
            setAgentLocation(data);
        };

        // Register listeners
        socket.on(
            "order-status-updated",
            handleOrderStatusUpdate
        );

        socket.on(
            "agent-location-updated",
            handleAgentLocationUpdate
        );

        socket.on("connect", handleConnect);

        // Cleanup function
        return () => {
            socket.emit(
                "leave-order-room",
                id
            );

            socket.off(
                "order-status-updated",
                handleOrderStatusUpdate
            );

            socket.off(
                "agent-location-updated",
                handleAgentLocationUpdate
            );

            socket.off("connect", handleConnect);

            console.log(`❌ Left room: order_${id}`);
        };

    }, [id]);

    // Route Generation

    useEffect(() => {

        if (
            !agentLocation ||
            !order ||
            !order.address ||
            !window.google
        ) {
            return;
        }

        const service =
            new window.google.maps
                .DirectionsService();

        service.route(
            {
                origin: {
                    lat:
                        agentLocation.latitude,

                    lng:
                        agentLocation.longitude
                },

                destination: {
                    lat:
                        order.address.latitude,

                    lng:
                        order.address.longitude
                },

                travelMode:
                    window.google.maps
                        .TravelMode.DRIVING
            },

            (result, status) => {

                if (
                    status === "OK"
                ) {

                    setDirections(
                        result
                    );

                }

            }
        );

    }, [
        agentLocation,
        order
    ]);

    if (!order) {

        return (

            <div className="pt-32 text-center text-white">

                Loading Order...

            </div>

        );

    }

    const currentIndex =
        allStatuses.indexOf(
            order.orderStatus
        );

    const currentMessage =
        statusMessages[
        order.orderStatus
        ];

    const fetchMyReviews =
        async (orderData) => {

            try {

                const reviewMap = {};

                for (const item of orderData.items) {

                    const response =
                        await api.get(
                            `/products/review/${item.product}`
                        );

                    if (
                        response.data.reviewed
                    ) {

                        reviewMap[item.product] =
                            response.data.review;

                    }

                }

                setMyReviews(reviewMap);

            } catch (error) {

                console.log(error);

            }

        };

    const submitReview =
        async (productId) => {

            try {

                const reviewData =
                    reviews[productId];

                if (
                    !reviewData?.rating
                ) {

                    alert(
                        "Please select rating"
                    );

                    return;

                }

                setReviewLoading(true);

                await api.post(
                    `/products/review/${productId}`,
                    {
                        rating:
                            reviewData.rating,

                        comment:
                            reviewData.comment
                    }
                );

                await fetchOrder();

                alert("⭐⭐⭐⭐⭐ Thank you for sharing your feedback!");

                setReviewLoading(false);

            } catch (error) {

                alert(
                    error.response?.data?.message
                );

            }

        };


    return (

        <div className="max-w-7xl bg-yellow-400 mx-auto pt-10 px-5 pb-10 text-white">

            {/* HERO */}

            <div className="bg-slate-900/70 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 mb-8">

                <div className="grid lg:grid-cols-2 gap-10 items-center">

                    <div>

                        <p className="text-orange-400 text-sm font-medium mb-2">
                            LIVE ORDER TRACKING
                        </p>

                        <h1 className="text-5xl font-bold">
                            {order.orderStatus}
                        </h1>

                        <p className="text-slate-400 mt-3">
                            {currentMessage}
                        </p>

                        <div className="flex items-center gap-6 mt-6">

                            <div>

                                <h2 className="text-4xl font-bold text-cyan-400">
                                    {order.estimatedDeliveryTime}
                                </h2>

                                <p className="text-slate-500">
                                    mins ETA
                                </p>

                            </div>

                            <div className="h-12 w-px bg-white/10" />

                            <div>

                                <h2 className="text-2xl font-bold">
                                    #{order._id.slice(-6)}
                                </h2>

                                <p className="text-slate-500">
                                    Order ID
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* HORIZONTAL PROGRESS */}

                    <div>

                        <div className="flex justify-between items-center">

                            {
                                allStatuses.map(
                                    (status, index) => {

                                        const active =
                                            index <= currentIndex;

                                        return (

                                            <div
                                                key={status}
                                                className="flex flex-col items-center flex-1"
                                            >

                                                <div
                                                    className={`
                    w-12 h-12 rounded-full
                    flex items-center justify-center
                    font-bold

                    ${active
                                                            ? "bg-green-500"
                                                            : "bg-slate-700"
                                                        }
                  `}
                                                >

                                                    {
                                                        active
                                                            ? "✓"
                                                            : index + 1
                                                    }

                                                </div>

                                                <p className="text-xs text-center mt-3">

                                                    {status}

                                                </p>

                                            </div>

                                        );

                                    }
                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

            {/* MAP + LIVE TRACKING */}

            <div className="grid lg:grid-cols-4 gap-6 mb-8">

                <div className="lg:col-span-3 bg-slate-900/70 border border-cyan-500/20 rounded-3xl overflow-hidden">

                    <div className="h-[500px]">

                        <LoadScript
                            googleMapsApiKey={
                                import.meta.env
                                    .VITE_GOOGLE_MAPS_API_KEY
                            }
                        >

                            <GoogleMap
                                mapContainerStyle={
                                    mapContainerStyle
                                }
                                center={
                                    agentLocation
                                        ? {
                                            lat:
                                                agentLocation.latitude,
                                            lng:
                                                agentLocation.longitude
                                        }
                                        : shopLocation
                                }
                                zoom={13}
                                options={{
                                    streetViewControl: false,
                                    mapTypeControl: false,
                                    fullscreenControl: false
                                }}
                            >

                                <Marker
                                    position={shopLocation}
                                    label="🏪"
                                />

                                <Marker
                                    position={{
                                        lat:
                                            order.address.latitude,
                                        lng:
                                            order.address.longitude
                                    }}
                                    label="🏠"
                                />

                                {
                                    agentLocation && (

                                        <Marker
                                            position={{
                                                lat:
                                                    agentLocation.latitude,
                                                lng:
                                                    agentLocation.longitude
                                            }}
                                            label="🛵"
                                        />

                                    )
                                }

                                {
                                    directions && (

                                        <DirectionsRenderer
                                            directions={
                                                directions
                                            }
                                        />

                                    )
                                }

                            </GoogleMap>

                        </LoadScript>

                    </div>

                </div>

                <div className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-6">

                    <h2 className="text-xl font-bold mb-6">
                        Live Tracking
                    </h2>

                    <div className="space-y-6">

                        <div>

                            <p className="text-slate-400">
                                Status
                            </p>

                            <h3 className="text-2xl font-bold">
                                {order.orderStatus}
                            </h3>

                        </div>

                        <div>

                            <p className="text-slate-400">
                                ETA
                            </p>

                            <h3 className="text-2xl font-bold text-cyan-400">
                                {
                                    order.estimatedDeliveryTime
                                }
                                mins
                            </h3>

                        </div>

                        <div>

                            <p className="text-slate-400">
                                Tracking
                            </p>

                            <h3 className="text-green-400">
                                Live Active
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

            {/* PARTNER + SUMMARY */}

            <div className="grid lg:grid-cols-2 gap-6">

                <div className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Delivery Partner
                    </h2>

                    {
                        order.agent ? (

                            <>
                                <h3 className="text-3xl font-bold">
                                    {order.agent.name}
                                </h3>

                                <p className="text-slate-400 mt-2">
                                    {order.agent.vehicleNumber}
                                </p>

                                <a
                                    href={`tel:${order.agent.phone}`}
                                    className="inline-block mt-6 bg-green-500 hover:bg-green-400 px-5 py-3 rounded-2xl font-semibold"
                                >
                                    📞 Call Partner
                                </a>
                            </>

                        ) : (

                            <p className="text-slate-400">
                                Delivery partner not assigned yet
                            </p>

                        )
                    }

                </div>

                <div className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Order Summary
                    </h2>

                    {
                        order.items?.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className="flex justify-between border-b border-white/10 py-4"
                                >

                                    <div>

                                        <h3 className="font-semibold">
                                            {item.productName}
                                        </h3>

                                        <p className="text-slate-400">
                                            {item.variantName}
                                        </p>

                                    </div>

                                    <div>

                                        x{item.quantity}

                                    </div>

                                </div>

                            )
                        )
                    }

                    <div className="pt-5 mt-5 border-t border-white/10 flex justify-between text-2xl font-bold">

                        <span>Total</span>

                        <span className="text-cyan-400">

                            ₹{order.totalAmount}

                        </span>

                    </div>

                </div>

            </div>

            {
                order.orderStatus ===
                "Delivered" && (

                    <div className="bg-slate-900/70 border border-yellow-500/20 rounded-3xl p-6 mt-8">

                        <h2 className="
        text-3xl
        font-bold
        mb-6
      ">

                            ⭐ Rate Your Order

                        </h2>

                        {
                            order.items?.map(
                                item => (

                                    <div
                                        key={item.product}
                                        className="
              p-5
              mb-5
              rounded-2xl
              bg-white/5
              "
                                    >

                                        <h3 className="
                text-xl
                font-semibold
                mb-4
              ">

                                            {item.productName}

                                        </h3>

                                        {
                                            myReviews[item.product]

                                                ?

                                                (

                                                    <div
                                                        className="
            bg-green-500/10
            border
            border-green-500/20
            rounded-2xl
            p-5
            "
                                                    >

                                                        <h3
                                                            className="
                text-green-400
                text-xl
                font-bold
                "
                                                        >

                                                            ✅ Your Review

                                                        </h3>

                                                        <div
                                                            className="
                text-yellow-400
                text-3xl
                mt-4
                "
                                                        >

                                                            {
                                                                "★".repeat(
                                                                    myReviews[item.product].rating
                                                                )
                                                            }

                                                        </div>

                                                        <div className="mt-5 p-4 rounded-xl bg-white/5">

                                                            <p className="text-slate-300 leading-7">

                                                                {

                                                                    myReviews[item.product].comment

                                                                }

                                                            </p>

                                                        </div>

                                                        <p className="mt-4 text-sm text-slate-500">

                                                            Reviewed on

                                                            {

                                                                new Date(

                                                                    myReviews[item.product].createdAt

                                                                ).toLocaleDateString()

                                                            }

                                                        </p>

                                                        <button
                                                            onClick={() => {

                                                                setMyReviews(prev => ({

                                                                    ...prev,

                                                                    [item.product]: null

                                                                }));


                                                                setReviews(prev => ({

                                                                    ...prev,

                                                                    [item.product]: {

                                                                        rating: myReviews[item.product].rating,

                                                                        comment: myReviews[item.product].comment

                                                                    }

                                                                }));

                                                            }}
                                                            className="mt-6 px-5 py-2 bg-blue-500 rounded-xl"
                                                        >

                                                            ✏ Edit Review

                                                        </button>

                                                    </div>

                                                )

                                                :

                                                (
                                                    <>
                                                        <div className="
                flex
                gap-2
                mb-4
              ">

                                                            {
                                                                [1, 2, 3, 4, 5]
                                                                    .map(star => (

                                                                        <button
                                                                            key={star}
                                                                            onClick={() =>
                                                                                setReviews(
                                                                                    prev => ({
                                                                                        ...prev,

                                                                                        [item.product]: {

                                                                                            ...prev[
                                                                                            item.product
                                                                                            ],

                                                                                            rating:
                                                                                                star

                                                                                        }

                                                                                    })
                                                                                )
                                                                            }
                                                                            className={
                                                                                star <=
                                                                                    (
                                                                                        reviews[
                                                                                            item.product
                                                                                        ]?.rating || 0
                                                                                    )
                                                                                    ?
                                                                                    "text-yellow-400 text-3xl"
                                                                                    :
                                                                                    "text-gray-500 text-3xl"
                                                                            }
                                                                        >

                                                                            ★

                                                                        </button>

                                                                    ))

                                                            }
                                                            <p className="mt-3 text-slate-400">

                                                                {

                                                                    reviews[item.product]?.rating === 1 && "😞 Poor"

                                                                }

                                                                {

                                                                    reviews[item.product]?.rating === 2 && "😐 Fair"

                                                                }

                                                                {

                                                                    reviews[item.product]?.rating === 3 && "🙂 Good"

                                                                }

                                                                {

                                                                    reviews[item.product]?.rating === 4 && "😊 Very Good"

                                                                }

                                                                {

                                                                    reviews[item.product]?.rating === 5 && "🤩 Excellent"

                                                                }

                                                            </p>
                                                        </div>

                                                        <textarea

                                                            placeholder="Tell us about the taste, quality, packaging and delivery experience..."

                                                            value={
                                                                reviews[
                                                                    item.product
                                                                ]?.comment || ""
                                                            }

                                                            onChange={(e) =>

                                                                setReviews(
                                                                    prev => ({

                                                                        ...prev,

                                                                        [item.product]: {

                                                                            ...prev[
                                                                            item.product
                                                                            ],

                                                                            comment:
                                                                                e.target.value

                                                                        }

                                                                    })
                                                                )

                                                            }

                                                            className="
                w-full
                p-4
                rounded-xl
                bg-white/10
                border
                border-white/10
                "

                                                        />

                                                        {
                                                            reviewedProducts.includes(
                                                                item.product
                                                            )

                                                                ? (

                                                                    <div
                                                                        className="
                bg-green-500/10
                border
                border-green-500/20
                rounded-2xl
                p-5
                mt-4
            "
                                                                    >

                                                                        <h3 className="text-green-400 font-bold">

                                                                            ✅ Review Submitted

                                                                        </h3>

                                                                        <p className="text-slate-400 mt-2">

                                                                            Thank you for sharing your feedback ❤️

                                                                        </p>

                                                                        <button
                                                                            className="
                    mt-4
                    px-5
                    py-2
                    rounded-xl
                    bg-blue-500
                "
                                                                        >

                                                                            ✏ Edit Review

                                                                        </button>

                                                                    </div>

                                                                )

                                                                : (

                                                                    <button
                                                                        onClick={() => submitReview(item.product)}
                                                                        disabled={reviewLoading}
                                                                        className="mt-4 bg-orange-500 px-6 py-3 rounded-xl disabled:opacity-50"
                                                                    >

                                                                        {

                                                                            reviewLoading

                                                                                ?

                                                                                "Submitting..."

                                                                                :

                                                                                myReviews[item.product]

                                                                                    ?

                                                                                    "Update Review"

                                                                                    :

                                                                                    "Submit Review"

                                                                        }

                                                                    </button>

                                                                )
                                                        }

                                                    </>
                                                )}
                                    </div>

                                )
                            )
                        }

                    </div>

                )
            }

        </div>

    );


}



export default TrackOrder;



// <div className="bg-red-500 p-4 mb-5">

//     <pre>
//         {
//             JSON.stringify(
//                 agentLocation,
//                 null,
//                 2
//             )
//         }
//     </pre>

// </div>