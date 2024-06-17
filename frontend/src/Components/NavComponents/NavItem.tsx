import React from 'react'
interface NavItemProps {
    navItem: string
}
    const NavItem: React.FC<NavItemProps> = ({ navItem }) => {
  return (
    <span className="mr-4 cursor-pointer hover:text-black hover:border-b-4 border-black rounded-b-sm pb-[20px]">
    {navItem}
  </span>
  )
}

export default NavItem