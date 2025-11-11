import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, QrCode, Wallet } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function PaymentMethod() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('qr');

  const paymentMethods = [
    {
      id: 'qr',
      name: 'คูปองส่วนลด',
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
      name: 'Credit Card',
      icon: <CreditCard size={32} />,
      description: 'ชำระด้วยบัตรเครดิต/เดบิต'
    }
  ];

  const handleConfirm = () => {
    // Mock payment success
    alert('ชำระเงินสำเร็จ! (จำลอง)');
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
          <Wallet size={32} />
          เลือกวิธีการชำระเงิน
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
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

          <button
            onClick={handleConfirm}
            className="w-full mt-6 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard size={24} />
            ชำระเงิน
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}