import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import AddressMap from "./AddressMap";
import toast from "react-hot-toast";

const AddressForm = ({
  formData,
  setFormData,
  onSubmit,
  loading,
  editingId
}) => {

  const [locationLoading,
    setLocationLoading] =
    useState(false);

  const [accuracy,
    setAccuracy] =
    useState(null);

  const [pinAdjusted, setPinAdjusted] = useState(false);

  const GOOGLE_API_KEY =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleChange = e => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const reverseGeocode = async (

    latitude,

    longitude

  ) => {

    try {

      const response = await fetch(

        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`

      );

      const data = await response.json();

      if (

        data.status !== "OK"

      ) {

        return;

      }

      const result =

        data.results[0];

      const components =

        result.address_components;

      const get = (type) => {

        const component =

          components.find(

            c =>

              c.types.includes(type)

          );

        return component

          ? component.long_name

          : "";

      };

      setFormData(prev => ({

        ...prev,

        formattedAddress:

          result.formatted_address,

        street:

          get("route"),

        area:

          get("sublocality") ||

          get("locality"),

        city:

          get("administrative_area_level_2"),

        state:

          get("administrative_area_level_1"),

        pincode:

          get("postal_code")

      }));

    }

    catch (err) {

      console.log(err);

    }

  };

  const detectLocation = () => {

    if (!navigator.geolocation) {

      toast.error("Geolocation is not supported.");

      return;

    }

    setLocationLoading(true);

    setAccuracy(null);

    const watchId = navigator.geolocation.watchPosition(

      async (position) => {

        const {

          latitude,

          longitude,

          accuracy

        } = position.coords;

        const roundedAccuracy = Math.round(accuracy);

        setAccuracy(roundedAccuracy);

        setFormData(prev => ({
          ...prev,
          latitude,
          longitude
        }));

        await reverseGeocode(
          latitude,
          longitude
        );

        navigator.geolocation.clearWatch(watchId);

        setLocationLoading(false);

        toast.success(
          `Location detected\nAccuracy: ${roundedAccuracy}m`
        );

      },


  (error) => {

    navigator.geolocation.clearWatch(watchId);

    setLocationLoading(false);

    console.log(error);

    toast.error("Unable to detect location.");

  },

  {

    enableHighAccuracy: true,

    timeout: 25000,

    maximumAge: 0

  }

    );

  };

return (

  <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8">

    <h2 className="text-2xl font-bold mb-6">

      {
        editingId
          ? "Edit Address"
          : "Add Address"
      }

    </h2>

    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >

      <input

        type="hidden"

        name="formattedAddress"

        value={formData.formattedAddress}

      />

      <select
        name="label"
        value={formData.label}
        onChange={handleChange}
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      >

        <option value="Home">
          Home
        </option>

        <option value="Work">
          Work
        </option>

        <option value="Other">
          Other
        </option>

      </select>

      <input
        type="text"
        name="receiverName"
        placeholder="Receiver Name"
        value={formData.receiverName}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      />

      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      />

      <input
        type="text"
        name="houseNo"
        placeholder="House No"
        value={formData.houseNo}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      />

      <input
        type="text"
        name="apartment"
        placeholder="Apartment / Building Name"
        value={formData.apartment}
        onChange={handleChange}
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      />

      <input
        type="text"
        name="street"
        placeholder="Street"
        value={formData.street}
        onChange={handleChange}
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      />

      <input
        type="text"
        name="landmark"
        placeholder="Landmark"
        value={formData.landmark}
        onChange={handleChange}
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      />

      <input
        type="text"
        name="area"
        placeholder="Area / Locality"
        value={formData.area}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      />

      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10"
      />

      <div className="grid grid-cols-2 gap-4">

        <input
          type="text"
          value={formData.latitude}
          readOnly
          placeholder="Latitude"
          className="p-4 rounded-xl bg-slate-800 border border-white/10"
        />

        <input
          type="text"
          value={formData.longitude}
          readOnly
          placeholder="Longitude"
          className="p-4 rounded-xl bg-slate-800 border border-white/10"
        />

      </div>

      <button
        type="button"
        onClick={detectLocation}
        disabled={locationLoading}
        className="w-full py-4 bg-blue-500 hover:bg-blue-400 rounded-xl flex items-center justify-center gap-3"
      >

        <FaMapMarkerAlt />

        {
          locationLoading
            ? "Detecting Location..."
            : "Detect My Location"
        }

      </button>

      <AddressMap
        formData={formData}
        setFormData={setFormData}
        reverseGeocode={reverseGeocode}
        setPinAdjusted={setPinAdjusted}
      />

      {
        accuracy !== null && (

          <div className="rounded-xl bg-slate-800 p-4 text-center">

            <h3 className="font-semibold">

              GPS Accuracy

            </h3>

            <p className="text-3xl font-bold mt-2">

              {accuracy} m

            </p>

            {

              accuracy <= 10 ?

                <p className="text-green-400 mt-2">

                  ✅ Excellent Accuracy

                </p>

                :

                accuracy <= 20 ?

                  <p className="text-yellow-400 mt-2">

                    🟡 Very Good Accuracy

                  </p>

                  :

                  accuracy <= 50 ?

                    <p className="text-orange-400 mt-2">

                      🟠 Waiting for Better GPS...

                    </p>

                    :

                    <p className="text-red-400 mt-2">

                      🔴 Weak GPS Signal

                    </p>

            }

          </div>

        )
      }

      <div className="flex items-center justify-between bg-slate-800 rounded-xl p-4">

        <span>

          Set as Default Address

        </span>

        <input

          type="checkbox"

          checked={formData.isDefault}

          onChange={(e) =>

            setFormData({

              ...formData,

              isDefault: e.target.checked

            })

          }

          className="w-5 h-5"

        />

      </div>

      <textarea
        name="deliveryInstructions"
        placeholder="Delivery Instructions (Optional)"
        value={formData.deliveryInstructions}
        onChange={handleChange}
        rows={3}
        className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 resize-none"
      />

      <button
        type="submit"
        disabled={
          loading ||
          !formData.latitude ||
          !formData.longitude
        }
        className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {
          loading
            ? "Saving..."
            : editingId
              ? "Update Address"
              : "Save Address"
        }
      </button>

    </form>

  </div>

);

};

export default AddressForm;