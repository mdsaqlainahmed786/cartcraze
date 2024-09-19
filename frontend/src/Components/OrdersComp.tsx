interface OrdersCompProps {
    imgSrc: string;
    title: string;
    category: string;
    newPrice: number;
    oldPrice: number;
    size: string;
    quantity: number;
}
function OrdersComp({imgSrc, title, category, newPrice, oldPrice, size, quantity}: OrdersCompProps) {
    return (
        <>
          <div className="flex md:w-[60vw] w-full border-2 rounded-md space-x-2 shadow-md">

              <img className="h-64 w-56 md:h-full md:w-56" src={imgSrc} alt="img" />
         
            <div className="w-full flex space-y-1 py-2 px-1 flex-col justify-start">
              <span className="my-1 text-[17px] md:text-[26px]">{title}</span>
              <span className="text-neutral-600 text-sm">{category}</span>
              <div className="flex flex-row items-center py-2">
                <span className="font-semibold text-sm md:text-xl">
                  ₹{newPrice}/-
                </span>
                <span className="ml-2 text-sm text-neutral-500">
                  <span className="text-[11px] mx-0.5">M.R.P:</span>
                  <s>₹{oldPrice}/-</s>
                </span>
              </div>
              <span className="text-sm font-light md:text-xl">
                FREE Delivery By CartCraze
              </span>
              <div className="w-full flex flex-row space-x-5 items-center pt-2.5">
                <div className='border p-2 border-black rounded-lg'>Size: {size}</div>
                <div className='border p-2 border-black rounded-lg'>Qty: {quantity}</div>
              </div>
              <span className='text-sm pt-1 text-slate-500'>Estimated Delivery: 8 days</span>
            </div>
          </div>
        </>
      );
}

export default OrdersComp