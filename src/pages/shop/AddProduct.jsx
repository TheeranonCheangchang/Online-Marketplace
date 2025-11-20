import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, Trash2, Package, DollarSign } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ShopSidebar from '../../components/layout/ShopSidebar';

export default function AddProduct() {
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    basePrice: '', // ราคาพื้นฐาน (ใช้เป็น reference)
    category: '',
    shippingFee: '',
    description: ''
  });

  const [variants, setVariants] = useState([]);

  const [newVariant, setNewVariant] = useState({
    size: '',
    color: '',
    price: '', // ราคาของ variant นี้
    stock: '',
    sku: ''
  });

  const [showVariantForm, setShowVariantForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddVariant = () => {
    if (!newVariant.size || !newVariant.color || !newVariant.stock || !newVariant.price) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน (รวมถึงราคา)');
      return;
    }

    const variant = {
      id: Date.now(),
      ...newVariant,
      price: parseFloat(newVariant.price),
      stock: parseInt(newVariant.stock)
    };

    setVariants([...variants, variant]);
    setNewVariant({ size: '', color: '', price: '', stock: '', sku: '' });
    setShowVariantForm(false);
  };

  const handleDeleteVariant = (id) => {
    if (confirm('ต้องการลบตัวเลือกนี้?')) {
      setVariants(variants.filter(v => v.id !== id));
    }
  };

  const handleUpdateVariant = (id, field, value) => {
    setVariants(variants.map(v => 
      v.id === id ? { 
        ...v, 
        [field]: field === 'price' ? parseFloat(value) || 0 : parseInt(value) || 0 
      } : v
    ));
  };

  const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
  
  // คำนวณช่วงราคา
  const priceRange = variants.length > 0 
    ? {
        min: Math.min(...variants.map(v => v.price)),
        max: Math.max(...variants.map(v => v.price))
      }
    : null;

  const handleSubmit = () => {
    if (!formData.name) {
      alert('กรุณากรอกชื่อสินค้า');
      return;
    }

    if (variants.length === 0) {
      alert('กรุณาเพิ่มตัวเลือกสินค้าอย่างน้อย 1 รายการ');
      return;
    }

    console.log('Add Product:', formData);
    console.log('Variants:', variants);
    console.log('Image:', productImage);
    console.log('Price Range:', priceRange);
    alert('เพิ่มสินค้าเรียบร้อย!');
    navigate('/shop/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <ShopSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">เพิ่มสินค้า</h1>
                {priceRange && (
                  <p className="text-gray-400 mt-1">
                    ช่วงราคา: ฿{priceRange.min.toLocaleString()} 
                    {priceRange.min !== priceRange.max && ` - ฿${priceRange.max.toLocaleString()}`}
                  </p>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-medium rounded-lg transition-colors"
              >
                บันทึกสินค้า
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left - Image Upload */}
              <div>
                <label className="block">
                  <div className="bg-gray-200 rounded-2xl aspect-square overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <Upload size={64} />
                        <p className="mt-4 text-lg">คลิกเพื่ออัพโหลดรูปภาพ</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <div className="mt-4 space-y-3">
                  <label className="block">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <div className="bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-medium py-3 rounded-xl text-center cursor-pointer transition-colors">
                      เพิ่มรูปภาพ
                    </div>
                  </label>

                  <button 
                    onClick={() => {
                      setProductImage(null);
                      setImagePreview(null);
                    }}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    ลบรูปภาพ
                  </button>

                  {/* Description */}
                  <div>
                    <label className="block text-white font-medium mb-2">รายละเอียด</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="กรอกรายละเอียดสินค้า..."
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A] resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Right - Form */}
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-white font-medium mb-2">ชื่อสินค้า</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ชื่อสินค้า"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                  />
                </div>

                {/* Base Price (Optional - for reference) */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    ราคาพื้นฐาน (ไม่บังคับ)
                    <span className="text-gray-400 text-sm ml-2">ใช้เป็นข้อมูลอ้างอิง</span>
                  </label>
                  <input
                    type="number"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-white font-medium mb-2">หมวดหมู่สินค้า</label>
                  <button className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg text-left hover:bg-gray-600 transition-colors">
                    เลือกหมวดหมู่สินค้า
                  </button>
                </div>

                {/* Shipping Fee */}
                <div>
                  <label className="block text-white font-medium mb-2">ค่าจัดส่งสินค้า</label>
                  <input
                    type="number"
                    name="shippingFee"
                    value={formData.shippingFee}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                  />
                </div>
              </div>
            </div>

            {/* Variants Section */}
            <div className="mt-8 bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">ตัวเลือกสินค้า (ขนาด/สี/ราคา)</h2>
                  <p className="text-gray-400 text-sm mt-1">กำหนดขนาด สี ราคา และสต็อกสินค้า</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">สต็อกรวม</div>
                  <div className="text-2xl font-bold text-[#FF9B8A] flex items-center gap-2">
                    <Package size={24} />
                    {totalStock} ชิ้น
                  </div>
                </div>
              </div>

              {/* Variants List */}
              {variants.length > 0 && (
                <div className="space-y-3 mb-6">
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl"
                    >
                      <div className="flex-1 grid grid-cols-5 gap-4">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">ขนาด</div>
                          <div className="font-semibold text-white">{variant.size}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">สี</div>
                          <div className="font-semibold text-white">{variant.color}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">ราคา</div>
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) => handleUpdateVariant(variant.id, 'price', e.target.value)}
                            className="w-24 px-2 py-1 bg-gray-600 text-white border-2 border-gray-500 rounded-lg font-semibold focus:border-[#FF9B8A] focus:outline-none"
                            min="0"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">สต็อก</div>
                          <input
                            type="number"
                            value={variant.stock}
                            onChange={(e) => handleUpdateVariant(variant.id, 'stock', e.target.value)}
                            className="w-20 px-2 py-1 bg-gray-600 text-white border-2 border-gray-500 rounded-lg font-semibold focus:border-[#FF9B8A] focus:outline-none"
                            min="0"
                          />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">SKU</div>
                          <div className="text-sm text-gray-300">{variant.sku || '-'}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteVariant(variant.id)}
                        className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Variant */}
              {!showVariantForm ? (
                <button
                  onClick={() => setShowVariantForm(true)}
                  className="w-full py-3 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 font-medium hover:border-[#FF9B8A] hover:text-[#FF9B8A] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  เพิ่มตัวเลือกสินค้า
                </button>
              ) : (
                <div className="p-4 bg-gray-700 rounded-xl border-2 border-[#FF9B8A]">
                  <h3 className="font-bold text-white mb-4">เพิ่มตัวเลือกใหม่</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        ขนาด <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={newVariant.size}
                        onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                        placeholder="เช่น S, M, L, XL"
                        className="w-full px-4 py-2 bg-gray-600 text-white border-2 border-gray-500 rounded-lg focus:border-[#FF9B8A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        สี <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={newVariant.color}
                        onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                        placeholder="เช่น สีขาว, สีดำ"
                        className="w-full px-4 py-2 bg-gray-600 text-white border-2 border-gray-500 rounded-lg focus:border-[#FF9B8A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        ราคา (บาท) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="number"
                        value={newVariant.price}
                        onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-2 bg-gray-600 text-white border-2 border-gray-500 rounded-lg focus:border-[#FF9B8A] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        จำนวนสต็อก <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="number"
                        value={newVariant.stock}
                        onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-2 bg-gray-600 text-white border-2 border-gray-500 rounded-lg focus:border-[#FF9B8A] focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-white mb-2">SKU (ไม่บังคับ)</label>
                      <input
                        type="text"
                        value={newVariant.sku}
                        onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
                        placeholder="PROD-XXX"
                        className="w-full px-4 py-2 bg-gray-600 text-white border-2 border-gray-500 rounded-lg focus:border-[#FF9B8A] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddVariant}
                      className="flex-1 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-medium py-2 rounded-lg transition-colors"
                    >
                      บันทึก
                    </button>
                    <button
                      onClick={() => {
                        setShowVariantForm(false);
                        setNewVariant({ size: '', color: '', price: '', stock: '', sku: '' });
                      }}
                      className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 rounded-lg transition-colors"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}