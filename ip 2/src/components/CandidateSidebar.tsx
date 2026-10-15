import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HireNestLogo } from './Navbar';
import { Avatar } from './ui';
import {
  LayoutDashboard, FileText, Bookmark, CalendarDays,
  MessageSquare, User, Settings, LogOut, Bell, Search, Menu
} from 'lucide-react';

const menuItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/candidate/dashboard' },
  { label: 'My Applications', icon: FileText, path: '/candidate/applications' },
  { label: 'Saved Jobs', icon: Bookmark, path: '#' },
  { label: 'Interviews', icon: CalendarDays, path: '#' },
  { label: 'Messages', icon: MessageSquare, path: '#', badge: 1 },
  { label: 'My Profile', icon: User, path: '/candidate/profile' },
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Logout', icon: LogOut, path: '/login' },
];

const CandidateSidebar: React.FC<{ collapsed: boolean; onToggle: () => void }> = ({ collapsed }) => {
  const location = useLocation();

  return (
    <aside className={`hidden lg:flex flex-col bg-white border-r border-border shrink-0 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}>
      <div className={`flex items-center h-16 border-b border-border ${collapsed ? 'justify-center px-2' : 'px-5'}`}>
        {collapsed ? (
          <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
        ) : (
          <HireNestLogo />
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1" aria-label="Candidate navigation">
        {menuItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.label} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand-orange/10 text-brand-orange'
                  : 'text-text-secondary hover:bg-gray-50 hover:text-brand-navy'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto bg-brand-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

// ===== CANDIDATE HEADER =====
export const CandidateHeader: React.FC<{ onMobileMenuToggle: () => void }> = ({ onMobileMenuToggle }) => {
  const [showNotif, setShowNotif] = useState(false);
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMobileMenuToggle} className="lg:hidden p-2 text-brand-navy hover:bg-gray-100 rounded-lg" aria-label="Toggle menu">
          <Menu size={22} />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 w-64">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="Search jobs..." className="bg-transparent text-sm outline-none flex-1 text-brand-navy placeholder:text-gray-400" aria-label="Search jobs" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button onClick={() => setShowNotif(!showNotif)} className="p-2 text-text-secondary hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-colors relative" aria-label="Notifications">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-card border border-border shadow-dropdown p-4 animate-scale-in z-50">
              <h3 className="text-sm font-semibold text-brand-navy mb-3">Notifications</h3>
              {['Interview scheduled for Oct 17', 'Application under review', 'Profile completion at 85%'].map((n, i) => (
                <div key={i} className="py-2 border-b border-border last:border-0">
                  <p className="text-sm text-text-secondary">{n}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <Avatar name="Aarav Shah" size="sm" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-brand-navy">Aarav Shah</p>
            <p className="text-xs text-text-secondary">Candidate</p>
          </div>
        </div>
      </div>
    </header>
  );
};

// ===== MOBILE CANDIDATE SIDEBAR =====
export const CandidateMobileSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const location = useLocation();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-sidebar animate-slide-in-right overflow-y-auto">
        <div className="flex items-center justify-between h-16 px-5 border-b border-border">
          <HireNestLogo />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="py-4 px-3 space-y-1" aria-label="Mobile candidate navigation">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.label} to={item.path} onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'bg-brand-orange/10 text-brand-orange' : 'text-text-secondary hover:bg-gray-50 hover:text-brand-navy'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default CandidateSidebar;
