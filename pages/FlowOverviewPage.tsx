
import React, { useState } from 'react';
import { Page, Lead } from '../types';
import { Button, Badge, Card, Separator, Badge as UIBadge } from '../components/UIComponents';
import { 
  ChevronLeft, Edit2, Copy, Archive, Eye, 
  ArrowRight, Users, CheckCircle2, XCircle, 
  Clock, GitBranch, Settings, Bell, Webhook,
  TrendingUp, TrendingDown, Lightbulb, Filter,
  PieChart, BarChart3, AlertCircle, MousePointerClick,
  MoreHorizontal, Share2, Calendar
} from 'lucide-react';

// --- Mock Data ---

const METRICS = [
  { label: "Conversion Rate", value: "12.4%", trend: "+2.1%", trendUp: true, sub: "vs last week" },
  { label: "Total Volume", value: "1,420", trend: "+12%", trendUp: true, sub: "Unique visits" },
  { label: "Qualified Leads", value: "312", trend: "+5%", trendUp: true, sub: "22% qual rate" },
  { label: "Disqualified", value: "842", trend: "-2%", trendUp: false, sub: "59% disq rate" },
  { label: "Avg Completion", value: "1m 42s", trend: "-10s", trendUp: true, sub: "Faster than avg" }, // Green trend for faster time
  { label: "Drop-Off Step", value: "Step 2", trend: "High", trendUp: false, sub: "Budget Qual", alert: true },
];

const INSIGHTS = [
  { type: "opportunity", text: "Step 2 is causing 61% of drop-offs. Simplify the question for a potential +12% conversion lift.", impact: "High" },
  { type: "info", text: "LinkedIn traffic converts 1.9x higher than Facebook traffic this week.", impact: "Medium" },
  { type: "success", text: "Your qualification accuracy increased by 4% after the last edit.", impact: "Positive" },
];

const RECENT_LEADS: Lead[] = [
  { id: '1', name: 'Alice Freeman', email: 'alice@agency.com', source: 'Google / cpc', formName: 'Agency Qual v2', score: 92, submittedAt: '2m ago', status: 'new' },
  { id: '2', name: 'Mark Chen', email: 'mark@startup.io', source: 'Direct', formName: 'Agency Qual v2', score: 42, submittedAt: '1h ago', status: 'contacted' },
  { id: '3', name: 'Sarah Jones', email: 's.jones@bigcorp.com', source: 'LinkedIn / organic', formName: 'Enterprise Demo', score: 88, submittedAt: '4h ago', status: 'closed' },
  { id: '4', name: 'David Miller', email: 'dave@gmail.com', source: 'Facebook / ads', formName: 'Webinar Sign', score: 12, submittedAt: '1d ago', status: 'new' },
  { id: '5', name: 'Emma Wilson', email: 'emma@design.studio', source: 'Twitter', formName: 'Agency Qual v2', score: 95, submittedAt: '2d ago', status: 'new' },
];

const SCORING_FACTORS = [
  { label: "Budget", weight: "30%", score: 85, color: "bg-emerald-500" },
  { label: "Fit / Role", weight: "25%", score: 72, color: "bg-blue-500" },
  { label: "Timeline", weight: "20%", score: 60, color: "bg-amber-500" },
  { label: "Company Size", weight: "15%", score: 90, color: "bg-purple-500" },
  { label: "Source", weight: "10%", score: 100, color: "bg-gray-400" },
];

const TRAFFIC_SOURCES = [
  { label: "Google / CPC", value: 45, color: "bg-blue-500" },
  { label: "Direct", value: 30, color: "bg-emerald-500" },
  { label: "LinkedIn", value: 15, color: "bg-blue-400" },
  { label: "Other", value: 10, color: "bg-gray-600" },
];

// --- Components ---

