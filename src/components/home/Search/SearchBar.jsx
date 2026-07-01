import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX, FiClock, FiTrendingUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

const SearchBar = () => {

    const navigate = useNavigate();

    const searchRef = useRef();

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([]);

    const [showDropdown, setShowDropdown] = useState(false);

    const [recentSearches, setRecentSearches] = useState(
        JSON.parse(localStorage.getItem("recentSearches")) || []
    );

    const popularSearches = [
        "Burger",
        "Veg Samosa",
        "French Fries",
        "Lime Mojito",
        "Pizza",
        "Sandwich"
    ];

    useEffect(() => {

        const timeout = setTimeout(() => {

            if (search.trim()) {

                searchProducts();

            } else {

                setProducts([]);

            }

        }, 400);

        return () => clearTimeout(timeout);

    }, [search]);

    useEffect(() => {

        const close = (e) => {

            if (!searchRef.current?.contains(e.target)) {

                setShowDropdown(false);

            }

        };

        document.addEventListener("mousedown", close);

        return () => {

            document.removeEventListener("mousedown", close);

        };

    }, []);

    const searchProducts = async () => {

        try {

            setLoading(true);

            const response = await api.get(

                `/products/search?keyword=${search}`

            );

            setProducts(response.data.products || []);

            setLoading(false);

        }

        catch (error) {

            console.log(error);

            setLoading(false);

        }

    };

    const selectSearch = (value) => {

        const updated = [

            value,

            ...recentSearches.filter(item => item !== value)

        ].slice(0,5);

        localStorage.setItem(

            "recentSearches",

            JSON.stringify(updated)

        );

        setRecentSearches(updated);

        setSearch(value);

        setShowDropdown(false);

        navigate(`/menu?search=${value}`);

    };

    return (

        <section className="py-16 bg-slate-950">

            <div className="max-w-5xl mx-auto px-6">

                <div className="text-center mb-10">

                    <h2 className="text-4xl font-black">

                        What are you craving today?

                    </h2>

                    <p className="text-slate-400 mt-3">

                        Search burgers, samosas, fries, mojitos and more.

                    </p>

                </div>

                <div

                    ref={searchRef}

                    className="relative"

                >

                    <div className="relative">

                        <FiSearch

                            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"

                            size={24}

                        />

                        <input

                            value={search}

                            onChange={(e)=>{

                                setSearch(e.target.value);

                                setShowDropdown(true);

                            }}

                            placeholder="Search delicious food..."

                            className="w-full h-16 rounded-full bg-slate-900 border border-white/10 pl-16 pr-16 text-lg outline-none focus:border-orange-500"

                        />

                        {

                            search &&

                            <button

                                onClick={()=>{

                                    setSearch("");

                                    setProducts([]);

                                }}

                                className="absolute right-6 top-1/2 -translate-y-1/2"

                            >

                                <FiX size={22}/>

                            </button>

                        }

                    </div>

                    {

                        showDropdown && (

                            <div className="absolute w-full mt-3 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-40">

                                {

                                    loading &&

                                    <div className="p-5">

                                        Searching...

                                    </div>

                                }

                                {

                                    !loading && search==="" && (

                                        <>

                                            {

                                                recentSearches.length>0 &&

                                                <>

                                                    <div className="px-5 pt-5 pb-2 font-bold flex items-center gap-2">

                                                        <FiClock/>

                                                        Recent Searches

                                                    </div>

                                                    {

                                                        recentSearches.map(item=>(

                                                            <button

                                                                key={item}

                                                                onClick={()=>selectSearch(item)}

                                                                className="w-full text-left px-5 py-3 hover:bg-slate-800"

                                                            >

                                                                {item}

                                                            </button>

                                                        ))

                                                    }

                                                </>

                                            }

                                            <div className="px-5 pt-5 pb-2 font-bold flex items-center gap-2">

                                                <FiTrendingUp/>

                                                Popular Searches

                                            </div>

                                            {

                                                popularSearches.map(item=>(

                                                    <button

                                                        key={item}

                                                        onClick={()=>selectSearch(item)}

                                                        className="w-full text-left px-5 py-3 hover:bg-slate-800"

                                                    >

                                                        {item}

                                                    </button>

                                                ))

                                            }

                                        </>

                                    )

                                }

                                {

                                    !loading && search && (

                                        products.length>0

                                        ?

                                        products.map(product=>(

                                            <button

                                                key={product._id}

                                                onClick={()=>navigate(`/product/${product._id}`)}

                                                className="w-full flex items-center gap-4 p-4 hover:bg-slate-800 transition"

                                            >

                                                <img

                                                    src={product.images?.[0]}

                                                    alt={product.productName}

                                                    className="w-16 h-16 rounded-xl object-cover"

                                                />

                                                <div className="text-left">

                                                    <h4 className="font-bold">

                                                        {product.productName}

                                                    </h4>

                                                    <p className="text-orange-400">

                                                        ₹{product.basePrice}

                                                    </p>

                                                </div>

                                            </button>

                                        ))

                                        :

                                        <div className="p-6 text-center text-slate-400">

                                            No products found

                                        </div>

                                    )

                                }

                            </div>

                        )

                    }

                </div>

            </div>

        </section>

    );

};

export default SearchBar;