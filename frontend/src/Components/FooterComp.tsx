import titlePng from "../assets/Title.png";
import pay from "../assets/pay.png";
function FooterComp() {
  return (
    <div className="pb-24 bg-white border-t-2">
      <div className="flex pt-6 flex-wrap gap-11 mx-auto justify-center items-center w-[47vw] md:w-[30vw] lg:w-full lg:justify-around">
        <div className="flex flex-col space-y-3">
          <img className="h-16" src={titlePng} alt="title" />
          <div className="flex text-center w-[10rem] text-gray-600 text-md">
          Have Craze for Cart.We have quality of premium!
          </div>
        </div>
        <div className="flex flex-col space-y-1 justify-center items-center lg:justify-start lg:items-start lg:pt-[2rem]">
        <span className="font-semibold text-xl text-gray-600">SHOP</span>
          <a
            href="/Men-Suits"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Men Suit
          </a>
          <a
            href="/Men-Shirt"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Men Shirt
          </a>
          <a
            href="/Men-Tshirt"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Men T-shirt
          </a>
          <a
            href="/Women-Tops"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Women's Tops
          </a>
          <a
            href="/Women-Shirt"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Women Shirt
          </a>
        </div>
        <div className="flex flex-col space-y-1 justify-center items-center lg:justify-start lg:items-start">
        <span className="font-semibold text-xl text-gray-600">
            Customer Service
          </span>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Contact Us
          </a>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            About Us
          </a>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Return Policy
          </a>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Shipping Policy
          </a>
        </div>
        <div className="flex flex-col space-y-1 justify-center items-center lg:justify-start lg:items-start lg:pt-[2rem]">
        <span className="font-semibold text-xl text-gray-600">POLICY</span>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Terms and Conditions
          </a>
          
          <img className="pt-2 w-44" src={pay} alt="pay.png"/>
        </div>
      </div>
      {/*bg-[#F1F5F9]*/}
      {/* <div className="flex flex-col lg:flex-wrap lg:flex-row space-y-3 justify-center items-center pt-7">
        <div>
          <img
            className="h-16 cursor-pointer hover:opacity-80"
            src={titlePng}
            alt="title"
          />
        </div>
        <div className="flex text-center text-gray-600 text-md justify-center items-center max-w-[40vw] lg:w-44">
          Get Craze for Cart!! Exclusive Fashion Products only on CartCraze
        </div>
        <div className="pt-7 space-y-3 flex flex-col justify-center items-center">
          <span className="font-semibold text-xl text-gray-600">SHOP</span>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            T-Shirts
          </a>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Furniture
          </a>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Men's Wear
          </a>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Women's Wear
          </a>
          <a
            href="/"
            className="text-md text-neutral-600 hover:text-black cursor-pointer hover:underline"
          >
            Hoodies
          </a>
        </div>
        <div className="pt-7 space-y-3 flex flex-col justify-center items-center">
        
        </div>
        <div className="pt-7 space-y-3 flex flex-col justify-center items-center">
          
        </div>
        <div className="max-w-[45vw] lg:hidden">
          <img src={pay} alt="pay" />
        </div>
      </div> */}
    </div>
  );
}

export default FooterComp;
