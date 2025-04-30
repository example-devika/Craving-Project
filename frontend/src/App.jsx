import './index.css'
import Navbar from './components/Navbar/Navbar'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Placeorder from './pages/Placeorder/Placeorder.jsx'
import Cart from './pages/cart/Cart'
import Footer from './components/Footer/Footer'
import Loginpopup from './components/Loginpopup/Loginpopup'
import { useState } from 'react'
import Verify from './pages/verification/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'



function App() {
  const [showLogin,setShowLogin]=useState(false)
  

  return (
    <>
  <div className="app">
  {
    showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>
  }
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/order" element={<Placeorder/>}/>
      <Route path="/verify" element={<Verify/>}/>
      <Route path='myorders' element={<MyOrders/>}/>
    </Routes>
  <Footer/>

  </div>
  </>
  )
}

export default App
