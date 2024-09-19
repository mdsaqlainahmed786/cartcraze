import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from 'aos'
import axios from "axios";
import CategoryProduct from "../CategoryProduct";
function FeaturedProducts() {
  
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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/all`
      );
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    fetchProducts()
    AOS.init({
      duration: 600, 
    });
  }, []);
  const products = featuredProducts.slice(-4);
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
      <div className="flex flex-wrap gap-8 justify-center mx-auto max-w-[70vw] md:flex-nowrap">
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
      </div>
    </div>
  );
}

export default FeaturedProducts;
