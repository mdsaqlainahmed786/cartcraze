import React from 'react'
import {Link} from "react-router-dom"
interface NavItemProps {
    navItem: string,
    link:string,
    isActive:boolean
}
    const NavItem: React.FC<NavItemProps> = ({ navItem, link, isActive }) => {
  return (
    <span className={`mr-4 cursor-pointer hover:text-black hover:border-b-4 border-black rounded-b-sm pb-[20px] ${isActive?"text-black border-b-4 border-black rounded-b-sm pb-[20px]":""}`}>
      <Link to={`/${link}`}>
    {navItem}
    </Link>
  </span>
  )
}

export default NavItem