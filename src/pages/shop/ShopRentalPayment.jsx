import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, CheckCircle, AlertCircle, Calendar, DollarSign } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ShopSidebar from '../../components/layout/ShopSidebar';

export default function ShopRentalPayment() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error

  // Mock rental data
  const rentalInfo = {
    shopName: 'My Fashion Store',
    monthlyRate: 500,
    dueDate: '2025-12-01',
    period: 'ธันวาคม 2025',
    status: 'pending' // pending, paid, overdue
  };

  const paymentMethods = [
    {
      id: 1,
      bank: 'ธนาคารกสิกรไทย',
      accountName: 'Online Marketplace',
      accountNumber: '123-4-56789-0',
      type: 'ออมทรัพย์'
    },
    {
      id: 2,
      bank: 'ธนาคารไทยพาณิชย์',
      accountName: 'Online Marketplace',
      accountNumber: '987-6-54321-0',
      type: 'กระแสรายวัน'
    }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('ขนาดไฟล์ต้องไม่เกิน 5MB');
        return;
      }

      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setUploadStatus('idle');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setUploadStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('กรุณาอัพโหลดหslip การโอนเงิน');
      return;
    }

    setUploadStatus('uploading');

    // Simulate upload
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => {
        alert('ส่งหลักฐานการชำระเงินเรียบร้อย!\nรอการตรวจสอบจากแอดมิน');
        navigate('/shop/dashboard');
      }, 1500);
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('คัดลอกเลขบัญชีแล้ว');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={true} cartCount={0} />

      <div className="flex-1 flex">
        <ShopSidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6">ชำระเงินค่าเช่าร้าน</h1>

            {/* Rental Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{rentalInfo.shopName}</h2>
                  <p className="text-gray-600">งวดชำระ: {rentalInfo.period}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  rentalInfo.status === 'paid' 
                    ? 'bg-green-100 text-green-700' 
                    : rentalInfo.status === 'overdue'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {rentalInfo.status === 'paid' ? 'ชำระแล้ว' : 
                   rentalInfo.status === 'overdue' ? 'เกินกำหนด' : 'รอชำระ'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">จำนวนเงิน</p>
                    <p className="text-xl font-bold text-gray-800">{rentalInfo.monthlyRate.toLocaleString()} ฿</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">กำหนดชำระ</p>
                    <p className="text-lg font-bold text-gray-800">
                      {new Date(rentalInfo.dueDate).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">บัญชีสำหรับโอนเงิน</h3>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-800">{method.bank}</p>
                        <p className="text-sm text-gray-600">ประเภท: {method.type}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <p className="text-sm text-gray-600 mb-1">ชื่อบัญชี</p>
                      <p className="font-medium text-gray-800">{method.accountName}</p>
                      <p className="text-sm text-gray-600 mt-2 mb-1">เลขที่บัญชี</p>
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-lg font-bold text-gray-800">{method.accountNumber}</p>
                        <button
                          onClick={() => copyToClipboard(method.accountNumber.replace(/-/g, ''))}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          คัดลอก
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Slip Form */}
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">อัพโหลดหลักฐานการโอนเงิน</h3>

                {/* Upload Area */}
                <div className="mb-4">
                  {!imagePreview ? (
                    <label className="block">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                        <Upload className="mx-auto text-gray-400 mb-3" size={48} />
                        <p className="text-gray-600 mb-1">คลิกเพื่ออัพโหลด slip การโอนเงิน</p>
                        <p className="text-sm text-gray-500">รองรับไฟล์: JPG, PNG, GIF (ขนาดไม่เกิน 5MB)</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative">
                      <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                        <img
                          src={imagePreview}
                          alt="Slip preview"
                          className="max-h-96 mx-auto rounded-lg"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Upload Status */}
                {uploadStatus === 'uploading' && (
                  <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    <p className="text-blue-700 font-medium">กำลังอัพโหลด...</p>
                  </div>
                )}

                {uploadStatus === 'success' && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                    <CheckCircle className="text-green-600" size={24} />
                    <p className="text-green-700 font-medium">อัพโหลดสำเร็จ!</p>
                  </div>
                )}

                {uploadStatus === 'error' && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                    <AlertCircle className="text-red-600" size={24} />
                    <p className="text-red-700 font-medium">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</p>
                  </div>
                )}

                {/* Note */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>หมายเหตุ:</strong> กรุณาตรวจสอบความชัดเจนของหลักฐานการโอนเงินก่อนส่ง 
                    เพื่อความรวดเร็วในการตรวจสอบ
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/shop/dashboard')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
                    disabled={uploadStatus === 'uploading'}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedFile || uploadStatus === 'uploading'}
                  >
                    {uploadStatus === 'uploading' ? 'กำลังส่ง...' : 'ยืนยันการชำระเงิน'}
                  </button>
                </div>
              </div>
            </form>

            {/* Payment History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold mb-4">ประวัติการชำระเงิน</h3>
              <div className="space-y-3">
                {[
                  { month: 'พฤศจิกายน 2025', amount: 500, date: '2025-11-01', status: 'approved' },
                  { month: 'ตุลาคม 2025', amount: 500, date: '2025-10-01', status: 'approved' },
                  { month: 'กันยายน 2025', amount: 500, date: '2025-09-01', status: 'approved' }
                ].map((payment, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{payment.month}</p>
                      <p className="text-sm text-gray-600">
                        ชำระเมื่อ: {new Date(payment.date).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{payment.amount} ฿</p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        อนุมัติแล้ว
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}