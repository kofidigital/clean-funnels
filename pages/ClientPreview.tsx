import React, { useState, useEffect } from 'react';
import { X, Send, ArrowRight, Sparkles } from 'lucide-react';

export const ClientPreviewPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Array<{role: 'ai'|'user', text: string}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setTimeout(() => setStep(1), 500);
  }, []);

  const handleStartChat = () => {
    setStep(2);
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        setMessages([{ role: 'ai', text: "Thanks for reaching out! To make sure we're a good fit, what's your main goal with funnel automation?" }]);
    }, 800);
  };

  const handleSendMessage = () => {
    if (!inputValue) return;
    const newMsg = { role: 'user' as const, text: inputValue };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'ai', text: "Got it. And roughly how many leads are you processing monthly right now?" }]);
        if (messages.length > 1) {
            setTimeout(() => setStep(3), 1500);
        }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#000000]/90 flex items-center justify-center animate-in fade-in duration-500 p-4 sm:p-0">
      
      {/* Exit Button */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-textSecondary hover:text-textMain transition-colors flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
      >
        <span className="text-[11px] font-medium uppercase tracking-wider">Close Preview</span>
        <X size={14} />
      </button>

      {/* Floating Glass Device */}
      <div className={`
        w-full max-w-[400px] bg-[#0E0F11] rounded-[32px] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] relative
        ${step === 0 ? 'opacity-0 translate-y-20 scale-95' : 'opacity-100 translate-y-0 scale-100'}
        ${step === 1 ? 'h-[520px]' : 'h-[650px]'}
      `}>
        
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#141517]/80 backdrop-blur-xl sticky top-0 z-20">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-black rounded-sm" />
                </div>
                <span className="font-medium text-white text-[14px]">CleanForm</span>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
            
            {/* Step 1: Static */}
            {step === 1 && (
                <div className="p-8 flex flex-col h-full justify-center space-y-8 animate-in fade-in duration-700">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-medium text-white tracking-tight">Let's get started.</h2>
                        <p className="text-[14px] text-textSecondary leading-relaxed">We just need a few details to personalize your experience.</p>
                    </div>
                    <div className="space-y-3">
                        <input type="text" placeholder="Full Name" className="w-full bg-surface border border-borderSubtle px-4 py-3 rounded-xl text-white placeholder:text-textTertiary focus:border-white/20 focus:outline-none transition-all text-[13px]" />
                        <input type="email" placeholder="Work Email" className="w-full bg-surface border border-borderSubtle px-4 py-3 rounded-xl text-white placeholder:text-textTertiary focus:border-white/20 focus:outline-none transition-all text-[13px]" />
                    </div>
                    <button 
                        onClick={handleStartChat}
                        className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg mt-4 text-[14px]"
                    >
                        Start Conversation <ArrowRight size={16} />
                    </button>
                </div>
            )}

            {/* Step 2: Chat */}
            {step === 2 && (
                <div className="flex flex-col h-full">
                    <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-[#0E0F11]">
                         {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                                <div className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-[#2A2B2E] text-white rounded-2xl rounded-tr-sm border border-white/10' 
                                : 'bg-surface text-textMain rounded-2xl rounded-tl-sm border border-borderSubtle'
                                }`}>
                                {msg.text}
                                </div>
                            </div>
                        ))}
                         {isTyping && (
                            <div className="flex justify-start animate-in fade-in duration-300">
                                <div className="bg-surface px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center border border-borderSubtle">
                                <div className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce" style={{animationDelay: '0ms'}}/>
                                <div className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce" style={{animationDelay: '150ms'}}/>
                                <div className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce" style={{animationDelay: '300ms'}}/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-[#141517] border-t border-white/5">
                        <div className="flex gap-2">
                            <input 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                type="text" 
                                placeholder="Type your answer..." 
                                autoFocus
                                className="flex-1 bg-surface border border-borderSubtle rounded-xl px-4 py-3 text-[13px] text-white focus:outline-none focus:border-white/20 transition-colors"
                            />
                            <button onClick={handleSendMessage} className="w-11 h-11 bg-white text-black rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors shadow-md">
                                <Send size={16} strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-500">
                     <div className="w-16 h-16 bg-surfaceHighlight rounded-full flex items-center justify-center mb-6 border border-borderHighlight shadow-glow-pill">
                        <Sparkles size={24} className="text-white" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">You're all set!</h3>
                    <p className="text-[13px] text-textSecondary max-w-[240px] leading-relaxed">
                        Thanks for chatting. One of our experts will review your info and reach out shortly.
                    </p>
                    <button onClick={onClose} className="mt-8 text-[11px] uppercase tracking-wider text-textTertiary hover:text-white transition-colors">
                        Close window
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};