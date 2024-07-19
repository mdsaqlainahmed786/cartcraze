

interface CartSummaryProps {
  toCheckout: () => void;
  fetchProducts: () => void;
  totalAmount: number;
  cartItemsLength:number
}

function CartSummary({ toCheckout,cartItemsLength, totalAmount}: CartSummaryProps) {
  const taxRate = 0.05;
  const taxAmount = totalAmount * taxRate;
  const payableAmount = totalAmount + taxAmount;


  return (
    <div className="space-y-2 border-2 mt-5 p-4 rounded-md shadow-md">
      <div className="flex w-full justify-between text-sm">
        <span>Cart Total ({cartItemsLength})</span>
        <span>₹{totalAmount.toFixed(0)}/-</span>
      </div>
      <div className="flex w-full justify-between text-sm">
        <span>Tax (5%)</span>
        <span>₹{taxAmount.toFixed(0)}/-</span>
      </div>
      <div className="flex w-full justify-between text-sm">
        <span>Shipping</span>
        <span>FREE</span>
      </div>
      <hr />
      <div className="flex justify-between w-full font-semibold text-lg">
        <div className="flex flex-col justify-center items-center -space-y-1.5">
          <span>Payable Amount</span>
          <span className="text-[13px] text-neutral-600">(Includes Taxes)</span>
        </div>
        <span>₹{payableAmount.toFixed(0)}/-</span>
      </div>
      <hr />
      <div className="flex bg-white pt-1 justify-center max-w-[90vw]">
        <div className="flex justify-between items-center space-x-16">
          <span className="font-semibold">Total Payment: ₹{payableAmount.toFixed(0)}/-</span>
          <button
            onClick={toCheckout}
            className="bg-gray-700 text-white px-8 p-1 rounded-full hover:bg-black"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
