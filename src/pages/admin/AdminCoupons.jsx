import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminCoupons() {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    expireDate: '',
    minAmount: ''
  });

  const coupons = [
    { id: 1, code: 'มาโคมไส้ใหก่ส่ม', discount: 15, expireDate: '1/10/2025', status: 'ใช้งาน' },
    { id: 2, code: 'หน้าร้อนสดใหม่', discount: 15, expireDate: '1/1/2025', status: 'หมดอายุ' },
    { id: 3, code: 'เปลี่ยนสีกนิด', discount: 30, expireDate: '1/2/2025', status: 'หมดอายุ' },
    { id: 4, code: 'โสสาขายเส่ลิดดอกเลย', discount: 30, expireDate: '1/11/2025', status: 'ปิดใช้งาน' }
  ];

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.discount || !formData.expireDate || !formData.minAmount) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    console.log('Create coupon:', formData);
    alert('สร้างคูปองเรียบร้อย!');
    setShowCreateModal(false);
    setFormData({ code: '', discount: '', expireDate: '', minAmount: '' });
  };

  const handleToggle = (id) => {
    console.log('Toggle coupon:', id);
    alert('เปิด/ปิดคูปอง');
  };

  const handleDelete = (id) => {
    if (confirm('ต้องการลบคูปองนี้?')) {
      console.log('Delete coupon:', id);
      alert('ลบคูปองเรียบร้อย');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} isAdmin={true} />

      <div className="flex-1 flex">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Create Coupon Modal */}
            {showCreateModal && (
              <>
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setShowCreateModal(false)}
                />
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                  <div className="bg-gray-300 rounded-xl p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">ชื่อคูปอง</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg"
                        placeholder="รหัสคูปอง"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">มูลค่าส่วนลด</label>
                          <input
                            type="number"
                            value={formData.discount}
                            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">จำนวนสิทธิ์</label>
                          <input
                            type="number"
                            value={formData.minAmount}
                            onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">วันหมดอายุ</label>
                        <input
                          type="date"
                          value={formData.expireDate}
                          onChange={(e) => setFormData({ ...formData, expireDate: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">ยอดสั่งซื้อขั้นต่ำ</label>
                        <input
                          type="number"
                          value={formData.minAmount}
                          onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          className="flex-1 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white py-3 rounded-lg transition-colors"
                        >
                          บันทึก
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCreateModal(false)}
                          className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg transition-colors"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}

            {/* Coupons List */}
            <div className="bg-gray-700 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-white text-2xl font-bold">คูปอง</h1>
                <button
                  onClick={handleCreate}
                  className="bg-[#FF9B8A] hover:bg-[#FF8A77] text-white px-6 py-2 rounded-lg transition-colors"
                >
                  สร้างคูปอง
                </button>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left text-white py-3 px-2">ชื่อคูปอง</th>
                      <th className="text-left text-white py-3 px-2">ส่วนลด</th>
                      <th className="text-left text-white py-3 px-2">วันหมดอายุ</th>
                      <th className="text-left text-white py-3 px-2">สถานะ</th>
                      <th className="text-left text-white py-3 px-2">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((coupon) => (
                      <tr key={coupon.id} className="border-b border-gray-600">
                        <td className="text-white py-4 px-2">{coupon.code}</td>
                        <td className="text-white py-4 px-2">{coupon.discount}</td>
                        <td className="text-white py-4 px-2">{coupon.expireDate}</td>
                        <td className="text-white py-4 px-2">{coupon.status}</td>
                        <td className="py-4 px-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleToggle(coupon.id)}
                              className="bg-orange-300 text-white px-3 py-1 rounded hover:bg-orange-400 transition text-sm"
                            >
                              เปิด
                            </button>
                            <button
                              onClick={() => handleDelete(coupon.id)}
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
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="bg-gray-600 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-bold">{coupon.code}</h3>
                        <p className="text-gray-300 text-sm">ส่วนลด: {coupon.discount}%</p>
                        <p className="text-gray-300 text-sm">หมดอายุ: {coupon.expireDate}</p>
                      </div>
                      <span className="text-white text-sm bg-gray-700 px-2 py-1 rounded">{coupon.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggle(coupon.id)}
                        className="flex-1 bg-orange-300 text-white px-3 py-2 rounded hover:bg-orange-400 transition text-sm"
                      >
                        เปิด
                      </button>
                      <button
                        onClick={() => handleDelete(coupon.id)}
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
