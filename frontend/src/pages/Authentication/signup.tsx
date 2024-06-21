import { useState } from "react";
import FooterComp from "../../Components/FooterComp";
import titlePng from "../../assets/Title.png";
import { Link } from "react-router-dom";
import Navbar from "../../Components/NavComponents/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import  { ToastContainer, toast, Bounce} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
function Signup() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmingPassword, setConfirmingPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const onSubmitSignup = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmingPassword !== userDetails.password)
      return toast.error("Passwords Don't Match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        })

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
          <div className="flex my-11 justify-center items-center lg:justify-end lg:my-0">
            <div className="flex flex-col space-y-7 w-full py-10 justify-center items-center bg-white lg:w-[80vw] lg:max-w-[50vw] lg:h-screen">
              <ToastContainer/>
              <img className="h-20 w-40" src={titlePng} alt="title" />
              <div className="flex text-center px-2 text-md text-neutral-600 font-semibold lg:text-lg">
                Signup with email and password to get a 25% OFF Coupon
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
              <button className="w-[14rem] md:w-72 lg:w-72 mx-2 bg-gray-800 text-white p-1 flex justify-center rounded-md hover:bg-black">
                SignUp
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
