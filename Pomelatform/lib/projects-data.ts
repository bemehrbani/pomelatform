
// Force update
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
  fullDescription?: string; // Longer text for detail page
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
  showcaseImage?: string;
  logo?: string;
  screenshot?: string;
}

const defaultTeam: TeamMember[] = [
  { name: 'Mahdi Farimani', role: 'Founder/Lead' },
  { name: 'AI Assistant', role: 'Co-Pilot' }
];

const momisTeam: TeamMember[] = [
  { name: 'Mahdi Farimani', role: 'Lead Developer' },
  { name: 'Onton Partner', role: 'Strategic Partner' }
];

const charityTeam: TeamMember[] = [
  { name: 'Mahdi Farimani', role: 'Technical Lead' },
  { name: 'Darolekram Institute', role: 'Organizer' }
];

export const projects: Project[] = [
  // --- Current Live Projects ---
  {
    id: 'onton-live',
    name: 'Onton.live',
    description: 'AI-powered visual discovery platform for furniture and home decor shopping.',
    fullDescription: 'Onton.live is an AI-powered online shopping platform primarily focused on furniture and home decor. It simplifies the online shopping experience using neurosymbolic AI to aggregate product data and enable natural language or image-based search. Key features include "Imagine" and "Surfaces" for visualizing user-defined styles on an interactive canvas.',
    type: 'Current',
    stage: 'Live',
    status: 'Active',
    url: 'https://onton.live',
    logo: 'https://www.google.com/s2/favicons?domain=onton.live&sz=128',
    screenshot: 'https://image.thum.io/get/width/1200/crop/600/https://onton.live',
    team: defaultTeam,
    tags: ['Neurosymbolic AI', 'E-commerce', 'Visual Search', 'React'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'executesg-dma',
    name: 'ExecutESG (DMA SaaS)',
    description: 'AI-driven Sustainable Decision Support System for Double Materiality Assessment.',
    fullDescription: 'ExecutESG provides a Sustainable Decision Support System (DSS) to help enterprises integrate ESG strategy into actionable commitments. It features an AI-powered Double Materiality Assessment (DMA) tool that assesses financial risks and impact, complying with CSRD and ESRS standards. The platform uses a bottom-up methodology to build auditable consensus among stakeholders.',
    type: 'Current',
    stage: 'Live',
    status: 'Active',
    url: 'https://executesg.com',
    logo: 'https://www.google.com/s2/favicons?domain=executesg.com&sz=128',
    screenshot: 'https://image.thum.io/get/width/1200/crop/600/https://executesg.com',
    team: defaultTeam,
    tags: ['SaaS', 'AI', 'ESG', 'Compliance', 'CSRD'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'executesg-vsme',
    name: 'ExecutESG (Generic VSME)',
    description: 'Voluntary SME standard reporting tool for sustainability compliance.',
    fullDescription: 'A modular add-on to the ExecutESG ecosystem, specifically designed for Voluntary SME (VSME) reporting. It simplifies the complex requirements of sustainability reporting for smaller enterprises, ensuring alignment with European standards.',
    type: 'Current',
    stage: 'Live',
    status: 'Active',
    url: 'https://executesg.com',
    logo: 'https://www.google.com/s2/favicons?domain=executesg.com&sz=128',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/vsme',
    team: defaultTeam,
    tags: ['Laravel', 'VSME', 'Reporting', 'Legacy'],
    lastUpdated: '2026-01-03T14:20:32Z'
  },
  {
    id: 'byblos',
    name: 'Byblos.digital',
    description: 'VC newsletter aggregator with "My Feed" and personalized settings.',
    fullDescription: 'Byblos.digital is a comprehensive aggregator for Venture Capital newsletters. It features a "My Feed" algorithm that curates content based on user preferences and allows for personalized reading settings. The platform aims to stream the flow of VC insights into a single, manageable dashboard.',
    type: 'Current',
    stage: 'Live',
    status: 'Active',
    url: 'https://byblos.digital',
    logo: 'https://www.google.com/s2/favicons?domain=byblos.digital&sz=128',
    screenshot: '/images/byblos-showcase.png',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Byblos',
    team: defaultTeam,
    tags: ['Laravel/Livewire', 'Content Aggregation', 'SaaS', 'Tailwind'],
    lastUpdated: '2025-12-31T21:02:50Z'
  },
  {
    id: 'momis-studio',
    name: 'Momis.studio',
    description: 'Web3 innovations lab focused on TON blockchain and Telegram Mini-Apps.',
    fullDescription: 'MOMIS studio specializes in creating innovative software and games for the Web3 ecosystem. It focuses on Telegram Mini-App Development and TON Blockchain Integration, aiming to redefine digital interaction. Key projects include partnerships with ONTON for Web3 event management.',
    type: 'Current',
    stage: 'Live',
    status: 'Active',
    url: 'https://momis.studio',
    logo: 'https://www.google.com/s2/favicons?domain=momis.studio&sz=128',
    screenshot: 'https://image.thum.io/get/width/1200/crop/600/https://momis.studio',
    team: momisTeam,
    tags: ['Web3', 'TON', 'Telegram', 'GameFi'],
    lastUpdated: new Date().toISOString()
  },

  // --- New MVP Projects ---
  {
    id: 'pomelatform',
    name: 'Pomelatform',
    description: 'The central command center for the Pomegroup studio ecosystem.',
    fullDescription: 'Pomelatform is the studio management dashboard handling projects, Role-Based Access Control (RBAC), and future TON blockchain integration for the Pomegroup. It serves as the unified interface for managing the diverse portfolio of SaaS, Web3, and ESG projects.',
    type: 'MVP',
    stage: 'MVP',
    status: 'Active',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Pomelatform',
    nextStep: 'Implement Detail Pages and RBAC views',
    team: defaultTeam,
    tags: ['Next.js', 'Supabase', 'Dashboard', 'Internal Tool'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'arenaflow',
    name: 'ArenaFlow',
    description: 'Co-creation platform for pairwise voting and idea prioritization.',
    fullDescription: 'ArenaFlow is a gamified decision-making platform that uses pairwise voting algorithms to help teams prioritize ideas effectively. It facilitates "Arenas" where participants vote on options A vs B, resulting in a ranked list of consensus-driven priorities.',
    type: 'MVP',
    stage: 'MVP',
    status: 'Active',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/ArenaFlow',
    nextStep: 'Finalize MVP setup and session logic',
    team: defaultTeam,
    tags: ['Next.js', 'Gamification', 'Voting', 'Supabase'],
    lastUpdated: '2026-01-01T12:46:48Z'
  },
  {
    id: 'infragreen',
    name: 'InfraGreen',
    description: 'Sustainability infrastructure reporting and tracking.',
    fullDescription: 'InfraGreen is a new initiative focused on tracking and reporting sustainability metrics for physical infrastructure projects. It aims to provide transparency and compliance tools for green construction and development.',
    type: 'MVP',
    stage: 'MVP',
    status: 'Planning',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/infragreen',
    team: defaultTeam,
    tags: ['Green Tech', 'Infrastructure', 'Reporting'],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'new-vsme',
    name: 'New VSME',
    description: 'Next-generation sustainability reporting tool aligned with EUR-Lex C/2025/1710.',
    fullDescription: 'The "New VSME" is a complete rewrite of the sustainability reporting tool, aligned 100% with the EUR-Lex C/2025/1710 standard. It features a modern Next.js 16 architecture, XBRL integration for digital reporting, and a streamlined wizard interface.',
    type: 'MVP',
    stage: 'Alpha',
    status: 'Active',
    path: '/Users/mahdifarimani/Documents/AntiGravity/ExecutESG/new-vsme',
    nextStep: 'Complete XBRL integration',
    team: defaultTeam,
    tags: ['Next.js', 'ESG', 'XBRL', 'Compliance'],
    lastUpdated: '2026-01-03T00:26:10Z'
  },
  {
    id: 'greenlight',
    name: 'Greenlight',
    description: 'Trustless TON bounty platform with Telegram Mini App frontend.',
    fullDescription: 'Greenlight is a decentralized platform built on the TON blockchain that allows for trustless bounties. Developers can submit work via a Telegram Mini App (TMA), and verified completion triggers automatic payment via smart contracts.',
    type: 'MVP',
    stage: 'Concept',
    status: 'Planning',
    path: '/Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Greenlight',
    team: momisTeam,
    tags: ['TON', 'Smart Contracts', 'Telegram', 'React'],
    lastUpdated: '2026-01-02T15:03:01Z'
  },

  // --- Past Projects ---
  {
    id: 'bemehrbani',
    name: 'Bemehrbani.com',
    description: 'Online charity platform preventing student dropouts.',
    fullDescription: 'Bemehrbani.com is an online charity platform established by the Darolekram charity institute. Launched in 2014, its mission is to prevent students from dropping out of school due to financial hardships. The platform connects sponsors with talented students in need, facilitating transparency and direct support.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://bemehrbani.com',
    logo: 'https://www.google.com/s2/favicons?domain=bemehrbani.com&sz=128',
    screenshot: 'https://image.thum.io/get/width/1200/crop/600/https://bemehrbani.com',
    team: charityTeam,
    tags: ['Charity', 'Social Impact', 'Crowdfunding', 'PHP'],
    lastUpdated: '2024-01-01T00:00:00Z'
  },
  {
    id: 'dadpardaz',
    name: 'DadPardaz.com',
    description: 'Legal tech marketplace connecting clients with lawyers.',
    fullDescription: 'DadPardaz is a legal tech platform bridging the gap between individuals ("Dadkhah") and legal professionals ("Dadfaran"). It features an online service marketplace, secure escrow payments, and professional profiles, simplifying access to legal services in Iran.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://dadpardaz.com',
    logo: 'https://www.google.com/s2/favicons?domain=dadpardaz.com&sz=128',
    screenshot: 'https://image.thum.io/get/width/1200/crop/600/https://dadpardaz.com',
    team: defaultTeam,
    tags: ['LegalTech', 'Marketplace', 'Escrow System'],
    lastUpdated: '2023-01-01T00:00:00Z'
  },
  {
    id: 'hrcando',
    name: 'HRCando.ir',
    description: 'Comprehensive HR training and management platform.',
    fullDescription: 'HRCando (Kandoo) is a human resources software platform offering solutions for employee training management and development. It integrates with Maktabkhooneh to provide access to over 30,000 hours of content and includes an Applicant Tracking System (ATS).',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://hrcando.ir',
    logo: 'https://www.google.com/s2/favicons?domain=hrcando.ir&sz=128',
    screenshot: 'https://image.thum.io/get/width/1200/crop/600/https://hrcando.ir',
    team: defaultTeam,
    tags: ['HR Tech', 'LMS', 'ATS', 'Enterprise'],
    lastUpdated: '2023-06-01T00:00:00Z'
  },
  {
    id: 'tafarda',
    name: 'Tafarda.studio',
    description: 'Investment and startup studio focused on innovation.',
    fullDescription: 'Associated with "Tadbir Entekhab Farda", this studio focuses on financial and startup investment. The internal "Studio Team" handles marketing, branding, and product development for portfolio companies, including high-profile rebranding projects.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://tafarda.studio',
    logo: 'https://www.google.com/s2/favicons?domain=tafarda.studio&sz=128',
    screenshot: 'https://image.thum.io/get/width/1200/crop/600/https://tafarda.studio',
    team: defaultTeam,
    tags: ['Venture Studio', 'Branding', 'Investment'],
    lastUpdated: '2022-01-01T00:00:00Z'
  },
  {
    id: 'mehrbaran',
    name: 'Mehrbaran.org',
    description: 'Virtual platform for cultural and student charity festivals.',
    fullDescription: 'Mehrbaran functions as a virtual base for supporting the deprived, primarily through the "Mehrbaran Festival". It organizes student and cultural events promoting themes of charity, Jihadi culture, and deprivation removal.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://mehrbaran.org',
    logo: 'https://www.google.com/s2/favicons?domain=mehrbaran.org&sz=128',
    screenshot: 'https://image.thum.io/get/width/1200/crop/600/https://mehrbaran.org',
    team: charityTeam,
    tags: ['Non-Profit', 'Event Management', 'Cultural'],
    lastUpdated: '2022-01-01T00:00:00Z'
  },
  {
    id: 'challenquiz',
    name: 'Challenquiz.online',
    description: 'Competitive online trivia and quiz platform.',
    fullDescription: 'A dedicated platform for hosting real-time competitive quizzes and trivia games. Designed to engage users through gamified knowledged testing and leaderboards.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://challenquiz.online',
    logo: 'https://www.google.com/s2/favicons?domain=challenquiz.online&sz=128',
    screenshot: 'https://image.thum.io/get/width/1200/crop/600/https://challenquiz.online',
    team: defaultTeam,
    tags: ['Gaming', 'Quiz', 'Real-time'],
    lastUpdated: '2021-01-01T00:00:00Z'
  },
  {
    id: 'nlp-contest',
    name: 'NLP Contest',
    description: 'Telegram-based Natural Language Processing contest entry.',
    fullDescription: 'An innovative NLP solution developed for the Telegram Data Clustering Contest. Involved creating algorithms for language detection, news clustering, and topic categorization within the Telegram ecosystem.',
    type: 'Past',
    stage: 'Archived',
    status: 'Completed',
    url: 'https://t.me/nlpcontest',
    logo: 'https://www.google.com/s2/favicons?domain=telegram.org&sz=128',
    screenshot: 'https://image.thum.io/get/width/1200/crop/600/https://telegram.org',
    team: defaultTeam,
    tags: ['AI', 'NLP', 'C++', 'Telegram API'],
    lastUpdated: '2020-01-01T00:00:00Z'
  }
];
