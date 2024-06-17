import { useEffect } from "react";
import AOS from "aos";
interface CollectionProps {
  collectionImg: string;
  collectionName: string;
}
function CollectionComp({ collectionImg, collectionName }: CollectionProps) {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration in milliseconds // Whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <div
      className="flex flex-col object-cover justify-center items-center transition-transform duration-300 hover:scale-110 hover:opacity-90 hover:cursor-pointer aos-init aos-animate"
      data-aos="zoom-in-up"
      data-aos-anchor-placement="top-bottom"
    >
      <img
        className="rounded-md h-44 max-h-72 md:h-56"
        src={collectionImg}
        alt={collectionName}
      />
      <div className="text-sm m-1">{collectionName}</div>
    </div>
  );
}

export default CollectionComp;
