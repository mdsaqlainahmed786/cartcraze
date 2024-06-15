import "./App.css";
import './index.css';
import Carousel from "./Components/Carousel";
import Collections from "./Components/CollectionsComponents/Collections";
import Navbar from "./Components/NavComponents/Navbar";
import FeaturedProducts from "./Components/Featuredprod/FeaturedProducts";
import NewArrivals from "./Components/NewArrivals/NewArrivals";
function App() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Collections/>
      <FeaturedProducts/>
      <NewArrivals/>
    </>
  );
}

export default App;
