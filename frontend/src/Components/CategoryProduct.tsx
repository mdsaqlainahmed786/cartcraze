import { IoMdHeartEmpty } from "react-icons/io";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { wishlistState } from "../RecoilStateProviders/WishListCount";

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
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [_, updateWishlistCount] = useRecoilState(wishlistState);
  const onLikeHandler = async () => {
    const likeState = !liked;
    setLiked((prevLiked) => !prevLiked);
    console.log(_);
    // localStorage.setItem('liked', JSON.stringify(liked))
    const newItem = {
      title,
      imageSrc,
      category,
      oldPrice,
      newPrice,
      likeState,
    };
    const existingWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    if (likeState) {
      toast.success("Product added to wishlist", {
        style: {
          border: "1px solid black",
          padding: "16px",
          color: "black",
          marginTop: "75px",
        },
        iconTheme: {
          primary: "black",
          secondary: "white",
        },
      });
      existingWishlist.push(newItem);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      setLiked(true);
    }
    if (!likeState) {
      const filteredWishlist = existingWishlist.filter(
        (item: CategoryProductProps) => item.title !== title
      );
      localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
      toast.success("Product removed from wishlist", {
        style: {
          border: "1px solid black",
          padding: "16px",
          color: "black",
          marginTop: "75px",
        },
        iconTheme: {
          primary: "black",
          secondary: "white",
        },
      });

      setLiked(false);
    }
    updateWishlistCount(JSON.parse(localStorage.getItem("wishlist")!).length);
  };
  // console.log(newItem);

  useEffect(() => {
    const existingWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    const isLiked = existingWishlist.some(
      (item: CategoryProductProps) => item.title === title
    );
    setLiked(isLiked);
  }, [liked, title]);

  return (
    <>
      <Link to={`/product/${title.replace(/\s+/g, "-").toLowerCase()}`}>
        <div className="flex mt-5 w-[47vw] flex-col justify-center rounded-md shadow-md cursor-pointer md:w-[30vw] lg:w-[20vw]">
          <div className="flex flex-col justify-start">
            <img
              className="h-full w-full rounded-t-md group"
              src={imageSrc}
              alt={title}
            />

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
              <div className="py-1">
                <div className="flex flex-wrap justify-start items-center">
                  <div className="flex flex-wrap space-x-1">
                    {sizes?.map((size) => (
                      <div className="p-1 px-2.5 border-2 rounded-lg">
                        {size}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-start items-center space-x-2 py-2 px-1">
                <div className="h-4 w-4 bg-black rounded-full border-2"></div>
                <span className="font-semibold text-neutral-600">Black</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CategoryProduct;
