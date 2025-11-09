import { useState } from 'react';
import { ShoppingCart, Search, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn = false, cartCount = 0 }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <ShoppingCart className="text-red-500" size={40} />
            <div>
              <div className="text-red-500 font-bold text-base">Online</div>
              <div className="text-red-500 font-bold text-xl leading-none">Marketplace</div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-16 py-3 border-2 border-gray-900 rounded-full focus:outline-none focus:border-gray-900"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700">
                <Search size={24} />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {!isLoggedIn ? (
              // แบบยังไม่ Login
              <>
                <Link 
                  to="/login"
                  className="px-8 py-2.5 border-2 border-gray-900 rounded-full hover:bg-gray-50 transition-colors font-medium"
                >
                  LOGIN
                </Link>
                <Link 
                  to="/register"
                  className="px-8 py-2.5 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-colors font-medium"
                >
                  REGISTER
                </Link>
              </>
            ) : (
              // แบบ Login แล้ว
              <>
                <Link to="/cart" className="relative">
                  <ShoppingCart size={32} className="text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <User size={24} />
                    </div>
                    <ChevronDown size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}