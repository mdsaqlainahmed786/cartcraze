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
  const [menArrivals, setMenArrivals] = useState(false);
  const [womenArrivals, setWomenArrivals] = useState(false);
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const menArrivalsHandler = async () => {
    if (menArrivals) return;
    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/category/Men-Tshirt`
    );
    setLoading(false);
    setMenProducts(response.data.categorySpecificProducts);
    setMenArrivals(true);
    setWomenArrivals(false);
  };
  const womenArrivalsHandler = async () => {
    if (womenArrivals) return;

    setLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/category/Women-Tops`
    );
    setWomenProducts(response.data.categorySpecificProducts);
    setLoading(false);
    setWomenArrivals(true);
    setMenArrivals(false);
  };
  useEffect(() => {
    AOS.init({
      duration: 600,
    });
    menArrivalsHandler();
  }, []);
  const menRelatedProducts = menProducts.slice(0, 4);
  const womenRelatedProducts = womenProducts.slice(0, 4);
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
      {loading ? (
        <div className="flex flex-col justify-center items-center space-y-3">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-200 fill-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <div>
            <span className="text-md text-neutral-500">
            Please wait. This might take a minute
            </span>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default NewArrivals;
