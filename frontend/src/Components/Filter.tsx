import { useState } from 'react';
import { FaFilterCircleXmark } from "react-icons/fa6";
import PriceSlider from '../Components/PriceSlider';


const Filter = () => {
  const [minVal, setMinVal] = useState<number>(200);
  const [maxVal, setMaxVal] = useState<number>(10000);
  const [errMsg, setErrMsg] = useState<boolean>(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const colorOptions = ["Blue", "Black", "Brown", "Cream", "Green", "Grey"];
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const priceFilterer = () => {
    console.log('PriceFilterer called'); // Debug log
    console.log('minVal:', minVal, 'maxVal:', maxVal); 
    if(minVal <= 0 || maxVal <= 0 || minVal > maxVal) {
      setErrMsg(true);
    } else {
      setErrMsg(false);
    }
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
    setMinVal(200);
    setMaxVal(10000);
    setErrMsg(false);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  return (
    <div className="hidden lg:flex lg:w-[22rem]">
      <div className="lg:mt-5 lg:ml-5 h-[100vh] w-full">
        <div className="flex flex-col p-3 bg-white">
          <div className="flex justify-between items-center border-b-2 border-black pb-2">
            <span className="text-3xl">Filters</span>
            <div className="text-3xl cursor-pointer" onClick={clearFilters}>
              <FaFilterCircleXmark />
            </div>
          </div>
          <span className="mt-7 font-semibold text-xl mb-4">Colors</span>
          <div className="space-y-2">
            {colorOptions.map((color) => (
              <div key={color} className="space-x-2 ml-3">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="accent-black h-4 w-4"
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                  />
                  <span className="font-semibold text-gray-600 hover:text-black ml-2">
                    {color}
                  </span>
                </label>
              </div>
            ))}
          </div>
          <span className="mt-7 font-semibold text-xl mb-4">Size</span>
          <div className="space-y-2">
            {sizeOptions.map((size) => (
              <div key={size} className="space-x-2 ml-3">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="accent-black h-4 w-4"
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                  />
                  <span className="font-semibold text-gray-600 hover:text-black ml-2">
                    {size}
                  </span>
                </label>
              </div>
            ))}
          </div>
          <span className="mt-7 font-semibold text-xl mb-4">Price-range</span>
          <PriceSlider minVal={minVal} maxVal={maxVal} setMinVal={setMinVal} setMaxVal={setMaxVal} errMsg={errMsg}/>
          <div className='flex justify-start m-5'>
            <button onClick={priceFilterer} className='bg-gray-800 text-white rounded-md py-2 px-3 hover:bg-black text-center disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-gray-800'>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
