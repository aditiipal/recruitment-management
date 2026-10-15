import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, Phone, Video, MoreVertical } from 'lucide-react';
import { Avatar } from '../../components/ui';

const conversations = [
  { id: 'r1', name: 'Priya Sharma', role: 'HR Recruiter — NovaTech', online: true, unread: 1, lastMsg: 'Your interview is confirmed for Friday!', time: '2:30 PM' },
  { id: 'r2', name: 'Sneha Reddy', role: 'Talent Lead — PixelCraft', online: false, unread: 0, lastMsg: "We'll get back to you by Thursday.", time: '10:15 AM' },
  { id: 'r3', name: 'Arjun Nair', role: 'Hiring Manager — GrowthLoop', online: false, unread: 0, lastMsg: 'Thank you for your application.', time: 'Yesterday' },
];

const messageSets: Record<string, { from: string; text: string; time: string; mine: boolean }[]> = {
  r1: [
    { from: 'Priya Sharma', text: 'Hi Aarav! We reviewed your application and were very impressed. Would you be available for a technical interview this Friday at 2 PM IST?', time: '10:00 AM', mine: false },
    { from: 'Me', text: 'Hi Priya! That sounds great, Friday at 2 PM works perfectly for me.', time: '10:30 AM', mine: true },
    { from: 'Priya Sharma', text: 'Excellent! I'll send the Google Meet link to your registered email. Please prepare for a 60-min technical round.', time: '10:45 AM', mine: false },
    { from: 'Me', text: 'Perfect, thank you! Should I prepare anything specific for the interview?', time: '11:00 AM', mine: true },
    { from: 'Priya Sharma', text: 'Your interview is confirmed for Friday!', time: '2:30 PM', mine: false },
  ],
};

const CandidateMessages: React.FC = () => {
  const [activeConv, setActiveConv] = useState('r1');
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

  const filtered = conversations.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-brand-navy">Messages</h1>
        <p className="text-sm text-text-secondary mt-1">Chat with recruiters</p>
      </div>

      <div className="bg-white rounded-card border border-border overflow-hidden flex h-[calc(100vh-220px)] min-h-[500px]">
        {/* Sidebar */}
        <div className="w-64 shrink-0 border-r border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 bg-brand-cream rounded-xl px-3 py-2">
              <Search size={14} className="text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                className="bg-transparent text-xs outline-none flex-1 text-brand-navy placeholder:text-gray-400" aria-label="Search messages" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(conv => (
              <button key={conv.id} onClick={() => setActiveConv(conv.id)}
                className={`w-full flex items-start gap-2.5 px-3 py-3 text-left border-b border-border transition-colors ${activeConv === conv.id ? 'bg-brand-cream' : 'hover:bg-brand-cream/50'}`}>
                <div className="relative shrink-0">
                  <Avatar name={conv.name} size="sm" />
                  {conv.online && <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400 border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-semibold text-brand-navy truncate">{conv.name}</p>
                    <span className="text-[9px] text-text-secondary shrink-0 ml-1">{conv.time}</span>
                  </div>
                  <p className="text-[10px] text-text-secondary truncate">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-4 h-4 rounded-full bg-brand-orange text-white text-[9px] font-bold flex items-center justify-center shrink-0">{conv.unread}</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="relative">
              <Avatar name={currentConv?.name || ''} size="sm" />
              {currentConv?.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-navy">{currentConv?.name}</p>
              <p className="text-xs text-text-secondary">{currentConv?.role}</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 text-text-secondary hover:text-brand-navy hover:bg-brand-cream rounded-lg transition-colors" aria-label="Phone call"><Phone size={16} /></button>
              <button className="p-1.5 text-text-secondary hover:text-brand-navy hover:bg-brand-cream rounded-lg transition-colors" aria-label="Video call"><Video size={16} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-cream/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.mine ? 'flex-row-reverse' : ''}`}>
                {!msg.mine && <Avatar name={msg.from} size="sm" />}
                <div className={`max-w-xs ${msg.mine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.mine ? 'bg-brand-orange text-white rounded-tr-sm' : 'bg-white text-brand-navy border border-border rounded-tl-sm shadow-sm'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-text-secondary px-1">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-3 flex gap-2 border-t border-border bg-white">
            <button className="p-2 text-text-secondary hover:text-brand-navy rounded-lg transition-colors" aria-label="Attach file"><Paperclip size={16} /></button>
            <input value={message} onChange={e => setMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
              placeholder="Type a message…"
              className="flex-1 bg-brand-cream rounded-xl px-3 py-2 text-sm outline-none border border-border focus:border-brand-gallery-blue transition-all" aria-label="Message input" />
            <button onClick={handleSend} disabled={!message.trim()}
              className={`p-2.5 rounded-xl transition-all ${message.trim() ? 'bg-brand-orange text-white hover:bg-brand-orange-dark' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
              aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateMessages;
