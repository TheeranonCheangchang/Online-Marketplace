import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Package, FileText, Tag, Store, MessageCircle } from 'lucide-react';

export default function ShopSidebar() {
  const location = useLocation();
  const isActive = (path) => {
    if (path === '/shop/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { path: '/shop/dashboard', icon: LayoutGrid, label: 'Overview' },
    { path: '/shop/products', icon: Package, label: 'Products' },
    { path: '/shop/orders', icon: FileText, label: 'Orders' },
    { path: '/shop/promotions', icon: Tag, label: 'Promotion' },
    { path: '/shop/reviews', icon: MessageCircle, label: 'Reviews' }
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-full">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active 
                  ? 'bg-[#FF9B8A] text-white font-medium' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t">
        <Link
          to="/shop/rental/payment"
          className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          <Store size={20} />
          ข้าระเงินค่าเช่า
        </Link>
      </div>
    </aside>
  );
}