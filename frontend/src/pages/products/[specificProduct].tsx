import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../../index.css";
import Navbar from "../../Components/NavComponents/Navbar";
import FooterComp from "../../Components/FooterComp";
import ImageMagnifier from "../../Components/ProductDetails/ImageMagnifier";
import ImageThumbnail from "../../Components/ProductDetails/ImageThumbnail";
import ProductDescription from "../../Components/ProductDetails/ProductDescription";

function ProductDetail() {
  const slideImages = [
    "https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390",
    "https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906968.jpg?auto=format&w=390",
    "https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906959.jpg?auto=format&w=390",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [image, setImage] = useState(slideImages[0]);
  const { productName } = useParams();

  const nextImg = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
  };

  const prevImg = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slideImages.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextImg,
    onSwipedRight: prevImg,
    //@ts-expect-error pkg
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // allows swipe with mouse (for testing on desktop)
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-between items-center mx-5">
        <div>Home &#10095; Products &#10095; Mens'wear</div>
      </div>
      <div className="hidden lg:flex flex-row lg:justify-between mt-5">
        <ImageThumbnail images={slideImages} setImage={setImage} selectedImage={image} />
        <ImageMagnifier imageSrc={image} />
        <ProductDescription productName={productName!} />
      </div>
      <div className="flex flex-col md:flex-row mx-3 mt-3 lg:hidden">
        <div className="flex flex-col items-center justify-start pt-0 md:sticky md:top-0 md:h-screen md:overflow-hidden">
          <div className="w-full max-w-md">
            <div className="relative w-full flex justify-center items-center">
              <div
                {...handlers}
                className="relative overflow-hidden border-2 border-gray-300"
              >
                <img
                  src={slideImages[currentIndex]}
                  alt={`Slide ${currentIndex}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex justify-center mt-2">
              {slideImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? "bg-black" : "bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <ProductDescription productName={productName!} />
      </div>
      <FooterComp />
    </>
  );
}

export default ProductDetail;
