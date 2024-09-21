import CartProductComp from "../Components/CartProductComp";
import CartSummary from "../Components/CartSummary";
import FooterComp from "../Components/FooterComp";
import loader from "../assets/loader.gif";
import Navbar from "../Components/NavComponents/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import loginCart from "../assets/loginCart.png";
import emptyCart from "../assets/not.png";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartCountState } from "../RecoilStateProviders/CartCount";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { emailState, usernameState } from "../RecoilStateProviders/UserDetails";
interface CartItem {
  id: string;
  quantity: number;
  size: string;
  selectedSize: string;
  product: {
    id: string;
    title: string;
    description: string;
    category: string;
    newPrice: number;
    color: string;
    images: string[];
    sizes: string[];
  };
}
function Cart() {
  const [gotoLogin, setGotoLogin] = useState<boolean | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const userName = useRecoilValue(usernameState);
  const userEmail = useRecoilValue(emailState);
 // const cartCount = useCartCount()
  const [_, setCartCount] = useRecoilState(CartCountState)
  const navigate = useNavigate();
  //console.log(cartItems)
 // console.log(cartCount)
  const toCheckout = async() => {
    console.log(cartItems)
     navigate("/checkout");
  };
  const fetchProducts = async () => {
    console.log(_)
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/getcart`,
        {
          withCredentials: true,
        }
      );
       // console.log(response.data.cartItems.size);
      //  console.log(response.data.totalAmount)
       const total = response.data.totalAmount;
       setTotalPrice(total);
      // console.log(response.data.cartItems, "cartItems")
       
      const cart = response.data.cartItems;
      setCartItems(cart);
      setCartCount(cart.length);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  };
  const onClearCart = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/deleteall`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      fetchProducts();
      toast.success("Cart cleared!", {
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
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    const checkAuthStatus = async () => {
      // try {
      //   const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`, {
      //     withCredentials: true,
      //   });
      //   if (res.data.userName && res.data.userEmail) {
          
      //     setGotoLogin(false);
      //   } else {
      //     setGotoLogin(true);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
     
      if(userName && userEmail){
        setGotoLogin(false);
      }
      else{
        setGotoLogin(true);
      }
    };

    checkAuthStatus();
  }, [gotoLogin, userName, userEmail]);

  if (gotoLogin === null) {
    return null; 
    // Or a loading spinner or any placeholder
  }

  if (gotoLogin && userName === null && userEmail === null) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center h-[80vh] mx-auto">
          <img
            className="h-[25vh] md:h-[40vh]"
            src={loginCart}
            alt="server down"
          />
          <span className="text-neutral-500 text-[18px] text-center px-5">
            Please SignIn/SignUp to view or add items in your cart.
          </span>
          <button
            onClick={() => navigate("/signup")}
            className="bg-gray-800 hover:bg-black text-white p-2 rounded-md mt-5"
          >
            Go to SignUp &#10095;
          </button>
        </div>
        <FooterComp />
      </>
    );
  }
  if(loading){
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <img className="md:h-[25rem]" src={loader} alt="loader" />
        </div>
        <FooterComp />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row mx-auto justify-center max-w-[95vw] pb-24">
        <div className="lg:w-[70%]">
          {/*This is shopping list*/}
          <div className={`w-full flex my-4 space-y-2 ${cartItems.length==0?'justify-center':'justify-between'} items-center max-w-[80vw] md:max-w-[60vw] pb-2 mx-auto`}>
            <span className="text-2xl font-medium font-sans md:text-4xl">
              Your Shopping Cart ({cartItems.length})
            </span>
            <div onClick={onClearCart} className={`${cartItems.length==0?'hidden':'flex'} items-center flex-col cursor-pointer mx-2`} title="Clear Cart">
            <TiDeleteOutline className="text-4xl" />
            </div>
          </div>
          {cartItems.length === 0 && (
            <div className="flex flex-col justify-center items-center h-[80vh] mx-auto">
              <img
                className="h-[25vh] md:h-[40vh]"
                src={emptyCart}
                alt="server down"
              />
              <span className="text-neutral-500 text-[18px] text-center px-5">
                Your cart is empty.
              </span>
              <button
                onClick={() => navigate("/products/Men-Suits")}
                className="bg-gray-800 hover:bg-black text-white p-2 rounded-md mt-5"
              >
                Go to Products &#10095;
              </button>
            </div>
          )}
          <div className="flex flex-col justify-center items-center space-y-5  max-w-[95vw]">
          {cartItems.map((item) => (
              <CartProductComp
                key={item.id}
                id={item.id}
                title={item.product.title}
                category={item.product.category}
                productId={item.product.id}
                price={item.product.newPrice}
                color={item.product.color}
                imageSrc={item.product.images[0]}
                initialQuantity={item.quantity}
                initialSelectedSize={item.size}
                sizes={item.product.sizes}
                fetchProducts={fetchProducts}
              />
            ))}
          </div>
        </div>
       {cartItems.length!==0 && <div className="">
          {/*This is Payable amount*/}
          <div className="flex flex-col justify-center pt-5">
            <span className="font-semibold text-center text-2xl">
              Cart Summary
            </span>
           
           <CartSummary cartItemsLength={cartItems.length} toCheckout={toCheckout} totalAmount={totalPrice} fetchProducts={fetchProducts}/>
         
          </div>
        </div>}
      </div>
      <FooterComp />
    </>
  );
}

export default Cart;
