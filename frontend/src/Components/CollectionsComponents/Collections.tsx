
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
        <CollectionComp link="menssuit" collectionName="Mens Suit" collectionImg='https://imagescdn.vanheusenindia.com/img/app/product/6/697468-7476359.jpg?auto=format&w=390' />
        <CollectionComp link="mensshirt" collectionName="Mens Shirt" collectionImg='https://imagescdn.vanheusenindia.com/img/app/product/8/891912-10826044.jpg?auto=format&w=390' />
        <CollectionComp link='menstshirt'
          collectionName="Mens T-shirt"
          collectionImg='https://imagescdn.vanheusenindia.com/img/app/product/9/912268-11293144.jpg?auto=format&w=390'
        />
        <CollectionComp link='mensbottom' collectionName="Mens Bottom" collectionImg="https://imagescdn.vanheusenindia.com/img/app/product/3/39628078-12988396.jpg?auto=format&w=390" />
          <CollectionComp link="womenstees&tops" collectionName="Womens Tees & Tops" collectionImg='https://imagescdn.vanheusenindia.com/img/app/product/7/758689-8660509.jpg?auto=format&w=390' />
        <CollectionComp link='womensshirt'
          collectionName="Womens Shirt"
          collectionImg='https://imagescdn.vanheusenindia.com/img/app/product/8/876386-10493810.jpg?auto=format&w=390'
        />
      </div>
    </div>
  );
}

export default Collections;
