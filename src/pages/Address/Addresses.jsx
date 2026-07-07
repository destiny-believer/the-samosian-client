import { useEffect, useState } from "react";
import api from "../../services/api";
import AddressForm from "../../components/profile/AddressForm";

const Addresses = () => {

  const [addresses, setAddresses] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      label: "Home",

      receiverName: "",

      phoneNumber: "",

      houseNo: "",

      apartment: "",

      street: "",

      landmark: "",

      area: "",

      city: "",

      state: "",

      pincode: "",

      latitude: "",

      longitude: "",

      formattedAddress: "",

      deliveryInstructions: "",

      isDefault: false

    });

  useEffect(() => {

    fetchAddresses();

  }, []);

  const fetchAddresses =
    async () => {

      try {

        const response =
          await api.get(
            "/customers/address"
          );

        setAddresses(
          response.data.addresses || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const resetForm =
    () => {

      setEditingId(null);

      setFormData({

        label: "Home",

        receiverName: "",

        phoneNumber: "",

        houseNo: "",

        apartment: "",

        street: "",

        landmark: "",

        area: "",

        city: "",

        state: "",

        pincode: "",

        latitude: "",

        longitude: "",

        formattedAddress: "",

        deliveryInstructions: "",

        isDefault: false

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        if (editingId) {

          await api.put(
            `/customers/address/${editingId}`,
            formData
          );

        } else {

          await api.post(
            "/customers/address",
            formData
          );

        }

        await fetchAddresses();

        resetForm();

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }

    };

  const editAddress =
    (address) => {

      setEditingId(
        address._id
      );

      setFormData({

        label: address.label || "Home",

        receiverName: address.receiverName || "",

        phoneNumber: address.phoneNumber || "",

        houseNo: address.houseNo || "",

        apartment: address.apartment || "",

        street: address.street || "",

        landmark: address.landmark || "",

        area: address.area || "",

        city: address.city || "",

        state: address.state || "",

        pincode: address.pincode || "",

        latitude: address.location?.latitude || "",

        longitude: address.location?.longitude || "",

        formattedAddress: address.formattedAddress || "",

        deliveryInstructions: address.deliveryInstructions || "",

        isDefault: address.isDefault || false

      });

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    };

  const deleteAddress =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this address?"
        );

      if (!confirmDelete)
        return;

      try {

        await api.delete(
          `/customers/address/${id}`
        );

        fetchAddresses();

      } catch (error) {

        console.log(error);

      }

    };

  const setDefaultAddress =
    async (selectedId) => {

      try {

        const updated =
          addresses.map(
            address => {

              if (
                address._id === selectedId
              ) {

                return api.put(
                  `/customers/address/${address._id}`,
                  {
                    ...address,
                    isDefault: true
                  }
                );

              }

              return api.put(
                `/customers/address/${address._id}`,
                {
                  ...address,
                  isDefault: false
                }
              );

            }
          );

        await Promise.all(updated);

        fetchAddresses();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="max-w-7xl mx-auto px-5 pt-10 pb-10 text-white">


      {/* HERO */}

      <div className="bg-slate-900/70 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 mb-10">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

          <div>

            <p className="text-orange-400 text-sm font-medium">

              CUSTOMER ADDRESS

            </p>

            <h1 className="text-5xl font-bold mt-2">

              My Address

            </h1>

            <p className="text-slate-400 mt-3">

              Manage your delivery addresses and account preferences.

            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white/5 rounded-2xl p-5 text-center">

              <h2 className="text-4xl font-bold text-cyan-400">

                {addresses.length}

              </h2>

              <p className="text-slate-500">

                Addresses

              </p>

            </div>

            <div className="bg-white/5 rounded-2xl p-5 text-center">

              <h2 className="text-4xl font-bold text-orange-400">

                {
                  addresses.filter(
                    address =>
                      address.isDefault
                  ).length
                }

              </h2>

              <p className="text-slate-500">

                Default

              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* ADDRESS FORM */}

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">

            {
              editingId
                ? "✏️ Edit Address"
                : "📍 Add New Address"
            }

          </h2>

          <AddressForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            loading={loading}
            editingId={editingId}
          />

        </div>

        {/* SAVED ADDRESSES */}

        <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">

            🏠 Saved Addresses

          </h2>

          {
            addresses.length === 0 && (

              <div className="text-center py-12">

                <p className="text-slate-400">

                  No Address Found

                </p>

              </div>

            )
          }

          <div className="space-y-5">

            {
              addresses.map(
                address => (

                  <div
                    key={address._id}
                    className={`
              rounded-2xl
              p-5
              border

              ${address.isDefault
                        ? "border-green-500 bg-green-500/10"
                        : "border-white/10"
                      }
            `}
                  >

                    <div className="flex justify-between items-center mb-4">

                      <span className="px-4 py-1 bg-orange-500 rounded-full text-sm">

                        {
                          address.label ||
                          "Home"
                        }

                      </span>

                      {
                        address.isDefault && (

                          <span className="text-green-400 font-semibold">

                            Default

                          </span>

                        )
                      }

                    </div>

                    <div className="space-y-2 text-slate-300">

                      <p>

                        <strong>

                          {address.receiverName}

                        </strong>

                      </p>

                      <p>

                        {address.phoneNumber}

                      </p>

                      <p>

                        {address.houseNo}

                        {address.apartment && `, ${address.apartment}`}

                      </p>

                      <p>

                        {address.street}

                      </p>

                      <p>

                        {address.landmark}

                      </p>

                      <p>

                        {address.area}

                      </p>

                      <p>

                        {address.city},

                        {address.state}

                      </p>

                      <p>

                        {address.pincode}

                      </p>

                      {address.deliveryInstructions && (

                        <p className="text-cyan-400">

                          📝 {address.deliveryInstructions}

                        </p>

                      )}

                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">

                      <button
                        onClick={() =>
                          editAddress(
                            address
                          )
                        }
                        className="
                  px-4 py-2
                  rounded-xl
                  bg-blue-500
                  hover:bg-blue-400
                  transition-all
                "
                      >

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          deleteAddress(
                            address._id
                          )
                        }
                        className="
                  px-4 py-2
                  rounded-xl
                  bg-red-500
                  hover:bg-red-400
                  transition-all
                "
                      >

                        Delete

                      </button>

                      {
                        !address.isDefault && (

                          <button
                            onClick={() =>
                              setDefaultAddress(
                                address._id
                              )
                            }
                            className="
                      px-4 py-2
                      rounded-xl
                      bg-green-500
                      hover:bg-green-400
                      transition-all
                    "
                          >

                            Set Default

                          </button>

                        )
                      }

                    </div>

                  </div>

                )
              )
            }

          </div>

        </div>

      </div>
    </div>

  );

};

export default Addresses;