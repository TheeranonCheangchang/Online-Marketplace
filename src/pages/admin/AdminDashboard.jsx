import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart } from 'lucide-react';

export default function AdminDashboard() {
  const stats = {
    totalOrders: 24
  };

  const chartData = [
    { month: '0', orders: 650 },
    { month: '1', orders: 920 },
    { month: '2', orders: 150 },
    { month: '3', orders: 800 },
    { month: '4', orders: 350 },
    { month: '5', orders: 600 },
    { month: '6', orders: 480 },
    { month: '7', orders: 490 },
    { month: '8', orders: 80 },
    { month: '9', orders: 410 },
    { month: '10', orders: 650 },
    { month: '11', orders: 120 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Card */}
            <div className="bg-gray-800 text-white rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingCart size={24} />
                <h3 className="text-lg font-medium">Total Orders</h3>
              </div>
              <p className="text-5xl font-bold">{stats.totalOrders}</p>
            </div>

            {/* Chart */}
            <div className="bg-gray-700 rounded-xl p-6">
              <div className="flex justify-end mb-4">
                <select className="px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500">
                  <option value="monthly">รายเดือน</option>
                  <option value="daily">รายวัน</option>
                  <option value="yearly">รายปี</option>
                </select>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="month" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="orders" fill="#FF9B8A" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
