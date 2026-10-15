import React, { useState } from 'react';
import { Search, Filter, Download, Plus, ChevronRight, Mail, Phone, FileText, MessageSquare, CalendarDays, ThumbsDown, ThumbsUp, X } from 'lucide-react';
import { mockCandidates, Candidate } from '../../data/mockData';
import { Avatar, StageBadge, MatchScore, Badge, Modal } from '../../components/ui';
import { useToast } from '../../components/Toast';
import { ProgressBar } from '../../components/ui';

const stages = ['All', 'Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'];

// AI Screening Card
const AIScreeningPanel: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
  <div className="p-4 bg-brand-light-blue/30 rounded-xl border border-brand-light-blue space-y-3">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-sm">✨</span>
      <h4 className="text-sm font-semibold text-brand-navy">AI Screening</h4>
      <span className="ml-auto px-2 py-0.5 bg-brand-orange text-white text-xs font-bold rounded-full">{candidate.matchScore}%</span>
    </div>
    {[
      { label: 'Skills match', value: Math.min(100, candidate.matchScore + 3), color: '#22A06B' },
      { label: 'Experience match', value: Math.max(60, candidate.matchScore - 5), color: '#5E8FA3' },
      { label: 'Education match', value: Math.min(100, candidate.matchScore + 1), color: '#7C5CFC' },
      { label: 'Location match', value: Math.max(65, candidate.matchScore - 3), color: '#E8A838' },
    ].map(m => (
      <div key={m.label}>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-text-secondary">{m.label}</span>
          <span className="font-semibold text-brand-navy">{m.value}%</span>
        </div>
        <ProgressBar value={m.value} color={m.color} />
      </div>
    ))}
    <p className="text-[10px] text-text-secondary italic pt-1 border-t border-border">
      ⚠️ AI recommendations are assistive only. Final decisions must be reviewed by authorized recruiters.
    </p>
  </div>
);