const MetricCard: React.FC<{ data: typeof METRICS[0] }> = ({ data }) => (
  <div className="bg-surface border border-borderSubtle rounded-xl p-4 flex flex-col justify-between h-[100px] hover:border-borderHighlight hover:bg-surfaceHighlight/30 transition-all cursor-pointer group relative overflow-hidden">
    <div className="flex justify-between items-start z-10">
      <span className="text-[11px] uppercase tracking-wider text-textTertiary font-medium group-hover:text-textSecondary transition-colors">{data.label}</span>
      {data.alert && <AlertCircle size={12} className="text-red-400" />}
    </div>
    
    <div className="z-10">
      <div className="flex items-baseline gap-2">
        <span className="text-[20px] font-medium text-textMain tracking-tight">{data.value}</span>
        {data.trend && (
           <div className={`flex items-center gap-0.5 text-[11px] font-medium ${data.trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {data.trendUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {data.trend}
           </div>
        )}
      </div>
      <span className="text-[10px] text-textTertiary mt-1 block">{data.sub}</span>
    </div>

    {/* Hover Glow */}
    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

const FlowNode: React.FC<{ 
  step: number, 
  label: string, 
  metric: string, 
  metricLabel: string, 
  status: 'good' | 'warning' | 'critical',
  isEnd?: boolean 
}> = ({ step, label, metric, metricLabel, status, isEnd }) => {
  const statusColors = {
    good: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
    warning: "border-amber-500/20 bg-amber-500/5 text-amber-400",
    critical: "border-red-500/20 bg-red-500/5 text-red-400"
  };

  return (
    <div className="relative group flex items-center">
      <div className={`
        relative w-[180px] p-3 rounded-lg border backdrop-blur-sm transition-all cursor-pointer
        hover:shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)] hover:scale-[1.02]
        ${isEnd ? 'border-borderSubtle bg-surface' : statusColors[status]}
        ${!isEnd && 'border hover:border-opacity-50'}
      `}>
        <div className="flex justify-between items-start mb-2">
           <span className="text-[10px] uppercase tracking-wider opacity-70 font-medium">
             {isEnd ? 'Outcome' : `Step ${step}`}
           </span>
           {!isEnd && <div className={`w-1.5 h-1.5 rounded-full ${status === 'good' ? 'bg-emerald-500' : status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`} />}
        </div>
        <div className="text-[12px] font-medium text-textMain truncate pr-2 mb-1">{label}</div>
        
        <div className="flex items-center gap-2 pt-2 border-t border-black/10 dark:border-white/5">
           <span className="text-[10px] font-mono opacity-90">{metric}</span>
           <span className="text-[9px] opacity-50">{metricLabel}</span>
        </div>
      </div>
      
      {/* Connector Line */}
      {!isEnd && (
        <div className="w-8 h-[2px] bg-borderSubtle group-hover:bg-borderHighlight transition-colors" />
      )}
    </div>
  );
};

export const FlowOverviewPage: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
  const [leadFilter, setLeadFilter] = useState('All');

  return (
    <div className="p-8 max-w-[1280px] mx-auto animate-fade-in space-y-6">
      
      {/* 1. Header Section */}
      <header className="flex flex-col gap-5 border-b border-borderSubtle pb-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
             <div className="flex items-center gap-3">
               <h1 className="text-2xl font-medium text-textMain tracking-tight">Agency Qualification Flow</h1>
               <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-emerald-400">Active</span>
               </div>
             </div>
             <div className="flex items-center gap-3 text-[12px] text-textTertiary">
               <span className="font-mono">v2.4.1</span>
               <span>•</span>
               <span>Last edited 2 hours ago</span>
             </div>
          </div>

          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" icon={<Share2 size={12} />}>Share</Button>
             <Button variant="outline" size="sm" icon={<Copy size={12} />}>Duplicate</Button>
             <Button variant="outline" size="sm" icon={<Settings size={12} />} onClick={() => setPage(Page.SETTINGS)}>Settings</Button>
             <Button variant="primary" size="sm" icon={<Edit2 size={12} />} onClick={() => setPage(Page.CREATE_FORM)}>Edit Flow</Button>
          </div>
        </div>
      </header>

      {/* 2. Top Metrics Bar */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {METRICS.map((m, i) => <MetricCard key={i} data={m} />)}
      </section>

      {/* 3. AI Insights Panel */}
      <section className="bg-gradient-to-r from-surface to-surfaceHighlight/30 border border-borderSubtle rounded-xl p-5 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50" />
         <div className="flex items-start gap-4 z-10 relative">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
               <Lightbulb size={16} className="text-amber-400" />
            </div>
            <div className="space-y-3 flex-1">
               <div className="flex justify-between items-center">
                  <h3 className="text-[13px] font-medium text-textMain">Optimization Insights</h3>
                  <span className="text-[10px] text-textTertiary bg-surface/50 px-2 py-1 rounded border border-borderSubtle">AI Generated</span>
               </div>
               <div className="grid gap-2">
                  {INSIGHTS.map((insight, i) => (
                     <div key={i} className="flex items-start gap-2 text-[12px] group cursor-pointer hover:bg-white/5 p-1.5 rounded -ml-1.5 transition-colors">
                        <div className={`mt-1.5 w-1 h-1 rounded-full ${insight.type === 'opportunity' ? 'bg-amber-400' : insight.type === 'success' ? 'bg-emerald-400' : 'bg-blue-400'}`} />
                        <span className="text-textSecondary leading-relaxed group-hover:text-textMain transition-colors flex-1">
                           {insight.text}
                        </span>
                        <Badge variant="neutral" className="opacity-0 group-hover:opacity-100 transition-opacity">{insight.impact} Impact</Badge>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 4. Main Diagnostic Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
         
         {/* Left Column */}
         <div className="flex flex-col gap-6">
            
            {/* Flow Structure Map */}
            <div className="bg-surface border border-borderSubtle rounded-xl p-5 overflow-hidden">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[13px] font-medium text-textMain flex items-center gap-2">
                     <GitBranch size={14} className="text-textTertiary" /> Flow Health Map
                  </h3>
                  <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-textTertiary">
                         <div className="w-2 h-2 rounded-full bg-emerald-500/50" /> Healthy
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-textTertiary">
                         <div className="w-2 h-2 rounded-full bg-red-500/50" /> Critical
                      </div>
                  </div>
               </div>
               
               <div className="overflow-x-auto pb-4 custom-scrollbar">
                  <div className="flex items-center min-w-max px-2">
                     <FlowNode step={1} label="Welcome / Name" metric="0%" metricLabel="drop-off" status="good" />
                     <FlowNode step={2} label="Budget Qualification" metric="61%" metricLabel="drop-off" status="critical" />
                     <FlowNode step={3} label="Timeline & Role" metric="12%" metricLabel="drop-off" status="warning" />
                     <FlowNode step={4} label="Success Route" metric="28%" metricLabel="conversion" status="good" isEnd />
                  </div>
               </div>

               <div className="mt-2 pt-4 border-t border-borderSubtle flex justify-end">
                  <Button size="sm" variant="ghost" className="text-[11px]" onClick={() => setPage(Page.CREATE_FORM)}>Open in Builder <ArrowRight size={10} /></Button>
               </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-surface border border-borderSubtle rounded-xl flex-1 flex flex-col overflow-hidden">
               <div className="p-4 border-b border-borderSubtle flex justify-between items-center bg-panel/30">
                  <div className="flex items-center gap-4">
                     <h3 className="text-[13px] font-medium text-textMain">Recent Activity</h3>
                     <div className="flex gap-1 bg-surface border border-borderSubtle rounded p-0.5">
                        {['All', 'Qualified', 'Disqualified'].map(tab => (
                           <button 
                              key={tab} 
                              onClick={() => setLeadFilter(tab)}
                              className={`px-2.5 py-1 text-[10px] font-medium rounded transition-all ${leadFilter === tab ? 'bg-textMain text-page shadow-sm' : 'text-textTertiary hover:text-textSecondary'}`}
                           >
                              {tab}
                           </button>
                        ))}
                     </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[11px]">View All</Button>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-borderSubtle bg-panel/10">
                          <th className="px-5 py-2.5 text-[10px] text-textTertiary font-medium uppercase tracking-wider">Lead</th>
                          <th className="px-5 py-2.5 text-[10px] text-textTertiary font-medium uppercase tracking-wider">Score</th>
                          <th className="px-5 py-2.5 text-[10px] text-textTertiary font-medium uppercase tracking-wider">Source</th>
                          <th className="px-5 py-2.5 text-[10px] text-textTertiary font-medium uppercase tracking-wider text-right">Time</th>
                       </tr>
                    </thead>
                    <tbody>
                       {RECENT_LEADS.map(lead => (
                          <tr key={lead.id} onClick={() => setPage(Page.LEAD_PROFILE)} className="group border-b border-borderSubtle last:border-0 hover:bg-surfaceHighlight/40 transition-colors cursor-pointer">
                             <td className="px-5 py-3">
                                <div className="flex items-center gap-3">
                                   <div className={`w-2 h-2 rounded-full ${lead.score > 80 ? 'bg-emerald-500' : lead.score < 50 ? 'bg-red-500' : 'bg-amber-500'}`} />
                                   <div>
                                      <div className="text-[12px] text-textMain font-medium">{lead.name}</div>
                                      <div className="text-[10px] text-textTertiary">{lead.email}</div>
                                   </div>
                                </div>
                             </td>
                             <td className="px-5 py-3">
                                <Badge variant={lead.score > 80 ? 'success' : lead.score < 50 ? 'outline' : 'neutral'}>
                                   {lead.score} / 100
                                </Badge>
                             </td>
                             <td className="px-5 py-3">
                                <div className="text-[11px] text-textSecondary font-mono bg-panel inline-block px-1.5 py-0.5 rounded border border-borderSubtle">{lead.source}</div>
                             </td>
                             <td className="px-5 py-3 text-right text-[11px] text-textTertiary font-mono">
                                {lead.submittedAt}
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
         </div>

         {/* Right Sidebar */}
         <div className="flex flex-col gap-6">
            
            {/* Traffic Breakdown */}
            <Card title="Traffic Sources">
               <div className="space-y-4">
                  <div className="flex h-2 w-full rounded-full overflow-hidden">
                     {TRAFFIC_SOURCES.map((src, i) => (
                        <div key={i} style={{width: `${src.value}%`}} className={`${src.color} hover:opacity-80 transition-opacity`} />
                     ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     {TRAFFIC_SOURCES.map((src, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px]">
                           <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${src.color}`} />
                              <span className="text-textSecondary">{src.label}</span>
                           </div>
                           <span className="font-mono text-textMain">{src.value}%</span>
                        </div>
                     ))}
                  </div>
               </div>
            </Card>

            {/* Scoring Breakdown */}
            <Card title="Scoring Factors">
               <div className="space-y-4">
                  {SCORING_FACTORS.map((factor, i) => (
                     <div key={i} className="space-y-1.5 group">
                        <div className="flex justify-between text-[11px]">
                           <span className="text-textSecondary">{factor.label}</span>
                           <span className="text-textTertiary font-mono group-hover:text-textMain transition-colors">{factor.weight} weight</span>
                        </div>
                        <div className="h-1.5 w-full bg-panel rounded-full overflow-hidden">
                           <div style={{width: `${factor.score}%`}} className={`h-full rounded-full ${factor.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            {/* Configuration */}
            <div className="space-y-3">
               <h3 className="text-[11px] uppercase tracking-wider text-textTertiary font-medium px-1">Configuration</h3>
               <div className="bg-surface border border-borderSubtle rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-panel transition-colors cursor-pointer group">
                     <div className="flex items-center gap-3">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <div>
                           <div className="text-[12px] text-textMain">Success Route</div>
                           <div className="text-[10px] text-textTertiary">cal.com/agency/intro</div>
                        </div>
                     </div>
                     <ChevronLeft size={12} className="rotate-180 text-textTertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-2 rounded hover:bg-panel transition-colors cursor-pointer group">
                     <div className="flex items-center gap-3">
                        <XCircle size={14} className="text-red-500" />
                        <div>
                           <div className="text-[12px] text-textMain">Failure Route</div>
                           <div className="text-[10px] text-textTertiary">Show Message</div>
                        </div>
                     </div>
                     <ChevronLeft size={12} className="rotate-180 text-textTertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <Separator />
                   <div className="flex items-center justify-between p-2 rounded hover:bg-panel transition-colors cursor-pointer group">
                     <div className="flex items-center gap-3">
                        <Webhook size={14} className="text-blue-500" />
                        <div>
                           <div className="text-[12px] text-textMain">Integrations</div>
                           <div className="text-[10px] text-textTertiary">HubSpot, Slack Active</div>
                        </div>
                     </div>
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};
