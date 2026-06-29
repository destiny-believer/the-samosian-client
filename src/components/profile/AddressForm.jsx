import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import AddressMap from "./AddressMap";
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

  const handleChange = e => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const detectLocation = () => {

    setLocationLoading(true);

    const watchId =
      navigator.geolocation.watchPosition(

        position => {

          const currentAccuracy =
            Math.round(
              position.coords.accuracy
            );

          setAccuracy(
            currentAccuracy
          );

          if (
            currentAccuracy <= 250
          ) {

            setFormData(prev => ({
              ...prev,

              latitude:
                position.coords.latitude,

              longitude:
                position.coords.longitude
            }));

            setLocationLoading(
              false
            );

            navigator.geolocation.clearWatch(
              watchId
            );

            alert(
              `Location Captured Successfully\nAccuracy: ${currentAccuracy}m`
            );

          }

        },

        error => {

          console.log(error);

          setLocationLoading(
            false
          );

          alert(
            "Unable To Detect Location"
          );

        },

        {
          enableHighAccuracy: true,
          timeout: 5000,
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
          name="houseNo"
          placeholder="House No"
          value={formData.houseNo}
          onChange={handleChange}
          required
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
          name="city"
          placeholder="City"
          value={formData.city}
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
        />

        {

          accuracy && (

            <div className="text-center">

              <p className="text-yellow-400">
                GPS Accuracy: {accuracy}m
              </p>

              {accuracy > 50 && (
                <p className="text-red-400">
                  GPS signal is weak. Move near a window or open area.
                </p>
              )}

            </div>

          )

        }

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-semibold"
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