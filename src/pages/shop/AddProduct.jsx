import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutGrid, Package, FileText, Tag, Store, Upload } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function AddProduct() {
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    shippingFee: '',
    size: '',
    color: '',
    stock: '',
    sku: '',
    description: ''
  });

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

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      alert('กรุณากรอกข้อมูลที่จำเป็น');
      return;
    }

    console.log('Add Product:', formData);
    console.log('Image:', productImage);
    alert('เพิ่มสินค้าเรียบร้อย!');
    navigate('/shop/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-full">
          <nav className="p-4 space-y-2">
            <Link to="/shop/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              <LayoutGrid size={20} />
              Overview
            </Link>
            <Link to="/shop/products" className="flex items-center gap-3 px-4 py-3 bg-[#FF9B8A] text-white rounded-lg font-medium">
              <Package size={20} />
              Products
            </Link>
            <Link to="/shop/orders" className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              <FileText size={20} />
              Orders
            </Link>
            <Link to="/shop/promotions" className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              <Tag size={20} />
              Promotion
            </Link>
          </nav>

          <div className="p-4 mt-auto border-t">
            <Link to="/shop/register" className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              <Store size={20} />
              ข้าระเงินค่าเช่า
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">เพิ่มสินค้า</h1>
              <button
                onClick={() => navigate('/shop/products')}
                className="px-6 py-2 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-medium rounded-lg transition-colors"
              >
                เพิ่มสินค้า
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

                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-xl transition-colors">
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
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-white font-medium mb-2">ราคาสินค้า</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
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
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                  />
                </div>

                {/* Size & Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">ขนาดสินค้า</label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">สีสินค้า</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                    />
                  </div>
                </div>

                {/* Stock & SKU */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">จำนวนสินค้า</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">รหัส SKU</label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}