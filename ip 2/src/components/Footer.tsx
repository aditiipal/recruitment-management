import React from 'react';
import { Link } from 'react-router-dom';
import { HireNestLogo } from './Navbar';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-brand-navy text-white" role="contentinfo">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <HireNestLogo variant="light" />
          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">
            HireNest brings talented people and growing teams together through a simple, transparent, and smarter hiring experience.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { icon: <Linkedin size={18} />, label: 'LinkedIn' },
              { icon: <Twitter size={18} />, label: 'Twitter' },
              { icon: <Github size={18} />, label: 'GitHub' },
              { icon: <Mail size={18} />, label: 'Email' },
            ].map(s => (
              <a key={s.label} href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
          <ul className="space-y-2.5">
            {['Find Jobs', 'For Employers', 'Pricing', 'Integrations', 'API'].map(item => (
              <li key={item}><Link to="/jobs" className="text-sm text-gray-400 hover:text-brand-orange transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2.5">
            {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map(item => (
              <li key={item}><a href="#" className="text-sm text-gray-400 hover:text-brand-orange transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2.5">
            {['Help Center', 'Privacy Policy', 'Terms of Service', 'Security', 'Accessibility'].map(item => (
              <li key={item}><a href="#" className="text-sm text-gray-400 hover:text-brand-orange transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500">© 2026 HireNest. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms</a>
          <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
