import { useState } from "react";
//import { useNavigate } from "react-router-dom";
interface ProductProps {
  productName: string;
  sizes?: string[];
  productDescription?: string;
  oldPrice: number;
  newPrice: number;
  color: string;
  colorImages: string;
  onAddtoCart: () => void;
}

function ProductDescription({
  productName,
  productDescription,
  oldPrice,
  newPrice,
  sizes = [], // Provide a default empty array
  color,
  colorImages,
  onAddtoCart,
}: ProductProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(sizes[0]);
 //const navigate = useNavigate();


  return (
    <div className="flex flex-col mt-2 space-y-1 pb-10 md:mt-0 md:mx-4 md:w-[50%]">
      <div className="text-2xl flex justify-between font-semibold">
        <span>{productName?.replace(/-/g, " ").toUpperCase()}</span>
      </div>
      <div className="flex space-x-3 items-center space-y-2">
        <span className="text-neutral-500 text-sm">
          MRP{" "}
          <s>
            <span className="text-md">:₹{oldPrice}/-</span>
          </s>
        </span>
        <span className="text-2xl font-semibold">₹ {newPrice}/-</span>
        <span className="text-xl text-red-600">BEST DEAL</span>
      </div>
      <span className="text-neutral-500">Inclusive of all taxes</span>
      <span className="text-lg">
        Availability: <span className="text-green-600 text-lg">InStock ✓</span>
      </span>
      <div>
        <span>SIZE</span>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <div className="flex flex-wrap m-2 space-x-5">
            {sizes.map((size, index) => (
              <div
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`p-1 px-3 border-2 rounded-lg cursor-pointer hover:bg-black hover:text-white ${
                  selectedSize === size ? "bg-black text-white" : ""
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <span>COLOR: {color.toUpperCase()}</span>
        <div className="flex justify-start space-x-5 ml-12 -space-y-2 mt-6">
          <div className="flex flex-wrap">
            <div className="flex flex-col justify-center items-center text-center w-16 mt-0 ml-7">
              <img
                className="border-2 rounded-md cursor-pointer border-black"
                src={colorImages}
                alt="men"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 space-y-3">
        <span className="font-semibold">PRODUCT DESCRIPTION</span>
        <p className="text-sm font-serif">{productDescription}</p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-5 pt-5 md:justify-center md:flex-row md:items-center md:space-y-0 md:space-x-3">
        <button className="bg-gray-800 text-white w-[80%] rounded-full py-2.5 hover:bg-black md:w-52">
          Buy Now
        </button>
        <button
          onClick={onAddtoCart}
          className="border-2 border-black w-[80%] rounded-full py-2 hover:bg-black hover:text-white md:w-52"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDescription;
