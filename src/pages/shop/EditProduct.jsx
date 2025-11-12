import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { LayoutGrid, Package, FileText, Tag, Store, Upload, X } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400');
  
  const [formData, setFormData] = useState({
    name: 'Shirt Fuji & Sakura',
    price: '350',
    shippingFee: '30',
    stock: '30'
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
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    console.log('Update Product:', formData);
    alert('อัพเดทสินค้าเรียบร้อย!');
    navigate('/shop/products');
  };

  const handleDelete = () => {
    if (confirm('ต้องการลบสินค้านี้?')) {
      console.log('Delete product:', id);
      alert('ลบสินค้าเรียบร้อย!');
      navigate('/shop/products');
    }
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
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left - Image Upload */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="bg-gray-200 rounded-2xl aspect-square overflow-hidden relative">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Product" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Upload size={64} />
                    </div>
                  )}
                </div>

                {/* Thumbnail */}
                <div className="bg-gray-200 rounded-lg w-24 h-24 overflow-hidden">
                  {imagePreview && (
                    <img src={imagePreview} alt="Thumbnail" className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Upload Buttons */}
                <div className="space-y-3">
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-medium py-3 rounded-xl text-center cursor-pointer transition-colors">
                      เพิ่มรูปภาพ
                    </div>
                  </label>

                  <button
                    onClick={handleDelete}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    ลบรูปภาพ
                  </button>
                </div>
              </div>

              {/* Right - Form */}
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-white font-medium mb-2 flex justify-between">
                    <span>ชื่อสินค้า</span>
                    <button className="text-[#FF9B8A] text-sm">แก้ไขชื่อ</button>
                  </label>
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
                  <label className="block text-white font-medium mb-2 flex justify-between">
                    <span>ราคาสินค้า</span>
                    <button className="text-[#FF9B8A] text-sm">แก้ไขราคา</button>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                  />
                </div>

                {/* Shipping Fee */}
                <div>
                  <label className="block text-white font-medium mb-2 flex justify-between">
                    <span>ค่าจัดส่งสินค้า</span>
                    <button className="text-[#FF9B8A] text-sm">แก้ไขราคา</button>
                  </label>
                  <input
                    type="number"
                    name="shippingFee"
                    value={formData.shippingFee}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-white font-medium mb-2">ค่าจัดส่งสินค้า</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition-colors"
                >
                  ลบสินค้า
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}