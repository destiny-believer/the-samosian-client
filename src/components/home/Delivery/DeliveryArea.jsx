import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    GoogleMap,
    Marker,
    Circle,
    LoadScript
} from "@react-google-maps/api";

import {
    FiMapPin,
    FiNavigation,
    FiClock,
    FiTruck
} from "react-icons/fi";

const shopLocation = {

    lat: 17.401742,

    lng: 78.559437

};

const DeliveryArea = () => {

    const [customerLocation,
        setCustomerLocation] =
        useState(null);

    const [distance,
        setDistance] =
        useState(null);

    const [eligible,
        setEligible] =
        useState(false);

    useEffect(() => {

        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const location = {

                    lat: position.coords.latitude,

                    lng: position.coords.longitude

                };

                setCustomerLocation(location);

                calculateDistance(location);

            }

        );

    }, []);

    const calculateDistance = (customer) => {

        const R = 6371;

        const dLat =
            (customer.lat - shopLocation.lat) *
            Math.PI /
            180;

        const dLng =
            (customer.lng - shopLocation.lng) *
            Math.PI /
            180;

        const a =

            Math.sin(dLat / 2) *
            Math.sin(dLat / 2)

            +

            Math.cos(shopLocation.lat * Math.PI / 180)

            *

            Math.cos(customer.lat * Math.PI / 180)

            *

            Math.sin(dLng / 2)

            *

            Math.sin(dLng / 2);

        const c =

            2 *

            Math.atan2(

                Math.sqrt(a),

                Math.sqrt(1 - a)

            );

        const km = R * c;

        setDistance(km.toFixed(2));

        setEligible(km <= 3);

    };

    return (

        <section className="py-24 bg-slate-950">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center">

                    <span className="bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-full">

                        Delivery Coverage

                    </span>

                    <h2 className="text-5xl font-black mt-6">

                        Fast Delivery

                        <span className="text-orange-500">

                            {" "}Near You

                        </span>

                    </h2>

                    <p className="text-slate-400 mt-5">

                        Free delivery within 3 KM

                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-10 mt-16">

                    {/* Left */}

                    <motion.div

                        initial={{

                            opacity:0,

                            x:-50

                        }}

                        whileInView={{

                            opacity:1,

                            x:0

                        }}

                        viewport={{

                            once:true

                        }}

                        className="space-y-6"

                    >

                        <div className="bg-slate-900 rounded-3xl p-8 border border-white/10">

                            <div className="flex items-center gap-4">

                                <FiTruck

                                    className="text-orange-500"

                                    size={28}

                                />

                                <div>

                                    <h3 className="text-2xl font-bold">

                                        Free Delivery

                                    </h3>

                                    <p className="text-slate-400">

                                        Up to 3 KM Radius

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 border border-white/10">

                            <div className="flex items-center gap-4">

                                <FiClock

                                    className="text-cyan-400"

                                    size={28}

                                />

                                <div>

                                    <h3 className="text-2xl font-bold">

                                        Delivery Time

                                    </h3>

                                    <p className="text-slate-400">

                                        25 - 35 Minutes

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="bg-slate-900 rounded-3xl p-8 border border-white/10">

                            <div className="flex items-center gap-4">

                                <FiNavigation

                                    className="text-green-400"

                                    size={28}

                                />

                                <div>

                                    <h3 className="text-2xl font-bold">

                                        Your Distance

                                    </h3>

                                    <p className="text-slate-400">

                                        {

                                            distance

                                                ?

                                                `${distance} KM`

                                                :

                                                "Detecting..."

                                        }

                                    </p>

                                </div>

                            </div>

                        </div>

                        {

                            distance && (

                                <div

                                    className={`

                                        rounded-3xl

                                        p-8

                                        text-center

                                        text-xl

                                        font-bold

                                        ${

                                            eligible

                                            ?

                                            "bg-green-500"

                                            :

                                            "bg-red-500"

                                        }

                                    `}

                                >

                                    {

                                        eligible

                                            ?

                                            "✅ Delivery Available"

                                            :

                                            "❌ Outside Delivery Area"

                                    }

                                </div>

                            )

                        }

                        <button

                            onClick={()=>

                                window.open(

                                    "https://maps.google.com/?q=17.401742,78.559437"

                                )

                            }

                            className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-2xl font-bold"

                        >

                            Open Shop Location

                        </button>

                    </motion.div>

                    {/* Right */}

                    <motion.div

                        initial={{

                            opacity:0,

                            x:50

                        }}

                        whileInView={{

                            opacity:1,

                            x:0

                        }}

                        viewport={{

                            once:true

                        }}

                    >

                        <LoadScript

                            googleMapsApiKey={

                                import.meta.env

                                    .VITE_GOOGLE_MAPS_API_KEY

                            }

                        >

                            <GoogleMap

                                mapContainerStyle={{

                                    width:"100%",

                                    height:"600px",

                                    borderRadius:"30px"

                                }}

                                zoom={13}

                                center={shopLocation}

                            >

                                <Marker

                                    position={shopLocation}

                                />

                                {

                                    customerLocation && (

                                        <Marker

                                            position={customerLocation}

                                        />

                                    )

                                }

                                <Circle

                                    center={shopLocation}

                                    radius={3000}

                                    options={{

                                        fillColor:"#f97316",

                                        fillOpacity:.15,

                                        strokeColor:"#f97316",

                                        strokeWeight:2

                                    }}

                                />

                            </GoogleMap>

                        </LoadScript>

                    </motion.div>

                </div>

            </div>

        </section>

    );

};

export default DeliveryArea;