import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import TitlePng from "../../assets/Title.png";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmingPassword, setConfirmingPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sessionOver, setSessionOver] = useState(false)
  const navigate = useNavigate();
  const { Token } = useParams();

  const onSubmitNewPasswords = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newPassword !== confirmingPassword) {
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
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/reset_password/${Token}`,
        { password: newPassword },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Password updated successfully!", {
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
        navigate('/signin');
      }
    } catch (error) {
      console.log(error);
      
      const axiosError = error as AxiosError;
      //@ts-expect-error axios err
      if (axiosError.response && axiosError.response.data.message === "Session expired, please try again later") {
        setErrorMessage("Your session has expired. Please request a new password reset.");
        setSessionOver(true)
      } else {
        toast.error("Something went wrong!", {
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
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="shadow-2xl border-2 rounded-lg w-full max-w-[80vw] mx-auto flex flex-col justify-center items-center md:max-w-[40vw]">
          <div className="mt-5 border-b-2 pb-5 w-full flex justify-center items-center">
            <img className="w-44" src={TitlePng} alt="title" />
          </div>
          <hr />
          <div className="py-10 text-2xl space-y-2 flex flex-col justify-center items-center">
            <span className="font-semibold text-neutral-900 text-center">
              Reset your password
            </span>
            <span className="text-neutral-500 text-sm px-6 text-center">
              Make sure you've entered a minimum of 8 characters
            </span>
          </div>
          {errorMessage && (
            <>
            <div className="text-red-500 text-center mb-4">
              <span>{errorMessage} to go to signIn page <Link className="font-semibold hover:underline" to='/signin'>click here</Link></span>
            </div>
            </>
          )}
          <div className="flex flex-col justify-start items-start">
            <span className="font-semibold p-1">Set password:</span>
            <div className="relative w-[14rem] md:w-72 lg:w-72">
              <input
                type={passwordVisible ? "text" : "password"}
                className="border-2 w-full p-1 focus-none outline-none rounded-md pr-10"
                placeholder="Set Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
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
            <span className="font-semibold p-1 mt-14">Confirm password:</span>
            <div className="relative mb-14 w-[14rem] md:w-72 lg:w-72">
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
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={onSubmitNewPasswords}
              disabled={sessionOver}
              className={"bg-gray-800 text-white px-14 py-0.5 my-10 rounded-md text-lg cursor-pointer hover:bg-black disabled:opacity-90 disabled:hover:bg-gray-800 disabled:cursor-not-allowed"}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
