import TitlePng from "../../assets/Title.png";
import reset from "../../assets/reset.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  //@ts-expect-error form event
  const onSubmitHandler = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/forgot_password`,
        { email },
        { withCredentials: true }
      );
      if (response.status===200) {
        toast.success("Email sent for verification", {
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
       
   } catch (err) {
    //@ts-expect-error axios err
        if (err.response && err.response.status === 404) {
          toast.error("No user found with that email!", {
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
          //@ts-expect-error err
          console.log(err.response.data.message);
          
        } 
        //@ts-expect-error err
        else if(err.response && err.response.status === 429){
          toast.error("Too many requests. Please try again later", {
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
        else {
          toast.error("An error occurred. Please try again.", {
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
          console.log(err);
        }
      } finally {
        setLoading(false)
      }
  };
  // useEffect(() => {
  //   const token = Cookies.get("Secret_Auth_token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [navigate]);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`, {
          withCredentials: true,
        });
        if (res.data.userName && res.data.userEmail) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [setIsAuthenticated]);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="shadow-2xl border-2 rounded-lg w-full max-w-[80vw] mx-auto flex flex-col justify-center items-center md:max-w-[45vw]">
          <div className="border-b-2 p-5 w-full flex justify-center items-center">
            <img className="w-36" src={TitlePng} alt="title" />
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="flex flex-col justify-center">
              <img className="h-32" src={reset} alt="forgot_password" />
              <span className="text-2xl font-semibold">
                Trouble Logging in?
              </span>
            </div>

            <div className="mx-11 py-4 flex text-center justify-center lg:mx-28">
              <span className="text-neutral-600 text-sm">
                Enter your email and we'll send you a verification link to reset
                your password of your account.
              </span>
            </div>
           
            <form onSubmit={onSubmitHandler}>
              <div className="flex flex-col justify-start items-start space-y-5 pb-10">
                <input
                  type="text"
                  className="border-2 w-[14rem] md:w-72 p-1 focus-none outline-none rounded-md lg:w-72"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className={`w-[14rem] md:w-72 lg:w-72 flex justify-center items-center bg-gray-800 text-white p-1.5 rounded-md hover:bg-black  ${loading?'opacity-80 cursor-not-allowed hover:bg-gray-800':''}`}>
                {loading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
                  <span className="mx-3">Send Verification link</span>
                </button>
              </div>
            </form>
            <span className="mt-10 mb-2 text-sm text-neutral-400 text-center px-5">
              Receiving verification emails might take longer so, please check
              your mail often
            </span>
            <div className="py-3 border-t-2 w-full text-center">
              <Link to="/signin">
                <span className="text-neutral-600 font-semibold cursor-pointer hover:text-black">
                  Return to login
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
