import { useState } from "react";
import api from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useCustomer } from "../../context/CustomerContext"
import FirebaseRecaptcha from "../../components/auth/FirebaseRecaptcha";
import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/firebase"

const Login = () => {

  const navigate = useNavigate();
  const { fetchCustomer } = useCustomer();
  const location = useLocation();

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [loading, setLoading] = useState(false)

  const sendOtp = async () => {

    try {

      setLoading(true);

      const appVerifier = window.recaptchaVerifier;

      const confirmationResult =
        await signInWithPhoneNumber(

          auth,

          `+91${phone}`,

          appVerifier

        );

      window.confirmationResult =
        confirmationResult;

      setOtpSent(true);

      alert("OTP Sent Successfully");

    }

    catch (error) {

      console.log("Firebase Error:", error);
      console.log("Error Code:", error.code);
      console.log("Error Message:", error.message);

      alert(error.message);

    }

    finally {

      setLoading(false);

    }

  };

  const verifyOtp = async () => {

    try {

      setLoading(true);

      // Verify OTP with Firebase
      const result =
        await window.confirmationResult.confirm(otp);

      // Get Firebase ID Token
      const firebaseToken =
        await result.user.getIdToken();

      // Send Firebase token to backend
      const response =
        await api.post(
          "/customers/firebase-login",
          {
            firebaseToken
          }
        );

      // Save JWT
      localStorage.setItem(
        "customerToken",
        response.data.token
      );

      // Save customer
      localStorage.setItem(
        "customer",
        JSON.stringify(response.data.customer)
      );

      const customer =
        response.data.customer;

      const from =
        location.state?.from;

      if (
        !customer.name ||
        customer.name.trim() === ""
      ) {

        navigate("/edit-profile", {
          state: {
            from
          }
        });

        return;

      }

      navigate(
        from || "/menu"
      );

    }

    catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message
      );

    }

    finally {

      setLoading(false);

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
      <FirebaseRecaptcha />
    </div>

  );

};

export default Login;