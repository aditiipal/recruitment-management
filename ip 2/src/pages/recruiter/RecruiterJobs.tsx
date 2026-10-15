import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Copy, Pause, X, Trash2, ChevronDown } from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import { StageBadge, Badge, CompanyLogo, Modal, EmptyState } from '../../components/ui';
import { useToast } from '../../components/Toast';

const departments = ['All', 'Engineering', 'Design', 'Analytics', 'Marketing', 'HR', 'AI/ML'];
const statuses = ['All', 'Published', 'Draft', 'Paused', 'Closed', 'Filled'];

const JobFormModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { showToast } = useToast();
  return (
    <form onSubmit={(e) => { e.preventDefault(); showToast('Job published successfully!', 'success'); onClose(); }} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: 'Job Title', id: 'jtitle', placeholder: 'e.g. Senior Frontend Developer', required: true },
          { label: 'Department', id: 'dept', placeholder: 'e.g. Engineering' },
          { label: 'Location', id: 'loc', placeholder: 'e.g. Bangalore, India' },
          { label: 'Salary Range', id: 'sal', placeholder: 'e.g. ₹18L – ₹28L' },
        ].map(f => (
          <div key={f.id}>
            <label htmlFor={f.id} className="block text-sm font-medium text-brand-navy mb-1.5">{f.label}{f.required && <span className="text-brand-orange ml-1">*</span>}</label>
            <input id={f.id} placeholder={f.placeholder} required={f.required} className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue focus:ring-2 focus:ring-brand-light-blue transition-all" />
          </div>
        ))}
        <div>
          <label htmlFor="wmode" className="block text-sm font-medium text-brand-navy mb-1.5">Work Mode</label>
          <select id="wmode" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all">
            <option>Hybrid</option><option>Remote</option><option>On-site</option>
          </select>
        </div>
        <div>
          <label htmlFor="jtype" className="block text-sm font-medium text-brand-navy mb-1.5">Job Type</label>
          <select id="jtype" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all">
            <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="jdesc" className="block text-sm font-medium text-brand-navy mb-1.5">Job Description <span className="text-brand-orange">*</span></label>
        <textarea id="jdesc" rows={4} required placeholder="Describe the role, team, and what you're looking for…" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue resize-none transition-all" />
      </div>
      <div>
        <label htmlFor="jskills" className="block text-sm font-medium text-brand-navy mb-1.5">Required Skills</label>
        <input id="jskills" placeholder="React, TypeScript, Node.js (comma separated)" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="jdeadline" className="block text-sm font-medium text-brand-navy mb-1.5">Application Deadline</label>
          <input id="jdeadline" type="date" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all" />
        </div>
        <div>
          <label htmlFor="hiring-mgr" className="block text-sm font-medium text-brand-navy mb-1.5">Hiring Manager</label>
          <input id="hiring-mgr" placeholder="Priya Sharma" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-border text-sm font-semibold text-text-secondary rounded-xl hover:bg-brand-cream transition-colors">Save as Draft</button>
        <button type="submit" className="flex-1 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors">Publish Job</button>
      </div>
    </form>
  );
};

const RecruiterJobs: React.FC = () => {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');
  const [status, setStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = mockJobs.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === 'All' || j.department === dept;
    const matchStatus = status === 'All' || j.status === status;
    return matchSearch && matchDept && matchStatus;
  });

  const actions = (id: string) => [
    { label: 'View', icon: <Eye size={14} />, action: () => {} },
    { label: 'Edit', icon: <Edit size={14} />, action: () => {} },
    { label: 'Duplicate', icon: <Copy size={14} />, action: () => showToast('Job duplicated!', 'info') },
    { label: 'Pause', icon: <Pause size={14} />, action: () => showToast('Job paused.', 'info') },
    { label: 'Close', icon: <X size={14} />, action: () => showToast('Job closed.', 'info') },
    { label: 'Delete', icon: <Trash2 size={14} />, action: () => showToast('Job deleted.', 'error'), danger: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Jobs</h1>
          <p className="text-sm text-text-secondary mt-1">{filtered.length} active job openings</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm">
          <Plus size={16} /> Create New Job
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-card border border-border p-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 bg-brand-cream rounded-xl px-3 py-2 flex-1 min-w-48">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs…"
            className="bg-transparent text-sm outline-none flex-1 text-brand-navy placeholder:text-gray-400" aria-label="Search jobs" />
        </div>
        <select value={dept} onChange={e => setDept(e.target.value)} className="px-3 py-2 bg-brand-cream border border-border rounded-xl text-sm text-brand-navy outline-none focus:border-brand-gallery-blue" aria-label="Filter by department">
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2 bg-brand-cream border border-border rounded-xl text-sm text-brand-navy outline-none focus:border-brand-gallery-blue" aria-label="Filter by status">
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Jobs table */}
      <div className="bg-white rounded-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" aria-label="Job listings">
            <thead>
              <tr className="border-b border-border bg-brand-cream/30">
                {['Job', 'Department', 'Location', 'Applicants', 'Interviews', 'Posted', 'Deadline', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    {h && h !== '' && <div className="flex items-center gap-1">{h} <ChevronDown size={12} /></div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(job => (
                <tr key={job.id} className="hover:bg-brand-cream/40 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <CompanyLogo initials={job.companyLogo} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-brand-navy whitespace-nowrap">{job.title}</p>
                        <p className="text-xs text-text-secondary">{job.workMode} • {job.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><span className="text-xs text-text-secondary whitespace-nowrap">{job.department}</span></td>
                  <td className="px-4 py-3.5"><span className="text-xs text-text-secondary whitespace-nowrap">{job.location.split(',')[0]}</span></td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy">
                      <span className="w-2 h-2 rounded-full bg-brand-orange inline-block" />{job.applicants}
                    </span>
                  </td>
                  <td className="px-4 py-3.5"><span className="text-xs font-semibold text-brand-gallery-blue">{job.interviews}</span></td>
                  <td className="px-4 py-3.5"><span className="text-xs text-text-secondary whitespace-nowrap">{job.postedDate}</span></td>
                  <td className="px-4 py-3.5"><span className="text-xs text-text-secondary whitespace-nowrap">{job.deadline}</span></td>
                  <td className="px-4 py-3.5"><StageBadge stage={job.status} /></td>
                  <td className="px-4 py-3.5 relative">
                    <button onClick={() => setOpenMenu(openMenu === job.id ? null : job.id)}
                      className="p-1.5 text-text-secondary hover:text-brand-navy hover:bg-brand-cream rounded-lg transition-colors" aria-label="Job actions">
                      <MoreVertical size={16} />
                    </button>
                    {openMenu === job.id && (
                      <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-dropdown border border-border py-1 z-30 animate-scale-in">
                        {actions(job.id).map(a => (
                          <button key={a.label} onClick={() => { a.action(); setOpenMenu(null); }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-brand-cream transition-colors ${a.danger ? 'text-red-500' : 'text-brand-navy'}`}>
                            {a.icon} {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <EmptyState icon={<Search size={24} />} title="No jobs found" description="Try adjusting your filters or create a new job posting." action={
            <button onClick={() => setShowForm(true)} className="px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors">
              Create New Job
            </button>
          } />
        )}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Create New Job" size="lg">
        <JobFormModal onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
};

export default RecruiterJobs;
