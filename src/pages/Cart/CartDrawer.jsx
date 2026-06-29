import { useNavigate } from "react-router-dom";

const CartDrawer = ({
  isOpen,
  onClose,
  product,
  quantity
}) => {

  const navigate =
    useNavigate();

  if (!isOpen)
    return null;

  return (

    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/60
      backdrop-blur-sm
      "
      onClick={onClose}
    >

      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
        absolute
        right-0
        top-0
        h-full
        w-full
        max-w-md
        bg-slate-900
        border-l
        border-cyan-500/20
        p-6
        "
      >

        <div className="
          flex
          justify-between
          items-center
          mb-8
        ">

          <h2 className="
            text-2xl
            font-bold
          ">

            🛒 Added To Cart

          </h2>

          <button
            onClick={onClose}
            className="
            text-xl
            "
          >

            ✕

          </button>

        </div>

        <div className="space-y-3">

          <h3 className="
            text-xl
            font-semibold
          ">

            {product?.name}

          </h3>

          <p className="text-slate-400">

            {
              product?.variants?.[0]?.name
            }

          </p>

          <p>

            Quantity:
            {" "}
            {quantity}

          </p>

        </div>

        <div className="
          mt-10
          space-y-3
        ">

          <button
            onClick={onClose}
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

          <button
            onClick={() =>
              navigate("/cart")
            }
            className="
            w-full
            py-4
            rounded-2xl
            bg-orange-500
            "
          >

            View Cart

          </button>

        </div>

      </div>

    </div>

  );

};

export default CartDrawer;