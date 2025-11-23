
import React from 'react';
import { X } from 'lucide-react';

export const OnboardingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center animate-fade-in p-6">
      {/* Modal Container: Wide & Short */}
      <div className="w-full max-w-[960px] min-h-[340px] bg-[#0D0D0D] border border-white/10 rounded-[20px] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)] relative flex overflow-hidden">
        
        {/* Left Panel - Identity */}
        <div className="w-[280px] bg-white/[0.02] border-r border-white/5 p-8 flex flex-col shrink-0 relative">
             <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
             
             <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 shadow-lg mb-5 bg-[#1C1C1C] relative z-10">
                <img 
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Kofi&backgroundColor=ff7a1a" 
                  alt="Kofi" 
                  className="w-full h-full object-cover" 
                />
            </div>
            <div className="space-y-1 relative z-10">
                <h2 className="text-[12px] font-medium text-white/40 uppercase tracking-wide">Kofi from CleanFunnels</h2>
                <h1 className="text-xl font-medium text-white tracking-tight">Hey, What's up! 👋</h1>
            </div>
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1 p-8 pl-10 flex flex-col relative bg-[#0D0D0D]">
             
             {/* Close (Optional visually, but good for UX) */}
             <button onClick={onClose} className="absolute top-6 right-6 text-white/10 hover:text-white transition-colors">
                <X size={16} />
             </button>

             {/* Body Copy - Constrained width for readability within the wide modal */}
             <div className="max-w-[560px] space-y-4 text-[13px] leading-[1.6] text-[#A1A1AA]">
                <p>
                    Welcome to CleanFunnels. I built this for founders and operators who are tired of wasting time on low-signal inbound. You should know who’s serious, who’s not, and what they actually care about before you ever hop on a call.
                </p>
                <p>
                    CleanFunnels gives you that signal automatically. It learns from every visitor, captures intent, filters out noise, and hands you conversations that actually move revenue forward.
                </p>
                <p className="text-white font-medium">I’m excited you’re here.</p>
             </div>

             {/* Footer Area */}
             <div className="mt-auto pt-8 flex items-end justify-between gap-8">
                
                {/* P.S. Link */}
                <div className="text-[11px] text-[#52525B] leading-relaxed max-w-[340px]">
                    <p>P.S. If you need help, DM me on X. I’m chronically online so I'll respond pretty fast.</p>
                    <a href="https://x.com/fineboynocash" target="_blank" rel="noreferrer" className="text-[#FF7A1A] hover:text-[#FF9F40] transition-colors inline-block mt-0.5 border-b border-transparent hover:border-[#FF9F40]/30">https://x.com/fineboynocash</a>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                    <button 
                        onClick={onClose}
                        className="px-10 py-2.5 rounded-lg bg-[#FF7A1A] text-white font-medium text-[13px] shadow-[0_0_24px_-6px_rgba(255,122,26,0.4)] hover:bg-[#FF8B3D] transition-all hover:shadow-[0_0_32px_-6px_rgba(255,122,26,0.6)] hover:scale-[1.01] active:scale-[0.99]"
                    >
                        Get Started
                    </button>
                    <button 
                        onClick={onClose}
                        className="text-[11px] text-[#52525B] hover:text-[#EDEDED] transition-colors"
                    >
                        Skip tour
                    </button>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};
