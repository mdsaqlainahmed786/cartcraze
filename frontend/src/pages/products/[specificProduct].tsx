import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import loader from "../../assets/loader.gif";
import serverDown from "../../assets/serverDown.png";
import "../../index.css";
import Navbar from "../../Components/NavComponents/Navbar";
import FooterComp from "../../Components/FooterComp";
import ImageMagnifier from "../../Components/ProductDetails/ImageMagnifier";
import ImageThumbnail from "../../Components/ProductDetails/ImageThumbnail";
import ProductDescription from "../../Components/ProductDetails/ProductDescription";
import BenefitsOfStore from "../../Components/BenefitsOfStore/BenefitsOfStore";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { CartCountState } from "../../RecoilStateProviders/CartCount";
interface Product {
  id: string;
  title: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  sizes: string[];
  color: string;
  images: string[];
}

function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null); 
  const [slideImages, setSlideImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | undefined>("S");
  const [image, setImage] = useState<string>(""); 
  const [cartCount, setCartCount] = useRecoilState(CartCountState)
  const [buyNowLoading, setBuyNowLoading] = useState<boolean>(false);
   const [cartLoading, setCartLoading] = useState<boolean>(false);
  const { productName } = useParams();
  const onBuyNow = async() => {
    if(userLoggedIn){
      try {
        setBuyNowLoading(true)
        const response = await axios.post(
           "http://localhost:3000/api/v1/cart/add",
           {
             productId: product?.id,
             quantity: 1,
             size: selectedSize,
           },
           {
             withCredentials: true,
           }
         );
        setSelectedSize(response.data.item.size);
     //    console.log(response.data.message);
         const cartResponse = await axios.get(
          "http://localhost:3000/api/v1/cart/getcart",
          {
            withCredentials: true,
          }
        );
        setCartCount(cartResponse.data.cartItems.length);
        navigate("/checkout");
       } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error("Error adding product to cart", error.response.data.message);
          toast.error(error.response.data.message, {
            style: {
              border: "1px solid black",
              padding: "16px",
              color: "black",
              marginTop: "75px",
            },
            iconTheme: {
              primary: "black",
              secondary: "white",
            },
          });
        } else {
          console.error("Error adding product to cart", error);
        }
      }finally{
        setBuyNowLoading(false)
      }
    }
    else{
      toast.error("Please login to add product to cart", {
        style: {
          border: "1px solid black",
          padding: "16px",
          color: "black",
          marginTop: "75px",
        },
        iconTheme: {
          primary: "black",
          secondary: "white",
        },
      });
      navigate("/signin");
    }
  }
  const onAddtoCart = async() => {
    console.log(cartCount)
    if(userLoggedIn){
      try {
        setCartLoading(true)
        const response = await axios.post(
           "http://localhost:3000/api/v1/cart/add",
           {
             productId: product?.id,
             quantity: 1,
             size: selectedSize,
           },
           {
             withCredentials: true,
           }
         );
         toast.success("Product added to cart", {
          style: {
            border: "1px solid black",
            padding: "16px",
            color: "black",
            marginTop: "75px",
          },
          iconTheme: {
            primary: "black",
            secondary: "white",
          },
        });
          console.log(response.data)
        setSelectedSize(response.data.item.size);
     //    console.log(response.data.message);
         const cartResponse = await axios.get(
          "http://localhost:3000/api/v1/cart/getcart",
          {
            withCredentials: true,
          }
        );
        setCartCount(cartResponse.data.cartItems.length);
       } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error("Error adding product to cart", error.response.data.message);
          toast.error(error.response.data.message, {
            style: {
              border: "1px solid black",
              padding: "16px",
              color: "black",
              marginTop: "75px",
            },
            iconTheme: {
              primary: "black",
              secondary: "white",
            },
          });
        } else {
          console.error("Error adding product to cart", error);
        }
      }finally{
        setCartLoading(false)
      }
    }
    else{
      toast.error("Please login to add product to cart", {
        style: {
          border: "1px solid black",
          padding: "16px",
          color: "black",
          marginTop: "75px",
        },
        iconTheme: {
          primary: "black",
          secondary: "white",
        },
      });
      navigate("/signin");
    }
  }
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
    const token = Cookies.get("Secret_Auth_token");
    if (token) {
      setUserLoggedIn(true);
    }
    const productFetcher = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/get/${productName}`
        );
        console.log(response.data.specificProduct);
        const detailedProduct = response.data.specificProduct;
        setProduct(detailedProduct);
        setError(false);
        if (detailedProduct.images.length > 0) {
          setSlideImages(detailedProduct.images);
          setImage(detailedProduct.images[0]); // Set the first image as default
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError(true);
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
          <img className="md:h-[25rem]" src={loader} alt="loader" />
        </div>
        <FooterComp />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {error && (
        <div className="flex flex-col justify-center items-center h-[80vh] mx-auto">
          <img
            className="h-[25vh] md:h-[40vh]"
            src={serverDown}
            alt="server down"
          />
          <h1 className="text-3xl mt-5">Product not found</h1>
        </div>
      )}
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
          colorImages={product?.images[0]}
          onAddtoCart={onAddtoCart}
          onBuyLoading={buyNowLoading}
          onCartLoading={cartLoading}
          setSelectedSize={setSelectedSize}
          selectedSize={selectedSize}
          onBuyNow={onBuyNow}
          
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
          colorImages={product?.images[0]}
          onAddtoCart={onAddtoCart}
          onBuyLoading={buyNowLoading}
          onCartLoading={cartLoading}
          setSelectedSize={setSelectedSize}
          selectedSize={selectedSize}
          onBuyNow={onBuyNow}
        />
      </div>
      <BenefitsOfStore />
      <FooterComp />
    </>
  );
}

export default ProductDetail;
