import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/footer";

import {Route, Routes} from 'react-router-dom'
import Home from "./Components/Home/Home";
import Signup from "./Components/SignUp/Signup";
import Login from "./Components/SignUp/Login";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Mens from "./Components/Categories/Cloaths/Mens";
import JeansCloath from "./Components/Categories/Cloaths/Womens";
import YourOrders from "./Components/YourOrders/YourOrders";
import Mobiles from "./Components/Categories/Mobiles/Mobiles";
import UpdateProfile from "./Components/SignUp/Pofile/UpdateProfile";
function App() {

  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/updateprofile" element={<UpdateProfile/>} />
        <Route path="/categories" element={<Categories />}>
          <Route path="/categories/Mens" element={<Mens />} />
          <Route path="/categories/Womens" element={<JeansCloath />} />
          <Route path="/categories/Mobiles" element={<Mobiles />} />

        </Route>
        <Route path="/Cart" element={<Cart />} />
        <Route path="/order" element={<YourOrders/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;