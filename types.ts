
export enum Page {
  FORMS = 'FORMS', // Acts as Library
  CREATE_FORM = 'CREATE_FORM', // Acts as Home/Canvas
  FLOW_OVERVIEW = 'FLOW_OVERVIEW', // New Dashboard for specific flow
  PUBLISH = 'PUBLISH',
  LEADS = 'LEADS',
  LEAD_PROFILE = 'LEAD_PROFILE',
  SETTINGS = 'SETTINGS',
  CLIENT_PREVIEW = 'CLIENT_PREVIEW',
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  formName: string;
  score: number;
  submittedAt: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface VisitorSession {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  first_url: string;
  referrer_url: string;
  device: string;
  region: string;
  session_duration: string;
  visitor_id: string;
}
