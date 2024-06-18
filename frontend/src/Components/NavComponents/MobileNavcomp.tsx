import {Link} from "react-router-dom"
interface MobileNavProps {
  navItems: string,
  link:string
}
const MobileNavcomp = ({ navItems, link }: MobileNavProps) => {
  return (
    <span className="hover:text-black hover:bg-gray-200 rounded-md w-full flex justify-center p-1">
      <Link to={`/${link}`}>
      {navItems}
      </Link>
    </span>
  );
};

export default MobileNavcomp;
