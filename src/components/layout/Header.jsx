import { useState } from 'react';
import { ShoppingCart, Search, User, ChevronDown, Menu, X, LogOut, Package, UserCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn = false, cartCount = 0, isAdmin = true}) {
// ============================================
// EXAMPLE USAGE IN PAGES
// ============================================

// สำหรับ Admin
// <Header isLoggedIn={true} cartCount={0} isAdmin={true} />

// สำหรับ User ทั่วไป
// <Header isLoggedIn={true} cartCount={3} isAdmin={false} />

// สำหรับ Guest
// <Header isLoggedIn={false} />
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logout clicked');
    setUserDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <ShoppingCart className="text-red-500" size={32} />
            <div className="hidden sm:block">
              <div className="text-red-500 font-bold text-sm">Online</div>
              <div className="text-red-500 font-bold text-lg leading-none">Marketplace</div>
            </div>
          </Link>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
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

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {!isLoggedIn ? (
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
              <>
                {/* Cart */}
                <Link to="/cart" className="relative">
                  <ShoppingCart size={32} className="text-gray-700 hover:text-red-500 transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
                
                {/* User Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <User size={24} />
                    </div>
                    <ChevronDown size={20} className={`transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setUserDropdownOpen(false)}
                      ></div>
                      
                      {/* Menu */}
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {/* Admin Menu - แสดงเฉพาะ Admin */}
                        {isAdmin && (
                          <>
                            <Link 
                              to="/admin/dashboard"
                              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                              onClick={() => setUserDropdownOpen(false)}
                            >
                              <Shield size={20} className="text-blue-600" />
                              <span className="text-gray-700 font-medium">Admin Panel</span>
                            </Link>
                            <hr className="my-2 border-gray-200" />
                          </>
                        )}

                        <Link 
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <UserCircle size={20} className="text-gray-600" />
                          <span className="text-gray-700">โปรไฟล์</span>
                        </Link>
                        
                        <Link 
                          to="/orders"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <Package size={20} className="text-gray-600" />
                          <span className="text-gray-700">ประวัติการสั่งซื้อ</span>
                        </Link>
                        
                        <hr className="my-2 border-gray-200" />
                        
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut size={20} className="text-red-500" />
                          <span className="text-red-500">ออกจากระบบ</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile - Right Section */}
          <div className="flex md:hidden items-center gap-3">
            <button className="p-2">
              <Search size={24} className="text-gray-700" />
            </button>

            {isLoggedIn && (
              <Link to="/cart" className="relative">
                <ShoppingCart size={28} className="text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 border-2 border-gray-900 rounded-full focus:outline-none focus:border-gray-900 text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
          {!isLoggedIn ? (
            <div className="space-y-3">
              <Link 
                to="/login"
                className="block w-full text-center px-6 py-2.5 border-2 border-gray-900 rounded-full hover:bg-gray-50 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                LOGIN
              </Link>
              <Link 
                to="/register"
                className="block w-full text-center px-6 py-2.5 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                REGISTER
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {/* Admin Menu - Mobile */}
              {isAdmin && (
                <>
                  <Link 
                    to="/admin/dashboard"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Shield size={20} className="text-blue-600" />
                    <span className="text-gray-700 font-medium">Admin Panel</span>
                  </Link>
                  <hr className="my-2 border-gray-200" />
                </>
              )}

              <Link 
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserCircle size={20} className="text-gray-600" />
                <span className="text-gray-700">โปรไฟล์</span>
              </Link>
              <Link 
                to="/orders"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package size={20} className="text-gray-600" />
                <span className="text-gray-700">ประวัติการสั่งซื้อ</span>
              </Link>
              <hr className="my-2 border-gray-200" />
              <button 
                className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut size={20} className="text-red-500" />
                <span className="text-red-500">ออกจากระบบ</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}