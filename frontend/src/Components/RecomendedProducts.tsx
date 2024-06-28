import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import CategoryProduct from "../Components/CategoryProduct";
import '../index.css'

function RecommendedProductsCarousel() {
  const [recommendedIndex, setRecommendedIndex] = useState(0);
  const recommendedProducts = [
    {
      category: "Tshirt",
      imageSrc: "https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390",
      newPrice: 499,
      oldPrice: 999,
      title: "Marvel Tshirt"
    },
    {
      category: "Tshirt",
      imageSrc: "https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390",
      newPrice: 599,
      oldPrice: 1099,
      title: "Naruto Tshirt"
    },
    {
      category: "Tshirt",
      imageSrc: "https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390pg",
      newPrice: 399,
      oldPrice: 899,
      title: "One Piece Tshirt"
    },
    {
      category: "Tshirt",
      imageSrc: "https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390pg",
      newPrice: 399,
      oldPrice: 899,
      title: "One Piece Tshirt"
    },
    {
      category: "Tshirt",
      imageSrc: "https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390pg",
      newPrice: 399,
      oldPrice: 899,
      title: "One Piece Tshirt"
    },
    {
      category: "Tshirt",
      imageSrc: "https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390pg",
      newPrice: 399,
      oldPrice: 899,
      title: "One Piece Tshirt"
    },
    // Add more products here
  ];

  const nextRecommended = () => {
    setRecommendedIndex((prevIndex) =>
      prevIndex + 2 >= recommendedProducts.length ? 0 : prevIndex + 2
    );
  };

  const prevRecommended = () => {
    setRecommendedIndex((prevIndex) =>
      prevIndex === 0 ? recommendedProducts.length - 2 : prevIndex - 2
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextRecommended,
    onSwipedRight: prevRecommended,
   // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="recommended-products-carousel">
      <h2>Recommended Products</h2>
      <div className="flex items-center justify-center">
        <button onClick={prevRecommended} className="carousel-control">&lt;</button>
        <div className="flex overflow-hidden" {...handlers}>
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(recommendedIndex / 2) * 100}%)`,
            }}
          >
            {recommendedProducts.map((product, index) => (
              <CategoryProduct
                key={index}
                category={product.category}
                imageSrc={product.imageSrc}
                newPrice={product.newPrice}
                oldPrice={product.oldPrice}
                title={product.title}
               // Ensure each product takes up 50% of the container's width
              />
            ))}
          </div>
        </div>
        <button onClick={nextRecommended} className="carousel-control">&gt;</button>
      </div>
    </div>
  );
}

export default RecommendedProductsCarousel;
