import React from 'react'
interface NavItemProps {
    navItem: string
}
    const NavItem: React.FC<NavItemProps> = ({ navItem }) => {
  return (
    <span className="mr-4 cursor-pointer hover:text-black border-black hover:border-b-4 rounded-b-sm pb-[25px]">
    {navItem}
  </span>
  )
}

export default NavItem