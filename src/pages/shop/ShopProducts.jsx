import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Package, FileText, Tag, Store, Plus, Edit, Trash2 } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function ShopProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Shirt Fuji & Sakura',
      stock: 15,
      price: 350,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200'
    },
    {
      id: 2,
      name: 'Shirt Fuji & Bridge',
      stock: 22,
      price: 350,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200'
    },
    {
      id: 3,
      name: 'Shirt Fuji & Bridge',
      stock: 9,
      price: 350,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=200'
    }
  ]);

  const handleDelete = (id) => {
    if (confirm('ต้องการลบสินค้านี้?')) {
      setProducts(products.filter(p => p.id !== id));
      alert('ลบสินค้าเรียบร้อย');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-full">
          <nav className="p-4 space-y-2">
            <Link
              to="/shop/dashboard"
              className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              <LayoutGrid size={20} />
              Overview
            </Link>
            <Link
              to="/shop/products"
              className="flex items-center gap-3 px-4 py-3 bg-[#FF9B8A] text-white rounded-lg font-medium"
            >
              <Package size={20} />
              Products
            </Link>
            <Link
              to="/shop/orders"
              className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              <FileText size={20} />
              Orders
            </Link>
            <Link
              to="/shop/promotions"
              className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              <Tag size={20} />
              Promotion
            </Link>
          </nav>

          <div className="p-4 mt-auto border-t">
            <Link
              to="/shop/register"
              className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              <Store size={20} />
              ข้าระเงินค่าเช่า
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">จัดการสินค้า</h1>
              <Link
                to="/shop/products/add"
                className="flex items-center gap-2 px-4 py-2 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-medium rounded-lg transition-colors"
              >
                <Plus size={20} />
                เพิ่มสินค้า
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">จำนวน {product.stock}</p>
                    
                    <div className="flex gap-2 mt-3">
// ในส่วน Product Card
<button
  onClick={() => navigate(`/shop/products/edit/${product.id}`)}
  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
>
  แก้ไข
</button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
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