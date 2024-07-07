import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Authentication/signin";
import Home from "./pages/home";
import WishList from "./pages/wishList";
import Cart from "./pages/cart";
import { RecoilRoot } from "recoil";
import Signup from "./pages/Authentication/signup";
import MenSuit from "./pages/products/mensuit";
import MenShirt from "./pages/products/menshirt";
import MensTshirt from "./pages/products/mentshirt";
import MensBottom from "./pages/products/mensbottom";
import WomenTeesTops from "./pages/products/womenteestops";
import WomenShirt from "./pages/products/womenshirt";
import ProductDetail from "./pages/products/[specificProduct]";
import { Toaster } from "react-hot-toast";
import Verify from "./pages/Authentication/verify";

import ForgotPassword from "./pages/Authentication/forgotpassword";
import ResetPassword from "./pages/Authentication/reset_password";
import Checkout from "./pages/checkout";
function App() {
  return (
    <>
      <RecoilRoot>
        <Toaster position="top-right" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/wishlist" element={<WishList />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/forgot_password" element={<ForgotPassword/>}></Route>
            <Route path="/verify/:Token" element={<Verify />}></Route>
            <Route path="/reset_password/:Token" element={<ResetPassword />}></Route>
            <Route path="/womensshirt" element={<WomenShirt />}></Route>
            <Route path="/womenstees&tops" element={<WomenTeesTops />}></Route>
            <Route path="/mensbottom" element={<MensBottom />}></Route>
            <Route path="/menssuit" element={<MenSuit />}></Route>
            <Route path="/mensshirt" element={<MenShirt />}></Route>
            <Route path="/menstshirt" element={<MensTshirt />}></Route>
            <Route
              path="/product/:productName"
              element={<ProductDetail />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
