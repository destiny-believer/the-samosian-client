import { motion, AnimatePresence } from "framer-motion";
import {
    FiX,
    FiHeart,
    FiShoppingCart,
    FiStar
} from "react-icons/fi";

const QuickViewModal = ({
    open,
    product,
    quantity,
    selectedVariant,
    onClose,
    onIncrease,
    onDecrease,
    onVariantChange,
    onAddToCart
}) => {

    if (!product) return null;

    return (

        <AnimatePresence>

            {

                open && (

                    <motion.div

                        initial={{ opacity:0 }}

                        animate={{ opacity:1 }}

                        exit={{ opacity:0 }}

                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex justify-center items-center p-5"

                    >

                        <motion.div

                            initial={{

                                scale:.8,

                                opacity:0

                            }}

                            animate={{

                                scale:1,

                                opacity:1

                            }}

                            exit={{

                                scale:.8,

                                opacity:0

                            }}

                            className="bg-slate-900 rounded-3xl max-w-5xl w-full overflow-hidden"

                        >

                            <div className="grid lg:grid-cols-2">

                                {/* IMAGE */}

                                <div>

                                    <img

                                        src={product.images[0]}

                                        alt={product.productName}

                                        className="w-full h-full object-cover"

                                    />

                                </div>

                                {/* DETAILS */}

                                <div className="p-10">

                                    <div className="flex justify-between">

                                        <div>

                                            <h2 className="text-4xl font-black">

                                                {product.productName}

                                            </h2>

                                            <div className="flex items-center gap-2 mt-3">

                                                <FiStar className="text-yellow-400"/>

                                                {product.averageRating || 4.9}

                                            </div>

                                        </div>

                                        <button

                                            onClick={onClose}

                                        >

                                            <FiX size={28}/>

                                        </button>

                                    </div>

                                    <p className="text-slate-400 mt-8 leading-8">

                                        {product.description}

                                    </p>

                                    {/* Variants */}

                                    <div className="mt-10">

                                        <h3 className="font-bold mb-4">

                                            Select Variant

                                        </h3>

                                        <div className="flex gap-4 flex-wrap">

                                            {

                                                product.variants.map(

                                                    variant=>(

                                                        <button

                                                            key={variant._id}

                                                            onClick={()=>onVariantChange(variant)}

                                                            className={`

                                                                px-5

                                                                py-3

                                                                rounded-xl

                                                                border

                                                                ${

                                                                    selectedVariant?._id===variant._id

                                                                    ?

                                                                    "bg-orange-500 border-orange-500"

                                                                    :

                                                                    "border-white/20"

                                                                }

                                                            `}

                                                        >

                                                            {variant.name}

                                                            <br/>

                                                            ₹{variant.price}

                                                        </button>

                                                    )

                                                )

                                            }

                                        </div>

                                    </div>

                                    {/* Quantity */}

                                    <div className="mt-10">

                                        <h3 className="font-bold mb-4">

                                            Quantity

                                        </h3>

                                        <div className="flex gap-5 items-center">

                                            <button

                                                onClick={onDecrease}

                                                className="w-12 h-12 bg-slate-800 rounded-full"

                                            >

                                                -

                                            </button>

                                            <h3 className="text-2xl">

                                                {quantity}

                                            </h3>

                                            <button

                                                onClick={onIncrease}

                                                className="w-12 h-12 bg-orange-500 rounded-full"

                                            >

                                                +

                                            </button>

                                        </div>

                                    </div>

                                    {/* Bottom */}

                                    <div className="flex justify-between items-center mt-14">

                                        <div>

                                            <h2 className="text-4xl font-black text-orange-500">

                                                ₹

                                                {

                                                    selectedVariant

                                                    ?

                                                    selectedVariant.price*quantity

                                                    :

                                                    product.basePrice*quantity

                                                }

                                            </h2>

                                        </div>

                                        <div className="flex gap-4">

                                            <button

                                                className="w-14 h-14 rounded-full bg-slate-800"

                                            >

                                                <FiHeart/>

                                            </button>

                                            <button

                                                onClick={onAddToCart}

                                                className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl flex items-center gap-3 font-bold"

                                            >

                                                <FiShoppingCart/>

                                                Add To Cart

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </motion.div>

                    </motion.div>

                )

            }

        </AnimatePresence>

    );

};

export default QuickViewModal;