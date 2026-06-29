import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import api from "../../../services/api";

const EditProfile = () => {
  const navigate = useNavigate();

  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);

  const [form,setForm]=useState({
    name:"",
    phone:"",
    email:"",
    gender:"Other",
    dateOfBirth:""
  });

  useEffect(()=>{
    fetchProfile();
  },[]);

  const fetchProfile = async()=>{
    try{
      const res=await api.get("/customers/profile");
      const c=res.data.customer;

      setForm({
        name:c.name||"",
        phone:c.phone||"",
        email:c.email||"",
        gender:c.gender||"Other",
        dateOfBirth:c.dateOfBirth
          ? c.dateOfBirth.slice(0,10)
          : ""
      });
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  };

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      setSaving(true);

      await api.put("/customers/profile",{
        name:form.name,
        email:form.email,
        gender:form.gender,
        dateOfBirth:form.dateOfBirth
      });

      alert("Profile updated successfully");
      navigate("/menu");

    }catch(err){
      alert(err.response?.data?.message || "Something went wrong");
    }finally{
      setSaving(false);
    }
  };

  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return(
    <div className="max-w-4xl mx-auto pt-10 pb-12 px-5">

      <button
        onClick={()=>navigate(-1)}
        className="flex items-center gap-2 mb-8 text-orange-500"
      >
        <FaArrowLeft/>
        Back
      </button>

      <div className="bg-slate-900/70 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8">

        <h1
          style={{fontFamily:"Outfit"}}
          className="text-4xl font-bold mb-8"
        >
          Edit Profile
        </h1>

        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-8xl text-orange-500"/>
            <p className="text-slate-400 mt-3">
              Profile Photo Coming Soon
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-4 rounded-2xl bg-white border border-white/10 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Phone Number
            </label>

            <input
              type="text"
              value={form.phone}
              readOnly
              className="w-full p-4 rounded-2xl bg-white border border-white/10 cursor-not-allowed opacity-70"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full p-4 rounded-2xl bg-white border border-white/10 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Gender
            </label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-white border border-white/10"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Date Of Birth
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-white border border-white/10"
            />
          </div>

          <button
            disabled={saving}
            className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 transition text-lg font-semibold"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProfile;
