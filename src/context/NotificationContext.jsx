import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import socket from "../services/socket";

const NotificationContext =
  createContext();

export const NotificationProvider =
  ({ children }) => {

    const [
      notifications,
      setNotifications
    ] = useState([]);

    useEffect(() => {

      socket.on(
        "order-status-updated",
        data => {

          const message =
            getMessage(
              data.orderStatus
            );

          setNotifications(
            previous => [

              {
                id: Date.now(),
                message
              },

              ...previous

            ]
          );

        }
      );

      return () => {

        socket.off(
          "order-status-updated"
        );

      };

    }, []);

    const getMessage =
      status => {

        switch(status){

          case "Pending":
            return "📦 Order confirmed";

          case "Preparing":
            return "🍳 Order is being prepared";

          case "Ready For Pickup":
            return "📍 Ready for pickup";

          case "Out For Delivery":
            return "🛵 Delivery partner is on the way";

          case "Delivered":
            return "✅ Order delivered successfully";

          default:
            return status;

        }

      };

    return (

      <NotificationContext.Provider
        value={{
          notifications
        }}
      >

        {children}

      </NotificationContext.Provider>

    );

};

export const useNotifications =
  () =>
    useContext(
      NotificationContext
    );