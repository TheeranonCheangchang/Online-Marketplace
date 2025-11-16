import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ShopSidebar from '../../components/layout/ShopSidebar';

export default function CreatePromotionPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    discount: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.discount || !formData.startDate || !formData.endDate) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    console.log('Create Promotion:', formData);
    alert('สร้างโปรโมชั่นเรียบร้อย!');
    navigate('/shop/promotions');
  };

  const handleCancel = () => {
    navigate('/shop/promotions');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <ShopSidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 flex items-start justify-center">
          <div className="bg-gray-700 rounded-lg p-6 lg:p-8 w-full max-w-2xl">
            <h2 className="text-white text-xl lg:text-2xl font-bold mb-6">สร้างโปรโมชัน</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white block mb-2 text-sm lg:text-base">ชื่อโปรโมชั่น</label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="กรอกชื่อโปรโมชั่น"
                  required
                />
              </div>

              <div>
                <label className="text-white block mb-2 text-sm lg:text-base">มูลค่า (%)</label>
                <input 
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="กรอกมูลค่าส่วนลด"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white block mb-2 text-sm lg:text-base">วันที่เริ่มต้น</label>
                  <input 
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-white block mb-2 text-sm lg:text-base">วันที่สิ้นสุด</label>
                  <input 
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full bg-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-orange-400 text-white py-3 px-6 rounded-lg hover:bg-orange-500 transition"
                >
                  บันทึก
                </button>
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}