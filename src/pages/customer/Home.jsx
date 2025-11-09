import { useState } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// Mock Data
const products = [
  {
    id: 1,
    name: 'Shirt Sport',
    price: 350,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Galaxy Cat Shirt',
    price: 350,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Shirt',
    price: 350,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Rainbow Dog Shirt',
    price: 350,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Shirt Sport',
    price: 350,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Shirt Sport',
    price: 350,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
  },
  {
    id: 7,
    name: 'Shirt Sport',
    price: 350,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
  },
  {
    id: 8,
    name: 'Shirt Sport',
    price: 350,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
  }
];

const reviews = [
  {
    id: 1,
    product: 'Shirt Fuji & Sakura',
    rating: 0,
    comment: 'เสื้อใส่สบายเนื้อผ้าดีมีคุณภาพ'
  },
  {
    id: 2,
    product: 'Shirt Fuji & Sakura',
    rating: 0,
    comment: 'เสื้อใส่สบายเนื้อผ้าดีมีคุณภาพ'
  },
  {
    id: 3,
    product: 'Shirt Fuji & Sakura',
    rating: 0,
    comment: 'เสื้อใส่สบายเนื้อผ้าดีมีคุณภาพ'
  }
];

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
      <div className="aspect-square bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-base mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-lg font-bold mb-3">{product.price}</p>
        <button className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] text-white py-2 rounded-full transition-colors flex items-center justify-center gap-2 text-sm font-medium">
          <ShoppingCart size={16} />
          ใส่ตะกร้า
        </button>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-base mb-2">{review.product}</h3>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
      <p className="text-gray-600 text-sm">{review.comment}</p>
    </div>
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button className="p-2 rounded-full border-2 border-gray-300 hover:bg-gray-50 transition-colors">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-full font-medium transition-colors ${
                currentPage === page
                  ? 'bg-[#FFD4E5] text-[#FF6B9D]'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-gray-500">...</span>
          <button className="p-2 rounded-full border-2 border-gray-300 hover:bg-gray-50 transition-colors">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      <style>{`
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