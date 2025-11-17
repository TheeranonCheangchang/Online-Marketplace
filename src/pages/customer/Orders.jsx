import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Orders() {
  const [orders] = useState([
    {
      id: 6,
      date: '21/12/2025',
      items: [
        { name: 'Shirt Sakura', quantity: 1, price: 200 },
        { name: 'Shirt & boy', quantity: 1, price: 100 }
      ],
      shippingFee: 15,
      discount: 15,
      total: 370,
      status: 'delivered' // pending, processing, shipped, delivered, cancelled
    },
    {
      id: 7,
      date: '21/12/2025',
      items: [
        { name: 'Shirt Fuji', quantity: 2, price: 200 }
      ],
      shippingFee: 15,
      discount: 0,
      total: 270,
      status: 'shipped'
    },
    {
      id: 8,
      date: '21/12/2025',
      items: [
        { name: 'Shirt Mountain', quantity: 1, price: 250 }
      ],
      shippingFee: 20,
      discount: 0,
      total: 270,
      status: 'processing'
    }
  ]);

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'รอดำเนินการ',
      processing: 'กำลังเตรียมสินค้า',
      shipped: 'กำลังจัดส่ง',
      delivered: 'จัดส่งแล้ว',
      cancelled: 'ยกเลิก'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} isAdmin={false} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">ประวัติการสั่งซื้อ</h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <Package size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">ยังไม่มีประวัติการสั่งซื้อ</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <p className="font-bold text-lg">ORDER #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">จำนวน: {item.quantity}</p>
                          </div>
                          <p className="font-bold">฿{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ค่าจัดส่ง</span>
                        <span>฿{order.shippingFee}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">ส่วนลด</span>
                          <span className="text-green-600">-฿{order.discount}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>ยอดรวมทั้งหมด</span>
                        <span className="text-[#FF9B8A]">฿{order.total}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/order/${order.id}`}
                        className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
                      >
                        ดูรายละเอียด
                      </Link>
                      {order.status === 'delivered' && (
                        <Link
                          to={`/review/${order.id}`}
                          className="flex-1 text-center bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                          รีวิวสินค้า
                        </Link>
                      )}
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <button
                          onClick={() => {
                            if (confirm('ต้องการยกเลิกคำสั่งซื้อนี้?')) {
                              alert('ยกเลิกคำสั่งซื้อเรียบร้อย');
                            }
                          }}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                          ยกเลิกคำสั่งซื้อ
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
