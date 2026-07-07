import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    DirectionsService
} from "@react-google-maps/api";

import {
    useEffect,
    useState
} from "react";

const containerStyle = {

    width: "100%",

    height: "450px",

    borderRadius: "24px"

};

const LiveTrackingMap = ({

    shopLocation,

    customerLocation,

    agentLocation

}) => {

    const [directions,
        setDirections] = useState(null);

    useEffect(() => {

        if (
            !agentLocation ||
            !customerLocation ||
            !window.google
        ) return;

        const service =
            new window.google.maps.DirectionsService();

        service.route(

            {

                origin: agentLocation,

                destination: customerLocation,

                travelMode:
                    window.google.maps.TravelMode.DRIVING

            },

            (result, status) => {

                if (status === "OK") {

                    setDirections(result);

                }

            }

        );

    }, [

        agentLocation,

        customerLocation

    ]);

    return (

        <div className="mt-8 rounded-3xl overflow-hidden border border-white/10">

            <GoogleMap

                mapContainerStyle={containerStyle}

                center={agentLocation}

                zoom={15}

                options={{

                    streetViewControl: false,

                    mapTypeControl: false,

                    fullscreenControl: false,

                    clickableIcons: false

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

                <Marker

                    position={agentLocation}

                    label="🛵"

                />

                {

                    directions &&

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

                }

            </GoogleMap>

        </div>

    );

};

export default LiveTrackingMap;