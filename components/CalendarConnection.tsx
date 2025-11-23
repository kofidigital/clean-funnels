
import React, { useState } from 'react';
import { Calendar, Link2, Check, ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { Button, Input } from './UIComponents';

export const CalendarConnection: React.FC = () => {
  const [type, setType] = useState<'google' | 'link' | null>(null);
  const [url, setUrl] = useState('');
  const [connected, setConnected] = useState(false);

  if (connected) {
     return (
        <div className="bg-surface border border-borderSubtle rounded-xl p-8 flex flex-col items-center text-center animate-fade-in max-w-[480px] mx-auto">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20 shadow-glow">
                <Check size={24} strokeWidth={3} />
            </div>
            <h3 className="text-lg font-medium text-textMain">Calendar Connected</h3>
            <p className="text-textSecondary text-[13px] mt-1 mb-6 max-w-xs leading-relaxed">
                CleanFunnels is now synced with your {type === 'google' ? 'Google Calendar' : 'scheduling link'}. Availability will update automatically.
            </p>
            <Button variant="outline" onClick={() => setConnected(false)} size="sm" className="text-[11px]">
                Disconnect
            </Button>
        </div>
     );
  }

  return (
    <div className="bg-surface border border-borderSubtle rounded-xl p-8 max-w-[480px] mx-auto animate-fade-in shadow-card">
        <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-textMain tracking-tight">Connect Your Calendar</h2>
            <p className="text-textSecondary text-[13px] mt-2 leading-relaxed text-center max-w-xs mx-auto">
                CleanFunnels uses your calendar to automatically schedule calls with qualified leads.
            </p>
        </div>

        <div className="space-y-3">
            <button
                onClick={() => { setType('google'); setTimeout(() => setConnected(true), 1000); }}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 group ${type === 'google' ? 'bg-surfaceHighlight border-textMain shadow-lg' : 'bg-page border-borderSubtle hover:border-borderHighlight hover:bg-surfaceHighlight/50'}`}
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google" className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <div className="text-[13px] font-medium text-textMain">Google Calendar</div>
                        <div className="text-[11px] text-textTertiary group-hover:text-textSecondary transition-colors">Auto-sync availability & events</div>
                    </div>
                </div>
                {type === 'google' && <CheckCircle2 size={18} className="text-emerald-500" />}
            </button>

            <button
                onClick={() => setType('link')}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 group ${type === 'link' ? 'bg-surfaceHighlight border-textMain shadow-lg' : 'bg-page border-borderSubtle hover:border-borderHighlight hover:bg-surfaceHighlight/50'}`}
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-surfaceHighlight border border-borderSubtle rounded-lg flex items-center justify-center shrink-0">
                        <Link2 size={20} className="text-textMain" />
                    </div>
                    <div className="text-left">
                        <div className="text-[13px] font-medium text-textMain">Use External Link</div>
                        <div className="text-[11px] text-textTertiary group-hover:text-textSecondary transition-colors">Calendly, Cal.com, or Hubspot</div>
                    </div>
                </div>
                 {type === 'link' && <CheckCircle2 size={18} className="text-emerald-500" />}
            </button>
        </div>

        {type === 'link' && (
            <div className="mt-6 animate-slide-up pt-6 border-t border-borderSubtle">
                <div className="space-y-3">
                    <label className="text-[11px] font-medium text-textSecondary flex items-center gap-2">
                        <Globe size={12} /> Booking URL
                    </label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                             <Input 
                                placeholder="https://cal.com/your-name/30min" 
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="h-10 pl-9"
                                autoFocus
                            />
                            <Link2 size={14} className="absolute left-3 top-3 text-textTertiary" />
                        </div>
                        <Button 
                            variant="primary" 
                            disabled={!url} 
                            onClick={() => setConnected(true)} 
                            className="h-10 px-6 bg-textMain text-page hover:bg-white shadow-glow"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
