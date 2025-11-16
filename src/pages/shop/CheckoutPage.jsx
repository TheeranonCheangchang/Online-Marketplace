import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ShopSidebar from '../../components/layout/ShopSidebar';

export default function CheckoutPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [cartItems] = useState([
    { id: 1, name: 'Shirt Fuji & Sakura', price: 350, quantity: 4, total: 1400 },
    { id: 2, name: 'Shirt Fuji & boy', price: 500, quantity: 2, total: 1000 }
  ]);

  const deliveryFee = 15;
  const discount = 120;
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const total = subtotal + deliveryFee - discount;

  const handlePrintShipping = () => {
    alert('พิมพ์ใบส่งของสำหรับ ORDER #' + orderId);
  };

  const handlePrintReceipt = () => {
    alert('พิมพ์ใบเสร็จสำหรับ ORDER #' + orderId);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <ShopSidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">รายละเอียดออเดอร์ #{orderId}</h1>
            
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Delivery Address */}
              <div className="flex-1 bg-gray-700 rounded-lg p-4 lg:p-6">
                <h2 className="text-white text-xl lg:text-2xl font-bold mb-4">ที่อยู่ในการจัดส่ง</h2>
                <div className="text-gray-300 text-sm lg:text-base space-y-1">
                  <p className="font-semibold">หอพักสุดาภัทพี, เลขที่ 130/149, หมู่ที่ 4, ซอย</p>
                  <p>บิบูยา-ปรานิ, ตำบลรังสีต, อำเภอริบูริ</p>
                  <p>ตำบลรังสีต, อำเภอริบูริ, จังหวัดปทุมธานี,</p>
                  <p className="font-semibold">12110</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="flex-1 bg-gray-700 rounded-lg p-4 lg:p-6">
                <h2 className="text-white text-xl lg:text-2xl font-bold mb-4">ยอดรวม</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b border-gray-600 pb-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-white font-medium text-sm lg:text-base">{item.name}</span>
                        <span className="text-white font-semibold">{item.total.toLocaleString()}</span>
                      </div>
                      <span className="text-gray-400 text-xs lg:text-sm">จำนวน: {item.price} x {item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Fees */}
                <div className="space-y-2 mb-4 text-sm lg:text-base">
                  <div className="flex justify-between text-white">
                    <span>ค่าจัดส่ง</span>
                    <span>{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>ค่าส่วนลด</span>
                    <span>{discount}</span>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-3 mb-6">
                  <div className="flex justify-between text-white text-lg lg:text-xl font-bold">
                    <span>ยอดรวมสุทธิ:</span>
                    <span>{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate('/shop/orders')}
                    className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition text-sm lg:text-base"
                  >
                    ย้อนกลับ
                  </button>
                  <button
                    onClick={handlePrintShipping}
                    className="flex-1 bg-orange-400 text-white py-3 px-4 rounded-lg hover:bg-orange-500 transition text-sm lg:text-base"
                  >
                    พิมพ์ใบส่งของ
                  </button>
                  <button
                    onClick={handlePrintReceipt}
                    className="flex-1 bg-orange-400 text-white py-3 px-4 rounded-lg hover:bg-orange-500 transition text-sm lg:text-base"
                  >
                    พิมพ์ใบเสร็จ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}