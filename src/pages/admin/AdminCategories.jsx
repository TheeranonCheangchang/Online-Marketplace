import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminCategories() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    parent: '',
    child: ''
  });

  const categories = [
    {
      id: 1,
      name: 'เสื้อ',
      parent: 'แก้ไข | ลบ',
      children: [
        { id: 11, name: 'เสื้อผ้าผู้ชาย', action: 'แก้ไข | ลบ' },
        { id: 12, name: 'เสื้อผ้าผู้หญิง', action: 'แก้ไข | ลบ' }
      ]
    }
  ];

  const handleAddCategory = () => {
    if (!newCategory.parent || !newCategory.child) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    console.log('Add category:', newCategory);
    alert('เพิ่มหมวดหมู่เรียบร้อย');
    setShowAddModal(false);
    setNewCategory({ parent: '', child: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Add Category Form */}
            <div className="bg-gray-700 rounded-xl p-6">
              <h2 className="text-white text-xl font-bold mb-4">ชื่อหมวดหมู่</h2>
              <input
                type="text"
                value={newCategory.parent}
                onChange={(e) => setNewCategory({ ...newCategory, parent: e.target.value })}
                className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                placeholder="กรอกชื่อหมวดหมู่หลัก"
              />

              <h2 className="text-white text-xl font-bold mb-4">ชื่อหมวดหมู่ย่อย</h2>
              <input
                type="text"
                value={newCategory.child}
                onChange={(e) => setNewCategory({ ...newCategory, child: e.target.value })}
                className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                placeholder="กรอกชื่อหมวดหมู่ย่อย"
              />

              <button
                onClick={handleAddCategory}
                className="bg-[#FF9B8A] hover:bg-[#FF8A77] text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                เพิ่มหมวดหมู่
              </button>
            </div>

            {/* Categories List */}
            <div className="bg-gray-700 rounded-xl p-6">
              <h2 className="text-white text-xl font-bold mb-4">รายการหมวดหมู่</h2>
              
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id}>
                    <div className="text-white mb-2">
                      <span className="font-bold">เสื้อ</span>
                      <span className="ml-4 text-gray-400">แก้ไข | </span>
                      <span className="text-red-400 cursor-pointer hover:text-red-300">ลบ</span>
                    </div>
                    <ul className="ml-6 space-y-1">
                      {category.children.map((child) => (
                        <li key={child.id} className="text-white">
                          • {child.name}
                          <span className="ml-4 text-gray-400">แก้ไข | </span>
                          <span className="text-red-400 cursor-pointer hover:text-red-300">ลบ</span>
                        </li>
                      ))}
                    </ul>
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