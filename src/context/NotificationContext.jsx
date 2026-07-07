import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from "react";

import api from "../services/api";
import socket from "../services/socket";

const NotificationContext =
  createContext();

export const NotificationProvider =
  ({ children }) => {

    const [
      notifications,
      setNotifications
    ] = useState([]);

    const [

      unreadCount,

      setUnreadCount

    ] = useState(0);

    const fetchNotifications = useCallback(async () => {

      try {

        const res = await api.get("/notifications");

        setNotifications(res.data.notifications);

      }

      catch (error) {

        console.log(error);

      }

    }, []);

    const fetchUnreadCount = useCallback(async () => {

      try {

        const res = await api.get(

          "/notifications/unread-count"

        );

        setUnreadCount(

          res.data.unreadCount

        );

      }

      catch (error) {

        console.log(error);

      }

    }, []);

    useEffect(() => {

      fetchNotifications();

      fetchUnreadCount();

      socket.on(

        "order-status-updated",

        notification => {

          setNotifications(previous => [

            notification,

            ...previous

          ]);

          setUnreadCount(previous => previous + 1);

        }

      );

      return () => {

        socket.off(

          "order-status-updated"

        );

      };

    }, [

      fetchNotifications,

      fetchUnreadCount

    ]);

    const getTitle = status => {

      switch (status) {

        case "Pending":
          return "Order Confirmed";

        case "Accepted":
          return "Restaurant Accepted";

        case "Preparing":
          return "Preparing Your Food";

        case "Agent Assigned":
          return "Delivery Partner Assigned";

        case "Picked Up":
          return "Order Picked Up";

        case "On The Way":
          return "On The Way";

        case "Delivered":
          return "Delivered";

        default:
          return "Order Update";

      }

    };

    const getMessage = status => {

      switch (status) {

        case "Pending":
          return "We've received your order.";

        case "Accepted":
          return "Restaurant accepted your order.";

        case "Preparing":
          return "Our chefs are preparing your food.";

        case "Agent Assigned":
          return "Delivery partner assigned.";

        case "Picked Up":
          return "Your order has been picked up.";

        case "On The Way":
          return "Your order is on the way.";

        case "Delivered":
          return "Enjoy your meal ❤️";

        case "Cancelled":
          return "Your order was cancelled.";

        default:
          return status;

      }

    };

    return (

      <NotificationContext.Provider
        value={{

          notifications,

          unreadCount,

          setUnreadCount,

          fetchNotifications,

          fetchUnreadCount

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