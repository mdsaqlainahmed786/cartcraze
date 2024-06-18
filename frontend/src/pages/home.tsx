import Carousel from "../Components/Carousel";
import Collections from "../Components/CollectionsComponents/Collections";
import Navbar from "../Components/NavComponents/Navbar";
import FeaturedProducts from "../Components/Featuredprod/FeaturedProducts";
import NewArrivals from "../Components/NewArrivals/NewArrivals";
import BenefitsOfSore from "../Components/BenefitsOfStore/BenefitsOfSore";
import FooterComp from "../Components/FooterComp";
function Home() {
  return (
    <>      <Navbar />
      <Carousel />
      <Collections />
      <FeaturedProducts />
      <NewArrivals />
      <BenefitsOfSore />
      <FooterComp />
    </>  );
}

export default Home;
