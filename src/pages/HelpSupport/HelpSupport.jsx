import {

    useState

} from "react";

import {

    FaArrowLeft,

    FaPhoneAlt,

    FaWhatsapp,

    FaEnvelope,

    FaMapMarkerAlt,

    FaChevronDown,

    FaChevronUp,

    FaHeadset

} from "react-icons/fa";

import {

    useNavigate

} from "react-router-dom";

import { COMPANY } from "../../constants/companyInfo";

const faqs = [

    {

        question: "What is the minimum order value?",

        answer: "Minimum order value is ₹350."

    },

    {

        question: "Is delivery free?",

        answer:
            "Yes. Delivery is completely FREE within our delivery radius."

    },

    {

        question: "How long does delivery take?",

        answer:
            "Preparation Time + approximately 10 minutes."

    },

    {

        question: "Which payment methods are available?",

        answer:
            "Currently we accept Cash on Delivery (COD)."

    },

    {

        question: "Can I cancel my order?",

        answer:
            "Please contact us immediately after placing your order."

    }

];

const HelpSupport = () => {

    const navigate =
        useNavigate();

    const [

        openIndex,

        setOpenIndex

    ] = useState(null);

    const callUs = () => {

        window.location.href =
            `tel:${COMPANY.phone}`;

    };

    const whatsapp = () => {

        window.open(

            `https://wa.me/${COMPANY.whatsapp}`,

            "_blank"

        );

    };

    const email = () => {

        window.location.href =
            `mailto:${COMPANY.email}`;

    };

    const maps = () => {

        window.open(

            COMPANY.maps,

            "_blank"

        );

    };

    return (

        <div className="min-h-screen bg-slate-950 text-white pb-24">

            <div className="max-w-5xl mx-auto px-5 pt-8">

                <button

                    onClick={() => navigate(-1)}

                    className="flex items-center gap-3 text-orange-400"

                >

                    <FaArrowLeft />

                    Back

                </button>

                <h1

                    className="text-4xl font-bold mt-6"

                >

                    Help & Support

                </h1>

                <p

                    className="text-slate-400 mt-2"

                >

                    Need help?

                    We're always happy to assist you.

                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-10">

                    <button

                        onClick={callUs}

                        className="rounded-3xl bg-slate-900 border border-orange-500/20 p-6 hover:border-orange-500 transition text-left"

                    >

                        <FaPhoneAlt

                            className="text-3xl text-orange-400"

                        />

                        <h3 className="mt-5 text-xl font-semibold">

                            Call Us

                        </h3>

                        <p className="text-slate-400 mt-2">

                            {COMPANY.phone}

                        </p>

                    </button>

                    <button

                        onClick={whatsapp}

                        className="rounded-3xl bg-slate-900 border border-green-500/20 p-6 hover:border-green-500 transition text-left"

                    >

                        <FaWhatsapp

                            className="text-3xl text-green-400"

                        />

                        <h3 className="mt-5 text-xl font-semibold">

                            WhatsApp

                        </h3>

                        <p className="text-slate-400 mt-2">

                            Chat instantly

                        </p>

                    </button>

                    <button

                        onClick={email}

                        className="rounded-3xl bg-slate-900 border border-blue-500/20 p-6 hover:border-blue-500 transition text-left"

                    >

                        <FaEnvelope

                            className="text-3xl text-blue-400"

                        />

                        <h3 className="mt-5 text-xl font-semibold">

                            Email

                        </h3>

                        <p className="text-slate-400 mt-2">

                            {COMPANY.email}

                        </p>

                    </button>

                    <button

                        onClick={maps}

                        className="rounded-3xl bg-slate-900 border border-red-500/20 p-6 hover:border-red-500 transition text-left"

                    >

                        <FaMapMarkerAlt

                            className="text-3xl text-red-400"

                        />

                        <h3 className="mt-5 text-xl font-semibold">

                            Visit Shop

                        </h3>

                        <p className="text-slate-400 mt-2">

                            Open Google Maps

                        </p>

                    </button>

                </div>

                {/* FAQ */}

                <div className="mt-12">

                    <h2 className="text-3xl font-bold">

                        Frequently Asked Questions

                    </h2>

                    <p className="text-slate-400 mt-2">

                        Find quick answers to the most common questions.

                    </p>

                    <div className="mt-8 space-y-4">

                        {

                            faqs.map((faq, index) => (

                                <div

                                    key={index}

                                    className="rounded-2xl bg-slate-900 border border-white/10 overflow-hidden"

                                >

                                    <button

                                        onClick={() =>

                                            setOpenIndex(

                                                openIndex === index

                                                    ? null

                                                    : index

                                            )

                                        }

                                        className="w-full flex justify-between items-center px-6 py-5"

                                    >

                                        <span className="font-semibold text-lg text-left">

                                            {faq.question}

                                        </span>

                                        {

                                            openIndex === index

                                                ?

                                                <FaChevronUp className="text-orange-400" />

                                                :

                                                <FaChevronDown className="text-slate-400" />

                                        }

                                    </button>

                                    {

                                        openIndex === index && (

                                            <div className="px-6 pb-5 text-slate-400 leading-7">

                                                {faq.answer}

                                            </div>

                                        )

                                    }

                                </div>

                            ))

                        }

                    </div>

                </div>



                {/* Need More Help */}

                <div className="mt-14 rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-center">

                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto">

                        <FaHeadset className="text-4xl text-white" />

                    </div>

                    <h2 className="text-3xl font-bold mt-6">

                        Still Need Help?

                    </h2>

                    <p className="mt-3 text-orange-100 max-w-xl mx-auto">

                        If your issue wasn't answered above,

                        feel free to contact us.

                        Our support team is always happy to help.

                    </p>

                    <div className="flex flex-wrap justify-center gap-5 mt-8">

                        <button

                            onClick={callUs}

                            className="px-8 py-3 rounded-2xl bg-white text-orange-600 font-semibold hover:scale-105 transition"

                        >

                            Call Now

                        </button>

                        <button

                            onClick={whatsapp}

                            className="px-8 py-3 rounded-2xl border border-white text-white hover:bg-white/20 transition"

                        >

                            WhatsApp

                        </button>

                    </div>

                </div>



                {/* Footer */}

                <div className="mt-14 text-center">

                    <h3 className="text-2xl font-bold">

                        {COMPANY.name}

                    </h3>

                    <p className="text-slate-400 mt-3">

                        Fresh • Tasty • Delivered

                    </p>

                    <p className="text-slate-500 mt-6">

                        {COMPANY.address}

                    </p>

                    <p className="text-slate-500 mt-2">

                        {COMPANY.email}

                    </p>

                    <p className="text-slate-500 mt-2">

                        {COMPANY.phone}

                    </p>

                    <p className="text-slate-600 text-sm mt-10">

                        © {new Date().getFullYear()} {COMPANY.name}.

                        All Rights Reserved.

                    </p>

                </div>

            </div>

        </div>

    );

};

export default HelpSupport;