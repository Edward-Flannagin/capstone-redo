import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReservationContext } from "./context/ReservationContext";
import { CartProvider } from "./context/CartContext";

import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home.js";
import Menu from "./pages/Menu.js";
import OrderOnline from "./pages/OrderOnline.js";
import BookingPage from './pages/BookingPage.js';
import Header from './Header.js';
import Footer from './Footer.js';
import AboutPage from './pages/AboutPage.js';
import ReservationWizard from './components/ReservationWizard.jsx';
import PaymentPage from './pages/PaymentPage.js'

import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [reservationData, setReservationData] = useState({
    date: null,
    time: null,
    guests: null,
    occasion: null,
    table: null,
    contact: null
  });

  useEffect(() => {
    console.log("RESERVATION DATA UPDATED:", reservationData);
  }, [reservationData]);

  return (
    <ReservationContext.Provider value={{ reservationData, setReservationData }}>
      <CartProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order-online" element={<OrderOnline />} />
            <Route path="/reservations" element={<ReservationWizard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </CartProvider>
    </ReservationContext.Provider>
  );
}

export default App;