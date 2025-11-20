import { useState, useEffect } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight, Menu, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// Mock Data - Products
const products = [
  {
    id: 1,
    name: 'Shirt Sport',
    price: 350,
    categoryId: 21, // เสื้อทีเชิร์ตผู้ชาย
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    shop: { name: 'TechShop' }
  },
  {
    id: 2,
    name: 'Galaxy Cat Shirt',
    price: 350,
    categoryId: 21,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
    shop: { name: 'TechShop' }
  },
  {
    id: 3,
    name: 'Shirt',
    price: 350,
    categoryId: 22, // เสื้อทีเชิร์ตผู้หญิง
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    shop: { name: 'Fashion Store' }
  },
  {
    id: 4,
    name: 'Rainbow Dog Shirt',
    price: 350,
    categoryId: 11, // เสื้อผ้าผู้ชาย
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
    shop: { name: 'Pet Store' }
  },
  {
    id: 5,
    name: 'Dress Shirt',
    price: 450,
    categoryId: 31, // เสื้อเชิ้ตเดรส
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
    shop: { name: 'Fashion Store' }
  },
  {
    id: 6,
    name: 'Women Blouse',
    price: 380,
    categoryId: 12, // เสื้อผ้าผู้หญิง
    image: 'https://images.unsplash.com/photo-1589810876158-ef5a62a3e7e0?w=400&h=400&fit=crop',
    shop: { name: 'Fashion Store' }
  }
];

// Mock Categories - ดึงมาจาก Admin
const categories = [
  {
    id: 1,
    name: 'เสื้อผ้า',
    children: [
      { id: 11, name: 'เสื้อผ้าผู้ชาย' },
      { id: 12, name: 'เสื้อผ้าผู้หญิง' }
    ]
  },
  {
    id: 2,
    name: 'เสื้อทีเชิร์ต',
    children: [
      { id: 21, name: 'เสื้อทีเชิร์ตผู้ชาย' },
      { id: 22, name: 'เสื้อทีเชิร์ตผู้หญิง' }
    ]
  },
  {
    id: 3,
    name: 'เสื้อเชิ้ต',
    children: [
      { id: 31, name: 'เสื้อเชิ้ตเดรสและเสื้อเชิ้ต' }
    ]
  }
];

const reviews = [
  {
    id: 1,
    product: 'Shirt Fuji & Sakura',
    rating: 5,
    comment: 'เสื้อใส่สบายเนื้อผ้าดีมีคุณภาพ'
  },
  {
    id: 2,
    product: 'Galaxy Cat Shirt',
    rating: 5,
    comment: 'ลายสวยมาก ใส่แล้วชอบมากค่ะ'
  },
  {
    id: 3,
    product: 'Rainbow Dog Shirt',
    rating: 4,
    comment: 'สีสันสดใส คุณภาพดี แนะนำเลย'
  }
];

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-gray-50">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-base mb-1 line-clamp-1 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-lg font-bold text-[#FF9B8A] mb-3">฿{product.price}</p>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] text-white py-2 rounded-full transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <ShoppingCart size={16} />
          ใส่ตะกร้า
        </button>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-base mb-2">{review.product}</h3>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={18}
            className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
      <p className="text-gray-600 text-sm">{review.comment}</p>
    </div>
  );
}

function CategoryFilter({ isOpen, onClose, onSelectCategory, selectedCategories }) {
  const handleToggleCategory = (categoryId) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    onSelectCategory(newSelected);
  };

  const handleClearAll = () => {
    onSelectCategory([]);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto animate-slide-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">กรองสินค้า</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full text-2xl"
            >
              ×
            </button>
          </div>

          {/* Selected Count */}
          {selectedCategories.length > 0 && (
            <div className="mb-4 flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <span className="text-sm text-blue-800">
                เลือกแล้ว {selectedCategories.length} หมวดหมู่
              </span>
              <button
                onClick={handleClearAll}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                ล้างทั้งหมด
              </button>
            </div>
          )}

          {/* Categories */}
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.id}>
                <h4 className="font-bold text-gray-800 mb-3">{category.name}</h4>
                <div className="space-y-2 ml-2">
                  {category.children.map((child) => (
                    <label 
                      key={child.id}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(child.id)}
                        onChange={() => handleToggleCategory(child.id)}
                        className="w-5 h-5 text-[#FF9B8A] rounded focus:ring-2 focus:ring-[#FF9B8A] cursor-pointer"
                      />
                      <span className="text-gray-700">{child.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Apply Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white py-3 rounded-lg font-medium transition-colors"
          >
            ปิด
          </button>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products based on selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        selectedCategories.includes(product.categoryId)
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategories]);

  const handleAddToCart = (product) => {
    setCartCount(cartCount + 1);
    alert(`เพิ่ม "${product.name}" ลงตะกร้าแล้ว!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={cartCount} />

      <CategoryFilter 
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onSelectCategory={setSelectedCategories}
        selectedCategories={selectedCategories}
      />

      <main className="container mx-auto px-4 py-6 md:py-8 flex-1">
        {/* Filter Button & Active Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-900 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <Menu size={18} />
              หมวดหมู่สินค้า
              {selectedCategories.length > 0 && (
                <span className="bg-[#FF9B8A] text-white px-2 py-0.5 rounded-full text-xs">
                  {selectedCategories.length}
                </span>
              )}
            </button>

            {selectedCategories.length > 0 && (
              <span className="text-sm text-gray-600">
                แสดง {filteredProducts.length} สินค้า
              </span>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg mb-4">ไม่พบสินค้าในหมวดหมู่ที่เลือก</p>
              <button
                onClick={() => setSelectedCategories([])}
                className="text-blue-600 hover:underline"
              >
                ดูสินค้าทั้งหมด
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-12">
            <button className="p-2 rounded-full border-2 border-gray-300 hover:bg-gray-50 transition-colors">
              <ChevronLeft size={20} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-[#FF9B8A] text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-2 rounded-full border-2 border-gray-300 hover:bg-gray-50 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Reviews Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">รีวิวจากลูกค้า</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}