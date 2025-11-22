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
import CheckoutPage from './pages/shop/CheckoutPage';
import OrdersPage from './pages/shop/OrdersPage';
import PromotionsPage from './pages/shop/PromotionsPage';
import CreatePromotionPage from './pages/shop/CreatePromotionPage';
import ShopRentalPayment from './pages/shop/ShopRentalPayment';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminShops from './pages/admin/AdminShops';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserEmails from './pages/admin/AdminUserEmails';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminOrdersList from './pages/admin/AdminOrdersList';
import AdminOrderDetail from './pages/admin/AdminOrderDetail';
import Profile from './pages/customer/Profile';
import Orders from './pages/customer/Orders';
import OrderDetail from './pages/customer/OrderDetail';
import AdminProducts from './pages/admin/AdminProducts';
import AdminMembers from './pages/admin/AdminMembers';
import ManageReviewsPage from './pages/shop/ManageReviewsPage';

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
        <Route path="/shop/checkout/:orderId" element={<CheckoutPage />} />
        <Route path="/shop/orders" element={<OrdersPage />} />
        <Route path="/shop/promotions" element={<PromotionsPage />} />
        <Route path="/shop/promotions/create" element={<CreatePromotionPage />} />
        <Route path="/shop/rental/payment" element={<ShopRentalPayment />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/shops" element={<AdminShops />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/emails" element={<AdminUserEmails />} />
        <Route path="/admin/coupons" element={<AdminCoupons />} />
        <Route path="/admin/orders" element={<AdminOrdersList />} />
        <Route path="/admin/orders/:orderId" element={<AdminOrderDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/users" element={<AdminMembers />} />
        <Route path="/shop/reviews" element={<ManageReviewsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;