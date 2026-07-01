import Hero from "../../components/home/Hero/Hero";
import SearchBar from "../../components/home/Search/SearchBar";
import Categories from "../../components/home/Categories/Categories";
import TrendingProducts from "../../components/home/Trending/TrendingProducts";
import BestSeller from "../../components/home/BestSeller/BestSeller";
import WhyChooseUs from "../../components/home/WhyChooseUs/WhyChooseUs";
import CustomerReviews from "../../components/home/Reviews/CustomerReviews";
import DeliveryArea from "../../components/home/Delivery/DeliveryArea";
import FoodGallery from "../../components/home/Gallery/FoodGallery";
import Footer from "../../components/home/Footer/Footer";

const Home = () => {

    return (

        <main className="bg-slate-950 text-white overflow-x-hidden">

            <Hero />

            <SearchBar />

            <Categories />

            <TrendingProducts />

            <BestSeller />

            <WhyChooseUs />

            <CustomerReviews />

            <DeliveryArea />

            <FoodGallery />

            <Footer />

        </main>

    );

};

export default Home;