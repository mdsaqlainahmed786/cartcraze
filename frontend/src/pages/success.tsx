import { Link } from "react-router-dom";
import FooterComp from "../Components/FooterComp";
import Navbar from "../Components/NavComponents/Navbar";
import { SiTicktick } from "react-icons/si";
import { useEffect, useState } from "react";
import axios from "axios";
import gifLoader from "../assets/loader.gif";
function Success() {
  const [loader, setLoader] = useState<boolean>(true);
  const [isPaymentSession, setIsPaymentSession]=useState(false);

  const userDetails = async () => {
    try {
      
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.userPaymentSession);
      if(!response.data.userPaymentSession) {
       console.log("No payment session found")
       setIsPaymentSession(false)
       window.location.href = "/";
       return;
      }
      setIsPaymentSession(true)
    } catch (error: unknown) {
      //@ts-expect-error err
      if (error?.response.status === 400) {
        window.location.href = "/";
        console.log(error)
      }
      console.error(error);
    } 
  }
  const orderRouter = async () => {
    try {
     
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/add`,
        {
          body: "",
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      
    } catch (error:unknown) {
       //@ts-expect-error err
      if(error?.response.status === 400){
       window.location.href = "/";
      }
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
      userDetails()
  }, []);

  useEffect(()=>{
    if(isPaymentSession){
      orderRouter()
    }
  },[isPaymentSession])


  if (loader) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <img src={gifLoader} alt="loader" />
        </div>
        <FooterComp />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-11 mx-auto pb-24">
        <span className="text-xl font-semibold md:text-3xl">
          Congratulations! Your Order was placed 🎉🎉
        </span>
        <div className="flex flex-col space-y-5 h-[80vh] items-center justify-center space-x-2">
          <SiTicktick className="text-8xl" />
          <span className="text-lg md:text-lg text-center font-medium">
            Your Payment was successful! Thank you for shopping with us.
          </span>
          <Link to="/orders">
            <span className="hover:underline cursor-pointer">
              Go to Orders Page ⟩
            </span>
          </Link>
        </div>
      </div>
      <FooterComp />
    </>
  );
}

export default Success;