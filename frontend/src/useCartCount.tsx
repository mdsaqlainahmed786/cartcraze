// src/hooks/useCartCount.ts
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { CartCountState } from '../src/RecoilStateProviders/CartCount';
const useCartCount = () => {
  const [cartCount, setCartCount] = useRecoilState(CartCountState);


  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`, {
          withCredentials: true,
        });
        if (!res.data.userName && !res.data.userEmail) {
          setCartCount(0);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuthStatus();
  }, [ setCartCount]);

  useEffect(() => {
    // const token = Cookies.get('Secret_Auth_token');
    // if (!token) {
    //    return setCartCount(0);
    // }
  
    const fetchCartCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/cart/getcart`, {
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
