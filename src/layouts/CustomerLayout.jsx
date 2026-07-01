import { Outlet } from "react-router-dom";
import Navbar from "../components/common/NavbarV2.jsx";
import FloatingCartBar from "../components/common/FloatingCartBar.jsx";

const CustomerLayout = () => {

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <Outlet />

            <FloatingCartBar/>

        </div>

    );

};

export default CustomerLayout;