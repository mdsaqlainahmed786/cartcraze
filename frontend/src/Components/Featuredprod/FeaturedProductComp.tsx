import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
interface FeaturedComponentProps {
  title:string,
  category:string,
  oldPrice:string,
  newPrice:string,
  image:string
}
function FeaturedProductComp({title, category, oldPrice, newPrice, image}:FeaturedComponentProps) {
  return (
    <div className="flex justify-center items-center">
    <div className="shadow-md rounded-md pb-3">
      <div className="flex relative justify-start flex-col space-y-4 space-x-1 cursor-pointer group">
        <img className="h-72 rounded-md" src={image} alt="men.webp" />
        <div
          className={`hidden absolute h-full text-4xl flex flex-col group-hover:flex`}
        >
          <div className="flex flex-col space-y-2 space-x-1 w-full items-end">
            <div className="bg-white text-[25px] rounded-full p-1 hover:text-red-600">
              <IoMdHeartEmpty />
            </div>
            <div className="bg-white text-[25px] rounded-full p-1 hover:text-red-600">
              <IoCartOutline />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 pl-1">
          <span className="text-neutral-500 text-[10px] font-bold font-sans">
            {category}
          </span>
          <span className="font-bold text-md font-sans">{title}</span>
          <div className="flex flex-row">
            <span className="text-neutral-500 text-[16px] font-bold font-sans">
              <s>₹{oldPrice}</s>
            </span>
            <span className="text-[16px] font-bold font-sans mx-2">
              ₹{newPrice}/-
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FeaturedProductComp