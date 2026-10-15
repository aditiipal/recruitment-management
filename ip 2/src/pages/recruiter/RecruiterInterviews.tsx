import React, { useState } from 'react';
import { CalendarDays, List, Plus, Video, Clock, CheckCircle, XCircle, Star } from 'lucide-react';
import { mockInterviews, Interview } from '../../data/mockData';
import { Avatar, Badge, StageBadge, Modal, Tabs } from '../../components/ui';
import { useToast } from '../../components/Toast';

const statusColors: Record<string, string> = {
  Scheduled: 'blue',
  Completed: 'green',
  Cancelled: 'red',
  Rescheduled: 'yellow',
};

const FeedbackForm: React.FC<{ interview: Interview; onClose: () => void }> = ({ interview, onClose }) => {
  const { showToast } = useToast();
  const [ratings, setRatings] = useState({ technical: 0, communication: 0, problemSolving: 0, roleSuitability: 0, overall: 0 });
  const [recommendation, setRecommendation] = useState('');
  const [notes, setNotes] = useState('');

  const criteria = [
    { key: 'technical', label: 'Technical Ability' },
    { key: 'communication', label: 'Communication' },
    { key: 'problemSolving', label: 'Problem Solving' },
    { key: 'roleSuitability', label: 'Role Suitability' },
    { key: 'overall', label: 'Overall Rating' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Interview feedback submitted!', 'success');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 bg-brand-cream rounded-xl border border-border">
        <p className="text-sm font-semibold text-brand-navy">{interview.candidateName}</p>
        <p className="text-xs text-text-secondary">{interview.jobRole} • {interview.type} Interview</p>
      </div>
      {criteria.map(c => (
        <div key={c.key}>
          <label className="block text-sm font-medium text-brand-navy mb-2">{c.label}</label>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button"
                onClick={() => setRatings(prev => ({ ...prev, [c.key]: n }))}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${ratings[c.key as keyof typeof ratings] >= n ? 'bg-brand-orange text-white' : 'bg-brand-cream text-text-secondary hover:bg-brand-light-blue'}`}
                aria-label={`Rate ${c.label} ${n} out of 5`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div>
        <label htmlFor="recommendation" className="block text-sm font-medium text-brand-navy mb-1.5">Recommendation</label>
        <select id="recommendation" value={recommendation} onChange={e => setRecommendation(e.target.value)} required
          className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all">
          <option value="">Select recommendation</option>
          <option>Strongly Recommend</option>
          <option>Recommend</option>
          <option>Neutral</option>
          <option>Do Not Recommend</option>
          <option>Strong No</option>
        </select>
      </div>
      <div>
        <label htmlFor="feedback-notes" className="block text-sm font-medium text-brand-navy mb-1.5">Detailed Feedback</label>
        <textarea id="feedback-notes" rows={4} value={notes} onChange={e => setNotes(e.target.value)}
          placeholder="Share specific observations, strengths, and areas for improvement…"
          className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue resize-none transition-all" />
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-border text-sm font-semibold text-text-secondary rounded-xl hover:bg-brand-cream transition-colors">Cancel</button>
        <button type="submit" className="flex-1 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors">Submit Feedback</button>
      </div>
    </form>
  );
};

const ScheduleModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { showToast } = useToast();
  return (
    <form onSubmit={(e) => { e.preventDefault(); showToast('Interview scheduled successfully!', 'success'); onClose(); }} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: 'Candidate Name', id: 'cname', placeholder: 'Select candidate' },
          { label: 'Job Role', id: 'jrole', placeholder: 'e.g. Senior Frontend Developer' },
          { label: 'Interviewer', id: 'interviewer', placeholder: 'e.g. Rajesh Kumar' },
        ].map(f => (
          <div key={f.id}>
            <label htmlFor={f.id} className="block text-sm font-medium text-brand-navy mb-1.5">{f.label}</label>
            <input id={f.id} placeholder={f.placeholder} className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all" />
          </div>
        ))}
        <div>
          <label htmlFor="itype" className="block text-sm font-medium text-brand-navy mb-1.5">Interview Type</label>
          <select id="itype" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all">
            <option>Technical</option><option>HR</option><option>Cultural Fit</option><option>Final</option><option>Panel</option>
          </select>
        </div>
        <div>
          <label htmlFor="idate" className="block text-sm font-medium text-brand-navy mb-1.5">Date</label>
          <input id="idate" type="date" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all" />
        </div>
        <div>
          <label htmlFor="itime" className="block text-sm font-medium text-brand-navy mb-1.5">Time</label>
          <input id="itime" type="time" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all" />
        </div>
        <div>
          <label htmlFor="iduration" className="block text-sm font-medium text-brand-navy mb-1.5">Duration</label>
          <select id="iduration" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all">
            <option>30 min</option><option>45 min</option><option>60 min</option><option>90 min</option>
          </select>
        </div>
        <div>
          <label htmlFor="meetlink" className="block text-sm font-medium text-brand-navy mb-1.5">Meeting Link</label>
          <input id="meetlink" placeholder="https://meet.google.com/…" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue transition-all" />
        </div>
      </div>
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-brand-navy mb-1.5">Interview Instructions</label>
        <textarea id="instructions" rows={3} placeholder="Share any preparation notes or topics to cover…" className="w-full px-3 py-2.5 bg-brand-cream border border-border rounded-xl text-sm outline-none focus:border-brand-gallery-blue resize-none transition-all" />
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-border text-sm font-semibold text-text-secondary rounded-xl hover:bg-brand-cream transition-colors">Cancel</button>
        <button type="submit" className="flex-1 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors">Schedule Interview</button>
      </div>
    </form>
  );
};

const RecruiterInterviews: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [showSchedule, setShowSchedule] = useState(false);
  const [feedbackFor, setFeedbackFor] = useState<Interview | null>(null);

  const tabFilter: Record<string, string[]> = {
    Upcoming: ['Scheduled'],
    Completed: ['Completed'],
    Cancelled: ['Cancelled', 'Rescheduled'],
  };

  const filtered = mockInterviews.filter(i => tabFilter[activeTab]?.includes(i.status));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Interviews</h1>
          <p className="text-sm text-text-secondary mt-1">{mockInterviews.filter(i => i.status === 'Scheduled').length} upcoming interviews</p>
        </div>
        <button onClick={() => setShowSchedule(true)} className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm">
          <Plus size={16} /> Schedule Interview
        </button>
      </div>

      <div className="bg-white rounded-card border border-border">
        <div className="px-5 pt-4">
          <Tabs tabs={['Upcoming', 'Completed', 'Cancelled']} active={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-5 space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <CalendarDays size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-text-secondary">No {activeTab.toLowerCase()} interviews</p>
            </div>
          )}
          {filtered.map(interview => (
            <div key={interview.id} className="p-4 bg-brand-cream/50 rounded-xl border border-border hover:border-brand-gallery-blue/30 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar name={interview.candidateName} size="sm" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-brand-navy">{interview.candidateName}</p>
                    <p className="text-xs text-text-secondary">{interview.jobRole}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                  <div className="flex items-center gap-1"><CalendarDays size={13} />{interview.date}</div>
                  <div className="flex items-center gap-1"><Clock size={13} />{interview.time}</div>
                  <Badge variant="blue">{interview.type}</Badge>
                  <Badge variant={statusColors[interview.status] as any}>{interview.status}</Badge>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">with</p>
                    <p className="text-xs font-semibold text-brand-navy">{interview.interviewer}</p>
                  </div>
                  {interview.status === 'Scheduled' && (
                    <>
                      <a href={interview.meetingLink} className="flex items-center gap-1 px-3 py-1.5 bg-brand-orange text-white text-xs font-semibold rounded-lg hover:bg-brand-orange-dark transition-colors">
                        <Video size={13} /> Join
                      </a>
                      <button onClick={() => setFeedbackFor(interview)} className="px-3 py-1.5 border border-border text-xs font-medium text-text-secondary rounded-lg hover:bg-white transition-colors">
                        Feedback
                      </button>
                    </>
                  )}
                  {interview.status === 'Completed' && interview.feedback && (
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-green-50 rounded-lg">
                      <Star size={12} className="text-brand-orange fill-brand-orange" />
                      <span className="text-xs font-bold text-green-700">{interview.feedback.overall}/5</span>
                    </div>
                  )}
                  {interview.status === 'Completed' && !interview.feedback && (
                    <button onClick={() => setFeedbackFor(interview)} className="px-3 py-1.5 bg-brand-orange text-white text-xs font-semibold rounded-lg hover:bg-brand-orange-dark transition-colors">
                      Add Feedback
                    </button>
                  )}
                </div>
              </div>

              {interview.feedback && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-text-secondary italic">"{interview.feedback.notes}"</p>
                  <p className="text-xs font-semibold text-green-600 mt-1">{interview.feedback.recommendation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={showSchedule} onClose={() => setShowSchedule(false)} title="Schedule Interview" size="lg">
        <ScheduleModal onClose={() => setShowSchedule(false)} />
      </Modal>

      {feedbackFor && (
        <Modal isOpen={!!feedbackFor} onClose={() => setFeedbackFor(null)} title="Interview Feedback" size="md">
          <FeedbackForm interview={feedbackFor} onClose={() => setFeedbackFor(null)} />
        </Modal>
      )}
    </div>
  );
};

export default RecruiterInterviews;
