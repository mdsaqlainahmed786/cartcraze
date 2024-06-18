import men from "../../assets/mens'ware.webp";
import women from "../../assets/women's_ware.webp";
import hoodies from "../../assets/hoodies.webp";
import sweat_shirt from "../../assets/sweat_shirt.webp";
import oversized_tshirt from "../../assets/oversized_tshirt.webp";
import furniture from "../../assets/furniture.webp";
import CollectionComp from "./CollectionComp";
import { useEffect } from "react";
import AOS from 'aos'
function Collections() {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration in milliseconds // Whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <div className="mt-7 w-full mx-auto pb-16 space-y-2 aos-init aos-animate">
      <span className="flex justify-center text-3xl font-medium font-sans md:text-4xl">
        Trending Categories
      </span>
      <span className="flex text-sm text-gray-600 font-light justify-center px-2 pb-10 text-center mx-auto md:text-lg">
        Find a bright ideal to suit your taste with our great selection of
        suspension
      </span>
      <div className="flex flex-wrap justify-center mx-auto gap-11 max-w-[87vw] md:max-w-[68vw] lg:max-w-[60vw]" data-aos="zoom-in-up" data-aos-anchor-placement="top-bottom">
        <CollectionComp link="menswear" collectionName="Men's Wear" collectionImg={men} />
        <CollectionComp link="womenswear" collectionName="Women's Wear" collectionImg={women} />
        <CollectionComp link="hoodies" collectionName="Hoodies" collectionImg={hoodies} />
        <CollectionComp link='sweatshirts'
          collectionName="Sweatshirt"
          collectionImg={sweat_shirt}
        />
        <CollectionComp link='tshirts'
          collectionName="T-shirt"
          collectionImg={oversized_tshirt}
        />
        <CollectionComp link='furniture' collectionName="Furniture" collectionImg={furniture} />
      </div>
    </div>
  );
}

export default Collections;
