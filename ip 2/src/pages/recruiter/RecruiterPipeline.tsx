import React, { useState } from 'react';
import { GripVertical, ChevronRight, MoreVertical } from 'lucide-react';
import { mockCandidates, Candidate } from '../../data/mockData';
import { Avatar, StageBadge, MatchScore, Badge } from '../../components/ui';
import { useToast } from '../../components/Toast';

type Stage = 'Applied' | 'Screening' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';

const STAGES: Stage[] = ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected'];

const stageColors: Record<Stage, string> = {
  Applied: 'bg-brand-light-blue/40 border-brand-gallery-blue/20',
  Screening: 'bg-blue-50/50 border-blue-200/30',
  Shortlisted: 'bg-orange-50/50 border-brand-orange/20',
  Interview: 'bg-purple-50/50 border-purple-200/30',
  Offer: 'bg-amber-50/50 border-amber-200/30',
  Hired: 'bg-green-50/50 border-green-200/30',
  Rejected: 'bg-red-50/40 border-red-200/20',
};

const stageHeaderColors: Record<Stage, string> = {
  Applied: 'bg-brand-gallery-blue text-white',
  Screening: 'bg-blue-500 text-white',
  Shortlisted: 'bg-brand-orange text-white',
  Interview: 'bg-purple-600 text-white',
  Offer: 'bg-amber-500 text-white',
  Hired: 'bg-green-600 text-white',
  Rejected: 'bg-red-400 text-white',
};

const CandidateCard: React.FC<{ candidate: Candidate; onDragStart: (id: string) => void }> = ({ candidate, onDragStart }) => (
  <div
    draggable
    onDragStart={() => onDragStart(candidate.id)}
    className="bg-white rounded-xl border border-border p-3.5 shadow-card hover:shadow-card-hover cursor-grab active:cursor-grabbing transition-all group"
    role="article"
    aria-label={`${candidate.name} candidate card`}
  >
    <div className="flex items-start gap-2.5 mb-2.5">
      <Avatar name={candidate.name} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-brand-navy truncate">{candidate.name}</p>
        <p className="text-xs text-text-secondary truncate">{candidate.appliedRole}</p>
      </div>
      <GripVertical size={14} className="text-gray-300 shrink-0 group-hover:text-gray-400 mt-0.5" aria-hidden="true" />
    </div>
    <div className="flex flex-wrap gap-1 mb-2.5">
      {candidate.skills.slice(0, 2).map(s => (
        <span key={s} className="px-1.5 py-0.5 bg-brand-cream text-text-secondary text-[10px] rounded">{s}</span>
      ))}
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-[10px] text-text-secondary">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
        {candidate.lastActivity}
      </div>
      <MatchScore score={candidate.matchScore} />
    </div>
    <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
      <span className="text-[10px] text-text-secondary">{candidate.experience}</span>
      <span className="text-[10px] text-text-secondary">{candidate.recruiter.split(' ')[0]}</span>
    </div>
  </div>
);

const RecruiterPipeline: React.FC = () => {
  const { showToast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null);

  const getByStage = (stage: Stage) => candidates.filter(c => c.stage === stage);

  const handleDrop = (stage: Stage) => {
    if (!draggingId) return;
    const candidate = candidates.find(c => c.id === draggingId);
    if (!candidate || candidate.stage === stage) { setDraggingId(null); setDragOverStage(null); return; }

    setCandidates(prev => prev.map(c => c.id === draggingId ? { ...c, stage } : c));
    showToast(`${candidate.name} moved to ${stage}`, 'success');
    setDraggingId(null);
    setDragOverStage(null);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">Recruitment Pipeline</h1>
        <p className="text-sm text-text-secondary mt-1">Drag and drop candidates between stages</p>
      </div>

      {/* Pipeline counts summary */}
      <div className="flex gap-2 flex-wrap">
        {STAGES.filter(s => s !== 'Rejected').map(stage => {
          const count = getByStage(stage).length;
          return (
            <div key={stage} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-border text-xs">
              <span className="font-medium text-text-secondary">{stage}</span>
              <span className="font-bold text-brand-navy">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Kanban board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {STAGES.map(stage => {
            const stageCandidates = getByStage(stage);
            const isDragTarget = dragOverStage === stage;
            return (
              <div
                key={stage}
                className="w-60 flex-shrink-0"
                onDragOver={e => { e.preventDefault(); setDragOverStage(stage); }}
                onDragLeave={() => setDragOverStage(null)}
                onDrop={() => handleDrop(stage)}
              >
                {/* Column header */}
                <div className={`flex items-center justify-between px-3 py-2 rounded-t-xl ${stageHeaderColors[stage]}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{stage}</span>
                    <span className="bg-white/20 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{stageCandidates.length}</span>
                  </div>
                </div>

                {/* Drop zone */}
                <div className={`min-h-96 rounded-b-xl border border-t-0 p-2 space-y-2 transition-all ${stageColors[stage]} ${isDragTarget ? 'drag-over' : ''}`}
                  aria-label={`${stage} column`} role="region">
                  {stageCandidates.map(c => (
                    <CandidateCard key={c.id} candidate={c} onDragStart={setDraggingId} />
                  ))}
                  {stageCandidates.length === 0 && (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded-xl">
                      <p className="text-xs text-gray-300">Drop here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecruiterPipeline;
