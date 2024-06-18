import React from 'react'
import {Link} from "react-router-dom"
interface NavItemProps {
    navItem: string,
    link:string
}
    const NavItem: React.FC<NavItemProps> = ({ navItem, link }) => {
  return (
    <span className="mr-4 cursor-pointer hover:text-black hover:border-b-4 border-black rounded-b-sm pb-[20px]">
      <Link to={`/${link}`}>
    {navItem}
    </Link>
  </span>
  )
}

export default NavItem