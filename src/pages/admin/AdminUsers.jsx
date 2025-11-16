import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminUsers() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: 'USR_1001',
      name: 'สมชาย ใจดี',
      email: 'somchai.jaidee@example.com',
      role: 'CUSTOMER'
    }
  ];

  const handleViewDetail = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} isAdmin={true} />

      <div className="flex-1 flex">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">จัดการผู้ใช้งาน</h1>

            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="bg-gray-700 rounded-xl p-6">
                  <div className="flex justify-between items-start">
                    <div className="text-white space-y-2">
                      <p className="text-sm">user_id: {user.id}</p>
                      <p className="text-lg font-bold">name: {user.name}</p>
                      <p className="text-sm">email: {user.email}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select className="px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500">
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="SELLER">SELLER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                      <button
                        onClick={() => handleViewDetail(user.id)}
                        className="bg-[#FF9B8A] hover:bg-[#FF8A77] text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        ย้อนกลับ
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
