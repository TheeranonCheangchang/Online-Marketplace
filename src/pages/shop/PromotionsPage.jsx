import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ShopSidebar from '../../components/layout/ShopSidebar';

export default function PromotionsPage() {
  const promotions = [
    { id: 1, name: 'Mid-Year Sale', discount: 20, startDate: '1/10/2525', endDate: '31/10/2025', status: 'ใช้งาน', active: true },
    { id: 2, name: 'Summer-Year Sale', discount: 15, startDate: '1/6/2525', endDate: '31/6/2025', status: 'รอเริ่ม', active: false },
    { id: 3, name: 'New-Year Sale', discount: 30, startDate: '1/1/2525', endDate: '31/1/2025', status: 'สิ้นสุด', active: false },
    { id: 4, name: 'Last-Year Sale', discount: 30, startDate: '1/12/2525', endDate: '31/12/2025', status: 'ปิดใช้งาน', active: false }
  ];

  const handleToggle = (id) => {
    console.log('Toggle promotion:', id);
    alert('เปิด/ปิดโปรโมชั่น');
  };

  const handleDelete = (id) => {
    if (confirm('ต้องการลบโปรโมชั่นนี้?')) {
      console.log('Delete promotion:', id);
      alert('ลบโปรโมชั่นเรียบร้อย');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <ShopSidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-700 rounded-lg p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h2 className="text-white text-xl lg:text-2xl font-bold">ชื่อโปรโมชั่น</h2>
                <Link
                  to="/shop/promotions/create"
                  className="bg-orange-400 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-orange-500 transition text-sm lg:text-base whitespace-nowrap"
                >
                  สร้างโปรโมชัน
                </Link>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white py-3 px-2">ชื่อโปรโมชั่น</th>
                      <th className="text-left text-white py-3 px-2">มูลค่า</th>
                      <th className="text-left text-white py-3 px-2">ระยะเวลา</th>
                      <th className="text-left text-white py-3 px-2">สถานะ</th>
                      <th className="text-left text-white py-3 px-2">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotions.map((promo) => (
                      <tr key={promo.id} className="border-b border-gray-600">
                        <td className="text-white py-4 px-2">{promo.name}</td>
                        <td className="text-white py-4 px-2">{promo.discount}</td>
                        <td className="text-white py-4 px-2 text-sm">
                          เริ่ม {promo.startDate}<br/>จบ {promo.endDate}
                        </td>
                        <td className="text-white py-4 px-2">{promo.status}</td>
                        <td className="py-4 px-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleToggle(promo.id)}
                              className="bg-orange-300 text-white px-3 py-1 rounded hover:bg-orange-400 transition text-sm"
                            >
                              เปิด
                            </button>
                            <button
                              onClick={() => handleDelete(promo.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                            >
                              ลบ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {promotions.map((promo) => (
                  <div key={promo.id} className="bg-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-bold">{promo.name}</h3>
                        <p className="text-gray-300 text-sm">มูลค่า: {promo.discount}</p>
                      </div>
                      <span className="text-white text-sm bg-gray-700 px-2 py-1 rounded">{promo.status}</span>
                    </div>
                    <div className="text-gray-300 text-sm mb-3">
                      <p>เริ่ม {promo.startDate}</p>
                      <p>จบ {promo.endDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggle(promo.id)}
                        className="flex-1 bg-orange-300 text-white px-3 py-2 rounded hover:bg-orange-400 transition text-sm"
                      >
                        เปิด
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-sm"
                      >
                        ลบ
                      </button>
                    </div>
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