
import React, { useState } from 'react';
import { Card, Input, Button, Badge } from '../components/UIComponents';
import { 
  User, Calendar, Bell, Palette, Code, CreditCard, 
  Copy, RefreshCw, Upload, Globe, Mail, 
  CheckCircle2, LogOut
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  // State
  const [orgName, setOrgName] = useState('Acme Inc');
  const [calendarType, setCalendarType] = useState<'google' | 'link' | null>('google');
  const [isCalConnected, setIsCalConnected] = useState(true); // Simulation
  const [calLink, setCalLink] = useState('https://cal.com/acme/30min');
  const [apiKey, setApiKey] = useState('pk_live_892kjsd92j29d29z...');
  
  // Toggles
  const [notifQualified, setNotifQualified] = useState(true);
  const [notifUnqualified, setNotifUnqualified] = useState(false);
  const [notifDaily, setNotifDaily] = useState(true);
  
  // Branding
  const [brandColor, setBrandColor] = useState('#10B981');

  return (
    <div className="max-w-3xl mx-auto p-8 animate-fade-in pb-32">
       {/* Header */}
       <div className="mb-10">
          <h1 className="text-2xl font-medium text-textMain tracking-tight">Settings</h1>
          <p className="text-[13px] text-textSecondary mt-1">Manage your team, integrations, and preferences.</p>
       </div>

       <div className="space-y-12">
          
          {/* 1. Account */}
          <section>
             <h2 className="text-[14px] font-medium text-textMain mb-4 flex items-center gap-2">
                <User size={16} className="text-textTertiary" /> Account
             </h2>
             <Card className="p-0 overflow-hidden">
                <div className="p-6 grid grid-cols-[200px_1fr] gap-8">
                   <div>
                      <label className="block text-[12px] font-medium text-textSecondary mb-1">Profile Photo</label>
                      <div className="flex items-center gap-4 mt-2">
                         <div className="w-12 h-12 rounded-full bg-panel border border-borderSubtle flex items-center justify-center text-textTertiary text-[13px] font-medium">
                            JD
                         </div>
                         <Button variant="outline" size="sm">Change</Button>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div>
                         <label className="block text-[12px] font-medium text-textSecondary mb-1.5">Organization Name</label>
                         <Input value={orgName} onChange={e => setOrgName(e.target.value)} />
                      </div>
                      <div>
                         <label className="block text-[12px] font-medium text-textSecondary mb-1.5">Email Address</label>
                         <Input value="admin@cleanfunnels.com" disabled className="opacity-60 cursor-not-allowed bg-panel" />
                      </div>
                   </div>
                </div>
                <div className="px-6 py-3 bg-panel/30 border-t border-borderSubtle flex justify-end">
                   <Button variant="primary" size="sm">Save Changes</Button>
                </div>
             </Card>
          </section>

          {/* 2. Calendar */}
          <section>
             <div className="mb-4">
                <h2 className="text-[14px] font-medium text-textMain flex items-center gap-2">
                   <Calendar size={16} className="text-textTertiary" /> Connect Your Calendar
                </h2>
                <p className="text-[12px] text-textTertiary ml-6 mt-1">CleanFunnels uses your calendar to automatically schedule calls with qualified leads.</p>
             </div>
             
             <Card className="p-0 overflow-hidden">
                {/* Google Option */}
                <div className={`p-5 flex items-center justify-between border-b border-borderSubtle transition-colors ${calendarType === 'google' ? 'bg-surfaceHighlight/30' : ''}`}>
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center border border-borderSubtle shadow-sm shrink-0">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google" className="w-5 h-5" />
                      </div>
                      <div>
                         <div className="text-[13px] font-medium text-textMain">Google Calendar</div>
                         <div className="text-[11px] text-textTertiary">Syncs availability automatically</div>
                      </div>
                   </div>
                   {isCalConnected && calendarType === 'google' ? (
                      <div className="flex items-center gap-3">
                         <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCircle2 size={10} className="text-emerald-500" />
                            <span className="text-[10px] font-medium text-emerald-400">Connected</span>
                         </div>
                         <Button variant="outline" size="sm" onClick={() => setIsCalConnected(false)}>Disconnect</Button>
                      </div>
                   ) : (
                      <Button variant="secondary" size="sm" onClick={() => { setCalendarType('google'); setIsCalConnected(true); }}>Connect</Button>
                   )}
                </div>

                {/* External Link Option */}
                <div className={`p-5 transition-colors ${calendarType === 'link' ? 'bg-surfaceHighlight/30' : ''}`}>
                   <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-panel border border-borderSubtle rounded-md flex items-center justify-center text-textSecondary shrink-0">
                             <Globe size={18} />
                         </div>
                         <div>
                            <div className="text-[13px] font-medium text-textMain">External Booking Link</div>
                            <div className="text-[11px] text-textTertiary">Calendly, Cal.com, Hubspot</div>
                         </div>
                      </div>
                      <Button 
                         variant={calendarType === 'link' ? 'outline' : 'secondary'} 
                         size="sm" 
                         onClick={() => setCalendarType('link')}
                      >
                         {calendarType === 'link' ? 'Selected' : 'Select'}
                      </Button>
                   </div>
                   
                   {calendarType === 'link' && (
                      <div className="ml-14 animate-slide-up">
                         <div className="flex gap-2">
                            <Input 
                               value={calLink} 
                               onChange={(e) => setCalLink(e.target.value)} 
                               placeholder="https://cal.com/username/30min"
                               className="max-w-md"
                            />
                            <Button variant="primary" size="sm">Save</Button>
                         </div>
                      </div>
                   )}
                </div>
             </Card>
          </section>

          {/* 3. Notifications */}
          <section>
             <h2 className="text-[14px] font-medium text-textMain mb-4 flex items-center gap-2">
                <Bell size={16} className="text-textTertiary" /> Notifications
             </h2>
             <Card className="divide-y divide-borderSubtle">
                {[
                   { label: "New qualified leads", sub: "Get alerted immediately when a high-score lead comes in.", state: notifQualified, set: setNotifQualified },
                   { label: "New unqualified leads", sub: "Receive alerts for low-score leads.", state: notifUnqualified, set: setNotifUnqualified },
                   { label: "Daily summary email", sub: "A digest of all funnel activity at 9 AM.", state: notifDaily, set: setNotifDaily },
                ].map((item, i) => (
                   <div key={i} className="p-4 flex items-center justify-between">
                      <div>
                         <div className="text-[13px] font-medium text-textMain">{item.label}</div>
                         <div className="text-[11px] text-textTertiary">{item.sub}</div>
                      </div>
                      <button 
                         onClick={() => item.set(!item.state)}
                         className={`w-9 h-5 rounded-full relative transition-colors ${item.state ? 'bg-textMain' : 'bg-panel border border-borderSubtle'}`}
                      >
                         <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-page shadow-sm transition-transform ${item.state ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                   </div>
                ))}
                <div className="p-3 bg-panel/30 text-[11px] text-textTertiary flex items-center gap-2">
                   <Mail size={12} /> Notifications are sent to <span className="text-textSecondary">admin@cleanfunnels.com</span>
                </div>
             </Card>
          </section>

          {/* 4. Branding */}
          <section>
             <h2 className="text-[14px] font-medium text-textMain mb-4 flex items-center gap-2">
                <Palette size={16} className="text-textTertiary" /> Branding
             </h2>
             <Card className="p-6 space-y-6">
                <div className="grid grid-cols-[200px_1fr] gap-8">
                   <div>
                      <label className="block text-[12px] font-medium text-textSecondary mb-2">Logo</label>
                      <div className="w-24 h-24 border border-dashed border-borderSubtle rounded-lg flex flex-col items-center justify-center text-textTertiary hover:text-textMain hover:border-textSecondary cursor-pointer transition-all bg-panel/50">
                         <Upload size={16} className="mb-2" />
                         <span className="text-[10px]">Upload</span>
                      </div>
                   </div>
                   <div className="space-y-5">
                      <div>
                         <label className="block text-[12px] font-medium text-textSecondary mb-2">Brand Color</label>
                         <div className="flex items-center gap-3">
                            {['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'].map(c => (
                               <button 
                                  key={c} 
                                  onClick={() => setBrandColor(c)}
                                  className={`w-6 h-6 rounded-full border transition-all ${brandColor === c ? 'scale-110 ring-2 ring-offset-2 ring-offset-page ring-textTertiary border-transparent' : 'border-transparent hover:scale-110'}`}
                                  style={{backgroundColor: c}}
                               />
                            ))}
                            <div className="w-[1px] h-6 bg-borderSubtle mx-1" />
                            <div className="w-6 h-6 rounded-full border border-borderSubtle bg-transparent flex items-center justify-center text-[10px] text-textTertiary cursor-pointer hover:text-textMain">+</div>
                         </div>
                      </div>
                      <div>
                         <label className="block text-[12px] font-medium text-textSecondary mb-1.5">Intake Greeting</label>
                         <Input placeholder="Hi there! 👋" defaultValue="Hey! Welcome to CleanFunnels." />
                      </div>
                   </div>
                </div>
             </Card>
          </section>

          {/* 5. Developer */}
          <section>
             <h2 className="text-[14px] font-medium text-textMain mb-4 flex items-center gap-2">
                <Code size={16} className="text-textTertiary" /> Developer
             </h2>
             <Card className="divide-y divide-borderSubtle">
                <div className="p-5">
                   <label className="block text-[12px] font-medium text-textSecondary mb-2">Public API Key</label>
                   <div className="flex gap-2">
                      <div className="relative flex-1">
                         <Input value={apiKey} readOnly className="font-mono text-[11px] bg-panel text-textSecondary pr-10" />
                         <button className="absolute right-3 top-2 text-textTertiary hover:text-textMain"><Copy size={12} /></button>
                      </div>
                      <Button variant="outline" icon={<RefreshCw size={12} />}>Regenerate</Button>
                   </div>
                </div>
                <div className="p-5">
                   <label className="block text-[12px] font-medium text-textSecondary mb-2">Webhook URL</label>
                   <Input placeholder="https://api.yoursite.com/hooks/catch" />
                   <div className="mt-3 flex gap-2 flex-wrap">
                      {['lead.created', 'lead.qualified', 'call.booked'].map(t => (
                         <Badge key={t} variant="neutral" className="font-mono text-[10px]">{t}</Badge>
                      ))}
                   </div>
                </div>
             </Card>
          </section>

          {/* 6. Billing (Disabled) */}
          <section className="opacity-50 pointer-events-none grayscale">
             <h2 className="text-[14px] font-medium text-textMain mb-4 flex items-center gap-2">
                <CreditCard size={16} className="text-textTertiary" /> Billing
             </h2>
             <Card className="p-5 flex justify-between items-center bg-panel/20 border-dashed">
                <div>
                   <div className="text-[13px] font-medium text-textMain">Pro Plan</div>
                   <div className="text-[11px] text-textTertiary">$49/month • Next billing date: Nov 24</div>
                </div>
                <Button variant="outline" size="sm">Manage Subscription</Button>
             </Card>
          </section>

          <div className="pt-10 flex justify-center">
             <button className="text-[12px] text-red-400 hover:text-red-300 flex items-center gap-2 px-4 py-2 rounded hover:bg-red-500/5 transition-colors">
                <LogOut size={14} /> Log Out
             </button>
          </div>

       </div>
    </div>
  );
};
