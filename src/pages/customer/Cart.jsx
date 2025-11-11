import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Cart() {
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
          name: 'ของทุกเเบมหมดหรับัคว',
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
          name: 'ของทุกเเบมหมดหรับัคว',
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={totalItems} />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span>🛒</span> ตะกร้าสินค้า
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <p className="text-gray-500 text-lg mb-4">ตะกร้าสินค้าว่างเปล่า</p>
                <Link to="/" className="text-blue-600 hover:underline">
                  กลับไปช็อปปิ้ง
                </Link>
              </div>
            ) : (
              cartItems.map((shop) => (
                <div key={shop.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Shop Header */}
                  <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                    <h3 className="font-semibold">{shop.shop}</h3>
                  </div>

                  {/* Items */}
                  <div className="divide-y">
                    {shop.items.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex items-center gap-4">
                          {/* Image */}
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />

                          {/* Info */}
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{item.name}</h4>
                            <p className="text-gray-600">{item.price} บาท</p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(shop.id, item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(shop.id, item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="w-24 text-right font-semibold">
                            {item.price * item.quantity}
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => removeItem(shop.id, item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            ลบ
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right - Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">ยอดรวม</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span>จำนวน</span>
                  <span className="font-semibold">{totalItems} สินค้า</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>รวมสุทธิ</span>
                  <span className="font-semibold">{calculateGrandTotal()} บาท</span>
                </div>
              </div>

              <button className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                <span>🛍️</span>
                ชั้งซื้อสินค้า
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}