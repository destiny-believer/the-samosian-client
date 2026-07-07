import {
    GoogleMap,
    Marker,
    Polyline
} from "@react-google-maps/api";

const containerStyle = {

    width: "100%",

    height: "280px",

    borderRadius: "24px"

};

const MiniMapCard = ({

    shopLocation,

    customerLocation,

    orderStatus

}) => {

    if (

        !shopLocation ||

        !customerLocation

    ) {

        return null;

    }

    return (

        <div className="mt-8 bg-slate-900 rounded-3xl overflow-hidden border border-white/10">

            <div className="p-6">

                <h2 className="text-2xl font-bold">

                    Delivery Route

                </h2>

                <p className="text-slate-400 mt-2">

                    {

                        orderStatus === "Pending"

                            ?

                            "Your order has been confirmed."

                            :

                            orderStatus === "Accepted"

                                ?

                                "Restaurant has accepted your order."

                                :

                                orderStatus === "Preparing"

                                    ?

                                    "Our chefs are preparing your meal."

                                    :

                                    "Delivery partner is heading to the restaurant."

                    }

                </p>

            </div>

            <GoogleMap

                mapContainerStyle={containerStyle}

                center={shopLocation}

                zoom={13}

                options={{

                    disableDefaultUI: true,

                    clickableIcons: false,

                    gestureHandling: "none"

                }}

            >

                <Marker

                    position={shopLocation}

                    label="🍴"

                />

                <Marker

                    position={customerLocation}

                    label="🏠"

                />

                <Polyline

                    path={[

                        shopLocation,

                        customerLocation

                    ]}

                    options={{

                        strokeColor: "#f97316",

                        strokeOpacity: 1,

                        strokeWeight: 4

                    }}

                />

            </GoogleMap>

        </div>

    );

};

export default MiniMapCard;