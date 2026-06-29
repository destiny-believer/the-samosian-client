import {
GoogleMap,
Marker,
useLoadScript
} from "@react-google-maps/api";

import {
useState,
useEffect
} from "react";

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
setFormData
}) => {

const { isLoaded } =
useLoadScript({
googleMapsApiKey:
import.meta.env
.VITE_GOOGLE_MAPS_API_KEY
});

const [mapCenter,
setMapCenter] =
useState(SHOP_LOCATION);

const [markerPosition,
setMarkerPosition] =
useState(SHOP_LOCATION);

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

if (!isLoaded) {


return (
  <div className="h-[400px] flex items-center justify-center rounded-2xl bg-slate-800">
    Loading Map...
  </div>
);


}

return (


<div className="mt-6">

  <GoogleMap
    mapContainerStyle={
      containerStyle
    }
    center={mapCenter}
    zoom={17}
  >

    <Marker
      position={
        markerPosition
      }
      draggable={true}
      onDragEnd={e => {

        const lat =
          e.latLng.lat();

        const lng =
          e.latLng.lng();

        const newPosition = {
          lat,
          lng
        };

        setMarkerPosition(
          newPosition
        );

        setMapCenter(
          newPosition
        );

        setFormData(
          prev => ({

            ...prev,

            latitude: lat,

            longitude: lng

          })
        );

      }}
    />

  </GoogleMap>

  <div className="mt-3 text-sm text-slate-400">

    Drag the pin to your exact house location if GPS is not accurate.

  </div>

</div>


);

};

export default AddressMap;
