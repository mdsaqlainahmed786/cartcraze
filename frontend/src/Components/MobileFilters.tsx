import { FaFilterCircleXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

interface FilterProps {
  onFilterOpen: () => void;
  productCategory: string| undefined;
  setProducts: (products: []) => void;
}

function MobileFilters({ productCategory, onFilterOpen, setProducts }: FilterProps) {
  // const [minVal, setMinVal] = useState(200);
  // const [maxVal, setMaxVal] = useState(10000);
  // const [errMsg, setErrMsg] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const colorOptions = ["Blue", "Black", "Brown", "Green", "Grey"];
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const colors = searchParams.get('color');
    const sizes = searchParams.get('size');

    if (colors) {
      setSelectedColors(colors.split(','));
    } else {
      setSelectedColors([]);
    }

    if (sizes) {
      setSelectedSizes(sizes.split(','));
    } else {
      setSelectedSizes([]);
    }

    // setMinVal(200);
    // setMaxVal(10000);
    // setErrMsg(false);
  }, [location.search, productCategory]);

  const priceFilterer = () => {
    // if (minVal <= 0 || maxVal <= 0 || minVal > maxVal) {
    //   setErrMsg(true);
    // } else {
    //   setErrMsg(false);
      updateURLAndFetchProducts();
    //}
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    // setMinVal(200);
    // setMaxVal(10000);
    // setErrMsg(false);
    setSelectedColors([]);
    setSelectedSizes([]);
    navigate(`/products/${productCategory}`);
    onFilterOpen();
  };

  const updateURLAndFetchProducts = async () => {
    const colors = selectedColors.join(',');
    const sizes = selectedSizes.join(',');

    const queryParams = new URLSearchParams();
    if (colors) queryParams.append('color', colors);
    if (sizes) queryParams.append('size', sizes);
    navigate(`/products/${productCategory}?${queryParams.toString()}`);

    try {
      const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/v1/products/category/${productCategory}`);
      if (colors) {
        url.searchParams.append('color', colors);
      }
      if (sizes) {
        url.searchParams.append('size', sizes);
      }

      const response = await axios.get(url.toString());
      const data = await response.data;
      onFilterOpen();
      setProducts(data.categorySpecificProducts);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col border-b-2 pb-3 sticky bg-white shadow-md top-0 z-50 border-black">
        <div className="flex justify-between mx-auto   items-center mt-3">
          <div>
            <span className="text-3xl font-semibold mr-10">Filters</span>
          </div>
          <div onClick={clearFilters} className="text-3xl cursor-pointer">
            <FaFilterCircleXmark />
          </div>
        </div>
      </div>
      <div className="text-xl flex space-y-2 flex-col m-5">
        <span className="font-semibold">Colors</span>
        <div className="ml-5 flex flex-col space-y-4">
          {colorOptions.map((color) => (
            <label
              key={color}
              className="inline-flex items-center cursor-pointer"
            >
              <input
                className="accent-black h-4 w-4"
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => toggleColor(color)}
              />
              <span className="text-md hover:text-black ml-2">{color}</span>
            </label>
          ))}
        </div>
        <span className="font-semibold">Size</span>
        <div className="ml-5 flex flex-col space-y-4">
          {sizeOptions.map((size) => (
            <label
              key={size}
              className="inline-flex items-center cursor-pointer"
            >
              <input
                className="accent-black h-4 w-4"
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => toggleSize(size)}
              />
              <span className="text-md hover:text-black ml-2">{size}</span>
            </label>
          ))}
        </div>
        {/* <PriceSlider
          minVal={minVal}
          maxVal={maxVal}
          setMinVal={setMinVal}
          setMaxVal={setMaxVal}
          errMsg={errMsg}
        /> */}
        <div className="w-full flex justify-end items-center space-x-5 pt-5 pb-[62px]">
          <button
            onClick={onFilterOpen}
            className="p-2 font-semibold border border-black rounded-md text-lg"
          >
            Close
          </button>
          <button
            onClick={priceFilterer}
            className="bg-gray-800 text-white rounded-md py-2 px-3 hover:bg-black text-center disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-gray-800"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileFilters;
