import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function AdminOrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const orderData = {
    id: orderId || '6',
    date: '21/12/2025',
    customer: 'นายธีรนนท์ เชื้องช้าง',
    address: 'หอพักสุดาภัทพี, เลขที่ 130/149, หมู่ที่ 4, ซอย บิบูยา-ปรานิ, ตำบลรังสีต, อำเภอริบูริ ตำบลรังสีต, อำเภอริบูริ, จังหวัดปทุมธานี, 12110',
    items: [
      { name: 'Shirt Sakura', price: 200, quantity: 1, total: 200 },
      { name: 'Shirt & boy', price: 100, quantity: 1, total: 100 }
    ],
    shippingFee: 15,
    discount: 15,
    total: 370,
    paymentStatus: 'บริษัทชนส่งแห่งหนึ่ง'
  };

  const handleBack = () => {
    navigate('/admin/orders');
  };

  const handlePrintShipping = () => {
    alert('พิมพ์ใบส่งของ');
  };

  const handlePrintReceipt = () => {
    alert('พิมพ์ใบเสร็จ');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} isAdmin={true} />

      <div className="flex-1 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left - Address Info */}
            <div className="flex-1 bg-gray-700 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">ที่อยู่ในการจัดส่ง</h2>
              <p className="font-bold mb-2">{orderData.customer}</p>
              <p className="text-sm leading-relaxed">{orderData.address}</p>

              <div className="mt-6 pt-6 border-t border-gray-600">
                <p className="text-sm mb-2">ขนส่งที่ใช้บริการ</p>
                <p className="font-bold">{orderData.paymentStatus}</p>
              </div>
            </div>

            {/* Right - Order Summary */}
            <div className="flex-1 bg-gray-700 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-xl font-bold">ยอดรวม</h2>
                <div className="text-right text-gray-400 text-sm">
                  <p>ORDER #{orderData.id}</p>
                  <p>{orderData.date}</p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {orderData.items.map((item, index) => (
                  <div key={index} className="border-b border-gray-600 pb-3">
                    <div className="flex justify-between text-white mb-1">
                      <span>{item.name}</span>
                      <span className="font-bold">{item.total}</span>
                    </div>
                    <p className="text-gray-400 text-sm">จำนวน: {item.price} x {item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Fees */}
              <div className="space-y-2 text-white mb-4">
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span>{orderData.shippingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าส่วนลด</span>
                  <span>{orderData.discount}</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-600 pt-4 mb-6">
                <div className="flex justify-between text-white text-xl font-bold">
                  <span>ยอดรวมสุทธิ:</span>
                  <span>{orderData.total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg transition-colors"
                >
                  ย้อนกลับ
                </button>
                <button
                  onClick={handlePrintShipping}
                  className="flex-1 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white py-3 rounded-lg transition-colors"
                >
                  พิมพ์ใบส่งของ
                </button>
                <button
                  onClick={handlePrintReceipt}
                  className="flex-1 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white py-3 rounded-lg transition-colors"
                >
                  พิมพ์ใบเสร็จ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}