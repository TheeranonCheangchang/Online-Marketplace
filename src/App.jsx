import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/customer/Home';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import PaymentMethod from './pages/customer/PaymentMethod';
import ReviewProduct from './pages/customer/ReviewProduct';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ShopDashboard from './pages/shop/ShopDashboard';
import ShopRegister from './pages/shop/ShopRegister';
import ShopProducts from './pages/shop/ShopProducts';
import EditProduct from './pages/shop/EditProduct';
import AddProduct from './pages/shop/AddProduct';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/review/:id" element={<ReviewProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop/dashboard" element={<ShopDashboard />} />
        <Route path="/shop/register" element={<ShopRegister />} />
        <Route path="/shop/products" element={<ShopProducts />} />
        <Route path="/shop/products" element={<ShopProducts />} />
        <Route path="/shop/products/add" element={<AddProduct />} />
        <Route path="/shop/products/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;