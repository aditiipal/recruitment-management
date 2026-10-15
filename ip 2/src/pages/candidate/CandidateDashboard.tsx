import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Calendar, Bookmark, User, Bell, FileText,
  ChevronRight, ArrowRight, Star, Clock, MapPin, Video
} from 'lucide-react';
import { mockJobs, mockInterviews } from '../data/mockData';
import { StatCard, StageBadge, ProgressBar, CompanyLogo } from '../components/ui';

const applications = [
  { job: 'Senior Frontend Developer', company: 'NovaTech Solutions', logo: 'NT', date: 'Oct 10', stage: 'Interview', action: 'Prepare' },
  { job: 'Product Designer', company: 'PixelCraft Studio', logo: 'PC', date: 'Oct 8', stage: 'Shortlisted', action: 'View feedback' },
  { job: 'Full Stack Developer', company: 'CloudSync Tech', logo: 'CS', date: 'Oct 5', stage: 'Applied', action: 'Track' },
  { job: 'React Developer', company: 'GrowthLoop', logo: 'GL', date: 'Oct 3', stage: 'Rejected', action: 'View' },
];

const CandidateDashboard: React.FC = () => {
  const interview = mockInterviews[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Good morning, Aarav! 👋</h1>
          <p className="text-sm text-text-secondary mt-1">Here's what's happening with your job search today.</p>
        </div>
        <Link to="/jobs" className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm">
          Browse Jobs <ArrowRight size={16} />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Applications" value="6" icon={<FileText size={20} />} trend="2 this week" trendUp />
        <StatCard label="Interviews" value="2" icon={<Calendar size={20} />} trend="1 upcoming" trendUp />
        <StatCard label="Saved Jobs" value="12" icon={<Bookmark size={20} />} />
        <StatCard label="Profile" value="85%" icon={<User size={20} />} trend="Complete your skills" trendUp />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Applications table */}
        <div className="lg:col-span-2 bg-white rounded-card border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-brand-navy">My Applications</h2>
            <Link to="/candidate/applications" className="text-xs text-brand-orange hover:underline flex items-center gap-1">View all <ChevronRight size={12} /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Your job applications">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Job</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider hidden sm:table-cell">Applied</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {applications.map((app, i) => (
                  <tr key={i} className="hover:bg-brand-cream/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <CompanyLogo initials={app.logo} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-brand-navy">{app.job}</p>
                          <p className="text-xs text-text-secondary">{app.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 hidden sm:table-cell">
                      <span className="text-xs text-text-secondary">{app.date}</span>
                    </td>
                    <td className="px-3 py-3.5"><StageBadge stage={app.stage} /></td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="text-xs font-medium text-brand-gallery-blue hover:text-brand-orange transition-colors">{app.action}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Upcoming interview */}
          <div className="bg-white rounded-card border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                <Calendar size={16} className="text-brand-orange" />
              </div>
              <h2 className="text-sm font-semibold text-brand-navy">Upcoming Interview</h2>
            </div>
            <div className="p-3 bg-brand-light-blue/40 rounded-xl border border-brand-light-blue mb-3">
              <p className="text-sm font-semibold text-brand-navy">{interview.jobRole}</p>
              <p className="text-xs text-text-secondary mt-0.5">with {interview.interviewer}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-text-secondary">
                <span className="flex items-center gap-1"><Calendar size={12} />{interview.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{interview.time}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <a href={interview.meetingLink} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-brand-orange text-white text-xs font-semibold rounded-lg hover:bg-brand-orange-dark transition-colors">
                  <Video size={13} /> Join Meeting
                </a>
                <button className="px-3 py-2 border border-border text-xs font-medium text-text-secondary rounded-lg hover:bg-brand-cream transition-colors">Reschedule</button>
              </div>
            </div>
          </div>

          {/* Profile completion */}
          <div className="bg-white rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-brand-navy">Profile Strength</h2>
              <span className="text-sm font-bold text-brand-orange">85%</span>
            </div>
            <ProgressBar value={85} color="#C65D3B" className="mb-4" />
            <div className="space-y-2.5">
              {[
                { label: 'Add a profile photo', done: false },
                { label: 'Upload resume', done: true },
                { label: 'Add work experience', done: true },
                { label: 'Add skills', done: true },
                { label: 'Add certifications', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {item.done ? <div className="w-2 h-2 rounded-full bg-green-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                  </div>
                  <span className={`text-xs ${item.done ? 'text-text-secondary line-through' : 'text-brand-navy font-medium'}`}>{item.label}</span>
                </div>
              ))}
            </div>
            <Link to="/candidate/profile" className="block mt-4 text-center text-xs font-semibold text-brand-orange hover:underline">Complete Profile →</Link>
          </div>
        </div>
      </div>

      {/* Recommended jobs */}
      <div className="bg-white rounded-card border border-border">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-brand-navy flex items-center gap-2">
            <Star size={16} className="text-brand-orange" /> Recommended for You
          </h2>
          <Link to="/jobs" className="text-xs text-brand-orange hover:underline flex items-center gap-1">View all <ChevronRight size={12} /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {mockJobs.slice(0, 3).map(job => (
            <Link key={job.id} to={`/jobs/${job.id}`} className="p-4 rounded-xl border border-border hover:border-brand-gallery-blue hover:bg-brand-cream/50 transition-all block">
              <div className="flex items-center gap-2.5 mb-2">
                <CompanyLogo initials={job.companyLogo} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-navy truncate">{job.title}</p>
                  <p className="text-xs text-text-secondary">{job.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-text-secondary"><MapPin size={11} />{job.location.split(',')[0]}</span>
                <span className="text-xs font-semibold text-brand-navy">{job.salary}</span>
              </div>
              <div className="mt-2 flex gap-1 flex-wrap">
                {job.skills.slice(0, 2).map(s => (
                  <span key={s} className="px-1.5 py-0.5 bg-brand-light-blue text-brand-gallery-blue text-[10px] rounded">{s}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
