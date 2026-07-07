import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Auth/Login";
import Checkout from "../pages/Checkout/Checkout";
import MyOrders from "../pages/MyOrders/MyOrders";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import TrackOrder from "../pages/TrackOrder/TrackOrder";
import Addresses from "../pages/Address/Addresses";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import EditProfile from "../pages/customer/Account/EditProfile";
import Account from "../pages/customer/Account/Account";
import Favorites from "../pages/customer/Favorites/Favorites";
import BottomNavbar from "../components/navigation/BottomNavbar";
import Orders from "../pages/Orders/Orders";
import Wishlist from "../pages/customer/WishList";
import HelpSupport from "../pages/HelpSupport/HelpSupport";
import About from "../pages/customer/About/About";
import Notifications from "../pages/customer/Notifications/Notifications";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      
      <Routes>

        <Route
          path="/home"
          element={<Home />}
        />

        <Route path="/menu" element={<Menu />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/track-order/:id" element={<TrackOrder />} />
        <Route path="/Addresses" element={<Addresses />} />
        <Route
          path="/order-success/:id"
          element={
            <OrderSuccess />
          }
        />

        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/account" element={<Account />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/about-samosian" element={<About />}/>
        <Route path="/notifications" element={<Notifications />}/>
      </Routes>
      <BottomNavbar />
    </BrowserRouter>
  );
};

export default AppRoutes;