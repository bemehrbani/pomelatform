# Pomegroup Studio — HQ Control Plane

> **Autonomous Venture Builder Studio & Multi-Project Workspace**  
> **Company:** Smart Monshi Oy (Trade Name: Pomegroup Studio)  
> **Domicile:** Helsinki, Finland (Business ID: `3370210-5`)  
> **Website:** [https://pomegroup.studio](https://pomegroup.studio)

---

## Master Context Layer

For the canonical single source of truth on company identity, venture builder commercial mechanics, active ventures, paying retainer accounts, tech stacks, and Finnish regulatory playbooks, consult [`context/`](context/):

| Document | Purpose |
| :--- | :--- |
| **[`context/INDEX.md`](context/INDEX.md)** | Sitemap & AI Agent Quick-Start Guide |
| **[`context/00_COMPANY_PROFILE.md`](context/00_COMPANY_PROFILE.md)** | Legal identity, Y-tunnus, origin story, founder track record (incl. exited ventures) |
| **[`context/01_BUSINESS_MODEL.md`](context/01_BUSINESS_MODEL.md)** | "Second Co-Founder as a Service", equity + CaaS retainer mechanics |
| **[`context/02_PORTFOLIO_DIRECTORY.md`](context/02_PORTFOLIO_DIRECTORY.md)** | Active ventures, paying retainer customers (`rhinograph`), upsell targets, and archived/exited portfolio |
| **[`context/03_TECH_STACK_ARCHITECTURE.md`](context/03_TECH_STACK_ARCHITECTURE.md)** | Canonical tech stacks (Next.js 16, Cloudflare, Telegram Bots, Python) |
| **[`context/04_OPERATIONAL_PLAYBOOKS.md`](context/04_OPERATIONAL_PLAYBOOKS.md)** | AI agent workflows, HQ Git separation rules, and Finnish PRH/Vero compliance |
| **[`context/05_BUSINESS_FINLAND_SPRINT_KB.md`](context/05_BUSINESS_FINLAND_SPRINT_KB.md)** | Business Finland Sprint Funding grant rules, budgeting, and compliance |

---

## Workspace Architecture

The root Git repository (`bemehrbani/pomelatform.git`) acts strictly as a lightweight **HQ Control Plane**, tracking only `context/`, `scripts/`, `README.md`, `CLAUDE.md`, and `.gitignore`. All project folders, the studio website, private partner evaluations, and cold archives are excluded via blanket `.gitignore` rules and maintain their own independent `.git` histories.

```text
Pomegroup/                           # Tracked in HQ Git (< 1 MB)
├── context/                         # Tracked: Studio single source of truth
├── scripts/                         # Tracked: Studio utilities (hermes_client.py)
├── pomegroup-website/               # Excluded (Own Git: PomeGroup/pomegroup-website)
├── co-founders-pool/                # Excluded (Private partner/founder evaluations)
├── internship_program/              # Excluded (Active growth internship workspace)
├── Projects/                        # Excluded — Active ventures & paying clients only (13)
│   ├── FelixGuide/                  #   AI Dental Operating System (€200k Pre-Seed, A-Permit)
│   ├── rhinograph/                  #   Active paying CaaS retainer client (PRH/Vero SLA — upsell target)
│   ├── Aril/                        #   AI-native Digital Sales Rooms (DSR) platform
│   ├── PlantFactory/                #   Grafted Seedlings Plant Factory ($2M investor data room)
│   ├── Expertshub/                  #   Metallurgy & materials science AI marketplace
│   ├── Headhunting/                 #   Hipped technical recruitment & endorsement operations
│   ├── Advenshare/                  #   Full-stack Laravel + web application
│   ├── DrZeinabFarimani/            #   Official clinical portal (drzfarimani.com)
│   ├── MojtabaNiknam/               #   Strategic partner & VSME/FelixGuide architecture specs
│   ├── PFP/                         #   People for Peace & Justice ry platform (peopleforpeace.live)
│   ├── Makan_Ry/                    #   Makan ry trilingual NGO portal & PRH governance
│   ├── appnewsir/                   #   Automated news aggregation & analysis service
│   └── ... (private legal)          #   Confidential workspaces excluded from public docs
└── archive/                         # Excluded — Exited & inactive (>2m) projects (archive/Projects/)
```

---

## Quick Commands

### Main Website (`pomegroup-website/`)
```bash
cd pomegroup-website
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build verification
```

### Active Projects (`Projects/<project-name>/`)
Each active codebase manages its own Git repository and dependencies independently. Refer to the `README.md`, `AGENTS.md`, or `CLAUDE.md` inside the target project directory.
