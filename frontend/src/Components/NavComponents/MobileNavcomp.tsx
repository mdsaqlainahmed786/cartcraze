import {Link} from "react-router-dom"
interface MobileNavProps {
  navItems: string,
  link:string
}
const MobileNavcomp = ({ navItems, link }: MobileNavProps) => {
  return (
    <div className="hover:text-black cursor-pointer text-center hover:bg-gray-200 rounded-md w-full flex justify-center p-1">
      <Link className="w-full" to={`/products/${link}`}>
      {navItems}
      </Link>
    </div>
  );
};

export default MobileNavcomp;
