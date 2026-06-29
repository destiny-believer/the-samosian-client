import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/hero/HeroSection";
import Categories from "../../components/category/Categories";
import MainLayout from "../../layouts/MainLayout";
import PopularProducts from "../../components/product/PopularProducts";
import WhyChooseUs from "../../components/whyChooseUs/WhyChooseUs";
import Reviews from "../../components/reviews/Reviews";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <MainLayout>
      <Navbar />
      <HeroSection />
      <Categories />
      <PopularProducts />
      <WhyChooseUs />
      <Reviews />
      <Footer />
    </MainLayout>
  );
};

export default Home;