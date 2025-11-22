import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Chrome, Eye, EyeOff } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin accounts
  const ADMIN_ACCOUNTS = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'admin@marketplace.com', password: 'admin@2025' }
  ];

  // Regular user account
  const USER_ACCOUNT = { email: 'user@example.com', password: 'user123' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน');
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check if admin
    const isAdmin = ADMIN_ACCOUNTS.some(
      account => account.email === email && account.password === password
    );

    if (isAdmin) {
      // Admin login - redirect to admin dashboard
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('userEmail', email);
      console.log('Admin login successful');
      setLoading(false);
      navigate('/admin/dashboard');
      return;
    }

    // Check if regular user
    if (email === USER_ACCOUNT.email && password === USER_ACCOUNT.password) {
      // User login - redirect to home
      localStorage.setItem('isAdmin', 'false');
      localStorage.setItem('userEmail', email);
      console.log('User login successful');
      setLoading(false);
      navigate('/');
      return;
    }

    // Invalid credentials
    setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    console.log('Google Login');
    // TODO: เชื่อมต่อ Google OAuth
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isLoggedIn={false} />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-2">เข้าสู่ระบบ</h1>
            <p className="text-center text-gray-600 text-sm mb-8">ยินดีต้อนรับกลับมา</p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="กรอกอีเมล"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A] placeholder-gray-500 transition disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="กรอกรหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-12 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9B8A] placeholder-gray-500 transition disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF9B8A] hover:bg-[#FF8A77] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'กำลังเข้าสู่ระบบ...' : 'Continue'}
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center mt-4 text-sm">
              ยังไม่มีบัญชี?{' '}
              <Link to="/register" className="text-red-500 hover:underline font-medium">
                สมัครสมาชิก
              </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-4 text-gray-500 font-medium text-sm">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome size={24} className="text-blue-500" />
              Continue with Google
            </button>

            {/* Demo Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              <p className="text-xs font-semibold text-gray-600">🔐 บัญชีทดสอบ:</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-900">👨‍💼 Admin Account:</p>
                <p className="text-xs text-blue-800 mt-1">
                  <span className="font-mono">admin@example.com</span><br />
                  <span className="font-mono">admin123</span>
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-900">👤 User Account:</p>
                <p className="text-xs text-green-800 mt-1">
                  <span className="font-mono">user@example.com</span><br />
                  <span className="font-mono">user123</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}