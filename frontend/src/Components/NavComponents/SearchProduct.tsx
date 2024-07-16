import { Link } from "react-router-dom";

interface SearchProductProps {
    title: string;
    imgSrc: string;
    category: string;
    }
function SearchProduct({title, imgSrc, category}: SearchProductProps) {
  return (
    <>
     <Link to={`/product/${title.replace(/\s+/g, "-").toUpperCase()}`}>
      <div className="flex w-full cursor-pointer hover:bg-gray-200 py-2 px-2 rounded-md">
        <img
          src={imgSrc}
          alt="product"
          className="h-20 rounded-md"
        />
        <div className="px-3 flex flex-col space-y-2 py-2">
            <span className="text-sm">{title}</span>
            <span className="text-[12px] text-neutral-600">{category}</span>
        </div>
      </div>
      </Link>
    </>
  );
}

export default SearchProduct;
