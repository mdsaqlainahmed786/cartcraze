interface MobileNavProps {
  navItems: string;
}
const MobileNavcomp = ({ navItems }: MobileNavProps) => {
  return (
    <span className="hover:text-black hover:bg-gray-200 rounded-md w-full flex justify-center p-1 ">
      {navItems}
    </span>
  );
};

export default MobileNavcomp;
