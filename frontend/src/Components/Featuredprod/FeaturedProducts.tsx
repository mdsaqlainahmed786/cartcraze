import { useEffect } from "react";
import featured_1 from "../../assets/featured_1.webp";
import FeaturedProductComp from "./FeaturedProductComp";
import "aos/dist/aos.css";
import AOS from 'aos'
function FeaturedProducts() {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration in milliseconds // Whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <div
      className="pb-24 mx-auto max-w-[80vw] space-y-3 aos-init aos-animate"
      data-aos="zoom-in-up"
      data-aos-anchor-placement="top-bottom"
    >
      <span className="flex justify-center text-3xl font-medium font-sans md:text-4xl">
        Featured Products
      </span>
      <span className="flex text-sm text-gray-600 font-light justify-center px-2 pb-10 text-center mx-auto md:text-lg">
        Checkout our products which has been loved by our users across our
        Business
      </span>
      <div className="flex flex-wrap gap-8 justify-center mx-auto max-w-[80vw]">
        <FeaturedProductComp
          image={featured_1}
          title="Marvel T-shirt"
          category="T-SHIRT"
          oldPrice="699"
          newPrice="549"
        />
        <FeaturedProductComp
          image={featured_1}
          title="Marvel T-shirt"
          category="T-SHIRT"
          oldPrice="699"
          newPrice="549"
        />
        <FeaturedProductComp
          image={featured_1}
          title="Marvel T-shirt"
          category="T-SHIRT"
          oldPrice="699"
          newPrice="549"
        />
        <FeaturedProductComp
          image={featured_1}
          title="Marvel T-shirt"
          category="T-SHIRT"
          oldPrice="699"
          newPrice="549"
        />
        <FeaturedProductComp
          image={featured_1}
          title="Marvel T-shirt"
          category="T-SHIRT"
          oldPrice="699"
          newPrice="549"
        />
      </div>
    </div>
  );
}

export default FeaturedProducts;
