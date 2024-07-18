import Navbar from "../../Components/NavComponents/Navbar";
import { CiFilter } from "react-icons/ci";
import serverDown from "../../assets/serverDown.png";
import FooterComp from "../../Components/FooterComp";
import CategoryProduct from "../../Components/CategoryProduct";
import "../../index.css";
import gifLoader from "../../assets/loader.gif";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Filter from "../../Components/Filter";
import MobileFilters from "../../Components/MobileFilters";
import noProducts from "../../assets/noproducts.png";
import axios from "axios";

function Products() {
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

  const [mobileFilter, setMobileFilter] = useState(false);
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth <= 1023);
  const [products, setProducts] = useState<Product[]>([]);
  const [productslength, setProductsLength] = useState<number>(0);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const { productCategory } = useParams();
  useEffect(() => {
    const fetchProducts = async (queryParams: string) => {
      setLoader(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/category/${productCategory}${queryParams}`
        );
        setProducts(response.data.categorySpecificProducts);
        setProductsLength(response.data.categorySpecificProducts.length);
        setError(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(true);
        setLoader(false);
      } finally {
        setLoader(false);
      }
    };

    const queryParams = location.search;
    fetchProducts(queryParams);
    // console.log(fetchingCategory)
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
  }, [mobileFilter, isMdScreen, location.search, productCategory, products.length]);

  const onFilterOpen = () => {
    setMobileFilter(!mobileFilter);
  };

 // const category = products.length > 0 ? products[0].category : "";

  return (
    <>
      <Navbar />
      {loader && (
        <div className="flex justify-center items-center h-[80vh]">
          <img src={gifLoader} alt="loader" />
        </div>
      )}
      
      {error && (
        <div className="flex flex-col justify-center items-center h-[80vh] mx-auto">
          <img
            className="h-[25vh] md:h-[40vh]"
            src={serverDown}
            alt="server down"
          />
          <span className="text-neutral-500 text-[18px] text-center">
            Oops... There was Something wrong.Check your internet connection or
            try again later
          </span>
        </div>
      )}
      {mobileFilter && isMdScreen && (
        <div onClick={() => setMobileFilter(false)} className="overlay"></div>
      )}
      <div className={`flex flex-col ${error || loader ? "hidden" : ""}`}>
        <div className={`flex flex-row justify-between items-center p-3`}>
          <div>Home &#10095; Products &#10095; Mens'wear</div>
          <div
            onClick={onFilterOpen}
            className="text-3xl cursor-pointer lg:hidden"
          >
            <CiFilter />
          </div>
        </div>
        <hr />
        <div className={`text-[13.5px] text-center text-neutral-600 p-1`}>
          Check each product page for other buying options. Price and other
          details may vary based on product category.
        </div>
      </div>
      <div
        className={`flex flex-row justify-center ${
          error || loader ? "hidden" : ""
        }`}
      >
        <Filter productCategory={productCategory} setProducts={setProducts} />
        <div className="flex-1 flex gap-2 justify-center flex-wrap pb-10">
          {products.map((product) => (
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
          {productslength === 0 && !loader && !error && (
        <div className="flex  flex-col justify-center items-center h-[80vh]">
          <img  className="h-[25vh] md:h-[40vh]" src={noProducts} alt="no products" />
          <span className="text-[18px] text-neutral-500">
            No products found with these filters
            </span>
            </div>
            )}
        </div>
      </div>
      <div
        className={`bottom-16 overflow-y-scroll transition-transform duration-300 rounded-lg ${
          mobileFilter
            ? "sticky transform translate-y-0"
            : "hidden transform translate-y-full"
        } h-[60vh] w-full bg-white z-40 lg:hidden`}
      >
        <MobileFilters
          productCategory={productCategory}
          onFilterOpen={onFilterOpen}
          setProducts={setProducts}
        />
      </div>
      <FooterComp />
    </>
  );
}

export default Products;