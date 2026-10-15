import React, { useState } from 'react';
import { CalendarDays, Video, Clock, ChevronRight } from 'lucide-react';
import { mockInterviews } from '../../data/mockData';
import { Badge, Tabs } from '../../components/ui';
import { useToast } from '../../components/Toast';

const CandidateInterviews: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('Upcoming');

  const tabFilter: Record<string, string[]> = {
    Upcoming: ['Scheduled'],
    Past: ['Completed', 'Cancelled', 'Rescheduled'],
  };

  const filtered = mockInterviews.filter(i => tabFilter[activeTab]?.includes(i.status));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">My Interviews</h1>
        <p className="text-sm text-text-secondary mt-1">{mockInterviews.filter(i => i.status === 'Scheduled').length} upcoming interviews</p>
      </div>

      <div className="bg-white rounded-card border border-border">
        <div className="px-5 pt-4">
          <Tabs tabs={['Upcoming', 'Past']} active={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-5 space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <CalendarDays size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-text-secondary">No {activeTab.toLowerCase()} interviews</p>
            </div>
          )}
          {filtered.map(interview => (
            <div key={interview.id} className="p-4 bg-brand-cream/50 rounded-xl border border-border hover:border-brand-gallery-blue/30 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-brand-navy">{interview.jobRole}</h3>
                  <p className="text-xs text-text-secondary mt-0.5">with {interview.interviewer}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-text-secondary">
                    <span className="flex items-center gap-1"><CalendarDays size={12} />{interview.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{interview.time} • {interview.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="blue">{interview.type}</Badge>
                  <Badge variant={interview.status === 'Scheduled' ? 'blue' : interview.status === 'Completed' ? 'green' : 'red'}>{interview.status}</Badge>
                  {interview.status === 'Scheduled' && (
                    <a href={interview.meetingLink}
                      className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange text-white text-xs font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors">
                      <Video size={13} /> Join Meeting
                    </a>
                  )}
                  {interview.status === 'Scheduled' && (
                    <button onClick={() => showToast('Rescheduling request sent.', 'info')}
                      className="px-3 py-2 border border-border text-xs font-medium text-text-secondary rounded-xl hover:bg-white transition-colors">
                      Reschedule
                    </button>
                  )}
                </div>
              </div>
              {interview.instructions && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-text-secondary"><span className="font-semibold text-brand-navy">Instructions: </span>{interview.instructions}</p>
                </div>
              )}
              {interview.feedback && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-brand-gallery-blue font-medium">Feedback received: {interview.feedback.recommendation}</p>
                  <p className="text-xs text-text-secondary mt-0.5 italic">"{interview.feedback.notes}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prep tips */}
      <div className="bg-white rounded-card border border-border p-5">
        <h2 className="text-base font-semibold text-brand-navy mb-4">Interview Preparation Tips</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: '🔍', title: 'Research the company', tip: 'Learn about their culture, products, and recent news before the interview.' },
            { icon: '💡', title: 'Review STAR method', tip: 'Structure your answers with Situation, Task, Action, and Result.' },
            { icon: '🛠️', title: 'Revise core skills', tip: 'Brush up on the key technologies listed in the job description.' },
            { icon: '❓', title: 'Prepare questions', tip: 'Have 3-5 thoughtful questions ready to ask the interviewer.' },
            { icon: '📹', title: 'Test your setup', tip: 'Check your camera, mic, and internet connection before the call.' },
            { icon: '⏰', title: 'Be punctual', tip: 'Join the meeting 2-3 minutes early to make a great first impression.' },
          ].map(tip => (
            <div key={tip.title} className="p-3.5 rounded-xl bg-brand-cream border border-border">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xl">{tip.icon}</span>
                <p className="text-sm font-semibold text-brand-navy">{tip.title}</p>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateInterviews;
