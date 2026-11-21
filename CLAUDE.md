# CLAUDE.md

> **Operating Guide for AI Coding Agents (Antigravity, Claude Code, Cursor)**  
> **Entity:** Smart Monshi Oy / Pomegroup Studio (Helsinki, Finland)

---

## 1. Master Context Layer (Start Here)

Before planning or executing tasks, consult the centralized [`context/`](context/) directory:
* **Company Profile & Founder History:** [`context/00_COMPANY_PROFILE.md`](context/00_COMPANY_PROFILE.md) *(Note: DadPardaz is exited & archived as of Oct 2026)*
* **Venture Builder Model & Commercials:** [`context/01_BUSINESS_MODEL.md`](context/01_BUSINESS_MODEL.md)
* **Active Portfolio, Paying Clients & Exited Projects:** [`context/02_PORTFOLIO_DIRECTORY.md`](context/02_PORTFOLIO_DIRECTORY.md)
* **Canonical Tech Stacks & Quality Rules:** [`context/03_TECH_STACK_ARCHITECTURE.md`](context/03_TECH_STACK_ARCHITECTURE.md)
* **Operational Playbooks & Finnish Compliance:** [`context/04_OPERATIONAL_PLAYBOOKS.md`](context/04_OPERATIONAL_PLAYBOOKS.md)
* **Business Finland Sprint KB:** [`context/05_BUSINESS_FINLAND_SPRINT_KB.md`](context/05_BUSINESS_FINLAND_SPRINT_KB.md)
* **Context Sitemap:** [`context/INDEX.md`](context/INDEX.md)

---

## 2. Repository Separation Rule (HQ Control Plane)

* **Root Git Repo (`bemehrbani/pomelatform.git`):** Tracks **only** `context/`, `scripts/`, `README.md`, `CLAUDE.md`, and `.gitignore`.
* **Blanket Exclusions:** `Projects/`, `pomegroup-website/`, `archive/`, `internship_program/`, and `co-founders-pool/` are completely excluded from root Git tracking. Never force-add (`git add -f`) nested projects or client documents into the root repository.

---

## 3. Active Workspace Reference (`Projects/` & `pomegroup-website/`)

| Directory | Category | Stack / Scope | Status |
| :--- | :--- | :--- | :--- |
| **`context/`** | Studio Knowledge Base | Markdown architecture & business playbooks | **Canonical Single Source of Truth** |
| **`pomegroup-website/`** | Studio Web Portal | Next.js 16, React 19, TypeScript, Tailwind CSS (`PomeGroup/pomegroup-website.git`) | Active |
| **`Projects/FelixGuide/`** | MedTech / Dental OS | Next.js, Speech AI, Computer Vision (`FelixGuide/felixguide.git`) | Active (€200k Pre-Seed) |
| **`Projects/rhinograph/`** | Paying CaaS Client | Non-software Finnish PRH incorporation, local proxy & Vero tax SLA (€300/mo) | **Active Paying Customer (Investigate Upsell)** |
| **`Projects/Aril/`** | Sales Enablement SaaS | AI-Native Digital Sales Rooms (DeepSeek + ExecutESG playbooks) | Active |
| **`Projects/PlantFactory/`** | AgTech Data Room | Grafted Seedlings Plant Factory (`$2M` investor data room & unit economics) | Active |
| **`Projects/Expertshub/`** | Industrial AI Marketplace | Next.js 15, React 19, TypeScript (`bemehrbani/expertshub.git`) | Active |
| **`Projects/Headhunting/`** | Recruitment Ops | Hipped platform role scanning, CV screening & candidate endorsements | Active |
| **`Projects/Advenshare/`** | Full-Stack Platform | Laravel backend + web frontend (nested GitLab repos) | Active |
| **`Projects/DrZeinabFarimani/`** | Clinical Portal | Periodontics & implant surgery web portal (`bemehrbani/drzfarimani.git`) | Active |
| **`Projects/MojtabaNiknam/`** | Partner Architecture | FelixGuide voice triage & ExecutESG VSME MCP/API specs | Active |
| **`Projects/PFP/`** | NGO Platform | People for Peace & Justice ry (`bemehrbani/pfp.git`, `peopleforpeace.live`) | Active |
| **`Projects/Makan_Ry/`** | NGO Portal & Legal | Trilingual humanitarian association (`MakanRy/content.git`, `website.git`) | Active |
| **`Projects/appnewsir/`** | Media Pipeline | Node.js, TypeScript, SQLite news aggregation & baseline analysis | Active |
| **`archive/Projects/`** | Cold Storage | Exited (`DadPardaz`, `GhararDadPardaz`) & >2m inactive projects (17 total) | Archived |

---

## 4. Engineering Standards & Behavioral Rules

1. **Strong Typing:** Strict TypeScript only (`const` over `let`, never `any` or `var`).
2. **Production-Ready Code:** Complete, verified implementations only—never leave placeholder comments.
3. **Secrets Safety:** Never commit API keys, private keys, or tokens.
4. **Git Protocol:** Conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`). Never commit or push without explicit user permission; stage changes for review first.
5. **Strict Anti-Fabrication Directive:**
   * Never generate AI images, synthetic headshots, or fake personas for real living team members or clients.
   * Never invent or guess personal URLs, social media links, or contact numbers.
   * Search sibling project directories and `archive/` on disk before assuming any asset is missing.
6. **Strict Confidentiality:** Never disclose or include `Projects/Nehzat Zakria/` or `co-founders-pool/` in any public-facing website, pitch, or external document.
