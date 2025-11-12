import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function ShopRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    phone: '',
    email: '',
    lineId: '',
    taxId: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    if (!formData.shopName || !formData.phone) {
      alert('กรุณากรอกข้อมูลที่จำเป็น');
      return;
    }

    console.log('Shop Registration:', formData);
    alert('ลงทะเบียนร้านค้าสำเร็จ! รอการอนุมัติจากแอดมิน');
    navigate('/shop/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">ลงทะเบียนร้านค้า</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Shop Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  ชื่อร้าน <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  ที่อยู่
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  เบอร์โทรติดต่อ <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Line ID */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Line ID
                </label>
                <input
                  type="text"
                  name="lineId"
                  value={formData.lineId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tax ID */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  เลขประจำตัวผู้เสียภาษี
                </label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  pattern="[0-9]{13}"
                  className="w-full px-4 py-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-semibold py-4 rounded-lg transition-colors"
              >
                ยืนยันการลงทะเบียน
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}