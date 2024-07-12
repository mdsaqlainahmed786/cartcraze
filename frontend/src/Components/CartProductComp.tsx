import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

function CartProductComp() {
  const [quantity, setQuantity] = useState(1);
  const minQuantity = 1;
  const maxQuantity = 20;
  const title='MEN BLACK PRINT SLIM FIT FORMAL THREE PIECE SUIT'
  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, maxQuantity));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, minQuantity));
  };
  return (
    <>
      <div className="flex border-2 space-y-2 rounded-md shadow-md">
      <Link to={`/product/${title.replace(/\s+/g, "-").toUpperCase()}`}>
        <img
          className="h-56 w-48 md:h-full md:w-56"
          src="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
          alt="img"
        />
       </Link>
        <div className="w-full flex px-4 md:space-y-3 flex-col justify-start">
          <span className="my-1 text-[14px] md:text-[26px]">
            Men Black Solid Ultra Slim Fit Formal Four Piece Suit
          </span>
          <span className="text-neutral-600 text-sm">Mens suit</span>
          <div className="flex flex-row items-center">
            <span className="font-semibold text-sm md:text-xl pt-4 md:pt-0-">₹12999/-</span>
          </div>
          <div>
          <div className="flex justify-start items-center space-x-2 py-2 px-1">
              <div
                className={`h-4 w-4 rounded-full border-2`}
                style={{ backgroundColor: "black"}}
              ></div>
              <span className="font-semibold text-neutral-600">Black</span>
            </div> 
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <button
                onClick={incrementQuantity}
                className="bg-gray-200 p-1.5 disabled:opacity-45 disabled:cursor-not-allowed enabled:hover:bg-black enabled:hover:text-white"
                disabled={quantity >= maxQuantity}
              >
                <FaPlus />
              </button>
              <div className="border-2 w-14 p-0.5 text-sm text-center">
                {quantity}
              </div>
              <button
                onClick={decrementQuantity}
                className="bg-gray-200 p-1.5 disabled:opacity-45 disabled:cursor-not-allowed enabled:hover:bg-black enabled:hover:text-white"
                disabled={quantity <= minQuantity}
              >
                <FaMinus />
              </button>
            </div>
            <div>
              <button className="text-2xl">
                <MdOutlineDeleteOutline />
              </button>
            </div>
          </div>
          <span
            className={`text-red-600 text-sm ${
              quantity >= maxQuantity ? "" : "hidden"
            }`}
          >
            Quantity limit is upto 20 items only!
          </span>
        </div>
      </div>
    </>
  );
}

export default CartProductComp;
