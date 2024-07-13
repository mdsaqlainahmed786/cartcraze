// src/hooks/useCartCount.ts
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { CartCountState } from '../src/RecoilStateProviders/CartCount';
import Cookies from 'js-cookie';
const useCartCount = () => {
  const [cartCount, setCartCount] = useRecoilState(CartCountState);

  useEffect(() => {
    const token = Cookies.get('Secret_Auth_token');
    if (!token) {
       return setCartCount(0);
    }
  
    const fetchCartCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/cart/getcart', {
          withCredentials: true,
        });
        setCartCount(response.data.cartItems.length);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
  }, [setCartCount]);

  return cartCount;
};

export default useCartCount;
