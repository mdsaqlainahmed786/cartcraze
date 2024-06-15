import { useState } from "react";
import men from "../../assets/mens'ware.webp";
import women from "../../assets/women's_ware.webp";
import FeaturedProductComp from "../Featuredprod/FeaturedProductComp";

function NewArrivals() {
  const [menArrivals, setMenArrivals] = useState(true);
  const [womenArrivals, setWomenArrivals] = useState(false);
  const menArrivalsHandler = () => {
    setMenArrivals(true);
    setWomenArrivals(false);
  };
  const womenArrivalsHandler = () => {
    setWomenArrivals(true);
    setMenArrivals(false);
  };

  return (
    <div className="pb-24 mx-auto max-w-[80vw] space-y-3">
      <span className="flex justify-center text-3xl font-medium font-sans md:text-4xl">
        New Arrivals
      </span>
      <span className="flex text-sm text-gray-600 font-light justify-center px-2 pb-10 text-center mx-auto md:text-lg">
        Checkout our Brand new products just launched and grab before someone
        else does!
      </span>

      <div className="h-12 mx-auto max-w-[80vw] w-full flex justify-around md:w-[50%]">
        <div onClick={menArrivalsHandler} className={`text-xl cursor-pointer`}>
          <span
            className={`text-xl cursor-pointer pb-1 ${
              menArrivals
                ? "border-b-[3.1px] border-black text-black"
                : "text-gray-500"
            }`}
          >
            Men
          </span>
        </div>
        <div
          onClick={womenArrivalsHandler}
          className={`text-xl cursor-pointer`}
        >
          <span
            className={`text-xl cursor-pointer pb-1 ${
              womenArrivals
                ? "border-b-[3.1px] border-black text-black"
                : "text-gray-500"
            }`}
          >
            Women
          </span>
        </div>
        </div>
        <div className={`flex flex-wrap gap-8 justify-center mx-auto max-w-[80vw] ${menArrivals?"flex":"hidden"}`}>
          <FeaturedProductComp image={men} category="T-shirt" oldPrice="599" newPrice="499" title="Gym Freak T-shirt"/>
          <FeaturedProductComp image={men} category="T-shirt" oldPrice="599" newPrice="499" title="Gym Freak T-shirt"/>
          <FeaturedProductComp image={men} category="T-shirt" oldPrice="599" newPrice="499" title="Gym Freak T-shirt"/>
          <FeaturedProductComp image={men} category="T-shirt" oldPrice="599" newPrice="499" title="Gym Freak T-shirt"/>
          <FeaturedProductComp image={men} category="T-shirt" oldPrice="599" newPrice="499" title="Gym Freak T-shirt"/>
        </div>
        <div className={`flex flex-wrap gap-8 justify-center mx-auto max-w-[80vw] ${womenArrivals?"flex":"hidden"}`}>
          <FeaturedProductComp image={women} category="T-shirt" oldPrice="599" newPrice="499" title="Pink funk T-shirt"/>
          <FeaturedProductComp image={women} category="T-shirt" oldPrice="599" newPrice="499" title="Pink funk T-shirt"/>
          <FeaturedProductComp image={women} category="T-shirt" oldPrice="599" newPrice="499" title="Pink funk T-shirt"/>
          <FeaturedProductComp image={women} category="T-shirt" oldPrice="599" newPrice="499" title="Pink funk T-shirt"/>
          <FeaturedProductComp image={women} category="T-shirt" oldPrice="599" newPrice="499" title="Pink funk T-shirt"/>
        </div>
    </div>
  );
}

export default NewArrivals;
