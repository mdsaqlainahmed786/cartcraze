import { FaDownload } from "react-icons/fa6";
import FooterComp from "../Components/FooterComp";
import Navbar from "../Components/NavComponents/Navbar";
import successPayment from "../assets/success.png";

function Success() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-11 mx-auto pb-24">
        <span className="text-3xl font-medium pb-10">Payment Successful!</span>
        <div>
          <img
            src={successPayment}
            alt="cancel payment"
            className="h-[25vh] md:h-[40vh]"
          />
        </div>
        <span className="text-neutral-500 text-[18px] text-center px-10">
          Your Payment was successful! Thank you for shopping with us.
        </span>
        {/* <button
            onClick={() => navigate("/")}
            className="bg-gray-800 hover:bg-black text-white p-2 rounded-md mt-5"
          >
            Go to Home &#10095;
          </button> */}
        <div className="flex justify-between space-x-10 mx-auto items-center mt-12">
          <span className="text-3xl font-medium">Order Summary</span>
          <FaDownload
            className="text-2xl cursor-pointer"
            title="Print receipt"
          />
        </div>
        <div className="w-full max-w-lg mx-auto">
          <div className="rounded-lg shadow-lg p-12 text-xs mt-8 mx-4 sm:mx-0 bg-white">
            <div>
              <div className="flex flex-col">
                <h1 className="text-gray-800 text-xl font-medium mb-2">
                  Receipt
                </h1>
                <p className="text-gray-600 text-xs">Date: 18.07.24</p>
                <p className="text-gray-600 text-xs">
                  Order Number: 0000000001
                </p>
              </div>
              <hr className="my-4" />
              <div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[12px]">
                    MEN GREEN SOLID SLIM FIT PARTY FOUR PIECE SUIT
                  </span>
                  <span className="text-base font-medium">₹13109</span>
                </div>
                <div className="mb-4 flex justify-between items-center">
                  <span>*Quantity:</span>
                  <span className="">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[12px]">
                    MEN GREEN SOLID SLIM FIT PARTY FOUR PIECE SUIT
                  </span>
                  <span className="text-base font-medium">₹13109</span>
                </div>
                <div className="mb-4 flex justify-between items-center">
                  <span>*Quantity:</span>
                  <span className="">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[12px]">
                    MEN GREEN SOLID SLIM FIT PARTY FOUR PIECE SUIT
                  </span>
                  <span className="text-base font-medium">₹13109</span>
                </div>
                <div className="mb-4 flex justify-between items-center">
                  <span>*Quantity:</span>
                  <span className="">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[12px]">
                    MEN GREEN SOLID SLIM FIT PARTY FOUR PIECE SUIT
                  </span>
                  <span className="text-base font-medium">₹13109</span>
                </div>
                <div className="mb-4 flex justify-between items-center">
                  <span>*Quantity:</span>
                  <span className="">7</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center">
                  <span>Shipping Costs:</span>
                  <span className="">FREE</span>
                </div>
                <div className="mb-2 flex justify-between items-center">
                  <span>Taxes & Fees</span>
                  <span className="">₹6900</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-medium">₹29109</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </>
  );
}

export default Success;
