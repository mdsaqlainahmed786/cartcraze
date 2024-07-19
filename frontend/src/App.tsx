import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Authentication/signin";
import Home from "./pages/home";
import { useEffect } from "react";
import WishList from "./pages/wishList";
import Cart from "./pages/cart";
import { useSetRecoilState } from "recoil";
import Signup from "./pages/Authentication/signup";
import ProductDetail from "./pages/products/[specificProduct]";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Verify from "./pages/Authentication/verify";
import ForgotPassword from "./pages/Authentication/forgotpassword";
import ResetPassword from "./pages/Authentication/reset_password";
import Checkout from "./pages/checkout";
import Products from "./pages/products/[products]";
import NotFoundPage from "./pages/NotFoundPage";
import Success from "./pages/success";
import Cancel from "./pages/cancel";
import { emailState, usernameState } from "./RecoilStateProviders/UserDetails";
function App() {
  
  const setUserName = useSetRecoilState(usernameState);
  const setUserEmail = useSetRecoilState(emailState);
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/getuser");
      //console.log(res.data);
      setUserName(res.data.userName);
      setUserEmail(res.data.userEmail);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      
        <Toaster position="top-right" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/wishlist" element={<WishList />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/forgot_password" element={<ForgotPassword />}></Route>
            <Route path="/verify/:Token" element={<Verify />}></Route>
            <Route
              path="/reset_password/:Token"
              element={<ResetPassword />}
            ></Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route
              path="/products/:productCategory"
              element={<Products />}
            ></Route>
            <Route
              path="/product/:productName"
              element={<ProductDetail />}
            ></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
