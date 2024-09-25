import { Link } from "react-router-dom";
import FooterComp from "../Components/FooterComp";
import Navbar from "../Components/NavComponents/Navbar";
import { SiTicktick } from "react-icons/si";
import { useEffect, useState } from "react";
import axios from "axios";
import Confetti from 'react-confetti'
import gifLoader from "../assets/loader.gif";
function Success() {
  const [loader, setLoader] = useState<boolean>(true);
  const [isPaymentSession, setIsPaymentSession] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const userDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.userPaymentSession);
      if (!response.data.userPaymentSession) {
        console.log("No payment session found");
        setIsPaymentSession(false);
         window.location.href = "/";
        return;
      }
      setIsPaymentSession(true);
    } catch (error: unknown) {
      //@ts-expect-error err
      if (error?.response.status === 400) {
        window.location.href = "/";
        console.log(error);
      }
      console.error(error);
    }
  };

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
    } catch (error: unknown) {
      //@ts-expect-error err
      if (error?.response.status === 400) {
       window.location.href = "/";
      }
      console.error(error);
    } finally {
      setLoader(false);
    }
  };
 useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize); 
    return () => window.removeEventListener("resize", handleResize); 
  }, []);
  useEffect(() => {
    userDetails();
  }, []);

  useEffect(() => {
    if (isPaymentSession) {
      orderRouter();
    }
  }, [isPaymentSession]);

  if (loader) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col justify-center items-center h-[80vh]">
          <img src={gifLoader} alt="loader" />
          <div>
            <span className="text-lg text-neutral-500">
            Please wait. This might take a minute
            </span>
          </div>
        </div>
        <FooterComp />
      </>
    );
  }
  return (
    <>
      <Confetti width={windowSize.width} height={windowSize.height}  style={{ position: "fixed", top: 0, left: 0 }} numberOfPieces={100} />
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-11 mx-auto pb-24 max-w-[80vw] md:max-w-[50vw]">
        <div className="flex flex-col space-y-12 h-[80vh] items-center justify-center">
        <span className="text-3xl text-center font-semibold md:text-4xl">
          Your Order was placed 🎉🎉
        </span>
          <span className="text-xl text-center font-semibold md:text-3xl"></span> 
          <SiTicktick className="text-8xl" />
          <span className="text-lg md:text-lg text-center font-medium">
            Your Payment was successful! Thank you for shopping with us. You can check your order receipt in your received email inbox.
          </span>
          <Link to="/orders">
            <span className="text-center hover:underline cursor-pointer">
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
