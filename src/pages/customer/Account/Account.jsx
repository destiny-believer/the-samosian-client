// Account.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaMapMarkerAlt, FaHeart, FaStar, FaBell, FaQuestionCircle, FaInfoCircle, FaSignOutAlt, FaChevronRight, FaUserEdit } from "react-icons/fa";
import api from "../../../services/api";

const menuItems = [
    { title: "My Orders", subtitle: "View your previous orders", icon: FaBoxOpen, path: "/my-orders" },
    { title: "Saved Addresses", subtitle: "Manage delivery addresses", icon: FaMapMarkerAlt, path: "/addresses" },
    { title: "Favorites", subtitle: "Your favourite food items", icon: FaHeart, path: "/favorites" },
    { title: "My Reviews", subtitle: "Ratings & reviews", icon: FaStar, path: "/my-reviews" },
    { title: "Notifications", subtitle: "Recent updates", icon: FaBell, path: "/notifications" },
    { title: "Help & Support", subtitle: "Need assistance?", icon: FaQuestionCircle, path: "/help" },
    { title: "About Samosian", subtitle: "Version & information", icon: FaInfoCircle, path: "/about" }
];

function Account() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/customers/profile");
                setCustomer(res.data.customer);
            } catch (e) { console.log(e) }
            finally { setLoading(false) }
        })()
    }, []);

    const logout = () => {
        localStorage.removeItem("customerToken");
        navigate("/login");
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading Account...</div>
    }

    const initials = customer?.name ? customer.name.split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase() : "👤";

    return (
        <div className="max-w-7xl mx-auto pt-10 pb-10 px-5">
            <h1 style={{ fontFamily: "Outfit" }} className="text-4xl font-bold mb-8">My Account</h1>

            <div className="rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-orange-500/20 p-8 mb-8">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-3xl font-bold">{initials}</div>
                        <div>
                            <h2 className="text-3xl font-bold">{customer?.name || "Complete Your Profile"}</h2>
                            <p className="text-slate-400 mt-2">+91 {customer?.phone}</p>
                            <p className="text-slate-400">{customer?.email || "Add your email"}</p>
                        </div>
                    </div>
                    <button onClick={() => navigate("/edit-profile")} className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 flex items-center gap-2"><FaUserEdit />Edit Profile</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {menuItems.map((m, i) => {
                    const Icon = m.icon;
                    return <div key={i} onClick={() => navigate(m.path)} className="cursor-pointer rounded-3xl bg-slate-900/60 border border-orange-500/20 p-6 hover:border-orange-500 transition">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-5 items-center">
                                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-2xl"><Icon /></div>
                                <div><h3 className="text-xl font-semibold">{m.title}</h3><p className="text-slate-400 text-sm">{m.subtitle}</p></div>
                            </div><FaChevronRight className="text-slate-500" /></div></div>
                })}

                <div onClick={logout} className="md:col-span-2 cursor-pointer rounded-3xl bg-red-500/10 border border-red-500/30 p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-5 items-center">
                            <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400 text-2xl"><FaSignOutAlt /></div>
                            <div><h3 className="text-xl font-semibold text-red-400">Logout</h3><p className="text-slate-400 text-sm">Securely sign out</p></div>
                        </div><FaChevronRight className="text-red-400" /></div></div>
            </div>

            <div className="text-center text-slate-500 mt-12">
                <p>Version 1.0.0</p>
                <p className="mt-2">Made with ❤️ by The Samosian</p>
            </div>
        </div>);
}

export default Account