import { Link } from "react-router-dom";
import FooterComp from "../Components/FooterComp";
import Navbar from "../Components/NavComponents/Navbar";
import { SiTicktick } from "react-icons/si";
// import OrderSummary from "../Components/OrderSummary";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import gifLoader from "../assets/loader.gif";
function Success() {
  const [loader, setLoader] = useState<boolean>(true);

  const isMounted = useRef(false);
  const orderRouter = async () => {
    try {
      setLoader(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/orders/add",
        {
          body: "",
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      orderRouter();
      isMounted.current = true;
    }
  }, []);
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
