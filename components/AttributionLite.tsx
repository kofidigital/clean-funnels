import React from 'react';
import { VisitorSession } from '../types';
import { Smartphone, Globe, Link2, MapPin, Clock, Fingerprint, MousePointerClick } from 'lucide-react';

const AttributionLite: React.FC<{ data: VisitorSession }> = ({ data }) => {
  const Item = ({ label, value, icon: Icon, highlight = false }: { label: string, value: string, icon: any, highlight?: boolean }) => (
    <div className="flex flex-col gap-1 p-3 border border-borderSubtle bg-surfaceHighlight/20 rounded-lg transition-all hover:bg-surfaceHighlight/40">
      <div className="flex items-center gap-2 text-textTertiary">
        <Icon size={12} strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-wide font-medium">{label}</span>
      </div>
      <span className={`text-[12px] font-medium truncate ${highlight ? 'text-accent-green' : 'text-textSecondary'} font-mono tracking-tight`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="col-span-2 grid grid-cols-3 gap-2">
         <Item label="Source" value={data.utm_source} icon={Link2} highlight />
         <Item label="Medium" value={data.utm_medium} icon={Link2} />
         <Item label="Campaign" value={data.utm_campaign} icon={Link2} />
      </div>
      
      <Item label="Entry URL" value={data.first_url} icon={Globe} />
      <Item label="Referrer" value={data.referrer_url} icon={MousePointerClick} />
      
      <Item label="Device" value={data.device} icon={Smartphone} />
      <Item label="Region" value={data.region} icon={MapPin} />
      
      <Item label="Duration" value={data.session_duration} icon={Clock} />
      <Item label="Visitor ID" value={data.visitor_id} icon={Fingerprint} />
    </div>
  );
};

export default AttributionLite;