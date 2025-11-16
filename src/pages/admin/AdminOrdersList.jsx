import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminOrdersList() {
  const navigate = useNavigate();

  const orders = [
    { id: 6, date: '21/12/2025', total: 270 },
    { id: 7, date: '21/12/2025', total: 270 },
    { id: 8, date: '21/12/2025', total: 270 }
  ];

  const handleViewDetail = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} isAdmin={true} />

      <div className="flex-1 flex">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-700 rounded-xl p-6">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <div className="grid grid-cols-4 gap-4 mb-4 text-white font-bold">
                  <div>เลขที่คำสั่งซื้อ</div>
                  <div>วันที่สั่งซื้อ</div>
                  <div>ยอดรวม</div>
                  <div className="text-center">รายละเอียด</div>
                </div>

                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <div className="font-bold">ORDER #{order.id}</div>
                        <div>{order.date}</div>
                        <div>{order.total}</div>
                        <div className="text-center">
                          <button
                            onClick={() => handleViewDetail(order.id)}
                            className="bg-[#FF9B8A] hover:bg-[#FF8A77] text-white px-6 py-2 rounded-lg transition-colors"
                          >
                            รายละเอียด
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-gray-200 rounded-lg p-4">
                    <div className="mb-3">
                      <p className="font-bold text-lg">ORDER #{order.id}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                      <p className="text-lg font-bold mt-2">฿{order.total}</p>
                    </div>
                    <button
                      onClick={() => handleViewDetail(order.id)}
                      className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] text-white py-2 rounded-lg transition-colors"
                    >
                      รายละเอียด
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
