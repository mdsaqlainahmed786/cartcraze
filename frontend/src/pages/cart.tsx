import CartProductComp from "../Components/CartProductComp";
import CartSummary from "../Components/CartSummary";
import FooterComp from "../Components/FooterComp";
import Navbar from "../Components/NavComponents/Navbar";
import { useNavigate } from "react-router-dom";
function Cart() {
  const navigate = useNavigate();
  const toCheckout = () => {
    navigate("/checkout");
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
