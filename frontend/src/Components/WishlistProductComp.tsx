import { TbHeartCancel } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CartCountState } from "../RecoilStateProviders/CartCount";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";
interface WishListProps {
  title: string;
  category: string;
  imgSrc: string;
  newPrice: number;
  oldPrice: number;
  onRemove?:()=>void
}
function WishlistProductComp({
  title,
  imgSrc,
  category,
  newPrice,
  oldPrice,
  onRemove
}: WishListProps) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useRecoilState(CartCountState)
  const [productCartId, setProductCartId] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onAddtoCart = async() => {
    if(userLoggedIn){
      try {
        setLoading(true)
        console.log(cartCount)
        const response = await axios.post(
           `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/add`,
           {
             productId: productCartId,
             quantity: 1,
           },
           {
             withCredentials: true,
           }
         );
         toast.success("Product added to cart", {
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
         console.log(response.data.message);
         const cartResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/getcart`,
          {
            withCredentials: true,
          }
        );
        setCartCount(cartResponse.data.cartItems.length);
       } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error("Error adding product to cart", error.response.data.message);
          toast.error(error.response.data.message, {
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
        } else {
          console.error("Error adding product to cart", error);
        }
      } finally {
        setLoading(false);
      }
    }
    else{
      toast.error("Please login to add product to cart", {
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
      navigate("/signin");
    }
  }
  const fetchProductForId = async() =>{
    const product = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/products/get/${title}`)
  //  console.log(title)
    setProductCartId(product.data.specificProduct.id)
   // console.log(productCartId)

  }
  useEffect(()=>{
    const token = Cookies.get("Secret_Auth_token");
    if (token) {
      setUserLoggedIn(true);
    }
    fetchProductForId()
  },[])
  return (
    <>
      <div className="flex md:w-[60vw] w-full border-2 rounded-md space-x-2 shadow-md">
        <Link to={`/product/${title.replace(/\s+/g, "-").toUpperCase()}`}>
          <img className="h-64 w-56 md:h-full md:w-56" src={imgSrc} alt="img" />
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
              onClick={onAddtoCart}
              className={`bg-gray-800 hover:bg-black text-white flex justify-center p-1.5 w-[30vw] rounded-2xl text-sm lg:w-44 ${ loading
                ? "opacity-80 cursor-not-allowed hover:bg-gray-800"
                : ""}`}
                disabled={loading}
            >
              <div className="flex space-x-2">
              {loading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-5 h-5  text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}{" "}
              <span>Add to cart</span>
              </div>
            </button>
            <button
              onClick={onRemove}
              className="hidden lg:flex border-2 border-black hover:border-red-600 hover:text-red-600 justify-center p-1.5 w-[30vw] rounded-2xl text-sm lg:w-44"
            >
              Remove from Wishlist
            </button>
            <div
              onClick={onRemove}
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
