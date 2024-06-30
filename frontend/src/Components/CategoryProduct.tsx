import { IoMdHeartEmpty } from "react-icons/io";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishList from "../pages/wishList";

interface CategoryProductProps {
  imageSrc: string;
  title: string;
  category: string;
  newPrice: number;
  oldPrice: number;
}

function CategoryProduct({
  imageSrc,
  title,
  category,
  newPrice,
  oldPrice,
}: CategoryProductProps) {
  const [liked, setLiked] = useState(false);
  
    useEffect(() => {
      const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isLiked = existingWishlist.some((item: any) => item.title === title);
    setLiked(isLiked);
    }, [title]);

  const onLikeHandler = async () => {
    const likeState = !liked;
    setLiked((prevLiked) => !prevLiked);

    // localStorage.setItem('liked', JSON.stringify(liked))
    const newItem = {
      title,
      imageSrc,
      category,
      oldPrice,
      newPrice,
      likeState,
    };
    if (!liked) {
      toast("Product Added to wishlist", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: false,
        type: "success",
        toastId: 13,
      });
    }
    console.log(newItem);
    if(likeState==true) {
      const existingWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      existingWishlist.push(newItem);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    }
    else if(likeState==false) {
      const list =  JSON.parse(localStorage.getItem("wishlist") || "[]")
      const updatedWishlist = list.filter((item:any) => item.title !== title);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
    }
  };

  return (
    <>
      <div className="flex mt-5 w-[47vw] flex-col justify-center rounded-md shadow-md cursor-pointer md:w-[30vw] lg:w-[20vw]">
        <div className="flex flex-col justify-start">
          <Link to={`/product/${title.replace(/\s+/g, "-").toLowerCase()}`}>
            <img
              className="h-full w-full rounded-t-md group"
              src={imageSrc}
              alt={title}
            />
          </Link>
          <div className="sm:flex absolute h-full text-4xl flex flex-col group-hover:flex">
            <div className="flex flex-col space-y-2 space-x-1 w-full items-end">
              <div
                onClick={onLikeHandler}
                className={`m-1 text-[20px] lg:text-[39px] rounded-full p-1 hover:text-red-600 ${
                  liked ? "text-red-600 lg:text-[40px]" : ""
                }`}
              >
                {liked ? <FaHeart /> : <IoMdHeartEmpty />}
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
              FREE Delivery By CartCraze
            </span>
          </div>
          <button className="bg-gray-800 m-6 hover:bg-black text-white flex justify-center p-1 rounded-2xl">
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export default CategoryProduct;
