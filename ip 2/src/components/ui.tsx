import React from 'react';
import { getInitials, getAvatarColor } from '../data/mockData';

// ===== AVATAR =====
export const Avatar: React.FC<{ name: string; size?: 'sm' | 'md' | 'lg' }> = ({ name, size = 'md' }) => {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base' };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold text-white shrink-0`}
      style={{ backgroundColor: getAvatarColor(name) }}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
};

// ===== BADGE =====
type BadgeVariant = 'default' | 'orange' | 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'navy';
export const Badge: React.FC<{ children: React.ReactNode; variant?: BadgeVariant; className?: string }> = ({
  children, variant = 'default', className = '',
}) => {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-700',
    orange: 'bg-brand-orange/10 text-brand-orange',
    blue: 'bg-brand-light-blue text-brand-gallery-blue',
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-700',
    yellow: 'bg-amber-50 text-amber-700',
    navy: 'bg-brand-navy/10 text-brand-navy',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// ===== STAGE BADGE =====
export const StageBadge: React.FC<{ stage: string }> = ({ stage }) => {
  const map: Record<string, BadgeVariant> = {
    Applied: 'blue', Screening: 'blue', Shortlisted: 'orange', Interview: 'purple',
    Offer: 'yellow', Hired: 'green', Rejected: 'red', Draft: 'default',
    Published: 'green', Paused: 'yellow', Closed: 'red', Filled: 'navy',
  };
  return <Badge variant={map[stage] || 'default'}>{stage}</Badge>;
};

// ===== STAT CARD =====
export const StatCard: React.FC<{
  label: string; value: string | number; icon: React.ReactNode;
  trend?: string; trendUp?: boolean; className?: string;
}> = ({ label, value, icon, trend, trendUp, className = '' }) => (
  <div className={`bg-white rounded-card border border-border p-5 shadow-card card-interactive ${className}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-text-secondary font-medium">{label}</p>
        <p className="text-2xl font-bold text-brand-navy mt-1 animate-count-up">{value}</p>
        {trend && (
          <p className={`text-xs mt-1 font-medium ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      <div className="w-10 h-10 rounded-xl bg-brand-light-blue flex items-center justify-center text-brand-gallery-blue">
        {icon}
      </div>
    </div>
  </div>
);

// ===== EMPTY STATE =====
export const EmptyState: React.FC<{ icon: React.ReactNode; title: string; description: string; action?: React.ReactNode }> = ({
  icon, title, description, action,
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-16 h-16 rounded-2xl bg-brand-light-blue flex items-center justify-center text-brand-gallery-blue mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-brand-navy mb-2">{title}</h3>
    <p className="text-sm text-text-secondary max-w-sm mb-4">{description}</p>
    {action}
  </div>
);

// ===== SKELETON =====
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`skeleton ${className}`} />
);

// ===== PROGRESS BAR =====
export const ProgressBar: React.FC<{ value: number; max?: number; color?: string; className?: string }> = ({
  value, max = 100, color = '#C65D3B', className = '',
}) => (
  <div className={`w-full bg-gray-100 rounded-full h-2 overflow-hidden ${className}`}>
    <div
      className="h-full rounded-full transition-all duration-700 ease-out"
      style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
    />
  </div>
);

// ===== MATCH SCORE =====
export const MatchScore: React.FC<{ score: number }> = ({ score }) => {
  const color = score >= 85 ? '#22A06B' : score >= 70 ? '#E8A838' : '#DC524B';
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
          <path d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31" fill="none" stroke="#E6E9EC" strokeWidth="3" />
          <path d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31" fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={`${score} ${100 - score}`} strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color }}>{score}</span>
      </div>
    </div>
  );
};

// ===== COMPANY LOGO PLACEHOLDER =====
export const CompanyLogo: React.FC<{ initials: string; size?: 'sm' | 'md' | 'lg' }> = ({ initials, size = 'md' }) => {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-11 h-11 text-sm', lg: 'w-14 h-14 text-base' };
  return (
    <div className={`${sizes[size]} rounded-xl bg-brand-light-blue text-brand-gallery-blue flex items-center justify-center font-bold shrink-0`}>
      {initials}
    </div>
  );
};

// ===== MODAL =====
export const Modal: React.FC<{
  isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode; size?: 'sm' | 'md' | 'lg';
}> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative bg-white rounded-card-lg shadow-modal ${sizes[size]} w-full max-h-[90vh] overflow-y-auto animate-scale-in`}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-brand-navy">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1" aria-label="Close dialog">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ===== TABS =====
export const Tabs: React.FC<{
  tabs: string[]; active: string; onChange: (tab: string) => void;
}> = ({ tabs, active, onChange }) => (
  <div className="flex gap-1 border-b border-border" role="tablist">
    {tabs.map(tab => (
      <button key={tab} role="tab" aria-selected={active === tab}
        onClick={() => onChange(tab)}
        className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
          active === tab
            ? 'text-brand-orange'
            : 'text-text-secondary hover:text-brand-navy'
        }`}
      >
        {tab}
        {active === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />}
      </button>
    ))}
  </div>
);
