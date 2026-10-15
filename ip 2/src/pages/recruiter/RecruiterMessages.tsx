import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Send, Paperclip, Smile, MoreVertical, Phone, Video } from 'lucide-react';
import { mockMessages, Message } from '../../data/mockData';
import { Avatar, Badge } from '../../components/ui';

const conversations = [
  { id: 'c1', name: 'Aarav Shah', role: 'Sr. Frontend Developer', unread: 2, online: true, lastMsg: 'Thank you for the opportunity!', time: '2:30 PM' },
  { id: 'c2', name: 'Meera Krishnan', role: 'ML Engineer Intern', unread: 0, online: true, lastMsg: "I'll be available after 3 PM.", time: '1:15 PM' },
  { id: 'c3', name: 'Rohan Patel', role: 'Product Designer', unread: 1, online: false, lastMsg: 'The portfolio has been updated.', time: '11:00 AM' },
  { id: 'c4', name: 'Sanya Iyer', role: 'Data Analyst', unread: 0, online: false, lastMsg: 'Looking forward to the interview.', time: 'Yesterday' },
  { id: 'c5', name: 'Arjun Verma', role: 'DevOps Engineer', unread: 0, online: true, lastMsg: "I'll send my references shortly.", time: 'Yesterday' },
];

const messageSets: Record<string, { from: string; text: string; time: string; mine: boolean }[]> = {
  c1: [
    { from: 'Aarav Shah', text: 'Hi Priya, thank you for reaching out! I'm very interested in the Sr. Frontend Developer position.', time: '9:30 AM', mine: false },
    { from: 'Me', text: 'Great to hear, Aarav! We reviewed your profile and were impressed with your experience. Are you available for a technical interview this Friday?', time: '9:45 AM', mine: true },
    { from: 'Aarav Shah', text: 'Absolutely! Friday works perfectly for me. What time should I expect the call?', time: '10:00 AM', mine: false },
    { from: 'Me', text: 'We'll do 2:00 PM IST via Google Meet. I'll send you the calendar invite shortly.', time: '10:05 AM', mine: true },
    { from: 'Aarav Shah', text: 'Thank you for the opportunity!', time: '2:30 PM', mine: false },
  ],
  c2: [
    { from: 'Meera Krishnan', text: 'Hello! I just applied for the ML Intern position. Could you share more about the tech stack?', time: '10:30 AM', mine: false },
    { from: 'Me', text: 'Hi Meera! The role uses Python, TensorFlow, and GCP. Your profile looks great for this position.', time: '11:00 AM', mine: true },
    { from: 'Meera Krishnan', text: 'That sounds perfect! I have experience with all three. When can I expect to hear back?', time: '11:15 AM', mine: false },
    { from: 'Me', text: 'We're scheduling screening calls this week. I'll reach out by Thursday.', time: '11:20 AM', mine: true },
    { from: 'Meera Krishnan', text: 'I'll be available after 3 PM.', time: '1:15 PM', mine: false },
  ],
};

const RecruiterMessages: React.FC = () => {
  const [activeConv, setActiveConv] = useState('c1');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [msgMap, setMsgMap] = useState(messageSets);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConv = conversations.find(c => c.id === activeConv);
  const messages = msgMap[activeConv] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv, messages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMsg = { from: 'Me', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), mine: true };
    setMsgMap(prev => ({ ...prev, [activeConv]: [...(prev[activeConv] || []), newMsg] }));
    setMessage('');
  };

  const filteredConvs = conversations.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-brand-navy">Messages</h1>
        <p className="text-sm text-text-secondary mt-1">Communicate with candidates directly</p>
      </div>

      <div className="bg-white rounded-card border border-border overflow-hidden flex h-[calc(100vh-220px)] min-h-[500px]">
        {/* Conversation list */}
        <div className="w-72 shrink-0 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 bg-brand-cream rounded-xl px-3 py-2">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations…"
                className="bg-transparent text-sm outline-none flex-1 text-brand-navy placeholder:text-gray-400" aria-label="Search messages" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConvs.map(conv => (
              <button key={conv.id} onClick={() => setActiveConv(conv.id)}
                className={`w-full flex items-start gap-3 px-4 py-3.5 text-left border-b border-border transition-colors ${activeConv === conv.id ? 'bg-brand-cream' : 'hover:bg-brand-cream/50'}`}
                aria-label={`Conversation with ${conv.name}`}
              >
                <div className="relative shrink-0">
                  <Avatar name={conv.name} size="sm" />
                  {conv.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold text-brand-navy truncate">{conv.name}</p>
                    <span className="text-[10px] text-text-secondary shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-xs text-text-secondary truncate">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
            <div className="relative">
              <Avatar name={currentConv?.name || ''} size="sm" />
              {currentConv?.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-navy">{currentConv?.name}</p>
              <p className="text-xs text-text-secondary">{currentConv?.role} • {currentConv?.online ? 'Online' : 'Offline'}</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 text-text-secondary hover:text-brand-navy hover:bg-brand-cream rounded-lg transition-colors" aria-label="Voice call"><Phone size={18} /></button>
              <button className="p-2 text-text-secondary hover:text-brand-navy hover:bg-brand-cream rounded-lg transition-colors" aria-label="Video call"><Video size={18} /></button>
              <button className="p-2 text-text-secondary hover:text-brand-navy hover:bg-brand-cream rounded-lg transition-colors" aria-label="More options"><MoreVertical size={18} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-brand-cream/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.mine ? 'flex-row-reverse' : ''}`}>
                {!msg.mine && <Avatar name={msg.from} size="sm" />}
                <div className={`max-w-sm ${msg.mine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.mine ? 'bg-brand-orange text-white rounded-tr-sm' : 'bg-white text-brand-navy border border-border rounded-tl-sm shadow-card'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-text-secondary px-1">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          <div className="px-4 py-2 border-t border-border bg-brand-cream/20 flex gap-2 overflow-x-auto">
            {['Schedule interview', 'Request resume', 'Shortlist candidate', 'Send offer letter'].map(q => (
              <button key={q} onClick={() => setMessage(q)}
                className="shrink-0 px-3 py-1 bg-white border border-border rounded-full text-xs text-text-secondary hover:border-brand-gallery-blue hover:text-brand-gallery-blue transition-colors">
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="px-4 py-3 border-t border-border flex items-center gap-3 bg-white">
            <button type="button" className="p-2 text-text-secondary hover:text-brand-navy rounded-lg transition-colors" aria-label="Attach file"><Paperclip size={18} /></button>
            <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message…"
              className="flex-1 bg-brand-cream rounded-xl px-4 py-2.5 text-sm outline-none text-brand-navy placeholder:text-gray-400 border border-border focus:border-brand-gallery-blue transition-all"
              aria-label="Message input" />
            <button type="submit" disabled={!message.trim()}
              className={`p-2.5 rounded-xl transition-all ${message.trim() ? 'bg-brand-orange text-white hover:bg-brand-orange-dark shadow-sm' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
              aria-label="Send message">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecruiterMessages;
