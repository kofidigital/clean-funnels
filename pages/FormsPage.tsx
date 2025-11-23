
import React from 'react';
import { Page } from '../types';
import { Button, Badge } from '../components/UIComponents';
import { Plus, MessageSquare, Clock } from 'lucide-react';

export const FormsPage: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
  return (
    <div className="p-8 max-w-[1100px] mx-auto animate-in fade-in duration-500">
       <div className="flex justify-between items-end mb-8 border-b border-borderSubtle pb-4">
        <div>
          <h1 className="text-xl font-medium text-textMain tracking-tight">Intake Flows</h1>
          <p className="text-[12px] font-normal text-textSecondary mt-1">Manage your active funnels and conversion performance.</p>
        </div>
        <Button onClick={() => setPage(Page.CREATE_FORM)} variant="primary" size="md" icon={<Plus size={14} />}>
          Create Flow
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Active Form Card - Object Style */}
        <div onClick={() => setPage(Page.FLOW_OVERVIEW)} className="bg-surface group rounded-lg border border-borderSubtle shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-borderHighlight relative overflow-hidden cursor-pointer h-[180px] flex flex-col">
           
           {/* Header */}
           <div className="p-5 pb-0 flex justify-between items-start z-10">
              <div className="w-8 h-8 bg-surfaceHighlight rounded-md border border-borderHighlight flex items-center justify-center shadow-inner">
                 <MessageSquare size={14} className="text-textMain" />
              </div>
              <Badge variant="success">Active</Badge>
           </div>
           
           {/* Content */}
           <div className="p-5 flex-1 flex flex-col z-10">
             <h3 className="text-[14px] font-medium text-textMain mb-0.5 group-hover:text-white transition-colors">Agency Qualification</h3>
             <p className="text-[11px] text-textTertiary">Updated 2h ago</p>
             
             <div className="mt-auto grid grid-cols-2 gap-4 pt-3 border-t border-borderSubtle">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-textTertiary font-medium block mb-0.5">Conv. Rate</span>
                  <span className="text-[13px] text-textMain font-medium">12.4%</span>
                </div>
                 <div>
                  <span className="text-[10px] uppercase tracking-wider text-textTertiary font-medium block mb-0.5">Volume</span>
                  <span className="text-[13px] text-textMain font-medium">142</span>
                </div>
             </div>
           </div>
           
           {/* Hover Shine */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Draft Form Card */}
        <div className="bg-surface group rounded-lg border border-borderSubtle shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-borderHighlight relative overflow-hidden cursor-pointer h-[180px] flex flex-col opacity-75 hover:opacity-100">
           <div className="p-5 pb-0 flex justify-between items-start z-10">
              <div className="w-8 h-8 bg-surfaceHighlight rounded-md border border-borderHighlight flex items-center justify-center shadow-inner">
                 <Clock size={14} className="text-textTertiary" />
              </div>
              <Badge variant="orange">Draft</Badge>
           </div>
           
           <div className="p-5 flex-1 flex flex-col z-10">
             <h3 className="text-[14px] font-medium text-textMain mb-0.5">Enterprise Demo v2</h3>
             <p className="text-[11px] text-textTertiary">Edited 5m ago</p>
             
             <div className="mt-auto grid grid-cols-2 gap-4 pt-3 border-t border-borderSubtle">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-textTertiary font-medium block mb-0.5">Conv. Rate</span>
                  <span className="text-[13px] text-textSecondary font-medium">—</span>
                </div>
                 <div>
                  <span className="text-[10px] uppercase tracking-wider text-textTertiary font-medium block mb-0.5">Volume</span>
                  <span className="text-[13px] text-textSecondary font-medium">—</span>
                </div>
             </div>
           </div>
        </div>

         {/* Add New Card */}
         <button 
            onClick={() => setPage(Page.CREATE_FORM)}
            className="border border-dashed border-borderSubtle rounded-lg flex flex-col items-center justify-center gap-3 hover:bg-surfaceHighlight/20 hover:border-borderHighlight transition-all group h-[180px]"
         >
            <div className="w-10 h-10 rounded-full bg-surfaceHighlight flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-borderSubtle">
               <Plus size={16} className="text-textSecondary group-hover:text-textMain" />
            </div>
            <span className="text-[12px] font-medium text-textSecondary group-hover:text-textMain transition-colors">Create New Flow</span>
         </button>

      </div>
    </div>
  );
};
