import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Star, Package } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Mock Product Data with Variants including price
  const product = {
    id: 1,
    name: 'Shirt Fuji & Sakura',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    ],
    variants: [
      { id: 1, size: 'S', color: 'สีขาว', price: 350, stock: 10, sku: 'SHIRT-S-WHITE' },
      { id: 2, size: 'M', color: 'สีขาว', price: 350, stock: 15, sku: 'SHIRT-M-WHITE' },
      { id: 3, size: 'M', color: 'สีดำ', price: 380, stock: 5, sku: 'SHIRT-M-BLACK' },
      { id: 4, size: 'L', color: 'สีขาว', price: 380, stock: 8, sku: 'SHIRT-L-WHITE' },
      { id: 5, size: 'L', color: 'สีดำ', price: 380, stock: 0, sku: 'SHIRT-L-BLACK' },
      { id: 6, size: 'XL', color: 'สีเทา', price: 420, stock: 12, sku: 'SHIRT-XL-GRAY' }
    ],
    shop: {
      name: 'ร้านขายเสื้อร้านเด็ดเจ้าเก่า'
    },
    description: 'คำอธิบายเกี่ยวกับสินค้าเพิ่มเติม จำหน่ายทางออนไลน์เท่านั้น เสื้อมีความสบาย ผ้าดีมีคุณภาพ ใส่สบายเนื้อผ้าดีมีคุณภาพการรับรองมาตรฐานคลังสินค้า',
    rating: 3,
    reviews: []
  };

  // คำนวณช่วงราคา
  const priceRange = {
    min: Math.min(...product.variants.map(v => v.price)),
    max: Math.max(...product.variants.map(v => v.price))
  };

  // Get unique sizes and colors
  const sizes = [...new Set(product.variants.map(v => v.size))];
  
  const getAvailableColors = (size) => {
    if (!size) return [];
    return [...new Set(product.variants.filter(v => v.size === size).map(v => v.color))];
  };

  const availableColors = getAvailableColors(selectedSize);

  // Handle size selection
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedColor('');
    setSelectedVariant(null);
  };

  // Handle color selection
  const handleColorChange = (color) => {
    setSelectedColor(color);
    const variant = product.variants.find(v => v.size === selectedSize && v.color === color);
    setSelectedVariant(variant || null);
    
    // Reset quantity if it exceeds new stock
    if (variant && quantity > variant.stock) {
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('กรุณาเลือกขนาดและสี');
      return;
    }

    if (!selectedVariant || selectedVariant.stock === 0) {
      alert('สินค้าหมด');
      return;
    }

    console.log('Add to cart:', { 
      product, 
      variant: selectedVariant,
      quantity,
      totalPrice: selectedVariant.price * quantity
    });
    alert(`เพิ่มสินค้าลงตะกร้าแล้ว!\nขนาด: ${selectedSize}\nสี: ${selectedColor}\nราคา: ฿${selectedVariant.price.toLocaleString()}\nจำนวน: ${quantity} ชิ้น\nรวม: ฿${(selectedVariant.price * quantity).toLocaleString()}`);
  };

  const canAddToCart = selectedSize && selectedColor && selectedVariant && selectedVariant.stock > 0;

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
              
              {/* Price Display */}
              {selectedVariant ? (
                <div className="mb-6">
                  <p className="text-3xl font-bold text-blue-600">
                    ฿{selectedVariant.price.toLocaleString()}
                  </p>
                  {quantity > 1 && (
                    <p className="text-sm text-gray-600 mt-1">
                      รวม: ฿{(selectedVariant.price * quantity).toLocaleString()} ({quantity} ชิ้น)
                    </p>
                  )}
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-3xl font-bold text-blue-600">
                    {priceRange.min === priceRange.max 
                      ? `฿${priceRange.min.toLocaleString()}`
                      : `฿${priceRange.min.toLocaleString()} - ฿${priceRange.max.toLocaleString()}`
                    }
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {priceRange.min !== priceRange.max && 'ราคาขึ้นอยู่กับขนาดและสีที่เลือก'}
                  </p>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block font-medium mb-2 text-lg">เลือกขนาด</label>
                <div className="flex gap-3 flex-wrap">
                  {sizes.map((size) => {
                    // หาราคาขั้นต่ำและสูงสุดของ size นี้
                    const sizePrices = product.variants
                      .filter(v => v.size === size)
                      .map(v => v.price);
                    const minPrice = Math.min(...sizePrices);
                    const maxPrice = Math.max(...sizePrices);
                    
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`px-6 py-3 rounded-lg border-2 transition-all font-medium ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div>{size}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {minPrice === maxPrice 
                            ? `฿${minPrice}`
                            : `฿${minPrice}-${maxPrice}`
                          }
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Selection */}
              {selectedSize && (
                <div className="mb-6">
                  <label className="block font-medium mb-2 text-lg">เลือกสี</label>
                  <div className="flex gap-3 flex-wrap">
                    {availableColors.map((color) => {
                      const variant = product.variants.find(v => v.size === selectedSize && v.color === color);
                      const isOutOfStock = variant && variant.stock === 0;
                      
                      return (
                        <button
                          key={color}
                          onClick={() => !isOutOfStock && handleColorChange(color)}
                          disabled={isOutOfStock}
                          className={`px-6 py-3 rounded-lg border-2 transition-all font-medium relative ${
                            selectedColor === color
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : isOutOfStock
                              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'border-gray-300 bg-white hover:bg-gray-50'
                          }`}
                        >
                          <div>{color}</div>
                          {variant && (
                            <div className="text-xs text-gray-500 mt-1">
                              ฿{variant.price.toLocaleString()}
                            </div>
                          )}
                          {isOutOfStock && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              หมด
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stock Info */}
              {selectedVariant && (
                <div className={`p-4 rounded-xl mb-6 ${
                  selectedVariant.stock > 0 
                    ? 'bg-green-50 border-2 border-green-200' 
                    : 'bg-red-50 border-2 border-red-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <Package size={24} className={selectedVariant.stock > 0 ? 'text-green-600' : 'text-red-600'} />
                    <div>
                      <div className="font-bold text-lg">
                        {selectedVariant.stock > 0 ? 'มีสินค้าพร้อมส่ง' : 'สินค้าหมด'}
                      </div>
                      <div className={`text-sm ${selectedVariant.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                        {selectedVariant.stock > 0 
                          ? `เหลือสินค้า ${selectedVariant.stock} ชิ้น` 
                          : 'ขออภัย สินค้าหมดชั่วคราว'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity */}
              {canAddToCart && (
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
                      onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      disabled={quantity >= selectedVariant.stock}
                    >
                      <Plus size={20} />
                    </button>
                    <span className="text-sm text-gray-600">
                      (สูงสุด {selectedVariant.stock} ชิ้น)
                    </span>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-colors mb-6 font-semibold ${
                  canAddToCart
                    ? 'bg-[#FF9B8A] hover:bg-[#FF8A77] text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={24} />
                {!selectedSize || !selectedColor
                  ? 'กรุณาเลือกขนาดและสี'
                  : !selectedVariant || selectedVariant.stock === 0
                  ? 'สินค้าหมด'
                  : 'ใส่ตะกร้า'}
              </button>

              {/* Buy Now Button */}
              <button 
                disabled={!canAddToCart}
                className={`w-full py-4 rounded-xl transition-colors font-semibold ${
                  canAddToCart
                    ? 'bg-gray-800 hover:bg-gray-900 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                ซื้อเลย
              </button>

              {/* Selected Info */}
              {selectedSize && selectedColor && selectedVariant && selectedVariant.stock > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-600 mb-2">คุณเลือก:</div>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">ขนาด:</span> {selectedSize}</div>
                    <div><span className="font-medium">สี:</span> {selectedColor}</div>
                    <div><span className="font-medium">ราคา:</span> ฿{selectedVariant.price.toLocaleString()}</div>
                    <div><span className="font-medium">SKU:</span> {selectedVariant.sku}</div>
                  </div>
                </div>
              )}

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
            <p className="text-xl font-semibold text-blue-600">{product.shop.name}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}