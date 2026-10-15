import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, Monitor, DollarSign, Clock, CalendarDays, Bookmark, Share2, ChevronRight, CheckCircle, ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { Badge, CompanyLogo } from '../components/ui';
import { useToast } from '../components/Toast';

const JobDetailPage: React.FC = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  const job = mockJobs.find(j => j.id === id) || mockJobs[0];
  const similar = mockJobs.filter(j => j.id !== job.id && j.department === job.department).slice(0, 3);

  const handleApply = () => {
    setApplied(true);
    showToast('Application submitted successfully! 🎉', 'success');
  };

  const handleSave = () => {
    setSaved(!saved);
    showToast(saved ? 'Job removed from saved list.' : 'Job saved successfully!', 'info');
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Back nav */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-navy transition-colors">
            <ArrowLeft size={16} /> Back to Jobs
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job header */}
            <div className="bg-white rounded-card border border-border p-6">
              <div className="flex items-start gap-4">
                <CompanyLogo initials={job.companyLogo} size="lg" />
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-brand-navy">{job.title}</h1>
                  <p className="text-base text-text-secondary mt-1">{job.company}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="flex items-center gap-1 text-sm text-text-secondary"><MapPin size={14} />{job.location}</div>
                    <span className="text-gray-300">•</span>
                    <Badge variant="blue">{job.workMode}</Badge>
                    <Badge variant="default">{job.type}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-border">
                {[
                  { icon: <DollarSign size={16} />, label: 'Salary', value: job.salary },
                  { icon: <Briefcase size={16} />, label: 'Experience', value: job.experience },
                  { icon: <CalendarDays size={16} />, label: 'Posted', value: job.postedDate },
                  { icon: <Clock size={16} />, label: 'Deadline', value: job.deadline },
                ].map(m => (
                  <div key={m.label}>
                    <div className="flex items-center gap-1 text-xs text-text-secondary mb-1">{m.icon}{m.label}</div>
                    <p className="text-sm font-semibold text-brand-navy">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {job.skills.map(s => (
                  <span key={s} className="px-2.5 py-1 bg-brand-light-blue text-brand-gallery-blue text-xs font-medium rounded-lg">{s}</span>
                ))}
              </div>

              <div className="flex gap-3 mt-5">
                <button onClick={handleApply} disabled={applied}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 font-semibold rounded-xl transition-all shadow-sm ${applied ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-brand-orange text-white hover:bg-brand-orange-dark hover:shadow-md'}`}>
                  {applied ? <><CheckCircle size={18} /> Applied!</> : 'Apply Now'}
                </button>
                <button onClick={handleSave}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold transition-all ${saved ? 'border-brand-orange text-brand-orange bg-brand-orange/5' : 'border-border text-text-secondary hover:border-brand-gallery-blue hover:text-brand-gallery-blue'}`}>
                  <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button className="p-3 rounded-xl border border-border text-text-secondary hover:text-brand-navy hover:border-brand-gallery-blue transition-colors" aria-label="Share job">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* About the Role */}
            <div className="bg-white rounded-card border border-border p-6">
              <h2 className="text-lg font-bold text-brand-navy mb-3">About the Role</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-card border border-border p-6">
              <h2 className="text-lg font-bold text-brand-navy mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    </div>
                    <span className="text-sm text-brand-navy leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-card border border-border p-6">
              <h2 className="text-lg font-bold text-brand-navy mb-4">Required Qualifications</h2>
              <ul className="space-y-3">
                {job.qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-brand-gallery-blue shrink-0 mt-0.5" />
                    <span className="text-sm text-brand-navy leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
              {job.preferredSkills.length > 0 && (
                <>
                  <h3 className="text-base font-semibold text-brand-navy mt-5 mb-3">Preferred Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.preferredSkills.map(s => (
                      <span key={s} className="px-3 py-1 bg-brand-cream text-text-secondary text-xs rounded-lg border border-border">{s}</span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-card border border-border p-6">
              <h2 className="text-lg font-bold text-brand-navy mb-4">Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {job.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 bg-brand-cream rounded-xl">
                    <CheckCircle size={16} className="text-green-600 shrink-0" />
                    <span className="text-sm text-brand-navy">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Company */}
            <div className="bg-white rounded-card border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <Building2 size={20} className="text-brand-gallery-blue" />
                <h2 className="text-lg font-bold text-brand-navy">About {job.company}</h2>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{job.aboutCompany}</p>
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-card border border-border p-5 sticky top-24">
              <h3 className="text-base font-semibold text-brand-navy mb-4">Quick Summary</h3>
              {[
                { label: 'Department', value: job.department },
                { label: 'Work Mode', value: job.workMode },
                { label: 'Job Type', value: job.type },
                { label: 'Experience', value: job.experience },
                { label: 'Salary', value: job.salary },
                { label: 'Applicants', value: `${job.applicants}` },
                { label: 'Deadline', value: job.deadline },
              ].map(m => (
                <div key={m.label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <span className="text-xs text-text-secondary">{m.label}</span>
                  <span className="text-xs font-semibold text-brand-navy">{m.value}</span>
                </div>
              ))}
              <button onClick={handleApply} disabled={applied}
                className={`w-full mt-4 py-3 font-semibold rounded-xl transition-all ${applied ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-brand-orange text-white hover:bg-brand-orange-dark'}`}>
                {applied ? '✓ Applied' : 'Apply Now'}
              </button>
            </div>

            {/* Recruitment Timeline */}
            <div className="bg-white rounded-card border border-border p-5">
              <h3 className="text-sm font-semibold text-brand-navy mb-4">Recruitment Timeline</h3>
              <div className="space-y-4">
                {['Application Review', 'Shortlisting', 'Technical Interview', 'HR Discussion', 'Offer'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-light-blue flex items-center justify-center text-xs font-bold text-brand-gallery-blue shrink-0">{i + 1}</div>
                    <span className="text-sm text-brand-navy">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        {similar.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-brand-navy mb-5">Similar Jobs</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similar.map(j => (
                <Link key={j.id} to={`/jobs/${j.id}`} className="bg-white rounded-card border border-border p-4 card-interactive block">
                  <div className="flex items-center gap-3 mb-3">
                    <CompanyLogo initials={j.companyLogo} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-brand-navy">{j.title}</p>
                      <p className="text-xs text-text-secondary">{j.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{j.salary}</span>
                    <div className="flex items-center gap-1 text-xs font-medium text-brand-orange">View <ArrowRight size={12} /></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;
