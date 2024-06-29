import { TbHeartCancel } from "react-icons/tb";
import { Link } from "react-router-dom";
interface WishListProps {
  title: string;
  category: string;
  imgSrc: string;
  newPrice: number;
  oldPrice: number;
}
function WishlistProductComp({
  title,
  imgSrc,
  category,
  newPrice,
  oldPrice,
}: WishListProps) {
  return (
    <>
      <div className="flex border-2 rounded-md space-x-2 shadow-md">
        <Link to={`/product/${title.replace(/\s+/g, "-").toLowerCase()}`}>
          <img className="h-64 md:h-full md:w-56" src={imgSrc} alt="img" />
        </Link>
        <div className="w-full flex space-y-1 py-2 px-1 flex-col justify-start">
          <span className="my-1 text-[17px] md:text-[26px]">{title}</span>
          <span className="text-neutral-600 text-sm">{category}</span>
          <div className="flex flex-row items-center py-2">
            <span className="font-semibold text-sm md:text-xl">
              ₹{newPrice}/-
            </span>
            <span className="ml-2 text-sm text-neutral-500">
              <span className="text-[11px] mx-0.5">M.R.P:</span>
              <s>₹{oldPrice}/-</s>
            </span>
          </div>
          <span className="text-sm font-light md:text-xl">
            FREE Delivery By CartCraze
          </span>
          <div className="w-full flex flex-row space-x-5 items-center pt-4">
            <button
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 hover:bg-black text-white flex justify-center p-1.5 w-[30vw] rounded-2xl text-sm lg:w-44"
            >
              Add to cart
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="hidden lg:flex border-2 border-black hover:border-red-600 hover:text-red-600 justify-center p-1.5 w-[30vw] rounded-2xl text-sm lg:w-44"
            >
              Remove from Wishlist
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-3xl cursor-pointer p-1 hover:bg-gray-200 rounded-full lg:hidden"
            >
              <TbHeartCancel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishlistProductComp;
