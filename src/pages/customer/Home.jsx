import { useState } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight, Menu, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// Mock Data
const products = [
  {
    id: 1,
    name: 'Shirt Sport',
    price: 350,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    shop: { name: 'TechShop' }
  },
  {
    id: 2,
    name: 'Galaxy Cat Shirt',
    price: 350,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
    shop: { name: 'TechShop' }
  },
  {
    id: 3,
    name: 'Shirt',
    price: 350,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop',
    shop: { name: 'Fashion Store' }
  },
  {
    id: 4,
    name: 'Rainbow Dog Shirt',
    price: 350,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop',
    shop: { name: 'Pet Store' }
  },
  {
    id: 5,
    name: 'Shirt Sport',
    price: 350,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    shop: { name: 'Sports Store' }
  },
  {
    id: 6,
    name: 'Shirt Sport',
    price: 350,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    shop: { name: 'Sports Store' }
  },
  {
    id: 7,
    name: 'Shirt Sport',
    price: 350,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    shop: { name: 'Sports Store' }
  },
  {
    id: 8,
    name: 'Shirt Sport',
    price: 350,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    shop: { name: 'Sports Store' }
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
    product: 'Shirt Fuji & Sakura',
    rating: 5,
    comment: 'เสื้อใส่สบายเนื้อผ้าดีมีคุณภาพ'
  },
  {
    id: 3,
    product: 'Shirt Fuji & Sakura',
    rating: 5,
    comment: 'เสื้อใส่สบายเนื้อผ้าดีมีคุณภาพ'
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
        <p className="text-lg font-bold mb-3">{product.price}</p>
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

function CategoryFilter({ isOpen, onClose, onSelectCategory }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: 'electronics', name: 'เสื้อผ้า' },
    { id: 'fashion', name: 'เสื้อทีเชิร์ต' },
    { id: 'home', name: 'เสื้อผู้ชายและเสื้อเชิ้ต' },
    { id: 'beauty', name: 'เสื้อเชิ้ตเดรสและเสื้อทีเชิร์ต' }
  ];

  const handleToggleCategory = (categoryId) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newSelected);
    if (onSelectCategory) {
      onSelectCategory(newSelected);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 overflow-y-auto animate-slide-in">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">หมวดหมู่สินค้า</h3>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            {categories.map((category) => (
              <label 
                key={category.id}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleToggleCategory(category.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cartCount, setCartCount] = useState(3);

  const handleAddToCart = (product) => {
    setCartCount(cartCount + 1);
    alert(`เพิ่ม "${product.name}" ลงตะกร้าแล้ว!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header isLoggedIn={true} cartCount={cartCount} />

      {/* Category Filter */}
      <CategoryFilter 
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onSelectCategory={setSelectedCategories}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8 flex-1">
        {/* Filter Button */}
        <div className="mb-6">
          <button 
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <Menu size={18} />
            ตัวกรองและการเรียงลำดับ
          </button>
        </div>

        {/* Product Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Pagination - Responsive */}
        <div className="flex items-center justify-center gap-1 md:gap-2 mb-12">
          <button className="p-1.5 md:p-2 rounded-full border-2 border-gray-300 hover:bg-gray-50 transition-colors">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full font-medium transition-colors text-sm md:text-base ${
                currentPage === page
                  ? 'bg-[#FFD4E5] text-[#FF6B9D]'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-gray-500 px-1">...</span>
          <button className="p-1.5 md:p-2 rounded-full border-2 border-gray-300 hover:bg-gray-50 transition-colors">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Reviews Section - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
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