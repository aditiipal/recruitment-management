import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, ChevronDown, Bookmark, ArrowRight, SlidersHorizontal, X } from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { CompanyLogo, StageBadge, Badge } from '../components/ui';

const workModes = ['All', 'Remote', 'Hybrid', 'On-site'];
const jobTypes = ['All', 'Full-time', 'Part-time', 'Internship', 'Contract'];
const experienceLevels = ['All', 'Entry Level', '1-3 years', '3-5 years', '5+ years'];

const JobsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('All');
  const [jobType, setJobType] = useState('All');
  const [experience, setExperience] = useState('All');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('Relevance');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = mockJobs.filter(job => {
    const q = search.toLowerCase();
    const matchSearch = !search || job.title.toLowerCase().includes(q) || job.skills.some(s => s.toLowerCase().includes(q)) || job.company.toLowerCase().includes(q);
    const matchLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchMode = workMode === 'All' || job.workMode === workMode;
    const matchType = jobType === 'All' || job.type === jobType;
    return matchSearch && matchLocation && matchMode && matchType;
  });

  const toggleSave = (id: string) => setSavedJobs(prev => prev.includes(id) ? prev.filter(j => j !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Find your next opportunity</h1>
          <p className="text-text-secondary mb-6">Discover {mockJobs.length}+ jobs from top companies</p>
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 bg-brand-cream rounded-xl px-4 py-3 border border-border focus-within:border-brand-gallery-blue focus-within:ring-2 focus-within:ring-brand-light-blue transition-all">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Job title, skills, or keywords"
                className="bg-transparent text-sm outline-none flex-1 text-brand-navy placeholder:text-gray-400"
                aria-label="Search jobs"
              />
              {search && <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>}
            </div>
            <div className="flex items-center gap-3 bg-brand-cream rounded-xl px-4 py-3 border border-border focus-within:border-brand-gallery-blue sm:w-60 transition-all">
              <MapPin size={18} className="text-gray-400 shrink-0" />
              <input
                type="text" value={location} onChange={e => setLocation(e.target.value)}
                placeholder="City or country"
                className="bg-transparent text-sm outline-none flex-1 text-brand-navy placeholder:text-gray-400"
                aria-label="Location"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm">
              <Search size={18} /> Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className={`lg:w-64 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-card border border-border p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-brand-navy flex items-center gap-2"><SlidersHorizontal size={16} />Filters</h2>
                <button onClick={() => { setWorkMode('All'); setJobType('All'); setExperience('All'); }} className="text-xs text-brand-orange hover:underline">Clear all</button>
              </div>

              {/* Work mode */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Work Mode</h3>
                <div className="flex flex-wrap gap-2">
                  {workModes.map(m => (
                    <button key={m} onClick={() => setWorkMode(m)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${workMode === m ? 'bg-brand-orange text-white' : 'bg-brand-cream text-text-secondary hover:bg-brand-light-blue hover:text-brand-gallery-blue'}`}
                    >{m}</button>
                  ))}
                </div>
              </div>

              {/* Job type */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Job Type</h3>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map(t => (
                    <button key={t} onClick={() => setJobType(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${jobType === t ? 'bg-brand-orange text-white' : 'bg-brand-cream text-text-secondary hover:bg-brand-light-blue hover:text-brand-gallery-blue'}`}
                    >{t}</button>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Experience</h3>
                <div className="space-y-2">
                  {experienceLevels.map(e => (
                    <label key={e} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="experience" checked={experience === e} onChange={() => setExperience(e)}
                        className="accent-brand-orange" />
                      <span className="text-sm text-text-secondary">{e}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary */}
              <div>
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Salary Range</h3>
                <input type="range" min={0} max={50} className="w-full accent-brand-orange" aria-label="Salary range" />
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>₹0L</span><span>₹50L+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Job listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-text-secondary">
                <span className="font-semibold text-brand-navy">{filtered.length}</span> jobs found
              </p>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-text-secondary hover:bg-gray-50">
                  <Filter size={16} /> Filters
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-secondary hidden sm:block">Sort by:</span>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                    className="text-sm border border-border rounded-lg px-3 py-2 outline-none bg-white text-brand-navy focus:border-brand-gallery-blue"
                    aria-label="Sort jobs">
                    {['Relevance', 'Most Recent', 'Salary (High)', 'Experience Level'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-card border border-border py-20 text-center">
                <Search size={40} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brand-navy mb-2">No jobs found</h3>
                <p className="text-sm text-text-secondary">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.slice(0, visibleCount).map(job => (
                  <div key={job.id} className="bg-white rounded-card border border-border p-5 card-interactive group">
                    <div className="flex items-start gap-4">
                      <CompanyLogo initials={job.companyLogo} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base font-semibold text-brand-navy group-hover:text-brand-orange transition-colors">{job.title}</h3>
                            <p className="text-sm text-text-secondary mt-0.5">{job.company}</p>
                          </div>
                          <button onClick={() => toggleSave(job.id)} aria-label={savedJobs.includes(job.id) ? 'Unsave job' : 'Save job'}
                            className={`p-2 rounded-lg transition-colors shrink-0 ${savedJobs.includes(job.id) ? 'text-brand-orange bg-brand-orange/10' : 'text-gray-400 hover:text-brand-orange hover:bg-brand-orange/5'}`}>
                            <Bookmark size={18} fill={savedJobs.includes(job.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <div className="flex items-center gap-1 text-xs text-text-secondary">
                            <MapPin size={13} />{job.location}
                          </div>
                          <span className="text-gray-300">•</span>
                          <Badge variant="blue">{job.workMode}</Badge>
                          <Badge variant="default">{job.type}</Badge>
                          <Badge variant="navy">{job.experience}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {job.skills.slice(0, 4).map(s => (
                            <span key={s} className="px-2 py-0.5 bg-brand-cream text-brand-gallery-blue text-xs rounded-md border border-border">{s}</span>
                          ))}
                          {job.skills.length > 4 && <span className="px-2 py-0.5 bg-brand-cream text-text-secondary text-xs rounded-md">+{job.skills.length - 4}</span>}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-brand-navy">{job.salary}</span>
                            <span className="text-xs text-text-secondary">{job.postedDate}</span>
                          </div>
                          <Link to={`/jobs/${job.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm group/btn">
                            View Job <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {visibleCount < filtered.length && (
                  <div className="text-center pt-4">
                    <button onClick={() => setVisibleCount(v => v + 6)}
                      className="px-8 py-3 border-2 border-brand-gallery-blue text-brand-gallery-blue font-semibold rounded-xl hover:bg-brand-light-blue transition-colors">
                      Load More Jobs
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
