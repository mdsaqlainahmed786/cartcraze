import Benifits from "./Benifits";
import { useEffect } from "react";
import { FaTruckArrowRight } from "react-icons/fa6";
import { MdWorkspacePremium } from "react-icons/md";
import { MdDiscount } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
function BenefitsOfStore() {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration in milliseconds // Whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <div
      className="pb-24 flex flex-col justify-center space-y-3 aos-init aos-animate"
      data-aos="zoom-in-up"
      data-aos-anchor-placement="top-bottom"
    >
      <span className="flex justify-center text-3xl font-medium font-sans md:text-4xl">
        We Provide You
      </span>
      <span className="flex text-sm text-gray-600 font-light justify-center px-10 pb-10 text-center mx-auto md:text-lg">
        We provide you incredible offers and benefits that you've never seen it
        before!
      </span>
      <div className="flex flex-wrap justify-center gap-5">
        <Benifits
          icon={<FaTruckArrowRight />}
          benefit="Fastest and Free of cost delivery in any corner of world!"
        />
        <Benifits
          icon={<MdWorkspacePremium />}
          benefit="Most affordable and premium quality of products"
        />
        <Benifits
          icon={<MdDiscount />}
          benefit="Discounts upto 70% on every item!"
        />
      </div>
    </div>
  );
}

export default BenefitsOfStore;
