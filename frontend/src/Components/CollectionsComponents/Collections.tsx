import men from "../../assets/mens'ware.webp"
import women from "../../assets/women's_ware.webp"
import hoodies from "../../assets/hoodies.webp"
import sweat_shirt from "../../assets/sweat_shirt.webp"
import oversized_tshirt from "../../assets/oversized_tshirt.webp"
import furniture from "../../assets/furniture.webp"
import CollectionComp from "./CollectionComp";
function Collections() {
  return (
  <div className="mt-7 w-full mx-auto pb-16 space-y-2">
    <span className="flex justify-center text-3xl font-medium font-sans md:text-4xl">Trending Categories</span>
    <span className="flex text-sm text-gray-600 font-light justify-center px-2 pb-10 text-center mx-auto md:text-lg">Find a bright ideal to suit your taste with our great selection of suspension</span>
     <div className="flex flex-wrap justify-center mx-auto gap-11 max-w-[87vw] md:max-w-[68vw] lg:max-w-[60vw]">
      <CollectionComp collectionName="Men's Ware" collectionImg={men} />
      <CollectionComp collectionName="Women's Ware" collectionImg={women} />
      <CollectionComp collectionName="Hoodies" collectionImg={hoodies} />
      <CollectionComp collectionName="Sweatshirt" collectionImg={sweat_shirt} />
      <CollectionComp collectionName="Oversized T-shirt" collectionImg={oversized_tshirt} />
      <CollectionComp collectionName="Furniture" collectionImg={furniture} />
      </div>
     </div>
);
}

export default Collections;
