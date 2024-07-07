import { useEffect } from "react";
import Navbar from "../Components/NavComponents/Navbar";
import FooterComp from "../Components/FooterComp";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("Secret_Auth_token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="pb-24">
        <span className="text-center flex justify-center my-3 text-3xl font-medium font-sans mt-5 md:text-4xl">
          Checkout
        </span>

        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center bg-gray-800 mx-5 text-white rounded-full p-2 px-5 my-5 md:max-w-[40vw] text-[10px] lg:text-lg">
            Get Flat 10% off on any orders, Use coupon CARTCRAZE10
          </div>
        </div>

        <div className="mx-8 space-y-4 flex flex-col">
          <span className="text-xl flex font-semibold">
            1. Delivery Details
          </span>
          <div className="flex max-w-[85vw] mx-auto space-x-4 lg:w-full">
            <div className="flex flex-col w-full space-y-4">
              <div className="flex flex-row space-x-2">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Email</label>
                  <input
                    type="text"
                    placeholder="Enter your Email"
                    className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2"
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="text-sm text-neutral-700">Address</label>
                <textarea
                  placeholder="Enter your Address"
                  className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2"
                />
              </div>
              <div className="flex flex-row space-x-2">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">PinCode</label>
                  <input
                    type="text"
                    placeholder="Enter PinCode"
                    className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2"
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-2">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">State</label>
                  <input
                    type="text"
                    placeholder=""
                    value={"Telangana"}
                    readOnly
                    className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">District</label>
                  <input
                    type="text"
                    placeholder=""
                    value={"Hyderabad"}
                    readOnly
                    className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex max-w-[85vw] space-x-4 lg:w-full md:mx-auto">
            <div className="w-full">
            </div>
          </div> */}
          {/* <div className="flex max-w-[85vw] justify-between mx-auto space-x-4 pt-5 lg:w-full">
           
          </div> */}
          {/* <div className="flex max-w-[85vw] justify-between mx-auto space-x-4 pt-5 lg:w-full"></div> */}
        </div>
        <div className="mx-8 my-5">
          <span className="text-xl pb-5 flex font-semibold">
            2. Review Cart & Payment
          </span>
          <div className="mx-auto flex flex-col justify-center items-center bg-gray-100 rounded-md md:justify-start md:items-start md:max-w-[70vw]">
            <div className="flex justify-center w-full">
              <img
                src="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
                alt="product"
                className="h-36 my-5 ml-5 rounded-md md:h-48"
              />
              <div className="flex flex-col mt-5 px-3 w-full md:space-y-3">
                <span className="text-md font-semibold md:text-xl ">
                  Men Black Solid Ultra Slim Fit Formal Four Piece Suit
                </span>
                <span className="text-sm text-neutral-600">Mens suit</span>
                <div className="flex flex-col md:flex-row md:justify-between w-[100%] pr-5">
                  <span className="font-semibold md:text-xl">₹12999/-</span>
                  <span className="text-md md:font-semibold md:text-xl">
                    Qty: 10
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <img
                src="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
                alt="product"
                className="h-36 my-5 ml-5 rounded-md md:h-48"
              />
              <div className="flex flex-col mt-5 px-3 w-full md:space-y-3">
                <span className="text-md font-semibold md:text-xl ">
                  Men Black Solid Ultra Slim Fit Formal Four Piece Suit
                </span>
                <span className="text-sm text-neutral-600">Mens suit</span>
                <div className="flex flex-col md:flex-row md:justify-between w-[100%] pr-5">
                  <span className="font-semibold md:text-xl">₹12999/-</span>
                  <span className="text-md md:font-semibold md:text-xl">
                    Qty: 10
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <img
                src="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
                alt="product"
                className="h-36 my-5 ml-5 rounded-md md:h-48"
              />
              <div className="flex flex-col mt-5 px-3 w-full md:space-y-3">
                <span className="text-md font-semibold md:text-xl ">
                  Men Black Solid Ultra Slim Fit Formal Four Piece Suit
                </span>
                <span className="text-sm text-neutral-600">Mens suit</span>
                <div className="flex flex-col md:flex-row md:justify-between w-[100%] pr-5">
                  <span className="font-semibold md:text-xl">₹12999/-</span>
                  <span className="text-md md:font-semibold md:text-xl">
                    Qty: 10
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <img
                src="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
                alt="product"
                className="h-36 my-5 ml-5 rounded-md md:h-48"
              />
              <div className="flex flex-col mt-5 px-3 w-full md:space-y-3">
                <span className="text-md font-semibold md:text-xl ">
                  Men Black Solid Ultra Slim Fit Formal Four Piece Suit
                </span>
                <span className="text-sm text-neutral-600">Mens suit</span>
                <div className="flex flex-col md:flex-row md:justify-between w-[100%] pr-5">
                  <span className="font-semibold md:text-xl">₹12999/-</span>
                  <span className="text-md md:font-semibold md:text-xl">
                    Qty: 10
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full p-5 justify-center">
              <button onClick={()=>navigate('/cart')} className="bg-gray-800 text-white p-3 rounded-lg hover:bg-black">
                Go to Cart
              </button>
            </div>
          </div>
          <div className="max-w-[85vw] mx-auto w-full flex justify-center items-center md:max-w-[70vw]">
            <div className="w-full space-y-2 border-2 mt-5 p-4 rounded-md shadow-md">
              <div className="flex w-full justify-between text-sm">
                <span>Cart Total (3)</span>
                <span>₹12,999/-</span>
              </div>
              <div className="flex w-full justify-between text-sm">
                <span>Tax (5%)</span>
                <span>₹649.95/-</span>
              </div>
              <div className="flex w-full justify-between text-sm">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <hr />
              <div className="flex justify-between w-full font-semibold text-lg">
                <div className="flex flex-col justify-center items-center -space-y-1.5">
                  <span>Payable Amount</span>
                  <span className="text-[13px] text-neutral-600">
                    (Includes Taxes)
                  </span>
                </div>
                <span>₹13,648.5/-</span>
              </div>
              <hr />
              <div className="flex bg-white pt-1 justify-center max-w-[90vw]">
                <div className="flex justify-between space-x-3 items-center md:space-x-16">
                  <span className="font-semibold">
                    Total Payment: ₹13,648.5/-
                  </span>
                  <button className="bg-gray-800 text-[13px] px-2 w-36 text-white py-2 rounded-full hover:bg-black md:text-lg">
                   Proceed to Pay
                  </button>
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

export default Checkout;
