import { useNavigate } from "react-router-dom";
import {
  useNotifications
}
  from "../../context/NotificationContext";

import { FiBell } from "react-icons/fi";

const NotificationBell = () => {
  
  const navigate = useNavigate();

  const {
    notifications
  } = useNotifications();


  return (

    <div
      onClick={() => navigate("/notifications")}
      className="
    relative
    cursor-pointer
    hover:text-orange-500
    transition-all
    "
    >

      <FiBell size={24} />

      {
        notifications.length > 0 && (

          <span
            className="
            absolute
            -top-2
            -right-2

            bg-red-500

            w-5
            h-5

            rounded-full

            text-xs

            flex
            items-center
            justify-center
          "
          >

            {
              notifications.length
            }

          </span>

        )
      }

    </div>

  );

};

export default NotificationBell;