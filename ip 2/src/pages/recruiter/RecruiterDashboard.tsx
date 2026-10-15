import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Users, CalendarDays, TrendingUp, Clock, Target,
  ArrowRight, ChevronRight, Plus, Video, MessageSquare, BarChart3
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  mockCandidates, mockInterviews, mockActivities,
  applicationsOverTime, candidatesByStage, applicationsBySource, hiringActivityMonthly
} from '../../data/mockData';
import { StatCard, Avatar, StageBadge, Badge } from '../../components/ui';
import { useToast } from '../../components/Toast';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl p-3 shadow-dropdown text-xs">
      <p className="font-semibold text-brand-navy mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

const RecruiterDashboard: React.FC = () => {
  const { showToast } = useToast();

  const recentCandidates = mockCandidates.slice(0, 5);
  const upcoming = mockInterviews.filter(i => i.status === 'Scheduled').slice(0, 3);

  const pipelineCounts = [
    { stage: 'Applied', count: 85, color: '#5E8FA3' },
    { stage: 'Screening', count: 42, color: '#7BA8B8' },
    { stage: 'Shortlisted', count: 45, color: '#C65D3B' },
    { stage: 'Interview', count: 32, color: '#7C5CFC' },
    { stage: 'Offer', count: 12, color: '#E8A838' },
    { stage: 'Hired', count: 8, color: '#22A06B' },
  ];
  const total = pipelineCounts.reduce((a, b) => a + b.count, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Good morning, Priya. 👋</h1>
          <p className="text-sm text-text-secondary mt-1">Here's what's happening with your recruitment activity today.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link to="/recruiter/jobs" onClick={() => {}}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm">
            <Plus size={16} /> New Job
          </Link>
          <Link to="/recruiter/interviews" className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-medium text-brand-navy rounded-xl hover:bg-brand-cream transition-colors">
            <CalendarDays size={16} /> Schedule Interview
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Open Jobs" value="12" icon={<Briefcase size={20} />} trend="+2 this month" trendUp />
        <StatCard label="Total Applications" value="248" icon={<Users size={20} />} trend="+32 this week" trendUp />
        <StatCard label="Shortlisted" value="45" icon={<Target size={20} />} trend="+8 this week" trendUp />
        <StatCard label="Interviews" value="32" icon={<CalendarDays size={20} />} trend="This week" trendUp />
        <StatCard label="Hired" value="8" icon={<TrendingUp size={20} />} trend="+3 this month" trendUp />
        <StatCard label="Avg. Time-to-Hire" value="18d" icon={<Clock size={20} />} trend="-2d vs last month" trendUp />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Applications over time */}
        <div className="lg:col-span-2 bg-white rounded-card border border-border p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-brand-navy">Applications Over Time</h2>
            <select className="text-xs border border-border rounded-lg px-2 py-1 text-text-secondary outline-none bg-transparent" aria-label="Time period">
              <option>Last 6 months</option><option>Last 3 months</option><option>This month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={applicationsOverTime} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="appGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5E8FA3" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#5E8FA3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6E9EC" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="applications" stroke="#5E8FA3" strokeWidth={2} fill="url(#appGradient)" name="Applications" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Candidate by stage donut */}
        <div className="bg-white rounded-card border border-border p-5">
          <h2 className="text-base font-semibold text-brand-navy mb-4">By Stage</h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={candidatesByStage} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                {candidatesByStage.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {candidatesByStage.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-text-secondary">{s.name}</span>
                </div>
                <span className="font-semibold text-brand-navy">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline funnel */}
      <div className="bg-white rounded-card border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-brand-navy">Recruitment Funnel</h2>
          <Link to="/recruiter/pipeline" className="text-xs text-brand-orange hover:underline flex items-center gap-1">Full pipeline <ChevronRight size={12} /></Link>
        </div>
        <div className="flex items-end gap-2 h-28">
          {pipelineCounts.map((s, i) => {
            const pct = Math.round((s.count / total) * 100);
            const h = Math.max(20, Math.round((s.count / pipelineCounts[0].count) * 100));
            return (
              <div key={s.stage} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg transition-all" style={{ height: `${h}%`, backgroundColor: s.color, minHeight: 8 }} title={`${s.stage}: ${s.count}`} />
                <span className="text-[10px] text-text-secondary hidden sm:block leading-tight text-center">{s.stage}</span>
                <span className="text-xs font-bold" style={{ color: s.color }}>{s.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent applications */}
        <div className="lg:col-span-2 bg-white rounded-card border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-brand-navy">Recent Applications</h2>
            <Link to="/recruiter/candidates" className="text-xs text-brand-orange hover:underline flex items-center gap-1">All candidates <ChevronRight size={12} /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Recent applications">
              <thead>
                <tr className="border-b border-border bg-brand-cream/30">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Candidate</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden sm:table-cell">Role</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Stage</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">Match</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentCandidates.map(c => (
                  <tr key={c.id} className="hover:bg-brand-cream/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={c.name} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-brand-navy">{c.name}</p>
                          <p className="text-xs text-text-secondary">{c.experience}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 hidden sm:table-cell"><span className="text-xs text-text-secondary">{c.appliedRole}</span></td>
                    <td className="px-3 py-3.5"><StageBadge stage={c.stage} /></td>
                    <td className="px-3 py-3.5 hidden md:table-cell">
                      <span className={`text-xs font-bold ${c.matchScore >= 85 ? 'text-green-600' : 'text-amber-600'}`}>{c.matchScore}%</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link to="/recruiter/candidates" className="text-xs font-medium text-brand-gallery-blue hover:text-brand-orange transition-colors">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column: Upcoming interviews + Activity */}
        <div className="space-y-5">
          {/* Upcoming interviews */}
          <div className="bg-white rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-brand-navy flex items-center gap-2"><CalendarDays size={16} className="text-brand-orange" />Upcoming Interviews</h2>
              <Link to="/recruiter/interviews" className="text-xs text-brand-orange hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {upcoming.map(interview => (
                <div key={interview.id} className="p-3 bg-brand-cream rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Avatar name={interview.candidateName} size="sm" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-brand-navy truncate">{interview.candidateName}</p>
                      <p className="text-[10px] text-text-secondary truncate">{interview.jobRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-text-secondary">
                    <span>{interview.date} • {interview.time}</span>
                    <Badge variant="blue">{interview.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="bg-white rounded-card border border-border p-5">
            <h2 className="text-sm font-semibold text-brand-navy mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {mockActivities.slice(0, 5).map(act => {
                const icons: Record<string, string> = { shortlist: '📌', publish: '📢', interview: '📅', offer: '🎉', resume: '📄', hire: '✅', apply: '📨' };
                return (
                  <div key={act.id} className="flex items-start gap-2.5">
                    <span className="text-base mt-0.5">{icons[act.type]}</span>
                    <div>
                      <p className="text-xs text-brand-navy leading-tight">{act.text}</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">{act.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-card border border-border p-5">
        <h2 className="text-sm font-semibold text-brand-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Create Job', icon: <Plus size={18} />, to: '/recruiter/jobs', color: 'bg-brand-orange text-white hover:bg-brand-orange-dark' },
            { label: 'Add Candidate', icon: <Users size={18} />, to: '/recruiter/candidates', color: 'bg-brand-light-blue text-brand-gallery-blue hover:bg-brand-gallery-blue hover:text-white' },
            { label: 'Schedule Interview', icon: <CalendarDays size={18} />, to: '/recruiter/interviews', color: 'bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white' },
            { label: 'View Reports', icon: <BarChart3 size={18} />, to: '/recruiter/reports', color: 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white' },
            { label: 'Send Message', icon: <MessageSquare size={18} />, to: '/recruiter/messages', color: 'bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white' },
          ].map(a => (
            <Link key={a.label} to={a.to}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl text-center text-xs font-semibold transition-all ${a.color}`}>
              {a.icon} {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
