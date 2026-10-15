import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Briefcase, Users } from 'lucide-react';
import { HireNestLogo } from '../components/Navbar';
import { useToast } from '../components/Toast';

type UserType = 'candidate' | 'recruiter' | 'admin';

const LoginPage: React.FC = () => {
  const [userType, setUserType] = useState<UserType>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const userTypeConfig = {
    candidate: { label: 'Candidate', icon: <Users size={16} />, redirect: '/candidate/dashboard', email: 'aarav@example.com' },
    recruiter: { label: 'Recruiter', icon: <Briefcase size={16} />, redirect: '/recruiter/dashboard', email: 'priya@example.com' },
    admin: { label: 'Administrator', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, redirect: '/recruiter/dashboard', email: 'admin@example.com' },
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    showToast('Welcome back! Logging you in…', 'success');
    setTimeout(() => navigate(userTypeConfig[userType].redirect), 500);
  };

  const config = userTypeConfig[userType];

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 bg-white">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <HireNestLogo />
            <h1 className="text-2xl font-bold text-brand-navy mt-6 mb-1">Welcome back</h1>
            <p className="text-sm text-text-secondary">Sign in to your HireNest account</p>
          </div>

          {/* User type selector */}
          <div className="flex bg-brand-cream rounded-xl p-1 mb-6 border border-border">
            {(Object.keys(userTypeConfig) as UserType[]).map(type => (
              <button key={type} onClick={() => { setUserType(type); setEmail(userTypeConfig[type].email); setPassword(''); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${userType === type ? 'bg-white text-brand-navy shadow-card' : 'text-text-secondary hover:text-brand-navy'}`}
                aria-pressed={userType === type}
              >
                {userTypeConfig[type].icon} {userTypeConfig[type].label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-navy mb-1.5">Email address</label>
              <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-brand-cream border border-border rounded-xl text-sm text-brand-navy placeholder:text-gray-400 focus:outline-none focus:border-brand-gallery-blue focus:ring-2 focus:ring-brand-light-blue transition-all" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brand-navy mb-1.5">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-brand-cream border border-border rounded-xl text-sm text-brand-navy placeholder:text-gray-400 focus:outline-none focus:border-brand-gallery-blue focus:ring-2 focus:ring-brand-light-blue transition-all pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-navy transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="accent-brand-orange w-4 h-4" />
                <span className="text-sm text-text-secondary">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-brand-orange hover:underline">Forgot password?</Link>
            </div>

            <button type="submit" disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 bg-brand-orange text-white font-semibold rounded-xl transition-all shadow-sm ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-orange-dark hover:shadow-md'}`}>
              {loading ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" /></svg> Signing in…</>
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-5">
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-text-secondary">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { name: 'Google', icon: 'G' },
                { name: 'Microsoft', icon: 'M' },
              ].map(p => (
                <button key={p.name}
                  className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl text-sm font-medium text-brand-navy hover:bg-brand-cream transition-colors"
                  onClick={() => showToast(`${p.name} login is for demo purposes`, 'info')}>
                  <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs bg-brand-light-blue text-brand-gallery-blue">{p.icon}</span>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-orange font-semibold hover:underline">Create one free</Link>
          </p>

          {/* Demo hint */}
          <div className="mt-6 p-3 bg-brand-light-blue/40 rounded-xl border border-brand-light-blue">
            <p className="text-xs text-brand-gallery-blue text-center">
              <strong>Demo:</strong> Click any role tab above and hit Sign In to explore the platform
            </p>
          </div>
        </div>
      </div>

      {/* Right: Illustration */}
      <div className="hidden lg:flex flex-1 bg-cta-gradient flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-brand-gallery-blue/20 rounded-full blur-3xl" />
        <div className="relative max-w-sm text-center">
          <div className="w-20 h-20 rounded-3xl bg-brand-orange/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-brand-orange/30">
            <span className="text-3xl font-bold text-brand-orange">H</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Find the right talent. Build the right future.</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-8">
            Join thousands of candidates and hundreds of companies using HireNest for smarter, fairer, and faster hiring.
          </p>
          {/* Floating cards */}
          <div className="space-y-3">
            {[
              { text: 'Interview scheduled for Aarav Shah', icon: '📅', color: 'bg-white/10' },
              { text: 'Meera Krishnan — Hired as ML Intern', icon: '🎉', color: 'bg-green-500/20' },
              { text: '12 new applications this morning', icon: '📋', color: 'bg-white/10' },
            ].map((card, i) => (
              <div key={i} className={`${card.color} backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 text-left`}>
                <span className="text-xl">{card.icon}</span>
                <span className="text-sm text-white/90">{card.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
