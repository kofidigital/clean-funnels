
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { OnboardingModal } from './components/OnboardingModal';
import { Page } from './types';
import { FormsPage } from './pages/FormsPage';
import { CreateFormPage } from './pages/CreateForm';
import { PublishPage } from './pages/PublishPage';
import { ClientPreviewPage } from './pages/ClientPreview';
import { LeadsPage, LeadProfilePage } from './pages/LeadsPage';
import { SettingsPage } from './pages/Settings';
import { FlowOverviewPage } from './pages/FlowOverviewPage';

const App: React.FC = () => {
  // Default to CREATE_FORM as the "Home" per requirements
  const [currentPage, setCurrentPage] = useState<Page>(Page.CREATE_FORM);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  if (currentPage === Page.CLIENT_PREVIEW) {
    return <ClientPreviewPage onClose={() => setCurrentPage(Page.CREATE_FORM)} />;
  }

  return (
    <div className="flex h-screen w-screen bg-page text-textMain font-sans antialiased selection:bg-textMain selection:text-page overflow-hidden">
      
      <Sidebar activePage={currentPage} setPage={setCurrentPage} />

      <main className="flex-1 h-full overflow-hidden relative flex flex-col">
        <div className="relative flex-1 z-10 overflow-y-auto custom-scrollbar">
            {currentPage === Page.FORMS && <FormsPage setPage={setCurrentPage} />}
            {currentPage === Page.CREATE_FORM && <CreateFormPage setPage={setCurrentPage} />}
            {currentPage === Page.FLOW_OVERVIEW && <FlowOverviewPage setPage={setCurrentPage} />}
            {currentPage === Page.PUBLISH && <PublishPage setPage={setCurrentPage} />}
            
            {/* Pass lead selection handlers */}
            {currentPage === Page.LEADS && (
              <LeadsPage 
                setPage={setCurrentPage} 
                onSelectLead={setSelectedLeadId} 
              />
            )}
            
            {currentPage === Page.LEAD_PROFILE && (
              <LeadProfilePage 
                setPage={setCurrentPage} 
                leadId={selectedLeadId || undefined} 
              />
            )}
            
            {currentPage === Page.SETTINGS && <SettingsPage />}
        </div>
      </main>

      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}

    </div>
  );
};

export default App;
