# Module 04: Operational Playbooks & Compliance

> **Single Source of Truth: Agent Workflows, Git Protocol, Finnish Regulatory Compliance & Deployments**  
> **Entity:** Smart Monshi Oy / Pomegroup Studio

---

## 1. AI Agent Collaboration & Operating Guidelines

Pomegroup operates with an **autonomous agent-augmented paradigm**. AI agents (Antigravity, Claude Code, subagents) act as primary engineering and research collaborators under the following operational rules:

### A. The Planning & Execution Lifecycle
1. **Research First:** For non-trivial tasks, explore files and dependencies without making destructive modifications.
2. **Implementation Plan:** Create a structured plan (`implementation_plan.md`) outlining proposed changes and verification steps. Request user review before mutating project code.
3. **Execution:** Execute changes atomically, following codebase conventions.
4. **Verification:** Test and confirm that builds compile cleanly before reporting completion.

### B. Loop Engineering Integration
* Pomegroup incorporates the **Loop Engineering** framework (archived reference at [`archive/loop-engineering/`](file:///Users/mahdifarimani/Documents/AntiGravity/Pomegroup/archive/loop-engineering/)).
* Rather than relying on single, brittle prompt interactions, complex workflows are engineered as closed feedback loops:
  * **Harness:** Establish a clear objective and budget (`loop-budget.md`).
  * **Gate:** Validate output quality automatically before exiting the loop (`gate.yaml`).
  * **Score:** Aim for high Loop-Readiness scores (100%) for automated pipelines.

---

## 2. Git & Version Control Protocol

* **HQ Control Plane Separation:** The root `Pomegroup` Git repository (`bemehrbani/pomelatform.git`) tracks **only** studio governance, `context/`, `scripts/`, `README.md`, and `CLAUDE.md`. Independent repositories and workspaces (`Projects/`, `pomegroup-website/`, `archive/`, `internship_program/`, `co-founders-pool/`) are strictly excluded via blanket `.gitignore` rules and manage their own independent `.git` histories.

* **Conventional Commits:** All commit messages must follow standard conventional commit formats:
  * `feat:` A new feature or project capability.
  * `fix:` A bug fix.
  * `refactor:` Code refactoring with no functional change.
  * `docs:` Documentation updates or context layer enhancements.
  * `chore:` Build scripts, dependency updates, configuration tweaks.
* **Atomic Commits:** One logical change per commit. Avoid massive omnibus commits.
* **Staging & Permission:** NEVER commit or push to remote repositories without explicit user permission. Always stage changes and present them for review first.
* **Sensitive Files:** Ensure `.gitignore` properly excludes `.env*`, `.DS_Store`, `node_modules/`, `__pycache__/`, and sensitive identity documents.

---

## 3. Finnish Corporate & Regulatory Compliance Playbook

Because Smart Monshi Oy operates in Finland and advises foreign founders through Rhinograph, team members and agents must understand the Finnish regulatory landscape:

### A. PRH (Patentti- ja rekisterihallitus — Finnish Patent and Registration Office)
* **Trade Register (*Kaupparekisteri*):** All official corporate changes (board members, managing director, share issues, articles of association amendments) must be filed electronically or via Y-forms (Y1 for setup, Y4 for amendments).
* **Beneficial Owners (*Tosiasialliset edunsaajat*):** Statutory requirement to register anyone holding >25% of shares or voting rights.
* **Financial Statements (*Tilinpäätös*):** Must be filed with PRH within 8 months of the end of the financial year.

### B. VERO (Verohallinto — Finnish Tax Administration)
* **Corporate Income Tax (*Yhteisövero*):** Flat rate of **20%** on net taxable profit.
* **Value Added Tax (*Arvonlisävero / ALV*):** 
  * Standard rate: **25.5%** (effective Sept 2024).
  * Monthly or quarterly VAT declarations via MyTax (*OmaVero*).
* **Prepayment Register (*Ennakkoperintärekisteri*):** Registration confirms the company pays its own taxes, exempting B2B clients from withholding tax (*ennakonpidätys*) on service invoices.
* **Employer Register (*Työnantajarekisteri*):** Required once permanent wages are paid to employees.

### C. Business Finland & ELY Centre
* **Starttiraha (TE Office):** Personal livelihood grant (€37.21/day, ~€740/mo) for full-time entrepreneurs during the initial 6–12 months.
* **Business Finland Startup Permit Statement:** Evaluates foreign startup teams on innovative business models, scalable international growth potential, and adequate runway.
* **ELY Centre Entrepreneur Permit:** Evaluates traditional business profitability and subsistence income for foreign business owners.

### D. Healthcare & Social Care (Soteri Registry)
* Relevant for ventures like **Sabar Palvelut** (`3489225-4`).
* Under the Social and Health Care Services Act (*Valvontalaki*), private social and healthcare providers must be officially registered in the **Soteri register** (maintained by Valvira and Regional State Administrative Agencies / AVI) before commencing operations.

---

## 4. Deployment & Infrastructure Operations

| Platform | Deployment Target | Key Command | Notes |
| :--- | :--- | :--- | :--- |
| **Next.js Applications** | `pomegroup-website/`, `Projects/FelixGuide/`, `Projects/Makan_Ry/website/` | `npm run build && npm run start` | Independent `.git` repositories (Vercel / self-hosted) |
| **Clinical & NGO Portals** | `Projects/DrZeinabFarimani/`, `Projects/PFP/` | Project-specific CI/CD | `drzfarimani.com` & `peopleforpeace.live` |
| **Node/TS Daemons** | `Projects/appnewsir/` | `npm start` / cron runner | Local SQLite & automated pipelines |
| **Studio Utilities** | `scripts/hermes_client.py` | `python3 scripts/hermes_client.py` | Peer tunnel discovery client |
