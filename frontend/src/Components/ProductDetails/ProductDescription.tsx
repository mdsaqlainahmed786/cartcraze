//import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
interface ProductProps {
  productName: string;
  sizes?: string[]|undefined;
  productDescription?: string;
  oldPrice: number;
  newPrice: number;
  color: string;
  colorImages: string;
  onAddtoCart: () => void;
  loading: boolean;
  setSelectedSize: (size: string) => void;
  selectedSize: string | undefined;
}

function ProductDescription({
  productName,
  productDescription,
  oldPrice,
  newPrice,
  sizes = [], // Provide a default empty array
  color,
  colorImages,
  loading,
  onAddtoCart,
  setSelectedSize,
  selectedSize
}: ProductProps) {
 // const [selectedSize, setSelectedSize] = useState<string | undefined>(sizes[0]);
 //const navigate = useNavigate();

 useEffect(() => {
  console.log(selectedSize)
  }, [selectedSize])
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
                onClick={() =>{ 
                  setSelectedSize(size)
                  console.log(size)
                }}
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
          className={`border-2 border-black w-[80%] rounded-full py-2 hover:bg-black hover:text-white md:w-52 ${ loading
            ? "opacity-80 cursor-not-allowed hover:bg-black hover:text-white"
            : ""}`}
            disabled={loading}
        >
          
          <div className="flex justify-center space-x-3 items-center">
               {loading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-5 h-5  text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}{" "}
          <span>Add to Cart</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ProductDescription;
