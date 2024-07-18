import FooterComp from "../Components/FooterComp";
import Navbar from "../Components/NavComponents/Navbar";
import cancelPayment from "../assets/cancel.png";
import { useNavigate } from "react-router-dom";
function Cancel() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-[80vh] mx-auto">
        <div>
          <img
            src={cancelPayment}
            alt="cancel payment"
            className="h-[25vh] md:h-[40vh]"
          />
        </div>
        <span className="text-neutral-500 text-[18px] text-center px-5">
          Your payment was canceled! or something went wrong, But do not worry
          your money was not detected
        </span>
        <button
            onClick={() => navigate("/")}
            className="bg-gray-800 hover:bg-black text-white p-2 rounded-md mt-5"
          >
            Go to Home &#10095;
          </button>
      </div>
      <FooterComp />
    </>
  );
}

export default Cancel;
