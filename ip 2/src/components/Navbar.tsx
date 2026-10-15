import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const HireNestLogo: React.FC<{ variant?: 'light' | 'dark' }> = ({ variant = 'dark' }) => (
  <Link to="/" className="flex items-center gap-2.5 group" aria-label="HireNest Home">
    <div className="w-9 h-9 rounded-xl bg-brand-navy flex items-center justify-center relative overflow-hidden">
      <span className="text-white font-bold text-lg font-heading leading-none">H</span>
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand-orange" />
    </div>
    <span className={`text-xl font-bold font-heading ${variant === 'light' ? 'text-white' : 'text-brand-navy'}`}>
      Hire<span className="text-brand-orange">Nest</span>
    </span>
  </Link>
);

export { HireNestLogo };

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Find Jobs', path: '/jobs' },
  { label: 'How It Works', path: '/#how-it-works' },
  { label: 'For Employers', path: '/#employers' },
  { label: 'About', path: '/#about' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <HireNestLogo />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-brand-orange bg-brand-orange/5'
                    : 'text-text-secondary hover:text-brand-navy hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-brand-navy hover:text-brand-orange transition-colors">
              Login
            </Link>
            <Link to="/register"
              className="px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-brand-navy hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-slide-up">
            <div className="flex flex-col gap-1 pt-2">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-brand-orange bg-brand-orange/5'
                      : 'text-text-secondary hover:text-brand-navy hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border mt-2 pt-3 flex flex-col gap-2 px-2">
                <Link to="/login" onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-brand-navy text-center rounded-xl border border-border hover:bg-gray-50 transition-colors">
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl text-center hover:bg-brand-orange-dark transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
