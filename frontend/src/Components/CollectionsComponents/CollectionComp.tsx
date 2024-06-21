import {Link} from "react-router-dom"
interface CollectionProps {
  collectionImg: string;
  collectionName: string;
  link:string
}
function CollectionComp({ collectionImg, collectionName, link}: CollectionProps) {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 600, // Animation duration in milliseconds // Whether animation should happen only once - while scrolling down
  //   });
  // }, []);
  return (
    <>
    <Link to={`/${link}`}>
    <div
      className="flex flex-col object-cover justify-center items-center transition-transform duration-300 hover:scale-110 hover:opacity-90 hover:cursor-pointer"
      // data-aos="zoom-in-up"
      // data-aos-anchor-placement="top-bottom"
    >
      <img
        className="rounded-md h-44 max-h-72 md:h-56"
        src={collectionImg}
        alt={collectionName}
      />
      <div className="text-sm font-semibold m-1">{collectionName}</div>
    </div>
    </Link>
    </>
  );
}

export default CollectionComp;
