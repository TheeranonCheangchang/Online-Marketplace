import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, QrCode, Wallet, Tag, X } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function PaymentMethod() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // รับข้อมูลจาก Checkout page
  const orderData = location.state || {
    items: [],
    subtotal: 0,
    shippingFee: 0,
    total: 0
  };

  const [selectedMethod, setSelectedMethod] = useState('qr');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [showCouponInput, setShowCouponInput] = useState(false);

  // Mock available coupons
  const availableCoupons = [
    { code: 'WELCOME10', discount: 10, type: 'percent', minAmount: 0, description: 'ส่วนลด 10%' },
    { code: 'SAVE50', discount: 50, type: 'fixed', minAmount: 500, description: 'ลด 50 บาท (ขั้นต่ำ 500)' },
    { code: 'NEWYEAR', discount: 15, type: 'percent', minAmount: 300, description: 'ส่วนลด 15%' }
  ];

  const paymentMethods = [
    {
      id: 'qr',
      name: 'QR Code',
      icon: <QrCode size={32} />,
      description: 'สแกน QR Code เพื่อชำระเงิน'
    },
    {
      id: 'promptpay',
      name: 'PromptPay',
      icon: <Wallet size={32} />,
      description: 'ชำระผ่าน PromptPay'
    },
    {
      id: 'credit',
      name: 'บัตรเครดิต/เดบิต',
      icon: <CreditCard size={32} />,
      description: 'Visa, Mastercard, JCB'
    }
  ];

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    
    if (!coupon) {
      alert('รหัสคูปองไม่ถูกต้อง');
      return;
    }

    if (orderData.subtotal < coupon.minAmount) {
      alert(`ยอดซื้อขั้นต่ำ ${coupon.minAmount} บาท`);
      return;
    }

    let discountAmount = 0;
    if (coupon.type === 'percent') {
      discountAmount = Math.floor((orderData.subtotal * coupon.discount) / 100);
    } else {
      discountAmount = coupon.discount;
    }

    setAppliedCoupon(coupon);
    setDiscount(discountAmount);
    setShowCouponInput(false);
    alert(`ใช้คูปองสำเร็จ! ส่วนลด ${discountAmount} บาท`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode('');
  };

  const finalTotal = orderData.total - discount;

  const handleConfirm = () => {
    if (!selectedMethod) {
      alert('กรุณาเลือกวิธีการชำระเงิน');
      return;
    }

    // Mock payment process
    const paymentData = {
      method: selectedMethod,
      coupon: appliedCoupon?.code,
      discount: discount,
      total: finalTotal
    };

    console.log('Payment Data:', paymentData);
    
    // Simulate payment gateway
    setTimeout(() => {
      alert(`ชำระเงินสำเร็จ!\nยอดชำระ: ${finalTotal} บาท\nวิธีการชำระ: ${paymentMethods.find(m => m.id === selectedMethod)?.name}`);
      navigate('/orders');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <Wallet size={32} />
          ชำระเงิน
        </h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Payment Methods & Coupon */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="font-bold text-lg">วิธีการชำระเงิน</h2>
              </div>
              <div className="divide-y">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                      selectedMethod === method.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className={`${
                      selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {method.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-lg">{method.name}</h3>
                      <p className="text-gray-600 text-sm">{method.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedMethod === method.id && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <Tag size={20} />
                  คูปองส่วนลด
                </h2>
                {!showCouponInput && !appliedCoupon && (
                  <button
                    onClick={() => setShowCouponInput(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + เพิ่มคูปอง
                  </button>
                )}
              </div>

              <div className="p-6">
                {/* Applied Coupon */}
                {appliedCoupon && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Tag className="text-green-600" size={24} />
                      <div>
                        <p className="font-bold text-green-800">{appliedCoupon.code}</p>
                        <p className="text-sm text-green-600">{appliedCoupon.description}</p>
                        <p className="text-sm text-green-600">ส่วนลด: {discount} บาท</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}

                {/* Coupon Input */}
                {showCouponInput && !appliedCoupon && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="กรอกรหัสคูปอง"
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        ใช้
                      </button>
                    </div>
                    <button
                      onClick={() => setShowCouponInput(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      ยกเลิก
                    </button>
                  </div>
                )}

                {/* Available Coupons */}
                {!appliedCoupon && !showCouponInput && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 mb-3">คูปองที่ใช้ได้:</p>
                    {availableCoupons.map((coupon) => (
                      <div
                        key={coupon.code}
                        className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer"
                        onClick={() => {
                          setCouponCode(coupon.code);
                          setShowCouponInput(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-blue-600">{coupon.code}</p>
                            <p className="text-sm text-gray-600">{coupon.description}</p>
                            {coupon.minAmount > 0 && (
                              <p className="text-xs text-gray-500">ขั้นต่ำ {coupon.minAmount} บาท</p>
                            )}
                          </div>
                          <Tag className="text-gray-400" size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="font-bold text-lg mb-4">สรุปคำสั่งซื้อ</h2>
              
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">ยอดรวมสินค้า</span>
                  <span>฿{orderData.subtotal || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ค่าจัดส่ง</span>
                  <span>฿{orderData.shippingFee || 0}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>ส่วนลด</span>
                    <span>-฿{discount}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-xl font-bold mb-6">
                <span>ยอดชำระทั้งหมด</span>
                <span className="text-[#FF9B8A]">฿{finalTotal}</span>
              </div>

              <button
                onClick={handleConfirm}
                disabled={!selectedMethod}
                className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard size={24} />
                ชำระเงิน ฿{finalTotal}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                การชำระเงินปลอดภัยด้วย SSL Encryption
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
