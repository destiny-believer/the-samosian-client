import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import socket from "../../services/socket";
import toast from "react-hot-toast";

import {
    GoogleMap,
    LoadScript,
    Marker,
    DirectionsRenderer
} from "@react-google-maps/api";

import StatusCard from "../../components/tracking/StatusCard";

const shopLocation = {
    lat: 17.314251,
    lng: 78.444970
};

const SHOP_LOCATION = {
    lat: 17.314251,
    lng: 78.444970
};

const mapContainerStyle = {
    width: "100%",
    height: "500px"
};

const TrackOrder = () => {

    const { id } = useParams();

    const navigate = useNavigate();

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
    const [map, setMap] = useState(null);
    const [myReviews, setMyReviews] = useState({});
    const [animatedLocation, setAnimatedLocation] = useState(null);
    const [heading, setHeading] = useState(0);
    const animationRef = useRef(null);
    const previousLocation = useRef(null);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [mapApi, setMapApi] = useState(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [liveEta, setLiveEta] = useState(null);
    const [liveDistance, setLiveDistance] = useState(null);

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

    // Fetch Order

    const fetchOrder = async () => {

        try {

            const response =
                await api.get(`/orders/${id}`);

            const orderData =
                response.data.order;

            console.log("ORDER DATA:", orderData);

            setOrder(orderData);

            // Set initial agent location
            if (
                orderData.agent &&
                orderData.agent.currentLatitude !== null &&
                orderData.agent.currentLongitude !== null
            ) {

                setAgentLocation({

                    latitude:
                        orderData.agent.currentLatitude,

                    longitude:
                        orderData.agent.currentLongitude,

                    agent:
                        orderData.agent

                });

            }

            await fetchMyReviews(orderData);

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

        if (map && agentLocation) {

            map.panTo({

                lat: agentLocation.latitude,

                lng: agentLocation.longitude

            });

        }

    }, [agentLocation, map]);

    useEffect(() => {

        if (!agentLocation)
            return;

        if (!previousLocation.current) {

            previousLocation.current = agentLocation;

            setAnimatedLocation(agentLocation);

            return;

        }

        const start = previousLocation.current;

        const end = agentLocation;

        const duration = 1000;

        const startTime = performance.now();

        const animate = (currentTime) => {

            const elapsed = currentTime - startTime;

            const progress = Math.min(
                elapsed / duration,
                1
            );

            const latitude =
                start.latitude +
                (end.latitude - start.latitude) *
                progress;

            const longitude =
                start.longitude +
                (end.longitude - start.longitude) *
                progress;

            const angle =
                Math.atan2(
                    end.longitude - start.longitude,
                    end.latitude - start.latitude
                ) *
                (180 / Math.PI);

            setHeading(angle);

            setAnimatedLocation({
                latitude,
                longitude
            });

            if (progress < 1) {

                animationRef.current =
                    requestAnimationFrame(animate);

            } else {

                previousLocation.current = end;

            }

        };

        animationRef.current =
            requestAnimationFrame(animate);

        return () => {

            cancelAnimationFrame(
                animationRef.current
            );

        };

    }, [agentLocation]);

    useEffect(() => {

        if (
            !isMapLoaded ||
            !window.google ||
            !window.google.maps ||
            !agentLocation ||
            !order
        ) {
            return;
        }

        const service =
            new google.maps.DirectionsService();

        service.route(
            {
                origin: {
                    lat: agentLocation.latitude,
                    lng: agentLocation.longitude
                },

                destination: {
                    lat: order.address.latitude,
                    lng: order.address.longitude
                },

                travelMode:
                    window.google.maps.TravelMode.DRIVING
            },

            (result, status) => {

                if (status !== "OK")
                    return;

                setDirections(result);

                const leg =
                    result.routes[0].legs[0];

                setLiveEta(
                    leg.duration.text
                );

                setLiveDistance(
                    leg.distance.text
                );

            }

        );

    }, [
        isMapLoaded,
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

    const handleOrderAgain = async () => {

        try {

            // Clear current cart

            await api.delete("/cart/clear");

            // Add previous order items

            for (const item of order.items) {

                await api.post("/cart/add", {

                    productId: item.product,

                    variantName: item.variantName,

                    quantity: item.quantity

                });

            }

            toast.success("Items added to cart");

            navigate("/cart");

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to reorder");

        }

    };

    const handleDownloadInvoice = async () => {

            try {

                const response = await api.get(

                    `/orders/invoice/${order._id}`,

                    {

                        responseType: "blob"

                    }

                );

                const url = window.URL.createObjectURL(

                    new Blob([response.data])

                );

                const link = document.createElement("a");

                link.href = url;

                link.download = `${order.invoiceNumber}.pdf`;

                document.body.appendChild(link);

                link.click();

                link.remove();

                window.URL.revokeObjectURL(url);

            }

            catch (error) {

                console.log(error);

                toast.error("Unable to download invoice");

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

            <StatusCard
                order={order}
                liveEta={liveEta}
            />

            {/* MAP + LIVE TRACKING */}

            <div className="grid lg:grid-cols-4 gap-6 mb-8">

                <div className="lg:col-span-3 bg-slate-900/70 border border-cyan-500/20 rounded-3xl mt-4 overflow-hidden">

                    <div className="h-[500px]">

                        <LoadScript
                            googleMapsApiKey={
                                import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                            }

                            onLoad={() => {

                                setIsMapLoaded(true);

                            }}
                        >

                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={
                                    agentLocation
                                        ? {
                                            lat: agentLocation.latitude,
                                            lng: agentLocation.longitude
                                        }
                                        : shopLocation
                                }
                                zoom={15}
                                onLoad={(mapInstance) => {

                                    setMap(mapInstance);

                                    setMapApi(window.google.maps);

                                }}
                            >

                                {/* 🏪 Shop Marker */}
                                <Marker
                                    position={shopLocation}
                                    icon={
                                        mapApi
                                            ? {
                                                url: "/map-icons/shop.png",
                                                scaledSize: new mapApi.Size(42, 42)
                                            }
                                            : undefined
                                    }
                                />

                                {/* 🏠 Customer Marker */}
                                <Marker
                                    position={{
                                        lat: order.address.latitude,
                                        lng: order.address.longitude
                                    }}
                                    icon={
                                        mapApi
                                            ? {
                                                url: "/map-icons/home.png",
                                                scaledSize: new mapApi.Size(42, 42)
                                            }
                                            : undefined
                                    }
                                />

                                {/* 🛵 Agent Marker */}
                                {agentLocation && animatedLocation && (

                                    <Marker
                                        position={{
                                            lat: animatedLocation.latitude,
                                            lng: animatedLocation.longitude
                                        }}
                                        icon={
                                            mapApi
                                                ? {
                                                    url: "/map-icons/bike.png",

                                                    scaledSize: new mapApi.Size(50, 50),

                                                    rotation: heading,

                                                    anchor: new mapApi.Point(25, 25)
                                                }
                                                : undefined
                                        }
                                    />

                                )}
                                {
                                    directions && (

                                        <DirectionsRenderer
                                            directions={directions}
                                            options={{
                                                suppressMarkers: true,
                                                polylineOptions: {
                                                    strokeColor: "#f97316",
                                                    strokeWeight: 6
                                                }
                                            }}
                                        />

                                    )
                                }

                            </GoogleMap>

                        </LoadScript>

                    </div>

                </div>

                <div className="bg-slate-900/70 rounded-3xl border border-orange-500/20 p-6 mt-4 h-full">

                    {

                        ["Pending", "Accepted", "Preparing"].includes(order.orderStatus)

                        &&

                        <>

                            <p className="text-orange-400 font-semibold">

                                🍴 Restaurant

                            </p>

                            <h2 className="text-3xl font-bold mt-3">

                                The Samosian

                            </h2>

                            <p className="text-slate-400 mt-2">

                                Freshly preparing your order.

                            </p>

                            <div className="mt-8 space-y-5">

                                <div>

                                    <p className="text-slate-400">

                                        Estimated Delivery

                                    </p>

                                    <h3 className="text-4xl font-black text-cyan-400">

                                        {liveEta || `${order.estimatedDeliveryTime} mins`}

                                    </h3>

                                </div>

                                <div>

                                    <p className="text-slate-400">

                                        Contact

                                    </p>

                                    <button className="mt-2 w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-semibold">

                                        Call Restaurant

                                    </button>

                                </div>

                            </div>

                        </>

                    }

                    {

                        ["Agent Assigned", "Picked Up", "On The Way"].includes(order.orderStatus)

                        &&

                        <>

                            <p className="text-green-400 font-semibold">

                                🛵 Delivery Partner

                            </p>

                            <div className="flex items-center gap-4 mt-5">

                                <div className="w-16 h-16 rounded-full bg-slate-800 overflow-hidden">

                                    {

                                        order.agent?.profileImage

                                            ?

                                            <img

                                                src={order.agent.profileImage}

                                                alt="Agent"

                                                className="w-full h-full object-cover"

                                            />

                                            :

                                            <div className="w-full h-full flex items-center justify-center text-2xl">

                                                🛵

                                            </div>

                                    }

                                </div>

                                <div>

                                    <h3 className="text-2xl font-bold">

                                        {order.agent?.name}

                                    </h3>

                                    <p className="text-slate-400">

                                        ⭐ 4.9

                                    </p>

                                </div>

                            </div>

                            <div className="mt-8 space-y-4">

                                <div className="flex justify-between">

                                    <span>

                                        Distance

                                    </span>

                                    <span>

                                        {liveDistance || "--"}

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span>

                                        ETA

                                    </span>

                                    <span className="text-cyan-400">

                                        {liveEta || "--"}

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span>

                                        Vehicle

                                    </span>

                                    <span>

                                        {order.agent?.vehicleNumber}

                                    </span>

                                </div>

                            </div>

                            <a

                                href={`tel:${order.agent?.phone}`}

                                className="mt-8 flex justify-center items-center w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold"

                            >

                                Call Delivery Partner

                            </a>

                        </>

                    }

                    {

                        order.orderStatus === "Delivered"

                        &&

                        <>

                            <div className="text-center">

                                <div className="text-6xl">

                                    ✅

                                </div>

                                <h2 className="text-3xl font-bold mt-4">

                                    Delivered

                                </h2>

                                <p className="text-slate-400 mt-2">

                                    Enjoy your meal ❤️

                                </p>

                            </div>

                            <div className="mt-8 space-y-4">

                                <button
                                    onClick={handleOrderAgain}
                                    className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-semibold"
                                >
                                    Order Again
                                </button>

                                <button

                                    onClick={() => handleDownloadInvoice()}

                                    className="w-full py-3 rounded-xl border border-white/20"

                                >
                                    Download Invoice
                                </button>

                            </div>

                        </>

                    }

                </div>

            </div>

            {/* PARTNER + SUMMARY */}

            <div className="grid lg:grid-cols-2 gap-6">

                <div className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl mb-10 p-6">

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
//             {
//             JSON.stringify(
//                 agentLocation,
//                 null,
//                 2
//             )
//         }
//     </pre>

// </div>