import { useEffect, useState } from "react";
import Navbar from "../Components/NavComponents/Navbar";
import FooterComp from "../Components/FooterComp";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { emailState, usernameState } from "../RecoilStateProviders/UserDetails";
import ReviewAndPay from "../Components/ReviewAndPay";
function Checkout() {
  const navigate = useNavigate();
  const userName = useRecoilState(usernameState);
  const userEmail = useRecoilState(emailState)
  const [cartItems, setCartItems] = useState([]);
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [enableProceedToPay, setEnableProceedToPay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: "",
    phoneNumber: "",
    pinCode: "",
    state: "",
    district: "",
  });
  const onDetailsHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disableSaveBtn) return;
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/delivery`,
        {
          address: deliveryDetails.address,
          District: deliveryDetails.district,
          state: deliveryDetails.state,
          pincode: Number(deliveryDetails.pinCode),
          phoneNumber: deliveryDetails.phoneNumber,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setEnableProceedToPay(true);
        toast.success("Delivery info saved!", {
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
      const getUserDetails = async () => {
        try{
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`, {
            withCredentials: true
          });
          if(response.data.userName && response.data.userEmail){
            setIsAuthenticated(true);
          }
          console.log(response.data);
          setDeliveryDetails({
            address: response.data.userAddress,
            phoneNumber: response.data.userPhoneNumber,
            pinCode: response.data.userPincode,
            state: response.data.userState,
            district: response.data.userDistrict
          });
        } catch (error) {
          console.error(error);
        }
    }
    getUserDetails();
    
  
}, []);
useEffect(() => {
  if (!isAuthenticated) {
    navigate("/");
  }
}, [isAuthenticated, navigate]);
  useEffect(() => {
    
    if (
      deliveryDetails.address !== "" &&
      deliveryDetails.phoneNumber !== "" &&
      deliveryDetails.pinCode !== ""
    ) {
      setDisableSaveBtn(false);
    } else {
      setDisableSaveBtn(true);
    }
  }, [deliveryDetails]);
  const onProceedToPay = async () => {
    const stripe = await loadStripe(
      "pk_test_51PdkvCAvBpizqBWZvkfGWGU8GQykOVPc8vSfC4ijadcQMKJ0J6fyx3Gukxs3IOwuJmRZU7Rxe13GCH9OLmudtySw006oADq8fm"
    );
    const body = { products: cartItems };
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/create-checkout-session`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const session = await response.data;
    const result = stripe?.redirectToCheckout({
      sessionId: session.sessionId,
    });
    console.log(result);

  };
  useEffect(() => {
    // const token = Cookies.get("Secret_Auth_token");
    // if (!token) {
    //   navigate("/");
    // }
    fetchProducts();
  }, []);
  const taxRate = 0.05;
  const taxAmount = totalPrice * taxRate;
  const payableAmount = totalPrice + taxAmount;
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/getcart`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.cartItems.size);
      //  console.log(response.data.totalAmount)
      const total = response.data.totalAmount;
      console.log(total, "total");
      setTotalPrice(total);
      // console.log(response.data.cartItems, "cartItems")

      const cart = response.data.cartItems;
      setCartItems(cart);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="pb-24">
        <span className="text-center flex justify-center my-3 text-3xl font-medium font-sans mt-5 md:text-4xl">
          Checkout
        </span>

        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center bg-gray-800 mx-5 text-white rounded-full p-2 px-5 my-5 md:max-w-[45vw] text-[13px] lg:text-lg">
          We're almost there! Ready to make it yours?
          </div>
        </div>

        <div className="mx-8 space-y-4 flex flex-col">
          <span className="text-xl flex font-semibold">
            1. Delivery Details
          </span>
          <form onSubmit={onDetailsHandler}>
            <div className="flex max-w-[85vw] mx-auto space-x-4 lg:w-full">
              <div className="flex flex-col w-full space-y-4">
                <div className="flex flex-row space-x-2">
                  <div className="w-full">
                    <label className="text-sm text-neutral-700">Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2 read-only:bg-gray-100"
                      value={userName[0]}
                      readOnly
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-neutral-700">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your Email"
                      className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2 read-only:bg-gray-100"
                      value={userEmail[0]}
                      readOnly
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Address</label>
                  <textarea
                    placeholder="Enter your Address"
                    value={deliveryDetails.address}
                    className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2"
                    onChange={(e) => {
                      setDeliveryDetails({
                        ...deliveryDetails,
                        address: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                <div className="flex flex-row space-x-2">
                  <div className="w-full">
                    <label className="text-sm text-neutral-700">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={deliveryDetails.phoneNumber}
                      pattern="[0-9]{10}"
                      placeholder="Phone number"
                      className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2"
                      onChange={(e) => {
                        setDeliveryDetails({
                          ...deliveryDetails,
                          phoneNumber: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-neutral-700">PinCode</label>
                    <input
                      type="text"
                      pattern="[0-9]{6}"
                      placeholder="Enter PinCode"
                      value={deliveryDetails.pinCode}
                      className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2"
                      onChange={(e) => {
                        setDeliveryDetails({
                          ...deliveryDetails,
                          pinCode: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div className="w-full">
                    <label className="text-sm text-neutral-700">State</label>
                    <input
                      type="text"
                      value={deliveryDetails.state}
                      onChange={(e)=>{
                         setDeliveryDetails({
                          ...deliveryDetails,
                          state: e.target.value,
                        }); 
                      }}
                      required
                      placeholder="State"
                      className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2 read-only:bg-gray-100"
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-neutral-700">District</label>
                    <input
                      type="text"
                      placeholder="District"
                      value={deliveryDetails.district}
                      onChange={(e)=>{
                         setDeliveryDetails({
                          ...deliveryDetails,
                          district: e.target.value,
                        }); 
                      }}
                      required
                    
                      className="w-full border-2 p-1 focus-none outline-none rounded-md pr-10 md:py-2 read-only:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center py-10">
              <button
                disabled={disableSaveBtn || loading
                }
                className={`bg-gray-800 text-white p-0.5 px-4 w-28 flex justify-center items-center rounded-lg hover:bg-black disabled:opacity-70 disabled:cursor-not-allowed ${ loading
                  ? "opacity-80 cursor-not-allowed hover:bg-gray-800"
                  : ""}`}
              >{loading && (
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
              <span className="mx-3">Save</span>
              </button>
            </div>
          </form>
        </div>
        <div className="mx-8">
          <span className="text-xl font-semibold">2.Review & pay</span>
        </div>
      <ReviewAndPay
      onProceedToPay={onProceedToPay}
      totalPrice={totalPrice}
      priceAfterDiscount={priceAfterDiscount}
      setPriceAfterDiscount={setPriceAfterDiscount} 
      taxAmount={taxAmount}
      payableAmount={payableAmount}
      enableProceedToPay={enableProceedToPay}
      />
      </div>
      <FooterComp />
    </>
  );
}

export default Checkout;
