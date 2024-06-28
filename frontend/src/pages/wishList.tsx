import Navbar from "../Components/NavComponents/Navbar";
import FooterComp from "../Components/FooterComp";
import WishlistProductComp from "../Components/WishlistProductComp";
function WishList() {
  return (
    <>
      <Navbar />
      <div className="pb-24">
        <div className="mt-5 space-y-3">
          <span className="flex justify-center text-3xl font-medium font-sans md:text-4xl">
            Your Wishlist
          </span>
        <span className="flex text-sm text-gray-600 font-light justify-center px-2 pb-10 text-center mx-auto md:text-lg">
          Keep a track of your choices, Save your Favorite items in the wishlist and buy them any time you like!
        </span>
        </div>
        <div className="flex flex-col justify-center items-center space-y-5  mx-auto max-w-[90vw]">
          <WishlistProductComp
            title="Men Black Solid Ultra Slim Fit Formal Four Piece Suit"
            imgSrc="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
            category="Mens-Suit"
            newPrice={12999}
            oldPrice={17999}
          />
          <WishlistProductComp
            title="Men Black Solid Ultra Slim Fit Formal Four Piece Suit"
            imgSrc="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
            category="Mens-Suit"
            newPrice={12999}
            oldPrice={17999}
          />
          <WishlistProductComp
            title="Men Black Solid Ultra Slim Fit Formal Four Piece Suit"
            imgSrc="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
            category="Mens-Suit"
            newPrice={12999}
            oldPrice={17999}
          />
          <WishlistProductComp
            title="Men Black Solid Ultra Slim Fit Formal Four Piece Suit"
            imgSrc="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
            category="Mens-Suit"
            newPrice={12999}
            oldPrice={17999}
          />
        </div>
      </div>
      <FooterComp />
    </>
  );
}

export default WishList;
