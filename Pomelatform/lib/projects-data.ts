
export type ProjectStage = 'Concept' | 'MVP' | 'Alpha' | 'Beta' | 'Live' | 'Maintenance' | 'On Hold' | 'Archived';
export type ProjectStatus = 'Active' | 'Blocked' | 'Completed' | 'Planning';
export type ProjectType = 'Past' | 'Current' | 'MVP';

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string; // Initials or URL
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  stage: ProjectStage;
  status: ProjectStatus;
  url?: string;
  repo?: string;
  path?: string; // Local path
  nextStep?: string;
  team: TeamMember[];
  tags: string[];
  lastUpdated: string;
}

const defaultTeam: TeamMember[] = [
  { name: 'Mahdi Farimani', role: 'Founder/Lead' },
  { name: 'AI Assistant', role: 'Co-Pilot' }
];

export const projects: Project[] = [
  // --- Current Live Projects ---
  {
    id: 'onton-live',
    name: 'Onton.live',
    description: 'Real-time ontology and data visualization platform.',
    type: 'Current',
    stage: 'Live',
    status: 'Active',
    url: 'https://onton.live',
    team: defaultTeam,
    tags: ['Data Viz', 'SaaS', 'Live'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'executesg-dma',
    name: 'ExecutESG (DMA SaaS)',
    description: 'Digital Markets Act compliance and reporting tool for enterprises.',
    type: 'Current',
    stage: 'Live',
    status: 'Active',
    url: 'https://executesg.com',
    team: defaultTeam,
    tags: ['SaaS', 'Compliance', 'DMA'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'executesg-vsme',
    name: 'ExecutESG (Generic VSME)',
    description: 'Voluntary SME standard for sustainability reporting (Legacy/Stable).',
    type: 'Current',
    stage: 'Live',
    status: 'Active',
    url: 'https://executesg.com',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/vsme',
    team: defaultTeam,
    tags: ['ESG', 'VSME', 'Legacy'],
    lastUpdated: '2026-01-03T14:20:32Z'
  },
  {
    id: 'byblos',
    name: 'Byblos.digital',
    description: 'VC newsletter aggregator with "My Feed" and personalized settings.',
    type: 'Current',
    stage: 'Live',
    status: 'Active',
    url: 'https://byblos.digital',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Byblos',
    team: defaultTeam,
    tags: ['Next.js', 'Aggregator', 'SaaS'],
    lastUpdated: '2025-12-31T21:02:50Z'
  },
  {
    id: 'momis-studio',
    name: 'Momis.studio',
    description: 'Creative studio portfolio and booking platform.',
    type: 'Current',
    stage: 'Live',
    status: 'Active',
    url: 'https://momis.studio',
    team: defaultTeam,
    tags: ['Portfolio', 'Design'],
    lastUpdated: new Date().toISOString()
  },

  // --- New MVP Projects ---
  {
    id: 'pomelatform',
    name: 'Pomelatform',
    description: 'Central studio management dashboard handling projects, RBAC, and future TON integration.',
    type: 'MVP',
    stage: 'MVP',
    status: 'Active',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Pomelatform',
    nextStep: 'Implement Detail Pages and RBAC views',
    team: defaultTeam,
    tags: ['Next.js', 'Dashboard', 'Internal Tool'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'arenaflow',
    name: 'ArenaFlow',
    description: 'Co-creation platform for pairwise voting and idea prioritization.',
    type: 'MVP',
    stage: 'MVP',
    status: 'Active',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/ArenaFlow',
    nextStep: 'Finalize MVP setup and session logic',
    team: defaultTeam,
    tags: ['Next.js', 'Gamification', 'Voting'],
    lastUpdated: '2026-01-01T12:46:48Z'
  },
  {
    id: 'infragreen',
    name: 'InfraGreen',
    description: 'Sustainability infrastructure reporting and tracking.',
    type: 'MVP',
    stage: 'MVP',
    status: 'Planning',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/infragreen',
    team: defaultTeam,
    tags: ['Green Tech', 'Infrastructure'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'new-vsme',
    name: 'New VSME',
    description: 'Next-generation sustainability reporting aligned with EUR-Lex C/2025/1710.',
    type: 'MVP',
    stage: 'Alpha',
    status: 'Active',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/new-vsme',
    nextStep: 'Complete XBRL integration',
    team: defaultTeam,
    tags: ['Next.js', 'ESG', 'XBRL'],
    lastUpdated: '2026-01-03T00:26:10Z'
  },
  {
    id: 'greenlight',
    name: 'Greenlight',
    description: 'Trustless TON bounty platform with Telegram Mini App frontend.',
    type: 'MVP',
    stage: 'Concept',
    status: 'Planning',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Greenlight',
    team: defaultTeam,
    tags: ['TON', 'Blockchain', 'TMA'],
    lastUpdated: '2026-01-02T15:03:01Z'
  },

  // --- Past Projects ---
  {
    id: 'bemehrbani',
    name: 'Bemehrbani.com',
    description: 'Charity and kindness promotion platform.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://bemehrbani.com',
    team: defaultTeam,
    tags: ['Charity', 'Social'],
    lastUpdated: '2024-01-01T00:00:00Z'
  },
  {
    id: 'dadpardaz',
    name: 'DadPardaz.com',
    description: 'Legal tech platform for lawyer consultation.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://dadpardaz.com',
    team: defaultTeam,
    tags: ['LegalType', 'Marketplace'],
    lastUpdated: '2023-01-01T00:00:00Z'
  },
  {
    id: 'hrcando',
    name: 'HRCando.ir',
    description: 'Human resources management and training portal.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://hrcando.ir',
    team: defaultTeam,
    tags: ['HR', 'EduTech'],
    lastUpdated: '2023-06-01T00:00:00Z'
  },
  {
    id: 'tafarda',
    name: 'Tafarda.studio',
    description: 'Digital design and development agency site.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://tafarda.studio',
    team: defaultTeam,
    tags: ['Agency', 'Portfolio'],
    lastUpdated: '2022-01-01T00:00:00Z'
  },
  {
    id: 'mehrbaran',
    name: 'Mehrbaran.org',
    description: 'Non-profit organization website.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://mehrbaran.org',
    team: defaultTeam,
    tags: ['NGO', 'Charity'],
    lastUpdated: '2022-01-01T00:00:00Z'
  },
  {
    id: 'challenquiz',
    name: 'Challenquiz.online',
    description: 'Competitive quiz and trivia platform.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://challenquiz.online',
    team: defaultTeam,
    tags: ['Gaming', 'Quiz'],
    lastUpdated: '2021-01-01T00:00:00Z'
  },
  {
    id: 'nlp-contest',
    name: 'NLP Contest',
    description: 'Telegram-based Natural Language Processing contest entry.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://t.me/nlpcontest',
    team: defaultTeam,
    tags: ['AI', 'NLP', 'Telegram'],
    lastUpdated: '2020-01-01T00:00:00Z'
  }
];
