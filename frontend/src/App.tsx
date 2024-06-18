import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/AuthRoutes/signin";
import Home from "./pages/home";
import WishList from "./pages/UserRoutes/wishList";
import Cart from "./pages/UserRoutes/cart";
import Tshirts from "./pages/ProductsRoutes/tshirts";
import Furniture from "./pages/ProductsRoutes/furniture";
import Hoodies from "./pages/ProductsRoutes/hoodies";
import MensWear from "./pages/ProductsRoutes/menswear";
import WomensWear from "./pages/ProductsRoutes/womenswear";
import Sweatshirt from "./pages/ProductsRoutes/sweatshirts";
import Signup from "./pages/AuthRoutes/signup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/wishlist" element={<WishList />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/tshirts" element={<Tshirts />}></Route>
          <Route path="/furniture" element={<Furniture />}></Route>
          <Route path="/hoodies" element={<Hoodies />}></Route>
          <Route path="/menswear" element={<MensWear />}></Route>
          <Route path="/womenswear" element={<WomensWear />}></Route>
          <Route path="/sweatshirts" element={<Sweatshirt />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
