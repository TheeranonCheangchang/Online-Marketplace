import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Package } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Checkout() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'บ้าน',
      recipient: 'สมชาย ใจดี',
      phone: '081-234-5678',
      address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
      isDefault: true
    }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    recipient: '',
    phone: '',
    address: ''
  });

  // Mock cart items
  const cartItems = [
    {
      shop: 'ร้านขายเสื้อร้านเด็ดเจ้าเก่า',
      items: [
        {
          id: 1,
          name: 'Shirt Fuji & Sakura',
          price: 100,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'
        }
      ]
    },
    {
      shop: 'ร้านบีมนนด',
      items: [
        {
          id: 2,
          name: 'ของทุกเเบมหมดหรับัคว',
          price: 35,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100'
        }
      ]
    }
  ];

  const shippingFee = 30;
  const discount = 15;
  const subtotal = cartItems.reduce((sum, shop) => 
    sum + shop.items.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0), 0
  );
  const total = subtotal + shippingFee - discount;

  const handleSaveAddress = () => {
    if (!newAddress.recipient || !newAddress.phone || !newAddress.address) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const newAddr = {
      id: addresses.length + 1,
      name: 'ที่อยู่ใหม่',
      ...newAddress,
      isDefault: false
    };

    setAddresses([...addresses, newAddr]);
    setNewAddress({ recipient: '', phone: '', address: '' });
    setShowAddressForm(false);
    alert('บันทึกที่อยู่เรียบร้อย');
  };

  const handleCheckout = () => {
    navigate('/payment-method');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <Package size={32} />
          ทำการสั่งซื้อ
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Address & Order */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">ที่อยู่ในการจัดส่ง</h2>

              {/* Address List */}
              <div className="space-y-3 mb-4">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddress(addr.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedAddress === addr.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{addr.recipient}</h3>
                        <p className="text-gray-600 text-sm mb-1">{addr.phone}</p>
                        <p className="text-gray-600 text-sm">{addr.address}</p>
                      </div>
                      {selectedAddress === addr.id && (
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 ml-2">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Add Address Form */}
              {showAddressForm ? (
                <div className="border-t pt-4 space-y-3">
                  <input
                    type="text"
                    placeholder="ระบุชื่อผู้รับปลายทาง"
                    value={newAddress.recipient}
                    onChange={(e) => setNewAddress({...newAddress, recipient: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="กรุณากรอกที่อยู่ผู้จัดส่ง"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="ที่อยู่ผู้รับ"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                    rows="3"
                    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveAddress}
                      className="flex-1 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-semibold py-2 rounded-lg transition-colors"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  + เลือกที่อยู่ในจัดส่ง
                </button>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">ยอดรวม</h2>
              {cartItems.map((shop, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="font-semibold mb-3">{shop.shop}</h3>
                  <div className="space-y-3">
                    {shop.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-gray-600 text-sm">จำนวน: {item.price} x {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">ยอดรวม</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span>{shippingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าส่วนลด</span>
                  <span className="text-green-600">-{discount}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>ยอดรวมสุทธิ</span>
                  <span>{total}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-semibold py-4 rounded-xl transition-colors"
              >
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}