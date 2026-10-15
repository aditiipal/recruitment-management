import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users, FileText, Calendar, MessageSquare, Mail, BarChart3,
  ArrowRight, Star, CheckCircle, ChevronRight, Sparkles, Shield, Zap
} from 'lucide-react';
import { features, howItWorks, testimonials, pipelineSteps } from '../data/mockData';

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={24} />, FileText: <FileText size={24} />, Calendar: <Calendar size={24} />,
  MessageSquare: <MessageSquare size={24} />, Mail: <Mail size={24} />, BarChart3: <BarChart3 size={24} />,
};

const LandingPage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="bg-hero-gradient relative">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-light-blue/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-52 h-52 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-40 left-1/2 w-40 h-40 bg-brand-gallery-blue/10 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full border border-border mb-6 text-xs font-medium text-brand-gallery-blue backdrop-blur-sm">
                <Sparkles size={14} className="text-brand-orange" />
                Trusted by modern teams and ambitious professionals
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-brand-navy leading-[1.1] tracking-tight">
                Your next{' '}
                <span className="font-accent italic text-brand-orange">opportunity</span>{' '}
                starts here.
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-lg">
                HireNest brings talented people and growing teams together through a simple, transparent, and smarter hiring experience.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/jobs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm hover:shadow-lg group"
                >
                  Explore Jobs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#employers"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-navy font-semibold rounded-xl border border-border hover:border-brand-gallery-blue hover:bg-brand-light-blue/30 transition-all"
                >
                  For Employers
                </a>
              </div>
              {/* Trust stats */}
              <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-border/50">
                {[
                  { num: '12K+', label: 'Active Candidates' },
                  { num: '850+', label: 'Companies' },
                  { num: '4.8K', label: 'Jobs Posted' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-brand-navy">{s.num}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative animate-slide-up hidden lg:block">
              <div className="bg-white rounded-2xl shadow-card-hover p-6 border border-border">
                {/* Mini pipeline visual */}
                <div className="flex items-center gap-1 mb-5">
                  {pipelineSteps.map((step, i) => (
                    <React.Fragment key={step}>
                      <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        i === 3 ? 'bg-brand-orange text-white' : 'bg-brand-light-blue text-brand-gallery-blue'
                      }`}>{step}</div>
                      {i < pipelineSteps.length - 1 && <ChevronRight size={14} className="text-gray-300 shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>
                {/* Candidate cards */}
                {[
                  { name: 'Aarav Shah', role: 'Sr. Frontend Developer', match: 92, stage: 'Interview' },
                  { name: 'Riya Patil', role: 'Product Designer', match: 88, stage: 'Shortlisted' },
                  { name: 'Meera Krishnan', role: 'ML Engineer', match: 95, stage: 'Hired' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-cream transition-colors border border-transparent hover:border-border mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundColor: ['#5E8FA3', '#C65D3B', '#22A06B'][i] }}>
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-brand-navy">{c.name}</p>
                      <p className="text-xs text-text-secondary">{c.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold" style={{ color: c.match >= 90 ? '#22A06B' : '#E8A838' }}>{c.match}% match</p>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium mt-0.5 ${
                        c.stage === 'Hired' ? 'bg-green-50 text-green-700' :
                        c.stage === 'Interview' ? 'bg-purple-50 text-purple-700' :
                        'bg-brand-orange/10 text-brand-orange'
                      }`}>{c.stage}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Floating metric card */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-dropdown p-4 border border-border animate-pulse-soft">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Satisfaction</p>
                    <p className="text-lg font-bold text-brand-navy">92%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-brand-orange uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy">Everything you need to hire better</h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              From posting jobs to making offers, HireNest streamlines every step of your recruitment process.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-brand-cream/50 border border-border rounded-card-lg p-6 card-interactive group">
                <div className="w-12 h-12 rounded-xl bg-brand-light-blue flex items-center justify-center text-brand-gallery-blue group-hover:bg-brand-orange group-hover:text-white transition-colors mb-4">
                  {iconMap[f.icon]}
                </div>
                <h3 className="text-lg font-semibold text-brand-navy mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-brand-orange uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy">Hiring made simple</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-brand-orange/20 flex items-center justify-center mx-auto mb-4 shadow-card">
                  <span className="text-xl font-bold text-brand-orange">{s.step}</span>
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] w-[calc(100%-20%)] h-0.5 bg-border" />
                )}
                <h3 className="text-base font-semibold text-brand-navy mb-2">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PIPELINE VISUAL ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-brand-navy">Recruitment Pipeline</h2>
            <p className="text-sm text-text-secondary mt-2">Track every candidate through a structured hiring journey</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired'].map((step, i) => {
              const colors = ['#5E8FA3', '#7BA8B8', '#C65D3B', '#7C5CFC', '#E8A838', '#22A06B'];
              return (
                <React.Fragment key={step}>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white shadow-card"
                    style={{ borderLeftColor: colors[i], borderLeftWidth: 3 }}>
                    <span className="text-sm font-semibold" style={{ color: colors[i] }}>{step}</span>
                  </div>
                  {i < 5 && <ArrowRight size={16} className="text-gray-300 shrink-0 hidden sm:block" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FOR EMPLOYERS ===== */}
      <section id="employers" className="py-20 lg:py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-brand-orange uppercase tracking-wider mb-3">For Employers</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                Streamline your entire hiring workflow
              </h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                From creating job postings to extending offers, HireNest gives your team the tools to hire efficiently and collaboratively.
              </p>
              <div className="space-y-4">
                {[
                  'Create and manage job openings',
                  'Track and filter applicants effortlessly',
                  'Collaborate with interviewers in real time',
                  'AI-assisted candidate screening',
                  'Beautiful analytics and reporting',
                  'Structured interview feedback',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-brand-orange mt-0.5 shrink-0" />
                    <span className="text-sm text-brand-navy font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/login" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-brand-orange text-white font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm hover:shadow-lg group">
                Start Hiring <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-card-hover p-6 border border-border">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-brand-light-blue flex items-center justify-center text-brand-gallery-blue">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">Hiring Dashboard</p>
                  <p className="text-xs text-text-secondary">Real-time overview</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Open Jobs', value: '12', color: '#5E8FA3' },
                  { label: 'Applications', value: '248', color: '#C65D3B' },
                  { label: 'Interviews', value: '32', color: '#7C5CFC' },
                  { label: 'Hired', value: '8', color: '#22A06B' },
                ].map(m => (
                  <div key={m.label} className="p-3 rounded-xl bg-brand-cream border border-border">
                    <p className="text-xs text-text-secondary">{m.label}</p>
                    <p className="text-xl font-bold mt-1" style={{ color: m.color }}>{m.value}</p>
                  </div>
                ))}
              </div>
              <div className="h-32 bg-brand-cream rounded-xl flex items-end justify-around p-4 border border-border">
                {[40, 65, 55, 80, 70, 90].map((h, i) => (
                  <div key={i} className="w-6 rounded-t-md transition-all" style={{ height: `${h}%`, backgroundColor: i === 5 ? '#C65D3B' : '#DCEFF5' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOR CANDIDATES ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-brand-cream rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-brand-gallery-blue flex items-center justify-center text-white font-semibold text-sm">AS</div>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">Aarav Shah</p>
                    <p className="text-xs text-text-secondary">Sr. Frontend Developer</p>
                  </div>
                  <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700 rounded-full">85% Complete</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Applications Sent', value: '6', icon: <FileText size={16} /> },
                    { label: 'Interviews Scheduled', value: '2', icon: <Calendar size={16} /> },
                    { label: 'Saved Jobs', value: '12', icon: <Star size={16} /> },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
                      <div className="w-8 h-8 rounded-lg bg-brand-light-blue flex items-center justify-center text-brand-gallery-blue">{item.icon}</div>
                      <span className="text-sm text-text-secondary flex-1">{item.label}</span>
                      <span className="text-sm font-bold text-brand-navy">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-white rounded-xl border border-brand-orange/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse-soft" />
                    <p className="text-xs font-semibold text-brand-navy">Application Progress</p>
                  </div>
                  <div className="flex gap-1">
                    {['Applied', 'Review', 'Shortlisted', 'Interview'].map((s, i) => (
                      <div key={s} className={`flex-1 h-1.5 rounded-full ${i <= 2 ? 'bg-brand-orange' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-brand-orange uppercase tracking-wider mb-3">For Candidates</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                Your career journey, simplified
              </h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Search jobs, build your profile, apply with confidence, and track every step of your application in real time.
              </p>
              <div className="space-y-4">
                {[
                  'Search and filter relevant job openings',
                  'Create a professional candidate profile',
                  'Upload your resume with drag-and-drop',
                  'Apply with one click',
                  'Track application status in real time',
                  'Receive interview updates instantly',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-brand-gallery-blue mt-0.5 shrink-0" />
                    <span className="text-sm text-brand-navy font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/register" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-brand-navy text-white font-semibold rounded-xl hover:bg-brand-navy-light transition-all shadow-sm hover:shadow-lg group">
                Find a Job <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 bg-brand-light-blue/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { num: '12K+', label: 'Active Candidates', icon: <Users size={24} /> },
              { num: '850+', label: 'Companies', icon: <Shield size={24} /> },
              { num: '4.8K', label: 'Jobs Posted', icon: <Zap size={24} /> },
              { num: '92%', label: 'Candidate Satisfaction', icon: <Star size={24} /> },
            ].map(s => (
              <div key={s.label} className="text-center p-6 bg-white rounded-card-lg shadow-card border border-border">
                <div className="w-12 h-12 rounded-xl bg-brand-light-blue flex items-center justify-center text-brand-gallery-blue mx-auto mb-3">
                  {s.icon}
                </div>
                <p className="text-3xl font-bold text-brand-navy">{s.num}</p>
                <p className="text-sm text-text-secondary mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-brand-orange uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy">Loved by teams and candidates</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-brand-cream rounded-card-lg p-6 border border-border card-interactive">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} className="text-brand-orange fill-brand-orange" />
                  ))}
                </div>
                <p className="text-sm text-brand-navy leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: ['#5E8FA3', '#C65D3B', '#7C5CFC'][i] }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{t.name}</p>
                    <p className="text-xs text-text-secondary">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 lg:py-28 bg-cta-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-gallery-blue/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Build your future with <span className="text-brand-orange">HireNest</span>
          </h2>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed">
            Whether you're looking for your next career move or building a world-class team, HireNest makes it simple.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/jobs" className="px-7 py-3 bg-brand-orange text-white font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-lg hover:shadow-xl">
              Find a Job
            </Link>
            <Link to="/login" className="px-7 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
              Start Hiring
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
