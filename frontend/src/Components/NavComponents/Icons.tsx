interface IconsProps {
  reactIcons: React.ReactNode;
}
const Icons = ({ reactIcons }: IconsProps) => {
  return( 
  <span className="cursor-pointer hover:bg-gray-200 rounded-full p-2">
  {reactIcons}
</span>
  )
};

export default Icons;
