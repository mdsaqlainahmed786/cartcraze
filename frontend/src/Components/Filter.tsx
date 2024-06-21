import React, { useState } from 'react';
import { FaFilterCircleXmark } from "react-icons/fa6";
import PriceSlider from '../Components/PriceSlider';

function Filter() {
  const [minVal, setMinVal] = useState(200);
  const [maxVal, setMaxVal] = useState(10000);
  const [errMsg, setErrMsg] = useState(false)
  const priceFilterer = () => {
    console.log('PriceFilterer called'); // Debug log
    console.log('minVal:', minVal, 'maxVal:', maxVal); 
    if(minVal<=0||maxVal<=0||minVal>maxVal) return setErrMsg(true)
      else return setErrMsg(false)
  };


  return (
    <div className="hidden lg:flex lg:w-[22rem]">
      <div className="lg:mt-5 lg:ml-5 h-[100vh] w-full">
        <div className="flex flex-col p-3 bg-white">
          <div className="flex justify-between items-center border-b-2 border-black pb-2">
            <span className="text-3xl">Filters</span>
            <div className="text-3xl cursor-pointer">
              <FaFilterCircleXmark />
            </div>
          </div>
          <span className="mt-7 font-semibold text-xl mb-4">Colors</span>
          <div className="space-y-2">
            {["Blue", "Black", "Brown", "Cream", "Green", "Grey"].map((filter) => (
              <div key={filter} className="space-x-2 ml-3">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="accent-black h-4 w-4"
                    type="checkbox"
                    required
                  />
                  <span className="font-semibold text-gray-600 hover:text-black ml-2">
                    {filter}
                  </span>
                </label>
              </div>
            ))}
          </div>
          <span className="mt-7 font-semibold text-xl mb-4">Size</span>
          <div className="space-y-2">
            {["S", "M", "L", "XL", "XXL"].map((filter) => (
              <div key={filter} className="space-x-2 ml-3">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    className="accent-black h-4 w-4"
                    type="checkbox"
                    required
                  />
                  <span className="font-semibold text-gray-600 hover:text-black ml-2">
                    {filter}
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
