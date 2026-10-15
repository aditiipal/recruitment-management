import React, { useState } from 'react';
import { Edit2, Download, Plus, MapPin, Mail, Phone, Linkedin, Globe, CheckCircle } from 'lucide-react';
import { ProgressBar, Badge } from '../../components/ui';
import { useToast } from '../../components/Toast';

const skills = ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'TailwindCSS', 'Git', 'REST APIs'];
const experience = [
  { title: 'Senior Frontend Developer', company: 'NovaTech Solutions', period: 'Jan 2023 – Present', desc: 'Led UI development for flagship SaaS product. Built reusable component library, improved Lighthouse score by 40%, mentored 2 junior developers.' },
  { title: 'Frontend Developer', company: 'StartupBase', period: 'Jun 2020 – Dec 2022', desc: 'Built React applications from scratch, integrated REST APIs, implemented responsive layouts.' },
];
const education = [
  { degree: 'B.Tech, Computer Science', school: 'IIT Bombay', year: '2020', gpa: '8.6 / 10' },
];

const profileItems = [
  { label: 'Profile photo', done: false },
  { label: 'Professional headline', done: true },
  { label: 'Work experience', done: true },
  { label: 'Education', done: true },
  { label: 'Skills', done: true },
  { label: 'Resume', done: true },
  { label: 'Certifications', done: false },
  { label: 'Portfolio link', done: false },
];

const CandidateProfile: React.FC = () => {
  const { showToast } = useToast();
  const completedCount = profileItems.filter(i => i.done).length;
  const completePct = Math.round((completedCount / profileItems.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">My Profile</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your professional information</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => showToast('Resume downloaded!', 'success')} className="flex items-center gap-2 px-4 py-2.5 border border-border text-sm font-medium text-text-secondary rounded-xl hover:bg-brand-cream transition-colors">
            <Download size={16} /> Resume
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-xl hover:bg-brand-orange-dark transition-colors">
            <Edit2 size={16} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Info */}
        <div className="space-y-5">
          {/* Profile card */}
          <div className="bg-white rounded-card border border-border p-5 text-center">
            <div className="relative inline-block mb-3">
              <div className="w-20 h-20 rounded-full bg-brand-gallery-blue flex items-center justify-center text-white text-2xl font-bold mx-auto">AS</div>
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-brand-orange flex items-center justify-center text-white hover:bg-brand-orange-dark transition-colors" aria-label="Change photo">
                <Plus size={14} />
              </button>
            </div>
            <h2 className="text-lg font-bold text-brand-navy">Aarav Shah</h2>
            <p className="text-sm text-text-secondary mt-0.5">Senior Frontend Developer</p>
            <div className="flex items-center justify-center gap-1 text-xs text-text-secondary mt-1">
              <MapPin size={12} />Bangalore, India
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-2.5 text-left">
              {[
                { icon: <Mail size={14} />, label: 'aarav.shah@email.com' },
                { icon: <Phone size={14} />, label: '+91 98765 43210' },
                { icon: <Linkedin size={14} />, label: 'linkedin.com/in/aaravshah' },
                { icon: <Globe size={14} />, label: 'aaravshah.dev' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-xs text-text-secondary">
                  <span className="text-brand-gallery-blue shrink-0">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Profile completion */}
          <div className="bg-white rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-brand-navy">Profile Strength</h3>
              <span className="text-sm font-bold text-brand-orange">{completePct}%</span>
            </div>
            <ProgressBar value={completePct} color="#C65D3B" className="mb-4" />
            <div className="space-y-2">
              {profileItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle size={14} className={item.done ? 'text-green-500' : 'text-gray-300'} />
                  <span className={`text-xs ${item.done ? 'text-text-secondary' : 'text-brand-navy font-medium'}`}>{item.label}</span>
                  {!item.done && <span className="ml-auto text-[10px] text-brand-orange font-medium">Add</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-card border border-border p-5">
            <h3 className="text-sm font-semibold text-brand-navy mb-4">Preferences</h3>
            {[
              { label: 'Job Type', value: 'Full-time' },
              { label: 'Work Mode', value: 'Hybrid / Remote' },
              { label: 'Expected Salary', value: '₹20L – ₹28L' },
              { label: 'Notice Period', value: '1 month' },
              { label: 'Open to Relocation', value: 'Yes' },
            ].map(p => (
              <div key={p.label} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="text-xs text-text-secondary">{p.label}</span>
                <span className="text-xs font-semibold text-brand-navy">{p.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-2 space-y-5">
          {/* About */}
          <div className="bg-white rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-brand-navy">About</h3>
              <button className="text-xs text-brand-orange hover:underline flex items-center gap-1"><Edit2 size={12} /> Edit</button>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Passionate Senior Frontend Developer with 5+ years of experience building scalable, accessible, and performant web applications. I specialize in React and TypeScript and love creating beautiful interfaces that users enjoy. I've led frontend architecture for products serving 50K+ users and enjoy mentoring fellow engineers.
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-brand-navy">Skills</h3>
              <button className="text-xs text-brand-orange hover:underline flex items-center gap-1"><Edit2 size={12} /> Edit</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="px-3 py-1.5 bg-brand-light-blue text-brand-gallery-blue text-sm font-medium rounded-xl">{s}</span>
              ))}
              <button className="px-3 py-1.5 bg-brand-cream text-text-secondary text-sm rounded-xl border border-dashed border-border hover:border-brand-gallery-blue hover:text-brand-gallery-blue transition-colors flex items-center gap-1">
                <Plus size={14} /> Add skill
              </button>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-brand-navy">Work Experience</h3>
              <button className="text-xs text-brand-orange hover:underline flex items-center gap-1"><Plus size={12} /> Add</button>
            </div>
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <div key={i} className={`${i < experience.length - 1 ? 'pb-5 border-b border-border' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-light-blue flex items-center justify-center text-brand-gallery-blue font-bold text-sm shrink-0">
                      {exp.company.split(' ').map(w => w[0]).join('').slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-brand-navy">{exp.title}</p>
                          <p className="text-xs text-text-secondary">{exp.company}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs text-text-secondary">{exp.period}</span>
                          {i === 0 && <Badge variant="green" className="block mt-0.5">Current</Badge>}
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary mt-2 leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-brand-navy">Education</h3>
              <button className="text-xs text-brand-orange hover:underline flex items-center gap-1"><Plus size={12} /> Add</button>
            </div>
            {education.map((edu, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-light-blue flex items-center justify-center text-brand-gallery-blue text-xs font-bold shrink-0">IIT</div>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">{edu.degree}</p>
                  <p className="text-xs text-text-secondary">{edu.school}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{edu.year} • GPA: {edu.gpa}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Resume */}
          <div className="bg-white rounded-card border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-brand-navy">Resume</h3>
              <button className="text-xs text-brand-orange hover:underline">Replace</button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-brand-cream rounded-xl border border-border">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                <span className="text-xs font-bold text-brand-orange">PDF</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-navy truncate">aarav_shah_resume_2026.pdf</p>
                <p className="text-xs text-text-secondary">Updated Oct 10, 2026 • 1.2 MB</p>
              </div>
              <button onClick={() => showToast('Resume downloaded!', 'success')} className="p-2 text-text-secondary hover:text-brand-orange transition-colors" aria-label="Download resume">
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
