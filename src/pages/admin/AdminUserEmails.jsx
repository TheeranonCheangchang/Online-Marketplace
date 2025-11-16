import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';

export default function AdminUserEmails() {
  const emails = [
    { id: 1, email: 's.prakobdee@email.com' },
    { id: 2, email: 'somchai.p@email.com' }
  ];

  const handleViewDetail = (email) => {
    console.log('View detail:', email);
    alert(`ดูรายละเอียด: ${email}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} isAdmin={true} />

      <div className="flex-1 flex">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-700 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4 mb-4 text-white font-bold">
                <div>ชื่ออีเมล</div>
                <div className="text-right">รายละเอียด</div>
              </div>

              <div className="space-y-3">
                {emails.map((item) => (
                  <div key={item.id} className="bg-gray-600 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <div className="text-white">{item.email}</div>
                      <div className="text-right">
                        <button
                          onClick={() => handleViewDetail(item.email)}
                          className="bg-[#FF9B8A] hover:bg-[#FF8A77] text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          รายละเอียด
                        </button>
                      </div>
                    </div>
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