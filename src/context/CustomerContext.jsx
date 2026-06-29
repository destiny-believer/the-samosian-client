import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {

  const [customer, setCustomer] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchCustomer = async () => {

    const token =
      localStorage.getItem("customerToken");

    if (!token) {

      setCustomer(null);

      setLoading(false);

      return;

    }

    try {

      const response =
        await api.get("/customers/profile");

      setCustomer(
        response.data.customer
      );

    } catch (error) {

      console.log(error);

      setCustomer(null);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCustomer();

  }, []);

  return (

    <CustomerContext.Provider
      value={{

        customer,

        setCustomer,

        fetchCustomer,

        loading

      }}
    >

      {children}

    </CustomerContext.Provider>

  );

};

export const useCustomer = () =>
  useContext(CustomerContext);