
import React, { useState } from 'react';
import { X, MessageSquare, Link2, Calendar, ExternalLink, Send, Sparkles } from 'lucide-react';
import { Button } from './UIComponents';

interface ManualLinkModalProps {
  onClose: () => void;
  leadName: string;
}

export const ManualLinkModal: React.FC<ManualLinkModalProps> = ({ onClose, leadName }) => {
  const [message, setMessage] = useState(`Hey ${leadName}, even though the timing might not be perfect, here’s my calendar link if you'd still like to chat.`);
  const [link, setLink] = useState('https://cal.com/kofi/intro');

  const handleSend = () => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-surface border border-borderSubtle text-textMain px-4 py-2 rounded-full shadow-glow text-[12px] font-medium z-[300] animate-slide-up flex items-center gap-2';
    toast.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Calendar link sent manually.';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in p-4">
      <div className="w-full max-w-[840px] bg-[#0A0A0A] border border-borderSubtle rounded-xl shadow-modal overflow-hidden animate-slide-up flex flex-col">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-borderSubtle flex justify-between items-start bg-[#0A0A0A] z-10">
          <div>
            <h2 className="text-[18px] font-medium text-textMain tracking-tight">Send Calendar Link Anyway</h2>
            <p className="text-[13px] text-textSecondary mt-1">This lead did not qualify automatically. You can still offer them a meeting manually.</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-textTertiary hover:text-textMain bg-surface border border-borderSubtle hover:bg-surfaceHighlight rounded-full p-1.5 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body - Two Columns */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 bg-page relative">
           
           {/* Left Column: Inputs */}
           <div className="space-y-6">
              
              <div className="space-y-3">
                 <label className="text-[12px] font-medium text-textMain flex items-center gap-2">
                    <Link2 size={14} className="text-textTertiary" /> Your Calendar URL
                 </label>
                 <div className="relative group">
                    <input 
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="w-full bg-surface border border-borderSubtle rounded-lg pl-10 pr-4 py-2.5 text-[13px] font-mono text-blue-400 focus:outline-none focus:border-blue-500/30 transition-colors placeholder:text-textTertiary"
                      placeholder="https://calendly.com/your-link"
                    />
                    <div className="absolute left-3 top-2.5 text-textTertiary group-focus-within:text-blue-500 transition-colors">
                        <Link2 size={14} />
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[12px] font-medium text-textMain flex items-center gap-2">
                    <MessageSquare size={14} className="text-textTertiary" /> Add a message
                 </label>
                 <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-32 bg-surface border border-borderSubtle rounded-lg p-4 text-[13px] leading-relaxed text-textMain placeholder:text-textTertiary focus:outline-none focus:border-borderHighlight resize-none transition-colors"
                    placeholder="Type your message here..."
                 />
              </div>

           </div>

           {/* Right Column: Preview */}
           <div className="flex flex-col h-full">
              <label className="text-[11px] font-medium text-textTertiary mb-3 uppercase tracking-wider flex items-center gap-2">
                 Previewing as Email
              </label>
              
              <div className="flex-1 bg-[#111111] border border-borderSubtle rounded-xl p-6 flex flex-col relative overflow-hidden group">
                 {/* Subtle Background Decoration */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none -mt-10 -mr-10" />

                 <div className="space-y-5 relative z-10 flex-1">
                    {/* Mock Header */}
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                       <div className="w-8 h-8 rounded-full bg-surface border border-borderSubtle flex items-center justify-center text-[10px] font-medium text-textSecondary">
                          YOU
                       </div>
                       <div className="space-y-0.5">
                          <div className="text-[12px] text-textMain font-medium">Kofi from CleanFunnels</div>
                          <div className="text-[10px] text-textTertiary">To: {leadName}</div>
                       </div>
                    </div>

                    {/* Body */}
                    <div className="text-[13px] text-textSecondary leading-relaxed whitespace-pre-wrap font-light">
                       {message || <span className="text-textTertiary italic">No message content...</span>}
                    </div>
                 </div>

                 {/* Attachment Card */}
                 <div className="mt-6 relative z-10">
                    <div className="bg-page border border-borderSubtle rounded-lg p-3 flex items-center gap-3 group/card hover:border-blue-500/30 transition-colors cursor-pointer">
                       <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded flex items-center justify-center border border-blue-500/20 shrink-0">
                          <Calendar size={18} />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-medium text-textMain truncate group-hover/card:text-blue-400 transition-colors">Book a Meeting</div>
                          <div className="text-[10px] text-textTertiary truncate font-mono opacity-70">{link}</div>
                       </div>
                       <ExternalLink size={12} className="text-textTertiary group-hover/card:text-textMain transition-colors" />
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-borderSubtle bg-surface/30 flex justify-end items-center gap-3">
            <Button variant="ghost" onClick={onClose} size="md">Cancel</Button>
            <Button 
               variant="primary" 
               onClick={handleSend} 
               size="md" 
               className="px-6 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)] border border-blue-500/20"
               icon={<Send size={14} />}
            >
              Send Calendar Link
            </Button>
        </div>
      </div>
    </div>
  );
};
