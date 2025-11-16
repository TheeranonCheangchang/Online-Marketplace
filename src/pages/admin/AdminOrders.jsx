import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminOrders() {
  const orders = [
    { id: 1, shop: 'ร้านขายเสื้อร้านเติมเจ้าเก่า', status: 'อนุมัติ', detail: 'รายละเอียด' },
    { id: 2, shop: 'ร้านรุ่งเรืองพาณิชย์', status: 'รออนุมัติ', detail: 'รายละเอียด' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">จัดการออเดอร์</h1>

            {/* Table Header */}
            <div className="bg-gray-700 rounded-t-xl">
              <div className="grid grid-cols-3 gap-4 px-6 py-4 text-white font-bold">
                <div>ชื่อร้านค้า</div>
                <div className="text-center">สถานะ</div>
                <div className="text-center">รายละเอียด</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="bg-gray-600 rounded-b-xl divide-y divide-gray-500">
              {orders.map((order) => (
                <div key={order.id} className="grid grid-cols-3 gap-4 px-6 py-4 items-center">
                  <div className="text-white font-medium">{order.shop}</div>
                  <div className="text-center">
                    <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                      order.status === 'อนุมัติ' 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-center">
                    <button className="bg-[#FF9B8A] hover:bg-[#FF8A77] text-white px-6 py-2 rounded-lg transition-colors">
                      {order.detail}
                    </button>
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