import { useNavigate } from "react-router-dom";

const FloatingCartBar = ({
  itemCount,
  totalAmount
}) => {

  const navigate =
    useNavigate();

  if(itemCount === 0)
    return null;

  return (

    <div className="
      fixed
      bottom-5
      left-1/2
      -translate-x-1/2
      z-50
      w-[95%]
      max-w-2xl
    ">

      <button
        onClick={() =>
          navigate("/cart")
        }
        className="
        w-full
        bg-orange-500
        rounded-2xl
        px-6
        py-4

        flex
        justify-between
        items-center

        shadow-2xl
        "
      >

        <div>

          <h3 className="
            font-bold
            text-lg
          ">

            🛒 {itemCount} Items

          </h3>

        </div>

        <div className="
          flex
          items-center
          gap-4
        ">

          <span
            className="
            font-bold
            text-xl
          "
          >

            ₹{totalAmount}

          </span>

          <span>

            View Cart →

          </span>

        </div>

      </button>

    </div>

  );

};

export default FloatingCartBar;