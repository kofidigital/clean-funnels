
import React, { useState, useMemo } from 'react';
import { Page, Lead } from '../types';
import { Badge, Button, Separator, Input } from '../components/UIComponents';
import { NurtureModal } from '../components/NurtureModal';
import { ManualLinkModal } from '../components/ManualLinkModal';
import { QualifiedBookingModal } from '../components/QualifiedBookingModal';
import { 
  ChevronRight, Download, SlidersHorizontal, ChevronLeft, 
  Sparkles, Link2, GitBranch, Target, Globe,
  Smartphone, Clock, Fingerprint, MapPin, Mail, MessageSquare,
  AlertCircle, Check, X, UserMinus, FileText,
  Calendar, Archive, ArrowRight, MoreHorizontal, AlertTriangle,
  Video, CheckCircle2, ShieldCheck, Zap, ChevronDown,
  Search, Filter, Star, Ban, UserCheck, ExternalLink
} from 'lucide-react';

// ----------------------------------------------------------------------
// ENRICHED DEMO DATA
// ----------------------------------------------------------------------

const DEMO_LEADS = [
  { 
    id: '1', 
    name: 'Alice Freeman', 
    email: 'alice@agency.com', 
    company: 'Design Co',
    score: 92, 
    submittedAt: '2m ago', 
    status: 'qualified',
    source: 'Google / cpc',
    region: 'San Francisco, US',
    device: 'Desktop',
    formName: 'Agency Qual v2',
    budget: '$15k/mo',
    role: 'VP Sales',
    transcriptSnippet: "We need to automate our inbound lead qualification logic immediately...",
    signals: ["High Budget", "Decision Maker", "Urgent Need"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
  },
  { 
    id: '2', 
    name: 'Sarah Jones', 
    email: 's.jones@bigcorp.com', 
    company: 'BigCorp Global',
    score: 88, 
    submittedAt: '4h ago', 
    status: 'qualified',
    source: 'LinkedIn / organic',
    region: 'New York, US',
    device: 'Desktop',
    formName: 'Enterprise Demo',
    budget: '$25k/mo',
    role: 'Director',
    transcriptSnippet: "Looking for an enterprise solution for our sales team of 50+...",
    signals: ["Enterprise Size", "Budget Confirmed"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  { 
    id: '3', 
    name: 'Emma Wilson', 
    email: 'emma@design.studio', 
    company: 'Studio X',
    score: 95, 
    submittedAt: '2d ago', 
    status: 'qualified',
    source: 'Direct',
    region: 'London, UK',
    device: 'MacBook Pro',
    formName: 'Agency Qual v2',
    budget: '$10k+',
    role: 'Founder',
    transcriptSnippet: "I'm the founder of a design studio, we are scaling fast...",
    signals: ["Founder Authority", "Growth Phase"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
  },
  { 
    id: '4', 
    name: 'Mark Chen', 
    email: 'mark@startup.io', 
    company: 'Startup.io',
    score: 32, 
    submittedAt: '1h ago', 
    status: 'unqualified',
    source: 'Direct',
    region: 'Austin, TX',
    device: 'Mobile',
    formName: 'Agency Qual v2',
    budget: '<$500',
    role: 'Associate',
    transcriptSnippet: "Just looking around, not sure if we have budget yet...",
    signals: ["Low Budget"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark"
  },
  { 
    id: '5', 
    name: 'David Miller', 
    email: 'dave@gmail.com', 
    company: 'Personal',
    score: 12, 
    submittedAt: '1d ago', 
    status: 'unqualified',
    source: 'Facebook / ads',
    region: 'Toronto, CA',
    device: 'Mobile',
    formName: 'Webinar Sign',
    budget: 'Unknown',
    role: 'Student',
    transcriptSnippet: "Is this a free tool? I am a student.",
    signals: ["Non-Commercial"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  }
];

// ----------------------------------------------------------------------
// MAIN LEADS LIST PAGE
// ----------------------------------------------------------------------

export const LeadsPage: React.FC<{ setPage: (p: Page) => void; onSelectLead: (id: string) => void }> = ({ setPage, onSelectLead }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'qualified' | 'unqualified'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = useMemo(() => {
    let filtered = DEMO_LEADS;
    
    // Tab Filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(l => l.status === activeTab);
    }

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(l => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q));
    }

    return filtered;
  }, [activeTab, searchQuery]);

  const handleRowClick = (leadId: string) => {
    onSelectLead(leadId);
    setPage(Page.LEAD_PROFILE);
  };

  return (
    <div className="h-full flex flex-col bg-page animate-fade-in">
      
      {/* HEADER */}
      <header className="h-14 px-8 border-b border-borderSubtle flex justify-between items-center shrink-0 bg-page/80 backdrop-blur-sm sticky top-0 z-30">
         <div className="flex items-center gap-6">
            <h1 className="text-[14px] font-medium text-textMain">Inbound Leads</h1>
            <div className="h-4 w-[1px] bg-borderSubtle" />
            
            {/* Tabs */}
            <div className="flex gap-1 bg-surface border border-borderSubtle rounded-lg p-0.5">
               {['all', 'qualified', 'unqualified'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`
                      px-3 py-1 rounded-md text-[11px] font-medium transition-all capitalize
                      ${activeTab === tab ? 'bg-surfaceHighlight text-textMain shadow-sm' : 'text-textTertiary hover:text-textSecondary'}
                    `}
                  >
                    {tab}
                  </button>
               ))}
            </div>
         </div>

         <div className="flex gap-2">
            <div className="relative group">
               <Search size={13} className="absolute left-3 top-2 text-textTertiary" />
               <input 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search leads..." 
                 className="h-8 pl-8 pr-4 bg-surface border border-borderSubtle rounded-lg text-[12px] text-textMain placeholder:text-textTertiary focus:outline-none focus:border-borderHighlight w-[200px] transition-all"
               />
            </div>
            <Button size="sm" variant="outline" icon={<Filter size={12} />} />
            <Button size="sm" variant="outline" icon={<Download size={12} />} />
         </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 relative">
         <div className="max-w-[1200px] mx-auto">
            <div className="border border-borderSubtle rounded-xl overflow-visible bg-surface relative min-h-[600px]">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-borderSubtle bg-panel/50 text-[11px] text-textTertiary font-medium uppercase tracking-wider">
                        <th className="px-6 py-3 pl-8 w-[300px]">Contact</th>
                        <th className="px-6 py-3 w-[120px]">Score</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Source</th>
                        <th className="px-6 py-3 text-right">Time</th>
                        <th className="px-6 py-3 w-[160px]"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-borderSubtle/50">
                     {filteredLeads.map(lead => (
                        <tr 
                          key={lead.id} 
                          onClick={() => handleRowClick(lead.id)}
                          className="group hover:bg-surfaceHighlight/50 transition-colors cursor-pointer relative"
                        >
                           {/* Contact Column */}
                           <td className="px-6 py-3.5 pl-8">
                              <div className="flex items-center gap-3">
                                 {/* Status Dot */}
                                 <div className={`w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_-1px_currentColor] ${lead.status === 'qualified' ? 'text-emerald-500 bg-emerald-500' : 'text-red-500 bg-red-500'}`} />
                                 
                                 <div>
                                    <div className="text-[13px] font-medium text-textMain group-hover:text-white transition-colors">{lead.name}</div>
                                    <div className="text-[11px] text-textTertiary flex items-center gap-1.5">
                                       {lead.email}
                                    </div>
                                 </div>
                              </div>
                           </td>

                           {/* Score Column */}
                           <td className="px-6 py-3.5">
                              <div className={`
                                inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border
                                ${lead.score >= 80 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
                                  lead.score < 50 ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                                  'bg-amber-500/10 border-amber-500/20 text-amber-400'}
                              `}>
                                 {lead.score}
                              </div>
                           </td>

                           {/* Status Chip Column */}
                           <td className="px-6 py-3.5">
                              <Badge variant={lead.status === 'qualified' ? 'success' : 'outline'}>
                                 {lead.status === 'qualified' ? 'Qualified' : 'Unqualified'}
                              </Badge>
                           </td>

                           {/* Source Column */}
                           <td className="px-6 py-3.5">
                              <div className="text-[11px] text-textSecondary font-mono truncate max-w-[140px]">
                                 {lead.source}
                              </div>
                           </td>

                           {/* Time Column */}
                           <td className="px-6 py-3.5 text-right">
                              <div className="text-[11px] text-textTertiary font-mono">
                                 {lead.submittedAt}
                              </div>
                           </td>

                           {/* Inline Actions Column */}
                           <td className="px-6 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                 
                                 {/* Logic: 
                                     If Qualified -> Show Unqualify
                                     If Unqualified -> Show Qualify & Book Call 
                                 */}
                                 
                                 {lead.status === 'unqualified' ? (
                                     <>
                                        <button 
                                            title="Mark Qualified"
                                            onClick={(e) => e.stopPropagation()} 
                                            className="w-7 h-7 rounded flex items-center justify-center text-textTertiary hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                                        >
                                            <CheckCircle2 size={14} />
                                        </button>
                                        <button 
                                            title="Book Call (Manual)"
                                            onClick={(e) => e.stopPropagation()} 
                                            className="w-7 h-7 rounded flex items-center justify-center text-textTertiary hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                                        >
                                            <Calendar size={14} />
                                        </button>
                                     </>
                                 ) : (
                                    <button 
                                        title="Mark Unqualified"
                                        onClick={(e) => e.stopPropagation()} 
                                        className="w-7 h-7 rounded flex items-center justify-center text-textTertiary hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                    >
                                        <Ban size={14} />
                                    </button>
                                 )}

                                 <button 
                                    title="Open Lead"
                                    onClick={(e) => { e.stopPropagation(); handleRowClick(lead.id); }} 
                                    className="w-7 h-7 rounded flex items-center justify-center text-textTertiary hover:text-textMain hover:bg-surfaceHighlight transition-colors"
                                 >
                                    <ArrowRight size={14} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>

               {/* Empty State */}
               {filteredLeads.length === 0 && (
                  <div className="p-12 text-center">
                     <div className="w-12 h-12 bg-surfaceHighlight rounded-full flex items-center justify-center mx-auto mb-3 border border-borderSubtle">
                        <Filter size={20} className="text-textTertiary" />
                     </div>
                     <h3 className="text-[13px] font-medium text-textMain">No leads found</h3>
                     <p className="text-[11px] text-textTertiary mt-1">Try adjusting your filters.</p>
                  </div>
               )}
            </div>
            
            <div className="mt-4 text-center text-[11px] text-textTertiary">
               Showing {filteredLeads.length} results
            </div>
         </div>
      </div>
    </div>
  );
};

// Helpers for Profile Pages
const AttrRow: React.FC<{ label: string, value: string, icon?: any, highlight?: boolean }> = ({ label, value, icon: Icon, highlight }) => (
  <div className="flex justify-between items-center py-2 border-b border-borderSubtle/50 last:border-0">
     <span className="text-[11px] text-textTertiary flex items-center gap-2">
        {Icon && <Icon size={12} className="opacity-70" />} {label}
     </span>
     <span className={`text-[11px] font-mono truncate max-w-[160px] text-right ${highlight ? 'text-textMain' : 'text-textSecondary'}`}>{value}</span>
  </div>
);

const ActionCard: React.FC<{ 
   title: string, 
   subtext: string, 
   icon: any, 
   actionLabel?: string, 
   onClick?: () => void,
   variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger',
   buttonClassName?: string
}> = ({ title, subtext, icon: Icon, actionLabel, onClick, variant = 'secondary', buttonClassName }) => (
   <div className="p-4 rounded-lg bg-surface border border-borderSubtle shadow-sm hover:border-borderHighlight transition-all group">
      <div className="flex items-start gap-3 mb-3">
         <div className="w-8 h-8 rounded-md bg-panel border border-borderSubtle flex items-center justify-center shrink-0 text-textSecondary">
            <Icon size={16} />
         </div>
         <div>
            <h4 className="text-[13px] font-medium text-textMain">{title}</h4>
            <p className="text-[11px] text-textTertiary leading-relaxed mt-0.5">{subtext}</p>
         </div>
      </div>
      {actionLabel && (
         <Button variant={variant} onClick={onClick} size="sm" className={`w-full justify-center h-7 text-[11px] ${buttonClassName}`}>
            {actionLabel}
         </Button>
      )}
   </div>
);

// ----------------------------------------------------------------------
// TEMPLATE A: QUALIFIED LEAD PAGE
// Used for: Alice Freeman, Sarah Jones, Emma Wilson
// ----------------------------------------------------------------------
const TemplateA_Qualified: React.FC<{ lead: any, onBack: () => void }> = ({ lead, onBack }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [showNurture, setShowNurture] = useState(false);

  return (
    <div className="h-full flex flex-col p-6 max-w-[1400px] mx-auto animate-fade-in overflow-hidden">
       {/* HEADER */}
       <div className="shrink-0 mb-2">
         <Button variant="ghost" size="sm" onClick={onBack} className="pl-0 text-[11px] text-textTertiary hover:text-textMain mb-4">
            <ChevronLeft size={12} /> Back to Inbox
         </Button>

         <div className="flex justify-between items-start">
            <div className="space-y-1">
               <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-medium text-textMain tracking-tight">{lead.name}</h1>
                  <div className="px-2 py-0.5 rounded-full border flex items-center gap-1.5 text-[11px] font-medium bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                     <Check size={12} /> Qualified
                  </div>
               </div>
               <div className="flex items-center gap-2 text-[13px] text-textSecondary">
                  <span className="text-emerald-400 font-medium">{lead.score}/100</span> Score
               </div>
            </div>

            <div className="flex items-center gap-4 text-[12px] text-textTertiary">
               <div className="flex items-center gap-2"><Mail size={14} /> {lead.email}</div>
               <div className="w-[1px] h-4 bg-borderSubtle" />
               <div className="flex items-center gap-2"><Clock size={14} /> {lead.submittedAt}</div>
            </div>
         </div>
         <Separator className="mt-6" />
       </div>

       {/* LAYOUT GRID */}
       <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6 mt-6">
          
          {/* LEFT COLUMN: Qualification Summary */}
          <div className="flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-1">
             
             {/* Qualification Summary (GREEN BOX) */}
             <div className="bg-surface border border-emerald-500/20 rounded-xl overflow-hidden shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)]">
                <div className="p-4 border-b border-borderSubtle bg-emerald-500/5">
                   <h3 className="text-[12px] font-medium text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 size={12} /> Qualification Summary
                   </h3>
                </div>
                <div className="p-5 space-y-3">
                   <div className="flex gap-2.5 items-start text-[12px] text-textSecondary leading-relaxed">
                       <div className="w-1 h-1 rounded-full bg-emerald-400 mt-2 shrink-0" />
                       <p>Budget <span className="text-textMain font-medium">({lead.budget})</span> meets threshold.</p>
                   </div>
                   <div className="flex gap-2.5 items-start text-[12px] text-textSecondary leading-relaxed">
                       <div className="w-1 h-1 rounded-full bg-emerald-400 mt-2 shrink-0" />
                       <p>Decision Maker confirmed <span className="text-textMain font-medium">({lead.role})</span>.</p>
                   </div>
                   <div className="flex gap-2.5 items-start text-[12px] text-textSecondary leading-relaxed">
                       <div className="w-1 h-1 rounded-full bg-emerald-400 mt-2 shrink-0" />
                       <p>High intent signals detected.</p>
                   </div>
                </div>
             </div>

            {/* Attribution Lite */}
             <div className="bg-surface border border-borderSubtle rounded-xl overflow-hidden">
                <div className="p-4 border-b border-borderSubtle bg-panel/50">
                   <h3 className="text-[12px] font-medium text-textMain">Attribution Lite</h3>
                </div>
                <div className="p-4">
                   <AttrRow label="Source" value={lead.source.split(' / ')[0]} icon={Link2} />
                   <AttrRow label="First URL" value="/pricing" icon={Globe} />
                   <AttrRow label="Referrer" value="Google" icon={ArrowRight} />
                   <AttrRow label="Device" value={lead.device} icon={Smartphone} />
                   <AttrRow label="Region" value={lead.region} icon={MapPin} />
                   <AttrRow label="Session" value="4m 22s" icon={Clock} />
                   <AttrRow label="Visitor ID" value="vis_9821x" icon={Fingerprint} />
                </div>
             </div>

             {/* Flow Metadata */}
             <div className="bg-surface border border-borderSubtle rounded-xl overflow-hidden">
                <div className="p-4 border-b border-borderSubtle bg-panel/50">
                   <h3 className="text-[12px] font-medium text-textMain">Flow Metadata</h3>
                </div>
                <div className="p-4">
                   <AttrRow label="Form Name" value={lead.formName} icon={FileText} />
                   <AttrRow label="Version" value="v2.4" icon={GitBranch} />
                   <AttrRow label="Flow ID" value="fl_92k0s" icon={ShieldCheck} />
                </div>
             </div>
          </div>

          {/* MIDDLE COLUMN: Transcript */}
          <div className="flex flex-col bg-surface border border-borderSubtle rounded-xl overflow-hidden shadow-card min-h-0">
             <div className="px-5 py-3 border-b border-borderSubtle bg-panel/30 flex justify-between items-center backdrop-blur-md shrink-0">
                <div className="flex items-center gap-2">
                   <MessageSquare size={14} className="text-textTertiary" />
                   <h3 className="text-[12px] font-medium text-textMain">Transcript</h3>
                </div>
                <Badge variant="neutral">CleanFunnels AI</Badge>
             </div>
             <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-page/50">
                <div className="text-center text-[10px] text-textTertiary uppercase tracking-widest mb-4">Session Started 4:12 PM</div>
                 {[
                     { role: 'ai', text: `Hi ${lead.name.split(' ')[0]}. Welcome to CleanFunnels. What brings you here today?` },
                     { role: 'user', text: lead.transcriptSnippet || 'We need to automate our inbound lead qualification.' },
                     { role: 'ai', text: 'Great. How many leads are you processing monthly?' },
                     { role: 'user', text: 'About 5000+ leads per month.' },
                     { role: 'ai', text: 'Impressive. And what is your estimated budget for this project?' },
                     { role: 'user', text: `We have allocated ${lead.budget} for this.` },
                     { role: 'ai', text: 'That fits our Enterprise tier perfectly. Are you the main decision maker?' },
                     { role: 'user', text: `Yes, I am the ${lead.role}.` },
                     { role: 'ai', text: 'Perfect. Let\'s get you booked with our enterprise team.' }
                  ].map((m, i) => (
                     <div key={i} className={`flex flex-col gap-1.5 ${m.role === 'user' ? 'items-end' : 'items-start'} animate-slide-up`} style={{animationDelay: `${i * 50}ms`}}>
                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                           m.role === 'user' 
                           ? 'bg-emerald-500/10 border border-emerald-500/20 text-textMain rounded-tr-sm' 
                           : 'bg-surface border border-borderSubtle text-textSecondary rounded-tl-sm'
                        }`}>
                           {m.text}
                        </div>
                     </div>
                  ))}
             </div>
          </div>

          {/* RIGHT COLUMN: Next Steps */}
          <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-1">
            <div className="flex items-center gap-2 px-1">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               <h3 className="text-[12px] font-medium text-textMain uppercase tracking-wider">Next Steps</h3>
            </div>

             <div className="space-y-3">
                <ActionCard 
                   title="View Scheduled Call"
                   subtext="Meeting booked automatically via flow."
                   icon={Video}
                   actionLabel="View Scheduled Call"
                   variant="primary"
                   buttonClassName="bg-emerald-500 hover:bg-emerald-400 text-white border-transparent shadow-lg shadow-emerald-500/20"
                   onClick={() => setShowBooking(true)}
                />
                
                <ActionCard 
                   title="Add to Nurture"
                   subtext="Optional. Continue value-based follow-up after the call."
                   icon={Mail}
                   actionLabel="Add to Nurture"
                   variant="secondary"
                   onClick={() => setShowNurture(true)}
                />

                <ActionCard 
                   title="Send Resources"
                   subtext="Send case studies or relevant materials before the meeting."
                   icon={FileText}
                   actionLabel="Send Resources"
                   variant="secondary"
                />
             </div>
          </div>
       </div>

       {showBooking && <QualifiedBookingModal onClose={() => setShowBooking(false)} leadName={lead.name} />}
       {showNurture && <NurtureModal onClose={() => setShowNurture(false)} leadName={lead.name} />}
    </div>
  );
};

// ----------------------------------------------------------------------
// TEMPLATE B: UNQUALIFIED LEAD PAGE
// Used for: Mark Chen, David Miller
// ----------------------------------------------------------------------
const TemplateB_Unqualified: React.FC<{ lead: any, onBack: () => void }> = ({ lead, onBack }) => {
  const [showNurture, setShowNurture] = useState(false);
  const [showManualLink, setShowManualLink] = useState(false);

  return (
    <div className="h-full flex flex-col p-6 max-w-[1400px] mx-auto animate-fade-in overflow-hidden">
       {/* HEADER */}
       <div className="shrink-0 mb-2">
         <Button variant="ghost" size="sm" onClick={onBack} className="pl-0 text-[11px] text-textTertiary hover:text-textMain mb-4">
            <ChevronLeft size={12} /> Back to Inbox
         </Button>

         <div className="flex justify-between items-start">
            <div className="space-y-1">
               <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-medium text-textMain tracking-tight">{lead.name}</h1>
                  <div className="px-2 py-0.5 rounded-full border flex items-center gap-1.5 text-[11px] font-medium bg-red-500/10 border-red-500/20 text-red-400">
                     <UserMinus size={12} /> Not Qualified
                  </div>
               </div>
               <div className="flex items-center gap-2 text-[13px] text-textSecondary">
                  <span className="text-red-400 font-medium">{lead.score}/100</span> Score
               </div>
            </div>

            <div className="flex items-center gap-4 text-[12px] text-textTertiary">
               <div className="flex items-center gap-2"><Mail size={14} /> {lead.email}</div>
               <div className="w-[1px] h-4 bg-borderSubtle" />
               <div className="flex items-center gap-2"><Clock size={14} /> {lead.submittedAt}</div>
            </div>
         </div>
         <Separator className="mt-6" />
       </div>

       {/* LAYOUT GRID */}
       <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6 mt-6">
          
          {/* LEFT COLUMN: Why Unqualified */}
          <div className="flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-1">
             
             {/* Qualification Summary (RED BOX) */}
             <div className="bg-surface border border-red-500/20 rounded-xl overflow-hidden shadow-[0_0_30px_-15px_rgba(239,68,68,0.1)]">
                <div className="p-4 border-b border-borderSubtle bg-red-500/5">
                   <h3 className="text-[12px] font-medium text-red-400 flex items-center gap-2">
                      <AlertTriangle size={12} /> Why this lead was marked Unqualified
                   </h3>
                </div>
                <div className="p-5 space-y-3">
                   <div className="flex gap-2.5 items-start text-[12px] text-textSecondary leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-red-400 mt-2 shrink-0" />
                      <p>Budget ({lead.budget}) below target threshold.</p>
                   </div>
                   <div className="flex gap-2.5 items-start text-[12px] text-textSecondary leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-red-400 mt-2 shrink-0" />
                      <p>No clear timeline indicated.</p>
                   </div>
                   <div className="flex gap-2.5 items-start text-[12px] text-textSecondary leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-red-400 mt-2 shrink-0" />
                      <p>Not a decision maker.</p>
                   </div>
                </div>
             </div>

             {/* Attribution Lite */}
             <div className="bg-surface border border-borderSubtle rounded-xl overflow-hidden">
                <div className="p-4 border-b border-borderSubtle bg-panel/50">
                   <h3 className="text-[12px] font-medium text-textMain">Attribution Lite</h3>
                </div>
                <div className="p-4">
                   <AttrRow label="Source" value={lead.source.split(' / ')[0]} icon={Link2} />
                   <AttrRow label="First URL" value="/blog/top-10" icon={Globe} />
                   <AttrRow label="Referrer" value="Direct" icon={ArrowRight} />
                   <AttrRow label="Device" value={lead.device} icon={Smartphone} />
                   <AttrRow label="Region" value={lead.region} icon={MapPin} />
                   <AttrRow label="Session" value="1m 02s" icon={Clock} />
                   <AttrRow label="Visitor ID" value="vis_772" icon={Fingerprint} />
                </div>
             </div>

             {/* Flow Metadata */}
             <div className="bg-surface border border-borderSubtle rounded-xl overflow-hidden">
                <div className="p-4 border-b border-borderSubtle bg-panel/50">
                   <h3 className="text-[12px] font-medium text-textMain">Flow Metadata</h3>
                </div>
                <div className="p-4">
                   <AttrRow label="Form Name" value={lead.formName} icon={FileText} />
                   <AttrRow label="Version" value="v2.4" icon={GitBranch} />
                </div>
             </div>
          </div>

          {/* MIDDLE COLUMN: Transcript */}
          <div className="flex flex-col bg-surface border border-borderSubtle rounded-xl overflow-hidden shadow-card min-h-0">
             <div className="px-5 py-3 border-b border-borderSubtle bg-panel/30 flex justify-between items-center backdrop-blur-md shrink-0">
                <div className="flex items-center gap-2">
                   <MessageSquare size={14} className="text-textTertiary" />
                   <h3 className="text-[12px] font-medium text-textMain">Transcript</h3>
                </div>
                <Badge variant="neutral">AI Flow</Badge>
             </div>
             <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-page/50">
                <div className="text-center text-[10px] text-textTertiary uppercase tracking-widest mb-4">Session Started 4:12 PM</div>
                {[
                     { role: 'ai', text: `Hi ${lead.name.split(' ')[0]}. Welcome to CleanFunnels. What brings you here today?` },
                     { role: 'user', text: lead.transcriptSnippet || 'Just checking what options exist.' },
                     { role: 'ai', text: 'Understood. Do you have a specific budget range in mind?' },
                     { role: 'user', text: `Not really, probably ${lead.budget} if anything.` },
                     { role: 'ai', text: 'Got it. And are you the main decision maker for this project?' },
                     { role: 'user', text: 'No, I\'d have to check with my boss first.' },
                     { role: 'ai', text: 'Thanks. Since we focus on enterprise teams, we recommend checking out our self-service resources for now.' }
                  ].map((m, i) => (
                     <div key={i} className={`flex flex-col gap-1.5 ${m.role === 'user' ? 'items-end' : 'items-start'} animate-slide-up`} style={{animationDelay: `${i * 50}ms`}}>
                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                           m.role === 'user' 
                           ? 'bg-panel border border-borderSubtle text-textMain rounded-tr-sm' 
                           : 'bg-surface border border-borderSubtle text-textSecondary rounded-tl-sm'
                        }`}>
                           {m.text}
                        </div>
                     </div>
                  ))}
             </div>
          </div>

          {/* RIGHT COLUMN: Next Steps */}
          <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-1">
             <div className="flex items-center gap-2 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <h3 className="text-[12px] font-medium text-textMain uppercase tracking-wider">Next Steps</h3>
             </div>

             <div className="space-y-3">
                <ActionCard 
                   title="Add to Nurture Sequence"
                   subtext="Automatically follow up with this lead over time."
                   icon={Mail}
                   actionLabel="Add to Nurture"
                   variant="primary"
                   onClick={() => setShowNurture(true)}
                />
                
                <ActionCard 
                   title="Send Calendar Link Anyway"
                   subtext="Override qualification and offer a meeting manually."
                   icon={Calendar}
                   actionLabel="Send Calendar Link"
                   onClick={() => setShowManualLink(true)}
                />

                <ActionCard 
                   title="Send Info Resources"
                   subtext="Share case studies or whitepapers to educate and warm the lead."
                   icon={FileText}
                   actionLabel="Send Resources"
                />

                <div className="pt-2">
                   <ActionCard 
                      title="Dismiss Lead"
                      subtext="Remove from active review and archive."
                      icon={Archive}
                      actionLabel="Dismiss"
                      variant="ghost"
                   />
                </div>
             </div>
          </div>
       </div>

       {/* Modals */}
       {showNurture && <NurtureModal onClose={() => setShowNurture(false)} leadName={lead.name} />}
       {showManualLink && <ManualLinkModal onClose={() => setShowManualLink(false)} leadName={lead.name} />}
    </div>
  );
};

// ----------------------------------------------------------------------
// MAIN ROUTER COMPONENT
// ----------------------------------------------------------------------
export const LeadProfilePage: React.FC<{ setPage: (p: Page) => void; leadId?: string }> = ({ setPage, leadId }) => {
  
  // Initialize based on selected lead ID (from props)
  const initialIndex = leadId ? DEMO_LEADS.findIndex(l => l.id === leadId) : 0;
  // Fallback to 0 if not found, or keep state for "switcher" functionality
  const [currentLeadIndex, setCurrentLeadIndex] = useState(initialIndex !== -1 ? initialIndex : 0);
  
  const lead = DEMO_LEADS[currentLeadIndex];
  
  // STRICT QUALIFICATION ROUTING (Hardcoded per requirements)
  const isQualified = ['Alice Freeman', 'Sarah Jones', 'Emma Wilson'].includes(lead.name);

  return (
    <>
       {/* Demo Switcher for Reviewing Both Templates */}
       <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-2 p-2 bg-panel border border-borderSubtle rounded-full shadow-2xl">
          <Button 
             variant="ghost" 
             size="sm" 
             onClick={() => setCurrentLeadIndex((prev) => (prev + 1) % DEMO_LEADS.length)}
             className="text-[10px] h-6 px-3"
          >
             Switch Lead ({currentLeadIndex + 1}/{DEMO_LEADS.length})
          </Button>
          <div className="h-4 w-[1px] bg-borderSubtle" />
          <span className={`text-[10px] px-2 font-medium ${isQualified ? 'text-emerald-400' : 'text-red-400'}`}>
             {isQualified ? `Rendering Template A (Qualified: ${lead.name})` : `Rendering Template B (Unqualified: ${lead.name})`}
          </span>
       </div>

       {isQualified ? (
          <TemplateA_Qualified lead={lead} onBack={() => setPage(Page.LEADS)} />
       ) : (
          <TemplateB_Unqualified lead={lead} onBack={() => setPage(Page.LEADS)} />
       )}
    </>
  );
};
