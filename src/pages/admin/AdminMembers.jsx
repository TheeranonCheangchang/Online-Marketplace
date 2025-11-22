import { useState } from 'react';
import { Lock, Unlock, Mail, Phone } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminMembers() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'สมชาย ใจดี',
      email: 'somchai@example.com',
      phone: '081-234-5678',
      type: 'customer', // customer, seller
      status: 'active',
      joinDate: '2025-01-15'
    },
    {
      id: 2,
      name: 'สายฝน นวลขวัญ',
      email: 'saifon@example.com',
      phone: '089-123-4567',
      type: 'seller',
      status: 'active',
      joinDate: '2024-12-20'
    },
    {
      id: 3,
      name: 'สมหวัง สินทรัพย์',
      email: 'somwang@example.com',
      phone: '086-987-6543',
      type: 'customer',
      status: 'blocked',
      joinDate: '2025-01-10'
    },
    {
      id: 4,
      name: 'นวลนิยม ศรีวิไล',
      email: 'nuan@example.com',
      phone: '082-345-6789',
      type: 'seller',
      status: 'active',
      joinDate: '2024-11-05'
    }
  ]);

  const handleBlockMember = (memberId) => {
    setMembers(members.map(m =>
      m.id === memberId
        ? { ...m, status: m.status === 'active' ? 'blocked' : 'active' }
        : m
    ));
  };

  const getMemberType = (type) => {
    if (type === 'seller') {
      return <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">ผู้ขาย</span>;
    }
    return <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">ลูกค้า</span>;
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
            <h1 className="text-3xl font-bold mb-2">จัดการสมาชิก</h1>
            <p className="text-gray-600 mb-6">รวม {members.length} สมาชิก</p>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ชื่อสมาชิก</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ประเภท</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">อีเมล</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">เบอร์โทร</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">สถานะ</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">#ID: {member.id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getMemberType(member.type)}
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm flex items-center gap-2">
                          <Mail size={16} className="text-gray-400" />
                          {member.email}
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm flex items-center gap-2">
                          <Phone size={16} className="text-gray-400" />
                          {member.phone}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(member.status)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleBlockMember(member.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              member.status === 'active'
                                ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}
                            title={member.status === 'active' ? 'ระงับสมาชิก' : 'อนุมัติสมาชิก'}
                          >
                            {member.status === 'active' ? <Lock size={18} /> : <Unlock size={18} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {members.map((member) => (
                <div key={member.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="mb-3">
                    <p className="font-bold">{member.name}</p>
                    <div className="flex gap-2 mt-2">
                      {getMemberType(member.type)}
                      {getStatusBadge(member.status)}
                    </div>
                  </div>

                  <div className="space-y-2 mb-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} />
                      {member.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} />
                      {member.phone}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBlockMember(member.id)}
                    className={`w-full py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
                      member.status === 'active'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {member.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                    {member.status === 'active' ? 'ระงับสมาชิก' : 'อนุมัติสมาชิก'}
                  </button>
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