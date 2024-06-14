interface MobileIconsProps {
  reactMobileIcons: React.ReactNode;
}
const MobileNavIcons = ({ reactMobileIcons }: MobileIconsProps) => {
  return( 
    <div className="cursor-pointer hover:bg-gray-200 rounded-full p-2">
    {reactMobileIcons}
  </div>
  )
};

export default MobileNavIcons;