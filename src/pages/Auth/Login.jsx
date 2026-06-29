import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext";

const Login = () => {

  const navigate = useNavigate();
  const { fetchCustomer } = useCustomer();

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const sendOtp = async () => {

    try {

      await api.post(
        "/customers/send-otp",
        { phone }
      );

      setOtpSent(true);

      alert("OTP Sent");

    } catch (error) {

      console.log(error);

    }

  };

  const verifyOtp = async () => {

    try {

      const response =
        await api.post(
          "/customers/verify-otp",
          {
            phone,
            otp
          }
        );

      localStorage.setItem(
        "customerToken",
        response.data.token
      );

      const profileResponse =
        await api.get(
          "/customers/profile"
        );

      const customer =
        profileResponse.data.customer;

      localStorage.setItem(
        "customer",
        JSON.stringify(customer)
      );

      if (
        !customer.name ||
        customer.name.trim() === ""
      ) {

        navigate(
          "/edit-profile"
        );

        return;

      }

      await fetchCustomer();

      navigate("/account");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center px-5">

      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-orange-500/20">

        <h1
          style={{ fontFamily: "Outfit" }}
          className="text-4xl font-bold text-center mb-8"
        >
          Login
        </h1>

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-white/10 mb-4 outline-none"
        />

        {!otpSent ? (

          <button
            onClick={sendOtp}
            className="w-full py-4 bg-orange-500 rounded-xl"
          >
            Send OTP
          </button>

        ) : (

          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-white/10 mb-4 outline-none"
            />

            <button
              onClick={verifyOtp}
              className="w-full py-4 bg-orange-500 rounded-xl"
            >
              Verify OTP
            </button>
          </>

        )}

      </div>

    </div>

  );

};

export default Login;