import { useNavigate,useParams }
from "react-router-dom";

const OrderSuccess = () => {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      px-5
    ">

      <div className="
        max-w-lg
        w-full
        text-center

        bg-slate-900/70
        backdrop-blur-xl

        border
        border-green-500/20

        rounded-3xl

        p-10
      ">

        <div className="
          text-7xl
          mb-5
        ">

          🎉

        </div>

        <h1 className="
          text-4xl
          font-bold
          mb-4
        ">

          Order Placed

        </h1>

        <p className="
          text-slate-400
          mb-8
        ">

          Your order has been
          successfully placed.

        </p>

        <div className="
          bg-white/5
          rounded-2xl
          p-5
          mb-8
        ">

          <p>

            Order ID

          </p>

          <h3 className="
            text-xl
            font-bold
          ">

            #
            {
              id.slice(-6)
            }

          </h3>

        </div>

        <button
          onClick={() =>
            navigate(
              `/orders/${id}`
            )
          }
          className="
          w-full
          py-4
          rounded-2xl
          bg-orange-500
          mb-3
        "
        >

          Track Order

        </button>

        <button
          onClick={() =>
            navigate(
              "/menu"
            )
          }
          className="
          w-full
          py-4
          rounded-2xl
          border
          border-white/10
        "
        >

          Continue Shopping

        </button>

      </div>

    </div>

  );

};

export default OrderSuccess;