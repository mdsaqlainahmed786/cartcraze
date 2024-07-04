import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import failed from "../../assets/verifyfail.png";
import TitlePng from '../../assets/Title.png';
import toast from "react-hot-toast";
import success from "../../assets/verifysuccess.png";

function Verify() {
  const [verified, setVerified] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const { Token } = useParams();
  const toastShown = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/verify/${Token}`,
          { withCredentials: true }
        );
        console.log(response);
        if (response.status === 200) {
          setVerified(true);
          setTimeout(() => {
            if (!toastShown.current) {
              toast.success("SignUp Successful!", {
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
              toastShown.current = true;
            }
          }, 5000);
        } else {
          setVerified(false);
          setErrorOccurred(true);
          console.error("Verification failed:", response.data.message);
        }
      } catch (error) {
        setVerified(false);
        setErrorOccurred(true);
        console.error("Error verifying email:", error);
      }
    };

    verifyEmail();
  }, [Token, navigate]);

  useEffect(() => {
    if (verified && !errorOccurred) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(interval);
            navigate("/");
          }
          return prevCountdown - 1;
        });
      }, 1000);
       console.log(countdown)
      return () => clearInterval(interval);
    }
  }, [verified, errorOccurred, navigate, countdown]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="shadow-2xl border-2 rounded-lg w-full max-w-[80vw] mx-auto h-[80vh] flex flex-col justify-center items-center md:max-w-[40vw]">
        <div className="mt-5 border-b-2 pb-5 w-full flex justify-center items-center">
          <img className="w-44" src={TitlePng} alt="title" />
        </div>
        <hr />

        {!verified && errorOccurred && (
          <div className="h-screen flex justify-center items-center flex-col">
            <span className="text-5xl pb-5 font-semibold text-neutral-700">Oops!..</span>
            <img className="h-60 w-60" src={failed} alt="failed" />
            <div className="flex justify-center items-center text-center mx-5 text-neutral-600 text-lg">
              <span>
                There was something wrong in link or the link is expired, try
                login here:{" "}
                <Link className="hover:underline font-bold" to="/signup">
                  SignUp
                </Link>
              </span>
            </div>
          </div>
        )}
        {verified && !errorOccurred && (
          <div className="flex justify-center h-screen items-center flex-col mx-auto">
            <span className="text-5xl pb-5 font-semibold text-neutral-700">Successfully Verified!</span>
            <img className="w-60" src={success} alt="success" />
            <div className="flex flex-col justify-center items-center text-center mx-5 text-neutral-600 text-lg">
              <span>Yay! your account was successfully verified 🎉🎉</span>
              <span>You are redirecting in {countdown} seconds</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Verify;
