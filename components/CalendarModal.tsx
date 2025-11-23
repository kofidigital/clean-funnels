
import React, { useState } from 'react';
import { X, Calendar, Link2, Check, Sparkles, MessageSquare, Clock, Globe } from 'lucide-react';
import { Button, Input } from './UIComponents';

interface CalendarModalProps {
  onClose: () => void;
  leadName: string;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ onClose, leadName }) => {
  const [selectedType, setSelectedType] = useState<'embedded' | 'external'>('embedded');
  const [externalUrl, setExternalUrl] = useState('');
  const [meetingType, setMeetingType] = useState('30-min Strategy Call');
  const [message, setMessage] = useState(`Hi ${leadName},\n\nBased on your answers, we'd love to speak with you. Choose a time that works best below.`);

  // Simple brand detection for external URLs
  const getBrandIcon = (url: string) => {
    if (url.includes('calendly')) return 'Calendly';
    if (url.includes('cal.com')) return 'Cal.com';
    return 'Link';
  };

  const handleSend = () => {
    // In a real app, this would trigger an API call
    // For now, we simulate success and close
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-surface border border-borderSubtle text-textMain px-4 py-2 rounded-full shadow-glow text-[12px] font-medium z-[300] animate-slide-up flex items-center gap-2';
    toast.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Calendar link sent to prospect.';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="w-full max-w-[600px] bg-page border border-borderSubtle rounded-xl shadow-modal overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-borderSubtle flex justify-between items-start bg-page z-10">
          <div>
            <h2 className="text-[16px] font-medium text-textMain tracking-tight">Send Calendar Link</h2>
            <p className="text-[12px] text-textSecondary mt-1">Choose how <span className="text-textMain">{leadName}</span> should book a call.</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-textTertiary hover:text-textMain bg-surface border border-borderSubtle hover:bg-surfaceHighlight rounded-full p-1 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        <div className="overflow-y-auto custom-scrollbar bg-page p-6 space-y-6">
          
          {/* Option Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Embedded Option */}
            <div 
              onClick={() => setSelectedType('embedded')}
              className={`
                group relative border rounded-xl p-4 cursor-pointer transition-all duration-200 flex flex-col h-full
                ${selectedType === 'embedded' 
                  ? 'bg-surfaceHighlight border-indigo-500/30 shadow-[0_0_0_1px_rgba(99,102,241,0.2)]' 
                  : 'bg-surface/50 border-borderSubtle hover:border-borderHighlight hover:bg-surfaceHighlight/30'}
              `}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                  <Calendar size={16} />
                </div>
                <div className={`
                  w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                  ${selectedType === 'embedded' ? 'border-indigo-500 bg-indigo-500' : 'border-borderSubtle group-hover:border-textSecondary'}
                `}>
                  {selectedType === 'embedded' && <Check size={10} className="text-white" strokeWidth={3} />}
                </div>
              </div>
              
              <h3 className="text-[13px] font-medium text-textMain mb-1">Use Embedded Calendar</h3>
              <p className="text-[11px] text-textSecondary leading-relaxed mb-4">Let the prospect book directly inside the flow.</p>
              
              <div className="mt-auto pt-3 border-t border-borderSubtle/50 space-y-2 opacity-80 group-hover:opacity-100 transition-opacity">
                 <div className="flex items-center gap-2 text-[10px] text-textTertiary">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Google Calendar Connected
                 </div>
                 <select 
                   value={meetingType}
                   onChange={(e) => setMeetingType(e.target.value)}
                   onClick={(e) => e.stopPropagation()}
                   className="w-full bg-page border border-borderSubtle rounded px-2 py-1.5 text-[11px] text-textMain focus:outline-none focus:border-indigo-500/50"
                 >
                   <option>15-min Intro Call</option>
                   <option>30-min Strategy Call</option>
                   <option>60-min Deep Dive</option>
                 </select>
              </div>
            </div>

            {/* External Option */}
            <div 
              onClick={() => setSelectedType('external')}
              className={`
                group relative border rounded-xl p-4 cursor-pointer transition-all duration-200 flex flex-col h-full
                ${selectedType === 'external' 
                  ? 'bg-surfaceHighlight border-textSecondary/30 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]' 
                  : 'bg-surface/50 border-borderSubtle hover:border-borderHighlight hover:bg-surfaceHighlight/30'}
              `}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-borderSubtle text-textSecondary">
                  <Link2 size={16} />
                </div>
                <div className={`
                  w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                  ${selectedType === 'external' ? 'border-textMain bg-textMain' : 'border-borderSubtle group-hover:border-textSecondary'}
                `}>
                  {selectedType === 'external' && <Check size={10} className="text-page" strokeWidth={3} />}
                </div>
              </div>
              
              <h3 className="text-[13px] font-medium text-textMain mb-1">Use External Link</h3>
              <p className="text-[11px] text-textSecondary leading-relaxed mb-4">Send your existing Calendly or Cal.com link.</p>
              
              <div className="mt-auto pt-3 border-t border-borderSubtle/50 relative">
                 <input 
                   type="text"
                   placeholder="https://calendly.com/..."
                   value={externalUrl}
                   onChange={(e) => setExternalUrl(e.target.value)}
                   onClick={(e) => e.stopPropagation()}
                   className="w-full bg-page border border-borderSubtle rounded px-2 py-1.5 pl-7 text-[11px] text-textMain focus:outline-none focus:border-textSecondary placeholder:text-textTertiary"
                 />
                 <div className="absolute left-2 bottom-[7px] pointer-events-none">
                    <Globe size={10} className="text-textTertiary" />
                 </div>
                 {externalUrl && (
                   <div className="absolute right-2 bottom-[7px] text-[9px] text-textTertiary font-medium">
                      {getBrandIcon(externalUrl)}
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* AI Message Preview */}
          <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-medium text-textSecondary flex items-center gap-2">
                    <MessageSquare size={12} /> Message Preview
                  </label>
                  <div className="flex items-center gap-1 text-[10px] text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded-full border border-indigo-500/10">
                    <Sparkles size={10} />
                    <span>AI Drafted</span>
                  </div>
              </div>
              <div className="relative group">
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-24 bg-surface border border-borderSubtle rounded-lg p-3 text-[12px] leading-relaxed text-textMain placeholder:text-textTertiary focus:outline-none focus:border-borderHighlight resize-none transition-colors"
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none">
                    <span className="text-[9px] text-textTertiary">Markdown supported</span>
                  </div>
              </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-borderSubtle bg-surface/30 flex justify-between items-center mt-auto">
          <div className="text-[11px] text-textTertiary flex items-center gap-2">
             <Clock size={12} />
             {selectedType === 'embedded' 
                ? 'Availability synced from Google Cal' 
                : 'Link will be sent via email & chat'
             }
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose} size="sm">Cancel</Button>
            <Button variant="primary" onClick={handleSend} size="sm" className="px-6 shadow-glow bg-textMain hover:bg-white text-page">
              Send Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
