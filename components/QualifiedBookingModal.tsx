
import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './UIComponents';

interface QualifiedBookingModalProps {
  onClose: () => void;
  leadName: string;
}

export const QualifiedBookingModal: React.FC<QualifiedBookingModalProps> = ({ onClose, leadName }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const DATES = [
    { day: 'Wed', date: 'Oct 24', slots: ['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM'] },
    { day: 'Thu', date: 'Oct 25', slots: ['9:00 AM', '11:00 AM', '2:30 PM'] },
    { day: 'Fri', date: 'Oct 26', slots: ['10:00 AM', '1:00 PM', '4:00 PM'] },
  ];

  const handleBook = () => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-surface border border-borderSubtle text-textMain px-4 py-2 rounded-full shadow-glow text-[12px] font-medium z-[300] animate-slide-up flex items-center gap-2';
    toast.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Call booked successfully.';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-4">
      <div className="w-full max-w-[800px] bg-[#0A0A0A] border border-borderSubtle rounded-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-borderSubtle flex justify-between items-start bg-[#0A0A0A]">
          <div>
             <div className="flex items-center gap-2 mb-1">
                <h2 className="text-[18px] font-medium text-textMain tracking-tight">Schedule a Call with {leadName}</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400 flex items-center gap-1">
                   <CheckCircle2 size={10} /> Qualified Lead
                </span>
             </div>
            <p className="text-[13px] text-textSecondary">This lead meets all qualification thresholds. Choose a time below.</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-textTertiary hover:text-textMain bg-surface border border-borderSubtle hover:bg-surfaceHighlight rounded-full p-1.5 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Main Content - Horizontal Layout */}
        <div className="flex-1 overflow-y-auto bg-page p-8">
           
           {/* Calendar Strip */}
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2 text-textMain font-medium text-[14px]">
                    <Calendar size={14} className="text-textTertiary" />
                    October 2023
                 </div>
                 <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-surface text-textTertiary hover:text-textMain transition-colors"><ChevronLeft size={14} /></button>
                    <button className="p-1 rounded hover:bg-surface text-textTertiary hover:text-textMain transition-colors"><ChevronRight size={14} /></button>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                 {DATES.map((day, i) => (
                    <div key={i} className="space-y-3">
                       <div className="text-[11px] font-medium text-textSecondary uppercase tracking-wider border-b border-borderSubtle pb-2">
                          {day.day}, {day.date}
                       </div>
                       <div className="space-y-2">
                          {day.slots.map((slot) => (
                             <button
                                key={slot}
                                onClick={() => setSelectedTime(`${day.day} ${slot}`)}
                                className={`
                                   w-full py-2.5 px-3 rounded-lg border text-[13px] font-medium transition-all duration-200 flex items-center justify-center gap-2
                                   ${selectedTime === `${day.day} ${slot}`
                                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]'
                                      : 'bg-surface border-borderSubtle text-textSecondary hover:border-textSecondary hover:text-textMain hover:bg-surfaceHighlight'}
                                `}
                             >
                                {slot}
                             </button>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Note Area */}
           <div className="mt-8 pt-6 border-t border-borderSubtle flex items-start gap-3">
              <Clock size={14} className="text-textTertiary mt-0.5" />
              <p className="text-[12px] text-textSecondary leading-relaxed">
                 Scheduling <strong>30-min Strategy Call</strong>. A confirmation email will be sent to {leadName} automatically.
              </p>
           </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-borderSubtle bg-surface/30 flex justify-end items-center gap-4">
           <button onClick={onClose} className="text-[13px] text-textSecondary hover:text-textMain transition-colors px-2">Close</button>
           <Button 
             variant="primary" 
             onClick={handleBook} 
             disabled={!selectedTime}
             className={`px-8 h-10 text-[13px] transition-all ${!selectedTime ? 'opacity-50' : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-glow'}`}
           >
              Book Call
           </Button>
        </div>
      </div>
    </div>
  );
};
