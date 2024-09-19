import FooterComp from "../Components/FooterComp";
import Navbar from "../Components/NavComponents/Navbar";
import axios from 'axios'
import { useEffect, useState } from 'react'
import OrdersComp from "../Components/OrdersComp";
import gifLoader from "../assets/loader.gif";
import emptyCart from "../assets/not.png";
import { useNavigate } from "react-router-dom";
function Orders() {
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

  // Define Order type with product and additional order properties
  interface Order {
    product: Product;  // product details are nested under 'product'
    size: string;      // size is directly on the order
    quantity: number;  // quantity is directly on the order
  }

  const [orders, setOrders] = useState<Order[]>([]) // Set state as an array of 'Order'
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/orders/getorders`, {
        withCredentials: true
      })
      console.log(response.data.orders)
      setOrders(response.data.orders)  // Make sure your response structure matches this
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <img src={gifLoader} alt="loader" />
        </div>
        <FooterComp />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pb-24">
        <div className="w-full flex flex-col my-4 space-y-2 justify-center items-center max-w-[80vw] md:max-w-[60vw] pb-2 mx-auto">
          <span className="text-3xl font-medium font-sans md:text-4xl">
            Your Orders ({orders.length})
          </span>
          <span className="text-center text-sm text-gray-400">
            We do not do refunds. If any wrong orders are placed, please contact our customer support.
          </span>
        </div>

        {orders.length === 0 && (
          <div className="flex flex-col justify-center items-center h-[50vh] mx-auto">
            <img className="h-[25vh] md:h-[40vh]" src={emptyCart} alt="No orders" />
            <span className="text-neutral-500 text-[18px] text-center px-5">
              You have no orders!
            </span>
            <button
              onClick={() => navigate("/products/Men-Suits")}
              className="bg-gray-800 hover:bg-black text-white p-2 rounded-md mt-5"
            >
              Go to Products &#10095;
            </button>
          </div>
        )}

        <div className="flex flex-col justify-center items-center space-y-5 mx-auto max-w-[95vw]">
          {orders.map((item, index) => (
            <OrdersComp
              key={index}
              title={item.product.title}          
              imgSrc={item.product.images[0]}   
              category={item.product.category}    
              newPrice={item.product.newPrice}   
              oldPrice={item.product.oldPrice}   
              size={item.size}                   
              quantity={item.quantity}            
            />
          ))}
        </div>
      </div>
      <FooterComp />
    </>
  );
}

export default Orders;
