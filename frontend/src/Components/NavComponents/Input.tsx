import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchProduct from "./SearchProduct";
interface Product {
  title: string;
  category: string;
  images: string[];

}
export const Input: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  useEffect(() => {
    const searchResults = async () => {
      const upperedSearch = search.toUpperCase();
      try{
        if(search.length === 0){
          return;
        }
        const { data } = await axios.get(`http://localhost:3000/api/v1/products/search?productQuery=${upperedSearch}`);
        //console.log(data.products);
     setSearchResults(data.products);
      } catch (error) {
        console.log(error);
        setErrorMessage(true);
      }finally{
         setErrorMessage(false);
      }
    }
    searchResults();
  }, [search]);
  return (
    <>
    <div className="flex flex-row justify-center">
      <div className="flex">
    <input
        type="search"
        className="border-2 mx-2 w-[50vw] p-1 focus-none outline-none rounded-md lg:w-72"
        placeholder="Search anything..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="bg-gray-800 text-white p-2.5 w-10 flex justify-center rounded-md hover:bg-black">
        <IoSearch />
      </button>
      </div>
      <div className={`${search?"absolute":"hidden"} mt-11 bg-white rounded-lg w-full max-w-[80vw] h-auto max-h-[58vh] md:max-w-[35vw] overflow-hidden md:mt-11`}>
        <div className="flex flex-col space-y-2 justify-center">
          {searchResults.map((product:Product) => (
            <SearchProduct imgSrc={product.images[0]} title={product.title} category={product.category}/>
          ))}
          {errorMessage && <div className="flex justify-center items-center mt-5"><span className="text-red-500">something went wrong in searching products!...</span></div>}
        </div>
      </div>
    </div> 
    </>
  );
};
