import { CartCountState } from "../RecoilStateProviders/CartCount";
import { useRecoilValue } from "recoil";

interface ReviewAndPayProps {
  totalPrice: number;
  taxAmount: number;
  payableAmount: number;
  enableProceedToPay: boolean;
  onProceedToPay: () => void;
  priceAfterDiscount: number;
  setPriceAfterDiscount:React.Dispatch<React.SetStateAction<number>>;
}

function ReviewAndPay({
  totalPrice,
  taxAmount,
  payableAmount,
  enableProceedToPay,
  onProceedToPay,
}: ReviewAndPayProps) {
  const cartCount = useRecoilValue(CartCountState);


  //console.log(newTotalPrice); 
  // const onDiscountApply = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/api/v1/cart/apply-coupon",
  //       {
  //         code: couponCode,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     console.log(response.data);
  //     setPriceAfterDiscount(response.data.totalAmount.toFixed(0));
  //     if (response.data.success) {
  //       const discountAmount = totalPrice * response.data.discountAmount;
  //       setDiscountAmount(discountAmount);

  //       setInvalidCoupon(false);
  //       setValidCoupon(true);
  //     } else {
  //       setInvalidCoupon(true);
  //       setValidCoupon(false);
  //       setDiscountAmount(0);
  //     }
  //   } catch (error) {
  //     setInvalidCoupon(true);
  //     setValidCoupon(false);
  //     setDiscountAmount(0);
  //   }
  // };

  return (
    <div className="max-w-[85vw] mx-auto w-full flex justify-center items-center md:max-w-[50vw]">
      <div className="w-full space-y-2 border-2 mt-5 p-4 rounded-md shadow-md">
        <div className="flex w-full justify-between text-sm">
          <span>Cart Total ({cartCount})</span>
          <span>₹{totalPrice.toFixed(0)}/-</span>
        </div>
        <div className="flex w-full justify-between text-sm">
          <span>Tax (5%)</span>
          <span>₹{taxAmount.toFixed(0)}/-</span>
        </div>
        <div className="flex w-full justify-between text-sm">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
        {/* <div className="flex space-x-1 pt-3 justify-center items-center">
          <button
            onClick={onDiscountApply}
            className="bg-gray-800 text-white p-0.5 px-4 rounded-sm hover:bg-black"
          >
            Apply
          </button>
          <input
            className="text-center border-2 focus-none outline-none"
            type="text"
            placeholder="Coupon Code"
            pattern="[A-Za-z0-9]{11}"
            onChange={(e) => setCouponCode(e.target.value)}
          />
        </div> */}
        {/* <div
          className={`${
            invalidCoupon ? "flex" : "hidden"
          } justify-center items-center`}
        >
          <span className="text-sm text-red-500">
            Invalid Coupon or it is already used!
          </span>
        </div>
        <div
          className={`${
            validCoupon ? "flex" : "hidden"
          } w-full justify-between text-sm text-green-600`}
        >
          <span>Coupon Discount</span>
          <span>-₹{discountAmount.toFixed(0)}/-</span>
        </div> */}
        <hr />
        <div className="flex justify-between w-full font-semibold text-lg">
          <div className="flex flex-col justify-center items-center -space-y-1.5">
            <span>Payable Amount</span>
            <span className="text-[13px] text-neutral-600">
              (Includes Taxes)
            </span>
          </div>
          <span>₹{payableAmount.toFixed(0)}/-</span>
        </div>
        <hr />
        <div className="flex bg-white pt-1 justify-center max-w-[90vw]">
          <div className="flex justify-between space-x-3 items-center md:space-x-16">
            <span className="font-semibold">
              Total Payment: ₹{payableAmount.toFixed(0)}/-
            </span>
            <button
              disabled={!enableProceedToPay || payableAmount === 0}
              onClick={onProceedToPay}
              className="bg-gray-800 text-[13px] px-2 w-36 text-white py-2 rounded-full hover:bg-black md:text-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewAndPay;
