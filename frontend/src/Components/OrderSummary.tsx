interface OrderSummaryProps {
    userName: string;
    email: string;
    phone: string;
    address: string;
    date: string;
    orderNumber: number;
    state: string;
    district: string;
    totalPrice: number;
    orderItems: {
      product: {
        title: string;
        newPrice: number;
      };
      quantity: number;
      size: string;
}
}
function OrderSummary({userName, email, phone, district, state, address, orderNumber, orderItems, totalPrice}: OrderSummaryProps) {
  const taxRate = 0.05;
  const taxAmount = totalPrice * taxRate;
  const payableAmount = totalPrice + taxAmount;
  return (
    <div className="w-full max-w-lg mx-auto">
    <div className="rounded-lg shadow-lg p-12 text-xs mt-8 mx-4 sm:mx-0 bg-white">
      <div>
        <div className="flex flex-col">
          <h1 className="text-gray-800 text-xl font-medium mb-2">
            Receipt
          </h1>
          <p className="text-gray-600 text-xs">Date: 18.07.24</p>
          <p className="text-gray-600 text-xs">
            Order Number: {orderNumber}
          </p>
          <p className="text-gray-600 text-xs">
            To: {userName}
          </p>
          <p className="text-gray-600 text-xs">
            Email: {email}
          </p>
          <p className="text-gray-600 text-xs">
            Phone: {phone}
          </p>
          
          <p className="text-gray-600 text-xs">
            Address: {address}, {district}, {state}
          </p>

        </div>
        <hr className="my-4" />
        <div>
          {orderItems?.map((item, index:number) => (
            <div key={index}>
          <div className="flex justify-between items-center">
            <span className="font-medium text-[12px]">
             {item.product.title}({item.size})
            </span>
            <span className="text-base font-medium">₹{item.product.newPrice}</span>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <span>*Quantity:</span>
            <span className="">{item.quantity}</span>
          </div>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between items-center">
            <span>Shipping Costs:</span>
            <span className="">FREE</span>
          </div>
          <div className="mb-2 flex justify-between items-center">
            <span>Taxes (5%)</span>
            <span className="">₹{taxAmount.toFixed(1)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-medium">₹{payableAmount}/-</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default OrderSummary