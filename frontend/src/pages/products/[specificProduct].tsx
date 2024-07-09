import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import "../../index.css";
import Navbar from "../../Components/NavComponents/Navbar";
import FooterComp from "../../Components/FooterComp";
import ImageMagnifier from "../../Components/ProductDetails/ImageMagnifier";
import ImageThumbnail from "../../Components/ProductDetails/ImageThumbnail";
import ProductDescription from "../../Components/ProductDetails/ProductDescription";
import BenefitsOfStore from "../../Components/BenefitsOfStore/BenefitsOfStore";
import axios from "axios";

function ProductDetail() {
  const [product, setProduct] = useState<any>(null); // Use `null` instead of an empty array
  const [slideImages, setSlideImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [image, setImage] = useState<string | null>(null);
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
    //@ts-expect-error pkg err
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // allows swipe with mouse (for testing on desktop)
  });

  useEffect(() => {
    const productFetcher = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/get/${productName}`
        );
        console.log(response.data.specificProduct);
        const detailedProduct = response.data.specificProduct;
        setProduct(detailedProduct);
        if (detailedProduct.images.length > 0) {
          setSlideImages(detailedProduct.images);
          setImage(detailedProduct.images[0]); // Set the first image as default
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    productFetcher();
  }, [productName]);

  useEffect(() => {
    if (slideImages.length > 0) {
      setImage(slideImages[0]);
    }
  }, [slideImages]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading product details...</p>
        </div>
        <FooterComp />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-row justify-between items-center mx-5">
        <div>Home &#10095; Products &#10095; Mens'wear</div>
      </div>
      <div className="hidden lg:flex flex-row lg:justify-between mt-5">
        <ImageThumbnail
          images={slideImages}
          setImage={setImage}
          selectedImage={image}
        />
        <ImageMagnifier imageSrc={image} />
        <ProductDescription
          productName={productName!}
          productDescription={product.description}
          newPrice={product.newPrice}
          oldPrice={product.oldPrice}
          sizes={product.sizes}
          color={product.color}
          colorImages={product.images[0]}
        />
      </div>
      <div className="flex flex-col md:flex-row mx-3 mt-3 lg:hidden">
        <div className="flex flex-col items-center justify-start pt-0 md:sticky md:top-0 md:h-screen md:overflow-hidden">
          <div className="w-full max-w-md">
            <div className="relative w-full flex justify-center items-center">
              <div
                {...handlers}
                className="relative overflow-hidden border-2 border-gray-300"
              >
                {image && (
                  <img
                    src={slideImages[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-center mt-2">
              {slideImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 mx-1 rounded-full ${
                    index === currentIndex ? "bg-black" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <ProductDescription
          productName={productName!}
          productDescription={product.description}
          newPrice={product.newPrice}
          oldPrice={product.oldPrice}
          sizes={product.sizes}
          color={product.color}
          colorImages={product.images[0]}
        />
      </div>
      <BenefitsOfStore />
      <FooterComp />
    </>
  );
}

export default ProductDetail;
