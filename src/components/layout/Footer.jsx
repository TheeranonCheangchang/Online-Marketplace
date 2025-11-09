import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-red-500" size={48} />
            <div>
              <div className="text-red-500 font-bold text-lg">Online</div>
              <div className="text-red-500 font-bold text-2xl leading-none">Marketplace</div>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="text-center mb-8">
          <h3 className="font-bold text-xl text-gray-800 mb-4">ONLINE MARKETPLACE</h3>
          <p className="text-gray-600 mb-3">© 2025 — 2035</p>
          <div className="flex justify-center items-center gap-3 text-gray-600">
            <Link to="/privacy" className="hover:text-red-500 transition-colors">
              Privacy
            </Link>
            <span>—</span>
            <Link to="/terms" className="hover:text-red-500 transition-colors">
              Terms
            </Link>
          </div>
        </div>

        {/* Shopping Cart Button */}
        <div className="flex justify-end">
          <Link 
            to="/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors"
          >
            <ShoppingCart size={28} />
            <span className="text-lg">เปิดรถเข็น</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}