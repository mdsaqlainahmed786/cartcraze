import TitlePng from "../assets/Title.png";
import HamburgerMenu from "./NavComponents/Hamburger";
import { useState } from "react";
import { CiHeart, CiLogin } from "react-icons/ci";
import { PiShoppingCartLight } from "react-icons/pi";
import { Input } from "./NavComponents/Input";
import { IoHomeOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import NavItem from "./NavComponents/NavItem";
import Icons from "./NavComponents/Icons";
import MobileNavcomp from "./NavComponents/MobileNavcomp";
import MobileNavIcons from "./NavComponents/MobileNavIcons";
function Navbar() {
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full shadow-md space-y-12 py-2">
        <div className="flex justify-between items-center m-auto max-w-[95vw] custom-md-lg:flex-col space-y-3 custom-lg:flex-row lg:max-w-[90vw]">
          <div className="hover:cursor-pointer">
            <img className="h-12 lg:h-16" src={TitlePng} alt="Title.png" />
          </div>
          <div className="custom-lg:flex hidden lg:flex flex-row">
            <Input />
          </div>
          <div className="hidden custom-md-lg:flex space-x-5 flex-row justify-center items-center custom-lg:space-x-10">
            <div className="hidden font-semibold text-gray-600 lg:text-lg lg:block">
              <NavItem navItem="T-shirts" />
              <NavItem navItem="Electronics" />
              <NavItem navItem="Furniture" />
              <NavItem navItem="Fashion" />
              <NavItem navItem="Men's Wear" />
              <NavItem navItem="Women's Wear" />
            </div>

            <div className="hidden lg:flex flex-row text-2xl w-32 justify-evenly">
              <Icons reactIcons={<CiHeart />} />
              <Icons reactIcons={<PiShoppingCartLight />} />
              <Icons reactIcons={<CiLogin />} />
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
        className={`space-y-5 p-3 shadow-md w-screen h-auto flex flex-col justify-center items-center cursor-pointer text-gray-600 lg:hidden ${
          isHamOpen ? "block" : "hidden"
        }`}
      >
      <MobileNavcomp navItems="T-shirts"/>
      <MobileNavcomp navItems="Furniture"/>
      <MobileNavcomp navItems="Fashion"/>
      <MobileNavcomp navItems="Electronics"/>
      <MobileNavcomp navItems="Men's Wear"/>
      <MobileNavcomp navItems="Women's Wear"/>
      </div>
      <div className="flex justify-evenly w-full lg:hidden absolute bottom-0 flex-row text-4xl p-2">
        <MobileNavIcons reactMobileIcons={<IoHomeOutline />}/>
        <button
          className="cursor-pointer hover:bg-gray-200 rounded-full p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoMdSearch />
        </button>
        <MobileNavIcons reactMobileIcons={<PiShoppingCartLight />}/>
        <MobileNavIcons reactMobileIcons={<IoMailOutline />}/>
        <MobileNavIcons reactMobileIcons={<CiLogin />}/>
      </div>
    </>
  );
}

export default Navbar;
