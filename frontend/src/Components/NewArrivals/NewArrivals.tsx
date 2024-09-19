import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import CategoryProduct from "../CategoryProduct";
function NewArrivals() {
  
  interface Product {
    id: string;
    title: string;
    category: string;
    newPrice: number;
    oldPrice: number;
    images: string[];
    sizes: string[];
    color: string;
  }
  // useEffect(() => {
  //   AOS.init({
  //     duration: 600, // Animation duration in milliseconds // Whether animation should happen only once - while scrolling down
  //   });
  // }, []);
  const [menArrivals, setMenArrivals] = useState(true);
  const [womenArrivals, setWomenArrivals] = useState(false);
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const menArrivalsHandler = async() => {
    setMenArrivals(true);
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/products/category/Men-Tshirt`);
    console.log("Mens products hai ji",response.data.categorySpecificProducts);
    setMenProducts(response.data.categorySpecificProducts);
    setWomenArrivals(false);
  };
  const womenArrivalsHandler = async() => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/products/category/Women-Tops`);
    console.log("Women products hai ji",response.data.categorySpecificProducts);
    setWomenProducts(response.data.categorySpecificProducts);
    setWomenArrivals(true);
    setMenArrivals(false);
  };
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
    if(menArrivals){
      menArrivalsHandler();
    }
  }, []);
  const menRelatedProducts = menProducts.slice(0,4)
  const womenRelatedProducts = womenProducts.slice(0,4)
  return (
    <div
      className="pb-24 mx-auto max-w-[80vw] space-y-3 aos-init aos-animate"
      data-aos="zoom-in-up"
      data-aos-anchor-placement="top-bottom"
    >
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
      <div
        className={`flex pt-5 flex-wrap gap-8 justify-center mx-auto max-w-[80vw] md:flex-nowrap ${
          menArrivals ? "flex" : "hidden"
        }`}
      >
         {menRelatedProducts.map((product) => (
            <CategoryProduct
              key={product.id}
              category={product.category}
              imageSrc={product.images[0]}
              newPrice={product.newPrice}
              oldPrice={product.oldPrice}
              title={product.title}
              sizes={product.sizes}
              color={product.color}
            />
          ))}
 
      
      </div>
      <div
        className={`flex pt-5 flex-wrap gap-8 justify-center mx-auto max-w-[80vw] md:flex-nowrap ${
          womenArrivals ? "flex" : "hidden"
        }`}
      >
        {womenRelatedProducts.map((product) => (
            <CategoryProduct
              key={product.id}
              category={product.category}
              imageSrc={product.images[0]}
              newPrice={product.newPrice}
              oldPrice={product.oldPrice}
              title={product.title}
              sizes={product.sizes}
              color={product.color}
            />
          ))}
      </div>
    </div>
  );
}

export default NewArrivals;
