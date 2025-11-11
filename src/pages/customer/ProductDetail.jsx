import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Star } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(2);
  const [selectedColor, setSelectedColor] = useState('สีขาว');
  const [selectedSize, setSelectedSize] = useState('M');

  // Mock Product Data
  const product = {
    id: 1,
    name: 'Shirt Fuji & Sakura',
    price: 350,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    ],
    colors: ['สีขาว', 'สีดำ', 'สีเทา'],
    sizes: ['S', 'M', 'L', 'XL'],
    shop: {
      name: 'ร้านขายเสื้อร้านเด็ดเจ้าเก่า'
    },
    description: 'คำอธิบายเกี่ยวกับสินค้าเพิ่มเติม จำหน่ายทางออนไลน์เท่านั้น เสื้อมีความสบาย ผ้าดีมีคุณภาพ ใส่สบายเนื้อผ้าดีมีคุณภาพการรับรองมาตรฐานคลังสินค้า',
    rating: 3,
    reviews: []
  };

  const handleAddToCart = () => {
    console.log('Add to cart:', { product, quantity, selectedColor, selectedSize });
    alert('เพิ่มสินค้าลงตะกร้าแล้ว!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={3} />

      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-blue-600">เลือก</Link>
          <span className="mx-2">/</span>
          <span>เลือกตามาตรวัน</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Images */}
            <div>
              {/* Main Image */}
              <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img 
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div>
              {/* Title & Price */}
              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
              <p className="text-3xl font-bold text-blue-600 mb-6">
                {product.price} บาท
              </p>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block font-medium mb-2">จำนวน</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Color */}
              <div className="mb-6">
                <label className="block font-medium mb-2">COLOR</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color
                          ? 'border-blue-500 bg-gray-100'
                          : 'border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <label className="block font-medium mb-2">SIZE</label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-lg border-2 transition-all font-medium ${
                        selectedSize === size
                          ? 'border-blue-500 bg-gray-100'
                          : 'border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-6"
              >
                <ShoppingCart size={24} />
                ใส่ตะกร้า
              </button>

              {/* Buy Now Button */}
              <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 rounded-xl transition-colors">
                ซื้อเลย
              </button>

              {/* Description */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-lg mb-3">รายละเอียดสินค้า</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">คะแนนสินค้า</h2>
            
            {/* Rating Summary */}
            <div className="bg-gray-100 rounded-xl p-6 mb-6 text-center">
              <div className="text-5xl font-bold mb-2">{product.rating} เต็ม 5</div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={24}
                    className={star <= product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-gray-600">ความคิดเห็นทั้งหมด(2)</p>
            </div>

            {/* Star Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="px-4 py-2 rounded-full border-2 border-gray-300 hover:bg-gray-50">
                1 ดาว(0)
              </button>
              <button className="px-4 py-2 rounded-full border-2 border-gray-300 hover:bg-gray-50">
                2 ดาว(0)
              </button>
              <button className="px-4 py-2 rounded-full border-2 border-gray-300 hover:bg-gray-50">
                3 ดาว(0)
              </button>
              <button className="px-4 py-2 rounded-full border-2 border-gray-300 hover:bg-gray-50">
                4 ดาว(0)
              </button>
              <button className="px-4 py-2 rounded-full border-2 border-gray-300 hover:bg-gray-50">
                5 ดาว(0)
              </button>
              <button className="px-4 py-2 rounded-full border-2 border-gray-300 hover:bg-gray-50">
                ความคิดเห็นทั้งหมด(2)
              </button>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              {[1, 2].map((review) => (
                <div key={review} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="fill-gray-300 text-gray-300" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">user@example.com  2025-09-11</p>
                  <p className="text-gray-700">โดยรวม</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Shop Section */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">ซื้อร้าน</h2>
            <p className="text-xl font-semibold text-blue-600">ร้านขายเสื้อร้านเด็ดเจ้าเก่า</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}