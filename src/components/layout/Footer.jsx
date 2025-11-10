import { ShoppingCart, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Logo - Center */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3">
            <ShoppingCart className="text-red-500" size={40} />
            <div>
              <div className="text-red-500 font-bold text-base md:text-lg">Online</div>
              <div className="text-red-500 font-bold text-xl md:text-2xl leading-none">Marketplace</div>
            </div>
          </div>
        </div>

        {/* Footer Content - Stack on Mobile, 3 Columns on Desktop */}
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 mb-6 md:mb-8">
          {/* Left - Footer Info */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-3 md:mb-4">
              ONLINE MARKETPLACE
            </h3>
            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">
              © 2025 — 2035
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 text-xs md:text-sm text-gray-600">
              <Link to="/privacy" className="hover:text-red-500 transition-colors">
                Privacy
              </Link>
              <span>—</span>
              <Link to="/terms" className="hover:text-red-500 transition-colors">
                Terms
              </Link>
            </div>
          </div>

          {/* Center - Empty (Desktop only) */}
          <div className="hidden md:block"></div>

          {/* Right - Create Shop Button */}
          <div className="flex justify-center md:justify-end">
            <Link 
              to="/shop/register"
              className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors font-medium"
            >
              <Store size={24} className="md:w-7 md:h-7" />
              <span className="text-base md:text-lg">สร้างร้านค้า</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}