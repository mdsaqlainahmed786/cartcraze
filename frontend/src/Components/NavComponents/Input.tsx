import { IoSearch } from "react-icons/io5";
export const Input: React.FC = () =>{
    return(
        <>
        <input
        type="search"
        className="border-2 mx-2 w-[50vw] p-1 focus-none outline-none rounded-md lg:w-72"
        placeholder="Search anything..."
      />
       <button className="bg-gray-800 text-white p-2.5 w-10 flex justify-center rounded-md hover:bg-black">
       <IoSearch />
          </button>
      </>
    )
}