import notFoundPng from "../assets/not.png";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <img className="w-44 h-44 opacity-85" src={notFoundPng} alt="not found" />
      <span className="text-neutral-500 text-center px-2">
        No Items found in your List start adding them now!
      </span>
      <button
      onClick={() => navigate("/products/Men-Suits")}
      className="bg-gray-800 hover:bg-black text-white p-2 rounded-md mt-5"
    >
      Go to Products &#10095;
    </button>
    </div>
  );
}

export default NotFound;
