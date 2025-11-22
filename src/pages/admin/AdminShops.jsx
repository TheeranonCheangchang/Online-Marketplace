import { useState } from 'react';
import { Eye, Lock } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminShops() {
  const [shops, setShops] = useState([
    {
      id: 1,
      name: 'ร้านรุ่งเรืองพาณิชย์',
      taxId: '1234567890123',
      phone: '02-581-9988',
      email: 'rungrueng.panich@example.com',
      lineId: '@rungruengpanich',
      address: '75/8 ถนนพหลโยธิน ตำบลจตุจักร อำเภอเมืองกรุงเทพมหานคร จังหวัดกรุงเทพมหานคร รหัสไปรษณีย์ 12000',
      status: 'รออนุมัติ',
      totalSell: 0
    },
    {
      id: 2,
      name: 'ร้านขายเสื้อร้านเติมเจ้าเก่า',
      taxId: '1-1007-00123-45-6',
      phone: '081-234-5678',
      email: 'baanmeledkafae@gmail.com',
      lineId: '@baanmeledkafae',
      address: 'ถนน พหลโยธิน ตำบล/แขวง สามเสนใน อำเภอ/เขต พญาไท จังหวัด กรุงเทพมหานคร รหัสไปรษณีย์ 10400',
      status: 'อนุมัติแล้ว',
      totalSell: 360
    }
  ]);

  const handleViewDetail = (shopId) => {
    alert(`ดูรายละเอียดร้านค้า ID: ${shopId}`);
  };

  const handleBlock = (shopId) => {
    if (confirm('ต้องการบล็อกร้านค้านี้?')) {
      alert(`บล็อกร้านค้า ID: ${shopId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">จัดการร้านค้า</h1>

            <div className="space-y-4">
              {shops.map((shop) => (
                <div key={shop.id} className="bg-gray-700 rounded-xl p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    {/* Shop Info */}
                    <div className="flex-1 text-white space-y-2">
                      <h2 className="text-xl font-bold mb-3">{shop.name}</h2>
                      <p className="text-sm">เลขประจำตัวผู้เสียภาษี {shop.taxId}</p>
                      <p className="text-sm">เบอร์ติดต่อหักต้องตึง {shop.phone}</p>
                      <p className="text-sm">อีเมล {shop.email}</p>
                      <p className="text-sm">Line ID {shop.lineId}</p>
                      <p className="text-sm">{shop.address}</p>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex flex-col items-end gap-3 min-w-[200px]">
                      <div className="flex items-center gap-3 w-full">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium flex-1 text-center ${
                          shop.status === 'รออนุมัติ' 
                            ? 'bg-pink-200 text-pink-800' 
                            : 'bg-green-200 text-green-800'
                        }`}>
                          {shop.status}
                        </span>
                        <div className="bg-gray-600 px-4 py-2 rounded-lg">
                          <p className="text-white text-sm">Total Sell</p>
                          <p className="text-white text-2xl font-bold text-center">{shop.totalSell}</p>
                        </div>
                      </div>

                      {/* Search Input */}
                      <input
                        type="text"
                        placeholder="กำหนดค่าเช่า"
                        className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                      />

                      {/* Action Buttons */}
                      <div className="flex gap-2 w-full">
                        
                        <button
                          onClick={() => handleBlock(shop.id)}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          <Lock size={18} />
                          ระงับร้านค้า
                        </button>
                      </div>
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