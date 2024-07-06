import TitlePng from "../../assets/Title.png";
import HamburgerMenu from "../NavComponents/Hamburger";
import { useEffect, useState } from "react";
import { Input } from "../NavComponents/Input";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import NavItem from "../NavComponents/NavItem";
import { IoMdHeartEmpty } from "react-icons/io";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import Icons from "../NavComponents/Icons";
import { CiLogout } from "react-icons/ci";
import MobileNavcomp from "../NavComponents/MobileNavcomp";
import MobileNavIcons from "../NavComponents/MobileNavIcons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { wishlistState } from "../../RecoilStateProviders/WishListCount";
import { useRecoilValue } from "recoil";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import UserProfile from "./UserProfile";

import "../../index.css";
import {
  emailState,
  usernameState,
} from "../../RecoilStateProviders/UserDetails";
function Navbar() {
  const [isHamOpen, setIsHamOpen] = useState(false);
  // const [wishListCount, setWishListCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const userEmail = useRecoilValue(emailState);
  const userName = useRecoilValue(usernameState);
  const [token, setToken] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const wishlistCount = useRecoilValue(wishlistState);
  // const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");// Get the current path
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth <= 1023);
//console.log(isMdScreen)
  const cartCount = 0;
  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth <= 1023);
    };

    window.addEventListener("resize", handleResize);
    //console.log(userEmail)
    if (isMdScreen && isHamOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("no-scroll");
    };
  }, [isMdScreen, isHamOpen]);
  const onLogOut = async () => {
    await axios.get("http://localhost:3000/api/v1/user/logout", {
      withCredentials: true,
    });

    toast.success("Logout Successful", {
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
    navigate("/signup");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  };
  useEffect(() => {
    const token = Cookies.get("Secret_Auth_token")!;
    setToken(token);
  }, []);
  const isActive = (path: string) => location.pathname === path;
  return (
    <>
      <div className="w-full shadow-md space-y-3 py-2 sticky z-[52] top-0 bg-white">
        <div className="flex justify-between items-center m-auto max-w-[95vw] custom-md-lg:flex-col space-y-3 custom-lg:flex-row lg:max-w-[90vw]">
          <Link to="/">
            <div className="hover:cursor-pointer">
              <img
                className="h-12 lg:h-16 hover:opacity-70"
                src={TitlePng}
                alt="Title.png"
              />
            </div>
          </Link>
          <div className="custom-lg:flex hidden lg:flex flex-row">
            <Input />
          </div>
          <div className="hidden custom-md-lg:flex space-x-5 flex-row justify-center items-center custom-lg:space-x-10">
            <div className="hidden font-semibold text-gray-600 lg:text-lg lg:block">
              <NavItem
                link="menssuit"
                isActive={isActive("/menssuit")}
                navItem="Mens Suit"
              />
              <NavItem
                link="mensshirt"
                isActive={isActive("/mensshirt")}
                navItem="Mens Shirt"
              />
              <NavItem
                link="menstshirt"
                isActive={isActive("/menstshirt")}
                navItem="Mens Tshirt"
              />
              <NavItem
                link="womenstees&tops"
                isActive={isActive("/womenstees&tops")}
                navItem="Women Tops"
              />
              <NavItem
                link="womensshirt"
                isActive={isActive("/womensshirt")}
                navItem="Women Shirt"
              />
            </div>
            <div className="hidden lg:flex flex-row text-3xl w-36 justify-evenly">
              <div className="relative cursor-pointer">
                <div className={`${wishlistCount==0 ? 'hidden':'absolute'} -top-0 right-1 w-[19px] h-5 text-center bg-black text-sm text-white rounded-full`}>
                  {wishlistCount}
                </div>
                <Link to="/wishlist">
                  <div className="hover:bg-gray-200 rounded-full p-2">
                    <IoMdHeartEmpty />
                  </div>
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <div className={`${cartCount==0 ? 'hidden':'absolute'} top-0 right-1 w-[19px] h-5 text-center bg-black text-sm text-white rounded-full`}>
                  {cartCount}
                </div>
                <Link to="/cart">
                  <div className="hover:bg-gray-200 rounded-full p-2">
                    <IoCartOutline />
                  </div>
                </Link>
              </div>
              {!token ? (
                <Icons link="signup" reactIcons={<CgProfile />} />
              ) : (
                <>
                  <UserProfile
                    className={
                      "hidden -right-28 bg-white z-[999] h-40 w-[20rem] absolute pl-4 py-2 text-[19px] -ml-5 mt-1 shadow-xl rounded-lg group-hover:block"
                    }
                    username={userName}
                    email={userEmail}
                    onLogOut={onLogOut}
                  />
                </>
              )}
            </div>
          </div>
          <div onClick={() => setIsHamOpen(!isHamOpen)}>
            <HamburgerMenu />
          </div>
        </div>

        <div
          className={`flex lg:hidden justify-center items-center ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Input />
        </div>
      </div>
      {isHamOpen && isMdScreen && <div className="overlay lg:hidden"></div>}{" "}
      <div
        className={`fixed top-0 right-0 w-4/5 max-w-[20rem] h-full bg-white shadow-lg transition-transform duration-300 z-50 ${
          isHamOpen ? "transform translate-x-0" : "transform translate-x-full"
        } lg:hidden`}
      >
        <div className="mt-20 space-y-5">
          <div
            className={`flex flex-col justify-center items-center bg-gray-800 text-white`}
          >
            <div className="flex items-center">
              <div className="text-gray-800 bg-white flex justify-center text-[20px] min-w-9 h-9 rounded-full text-center pt-1 px-1 mt-1 mx-2">
                {userName[0]?.toUpperCase()}
              </div>
              <div className="flex flex-col mt-4">
                <span className="text-xl font-bold">Hi,</span>
                {token ? (
                  <span className="font-semibold">{userName}</span>
                ) : (
                  <span className="mb-11">Guest User</span>
                )}
                {token ? (
                  <span className="text-sm pb-10">{userEmail}</span>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="-mt-5"></div>
          </div>
          <MobileNavcomp link="menssuit" navItems="Mens Suit" />
          <MobileNavcomp link="mensshirt" navItems="Mens Shirt" />
          <MobileNavcomp link="menstshirt" navItems="Mens Tshirt" />
          <MobileNavcomp link="womenstees&tops" navItems="Women Tops" />
          <MobileNavcomp link="womensshirt" navItems="Women Shirt" />
          {token && (
            <div
              onClick={onLogOut}
              className="hover:bg-gray-200 rounded-md w-full p-1 cursor-pointer flex justify-center items-center"
            >
              <CiLogout className="text-lg -mb-1" />
              <span className="mx-2">logout</span>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white flex justify-evenly w-full lg:hidden fixed bottom-0 flex-row text-4xl p-2 z-50">
        <Link to='/'>
        <MobileNavIcons reactMobileIcons={<IoHomeOutline />} />
        </Link>
        <button
          className="cursor-pointer hover:bg-gray-200 rounded-full p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? <IoMdSearch /> : <BiSolidSearchAlt2 />}
        </button>
        <div className="relative cursor-pointer">
          <div className={`${cartCount==0 ? 'hidden':'absolute'} top-1 right-1 w-5 text-center bg-black text-sm text-white rounded-full`}>
           {cartCount}
          </div>
          <Link to="/cart">
            <div className="hover:bg-gray-200 rounded-full p-2">
              <IoCartOutline />
            </div>
          </Link>
        </div>
        <div className="relative cursor-pointer">
          <div className={`${wishlistCount==0 ? 'hidden':'absolute'} top-1 right-1 w-5 text-center bg-black text-sm text-white rounded-full`}>
            {wishlistCount}
          </div>
          <Link to="/wishlist">
            <div className="hover:bg-gray-200 rounded-full p-2">
              <IoMdHeartEmpty />
            </div>
          </Link>
        </div>
        {!token ? (
          <Link to="/signin">
            <MobileNavIcons reactMobileIcons={<CgProfile />} />
          </Link>
        ) : (
          <>
            <div className="block group relative">
              <div className="bg-black text-white flex justify-center text-[20px] w-full h-9 rounded-full mt-1 mx-2">
                {userName[0]?.toUpperCase()}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;

