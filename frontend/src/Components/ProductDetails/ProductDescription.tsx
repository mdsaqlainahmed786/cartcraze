interface ProductProps {
  productName: string;
}

function ProductDescription({ productName }: ProductProps) {
  return (
    <div className="flex flex-col mt-2 space-y-1 pb-10 md:mt-0 md:mx-4 md:w-[50%]">
      <div className="text-2xl flex justify-between font-semibold">
        <span>{productName?.replace(/-/g, " ").toUpperCase()}</span>
      </div>
      <div className="flex space-x-3 items-center space-y-2">
        <span className="text-neutral-500 text-sm">
          MRP{" "}
          <s>
            <span className="text-md">:₹17999/-</span>
          </s>
        </span>
        <span className="text-2xl font-semibold">₹ 12419/-</span>
        <span className="text-xl text-red-600">BEST DEAL</span>
      </div>
      <span className="text-neutral-500">Inclusive of all taxes</span>
      <span className="text-lg">
        Availability: <span className="text-green-600 text-lg">InStock ✓</span>
      </span>
      <div>
        <span>SIZE</span>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <div className="flex flex-wrap m-2 space-x-5">
            <div className="p-1 px-3 border-2 rounded-lg cursor-pointer hover:bg-black hover:text-white">
              S
            </div>
            <div className="p-1 px-3 border-2 rounded-lg cursor-pointer hover:bg-black hover:text-white">
              M
            </div>
            <div className="p-1 px-3 border-2 rounded-lg cursor-pointer hover:bg-black hover:text-white">
              L
            </div>
            <div className="p-1 px-3 border-2 rounded-lg cursor-pointer hover:bg-black hover:text-white">
              XL
            </div>
            <div className="p-1 px-3 border-2 rounded-lg cursor-pointer hover:bg-black hover:text-white">
              XXL
            </div>
          </div>
        </div>
      </div>
      <div>
        <span>COLOR: BLACK</span>
        <div className="flex flex-wrap gap-4 justify-center items-center space-x-5 -space-y-2 mt-6">
          <div className="flex flex-wrap">
            <div className="flex flex-col justify-center items-center text-center w-16 mt-0 ml-7">
              <img
                className="border-2 rounded-md cursor-pointer hover:border-black"
                src="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
                alt="men"
              />
            </div>
            <div className="flex flex-col justify-center items-center text-center w-16 mt-0 ml-7">
              <img
                className="border-2 rounded-md cursor-pointer hover:border-black"
                src="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
                alt="men"
              />
            </div>
            <div className="flex flex-col justify-center items-center text-center w-16 mt-0 ml-7">
              <img
                className="border-2 rounded-md cursor-pointer hover:border-black"
                src="https://imagescdn.vanheusenindia.com/img/app/product/9/934972-11906967.jpg?auto=format&w=390"
                alt="men"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 space-y-3">
        <span className="font-semibold">PRODUCT DESCRIPTION</span>
        <p className="text-sm font-serif">
          Experience undeniable elegance in our black four-piece suit from the
          Travelog collection for men who prefer the ultra-slim look. Cut from a
          blend of polyester and rayon, this solid suit features a two-button
          front opening and is perfect for formal occasions. Flaunt its
          ultra-slim fit that complements any body type while enjoying the
          unique comfort it provides. Whether attending a red-carpet event or a
          formal occasion, the wardrobe staple will make a confident statement
          without any direct call-to-action approach
        </p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-5 pt-5 md:justify-center md:flex-row md:items-center md:space-y-0 md:space-x-3">
        <button className="border-2 border-black w-[80%] rounded-full py-2 hover:bg-black hover:text-white md:w-52">
          Add to Wishlist
        </button>
        <button className="bg-gray-800 text-white w-[80%] rounded-full py-2.5 hover:bg-black md:w-52">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDescription;
