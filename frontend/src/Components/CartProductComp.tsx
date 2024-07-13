import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface CartProductCompProps {
  id: string;
  title: string;
  price: number;
  initialQuantity: number;
  color: string;
  imageSrc: string;
  category: string;
  productId:string;
  fetchProducts:()=>void
}

function CartProductComp({productId, id, title, price, initialQuantity, category, color, imageSrc, fetchProducts }: CartProductCompProps) {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const loweredCaseColor = color.toLowerCase();

  const handleQuantityChange = async (newQuantity: number) => {
    setQuantity(newQuantity);
    try {
      await axios.put(`http://localhost:3000/api/v1/cart/update/${id}`, {
        productId: productId,
        quantity: newQuantity
      }, {
        withCredentials: true
      });
      fetchProducts()
    } catch (error) {
      console.error(error);
    }
    console.log(id)
    console.log(newQuantity)
  };

  const handleRemove = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/cart/delete/${id}`, {
        withCredentials: true
      });
      fetchProducts()
      toast.success("Product removed from cart", {
        style: {
          border: "1px solid black",
          padding: "16px",
          color: "black",
          marginTop: "75px",
        },
        iconTheme: {
          primary: "black",
          secondary: "white",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   setQuantity(initialQuantity);
  //   console.log(quantity)
  // }, [quantity, initialQuantity]);

  return (
    <>
      <div className="flex w-full md:max-w-[60vw] border-2 space-y-2 rounded-md shadow-md">
        <Link to={`/product/${title.replace(/\s+/g, "-").toUpperCase()}`}>
          <img className="h-full w-48 md:h-full md:w-56" src={imageSrc} alt="img" />
        </Link>
        <div className="w-full flex px-4 md:space-y-2 flex-col justify-start">
          <span className="my-1 text-[14px] md:text-[20px]">{title}</span>
          <span className="text-neutral-600 text-sm">{category}</span>
          <div className="flex flex-row items-center">
            <span className="font-semibold text-sm md:text-xl pt-4 md:pt-0">₹{price}/-</span>
          </div>
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 py-2 px-1">
              <div className={`h-4 w-4 rounded-full border-2`} style={{ backgroundColor: loweredCaseColor }}></div>
              <span className="font-semibold text-neutral-600">{color}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex flex-row space-x-2 pb-5">
              <div className="flex flex-col justify-start">
                <label htmlFor="quantity" className="text-[13px] text-gray-700 font-medium">Quantity</label>
                <select
                  id="quantity"
                  name="quantity"
                  defaultValue={quantity}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="mt-1 w-[73px] py-2 px-4 border cursor-pointer border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm flex justify-between"
                >
                  {[...Array(7)].map((_, index) => (
                    <option className="" key={index} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-start">
                <label htmlFor="size" className="text-[13px] text-gray-700 font-medium">Size</label>
                <select
                  id="size"
                  name="size"
                  defaultValue="S"
                  className="mt-1 w-[73px] py-2 px-3 border cursor-pointer border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm flex justify-center items-center"
                >
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <option className="" key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button className="text-2xl" onClick={handleRemove}>
                <MdOutlineDeleteOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProductComp;