// Candidate drawer
const CandidateDrawer: React.FC<{ candidate: Candidate | null; onClose: () => void }> = ({ candidate, onClose }) => {
  const { showToast } = useToast();
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-brand-navy/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-modal animate-slide-in-right">
        <div className="sticky top-0 bg-white border-b border-border px-5 py-4 flex items-center justify-between z-10">
          <h2 className="text-base font-semibold text-brand-navy">Candidate Profile</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close panel">
            <X size={20} />
          </button>
        </div>
        <div className="p-5 space-y-5">
          {/* Header */}
          <div className="flex items-start gap-3">
            <Avatar name={candidate.name} size="lg" />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-brand-navy">{candidate.name}</h3>
              <p className="text-sm text-text-secondary">{candidate.headline}</p>
              <div className="flex items-center gap-2 mt-2">
                <StageBadge stage={candidate.stage} />
                <MatchScore score={candidate.matchScore} />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="flex gap-2">
            <button onClick={() => showToast('Email composed!', 'info')} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border rounded-xl text-xs font-medium text-brand-navy hover:bg-brand-cream transition-colors">
              <Mail size={14} /> Email
            </button>
            <button onClick={() => showToast('Calling candidate…', 'info')} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border rounded-xl text-xs font-medium text-brand-navy hover:bg-brand-cream transition-colors">
              <Phone size={14} /> Call
            </button>
            <button onClick={() => showToast('Message sent!', 'success')} className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-border rounded-xl text-xs font-medium text-brand-navy hover:bg-brand-cream transition-colors">
              <MessageSquare size={14} /> Message
            </button>
          </div>

          {/* AI Screening */}
          <AIScreeningPanel candidate={candidate} />

          {/* Skills */}
          <div>
            <h4 className="text-sm font-semibold text-brand-navy mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {candidate.skills.map(s => (
                <span key={s} className="px-2.5 py-1 bg-brand-light-blue text-brand-gallery-blue text-xs font-medium rounded-lg">{s}</span>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 text-sm">
            {[
              { label: 'Experience', value: candidate.experience },
              { label: 'Education', value: candidate.education },
              { label: 'Location', value: candidate.location },
              { label: 'Applied For', value: candidate.appliedRole },
              { label: 'Applied Date', value: candidate.appliedDate },
              { label: 'Recruiter', value: candidate.recruiter },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-text-secondary text-xs">{item.label}</span>
                <span className="font-medium text-brand-navy text-xs text-right max-w-[55%]">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
            {[
              { label: 'Shortlist', icon: <ThumbsUp size={14} />, toast: 'Candidate shortlisted!', cls: 'bg-brand-orange text-white hover:bg-brand-orange-dark' },
              { label: 'Move to Interview', icon: <CalendarDays size={14} />, toast: 'Moved to interview stage!', cls: 'bg-purple-600 text-white hover:bg-purple-700' },
              { label: 'Download Resume', icon: <FileText size={14} />, toast: 'Resume downloaded!', cls: 'border border-border text-brand-navy hover:bg-brand-cream' },
              { label: 'Reject', icon: <ThumbsDown size={14} />, toast: 'Candidate rejected.', cls: 'border border-red-200 text-red-500 hover:bg-red-50' },
            ].map(a => (
              <button key={a.label} onClick={() => { showToast(a.toast, a.label === 'Reject' ? 'error' : 'success'); onClose(); }}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${a.cls}`}>
                {a.icon} {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecruiterCandidates: React.FC = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  const [selected, setSelected] = useState<Candidate | null>(null);

  const filtered = mockCandidates.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchStage = stageFilter === 'All' || c.stage === stageFilter;
    return matchSearch && matchStage;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Candidates</h1>
          <p className="text-sm text-text-secondary mt-1">{filtered.length} candidates total</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => showToast('Candidate list exported!', 'success')} className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-medium text-text-secondary rounded-xl hover:bg-brand-cream transition-colors">
            <Download size={16} /> Export
          </button>
          <button onClick={() => showToast('Add candidate form coming!', 'info')} className="flex items-center gap-2 px-4 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors shadow-sm">
            <Plus size={16} /> Add Candidate
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-card border border-border p-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 bg-brand-cream rounded-xl px-3 py-2 flex-1 min-w-48">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search candidates or skills…"
            className="bg-transparent text-sm outline-none flex-1 text-brand-navy placeholder:text-gray-400" aria-label="Search candidates" />
        </div>
        <div className="flex flex-wrap gap-2">
          {stages.map(s => (
            <button key={s} onClick={() => setStageFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${stageFilter === s ? 'bg-brand-orange text-white' : 'bg-brand-cream text-text-secondary hover:bg-brand-light-blue hover:text-brand-gallery-blue'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates table */}
      <div className="bg-white rounded-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" aria-label="Candidates">
            <thead>
              <tr className="border-b border-border bg-brand-cream/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Candidate</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden md:table-cell">Role</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden lg:table-cell">Skills</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden sm:table-cell">Stage</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden xl:table-cell">Recruiter</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Match</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-brand-cream/40 transition-colors cursor-pointer" onClick={() => setSelected(c)}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-brand-navy">{c.name}</p>
                        <p className="text-xs text-text-secondary">{c.experience} • {c.location.split(',')[0]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 hidden md:table-cell"><span className="text-xs text-text-secondary whitespace-nowrap">{c.appliedRole}</span></td>
                  <td className="px-3 py-3.5 hidden lg:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {c.skills.slice(0, 2).map(s => (
                        <span key={s} className="px-1.5 py-0.5 bg-brand-light-blue text-brand-gallery-blue text-[10px] rounded">{s}</span>
                      ))}
                      {c.skills.length > 2 && <span className="text-[10px] text-text-secondary">+{c.skills.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-3 py-3.5 hidden sm:table-cell"><StageBadge stage={c.stage} /></td>
                  <td className="px-3 py-3.5 hidden xl:table-cell"><span className="text-xs text-text-secondary">{c.recruiter}</span></td>
                  <td className="px-3 py-3.5">
                    <span className={`text-sm font-bold ${c.matchScore >= 85 ? 'text-green-600' : c.matchScore >= 70 ? 'text-amber-600' : 'text-red-500'}`}>{c.matchScore}%</span>
                  </td>
                  <td className="px-5 py-3.5" onClick={e => e.stopPropagation()}>
                    <button onClick={() => setSelected(c)} className="p-1.5 text-text-secondary hover:text-brand-orange hover:bg-brand-orange/5 rounded-lg transition-colors" aria-label="View candidate">
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CandidateDrawer candidate={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default RecruiterCandidates;
