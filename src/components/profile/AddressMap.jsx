import {
  GoogleMap,
  Marker,
  Circle,
  DirectionsRenderer,
  useLoadScript
} from "@react-google-maps/api";

import {
  useState,
  useEffect,
  useRef
} from "react";

import AddressSearch from "./AddressSearch";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const SHOP_LOCATION = {
  lat: 17.314251,
  lng: 78.444970
};

const AddressMap = ({
  formData,
  setFormData,
  reverseGeocode,
  setPinAdjusted
}) => {

  const { isLoaded } =
    useLoadScript({

      googleMapsApiKey:
        import.meta.env
          .VITE_GOOGLE_MAPS_API_KEY,

      libraries: ["places"]

    });

  const [mapCenter,
    setMapCenter] =
    useState(SHOP_LOCATION);

  const mapRef = useRef(null);

  const [markerPosition,
    setMarkerPosition] =
    useState(SHOP_LOCATION);

  const [directions, setDirections] = useState(null);

  const [routeInfo, setRouteInfo] = useState({

    distance: "",

    duration: ""

  });

  const DELIVERY_RADIUS = 3000;

  const calculateDistance = (

    lat1,

    lon1,

    lat2,

    lon2

  ) => {

    const R = 6371000;

    const dLat =

      (lat2 - lat1) *

      Math.PI /

      180;

    const dLon =

      (lon2 - lon1) *

      Math.PI /

      180;

    const a =

      Math.sin(dLat / 2) *

      Math.sin(dLat / 2) +

      Math.cos(lat1 * Math.PI / 180) *

      Math.cos(lat2 * Math.PI / 180) *

      Math.sin(dLon / 2) *

      Math.sin(dLon / 2);

    const c =

      2 *

      Math.atan2(

        Math.sqrt(a),

        Math.sqrt(1 - a)

      );

    return R * c;

  };


  useEffect(() => {


    if (
      formData.latitude &&
      formData.longitude
    ) {

      const newPosition = {

        lat: Number(
          formData.latitude
        ),

        lng: Number(
          formData.longitude
        )

      };

      setMapCenter(
        newPosition
      );

      setMarkerPosition(
        newPosition
      );

    }


  }, [
    formData.latitude,
    formData.longitude
  ]);

  useEffect(() => {

    if (

      !isLoaded ||

      !markerPosition ||

      !window.google

    ) return;

    const service =

      new window.google.maps.DirectionsService();

    service.route(

      {

        origin: SHOP_LOCATION,

        destination: markerPosition,

        travelMode:

          window.google.maps.TravelMode.DRIVING

      },

      (result, status) => {

        if (

          status === "OK"

        ) {

          setDirections(result);

          const leg =

            result.routes[0].legs[0];

          setRouteInfo({

            distance: leg.distance.text,

            duration: leg.duration.text

          });

        }

      }

    );

  }, [markerPosition]);

  const distance = calculateDistance(

    SHOP_LOCATION.lat,

    SHOP_LOCATION.lng,

    markerPosition.lat,

    markerPosition.lng

  );

  const deliveryAvailable =

    distance <= DELIVERY_RADIUS;

  if (!isLoaded) {


    return (
      <div className="h-[400px] flex items-center justify-center rounded-2xl bg-slate-800">
        Loading Map...
      </div>
    );


  }

  return (


    <div className="mt-6">

      <AddressSearch

        setFormData={setFormData}

        setMarkerPosition={setMarkerPosition}

        setMapCenter={setMapCenter}

        reverseGeocode={reverseGeocode}

      />

      <GoogleMap

        onLoad={(map) => {

          mapRef.current = map;

        }}

        mapContainerStyle={containerStyle}

        center={mapCenter}

        zoom={17}

        options={{

          streetViewControl: false,

          mapTypeControl: false,

          fullscreenControl: false,

          clickableIcons: false,

          zoomControl: true

        }}

      >

        <Circle

          center={SHOP_LOCATION}

          radius={DELIVERY_RADIUS}

          options={{

            fillColor: "#22c55e",

            fillOpacity: 0.15,

            strokeColor: "#22c55e",

            strokeOpacity: 0.8,

            strokeWeight: 2

          }}

        />

        <Marker
          position={SHOP_LOCATION}
          title="The Samosian Shop"
        />

        <Marker
          position={markerPosition}
          draggable={true}
          title="Your Location"
          onDragEnd={async (e) => {

            const lat = e.latLng.lat();
            const lng = e.latLng.lng();

            const newPosition = {
              lat,
              lng
            };

            setPinAdjusted(true);

            setMarkerPosition(newPosition);

            mapRef.current?.panTo(newPosition);

            mapRef.current?.setZoom(19);

            setMapCenter(newPosition);

            setFormData(prev => ({
              ...prev,
              latitude: lat,
              longitude: lng
            }));

            await reverseGeocode(lat, lng);

          }}
        />

        {

          directions && (

            <DirectionsRenderer

              directions={directions}

              options={{

                suppressMarkers: true,

                polylineOptions: {

                  strokeColor: "#06b6d4",

                  strokeWeight: 6

                }

              }}

            />

          )

        }

      </GoogleMap>

      <div className="mt-3 text-sm text-slate-400">

        Drag the pin to your exact house location if GPS is not accurate.

      </div>

      <div className="mt-5 rounded-xl bg-slate-900 p-5">

        <h2 className="text-xl font-bold">

          Delivery Details

        </h2>

        <div className="mt-4 space-y-2">

          <p>

            📏 Distance:

            <strong>

              {routeInfo.distance}

            </strong>

          </p>

          <p>

            ⏱ ETA:

            <strong>

              {routeInfo.duration}

            </strong>

          </p>

          <p>

            {

              deliveryAvailable

                ?

                "✅ Delivery Available"

                :

                "❌ Outside Delivery Area"

            }

          </p>

        </div>

      </div>

    </div>


  );

};

export default AddressMap;
