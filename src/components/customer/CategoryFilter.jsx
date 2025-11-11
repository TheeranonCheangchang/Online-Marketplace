import { useState } from 'react';
import { X } from 'lucide-react';

export default function CategoryFilter({ isOpen, onClose, onSelectCategory }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: 'electronics', name: 'เสื้อผ้า' },
    { id: 'fashion', name: 'เสื้อทีเชิร์ต' },
    { id: 'home', name: 'เสื้อผู้ชายและเสื้อเชิ้ต' },
    { id: 'beauty', name: 'เสื้อเชิ้ตเดรสและเสื้อทีเชิร์ต' }
  ];

  const handleToggleCategory = (categoryId) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newSelected);
    if (onSelectCategory) {
      onSelectCategory(newSelected);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">หมวดหมู่สินค้า</h3>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            {categories.map((category) => (
              <label 
                key={category.id}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleToggleCategory(category.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}