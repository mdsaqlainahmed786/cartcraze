import { FaFilterCircleXmark } from "react-icons/fa6";
import { useState } from "react";
import PriceSlider from "../Components/PriceSlider";

interface FilterProps {
  onFilterOpen: () => void;
}

function MobileFilters({ onFilterOpen }: FilterProps) {
  const [minVal, setMinVal] = useState(200);
  const [maxVal, setMaxVal] = useState(10000);
  const [errMsg, setErrMsg] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const colorOptions = ["Blue", "Black", "Brown", "Green", "Grey"];
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const toogleColors = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? selectedColors.filter((c) => c !== color)
        : [...prev, color]
    );
  };

  const toogleSizes = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? selectedSizes.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const clearFilters = () => {
    setMinVal(200);
    setMaxVal(10000);
    setErrMsg(false);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const onFilterPrice = () => {
    console.log("PriceFilterer called"); // Debug log
    console.log("minVal:", minVal, "maxVal:", maxVal);
    if (minVal <= 0 || maxVal <= 0 || minVal > maxVal) return setErrMsg(true);
    else {
      setErrMsg(false);
      onFilterOpen();
    }
  };
  return (
    <>
      <div className="flex flex-col border-b-2 pb-3 border-black">
        <div className="flex justify-between mx-auto w-[40vw] items-center mt-3">
          <div>
            <span className="text-3xl font-semibold">Filters</span>
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
              <input className="accent-black h-4 w-4"   checked={selectedColors.includes(color)} onChange={()=>toogleColors(color)} type="checkbox" />
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
              <input className="accent-black h-4 w-4" checked={selectedSizes.includes(size)} onChange={()=>toogleSizes(size)} type="checkbox" />
              <span className="text-md hover:text-black ml-2">{size}</span>
            </label>
          ))}
        </div>
        <PriceSlider
          minVal={minVal}
          maxVal={maxVal}
          setMinVal={setMinVal}
          setMaxVal={setMaxVal}
          errMsg={errMsg}
        />
        <div className="w-full flex justify-end items-center space-x-5 pt-5">
          <button
            onClick={onFilterOpen}
            className="p-2 font-semibold border border-black rounded-md text-lg"
          >
            Close
          </button>
          <button
            onClick={onFilterPrice}
            className="bg-gray-800 text-white rounded-md py-2 px-3 hover:bg-black text-center disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-gray-800"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

export default MobileFilters;
