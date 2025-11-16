import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ShopSidebar from '../../components/layout/ShopSidebar';

export default function OrdersPage() {
  const orders = [
    { id: 12, status: 'รายละเอียด', stage: 'ตำเนินการด้า', type: 'รอดำเนินการ' },
    { id: 11, status: 'รายละเอียด', stage: 'ตำเนินการด้า', type: 'ตอบรับแล้ว' },
    { id: 10, status: 'รายละเอียด', stage: 'จัดส่งสินค้า', type: 'พร้อมแล้ว' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <ShopSidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">จัดการออเดอร์</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-700 rounded-lg p-4 lg:p-6">
                  <div className="mb-4">
                    <h3 className="text-white text-lg font-bold mb-3">
                      {order.type}
                    </h3>
                    <p className="text-white text-xl font-bold mb-4">ORDER #{order.id}</p>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/shop/checkout/${order.id}`}
                        className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition text-sm"
                      >
                        {order.status}
                      </Link>
                      <button className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition text-sm">
                        {order.stage}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}