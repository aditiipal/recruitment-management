import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, Download, ChevronRight } from 'lucide-react';
import { StageBadge, CompanyLogo } from '../../components/ui';
import { Tabs } from '../../components/ui';

const allApplications = [
  { job: 'Senior Frontend Developer', company: 'NovaTech Solutions', logo: 'NT', date: 'Oct 10, 2026', stage: 'Interview', matchScore: 92, recruiter: 'Priya Sharma' },
  { job: 'Product Designer', company: 'PixelCraft Studio', logo: 'PC', date: 'Oct 8, 2026', stage: 'Shortlisted', matchScore: 88, recruiter: 'Sneha Reddy' },
  { job: 'Full Stack Developer', company: 'CloudSync Tech', logo: 'CS', date: 'Oct 5, 2026', stage: 'Applied', matchScore: 78, recruiter: '—' },
  { job: 'React Developer', company: 'GrowthLoop', logo: 'GL', date: 'Oct 3, 2026', stage: 'Rejected', matchScore: 65, recruiter: 'Arjun Nair' },
  { job: 'Frontend Lead', company: 'DeepSignal AI', logo: 'DS', date: 'Sep 28, 2026', stage: 'Hired', matchScore: 94, recruiter: 'Kavita Iyer' },
  { job: 'UI Developer', company: 'PeopleFirst HR', logo: 'PF', date: 'Sep 20, 2026', stage: 'Screening', matchScore: 81, recruiter: 'Priya Sharma' },
];

const tabStages: Record<string, string[]> = {
  'All': [],
  'Active': ['Applied', 'Screening', 'Shortlisted', 'Interview'],
  'Offer': ['Offer'],
  'Hired': ['Hired'],
  'Rejected': ['Rejected'],
};

const stageTimeline = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired'];

const CandidateApplications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allApplications.filter(a => {
    const matchStage = tabStages[activeTab].length === 0 || tabStages[activeTab].includes(a.stage);
    const matchSearch = !search || a.job.toLowerCase().includes(search.toLowerCase()) || a.company.toLowerCase().includes(search.toLowerCase());
    return matchStage && matchSearch;
  });

  const stageIdx = (s: string) => stageTimeline.indexOf(s);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">My Applications</h1>
          <p className="text-sm text-text-secondary mt-1">Track all your job applications in one place</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-medium text-text-secondary rounded-xl hover:bg-brand-cream transition-colors">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Stage timeline overview */}
      <div className="bg-white rounded-card border border-border p-5">
        <h2 className="text-sm font-semibold text-brand-navy mb-4">Your Progress</h2>
        <div className="flex items-center gap-0">
          {stageTimeline.map((s, i) => {
            const count = allApplications.filter(a => stageIdx(a.stage) === i).length;
            const isLast = i === stageTimeline.length - 1;
            const colors = ['#5E8FA3', '#7BA8B8', '#C65D3B', '#7C5CFC', '#E8A838', '#22A06B'];
            return (
              <div key={s} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold mb-1" style={{ backgroundColor: colors[i] }}>
                    {count}
                  </div>
                  <span className="text-[10px] text-text-secondary text-center leading-tight hidden sm:block">{s}</span>
                </div>
                {!isLast && <div className="w-full h-0.5 bg-border -mt-4 sm:-mt-5 hidden sm:block" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-card border border-border">
        <div className="px-5 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-2 bg-brand-cream rounded-xl px-3 py-2 flex-1 sm:max-w-xs">
              <Search size={15} className="text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applications…"
                className="bg-transparent text-sm outline-none flex-1 text-brand-navy placeholder:text-gray-400" aria-label="Search applications" />
            </div>
          </div>
          <Tabs tabs={Object.keys(tabStages)} active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Job applications">
            <thead>
              <tr className="border-b border-border bg-brand-cream/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Job</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden lg:table-cell">Recruiter</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden sm:table-cell">Match</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((app, i) => (
                <tr key={i} className="hover:bg-brand-cream/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <CompanyLogo initials={app.logo} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-brand-navy">{app.job}</p>
                        <p className="text-xs text-text-secondary">{app.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 hidden md:table-cell"><span className="text-xs text-text-secondary">{app.date}</span></td>
                  <td className="px-3 py-4"><StageBadge stage={app.stage} /></td>
                  <td className="px-3 py-4 hidden lg:table-cell"><span className="text-xs text-text-secondary">{app.recruiter}</span></td>
                  <td className="px-3 py-4 hidden sm:table-cell">
                    <span className={`text-xs font-bold ${app.matchScore >= 85 ? 'text-green-600' : app.matchScore >= 70 ? 'text-amber-600' : 'text-red-500'}`}>
                      {app.matchScore}%
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-1.5 text-text-secondary hover:text-brand-orange transition-colors"><ChevronRight size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <Search size={36} className="text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-text-secondary">No applications in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateApplications;
