import Navbar from "../Components/NavComponents/Navbar";
import FooterComp from "../Components/FooterComp";
import WishlistProductComp from "../Components/WishlistProductComp";
import { useState, useEffect } from "react";
import NotFound from "../Components/NotFound";
import { wishlistState } from "../RecoilStateProviders/WishListCount";
import { useRecoilState } from "recoil";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
interface WishlistItem {
  title: string;
  imageSrc: string;
  category: string;
  newPrice: number;
  oldPrice: number;
}

function WishList() {
  const [wishList, setWishList] = useState<WishlistItem[]>([]);
  const [wishlistCount, setWishlistCount] = useRecoilState(wishlistState);
 

  useEffect(() => {
    const storedWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    ) as WishlistItem[];
    setWishList(storedWishlist);
    setWishlistCount(storedWishlist.length);
  }, [setWishlistCount]);

  const onRemoveHandler = (title: string) => {
    console.log(wishlistCount);
    const updatedWishlist = wishList.filter((item) => item.title !== title);
    setWishList(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlistCount(updatedWishlist.length);
  };
   const onClearWishlist = () => {
    setWishList([]);
    localStorage.setItem("wishlist", JSON.stringify([]));
    setWishlistCount(0);
    toast.success("Wishlist cleared!", {
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
  }
  return (
    <>
      <Navbar />
      <div className="pb-24">

      <div className={`w-full flex my-4 space-y-2 ${wishList.length==0?'justify-center':'justify-between'} items-center max-w-[80vw] md:max-w-[60vw] pb-2 mx-auto`}>
            <span className="text-3xl font-medium font-sans md:text-4xl">
              Your Wishlist ({wishList.length})
            </span>
            <div onClick={onClearWishlist} className={`${wishList.length==0?'hidden':'flex'} items-center flex-col cursor-pointer mx-2`} title="Clear Wishlist">
            <TiDeleteOutline className="text-4xl" />
            </div>
          </div>
        <div className="flex flex-col justify-center items-center space-y-5 mx-auto max-w-[95vw]">
          {wishList.map((item, index) => (
            <WishlistProductComp
              key={index}
              title={item.title}
              imgSrc={item.imageSrc}
              category={item.category}
              newPrice={item.newPrice}
              oldPrice={item.oldPrice}
              onRemove={() => onRemoveHandler(item.title)}
            />
          ))}
          {wishList.length == 0 && <NotFound />}
        </div>
      </div>
      <FooterComp />
    </>
  );
}

export default WishList;
