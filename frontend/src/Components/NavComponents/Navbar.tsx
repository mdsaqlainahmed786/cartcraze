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
function Navbar() {
  const [isHamOpen, setIsHamOpen] = useState(false);
  // const [wishListCount, setWishListCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const wishlistCount = useRecoilValue(wishlistState);
  // const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");// Get the current path
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
  };
  useEffect(() => {
    const token = Cookies.get("Secret_Auth_token");
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
                <div className="absolute -top-0 right-1 w-[19px] h-5 text-center bg-black text-sm text-white rounded-full">
                  {wishlistCount}
                </div>
                <Link to="/wishlist">
                  <div className="hover:bg-gray-200 rounded-full p-2">
                    <IoMdHeartEmpty />
                  </div>
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <div className="absolute top-0 right-1 w-[19px] h-5 text-center bg-black text-sm text-white rounded-full">
                  0
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
                  <div className="block group relative">
                    <div className="cursor-pointer bg-black text-white flex justify-center text-[20px] w-full h-9 rounded-full mt-1 mx-2">
                      M
                    </div>
                    <div
                      onClick={onLogOut}
                      className="hidden bg-white z-[999] cursor-pointer absolute justify-center items-center text-[19px] -ml-5 mt-1 shadow-lg p-2 group-hover:flex hover:bg-gray-100"
                    >
                      <CiLogout />
                      <span className="mx-2">logout</span>
                    </div>
                  </div>
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
      <div
        className={`space-y-5 p-3 sticky z-[50] ${
          isOpen ? "top-[168px]" : "top-[84px]"
        } bg-white shadow-md flex flex-col justify-center items-center cursor-pointer text-gray-600 lg:hidden ${
          isHamOpen ? "block" : "hidden"
        }`}
      >
        <MobileNavcomp link="menssuit" navItems="Mens Suit" />
        <MobileNavcomp link="mensshirt" navItems="Mens Shirt" />
        <MobileNavcomp link="menstshirt" navItems="Mens Tshirt" />
        <MobileNavcomp link="womenstees&tops" navItems="Women Tops" />
        <MobileNavcomp link="womensshirt" navItems="Women Shirt" />
      </div>
      <div className="bg-white flex justify-evenly w-full lg:hidden fixed bottom-0 flex-row text-4xl p-2 z-50">
        <MobileNavIcons reactMobileIcons={<IoHomeOutline />} />
        <button
          className="cursor-pointer hover:bg-gray-200 rounded-full p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? <IoMdSearch /> : <BiSolidSearchAlt2 />}
        </button>
        <div className="relative cursor-pointer">
          <div className="absolute top-1 right-1 w-5 text-center bg-black text-sm text-white rounded-full">
            0
          </div>
          <Link to="/cart">
            <div className="hover:bg-gray-200 rounded-full p-2">
              <IoCartOutline />
            </div>
          </Link>
        </div>
        <div className="relative cursor-pointer">
          <div className="absolute top-1 right-1 w-5 text-center bg-black text-sm text-white rounded-full">
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
                <div className="cursor-pointer bg-black text-white flex justify-center text-[20px] w-full h-9 rounded-full mt-1 mx-2">
                  M
                </div>
                <div
                  onClick={onLogOut}
                  className="hidden bg-white z-[999] cursor-pointer absolute bottom-14 justify-center items-center text-[19px] -ml-11 mt-1 shadow-lg p-2 group-hover:flex hover:bg-gray-100"
                >
                  <CiLogout />
                  <span className="mx-2">logout</span>
                </div>
              </div>
            </>
          )}
      </div>
    </>
  );
}

export default Navbar;
