import {
    Autocomplete
} from "@react-google-maps/api";

import {
    useRef
} from "react";

const AddressSearch = ({

    setFormData,

    setMarkerPosition,

    setMapCenter,

    reverseGeocode,

    mapRef

}) => {

    const autocompleteRef = useRef(null);

    const onLoad = (autocomplete) => {

        autocompleteRef.current = autocomplete;

    };

    const onPlaceChanged = async () => {

        const place = autocompleteRef.current?.getPlace();

        if (
            !place ||
            !place.geometry ||
            !place.geometry.location
        ) {
            return;
        }

        const lat = place.geometry.location.lat();

        const lng = place.geometry.location.lng();

        const newPosition = {
            lat,
            lng
        };

        setMarkerPosition(newPosition);

        setMapCenter(newPosition);

        if (mapRef?.current) {

            mapRef.current.panTo(newPosition);

            mapRef.current.setZoom(19);

        }

        let apartment = "";
        let houseNo = "";
        let street = "";
        let landmark = "";
        let area = "";
        let city = "";
        let state = "";
        let pincode = "";

        (place.address_components || []).forEach(component => {

            component.types.forEach(type => {

                switch (type) {

                    case "street_number":
                        houseNo = component.long_name;
                        break;

                    case "route":
                        street = component.long_name;
                        break;

                    case "premise":
                        apartment = component.long_name;
                        break;

                    case "establishment":
                        if (!landmark)
                            landmark = component.long_name;
                        break;

                    case "neighborhood":
                    case "sublocality":
                    case "sublocality_level_1":
                    case "sublocality_level_2":
                    case "sublocality_level_3":
                        if (!area)
                            area = component.long_name;
                        break;

                    case "locality":
                        if (!city)
                            city = component.long_name;
                        break;

                    case "administrative_area_level_2":
                        if (!city)
                            city = component.long_name;
                        break;

                    case "administrative_area_level_1":
                        state = component.long_name;
                        break;

                    case "postal_code":
                        pincode = component.long_name;
                        break;

                    default:
                        break;

                }

            });

        });

        setFormData(prev => ({

            ...prev,

            apartment,

            houseNo,

            street,

            landmark,

            area,

            city,

            state,

            pincode,

            formattedAddress:
                place.formatted_address || "",

            googlePlaceId:
                place.place_id || "",

            latitude: lat,

            longitude: lng

        }));

        if (!houseNo) {

            alert(
                "Please verify or enter your House / Flat Number."
            );

        }

        if (reverseGeocode) {

            await reverseGeocode(
                lat,
                lng
            );

        }

    };

    return (

        <Autocomplete

            onLoad={onLoad}

            onPlaceChanged={onPlaceChanged}

            options={{

                componentRestrictions: {

                    country: "in"

                },

                fields: [

                    "address_components",

                    "formatted_address",

                    "geometry",

                    "place_id",

                    "name"

                ]

            }}

        >

            <input

                type="text"

                placeholder="🔍 Search your delivery address..."

                className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none mb-4"

            />

        </Autocomplete>

    );

};

export default AddressSearch;