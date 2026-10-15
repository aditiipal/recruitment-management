import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HireNestLogo } from './Navbar';
import { Avatar } from './ui';
import {
  LayoutDashboard, Briefcase, Users, GitBranch, CalendarDays,
  MessageSquare, UserCog, BarChart3, Settings, HelpCircle,
  LogOut, ChevronLeft, Bell, Search, Menu
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/recruiter/dashboard' },
  { label: 'Jobs', icon: Briefcase, path: '/recruiter/jobs' },
  { label: 'Candidates', icon: Users, path: '/recruiter/candidates' },
  { label: 'Pipeline', icon: GitBranch, path: '/recruiter/pipeline' },
  { label: 'Interviews', icon: CalendarDays, path: '/recruiter/interviews' },
  { label: 'Messages', icon: MessageSquare, path: '/recruiter/messages', badge: 2 },
  { label: 'Team', icon: UserCog, path: '#' },
  { label: 'Reports', icon: BarChart3, path: '/recruiter/reports' },
];

const bottomItems = [
  { label: 'Settings', icon: Settings, path: '/settings' },
  { label: 'Help', icon: HelpCircle, path: '#' },
  { label: 'Logout', icon: LogOut, path: '/login' },
];

const RecruiterSidebar: React.FC<{ collapsed: boolean; onToggle: () => void }> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-navy-gradient text-white shrink-0 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[260px]'}`}>
        {/* Logo */}
        <div className={`flex items-center h-16 border-b border-white/10 ${collapsed ? 'justify-center px-2' : 'px-5'}`}>
          {collapsed ? (
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
          ) : (
            <HireNestLogo variant="light" />
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto" aria-label="Recruiter navigation">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={20} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="ml-auto bg-brand-orange/80 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Items */}
        <div className="border-t border-white/10 py-4 px-3 space-y-1">
          {bottomItems.map(item => (
            <Link key={item.label} to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all"
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* Collapse Toggle */}
        <button onClick={onToggle}
          className="m-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center justify-center"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft size={18} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </aside>
    </>
  );
};

// ===== TOP HEADER FOR RECRUITER =====
export const RecruiterHeader: React.FC<{ onMobileMenuToggle: () => void }> = ({ onMobileMenuToggle }) => {
  const [showNotif, setShowNotif] = useState(false);
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={onMobileMenuToggle} className="lg:hidden p-2 text-brand-navy hover:bg-gray-100 rounded-lg" aria-label="Toggle menu">
          <Menu size={22} />
        </button>
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 w-72">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="Search candidates, jobs..." className="bg-transparent text-sm outline-none flex-1 text-brand-navy placeholder:text-gray-400" aria-label="Global search" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button onClick={() => setShowNotif(!showNotif)} className="p-2 text-text-secondary hover:text-brand-navy hover:bg-gray-100 rounded-lg transition-colors relative" aria-label="Notifications">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-orange rounded-full" />
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-card border border-border shadow-dropdown p-4 animate-scale-in z-50">
              <h3 className="text-sm font-semibold text-brand-navy mb-3">Notifications</h3>
              {['New application from Rohan Gupta', 'Interview feedback pending for Kabir', 'Job posting deadline approaching'].map((n, i) => (
                <div key={i} className="py-2 border-b border-border last:border-0">
                  <p className="text-sm text-text-secondary">{n}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{i === 0 ? '2 hours ago' : i === 1 ? '5 hours ago' : '1 day ago'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <Avatar name="Priya Sharma" size="sm" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-brand-navy">Priya Sharma</p>
            <p className="text-xs text-text-secondary">HR Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};

// ===== MOBILE SIDEBAR OVERLAY =====
export const MobileSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const location = useLocation();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-brand-navy/50 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-navy-gradient text-white animate-slide-in-right overflow-y-auto">
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/10">
          <HireNestLogo variant="light" />
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1" aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="py-4 px-3 space-y-1" aria-label="Mobile navigation">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'bg-brand-orange text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.badge && <span className="ml-auto bg-brand-orange/80 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 py-4 px-3 space-y-1">
          {bottomItems.map(item => (
            <Link key={item.label} to={item.path} onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default RecruiterSidebar;
