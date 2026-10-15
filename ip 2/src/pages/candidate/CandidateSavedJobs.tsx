import React, { useState } from 'react';
import { Bookmark, Search, MapPin, ArrowRight, X, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockJobs } from '../../data/mockData';
import { CompanyLogo, Badge } from '../../components/ui';
import { useToast } from '../../components/Toast';

const CandidateSavedJobs: React.FC = () => {
  const { showToast } = useToast();
  const [saved, setSaved] = useState(mockJobs.slice(0, 5).map(j => j.id));
  const [search, setSearch] = useState('');

  const savedJobs = mockJobs.filter(j => saved.includes(j.id));
  const filtered = savedJobs.filter(j =>
    !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
  );

  const unsave = (id: string) => {
    setSaved(p => p.filter(s => s !== id));
    showToast('Job removed from saved list.', 'info');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Saved Jobs</h1>
          <p className="text-sm text-text-secondary mt-1">{saved.length} jobs saved</p>
        </div>
        <Link to="/jobs" className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm">
          Browse More <ArrowRight size={16} />
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-card border border-border p-4">
        <div className="flex items-center gap-2 bg-brand-cream rounded-xl px-3 py-2 max-w-sm">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search saved jobs…"
            className="bg-transparent text-sm outline-none flex-1 text-brand-navy placeholder:text-gray-400" aria-label="Search saved jobs" />
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-card border border-border py-20 text-center">
          <Bookmark size={40} className="text-gray-200 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-brand-navy mb-1">No saved jobs yet</h3>
          <p className="text-sm text-text-secondary mb-4">Start saving jobs you're interested in</p>
          <Link to="/jobs" className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors">
            Explore Jobs
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {filtered.map(job => (
          <div key={job.id} className="bg-white rounded-card border border-border p-5 card-interactive group">
            <div className="flex items-start gap-4">
              <CompanyLogo initials={job.companyLogo} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-brand-navy group-hover:text-brand-orange transition-colors">{job.title}</h3>
                    <p className="text-sm text-text-secondary mt-0.5">{job.company}</p>
                  </div>
                  <button onClick={() => unsave(job.id)}
                    className="p-2 rounded-lg text-brand-orange bg-brand-orange/10 hover:bg-red-50 hover:text-red-500 transition-colors shrink-0"
                    aria-label="Remove from saved">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <div className="flex items-center gap-1 text-xs text-text-secondary"><MapPin size={12} />{job.location}</div>
                  <span className="text-gray-300">•</span>
                  <Badge variant="blue">{job.workMode}</Badge>
                  <Badge variant="default">{job.type}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.skills.slice(0, 4).map(s => (
                    <span key={s} className="px-2 py-0.5 bg-brand-cream text-brand-gallery-blue text-xs rounded-md border border-border">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span className="text-sm font-semibold text-brand-navy">{job.salary}</span>
                  <div className="flex gap-2">
                    <Link to={`/jobs/${job.id}`}
                      className="px-4 py-2 border border-border text-xs font-semibold text-brand-navy rounded-xl hover:bg-brand-cream transition-colors">
                      View Details
                    </Link>
                    <Link to={`/jobs/${job.id}`}
                      className="px-4 py-2 bg-brand-orange text-white text-xs font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors">
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateSavedJobs;
