import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import AddressForm from "../../components/profile/AddressForm";

const Checkout = () => {

  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(0);

  const [cart, setCart] = useState(null);

  const [showAddressModal, setShowAddressModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [orderLoading, setOrderLoading] = useState(false);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData,
    setFormData] =
    useState({

      label: "Home",

      houseNo: "",

      street: "",

      landmark: "",

      city: "",

      pincode: "",

      latitude: "",

      longitude: "",

      isDefault: false

    });

  useEffect(() => {

    fetchAddresses();
    fetchCart();

  }, []);

  const fetchAddresses =
    async () => {

      try {

        const response =
          await api.get(
            "/customers/address"
          );

        setAddresses(
          response.data.addresses
        );

      } catch (error) {

        console.log(error);

      }

    };

  const fetchCart =
    async () => {

      try {

        const response =
          await api.get("/cart");

        setCart(
          response.data.cart
        );

      } catch (error) {

        console.log(error);

      }

    };

  const addAddress =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await api.post(
          "/customers/address",
          formData
        );

        await fetchAddresses();

        setShowAddressModal(
          false
        );

        const latestAddresses =
          await api.get(
            "/customers/address"
          );

        setAddresses(
          latestAddresses
            .data
            .addresses
        );

        setSelectedAddress(
          latestAddresses
            .data
            .addresses
            .length - 1
        );

        setFormData({

          label: "Home",

          houseNo: "",

          street: "",

          landmark: "",

          city: "",

          pincode: "",

          latitude: "",

          longitude: "",

          isDefault: false

        });

      } catch (error) {

        alert(
          error.response?.data?.message
        );

      } finally {

        setLoading(false);

      }

    };

  const placeOrder =
    async () => {
      setOrderLoading(true);

      try {
        const response = await api.post(
          "/orders/place-order",
          {
            addressIndex:
              selectedAddress
          }
        );
        setOrderLoading(false);

        setOrderPlaced(true);

        setTimeout(() => {

          navigate(
            `/orders/${response.data.order._id}`
          );

        }, 2000)
      } catch (error) {
        setOrderLoading(false);
        alert(
          error.response?.data?.message
        );

      }

    };

  if (!cart) {

    return (
      <div className="pt-32 text-center">
        Loading...
      </div>
    );

  }

  if (orderPlaced) {

    return (

      <div className="min-h-screen flex flex-col justify-center items-center text-center">

        <div className="text-8xl">

          ✅

        </div>

        <h1 className="text-5xl font-bold mt-8">

          Order Placed Successfully

        </h1>

        <p className="text-slate-400 mt-5">

          Your delicious food is now being prepared.

        </p>

        <div className="mt-10 w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-8 text-orange-400">

          Redirecting to Track Order...

        </p>

      </div>

    );

  }

  return (

    <div className="max-w-7xl mx-auto px-5 pt-10 pb-10 text-white">


      {/* HERO */}

      <div className="bg-slate-900/70 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 mb-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <p className="text-orange-400 text-sm font-medium">

              CHECKOUT

            </p>

            <h1 className="text-5xl font-bold mt-2">

              Complete Your Order

            </h1>

            <p className="text-slate-400 mt-3">

              Confirm your delivery address and review your order before placing it.

            </p>

          </div>

          <div className="text-right">

            <h2 className="text-5xl font-bold text-cyan-400">

              ₹{cart.totalAmount}

            </h2>

            <p className="text-slate-500">

              Total Amount

            </p>

          </div>

        </div>

      </div>

      <div className="mb-8 rounded-2xl bg-green-500/10 border border-green-500/20 p-5">

        <h3 className="text-green-400 font-bold">

          🔒 Secure Checkout

        </h3>

        <p className="text-slate-300 mt-2">

          Your address and order information are securely processed.

        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* DELIVERY ADDRESS */}

        <div className="lg:col-span-2">

          <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6">

            <h2 className="text-2xl font-bold mb-6">

              📍 Delivery Address

            </h2>

            <div className="space-y-4">

              {
                addresses.map(
                  (address, index) => (

                    <div
                      key={index}
                      onClick={() =>
                        setSelectedAddress(
                          index
                        )
                      }
                      className={`
                cursor-pointer
                rounded-2xl
                p-5
                border
                transition-all

                ${selectedAddress === index
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-white/10 hover:border-cyan-500/30"
                        }
              `}
                    >

                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="font-semibold text-lg">

                            {address.houseNo}

                          </h3>

                          <p className="text-slate-400 mt-1">

                            {address.street}

                          </p>

                          <p className="text-slate-500">

                            {address.landmark}

                          </p>

                          <p className="text-slate-400 mt-2">

                            {address.city}
                            {" - "}
                            {address.pincode}

                          </p>

                        </div>



                        {
                          selectedAddress === index && (

                            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">

                              ✓

                            </div>

                          )
                        }

                      </div>

                    </div>

                  )
                )
              }

              <button
                onClick={() =>
                  setShowAddressModal(true)
                }
                className="w-full py-4 mt-4 rounded-2xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-500"
              >

                ➕ Add New Address

              </button>

            </div>

            <div className="mt-6 bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6">

              <h2 className="text-2xl font-bold mb-5">

                🚚 Delivery Details

              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-slate-400">

                    Estimated Delivery

                  </span>

                  <span className="text-green-400 font-semibold">

                    25 - 35 mins

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-400">

                    Delivery Charge

                  </span>

                  <span className="text-green-400">

                    FREE

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-400">

                    Payment

                  </span>

                  <span>

                    Cash On Delivery

                  </span>

                </div>

              </div>

            </div>

            <div className="mt-6 bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6">

              <h2 className="text-2xl font-bold mb-5">

                📝 Delivery Instructions

              </h2>

              <textarea
                rows={4}
                placeholder="Example: Please don't ring the bell. Call me when you arrive."
                className="w-full rounded-2xl bg-white/5 border border-white/10 p-4 outline-none focus:border-orange-500 resize-none"
              />

            </div>

            <div className="mt-6 bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6">

              <h2 className="text-2xl font-bold mb-5">

                💰 Payment Method

              </h2>

              <div className="border border-orange-500 bg-orange-500/10 rounded-2xl p-5">

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="font-bold text-lg">

                      Cash On Delivery

                    </h3>

                    <p className="text-slate-400 mt-2">

                      Pay after your order is delivered.

                    </p>

                  </div>

                  <div className="text-3xl">

                    💵

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* ORDER SUMMARY */}

        <div>

          <div className="bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sticky top-28">

            <h2 className="text-2xl font-bold mb-6">

              🛒 Order Summary

            </h2>

            <div className="space-y-4">

              {
                cart.items.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex justify-between border-b border-white/10 pb-4"
                    >

                      <div>

                        <h3 className="font-semibold">

                          {item.productName}

                        </h3>

                        <p className="text-slate-400 text-sm">

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

            </div>

            <div className="mt-6 pt-6 border-t border-white/10">

              <div className="flex justify-between mb-3">

                <span className="text-slate-400">

                  Items

                </span>

                <span>

                  {cart.items.length}

                </span>

              </div>

              <div className="flex justify-between mb-3">

                <span className="text-slate-400">

                  Delivery

                </span>

                <span className="text-green-400">

                  FREE

                </span>

              </div>

              <div className="flex justify-between text-2xl font-bold">

                <span>

                  Total

                </span>

                <span className="text-cyan-400">

                  ₹{cart.totalAmount}

                </span>

              </div>

            </div>

            <button
              onClick={placeOrder}
              disabled={orderLoading}
              className="w-full mt-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 font-semibold text-lg transition-all disabled:opacity-50"
            >

              {

                orderLoading

                  ?

                  "Placing Order..."

                  :

                  "Place Order"

              }

            </button>

          </div>

        </div>

      </div>
      {
        showAddressModal && (

          <div className="
      fixed
      inset-0
      bg-black/70
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      p-4
    ">

            <div className="
        bg-slate-900
        rounded-3xl
        border
        border-cyan-500/20
        w-full
        max-w-3xl
        max-h-[90vh]
        overflow-y-auto
        p-6
      ">

              <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

                <h2 className="
            text-2xl
            font-bold
          ">

                  Add New Address

                </h2>

                <button
                  onClick={() =>
                    setShowAddressModal(
                      false
                    )
                  }
                >

                  ✕

                </button>

              </div>

              <AddressForm

                formData={formData}

                setFormData={
                  setFormData
                }

                onSubmit={
                  addAddress
                }

                loading={
                  loading
                }

                editingId={null}

              />

            </div>

          </div>

        )
      }

    </div>

  );


};

export default Checkout;