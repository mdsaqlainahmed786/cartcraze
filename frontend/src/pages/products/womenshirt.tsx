import Navbar from "../../Components/NavComponents/Navbar";
import { CiFilter } from "react-icons/ci";
import FooterComp from "../../Components/FooterComp";
import CategoryProduct from "../../Components/CategoryProduct";
import "../../index.css";
import { useState, useEffect } from "react";
import Filter from "../../Components/Filter";
import MobileFilters from "../../Components/MobileFilters";
function WomenShirt() {
  const [mobileFilter, setMobileFilter] = useState(false);
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth <= 1023);

  useEffect(() => {
    const handleResize = () => {
      setIsMdScreen(window.innerWidth <= 1023);
    };

    window.addEventListener("resize", handleResize);

    
    if (isMdScreen && mobileFilter) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("no-scroll");
    };
  }, [mobileFilter, isMdScreen]);


  const onFilterOpen = () => {
    setMobileFilter(!mobileFilter);
  };

  return (
    <>
      <Navbar />
      {mobileFilter && isMdScreen && (
        <div onClick={() => setMobileFilter(false)} className="overlay"></div>
      )}{" "}
      {/* Overlay for blur/gray background */}
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center p-3">
          <div>Home &#10095; Products &#10095; Mens'wear</div>
          <div
            onClick={onFilterOpen}
            className="text-3xl cursor-pointer lg:hidden"
          >
            <CiFilter />
          </div>
        </div>
        <hr />
        <div className="text-[13.5px] text-center text-neutral-600 p-1">
          Check each product page for other buying options. Price and other
          details may vary based on product category.
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <Filter />
        <div className="flex-1 flex gap-2 justify-center flex-wrap pb-10">
          <CategoryProduct
            category="Women Shirts"
            imageSrc="https://imagescdn.vanheusenindia.com/img/app/product/3/39628929-13005690.jpg?auto=format&w=390"
            newPrice={1069}
            oldPrice={1699}
            title="Women Red Solid Sleeves"
          />
          <CategoryProduct
            category="Women Shirts"
            imageSrc="https://imagescdn.vanheusenindia.com/img/app/product/3/39628929-13005690.jpg?auto=format&w=390"
            newPrice={1069}
            oldPrice={1699}
            title="Women Red Solid Sleeves"
          />
          <CategoryProduct
            category="Women Shirts"
            imageSrc="https://imagescdn.vanheusenindia.com/img/app/product/3/39628929-13005690.jpg?auto=format&w=390"
            newPrice={1069}
            oldPrice={1699}
            title="Women Red Solid Sleeves"
          />
          <CategoryProduct
            category="Women Shirts"
            imageSrc="https://imagescdn.vanheusenindia.com/img/app/product/3/39628929-13005690.jpg?auto=format&w=390"
            newPrice={1069}
            oldPrice={1699}
            title="Women Red Solid Sleeves"
          />
          <CategoryProduct
            category="Women Shirts"
            imageSrc="https://imagescdn.vanheusenindia.com/img/app/product/3/39628929-13005690.jpg?auto=format&w=390"
            newPrice={1069}
            oldPrice={1699}
            title="Women Red Solid Sleeves"
          />
          <CategoryProduct
            category="Women Shirts"
            imageSrc="https://imagescdn.vanheusenindia.com/img/app/product/3/39628929-13005690.jpg?auto=format&w=390"
            newPrice={1069}
            oldPrice={1699}
            title="Women Red Solid Sleeves"
          />
        </div>
      </div>
      <div
        className={`bottom-16 overflow-y-scroll rounded-lg ${
          mobileFilter ? "sticky" : "hidden"
        } h-[60vh] w-full bg-white z-50 lg:hidden`}
      >
        <MobileFilters onFilterOpen={onFilterOpen} />
      </div>
      <FooterComp />
    </>
  );
}

export default WomenShirt