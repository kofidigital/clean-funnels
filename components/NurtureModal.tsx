
import React, { useState } from 'react';
import { X, Sparkles, Mail, Clock, FileText, MessageSquare, Check, Calendar } from 'lucide-react';
import { Button } from './UIComponents';

interface NurtureModalProps {
  onClose: () => void;
  leadName: string;
}

export const NurtureModal: React.FC<NurtureModalProps> = ({ onClose, leadName }) => {
  const [selectedOption, setSelectedOption] = useState<string>('drip'); // Default to AI reco
  const [reminderDate, setReminderDate] = useState('7 Days');

  const options = [
    {
      id: 'drip',
      title: '7-Day Educational Drip',
      desc: 'Educate and warm up with automated content.',
      icon: Mail,
      rec: true
    },
    {
      id: 'reminder',
      title: 'Check-in Reminder',
      desc: 'Set a task to follow up manually.',
      icon: Clock,
      rec: false
    },
    {
      id: 'resources',
      title: 'Send Resources Pack',
      desc: 'Deliver case studies and whitepapers instantly.',
      icon: FileText,
      rec: false
    },
    {
      id: 'message',
      title: 'Custom Message',
      desc: 'Write a personalized one-off email.',
      icon: MessageSquare,
      rec: false
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
       <div className="w-full max-w-[500px] bg-page border border-borderSubtle rounded-xl shadow-modal overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-borderSubtle flex justify-between items-start bg-page z-10">
             <div>
                <h2 className="text-[16px] font-medium text-textMain tracking-tight">Nurture Lead</h2>
                <p className="text-[12px] text-textSecondary mt-1">Choose how you want to follow up with <span className="text-textMain">{leadName}</span>.</p>
             </div>
             <button 
                onClick={onClose} 
                className="text-textTertiary hover:text-textMain bg-surface border border-borderSubtle hover:bg-surfaceHighlight rounded-full p-1 transition-all"
             >
                <X size={14} />
             </button>
          </div>

          <div className="overflow-y-auto custom-scrollbar bg-page">
            {/* AI Banner */}
            <div className="mx-6 mt-6 p-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-lg flex items-start gap-3 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-0.5 h-full bg-indigo-500/50" />
               <Sparkles size={14} className="text-indigo-400 mt-0.5 shrink-0" />
               <div className="space-y-1">
                  <p className="text-[11px] font-medium text-indigo-300">AI Recommendation</p>
                  <p className="text-[11px] text-indigo-200/80 leading-relaxed">
                     This lead mentioned <span className="text-indigo-200">low budget</span> and <span className="text-indigo-200">early stage</span>. A 7-day educational drip is suggested to build trust.
                  </p>
               </div>
            </div>

            {/* Options */}
            <div className="p-6 space-y-3">
                {options.map((opt) => (
                   <div 
                      key={opt.id}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`
                        group relative flex items-start gap-4 p-3.5 rounded-lg border cursor-pointer transition-all duration-200
                        ${selectedOption === opt.id 
                           ? 'bg-surfaceHighlight border-textSecondary/30 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]' 
                           : 'bg-surface/50 border-borderSubtle hover:border-borderHighlight hover:bg-surfaceHighlight/50'}
                      `}
                   >
                      {/* Selection Ring */}
                      <div className={`
                         w-4 h-4 rounded-full border flex items-center justify-center mt-1 shrink-0 transition-colors
                         ${selectedOption === opt.id ? 'border-textMain bg-textMain' : 'border-borderSubtle group-hover:border-textSecondary'}
                      `}>
                         {selectedOption === opt.id && <Check size={10} className="text-page" strokeWidth={3} />}
                      </div>

                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-center mb-0.5">
                            <h3 className={`text-[13px] font-medium transition-colors ${selectedOption === opt.id ? 'text-textMain' : 'text-textSecondary'}`}>
                               {opt.title}
                            </h3>
                            {opt.rec && (
                               <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                                  <Sparkles size={8} className="text-indigo-400" />
                                  <span className="text-[9px] font-medium text-indigo-300 uppercase tracking-wide">Suggested</span>
                               </div>
                            )}
                         </div>
                         <p className="text-[11px] text-textTertiary leading-normal">{opt.desc}</p>

                         {/* Conditional Content Inside Card for smoother UX */}
                         {selectedOption === 'reminder' && opt.id === 'reminder' && (
                            <div className="mt-3 pt-3 border-t border-borderSubtle/50 animate-fade-in">
                               <div className="flex items-center gap-2">
                                  <Calendar size={12} className="text-textTertiary" />
                                  <span className="text-[11px] text-textSecondary mr-2">Remind in:</span>
                                  <div className="flex gap-1.5">
                                    {['3 Days', '7 Days', '14 Days'].map(d => (
                                       <button 
                                          key={d}
                                          onClick={(e) => { e.stopPropagation(); setReminderDate(d); }}
                                          className={`px-2 py-0.5 rounded text-[10px] border transition-colors ${reminderDate === d ? 'bg-textMain text-page border-textMain' : 'bg-transparent border-borderSubtle text-textTertiary hover:text-textSecondary'}`}
                                       >
                                          {d}
                                       </button>
                                    ))}
                                  </div>
                               </div>
                            </div>
                         )}
                      </div>
                   </div>
                ))}

                {selectedOption === 'message' && (
                   <div className="mt-4 animate-fade-in space-y-2 pl-1">
                      <div className="flex justify-between items-center">
                         <label className="text-[11px] font-medium text-textSecondary">Message Preview</label>
                         <div className="flex items-center gap-1 text-[10px] text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded-full border border-indigo-500/10">
                            <Sparkles size={10} />
                            <span>AI Drafted</span>
                         </div>
                      </div>
                      <div className="relative">
                         <textarea 
                            className="w-full h-32 bg-surface border border-borderSubtle rounded-lg p-3 text-[12px] leading-relaxed text-textMain placeholder:text-textTertiary focus:outline-none focus:border-borderHighlight resize-none"
                            defaultValue={`Hi ${leadName},\n\nI noticed you're exploring options for scaling but mentioned budget constraints right now.\n\nI wanted to share a free resource on "Organic Growth" that might help you get started without ad spend.\n\nLet me know if this helps!`}
                         />
                      </div>
                   </div>
                )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-borderSubtle bg-surface/30 flex justify-between items-center mt-auto">
             <div className="text-[11px] text-textTertiary">
                {selectedOption === 'drip' ? 'Sequence starts immediately' : selectedOption === 'reminder' ? 'Task will be added to dashboard' : 'Action triggers instantly'}
             </div>
             <div className="flex gap-3">
                <Button variant="ghost" onClick={onClose} size="sm">Cancel</Button>
                <Button variant="primary" onClick={onClose} size="sm" className="px-6">
                   Confirm Action
                </Button>
             </div>
          </div>
       </div>
    </div>
  );
};
