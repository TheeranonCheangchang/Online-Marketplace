import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Store, FileText, Tag, FolderTree } from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();
  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutGrid, label: 'Overview' },
    { path: '/admin/shops', icon: Store, label: 'Shop & Seller' },
    { path: '/admin/orders', icon: FileText, label: 'Orders' },
    { path: '/admin/coupons', icon: Tag, label: 'Coupon' },
    { path: '/admin/categories', icon: FolderTree, label: 'Category' }
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-full shadow-sm">
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
    </aside>
  );
}