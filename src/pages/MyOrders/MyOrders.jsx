import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import socket from "../../services/socket";
const MyOrders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] =
    useState([]);


  const fetchOrders =
    async () => {

      try {

        const response =
          await api.get(
            "/orders/my-orders"
          );

        setOrders(
          response.data.orders
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchOrders();

    socket.on(
      "order-status-updated",
      data => {

        setOrders(
          previousOrders =>

            previousOrders.map(
              order =>

                order._id ===
                  data.orderId

                  ? {
                    ...order,
                    orderStatus:
                      data.status
                  }

                  : order
            )

        );

      }
    );



    return () => {

      socket.off(
        "order-status-updated"
      );

    };

  }, []);

  const reorder =
    async (orderId) => {

      try {

        await api.post(
          `/orders/reorder/${orderId}`
        );

        navigate("/cart");

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="max-w-7xl mx-auto px-5 pt-10 pb-10 text-white">

      {/* HERO */}

      <div className="bg-slate-900/70 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 mb-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <p className="text-orange-400 text-sm font-medium">

              ORDER HISTORY

            </p>

            <h1 className="text-5xl font-bold mt-2">

              My Orders

            </h1>

            <p className="text-slate-400 mt-3">

              Track all your past and current orders from The Samosian.

            </p>

          </div>

          <div>

            <h2 className="text-5xl font-bold text-cyan-400">

              {orders.length}

            </h2>

            <p className="text-slate-500">

              Total Orders

            </p>

          </div>

        </div>

      </div>

      {/* EMPTY STATE */}

      {
        orders.length === 0 && (

          <div className="bg-slate-900/70 border border-cyan-500/20 rounded-3xl p-12 text-center">

            <h2 className="text-3xl font-bold mb-4">

              No Orders Yet

            </h2>

            <p className="text-slate-400">

              Place your first order from The Samosian.

            </p>

          </div>

        )
      }

      {/* ORDERS */}

      <div className="grid lg:grid-cols-2 gap-6">

        {
          orders.map(order => (

            <div
              key={order._id}
              onClick={() =>
                navigate(
                  `/orders/${order._id}`
                )
              }
              className="
        cursor-pointer
        bg-slate-900/70
        backdrop-blur-xl
        border
        border-cyan-500/20
        rounded-3xl
        p-6
        hover:border-orange-500
        hover:scale-[1.02]
        transition-all
      "
            >

              <div className="flex justify-between items-start mb-5">

                <div>

                  <h2 className="text-2xl font-bold">

                    Order #

                    {order._id.slice(-6)}

                  </h2>

                  <p className="text-slate-400 mt-2">

                    {order.items.length}
                    {" "}
                    Items

                  </p>

                </div>

                <div
                  className={`
            px-4 py-2 rounded-full text-sm font-medium

            ${order.orderStatus === "Delivered"
                      ? "bg-green-500/20 text-green-400"
                      : order.orderStatus === "Cancelled"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-orange-500/20 text-orange-400"
                    }
          `}
                >

                  {order.orderStatus}

                </div>

              </div>

              <div className="space-y-2 mb-5">

                {
                  order.items
                    .slice(0, 3)
                    .map(
                      (item, index) => (
                        <p
                          key={index}
                          className="text-slate-300"
                        >

                          • {item.productName}

                        </p>
                      )
                    )
                }

                {
                  order.items.length > 3 && (

                    <p className="text-slate-500">

                      +{
                        order.items.length - 3
                      }
                      {" "}
                      More Items

                    </p>

                  )
                }

              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-5">

                <div>

                  <p className="text-slate-500">
                    Total Amount
                  </p>

                  <h3 className="text-2xl font-bold text-cyan-400">
                    ₹{order.totalAmount}
                  </h3>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      navigate(
                        `/orders/${order._id}`
                      );

                    }}
                    className="
      bg-orange-500
      hover:bg-orange-400
      px-5
      py-3
      rounded-2xl
      font-semibold
      "
                  >

                    Track

                  </button>

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      reorder(
                        order._id
                      );

                    }}
                    className="
      bg-cyan-500
      hover:bg-cyan-400
      px-5
      py-3
      rounded-2xl
      font-semibold
      "
                  >

                    Reorder

                  </button>

                </div>

              </div>

            </div>

          ))
        }

      </div>


    </div>

  );


};

export default MyOrders;