import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'
import CompanyDetails from './Components/CompanyDetails/CompanyDetails';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import OfficeDetails from './Components/OfficeDetails/OfficeDetails';
import About from './Components/About/About';
import Contact from './Components/ContactDetails/Contact'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
       <Navbar />
      <Routes>
        <Route path='/'  element={<Shop />}/>
        <Route path="/men" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/women" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kids_banner} category="kid" />} />
        <Route path="/product" element={<Product/>} >
          <Route path=":productId" element={<Product/>} />
        </Route>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<LoginSignup/>}/>
        <Route path="/company" element={<CompanyDetails />} />
        <Route path="/products" element={<ProductDetails />} />
        <Route path="/offices" element={<OfficeDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />


      </Routes>
      <Footer />
      
      </BrowserRouter>
    
  )
}

export default App;
