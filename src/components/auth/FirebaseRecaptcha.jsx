import { useEffect } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const FirebaseRecaptcha = () => {

    useEffect(() => {

        if (!window.recaptchaVerifier) {

            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: () => {
                        console.log("reCAPTCHA Verified");
                    }
                }
            );

            window.recaptchaVerifier.render();

        }

    }, []);

    return <div id="recaptcha-container"></div>;

};

export default FirebaseRecaptcha;