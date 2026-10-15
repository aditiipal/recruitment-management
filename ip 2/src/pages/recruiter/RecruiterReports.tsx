import React, { useState } from 'react';
import { Download, FileText, TrendingUp, TrendingDown, Clock, Target, Users, Briefcase } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  applicationsOverTime, applicationsBySource, timeToHireByDept,
  hiringActivityMonthly, candidatesByStage
} from '../../data/mockData';
import { useToast } from '../../components/Toast';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl p-3 shadow-dropdown text-xs">
      <p className="font-semibold text-brand-navy mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string; sub: string; trend: number; icon: React.ReactNode; color: string }> = ({ label, value, sub, trend, icon, color }) => (
  <div className="bg-white rounded-card border border-border p-4 card-interactive">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className={`flex items-center gap-1 text-xs font-semibold ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
        {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <p className="text-2xl font-bold text-brand-navy">{value}</p>
    <p className="text-xs font-medium text-brand-navy mt-0.5">{label}</p>
    <p className="text-xs text-text-secondary mt-0.5">{sub}</p>
  </div>
);

const RecruiterReports: React.FC = () => {
  const { showToast } = useToast();
  const [dateRange, setDateRange] = useState('Last 6 months');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Reports & Analytics</h1>
          <p className="text-sm text-text-secondary mt-1">Track hiring performance and pipeline health</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <select value={dateRange} onChange={e => setDateRange(e.target.value)}
            className="px-3 py-2.5 bg-white border border-border rounded-xl text-sm text-brand-navy outline-none focus:border-brand-gallery-blue" aria-label="Date range">
            {['Last 30 days', 'Last 3 months', 'Last 6 months', 'This year'].map(d => <option key={d}>{d}</option>)}
          </select>
          <button onClick={() => showToast('Report exported as CSV!', 'success')} className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-medium text-text-secondary rounded-xl hover:bg-brand-cream transition-colors">
            <Download size={16} /> CSV
          </button>
          <button onClick={() => showToast('Report exported as PDF!', 'success')} className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-medium text-text-secondary rounded-xl hover:bg-brand-cream transition-colors">
            <FileText size={16} /> PDF
          </button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Applications" value="248" sub="+32 this week" trend={14} icon={<Users size={20} />} color="#5E8FA3" />
        <MetricCard label="Avg. Time to Hire" value="18 days" sub="-2 days vs last month" trend={10} icon={<Clock size={20} />} color="#22A06B" />
        <MetricCard label="Offer Acceptance" value="87%" sub="8 of 9 offers accepted" trend={5} icon={<Target size={20} />} color="#C65D3B" />
        <MetricCard label="Interview-to-Hire" value="25%" sub="8 hires / 32 interviews" trend={-3} icon={<Briefcase size={20} />} color="#7C5CFC" />
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Hiring trend */}
        <div className="bg-white rounded-card border border-border p-5">
          <h2 className="text-base font-semibold text-brand-navy mb-4">Monthly Offers & Hires</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hiringActivityMonthly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6E9EC" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="offers" name="Offers" fill="#DCEFF5" radius={[4,4,0,0]} />
              <Bar dataKey="hired" name="Hired" fill="#C65D3B" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Applications over time */}
        <div className="bg-white rounded-card border border-border p-5">
          <h2 className="text-base font-semibold text-brand-navy mb-4">Applications Over Time</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={applicationsOverTime} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="repGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5E8FA3" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#5E8FA3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6E9EC" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="applications" stroke="#5E8FA3" strokeWidth={2} fill="url(#repGradient)" name="Applications" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Source performance */}
        <div className="bg-white rounded-card border border-border p-5">
          <h2 className="text-base font-semibold text-brand-navy mb-4">Source Performance</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={applicationsBySource} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 0 }}>
              <XAxis type="number" tick={{ fontSize: 10, fill: '#6B7280' }} />
              <YAxis dataKey="source" type="category" tick={{ fontSize: 11, fill: '#6B7280' }} width={50} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Applications" fill="#5E8FA3" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Time to hire */}
        <div className="bg-white rounded-card border border-border p-5">
          <h2 className="text-base font-semibold text-brand-navy mb-4">Avg. Days to Hire</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeToHireByDept} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E6E9EC" />
              <XAxis dataKey="dept" tick={{ fontSize: 9, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="days" name="Days" fill="#DCEFF5" radius={[4,4,0,0]}>
                {timeToHireByDept.map((_, i) => (
                  <Cell key={i} fill={i === 4 ? '#C65D3B' : '#5E8FA3'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stage distribution */}
        <div className="bg-white rounded-card border border-border p-5">
          <h2 className="text-base font-semibold text-brand-navy mb-4">Stage Distribution</h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={candidatesByStage} cx="50%" cy="50%" outerRadius={60} dataKey="value" paddingAngle={2}>
                {candidatesByStage.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-3">
            {candidatesByStage.map(s => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-text-secondary truncate">{s.name}</span>
                <span className="ml-auto font-semibold text-brand-navy">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary table */}
      <div className="bg-white rounded-card border border-border p-5">
        <h2 className="text-base font-semibold text-brand-navy mb-4">Hiring Progress by Department</h2>
        <div className="overflow-x-auto">
          <table className="w-full" aria-label="Department hiring progress">
            <thead>
              <tr className="border-b border-border">
                {['Department', 'Target', 'Hired', 'In Progress', 'Open', 'Progress'].map(h => (
                  <th key={h} className="text-left pb-3 text-xs font-semibold text-text-secondary uppercase tracking-wider px-2 first:pl-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { dept: 'Engineering', target: 10, hired: 4, progress: 8, open: 3 },
                { dept: 'Design', target: 5, hired: 2, progress: 4, open: 2 },
                { dept: 'Analytics', target: 4, hired: 1, progress: 5, open: 2 },
                { dept: 'Marketing', target: 3, hired: 1, progress: 2, open: 1 },
              ].map(row => (
                <tr key={row.dept}>
                  <td className="py-3 pl-0 pr-2 text-sm font-medium text-brand-navy">{row.dept}</td>
                  <td className="py-3 px-2 text-sm text-text-secondary">{row.target}</td>
                  <td className="py-3 px-2 text-sm font-semibold text-green-600">{row.hired}</td>
                  <td className="py-3 px-2 text-sm text-brand-gallery-blue">{row.progress}</td>
                  <td className="py-3 px-2 text-sm text-text-secondary">{row.open}</td>
                  <td className="py-3 px-2 min-w-[100px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-orange rounded-full transition-all" style={{ width: `${Math.round((row.hired / row.target) * 100)}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-brand-navy shrink-0">{Math.round((row.hired / row.target) * 100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecruiterReports;
