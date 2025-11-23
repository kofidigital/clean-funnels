
import React from 'react';
import { Plus, LayoutGrid, Users, Settings, Disc } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  setPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setPage }) => {
  const NavItem = ({ page, icon: Icon, label }: { page: Page; icon: any; label: string }) => {
    // Forms/Create/Publish are all part of the "Builder" flow visually
    const isBuilderActive = (page === Page.CREATE_FORM) && (activePage === Page.CREATE_FORM || activePage === Page.PUBLISH);
    const isActive = activePage === page || isBuilderActive || (activePage === Page.LEAD_PROFILE && page === Page.LEADS);
    
    return (
      <button
        onClick={() => setPage(page)}
        className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 group relative ${
          isActive 
            ? 'bg-surface text-textMain shadow-glass' 
            : 'text-textTertiary hover:text-textMain hover:bg-surface/50'
        }`}
        title={label}
      >
        <Icon size={16} strokeWidth={1.5} />
        {/* Tooltip on hover */}
        <div className="absolute left-10 px-2 py-1 bg-surface border border-borderSubtle rounded text-[10px] text-textMain opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-card">
          {label}
        </div>
      </button>
    );
  };

  return (
    <div className="w-12 h-screen border-r border-borderSubtle flex flex-col items-center py-5 bg-page z-50">
      <div className="mb-6">
        <div className="w-7 h-7 rounded-full bg-textMain flex items-center justify-center text-page shadow-glow">
           <Disc size={14} />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 w-full items-center">
        <NavItem page={Page.CREATE_FORM} icon={Plus} label="Create" />
        <NavItem page={Page.FORMS} icon={LayoutGrid} label="Library" />
        <NavItem page={Page.LEADS} icon={Users} label="Leads" />
        <div className="mt-auto">
           <NavItem page={Page.SETTINGS} icon={Settings} label="Settings" />
        </div>
      </div>
      
      <div className="pt-5 w-full flex justify-center">
         <div className="w-7 h-7 rounded-full bg-panel border border-borderSubtle flex items-center justify-center text-[9px] text-textSecondary font-medium">
            JD
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
