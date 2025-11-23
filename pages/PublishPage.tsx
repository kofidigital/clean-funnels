
import React, { useState } from 'react';
import { Page } from '../types';
import { Button, Card, Input, Separator } from '../components/UIComponents';
import { ChevronLeft, Copy, Code } from 'lucide-react';

export const PublishPage: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
  const [deployed, setDeployed] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-8 animate-fade-in">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => setPage(Page.CREATE_FORM)} className="pl-0 mb-3 hover:bg-transparent text-[11px]">
          <ChevronLeft size={12} /> Back to Editor
        </Button>
        <h1 className="text-xl font-medium text-textMain tracking-tight mb-1">Publish Flow</h1>
        <p className="text-textSecondary text-[12px]">Configure deployment settings and grab your embed code.</p>
      </div>

      <div className="space-y-6">
        {/* Project Settings */}
        <section className="space-y-3">
           <h2 className="text-[10px] uppercase tracking-wider text-textTertiary font-medium">General</h2>
           <Card>
             <div className="grid grid-cols-[160px_1fr] gap-6 items-center">
                <div className="text-[12px] font-medium text-textMain">Project Name</div>
                <Input defaultValue="Agency Qualification Flow v1" />
             </div>
             <Separator className="my-4" />
             <div className="grid grid-cols-[160px_1fr] gap-6 items-center">
                <div className="text-[12px] font-medium text-textMain">Custom Domain</div>
                <div className="flex gap-2">
                   <Input placeholder="flow.yourdomain.com" className="font-mono" />
                   <Button variant="secondary" size="sm">Verify</Button>
                </div>
             </div>
           </Card>
        </section>

        {/* Theming */}
        <section className="space-y-3">
           <h2 className="text-[10px] uppercase tracking-wider text-textTertiary font-medium">Theming</h2>
           <Card>
             <div className="grid grid-cols-[160px_1fr] gap-6 items-center">
                <div className="text-[12px] font-medium text-textMain">Brand Color</div>
                <div className="flex gap-3">
                  {['#000000', '#3B82F6', '#8B5CF6', '#10B981'].map(c => (
                     <div key={c} className="w-6 h-6 rounded border border-borderSubtle cursor-pointer hover:scale-110 transition-transform" style={{backgroundColor: c}} />
                  ))}
                </div>
             </div>
             <Separator className="my-4" />
             <div className="grid grid-cols-[160px_1fr] gap-6 items-center">
                <div className="text-[12px] font-medium text-textMain">Logo</div>
                <div className="w-10 h-10 border border-dashed border-borderSubtle rounded flex items-center justify-center text-textTertiary hover:text-textMain cursor-pointer transition-colors">
                   <span className="text-[9px]">Upload</span>
                </div>
             </div>
           </Card>
        </section>

        {/* Deploy Action */}
        <div className="pt-3 flex items-center justify-between border-t border-borderSubtle">
           <div className="flex items-center gap-2 text-[12px] text-textSecondary">
             <div className={`w-1.5 h-1.5 rounded-full ${deployed ? 'bg-green-500' : 'bg-yellow-500'}`} />
             Status: {deployed ? 'Live' : 'Draft'}
           </div>
           <Button variant="primary" onClick={() => setDeployed(true)} disabled={deployed} size="lg">
             {deployed ? 'Update Changes' : 'Deploy to Production'}
           </Button>
        </div>

        {deployed && (
          <div className="animate-fade-in space-y-3">
             <h2 className="text-[10px] uppercase tracking-wider text-textTertiary font-medium">Embed</h2>
             <div className="bg-panel border border-borderSubtle rounded-lg p-3">
                <div className="flex justify-between items-start mb-1.5">
                   <div className="flex items-center gap-2 text-textMain font-medium text-[12px]">
                      <Code size={12} /> script.js
                   </div>
                   <Button size="sm" variant="ghost" icon={<Copy size={10} />}>Copy</Button>
                </div>
                <code className="block text-[11px] text-textSecondary font-mono leading-relaxed">
                   &lt;script src="https://cdn.cleanfunnels.com/v1/widget.js" data-id="cf_8x92k2"&gt;&lt;/script&gt;
                </code>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};
