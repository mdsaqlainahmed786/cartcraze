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
import { useRecoilValue, useSetRecoilState } from "recoil";

import axios from "axios";
import toast from "react-hot-toast";
import UserProfile from "./UserProfile";

import "../../index.css";
import {
  emailState,
  usernameState,
} from "../../RecoilStateProviders/UserDetails";
import useCartCount from "../../useCartCount";
function Navbar() {
  const [isHamOpen, setIsHamOpen] = useState(false);
  // const [wishListCount, setWishListCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHamSymbolOpen, setIsHamSymbolOpen] = useState(false);
  const userEmail = useRecoilValue(emailState);
  const userName = useRecoilValue(usernameState);
  const location = useLocation();
  const navigate = useNavigate();
  const wishlistCount = useRecoilValue(wishlistState);
  const cartCount = useCartCount();
  // const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");// Get the current path
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth <= 1023);
  //console.log(isMdScreen)
  const setUserName = useSetRecoilState(usernameState);
  const setUserEmail = useSetRecoilState(emailState);
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`, {
          withCredentials: true,
        });
        if (res.data.userName && res.data.userEmail) {
          setIsAuthenticated(true);
          setUserName(res.data.userName);
          setUserEmail(res.data.userEmail);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [setUserName, setUserEmail]);

  const onLogOut = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });

      setIsAuthenticated(false);
      setUserName("");
      setUserEmail("");

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
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };
 
  const onHandleHam = () => {
    setIsHamOpen(!isHamOpen);
    setIsHamSymbolOpen(!isHamSymbolOpen);
  };
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
                link="Men-Suits"
                isActive={isActive("/products/Men-Suits")}
                navItem="Mens Suit"
              />
              <NavItem
                link="Men-Shirt"
                isActive={isActive("/products/Men-Shirt")}
                navItem="Mens Shirt"
              />
              <NavItem
                link="Men-Tshirt"
                isActive={isActive("/products/Men-Tshirt")}
                navItem="Mens Tshirt"
              />
              <NavItem
                link="Women-Tops"
                isActive={isActive("/products/Women-Tops")}
                navItem="Women Tops"
              />
              <NavItem
                link="Women-Shirt"
                isActive={isActive("/products/Women-Shirt")}
                navItem="Women Shirt"
              />
            </div>
            <div className="hidden lg:flex flex-row text-3xl w-36 justify-evenly">
              <div className="relative cursor-pointer">
                <div
                  className={`${
                    wishlistCount == 0 ? "hidden" : "absolute"
                  } -top-0 right-1 w-[19px] h-5 text-center bg-black text-sm text-white rounded-full`}
                >
                  {wishlistCount}
                </div>
                <Link to="/wishlist">
                  <div className="hover:bg-gray-200 rounded-full p-2">
                    <IoMdHeartEmpty />
                  </div>
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <div
                  className={`${
                    cartCount == 0 ? "hidden" : "absolute"
                  } top-0 right-1 w-[19px] h-5 text-center bg-black text-sm text-white rounded-full`}
                >
                  {cartCount}
                </div>
                <Link to="/cart">
                  <div className="hover:bg-gray-200 rounded-full p-2">
                    <IoCartOutline />
                  </div>
                </Link>
              </div>
              {isAuthenticated ? (
        <>
          <UserProfile
            className={
              "hidden -right-28 bg-white z-[999] h-48 w-[20rem] absolute pl-4 py-2 text-[19px] -ml-5 mt-1 shadow-xl rounded-lg group-hover:block"
            }
            username={userName}
            email={userEmail}
            onLogOut={onLogOut}
          />
        </>
      ) : (
        <Icons link="signup" reactIcons={<CgProfile />} />
      )}
            </div>
          </div>
          <div onClick={() =>{ 
            setIsHamOpen(!isHamOpen)
            setIsOpen(false)
          }}>
            <HamburgerMenu
              setIsHamSymbolOpen={setIsHamSymbolOpen}
              isHamsymbolOpen={isHamSymbolOpen}
            />
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
      {(isHamOpen || isOpen) && isMdScreen && (
        <div
          onClick={() => {
            setIsHamOpen(false);
            setIsHamSymbolOpen(false);
            setIsOpen(false);
          }}
          className="overlay lg:hidden"
        ></div>
      )}{" "}
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
              {isAuthenticated ? (
                <div className="text-gray-800 bg-white flex justify-center text-[20px] w-full min-w-9 h-9 rounded-full mt-1 mx-2 px-1 pt-0.5">
                  {userName?.charAt(0).toUpperCase()}
                </div>
              ) : (
                <CgProfile className="text-4xl mx-2" />
              )}

              <div className="flex flex-col mt-4">
                <span className="text-xl font-bold">Hi,</span>
                {isAuthenticated ? (
                  <span className="font-semibold">{userName}</span>
                ) : (
                  <span className="mb-11">Guest User</span>
                )}
                {isAuthenticated ? (
                  <span className="text-sm pb-10">{userEmail}</span>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div className="-mt-5"></div>
          </div>
          <div className="w-full" onClick={onHandleHam}>
            <MobileNavcomp link="Men-Suits" navItems="Mens Suit" />
          </div>
          <div className="w-full" onClick={onHandleHam}>
            <MobileNavcomp link="Men-Shirt" navItems="Mens Shirt" />
          </div>
          <div className="w-full" onClick={onHandleHam}>
          <MobileNavcomp link="Men-Tshirt" navItems="Mens Tshirt" />
          </div>
          <div className="w-full" onClick={onHandleHam}>
            <MobileNavcomp link="Women-Tops" navItems="Women Tops" />
          </div>
          <div className="w-full" onClick={onHandleHam}>
            <MobileNavcomp link="Women-Shirt" navItems="Women Shirt" />
          </div>

          {isAuthenticated ? (
            <div
              onClick={onLogOut}
              className="hover:bg-gray-200 rounded-md w-full p-1 cursor-pointer flex justify-center items-center"
            >
              <CiLogout className="text-lg -mb-1" />
              <span className="mx-2">logout</span>
            </div>
          ) : (
            <div
              onClick={() => navigate("/signin")}
              className="hover:bg-gray-200 rounded-md w-full p-1 cursor-pointer flex justify-center items-center"
            >
              <CiLogout className="text-lg -mb-1" />
              <span className="mx-2">logIn</span>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white flex justify-evenly w-full lg:hidden fixed bottom-0 flex-row text-4xl p-2 z-50">
        <Link to="/">
          <MobileNavIcons reactMobileIcons={<IoHomeOutline />} />
        </Link>
        <button
          className="cursor-pointer hover:bg-gray-200 rounded-full p-2"
          onClick={() => {
            setIsOpen(!isOpen)
            setIsHamOpen(false)
            setIsHamSymbolOpen(false)
          }}
        >
          {!isOpen ? <IoMdSearch /> : <BiSolidSearchAlt2 />}
        </button>
        <div className="relative cursor-pointer">
          <div
            className={`${
              cartCount == 0 ? "hidden" : "absolute"
            } top-1 right-1 w-5 text-center bg-black text-sm text-white rounded-full`}
          >
            {cartCount}
          </div>
          <Link to="/cart">
            <div className="hover:bg-gray-200 rounded-full p-2">
              <IoCartOutline />
            </div>
          </Link>
        </div>
        <div className="relative cursor-pointer">
          <div
            className={`${
              wishlistCount == 0 ? "hidden" : "absolute"
            } top-1 right-1 w-5 text-center bg-black text-sm text-white rounded-full`}
          >
            {wishlistCount}
          </div>
          <Link to="/wishlist">
            <div className="hover:bg-gray-200 rounded-full p-2">
              <IoMdHeartEmpty />
            </div>
          </Link>
        </div>
        {!isAuthenticated ? (
          <Link to="/signin">
            <MobileNavIcons reactMobileIcons={<CgProfile />} />
          </Link>
        ) : (
          <>
            <div className="block group relative">
              <div className="bg-black text-white flex justify-center text-[20px] w-full min-w-6  h-9 rounded-full mt-1 mx-2 px-1 pb-10">
                {userName?.charAt(0).toUpperCase()}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;