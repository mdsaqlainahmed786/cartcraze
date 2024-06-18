import { Link } from "react-router-dom";
interface IconsProps {
  reactIcons: React.ReactNode;
  link: string;
}
const Icons = ({ reactIcons, link }: IconsProps) => {
  return (
    <>
      <span className="cursor-pointer hover:bg-gray-200 rounded-full p-2">
        <Link to={`/${link}`}>{reactIcons}</Link>
      </span>
    </>
  );
};

export default Icons;
