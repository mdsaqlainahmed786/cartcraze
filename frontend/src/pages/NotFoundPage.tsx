// src/pages/NotFoundPage.jsx
import notFound from "../assets/404.png";
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] mx-auto">
    <img
      className="h-[25vh] md:h-[40vh]"
      src={notFound}
      alt="404 Not Found"
    />
    <span className="text-neutral-500 text-[18px] text-center px-5">
        The page you are looking for might have been removed or is temporarily unavailable.
    </span>
    <button
      onClick={() => navigate("/")}
      className="bg-gray-800 hover:bg-black text-white p-2 rounded-md mt-5"
    >
      Go to Home &#10095;
    </button>
  </div>
  );
};

export default NotFoundPage;
