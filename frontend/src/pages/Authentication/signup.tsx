import { useEffect, useState } from "react";
import FooterComp from "../../Components/FooterComp";
import titlePng from "../../assets/Title.png";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../Components/NavComponents/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import NotRobot from "../../Components/NotRobot";

function Signup() {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmingPassword, setConfirmingPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCaptchaChange = () => {
    setCaptchaVerified(true);
  };

  useEffect(() => {
    const token = Cookies.get("Secret_Auth_token");
    if (token) {
      setIsAlreadyLoggedIn(token);
    }
    if(isAlreadyLoggedIn){
      navigate("/")
    }
    if(isAlreadyLoggedIn === null){
      return;
    }
  }, [isAlreadyLoggedIn, navigate]);

  const onSubmitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmingPassword !== userDetails.password) {
      return toast.error("Passwords do not match!", {
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
    if (!captchaVerified) {
      return toast.error("Please verify the captcha", {
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

    setLoading(true);
    try {
      // const captchaSuccess = await verifyCaptcha();
      // if (!captchaSuccess) {
      //   throw new Error("Captcha verification failed");
      // }

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        userDetails
      );

      if (response) {
        toast.success(response.data.message, {
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
      //@ts-expect-error catch err
      console.error(error.response?.data || error.message);
      toast.error("Something Went Wrong", {
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
    } finally {
      setLoading(false);
    }
    console.log(userDetails);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <Navbar />
      <div className="lg:flex lg:h-[42rem] lg:m-5 flex-row-reverse lg:shadow-xl lg:rounded-lg">
        <form onSubmit={onSubmitSignup}>
          <div className="flex my-11 justify-center items-center lg:justify-end lg:my-0 lg:-mt-14">
            <div className="flex flex-col space-y-7 w-full py-10 justify-center items-center bg-white lg:w-[80vw] lg:max-w-[50vw] lg:h-screen">
              <img className="h-20 w-40" src={titlePng} alt="title" />
              <div className="flex text-center px-2 text-md text-neutral-600 font-semibold lg:text-lg">
                SignUp with email and password to get a 25% OFF Coupon
              </div>
              <input
                type="text"
                className="border-2 w-[14rem] md:w-72 p-1 focus-none outline-none rounded-md lg:w-72"
                placeholder="Username"
                onChange={(e) =>
                  setUserDetails((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }))
                }
                required
              />
              <input
                type="email"
                className="border-2 w-[14rem] md:w-72 p-1 focus-none outline-none rounded-md lg:w-72"
                placeholder="Email"
                onChange={(e) =>
                  setUserDetails((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                required
              />
              <div className="relative mx-2 w-[14rem] md:w-72 lg:w-72">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="border-2 w-full p-1 focus-none outline-none rounded-md pr-10"
                  placeholder="Set Password"
                  required
                  onChange={(e) =>
                    setUserDetails((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <div className="relative w-[14rem] md:w-72 lg:w-72">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="border-2 w-full p-1 focus-none outline-none rounded-md pr-10"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmingPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <NotRobot handleCaptchaChange={handleCaptchaChange} />
              <button
                className={`w-[14rem] md:w-72 lg:w-72 mx-2 bg-gray-800 text-white p-1.5 flex justify-center items-center rounded-md hover:bg-black ${
                  loading
                    ? "opacity-80 cursor-not-allowed hover:bg-gray-800"
                    : ""
                }`}
              >
                {loading && (
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
                <span className="mx-3">SignUp</span>
              </button>
              <div className="text-gray-500 text-lg font-medium">
                Already have an account?
                <Link to="/signin">
                  {" "}
                  <span className="hover:underline">Login</span>
                </Link>
              </div>
            </div>
          </div>
        </form>
        <div className="w-[50%] hidden lg:flex">
          <img
            className="h-full w-[50vw]"
            src="https://images.unsplash.com/photo-1593032534613-085f25474cae?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="this is img"
          />
        </div>
      </div>
      <div className="absolute w-full">
        <FooterComp />
      </div>
    </>
  );
}

export default Signup;
