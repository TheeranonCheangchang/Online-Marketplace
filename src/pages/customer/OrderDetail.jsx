import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Truck } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Mock data
  const order = {
    id: orderId,
    date: '21/12/2025',
    status: 'shipped',
    trackingNumber: 'TH1234567890',
    items: [
      { id: 1, name: 'Shirt Sakura', quantity: 1, price: 200, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200' },
      { id: 2, name: 'Shirt & boy', quantity: 1, price: 100, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200' }
    ],
    shippingAddress: {
      name: 'สมชาย ใจดี',
      phone: '081-234-5678',
      address: 'หอพักสุดาภัทพี, เลขที่ 130/149, หมู่ที่ 4, ซอย บิบูยา-ปรานิ, ตำบลรังสีต, อำเภอริบูริ ตำบลรังสีต, อำเภอริบูริ, จังหวัดปทุมธานี, 12110'
    },
    shippingFee: 15,
    discount: 15,
    subtotal: 300,
    total: 370,
    timeline: [
      { status: 'สั่งซื้อสำเร็จ', date: '21/12/2025 10:00', completed: true },
      { status: 'กำลังเตรียมสินค้า', date: '21/12/2025 11:30', completed: true },
      { status: 'จัดส่งแล้ว', date: '21/12/2025 14:00', completed: true }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} isAdmin={false} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>กลับไปหน้ารายการสั่งซื้อ</span>
          </button>

          {/* Order Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">ORDER #{order.id}</h1>
                <p className="text-gray-600">วันที่สั่งซื้อ: {order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">หมายเลขพัสดุ</p>
                <p className="font-mono font-bold">{order.trackingNumber}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {order.timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      item.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {item.completed && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {item.status}
                      </p>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <MapPin className="text-gray-600 flex-shrink-0" size={20} />
              <h2 className="font-bold text-lg">ที่อยู่จัดส่ง</h2>
            </div>
            <div className="ml-8">
              <p className="font-medium mb-1">{order.shippingAddress.name}</p>
              <p className="text-gray-600 text-sm mb-1">{order.shippingAddress.phone}</p>
              <p className="text-gray-600 text-sm">{order.shippingAddress.address}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-bold text-lg mb-4">รายการสินค้า</h2>
            
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium mb-1">{item.name}</p>
                    <p className="text-sm text-gray-600">จำนวน: {item.quantity}</p>
                  </div>
                  <p className="font-bold">฿{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">ยอดรวมสินค้า</span>
                <span>฿{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ค่าจัดส่ง</span>
                <span>฿{order.shippingFee}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">ส่วนลด</span>
                  <span className="text-green-600">-฿{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold pt-4 border-t">
                <span>ยอดรวมทั้งหมด</span>
                <span className="text-[#FF9B8A]">฿{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}