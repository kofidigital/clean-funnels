
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from '../components/UIComponents';
import { 
  CornerDownLeft, RefreshCcw, GitBranch, ArrowRight, Sparkles, Check, 
  Calendar, Send, User, Mail, ChevronRight, Settings2, 
  Target, Zap, Users as UsersIcon, Globe, CheckSquare, Square, X
} from 'lucide-react';
import { Page } from '../types';

interface IntakeContext {
  landingPage: string;
  offerPromise: string;
  persona: string;
  personaCustom: string;
  intentLevel: number; // 1=Low, 2=Med, 3=High
  features: string[];
}

const DEFAULT_CONTEXT: IntakeContext = {
  landingPage: '',
  offerPromise: '',
  persona: '',
  personaCustom: '',
  intentLevel: 2,
  features: ['tailored_questions']
};

export const CreateFormPage: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
  const [mode, setMode] = useState<'canvas' | 'workspace'>('canvas');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Context-Aware Intake State
  const [contextData, setContextData] = useState<IntakeContext>(DEFAULT_CONTEXT);
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  
  // URL Import State
  const [importUrl, setImportUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Nudge Modal State
  const [showNudge, setShowNudge] = useState(false);
  const [dismissedNudge, setDismissedNudge] = useState(false);
  
  // Temporary state for the modal form (to allow cancel/save pattern)
  const [tempContext, setTempContext] = useState<IntakeContext>(DEFAULT_CONTEXT);

  // Workspace State
  const [steps, setSteps] = useState([
    { title: "Lead Capture", type: "Static", content: "Name + Email Capture" },
    { title: "Budget Qual", type: "Question", content: "What is your monthly budget for this project?" },
    { title: "Company Size", type: "Question", content: "How many people are on your team?" },
    { title: "Timeline", type: "Question", content: "How soon are you looking to start?" },
    { title: "Outcome", type: "End", content: "Calendar Booking" },
  ]);
  
  // Simulation State
  const [simStep, setSimStep] = useState(0); 
  const [messages, setMessages] = useState<Array<{role: 'ai'|'user', text: string}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [staticForm, setStaticForm] = useState({ name: '', email: '' });
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const TEMPLATE_CHIPS = [
    "SaaS Demo", 
    "Webinar", 
    "Strategy Call", 
    "Waitlist", 
    "Discovery Call", 
    "Event Signup"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const openContextModal = () => {
    setTempContext({ ...contextData });
    setImportUrl('');
    setIsContextModalOpen(true);
  };

  const saveContext = () => {
    setContextData({ ...tempContext });
    setIsContextModalOpen(false);
  };

  const handleAnalyzePage = () => {
    if (!importUrl) return;
    setIsAnalyzing(true);
    
    // Simulate API Analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Smart matching logic for demo purposes
      let detectedPage = tempContext.landingPage;
      if (importUrl.includes('pricing')) detectedPage = '/pricing';
      else if (importUrl.includes('demo')) detectedPage = '/book-demo';
      else if (importUrl.includes('webinar')) detectedPage = '/webinar';
      else detectedPage = '/landing-a'; // Fallback for demo

      setTempContext({
        ...tempContext,
        landingPage: detectedPage,
        offerPromise: 'Save 20+ hours per week on lead qualification.',
        persona: 'Founders',
        intentLevel: 3, // High intent inferred
        features: ['tailored_questions', 'priority_scoring', 'inferred_pain_points']
      });
    }, 1500);
  };

  // Wrapper that decides whether to show nudge or generate
  const handleGenerate = (selectedPrompt?: string) => {
    const finalPrompt = selectedPrompt || prompt;
    if (!finalPrompt) return;

    // Check if context is set (checking landingPage as a proxy for "any context set")
    const hasContext = !!contextData.landingPage;

    if (!hasContext && !dismissedNudge) {
      setPrompt(finalPrompt); // Sync UI so user sees their selection
      setShowNudge(true);
      return;
    }

    executeGeneration(finalPrompt);
  };

  const executeGeneration = (selectedPrompt?: string) => {
    const finalPrompt = selectedPrompt || prompt;
    if (!finalPrompt) return;
    
    // ---------------------------------------------------------
    // PAYLOAD SIMULATION
    // ---------------------------------------------------------
    console.log("Generating Flow with Payload:", {
        flow_prompt: finalPrompt,
        context: {
            landing_page: contextData.landingPage,
            offer_promise: contextData.offerPromise,
            persona: contextData.persona === 'Custom' ? contextData.personaCustom : contextData.persona,
            intent_level: contextData.intentLevel === 1 ? 'Low' : contextData.intentLevel === 2 ? 'Medium' : 'High',
            features: contextData.features
        }
    });
    // ---------------------------------------------------------

    setPrompt(finalPrompt);
    setIsGenerating(true);

    setTimeout(() => {
        setSteps([
            { title: "Lead Capture", type: "Static", content: "Name + Email Capture" },
            { title: "Qualification", type: "Question", content: "What specific problem are you trying to solve?" },
            { title: "Volume", type: "Question", content: "What is your current monthly volume?" },
            { title: "Budget", type: "Question", content: "What is your estimated budget?" },
            { title: "Outcome", type: "End", content: "Calendar Booking" },
        ]);
        setIsGenerating(false);
        setMode('workspace');
        resetSimulation();
    }, 2500);
  };

  const resetSimulation = () => {
    setSimStep(0);
    setMessages([]);
    setStaticForm({ name: '', email: '' });
    setChatInput('');
    setIsTyping(false);
  };

  const handleStaticSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staticForm.name || !staticForm.email) return; 
    setSimStep(1);
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        setMessages([{ role: 'ai', text: "Before I book you in, I just need to ask a few quick questions to make sure we’re a good fit." }]);
        setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                if (steps[1]) {
                    setMessages(prev => [...prev, { role: 'ai', text: steps[1].content }]);
                }
            }, 1200);
        }, 800);
    }, 600);
  };

  const handleChatSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    
    const userText = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    
    const nextStepIdx = simStep + 1;
    
    if (nextStepIdx >= steps.length - 1) {
         setIsTyping(true);
         setTimeout(() => {
             setIsTyping(false);
             setSimStep(nextStepIdx); 
         }, 1500);
    } else {
         setSimStep(nextStepIdx);
         setIsTyping(true);
         setTimeout(() => {
             setIsTyping(false);
             setMessages(prev => [...prev, { role: 'ai', text: steps[nextStepIdx].content }]);
         }, 1200);
    }
  };

  const toggleFeature = (featureId: string) => {
    if (tempContext.features.includes(featureId)) {
        setTempContext({ ...tempContext, features: tempContext.features.filter(f => f !== featureId) });
    } else {
        setTempContext({ ...tempContext, features: [...tempContext.features, featureId] });
    }
  };

  // 1. Loading State
  if (isGenerating) {
      return (
          <div className="h-full flex flex-col items-center justify-center p-8 animate-fade-in relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/[0.03] to-transparent" />
              <div className="flex flex-col items-center gap-6 z-10">
                  <div className="relative">
                      <div className="w-16 h-16 rounded-full border border-amber-500/20 flex items-center justify-center bg-surface relative">
                          <Sparkles size={24} className="text-amber-400 animate-pulse" />
                      </div>
                      <div className="absolute inset-0 rounded-full border-t border-amber-500/50 animate-spin" />
                  </div>
                  <div className="text-center space-y-2">
                      <h2 className="text-xl font-medium text-textMain">Generating your intake flow...</h2>
                      <div className="flex flex-col gap-1 text-[12px] text-textTertiary h-[40px] overflow-hidden">
                          <span className="animate-slide-up" style={{animationDelay: '0s'}}>Analyzing context data...</span>
                          <span className="animate-slide-up" style={{animationDelay: '0.8s'}}>Drafting conversational logic...</span>
                          <span className="animate-slide-up" style={{animationDelay: '1.6s'}}>Optimizing conversion paths...</span>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  // 2. Canvas Mode (Creation Interface)
  if (mode === 'canvas') {
    return (
      <div className="h-full flex flex-col animate-fade-in relative">
        
        {/* CONTEXT BAR (Always Visible at Top) */}
        <div className="absolute top-0 left-0 right-0 h-16 px-8 flex items-center justify-between z-50 pointer-events-none">
           <div className="flex items-center gap-3 bg-surface/40 backdrop-blur-md border border-white/5 pr-4 pl-3 py-1.5 rounded-full transition-all hover:bg-surface/60 hover:border-white/10 pointer-events-auto shadow-glass">
              <div className="w-6 h-6 rounded-full bg-panel flex items-center justify-center border border-borderSubtle text-textTertiary">
                 <Settings2 size={12} />
              </div>
              <div className="flex flex-col">
                  <span className="text-[10px] text-textTertiary uppercase tracking-wider font-medium leading-tight">Intake Context</span>
                  <span className="text-[12px] text-textMain font-medium leading-tight truncate max-w-[150px]">
                      {contextData.landingPage ? `${contextData.landingPage}` : 'None selected'}
                  </span>
              </div>
              <div className="h-4 w-[1px] bg-borderSubtle mx-1" />
              <button 
                onClick={openContextModal}
                className="text-[11px] text-textSecondary hover:text-textMain font-medium transition-colors"
              >
                 {contextData.landingPage ? 'Edit Context' : 'Set Context'}
              </button>
           </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/[0.02] blur-[100px] rounded-full pointer-events-none" />
            <div className="w-full max-w-[580px] flex flex-col items-center z-10 -mt-8 transition-all duration-500">
            <div className="text-center space-y-3 mb-8">
                <h1 className="text-3xl md:text-4xl font-medium text-textMain tracking-tight">What do you want to build?</h1>
                <p className="text-textSecondary text-[14px] font-light max-w-md mx-auto leading-relaxed opacity-90">
                Create fully functional intake flows from a single prompt. <br className="hidden md:block"/>
                AI handles the logic — you handle the growth.
                </p>
            </div>
            <div className="w-full relative group mb-6">
                <div className="absolute -inset-px bg-gradient-to-b from-[#FF8C3C]/20 to-transparent rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000" />
                <div className="relative bg-[#0A0A0A] border border-borderSubtle rounded-2xl shadow-[0_0_20px_-5px_rgba(255,140,60,0.05)] group-hover:shadow-[0_0_30px_-5px_rgba(255,140,60,0.1)] transition-all duration-300 focus-within:border-[#FF8C3C]/30 focus-within:shadow-[0_0_40px_-10px_rgba(255,140,60,0.15)] overflow-hidden">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to build..."
                    className="w-full bg-transparent p-5 pb-16 text-[15px] text-textMain placeholder:text-textTertiary/50 focus:outline-none resize-none min-h-[120px] font-light leading-relaxed custom-scrollbar"
                    onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
                />
                <div className="absolute bottom-3 right-3">
                    <Button 
                    size="md" 
                    onClick={() => handleGenerate()}
                    disabled={!prompt}
                    className={`px-4 py-1.5 h-8 rounded-full transition-all duration-300 flex items-center gap-2 text-[12px] ${
                        prompt 
                        ? 'bg-textMain text-page hover:bg-white shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]' 
                        : 'bg-surface text-textTertiary cursor-not-allowed'
                    }`}
                    >
                    Generate Flow <ArrowRight size={12} />
                    </Button>
                </div>
                </div>
            </div>
            <div className="w-full overflow-x-auto pb-4 no-scrollbar flex justify-center">
                <div className="flex justify-center gap-2.5 min-w-max px-4">
                    {TEMPLATE_CHIPS.map((label) => (
                        <button
                            key={label}
                            onClick={() => handleGenerate(`Create a ${label} flow.`)}
                            className="px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer bg-[#0D0D0D] text-[#FF9F40] border border-[#FF9F40]/20 shadow-[inset_0_0_10px_-4px_rgba(255,159,64,0.05)] hover:bg-[#FF9F40]/10 hover:border-[#FF9F40]/40 hover:text-[#FFB56B] hover:shadow-[0_0_15px_-3px_rgba(255,159,64,0.15)] backdrop-blur-sm tracking-wide whitespace-nowrap"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            </div>
        </div>

        {/* CONTEXT NUDGE MODAL */}
        {showNudge && (
            <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-[2px] flex items-center justify-center animate-fade-in p-4">
                <div className="w-full max-w-[340px] bg-[#0A0A0A] border border-borderSubtle rounded-xl shadow-modal p-6 flex flex-col items-center text-center animate-slide-up relative overflow-hidden">
                    
                    {/* Glossy gradient background effect */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <div className="w-10 h-10 rounded-full bg-surfaceHighlight border border-borderHighlight flex items-center justify-center mb-4 shadow-inner">
                        <Sparkles size={16} className="text-textSecondary" />
                    </div>
                    
                    <h3 className="text-[14px] font-medium text-textMain mb-2">Add context for better accuracy?</h3>
                    <p className="text-[12px] text-textSecondary leading-relaxed mb-6 font-light">
                        CleanFunnels can tailor your questions and qualification based on where this form will live.
                    </p>
                    
                    <div className="flex flex-col gap-3 w-full">
                        <Button 
                            variant="primary" 
                            size="md"
                            className="w-full justify-center"
                            onClick={() => {
                                setShowNudge(false);
                                openContextModal();
                            }}
                        >
                            Add Context
                        </Button>
                        <button 
                            onClick={() => {
                                setShowNudge(false);
                                setDismissedNudge(true);
                                executeGeneration(prompt);
                            }}
                            className="text-[11px] text-textTertiary hover:text-textSecondary transition-colors flex items-center justify-center gap-1 group"
                        >
                            Skip <span className="group-hover:translate-x-0.5 transition-transform">→</span> Generate Anyway
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* CONTEXT MODAL */}
        {isContextModalOpen && (
            <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4">
                <div className="w-full max-w-[520px] bg-[#0A0A0A] border border-borderSubtle rounded-xl shadow-modal overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
                    
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-borderSubtle bg-page flex justify-between items-start">
                        <div>
                            <h2 className="text-[16px] font-medium text-textMain tracking-tight">Context-Aware Intake</h2>
                            <p className="text-[12px] text-textSecondary mt-1">Teach CleanFunnels about your offer to generate better questions.</p>
                        </div>
                        <button onClick={() => setIsContextModalOpen(false)} className="text-textTertiary hover:text-textMain transition-colors">
                            <X size={16} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        
                        {/* SECTION 1: URL IMPORT */}
                        <div className="p-6 bg-surfaceHighlight/5 border-b border-borderSubtle space-y-3">
                            <label className="text-[12px] font-medium text-textMain flex items-center gap-2">
                                Import context from URL <span className="text-textTertiary font-normal">(recommended)</span>
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute left-3 top-2.5 text-textTertiary pointer-events-none">
                                        <Globe size={14} />
                                    </div>
                                    <Input 
                                        placeholder="https://yourpage.com" 
                                        value={importUrl}
                                        onChange={(e) => setImportUrl(e.target.value)}
                                        className="pl-9 h-9"
                                    />
                                </div>
                                <Button 
                                    variant="secondary" 
                                    onClick={handleAnalyzePage} 
                                    disabled={isAnalyzing || !importUrl}
                                    icon={isAnalyzing ? <RefreshCcw className="animate-spin" size={14}/> : <Sparkles size={14}/>}
                                    className="h-9 px-4"
                                >
                                    {isAnalyzing ? 'Analyzing...' : 'Analyze Page'}
                                </Button>
                            </div>
                            <p className="text-[11px] text-textTertiary">Clean Funnels will scan your page and populate the fields below automatically.</p>
                        </div>

                        {/* SEPARATOR */}
                        <div className="relative py-2 flex items-center justify-center bg-page">
                            <div className="absolute inset-0 flex items-center px-6"><div className="w-full border-t border-borderSubtle"></div></div>
                            <span className="relative bg-[#0A0A0A] px-3 text-[10px] text-textTertiary uppercase tracking-wide font-medium">Or fill in manually</span>
                        </div>

                        {/* SECTION 2: MANUAL FIELDS */}
                        <div className="p-6 space-y-6">
                            {/* A. Landing Page */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-medium text-textMain flex items-center gap-2">
                                    <Globe size={12} className="text-textTertiary" /> Landing Page / Location
                                </label>
                                <p className="text-[10px] text-textTertiary">Which page or funnel step is this intake attached to?</p>
                                <div className="relative">
                                    <select 
                                        value={tempContext.landingPage}
                                        onChange={(e) => setTempContext({...tempContext, landingPage: e.target.value})}
                                        className="w-full bg-surface border border-borderSubtle rounded-lg px-3 py-2.5 text-[13px] text-textMain focus:outline-none focus:border-borderHighlight appearance-none transition-colors"
                                    >
                                        <option value="" disabled>Select a page...</option>
                                        <option value="/pricing">/pricing</option>
                                        <option value="/book-demo">/book-demo</option>
                                        <option value="/webinar">/webinar-registration</option>
                                        <option value="/landing-a">/landing-page-a</option>
                                    </select>
                                    <div className="absolute right-3 top-3 pointer-events-none text-textTertiary">
                                        <ChevronRight size={14} className="rotate-90" />
                                    </div>
                                </div>
                            </div>

                            {/* B. Offer Promise */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-medium text-textMain flex items-center gap-2">
                                    <Sparkles size={12} className="text-textTertiary" /> Offer Promise
                                </label>
                                <Input 
                                    type="text"
                                    value={tempContext.offerPromise}
                                    onChange={(e) => setTempContext({...tempContext, offerPromise: e.target.value})}
                                    placeholder="What is this page promising? (e.g., Save 20 hours/week)"
                                    className="bg-surface"
                                />
                            </div>

                            {/* C. Audience Persona */}
                            <div className="space-y-3">
                                <div>
                                    <label className="text-[11px] font-medium text-textMain flex items-center gap-2">
                                        <UsersIcon size={12} className="text-textTertiary" /> Audience Persona
                                    </label>
                                    <p className="text-[10px] text-textTertiary mt-0.5">Who is this page designed for?</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Founders', 'Marketers', 'Agencies', 'Custom'].map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setTempContext({...tempContext, persona: p})}
                                            className={`px-3 py-2 rounded-lg border text-[12px] font-medium transition-all text-left ${
                                                tempContext.persona === p 
                                                ? 'bg-textMain text-page border-textMain' 
                                                : 'bg-surface border-borderSubtle text-textSecondary hover:border-textSecondary'
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                                {tempContext.persona === 'Custom' && (
                                    <input 
                                        type="text"
                                        value={tempContext.personaCustom}
                                        onChange={(e) => setTempContext({...tempContext, personaCustom: e.target.value})}
                                        placeholder="Describe your audience..."
                                        className="w-full bg-surface border border-borderSubtle rounded-lg px-3 py-2 text-[12px] text-textMain focus:outline-none focus:border-borderHighlight animate-slide-up"
                                        autoFocus
                                    />
                                )}
                            </div>

                            {/* D. Intent Level */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <label className="text-[11px] font-medium text-textMain flex items-center gap-2">
                                            <Target size={12} className="text-textTertiary" /> Intent Level
                                        </label>
                                        <p className="text-[10px] text-textTertiary mt-0.5">How intent-heavy is this page?</p>
                                    </div>
                                    <span className="text-[10px] text-textSecondary bg-surface border border-borderSubtle px-2 py-0.5 rounded">
                                        {tempContext.intentLevel === 1 ? 'Low' : tempContext.intentLevel === 2 ? 'Medium' : 'High'}
                                    </span>
                                </div>
                                <div className="relative h-6 flex items-center mt-2">
                                    <div className="absolute inset-x-0 h-1 bg-surface border border-borderSubtle rounded-full"></div>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="3" 
                                        step="1"
                                        value={tempContext.intentLevel}
                                        onChange={(e) => setTempContext({...tempContext, intentLevel: parseInt(e.target.value)})}
                                        className="w-full relative z-10 opacity-0 cursor-pointer"
                                    />
                                    <div 
                                        className="absolute h-4 w-4 bg-textMain rounded-full border-2 border-page shadow-sm transition-all pointer-events-none"
                                        style={{ left: `${(tempContext.intentLevel - 1) * 50}%`, transform: 'translateX(-50%)' }}
                                    />
                                    <div className="absolute inset-0 flex justify-between pointer-events-none px-0.5">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className={`w-1 h-1 rounded-full mt-1.5 ${i <= tempContext.intentLevel ? 'bg-textMain' : 'bg-borderSubtle'}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px] text-textTertiary">
                                    <span>Curiosity</span>
                                    <span>Considering</span>
                                    <span>Ready to Buy</span>
                                </div>
                            </div>

                            {/* E. AI Behavior */}
                            <div className="space-y-4 pt-2">
                                <label className="text-[11px] font-medium text-textMain flex items-center gap-2">
                                    <Zap size={12} className="text-textTertiary" /> AI Behavior
                                </label>
                                <div className="space-y-3">
                                    {[
                                        { id: 'tailored_questions', label: 'Tailored Questions', desc: 'Tune tone and questions to the selected persona.' },
                                        { id: 'inferred_pain_points', label: 'Infer Pain Points', desc: 'Guess likely frustrations based on persona and promise.' },
                                        { id: 'priority_scoring', label: 'Priority Scoring', desc: 'Boost higher-intent responses for sales visibility.' },
                                        { id: 'personalized_success', label: 'Personalized Success', desc: 'Auto-generate a custom final message.' },
                                    ].map((feature) => {
                                        const isSelected = tempContext.features.includes(feature.id);
                                        return (
                                            <div 
                                                key={feature.id}
                                                onClick={() => toggleFeature(feature.id)}
                                                className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-lg hover:bg-surfaceHighlight/30 cursor-pointer transition-colors group"
                                            >
                                                <div className={`mt-0.5 transition-colors ${isSelected ? 'text-textMain' : 'text-textTertiary group-hover:text-textSecondary'}`}>
                                                    {isSelected ? <CheckSquare size={14} /> : <Square size={14} />}
                                                </div>
                                                <div>
                                                    <div className={`text-[12px] font-medium transition-colors ${isSelected ? 'text-textMain' : 'text-textSecondary'}`}>{feature.label}</div>
                                                    <div className="text-[10px] text-textTertiary mt-0.5">{feature.desc}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-borderSubtle bg-surface/30 flex justify-end items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={() => setIsContextModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" size="sm" onClick={saveContext} className="px-6">Save Context</Button>
                    </div>

                </div>
            </div>
        )}

      </div>
    );
  }

  // 3. Workspace Mode (Editor)
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <header className="h-14 border-b border-borderSubtle flex items-center justify-between px-6 bg-page shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setMode('canvas')} className="px-0 w-8 h-8 text-textTertiary hover:text-textMain">
             <CornerDownLeft size={16} />
          </Button>
          <div className="h-4 w-[1px] bg-borderSubtle" />
          <span className="text-[13px] font-medium text-textMain">Generated Flow</span>
          <div className="flex items-center gap-1.5 text-[11px] text-textTertiary bg-panel px-2 py-0.5 rounded border border-borderSubtle">
            <GitBranch size={10} />
            <span>Draft</span>
          </div>
          {contextData.landingPage && (
            <div className="flex items-center gap-1.5 text-[11px] text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10 ml-2">
                <Settings2 size={10} />
                <span>Context: {contextData.landingPage}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={resetSimulation} icon={<RefreshCcw size={12} />} className="h-8">
             Reset Preview
          </Button>
          <Button size="sm" variant="primary" onClick={() => setPage(Page.PUBLISH)} className="h-8 bg-textMain text-page hover:bg-white shadow-glow">
             Publish Flow
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Logic & Modification */}
        <div className="w-[320px] border-r border-borderSubtle bg-page flex flex-col shrink-0 z-10">
          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                 <h3 className="text-[11px] uppercase tracking-wider font-medium text-textTertiary">Flow Steps</h3>
              </div>
              <div className="space-y-2">
                {steps.map((step, i) => {
                  const isActive = (i === 0 && simStep === 0) || (i > 0 && i <= simStep && simStep < steps.length - 1) || (i === steps.length - 1 && simStep === steps.length - 1);
                  const isPast = i < simStep;
                  
                  return (
                    <div 
                        key={i} 
                        className={`
                            group relative flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer
                            ${isActive 
                                ? 'bg-surfaceHighlight border-borderHighlight shadow-sm' 
                                : 'bg-surface/30 border-borderSubtle hover:bg-surface hover:border-borderHighlight'}
                        `}
                        onClick={() => {
                            // Optional: Click to jump simulation (simplified for demo)
                            if (i === 0) resetSimulation();
                        }}
                    >
                        {/* Connector Line */}
                        {i !== steps.length - 1 && (
                            <div className={`absolute left-[19px] top-8 bottom-[-10px] w-[1px] transition-colors ${isPast ? 'bg-emerald-500/30' : 'bg-borderSubtle group-hover:bg-borderHighlight/50'}`} />
                        )}
                        
                        <div className={`
                            w-5 h-5 rounded flex items-center justify-center text-[9px] font-mono border shrink-0 z-10 transition-colors
                            ${isActive ? 'bg-textMain text-page border-textMain' : isPast ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-panel text-textSecondary border-borderSubtle'}
                        `}>
                        {isPast ? <Check size={10} /> : i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                            <span className={`text-[12px] font-medium truncate ${isActive ? 'text-textMain' : 'text-textSecondary'}`}>{step.title}</span>
                            <span className="text-[9px] text-textTertiary bg-panel px-1.5 rounded border border-borderSubtle uppercase tracking-tight">{step.type}</span>
                        </div>
                        <div className="text-[11px] text-textTertiary truncate font-light">{step.content}</div>
                        </div>
                    </div>
                  );
                })}
                
                <Button variant="ghost" size="sm" className="w-full border border-dashed border-borderSubtle text-textTertiary h-9 text-[11px] hover:border-textTertiary hover:text-textSecondary hover:bg-transparent mt-2">
                  + Add Step
                </Button>
              </div>
            </div>

            <div className="pt-5 border-t border-borderSubtle">
              <h3 className="text-[11px] uppercase tracking-wider font-medium text-textTertiary mb-3">AI Copilot</h3>
              <div className="relative group">
                <textarea 
                  placeholder="Ask to change logic, questions, or style..."
                  className="w-full bg-panel border border-borderSubtle rounded-lg p-3 text-[12px] min-h-[100px] focus:outline-none focus:border-borderHighlight transition-colors resize-none placeholder:text-textTertiary text-textMain shadow-inner"
                />
                <div className="absolute bottom-2 right-2 opacity-50 group-focus-within:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-textMain rounded-md text-page hover:bg-white transition-colors shadow-lg">
                    <CornerDownLeft size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 bg-[#050505] relative flex items-center justify-center p-8 overflow-hidden">
          {/* Dot Pattern Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
          
          {/* Desktop Modal Container */}
          <div className="w-full max-w-[480px] bg-[#0A0A0A] border border-white/10 rounded-xl shadow-[0_0_0_1px_rgba(0,0,0,1),0_20px_80px_-20px_rgba(0,0,0,0.7)] relative flex flex-col overflow-hidden min-h-[600px] transition-all duration-500">
            
            {/* Modal Header */}
            <div className="h-14 border-b border-borderSubtle flex items-center justify-between px-6 bg-[#0A0A0A]/80 backdrop-blur-md z-20 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center shadow-glow">
                        <div className="w-2.5 h-2.5 bg-black rounded-[2px]" />
                    </div>
                    <span className="text-[13px] font-medium text-textMain tracking-tight">CleanForm</span>
                </div>
                <div className="text-[11px] text-textTertiary">
                    {simStep === 0 ? 'Step 1 of ' + steps.length : `Step ${simStep + 1} of ${steps.length}`}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden flex flex-col bg-[#0A0A0A]">
                
                {/* STEP 1: STATIC FORM */}
                <div className={`absolute inset-0 p-8 flex flex-col transition-all duration-500 ease-in-out ${simStep === 0 ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 -translate-y-10 z-0 pointer-events-none'}`}>
                    <div className="my-auto space-y-8">
                        <div className="space-y-2 text-center">
                            <h2 className="text-2xl font-medium text-textMain tracking-tight">Let's get started.</h2>
                            <p className="text-[14px] text-textSecondary font-light">Enter your details to check eligibility.</p>
                        </div>
                        
                        <form onSubmit={handleStaticSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-medium text-textTertiary uppercase tracking-wider pl-1">Full Name</label>
                                <div className="relative group">
                                    <input 
                                        type="text" 
                                        value={staticForm.name}
                                        onChange={e => setStaticForm({...staticForm, name: e.target.value})}
                                        className="w-full bg-surface border border-borderSubtle rounded-lg px-4 py-3 pl-10 text-[13px] text-textMain focus:outline-none focus:border-textSecondary transition-colors placeholder:text-textTertiary"
                                        placeholder="John Doe"
                                        autoFocus={simStep === 0}
                                    />
                                    <User size={16} className="absolute left-3 top-3 text-textTertiary group-focus-within:text-textSecondary transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-medium text-textTertiary uppercase tracking-wider pl-1">Work Email</label>
                                <div className="relative group">
                                    <input 
                                        type="email" 
                                        value={staticForm.email}
                                        onChange={e => setStaticForm({...staticForm, email: e.target.value})}
                                        className="w-full bg-surface border border-borderSubtle rounded-lg px-4 py-3 pl-10 text-[13px] text-textMain focus:outline-none focus:border-textSecondary transition-colors placeholder:text-textTertiary"
                                        placeholder="name@company.com"
                                    />
                                    <Mail size={16} className="absolute left-3 top-3 text-textTertiary group-focus-within:text-textSecondary transition-colors" />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={!staticForm.name || !staticForm.email}
                                className="w-full bg-textMain text-page font-medium py-3 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 shadow-glow disabled:opacity-50 disabled:shadow-none mt-4"
                            >
                                Continue <ArrowRight size={14} />
                            </button>
                        </form>
                    </div>
                    
                    <div className="mt-auto pt-6 text-center">
                        <p className="text-[10px] text-textTertiary">Powered by CleanFunnels</p>
                    </div>
                </div>

                {/* STEPS 2+: CHAT INTERFACE */}
                <div className={`absolute inset-0 flex flex-col transition-all duration-500 ease-in-out ${simStep > 0 && simStep < steps.length - 1 ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-10 z-0 pointer-events-none'}`}>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                                {msg.role === 'ai' && (
                                    <div className="w-6 h-6 rounded-full bg-surfaceHighlight border border-borderHighlight flex items-center justify-center text-[10px] font-bold text-textMain mr-2 shrink-0 mt-1 shadow-sm">
                                        AI
                                    </div>
                                )}
                                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                                    msg.role === 'user' 
                                    ? 'bg-[#EDEDED] text-black font-medium rounded-tr-sm' 
                                    : 'bg-surface border border-borderSubtle text-textMain rounded-tl-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="w-6 h-6 rounded-full bg-surfaceHighlight border border-borderHighlight flex items-center justify-center text-[10px] font-bold text-textMain mr-2 shrink-0 mt-1">AI</div>
                                <div className="bg-surface border border-borderSubtle px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center h-[44px]">
                                    <div className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                                    <div className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                                    <div className="w-1.5 h-1.5 bg-textSecondary rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-5 border-t border-borderSubtle bg-[#0A0A0A]">
                        <form onSubmit={handleChatSubmit} className="relative">
                            <input 
                                type="text" 
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Type your answer..."
                                className="w-full bg-surface border border-borderSubtle rounded-xl pl-4 pr-12 py-3.5 text-[13px] text-textMain placeholder:text-textTertiary focus:outline-none focus:border-textSecondary transition-colors shadow-inner"
                                autoFocus={simStep > 0}
                            />
                            <button 
                                type="submit"
                                disabled={!chatInput.trim()}
                                className="absolute right-2 top-2 p-1.5 rounded-lg bg-textMain text-page hover:bg-white transition-colors disabled:opacity-50 disabled:bg-surface disabled:text-textTertiary"
                            >
                                <Send size={14} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* OUTCOME: CALENDAR OR MESSAGE */}
                <div className={`absolute inset-0 p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out ${simStep === steps.length - 1 ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-10 z-0 pointer-events-none'}`}>
                     {/* Success Animation */}
                     <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)] animate-in zoom-in duration-500">
                        <Calendar size={28} className="text-emerald-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-medium text-textMain mb-2">You qualify! Let's book a time.</h3>
                    <p className="text-[13px] text-textSecondary max-w-[280px] leading-relaxed mb-8">
                        Based on your answers, we'd love to chat. Please select a time that works for you.
                    </p>
                    
                    {/* Mock Calendar Grid */}
                    <div className="w-full max-w-[320px] bg-surface border border-borderSubtle rounded-lg p-4 space-y-3">
                        <div className="flex justify-between text-[11px] text-textTertiary font-medium uppercase tracking-wider border-b border-borderSubtle pb-2">
                            <span>Today</span>
                            <span>Tomorrow</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <button className="py-2 rounded bg-surfaceHighlight border border-borderHighlight text-[12px] text-textMain hover:border-emerald-500/50 hover:text-emerald-400 transition-colors">9:00 AM</button>
                             <button className="py-2 rounded bg-surface border border-borderSubtle text-[12px] text-textSecondary hover:border-borderHighlight hover:text-textMain transition-colors">10:30 AM</button>
                             <button className="py-2 rounded bg-surface border border-borderSubtle text-[12px] text-textSecondary hover:border-borderHighlight hover:text-textMain transition-colors">2:00 PM</button>
                             <button className="py-2 rounded bg-surface border border-borderSubtle text-[12px] text-textSecondary hover:border-borderHighlight hover:text-textMain transition-colors">3:45 PM</button>
                        </div>
                    </div>

                    <button onClick={resetSimulation} className="mt-8 text-[11px] text-textTertiary hover:text-textMain transition-colors flex items-center gap-1.5">
                        <RefreshCcw size={10} /> Start Over
                    </button>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
