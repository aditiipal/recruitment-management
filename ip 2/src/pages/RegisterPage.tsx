import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Upload, ArrowRight, ArrowLeft, User, GraduationCap, Briefcase, Code, FileText, Eye } from 'lucide-react';
import { HireNestLogo } from '../components/Navbar';
import { ProgressBar } from '../components/ui';
import { useToast } from '../components/Toast';

const steps = [
  { id: 1, label: 'Basic Info', icon: User },
  { id: 2, label: 'Education', icon: GraduationCap },
  { id: 3, label: 'Experience', icon: Briefcase },
  { id: 4, label: 'Skills', icon: Code },
  { id: 5, label: 'Resume', icon: FileText },
  { id: 6, label: 'Preview', icon: Eye },
];

const skillOptions = ['React', 'TypeScript', 'Python', 'SQL', 'Figma', 'Node.js', 'Java', 'AWS', 'Docker', 'Machine Learning'];

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', country: '',
    headline: '', degree: '', institution: '', year: '',
    company: '', jobTitle: '', duration: '', portfolio: '', linkedin: '',
    jobType: 'Full-time', workMode: 'Hybrid', salary: '',
  });

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));
  const toggleSkill = (s: string) => setSelectedSkills(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const progress = ((step - 1) / (steps.length - 1)) * 100;

  const handleNext = () => {
    if (step < steps.length) setStep(s => s + 1);
    else {
      showToast('Profile created successfully! Welcome to HireNest 🎉', 'success');
      setTimeout(() => navigate('/candidate/dashboard'), 800);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false); setUploaded(true);
    showToast('Resume uploaded successfully!', 'success');
  };

  const InputField: React.FC<{ label: string; id: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean }> = ({ label, id, value, onChange, type = 'text', placeholder, required }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-navy mb-1.5">{label}{required && <span className="text-brand-orange ml-1">*</span>}</label>
      <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full px-4 py-2.5 bg-brand-cream border border-border rounded-xl text-sm text-brand-navy placeholder:text-gray-400 focus:outline-none focus:border-brand-gallery-blue focus:ring-2 focus:ring-brand-light-blue transition-all" />
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <HireNestLogo />
          <Link to="/login" className="text-sm text-text-secondary hover:text-brand-navy transition-colors">Already have an account? Sign in</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-brand-navy">Create your profile</h1>
            <span className="text-sm text-text-secondary">Step {step} of {steps.length}</span>
          </div>
          <ProgressBar value={progress} color="#C65D3B" />
          <div className="flex justify-between mt-3">
            {steps.map(s => (
              <div key={s.id} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  s.id < step ? 'bg-brand-orange text-white' :
                  s.id === step ? 'bg-brand-navy text-white' :
                  'bg-white border border-border text-text-secondary'
                }`}>
                  {s.id < step ? <CheckCircle size={16} /> : <s.icon size={14} />}
                </div>
                <span className={`text-[10px] hidden sm:block ${s.id === step ? 'text-brand-navy font-semibold' : 'text-text-secondary'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-card-lg border border-border p-6 sm:p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-bold text-brand-navy mb-5 flex items-center gap-2"><User size={20} className="text-brand-orange" />Basic Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="Full Name" id="name" value={form.name} onChange={v => update('name', v)} placeholder="Aarav Shah" required />
                <InputField label="Email Address" id="email" type="email" value={form.email} onChange={v => update('email', v)} placeholder="aarav@email.com" required />
                <InputField label="Phone Number" id="phone" type="tel" value={form.phone} onChange={v => update('phone', v)} placeholder="+91 98765 43210" />
                <InputField label="City" id="city" value={form.city} onChange={v => update('city', v)} placeholder="Bangalore" />
                <InputField label="Country" id="country" value={form.country} onChange={v => update('country', v)} placeholder="India" />
                <InputField label="Portfolio URL" id="portfolio" value={form.portfolio} onChange={v => update('portfolio', v)} placeholder="https://yoursite.com" />
              </div>
              <div className="col-span-2">
                <label htmlFor="headline" className="block text-sm font-medium text-brand-navy mb-1.5">Professional Headline</label>
                <input id="headline" value={form.headline} onChange={e => update('headline', e.target.value)} placeholder="e.g. Senior Frontend Developer | React & TypeScript"
                  className="w-full px-4 py-2.5 bg-brand-cream border border-border rounded-xl text-sm text-brand-navy placeholder:text-gray-400 focus:outline-none focus:border-brand-gallery-blue focus:ring-2 focus:ring-brand-light-blue transition-all" />
              </div>
              <div className="flex items-start gap-2 p-3 bg-brand-light-blue/30 rounded-xl">
                <input type="checkbox" id="consent" required className="accent-brand-orange mt-0.5" />
                <label htmlFor="consent" className="text-xs text-text-secondary leading-relaxed">
                  I consent to HireNest processing my personal data for recruitment purposes in accordance with the{' '}
                  <a href="#" className="text-brand-orange hover:underline">Privacy Policy</a> and{' '}
                  <a href="#" className="text-brand-orange hover:underline">Terms of Service</a>.
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Education */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-bold text-brand-navy mb-5 flex items-center gap-2"><GraduationCap size={20} className="text-brand-orange" />Education</h2>
              <div className="p-5 bg-brand-cream rounded-xl border border-border space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="Degree" id="degree" value={form.degree} onChange={v => update('degree', v)} placeholder="B.Tech Computer Science" required />
                  <InputField label="Institution" id="institution" value={form.institution} onChange={v => update('institution', v)} placeholder="IIT Bombay" required />
                  <InputField label="Graduation Year" id="year" value={form.year} onChange={v => update('year', v)} placeholder="2022" />
                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-1.5">GPA / Percentage</label>
                    <input type="text" placeholder="8.5 / 10" className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-brand-navy placeholder:text-gray-400 focus:outline-none focus:border-brand-gallery-blue transition-all" />
                  </div>
                </div>
              </div>
              <button className="text-sm text-brand-orange hover:underline font-medium">+ Add another qualification</button>
            </div>
          )}

          {/* Step 3: Work Experience */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-bold text-brand-navy mb-5 flex items-center gap-2"><Briefcase size={20} className="text-brand-orange" />Work Experience</h2>
              <div className="p-5 bg-brand-cream rounded-xl border border-border space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="Job Title" id="jobTitle" value={form.jobTitle} onChange={v => update('jobTitle', v)} placeholder="Frontend Developer" required />
                  <InputField label="Company" id="company" value={form.company} onChange={v => update('company', v)} placeholder="NovaTech Solutions" required />
                  <InputField label="Duration" id="duration" value={form.duration} onChange={v => update('duration', v)} placeholder="Jan 2022 – Present" />
                  <div>
                    <label className="block text-sm font-medium text-brand-navy mb-1.5">Work Type</label>
                    <select className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-brand-navy focus:outline-none focus:border-brand-gallery-blue transition-all">
                      <option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1.5">Description</label>
                  <textarea rows={3} placeholder="Describe your responsibilities and achievements..." className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-brand-navy placeholder:text-gray-400 focus:outline-none focus:border-brand-gallery-blue resize-none transition-all" />
                </div>
              </div>
              <button className="text-sm text-brand-orange hover:underline font-medium">+ Add another experience</button>
            </div>
          )}

          {/* Step 4: Skills */}
          {step === 4 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-bold text-brand-navy mb-5 flex items-center gap-2"><Code size={20} className="text-brand-orange" />Skills & Preferences</h2>
              <div className="mb-5">
                <p className="text-sm font-medium text-brand-navy mb-3">Select your skills</p>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map(s => (
                    <button key={s} onClick={() => toggleSkill(s)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedSkills.includes(s) ? 'bg-brand-orange text-white' : 'bg-brand-cream border border-border text-text-secondary hover:border-brand-gallery-blue hover:text-brand-gallery-blue'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                {selectedSkills.length > 0 && <p className="text-xs text-brand-gallery-blue mt-2">{selectedSkills.length} skills selected</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1.5">Preferred Job Type</label>
                  <select value={form.jobType} onChange={e => update('jobType', e.target.value)} className="w-full px-4 py-2.5 bg-brand-cream border border-border rounded-xl text-sm text-brand-navy focus:outline-none focus:border-brand-gallery-blue transition-all">
                    <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1.5">Preferred Work Mode</label>
                  <select value={form.workMode} onChange={e => update('workMode', e.target.value)} className="w-full px-4 py-2.5 bg-brand-cream border border-border rounded-xl text-sm text-brand-navy focus:outline-none focus:border-brand-gallery-blue transition-all">
                    <option>Remote</option><option>Hybrid</option><option>On-site</option>
                  </select>
                </div>
                <InputField label="Expected Salary" id="salary" value={form.salary} onChange={v => update('salary', v)} placeholder="₹15L – ₹20L" />
                <InputField label="LinkedIn URL" id="linkedin" value={form.linkedin} onChange={v => update('linkedin', v)} placeholder="linkedin.com/in/yourname" />
              </div>
            </div>
          )}

          {/* Step 5: Resume */}
          {step === 5 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-bold text-brand-navy mb-5 flex items-center gap-2"><FileText size={20} className="text-brand-orange" />Upload Resume</h2>
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${dragging ? 'border-brand-orange bg-brand-orange/5' : uploaded ? 'border-green-400 bg-green-50' : 'border-border hover:border-brand-gallery-blue hover:bg-brand-cream'}`}
              >
                {uploaded ? (
                  <div>
                    <CheckCircle size={40} className="text-green-600 mx-auto mb-3" />
                    <p className="text-base font-semibold text-brand-navy">Resume uploaded!</p>
                    <p className="text-sm text-text-secondary mt-1">aarav_shah_resume.pdf</p>
                    <button onClick={() => setUploaded(false)} className="mt-3 text-xs text-brand-orange hover:underline">Remove & re-upload</button>
                  </div>
                ) : (
                  <div>
                    <Upload size={36} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-base font-semibold text-brand-navy mb-1">Drag & drop your resume here</p>
                    <p className="text-sm text-text-secondary mb-4">or click to browse files</p>
                    <label className="cursor-pointer px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors inline-block">
                      Browse Files
                      <input type="file" accept=".pdf,.docx" className="hidden" onChange={() => { setUploaded(true); showToast('Resume uploaded successfully!', 'success'); }} />
                    </label>
                    <p className="text-xs text-text-secondary mt-3">Accepted formats: PDF, DOCX • Max 5MB</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Preview */}
          {step === 6 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-bold text-brand-navy mb-5 flex items-center gap-2"><Eye size={20} className="text-brand-orange" />Profile Preview</h2>
              <div className="flex items-start gap-4 p-5 bg-brand-cream rounded-xl border border-border mb-5">
                <div className="w-16 h-16 rounded-full bg-brand-gallery-blue flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {form.name ? form.name.split(' ').map(n => n[0]).join('') : 'AS'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-navy">{form.name || 'Aarav Shah'}</h3>
                  <p className="text-sm text-text-secondary">{form.headline || 'Sr. Frontend Developer | React & TypeScript'}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedSkills.slice(0, 5).map(s => (
                      <span key={s} className="px-2 py-0.5 bg-brand-light-blue text-brand-gallery-blue text-xs rounded-md">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-2xl font-bold text-brand-orange">75%</div>
                  <div className="text-xs text-text-secondary">Profile complete</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Education', value: `${form.degree || 'B.Tech Computer Science'} — ${form.institution || 'IIT Bombay'}` },
                  { label: 'Experience', value: `${form.jobTitle || 'Frontend Developer'} at ${form.company || 'NovaTech Solutions'}` },
                  { label: 'Location', value: `${form.city || 'Bangalore'}, ${form.country || 'India'}` },
                  { label: 'Preferred Type', value: form.jobType },
                  { label: 'Work Mode', value: form.workMode },
                  { label: 'Resume', value: uploaded ? '✓ aarav_shah_resume.pdf' : 'Not uploaded' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                    <span className="text-sm text-text-secondary">{item.label}</span>
                    <span className="text-sm font-medium text-brand-navy">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
            <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-brand-navy border border-border hover:bg-brand-cream'}`}>
              <ArrowLeft size={16} /> Back
            </button>
            <button onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-all shadow-sm">
              {step === steps.length ? 'Create Profile' : 'Save & Continue'} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
