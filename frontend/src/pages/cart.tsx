import CartProductComp from "../Components/CartProductComp";
import CartSummary from "../Components/CartSummary";
import FooterComp from "../Components/FooterComp";
import Navbar from "../Components/NavComponents/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import loginCart from "../assets/loginCart.png";
function Cart() {
  const [gotoLogin, setGotoLogin] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const toCheckout = () => {
    navigate("/checkout");
  }
  useEffect(() => {
    const token = Cookies.get("Secret_Auth_token");
    setGotoLogin(!token);
  }, []);

  if (gotoLogin === null) {
    return null; // Or a loading spinner or any placeholder
  }

  if (gotoLogin) {
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
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row mx-auto justify-center max-w-[95vw] pb-24">
        <div className="lg:w-[70%]">
          {/*This is shopping list*/}
          <div className="w-full flex flex-col my-4 space-y-2 justify-center items-center">
            <span className="text-3xl font-medium font-sans md:text-4xl">
              Your Shopping Cart (3)
            </span>
          </div>

          <div className="flex flex-col justify-center items-center space-y-5  max-w-[95vw]">
            <CartProductComp />
            <CartProductComp />
            <CartProductComp />
          </div>
        </div>
        <div>
          {/*This is Payable amount*/}
          <div className="flex flex-col justify-center pt-5">
            <span className="font-semibold text-center text-2xl">
              Cart Summary
            </span>
           <CartSummary toCheckout={toCheckout}/>
          </div>
        </div>
      </div>
      <FooterComp/>
    </>
  );
}

export default Cart;
