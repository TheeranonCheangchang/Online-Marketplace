import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, EyeOff, Trash2, MessageCircle } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ShopSidebar from '../../components/layout/ShopSidebar';

export default function ManageReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: 'Shirt Fuji & Sakura',
      customerName: 'สมชาย ใจดี',
      rating: 5,
      comment: 'สินค้าดีมาก ผ้าสบาย ส่งเร็ว ขอแนะนำค่ะ',
      date: '2025-11-20',
      status: 'approved',
      visible: true,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'
    },
    {
      id: 2,
      productName: 'Shirt Fuji & Bridge',
      customerName: 'มีนา วิชิต',
      rating: 4,
      comment: 'ดีค่ะ แต่ขนาดใหญ่กว่าขาด ควรมีขนาด S มากขึ้น',
      date: '2025-11-18',
      status: 'approved',
      visible: true,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100'
    },
    {
      id: 3,
      productName: 'Shirt Fuji & Sakura',
      customerName: 'ปิยะ สมใจ',
      rating: 3,
      comment: 'ตรงตามรูปค่ะ แต่ราคามากขึ้นหน่อย',
      date: '2025-11-15',
      status: 'pending',
      visible: false,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'
    },
    {
      id: 4,
      productName: 'Shirt Fuji & Bridge',
      customerName: 'อัฒชัย ชื่นใจ',
      rating: 5,
      comment: 'ยอดเยี่ยม!!! ขนาดตรงดี ส่งด่วน ของแท้ 100%',
      date: '2025-11-10',
      status: 'approved',
      visible: false,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100'
    },
    {
      id: 5,
      productName: 'Shirt Fuji & Bridge',
      customerName: 'นภา เมืองกร',
      rating: 2,
      comment: 'ของมาโดยไม่มีป้ายแบรนด์ ผ่อนแพงไป',
      date: '2025-11-08',
      status: 'approved',
      visible: true,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleVisibility = (id) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, visible: !r.visible } : r
    ));
  };

  const approveReview = (id) => {
    setReviews(reviews.map(r => 
      r.id === id ? { ...r, status: 'approved' } : r
    ));
    alert('อนุมัติรีวิวแล้ว');
  };

  const deleteReview = (id) => {
    if (confirm('ต้องการลบรีวิวนี้?')) {
      setReviews(reviews.filter(r => r.id !== id));
      alert('ลบรีวิวเรียบร้อย');
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchStatus = filterStatus === 'all' || review.status === filterStatus;
    const matchSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       review.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    hidden: reviews.filter(r => !r.visible).length
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <ShopSidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">จัดการรีวิว</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <p className="text-gray-600 text-sm mb-1">รีวิวทั้งหมด</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <p className="text-gray-600 text-sm mb-1">รอการอนุมัติ</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <p className="text-gray-600 text-sm mb-1">ซ่อนไว้</p>
                <p className="text-3xl font-bold text-gray-600">{stats.hidden}</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="ค้นหารีวิว..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A]"
                >
                  <option value="all">ทั้งหมด</option>
                  <option value="pending">รอการอนุมัติ</option>
                  <option value="approved">อนุมัติแล้ว</option>
                </select>
              </div>
            </div>

            {/* Reviews List - Desktop */}
            <div className="hidden md:block space-y-4">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={review.image}
                          alt={review.productName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-bold text-gray-800">{review.productName}</p>
                            <p className="text-sm text-gray-600">โดย {review.customerName}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            review.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {review.status === 'pending' ? 'รอการอนุมัติ' : 'อนุมัติแล้ว'}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 mb-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600">{review.date}</span>
                        </div>

                        <p className="text-gray-700 text-sm mb-3">{review.comment}</p>

                        {/* Actions */}
                        <div className="flex gap-2 flex-wrap">
                          {review.status === 'pending' && (
                            <button
                              onClick={() => approveReview(review.id)}
                              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
                            >
                              อนุมัติ
                            </button>
                          )}

                          <button
                            onClick={() => toggleVisibility(review.id)}
                            className={`px-3 py-1 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                              review.visible
                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {review.visible ? (
                              <>
                                <Eye size={16} /> ซ่อน
                              </>
                            ) : (
                              <>
                                <EyeOff size={16} /> แสดง
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => deleteReview(review.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 text-sm rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Trash2 size={16} /> ลบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <MessageCircle size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600">ไม่มีรีวิวที่ตรงกับการค้นหา</p>
                </div>
              )}
            </div>

            {/* Reviews List - Mobile */}
            <div className="md:hidden space-y-4">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                  >
                    <div className="flex gap-3 mb-3">
                      <img
                        src={review.image}
                        alt={review.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">{review.productName}</p>
                        <p className="text-xs text-gray-600">{review.customerName}</p>
                        <div className="flex gap-2 mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-start mb-3">
                      <p className="text-sm text-gray-600">{review.date}</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        review.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {review.status === 'pending' ? 'รอการอนุมัติ' : 'อนุมัติแล้ว'}
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm mb-3">{review.comment}</p>

                    <div className="flex gap-2 flex-wrap">
                      {review.status === 'pending' && (
                        <button
                          onClick={() => approveReview(review.id)}
                          className="flex-1 px-2 py-2 bg-green-500 hover:bg-green-600 text-white text-xs rounded transition-colors"
                        >
                          อนุมัติ
                        </button>
                      )}

                      <button
                        onClick={() => toggleVisibility(review.id)}
                        className={`flex-1 px-2 py-2 text-xs rounded transition-colors ${
                          review.visible
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {review.visible ? 'ซ่อน' : 'แสดง'}
                      </button>

                      <button
                        onClick={() => deleteReview(review.id)}
                        className="flex-1 px-2 py-2 bg-red-100 text-red-700 hover:bg-red-200 text-xs rounded transition-colors"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <MessageCircle size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600">ไม่มีรีวิวที่ตรงกับการค้นหา</p>
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