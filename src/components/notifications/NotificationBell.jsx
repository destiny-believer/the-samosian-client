import {
  useNotifications
}
from "../../context/NotificationContext";

const NotificationBell = () => {

  const {
    notifications
  } = useNotifications();

  return (

    <div className="relative">

      🔔

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