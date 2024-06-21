
import 'react-toastify/dist/ReactToastify.css';
interface PriceProps {
  minVal:number;
  maxVal:number;
  setMinVal: React.Dispatch<React.SetStateAction<number>>;
  setMaxVal: React.Dispatch<React.SetStateAction<number>>;
  errMsg:boolean
}
const PriceSlider = ({errMsg, minVal, setMinVal, maxVal, setMaxVal }:PriceProps) => {
  return (
    <>
      <div className="p-4 border rounded-lg">
        <div className="text-xl font-semibold mb-2">Price</div>
        <div className="flex flex-col space-y-5 mt-4">
          <div className="flex flex-row justify-evenly">
            <span className="font-semibold mx-2">Min:</span>
            <input
            //@ts-expect-error value can be string/number
              onChange={(e) => setMinVal(e.target.value)}
              value={minVal}
              className="w-20 outline-none border-2"
              type="number"
            />
            <span className="font-semibold mx-2">Max:</span>
            <input
              className="w-20 outline-none border-2"
              value={maxVal}
              //@ts-expect-error value can be string/number
              onChange={(e) => setMaxVal(e.target.value)}
              type="number"
            />
          </div>
          {/* {minVal>maxVal && <div className='flex justify-center text-red-500 text-sm'>The minimum number cannot be greater!</div>}
          {maxVal == 0 || minVal==0 && <div className='flex justify-center text-red-500 text-sm'>Max or Min Value cannot be zero!</div>} */}
          {errMsg && <div className='flex justify-center text-red-500 text-sm'>Invalid Price filters!</div>}
        </div>
      </div>
    </>
  );
};

export default PriceSlider;
