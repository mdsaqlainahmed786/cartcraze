import { IoMdHeartEmpty } from "react-icons/io";
import { useState } from "react";
import { FaHeart } from "react-icons/fa6";
interface CategoryProductProps {
  imageSrc:string;
  title:string;
  category:string;
   newPrice:number;
   oldPrice:number;
   
}
function CategoryProduct({imageSrc, title, category, newPrice, oldPrice}:CategoryProductProps) {
  const [liked, setLiked] = useState(false)
  const onLikeHandler = () =>{
    setLiked(!liked)
  }
  return (
    <div className="flex mt-5 w-[47vw] flex-col justify-center rounded-md shadow-md cursor-pointer md:w-[20vw] lg:w-[rem]">
      <div className="flex flex-col justify-start">
        <img
          className="h-full w-full rounded-t-md group"
          src={imageSrc}
          alt="hello"
        />
        <div
          className="sm:flex absolute h-full text-4xl flex flex-col group-hover:flex"
        >
          <div className="flex flex-col space-y-2 space-x-1 w-full items-end">
            <div onClick={onLikeHandler} className={`m-1 text-[20px] lg:text-[39px] rounded-full p-1 hover:text-red-600 ${liked?'text-red-600 lg:text-[40px] ':''}`}>
             { !liked? <IoMdHeartEmpty /> :<FaHeart />}
            </div>
          </div>
        </div>
        <div className="flex flex-col pl-2 space-y-1.5">
          <span className="font-semibold my-1 text-[15px] md:text-[20px]">
          {title}
          </span>
          <span className="text-neutral-600 text-sm">{category}</span>
          <div className="flex flex-row items-center">
            <span className="font-semibold text-xl">₹{newPrice}/-</span>
            <span className="ml-2 text-sm text-neutral-500">
              <s>₹{oldPrice}/-</s>
            </span>
          </div>
          <span className="text-sm font-light my-1">
            FREE Delivery By CrazeCart
          </span>
        </div>
        <button className="bg-gray-800 m-6 hover:bg-black text-white flex justify-center p-1 rounded-2xl">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default CategoryProduct;
