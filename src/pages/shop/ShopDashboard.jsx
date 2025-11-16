import { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ShopSidebar from '../../components/layout/ShopSidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Package } from 'lucide-react';

export default function ShopDashboard() {
  const [timeFilter, setTimeFilter] = useState('monthly');

  const stats = {
    totalOrders: 12,
    totalSales: 360
  };

  const chartData = [
    { month: '0', sales: 650 },
    { month: '1', sales: 920 },
    { month: '2', sales: 150 },
    { month: '3', sales: 800 },
    { month: '4', sales: 350 },
    { month: '5', sales: 600 },
    { month: '6', sales: 480 },
    { month: '7', sales: 490 },
    { month: '8', sales: 80 },
    { month: '9', sales: 410 },
    { month: '10', sales: 650 },
    { month: '11', sales: 120 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <ShopSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800 text-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <FileText size={24} />
                  <h3 className="text-lg font-medium">Total Orders</h3>
                </div>
                <p className="text-5xl font-bold">{stats.totalOrders}</p>
              </div>

              <div className="bg-gray-800 text-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Package size={24} />
                  <h3 className="text-lg font-medium">Total Sell</h3>
                </div>
                <p className="text-5xl font-bold">{stats.totalSales}</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-end mb-4">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                >
                  <option value="daily">รายวัน</option>
                  <option value="monthly">รายเดือน</option>
                  <option value="yearly">รายปี</option>
                </select>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="sales" fill="#FF9B8A" radius={[8, 8, 0, 0]} />
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