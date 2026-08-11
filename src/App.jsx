import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactButton from './components/ContactButton';
import Toast from './components/Toast';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Inquiry from './pages/Inquiry';
import Policy from './pages/Policy';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Admin from './pages/Admin';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmed" element={<OrderConfirmation />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
        <ContactButton />
        <Toast />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
