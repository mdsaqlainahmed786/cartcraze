import { useState } from "react";
import FooterComp from "../../Components/FooterComp";
import titlePng from "../../assets/Title.png";
import {Link} from "react-router-dom"
import Navbar from "../../Components/NavComponents/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Signin() {
  const [userObj, setUserobj] = useState({
    email:"",
    password:""
  })
  const [passwordVisible, setPasswordVisible] = useState(false);
const onSubmitSignin = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    console.log(userObj)
}
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
          <Navbar />
      <div className="lg:flex lg:h-[42rem] lg:m-5 flex-row-reverse lg:shadow-xl lg:rounded-lg">
        <form onSubmit={onSubmitSignin}>
          <div className="flex my-11 justify-center items-center lg:justify-end lg:my-0">
            <div className="flex flex-col space-y-7 w-full py-10 justify-center items-center bg-white lg:w-[80vw] lg:max-w-[50vw] lg:h-screen">
              <img className="h-20 w-40" src={titlePng} alt="title" />
              <div className="flex text-center px-2 text-md text-neutral-600 font-semibold lg:text-lg">
                SignIn with your Registered Account
              </div>
              <input
                type="email"
                className="border-2 w-[14rem] md:w-72 p-1 focus-none outline-none rounded-md lg:w-72"
                placeholder="Email"
                required
                onChange={(e)=>setUserobj((prevState)=>({
                  ...prevState,
                  email:e.target.value
                }))}
              />
              <div className="relative mx-2 w-[14rem] md:w-72 lg:w-72">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="border-2 w-full p-1 focus-none outline-none rounded-md pr-10"
                  placeholder="Password"
                  required
                  onChange={(e)=>setUserobj((prevState)=>({
                    ...prevState,
                    password:e.target.value
                  }))}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/3 transform -translate-y-1/2 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
                  <span className="mt-1 flex text-[13px] hover:underline cursor-pointer text-neutral-600 justify-end">Forgot Password?</span>
              </div>
              <button className="w-[14rem] md:w-72 lg:w-72 mx-2 bg-gray-800 text-white p-1 flex justify-center rounded-md hover:bg-black">
                SignIn
              </button>
              <div className="text-gray-500 text-lg font-medium">Don't have an account?<Link to='/signup'> <span className="hover:underline">SignUp</span></Link></div>
            </div>
          </div>
        </form>
        <div className="w-[50%] hidden lg:flex">
          <img
            className="h-full w-[50vw]"
            src="https://images.unsplash.com/photo-1582274528667-1e8a10ded835?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
            alt="this is img"
          />
        </div>
      </div>
      <div className="absolute w-full">
        <FooterComp />
      </div>
    </>
  )
}

export default Signin