import { useState } from 'react';
import { Lock, Unlock, Trash2, Eye } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Shirt Fuji & Sakura',
      shop: 'ร้านขายเสื้อร้านเด็ดเจ้าเก่า',
      price: 350,
      stock: 25,
      status: 'active', // active, blocked
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'
    },
    {
      id: 2,
      name: 'Galaxy Cat Shirt',
      shop: 'ร้านขายเสื้อร้านเด็ดเจ้าเก่า',
      price: 350,
      stock: 15,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100'
    },
    {
      id: 3,
      name: 'Rainbow Dog Shirt',
      shop: 'ร้านบีมนนด',
      price: 350,
      stock: 0,
      status: 'blocked',
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=100'
    },
    {
      id: 4,
      name: 'Dress Shirt',
      shop: 'Fashion Store Pro',
      price: 450,
      stock: 8,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100'
    }
  ]);

  const handleBlockProduct = (productId) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === 'active' ? 'blocked' : 'active' }
        : p
    ));
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('ต้องการลบสินค้านี้?')) {
      setProducts(products.filter(p => p.id !== productId));
      alert('ลบสินค้าเรียบร้อย');
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">ใช้งาน</span>;
    }
    return <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">ระงับแล้ว</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} isAdmin={true} />

      <div className="flex-1 flex">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">จัดการสินค้า</h1>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">สินค้า</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ร้านค้า</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ราคา</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">สต็อก</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">สถานะ</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">#ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{product.shop}</td>
                        <td className="px-6 py-4 font-semibold">฿{product.price}</td>
                        <td className="px-6 py-4">
                          <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                            {product.stock} ชิ้น
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(product.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleBlockProduct(product.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                product.status === 'active'
                                  ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                                  : 'bg-green-100 text-green-600 hover:bg-green-200'
                              }`}
                              title={product.status === 'active' ? 'ระงับสินค้า' : 'อนุมัติสินค้า'}
                            >
                              {product.status === 'active' ? <Lock size={18} /> : <Unlock size={18} />}
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              title="ลบสินค้า"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex gap-3 mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-sm">{product.name}</p>
                      <p className="text-xs text-gray-600 mb-1">{product.shop}</p>
                      <p className="text-sm font-semibold">฿{product.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-600">สต็อก</p>
                      <p className={product.stock > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                        {product.stock} ชิ้น
                      </p>
                    </div>
                    {getStatusBadge(product.status)}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBlockProduct(product.id)}
                      className={`flex-1 py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1 ${
                        product.status === 'active'
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {product.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                      {product.status === 'active' ? 'ระงับ' : 'อนุมัติ'}
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Trash2 size={16} />
                      ลบ
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">ยังไม่มีสินค้า</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}