// ============================================
// FILE: pages/customer/Cart.jsx (FIXED)
// ============================================
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      shop: 'ร้านขายเสื้อร้านเด็ดเจ้าเก่า',
      items: [
        {
          id: 1,
          name: 'Shirt Fuji & Sakura',
          price: 100,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'
        },
        {
          id: 2,
          name: 'ของทุกแบบหมดหรับัคว',
          price: 35,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100'
        }
      ]
    },
    {
      id: 2,
      shop: 'ร้านบีมนนด',
      items: [
        {
          id: 3,
          name: 'ของทุกแบบหมดหรับัคว',
          price: 35,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100'
        }
      ]
    }
  ]);

  const updateQuantity = (shopId, itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(shop => {
      if (shop.id === shopId) {
        return {
          ...shop,
          items: shop.items.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        };
      }
      return shop;
    }));
  };

  const removeItem = (shopId, itemId) => {
    setCartItems(cartItems.map(shop => {
      if (shop.id === shopId) {
        const newItems = shop.items.filter(item => item.id !== itemId);
        return { ...shop, items: newItems };
      }
      return shop;
    }).filter(shop => shop.items.length > 0));
  };

  const calculateShopTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((sum, shop) => sum + calculateShopTotal(shop.items), 0);
  };

  const totalItems = cartItems.reduce((sum, shop) => 
    sum + shop.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('ตะกร้าสินค้าว่างเปล่า');
      return;
    }

    // เตรียมข้อมูลสำหรับส่งไปหน้า Checkout
    const checkoutData = {
      items: cartItems,
      subtotal: calculateGrandTotal(),
      shippingFee: 50, // ค่าจัดส่งแบบคงที่ หรือคำนวณตามจริง
      total: calculateGrandTotal() + 50
    };

    // นำทางไปหน้า Checkout พร้อมส่งข้อมูล
    navigate('/checkout', { state: checkoutData });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={totalItems} />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <ShoppingBag size={32} />
          ตะกร้าสินค้า
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-4">ตะกร้าสินค้าว่างเปล่า</p>
                <Link 
                  to="/" 
                  className="inline-block bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  เริ่มช้อปปิ้ง
                </Link>
              </div>
            ) : (
              cartItems.map((shop) => (
                <div key={shop.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Shop Header */}
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                    <h3 className="font-semibold flex items-center gap-2">
                      <ShoppingBag size={18} />
                      {shop.shop}
                    </h3>
                  </div>

                  {/* Items */}
                  <div className="divide-y">
                    {shop.items.map((item) => (
                      <div key={item.id} className="p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          {/* Image */}
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold mb-1 truncate">{item.name}</h4>
                            <p className="text-gray-600">฿{item.price}</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(shop.id, item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(shop.id, item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="w-20 text-right font-semibold">
                            ฿{item.price * item.quantity}
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => removeItem(shop.id, item.id)}
                            className="text-red-500 hover:text-red-600 p-2 transition-colors"
                            title="ลบสินค้า"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shop Total */}
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">รวมจาก {shop.shop}</span>
                      <span className="font-bold text-lg">฿{calculateShopTotal(shop.items)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">สรุปคำสั่งซื้อ</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">ยอดรวมสินค้า</span>
                  <span className="font-semibold">฿{calculateGrandTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">จำนวนสินค้า</span>
                  <span className="font-semibold">{totalItems} ชิ้น</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ค่าจัดส่ง</span>
                  <span className="font-semibold">฿50</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold">ยอดรวมทั้งหมด</span>
                    <span className="font-bold text-[#FF9B8A]">฿{calculateGrandTotal() + 50}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                ดำเนินการสั่งซื้อ
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                ชำระเงินปลอดภัย 100%
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
