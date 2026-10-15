import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import CandidateSidebar, { CandidateHeader, CandidateMobileSidebar } from '../components/CandidateSidebar';

const CandidateLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-brand-cream">
      <CandidateSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <CandidateMobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CandidateHeader onMobileMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;
