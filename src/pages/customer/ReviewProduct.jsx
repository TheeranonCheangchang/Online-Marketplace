import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function ReviewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  const product = {
    id: 1,
    name: 'Shirt Fuji & Sakura',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200'
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('กรุณาให้คะแนนสินค้า');
      return;
    }

    console.log('Review submitted:', { rating, review });
    alert('ขอบคุณสำหรับการรีวิว!');
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <Star size={32} />
          ให้คะแนนสินค้า
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            {/* Product Info */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <img 
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="font-bold text-lg">{product.name}</h2>
                <p className="text-gray-600 text-sm">ให้คะแนนคุณภาพสินค้า</p>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="text-center mb-6">
              <div className="flex justify-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={48}
                      className={`${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-lg font-medium">
                Rating: <span className="text-blue-600">{rating || 0}</span>
              </p>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="block font-medium mb-2">เขียนรีวิว</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="กรุณาก รรีวิว"
                rows="6"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-semibold py-4 rounded-xl transition-colors"
            >
              ส่งรีวิว
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}