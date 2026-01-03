
export type ProjectStage = 'Concept' | 'MVP' | 'Alpha' | 'Beta' | 'Live' | 'Maintenance' | 'On Hold';
export type ProjectStatus = 'Active' | 'Blocked' | 'Completed' | 'Planning';

export interface Project {
  id: string;
  name: string;
  description: string;
  path: string; // File system path relative to workspace root or absolute
  stage: ProjectStage;
  status: ProjectStatus;
  nextStep: string;
  lastUpdated: string; // ISO Date string
  tags: string[];
  port?: number; // If it runs locally
}

export const projects: Project[] = [
  {
    id: 'pomelatform',
    name: 'Pomelatform',
    description: 'The central studio management dashboard handling projects, RBAC, and future TON integration.',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Pomelatform',
    stage: 'MVP',
    status: 'Active',
    nextStep: 'Implement Projects Dashboard and RBAC views',
    lastUpdated: new Date().toISOString(),
    tags: ['Next.js', 'Supabase', 'Dashboard'],
    port: 3000
  },
  {
    id: 'byblos',
    name: 'Byblos.digital',
    description: 'VC newsletter aggregator with "My Feed" and personalized settings.',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Byblos',
    stage: 'Alpha',
    status: 'Active',
    nextStep: 'Enhance Feed algorithms and Settings page preferences',
    lastUpdated: '2025-12-31T21:02:50Z',
    tags: ['Next.js', 'Content Aggregation', 'SaaS'],
    port: 3001
  },
  {
    id: 'arenaflow',
    name: 'ArenaFlow',
    description: 'Co-creation platform for pairwise voting and idea prioritization.',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/ArenaFlow',
    stage: 'MVP',
    status: 'Active',
    nextStep: 'Finalize MVP setup and session logic',
    lastUpdated: '2026-01-01T12:46:48Z',
    tags: ['Next.js', 'Supabase', 'Gamification'],
    port: 3002
  },
  {
    id: 'new-vsme',
    name: 'New VSME',
    description: 'Next-generation sustainability reporting tool aligned with EUR-Lex C/2025/1710.',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/new-vsme',
    stage: 'Alpha',
    status: 'Active',
    nextStep: 'Complete XBRL integration and repeatable groups logic',
    lastUpdated: '2026-01-03T00:26:10Z',
    tags: ['Next.js', 'ESG', 'XBRL'],
    port: 3003
  },
  {
    id: 'suomivalidator',
    name: 'SuomiValidator',
    description: 'Finnish market validation tool using StatFin and Reddit data.',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/suomivalidator',
    stage: 'Live',
    status: 'Active',
    nextStep: 'Implement real StatFin data and MVP Builder AI',
    lastUpdated: '2026-01-03T15:22:04Z',
    tags: ['Next.js', 'AI', 'Data Analysis'],
    port: 3004
  },
  {
    id: 'greenlight',
    name: 'Greenlight',
    description: 'Trustless TON bounty platform with Telegram Mini App frontend.',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Greenlight',
    stage: 'Concept',
    status: 'Planning',
    nextStep: 'Frontend TMA implementation using React/Vite',
    lastUpdated: '2026-01-02T15:03:01Z',
    tags: ['TON', 'Blockchain', 'TMA'],
  },
  {
    id: 'executesg',
    name: 'ExecutESG (Legacy)',
    description: 'Original VSME implementation, currently being maintained while New VSME is built.',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/vsme',
    stage: 'Maintenance',
    status: 'Active',
    nextStep: 'Maintain stability and critical fixes',
    lastUpdated: '2026-01-03T14:20:32Z',
    tags: ['Laravel', 'Legacy', 'ESG'],
  },
  {
    id: 'pomegroup-website',
    name: 'Pomegroup Website',
    description: 'Main corporate website and landing page.',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/pomegroup-website',
    stage: 'Live',
    status: 'Completed',
    nextStep: 'Routine content updates',
    lastUpdated: '2026-01-01T11:12:07Z',
    tags: ['Next.js', 'Marketing'],
  }
];
