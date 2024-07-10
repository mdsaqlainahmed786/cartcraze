import { useEffect, useState } from 'react';
import { FaFilterCircleXmark } from "react-icons/fa6";
import PriceSlider from '../Components/PriceSlider';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

interface FilterProps {
  setProducts: (products: Product[]) => void;
  productCategory: string;
}

const Filter = ({ setProducts, productCategory }: FilterProps) => {
  const [minVal, setMinVal] = useState<number>(200);
  const [maxVal, setMaxVal] = useState<number>(10000);
  const [errMsg, setErrMsg] = useState<boolean>(false);
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
    }

    if (sizes) {
      setSelectedSizes(sizes.split(','));
    }
  }, [location.search, productCategory]);

  const priceFilterer = () => {
    if (minVal <= 0 || maxVal <= 0 || minVal > maxVal) {
      setErrMsg(true);
    } else {
      setErrMsg(false);
      updateURLAndFetchProducts();
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
    navigate(`/${productCategory}`);
  };

  const updateURLAndFetchProducts = async () => {
    const colors = selectedColors.join(',');
    const sizes = selectedSizes.join(',');

    const queryParams = new URLSearchParams();
    if (colors) queryParams.append('color', colors);
    if (sizes) queryParams.append('size', sizes);
    navigate(`/${productCategory}?${queryParams.toString()}`);

    try {
      const url = new URL(`http://localhost:3000/api/v1/products/category/${productCategory}`);
      if (colors) {
        url.searchParams.append('color', colors);
      }
      if (sizes) {
        url.searchParams.append('size', sizes);
      }

      const response = await axios.get(url.toString());
      const data = await response.data;
      setProducts(data.categorySpecificProducts);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
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
                  <span className="text-md hover:text-black ml-2">{color}</span>
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
                  <span className="text-md hover:text-black ml-2">{size}</span>
                </label>
              </div>
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
              onClick={clearFilters}
              className="p-2 font-semibold border border-black rounded-md text-lg"
            >
              Clear
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
    </div>
  );
};

export default Filter;
