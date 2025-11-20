import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'เสื้อผ้า',
      children: [
        { id: 11, name: 'เสื้อผ้าผู้ชาย' },
        { id: 12, name: 'เสื้อผ้าผู้หญิง' }
      ]
    },
    {
      id: 2,
      name: 'เสื้อทีเชิร์ต',
      children: [
        { id: 21, name: 'เสื้อทีเชิร์ตผู้ชาย' },
        { id: 22, name: 'เสื้อทีเชิร์ตผู้หญิง' }
      ]
    },
    {
      id: 3,
      name: 'เสื้อเชิ้ต',
      children: [
        { id: 31, name: 'เสื้อเชิ้ตเดรสและเสื้อเชิ้ต' }
      ]
    },
    {
      id: 4,
      name: 'เสื้อเชิ้ตเดรสและเสื้อทีเชิร์ต',
      children: []
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    parent: '',
    child: ''
  });

  const handleAddCategory = () => {
    if (!newCategory.parent) {
      alert('กรุณากรอกชื่อหมวดหมู่หลัก');
      return;
    }

    // Check if category already exists
    const exists = categories.find(cat => 
      cat.name.toLowerCase() === newCategory.parent.toLowerCase()
    );

    if (exists && newCategory.child) {
      // Add child to existing category
      setCategories(categories.map(cat => 
        cat.id === exists.id 
          ? {
              ...cat,
              children: [...cat.children, {
                id: Date.now(),
                name: newCategory.child
              }]
            }
          : cat
      ));
      alert('เพิ่มหมวดหมู่ย่อยเรียบร้อย');
    } else if (!exists) {
      // Add new parent category
      const newCat = {
        id: Date.now(),
        name: newCategory.parent,
        children: newCategory.child ? [{
          id: Date.now() + 1,
          name: newCategory.child
        }] : []
      };
      setCategories([...categories, newCat]);
      alert('เพิ่มหมวดหมู่เรียบร้อย');
    } else {
      alert('หมวดหมู่นี้มีอยู่แล้ว');
      return;
    }

    setNewCategory({ parent: '', child: '' });
  };

  const handleDeleteCategory = (categoryId) => {
    if (confirm('ต้องการลบหมวดหมู่นี้?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
      alert('ลบหมวดหมู่เรียบร้อย');
    }
  };

  const handleDeleteChild = (categoryId, childId) => {
    if (confirm('ต้องการลบหมวดหมู่ย่อยนี้?')) {
      setCategories(categories.map(cat => 
        cat.id === categoryId
          ? {
              ...cat,
              children: cat.children.filter(child => child.id !== childId)
            }
          : cat
      ));
      alert('ลบหมวดหมู่ย่อยเรียบร้อย');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} isAdmin={true} />

      <div className="flex-1 flex">
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Add Category Form */}
            <div className="bg-gray-700 rounded-xl p-6">
              <h2 className="text-white text-xl font-bold mb-4">เพิ่มหมวดหมู่ใหม่</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-white block mb-2">ชื่อหมวดหมู่หลัก</label>
                  <input
                    type="text"
                    value={newCategory.parent}
                    onChange={(e) => setNewCategory({ ...newCategory, parent: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                    placeholder="เช่น เสื้อผ้า, รองเท้า"
                  />
                </div>

                <div>
                  <label className="text-white block mb-2">ชื่อหมวดหมู่ย่อย (ไม่บังคับ)</label>
                  <input
                    type="text"
                    value={newCategory.child}
                    onChange={(e) => setNewCategory({ ...newCategory, child: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                    placeholder="เช่น เสื้อผ้าผู้ชาย, เสื้อผ้าผู้หญิง"
                  />
                </div>

                <button
                  onClick={handleAddCategory}
                  className="bg-[#FF9B8A] hover:bg-[#FF8A77] text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <Plus size={20} />
                  เพิ่มหมวดหมู่
                </button>
              </div>
            </div>

            {/* Categories List */}
            <div className="bg-gray-700 rounded-xl p-6">
              <h2 className="text-white text-xl font-bold mb-4">รายการหมวดหมู่</h2>
              
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gray-600 rounded-lg p-4">
                    {/* Parent Category */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-white text-lg">{category.name}</span>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        ลบ
                      </button>
                    </div>

                    {/* Child Categories */}
                    {category.children.length > 0 && (
                      <ul className="ml-6 space-y-2">
                        {category.children.map((child) => (
                          <li key={child.id} className="text-white flex items-center justify-between">
                            <span>• {child.name}</span>
                            <button
                              onClick={() => handleDeleteChild(category.id, child.id)}
                              className="text-red-400 hover:text-red-300 transition-colors text-sm flex items-center gap-1"
                            >
                              <Trash2 size={14} />
                              ลบ
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {categories.length === 0 && (
                  <p className="text-gray-400 text-center py-8">ยังไม่มีหมวดหมู่</p>
                )}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>💡 เคล็ดลับ:</strong> หมวดหมู่ที่คุณสร้างจะแสดงในหน้าแรกให้ลูกค้ากรองสินค้าได้
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}