# Project Overview: Sabar Palvelut & Peeshi NGO

This repository contains materials and codebases associated with the client **Sabar Palvelut** and the upcoming **Peeshi NGO** platform. This document reviews both the live commercial website and the local codebase to prepare for the client meeting.

---

## 1. Live Website Review (`www.sabarpalvelut.fi`)

* **Business Identity:** Sabar Palvelut is a registered commercial service provider in Finland (Y-tunnus: `3489225-4`).
* **Soteri Registration:** Registered in the **Soteri registry** for social and health care services (Valvira/AVI, dnro `V/16207/2025`, valid from September 15, 2025).
* **Target Region:** Uusimaa and Southwest Finland (Varsinais-Suomi).
* **Primary Offerings (Social/Care Services):**
  * **Vammaisten henkilökohtainen apu** (Personal assistance for disabled individuals)
  * **Ikäihmisten kotipalvelu ja kotihoito** (Home care and support for the elderly)
  * **Omaishoidon lomitus ja sijaisuus** (Respite care/substitutions for family caregivers)
  * **Kotisairaanhoito** (Home nursing, e.g., blood pressure monitoring, injections, wound care)
* **Secondary/Commercial Services:**
  * **Kotisiivous** (Home cleaning - VAT 25.5% applies)
  * **Pintaremontit & Huoneistosaneeraukset** (Renovation and painting)
  * **Logistiikka & Kuljetuspalvelut** (Moves, transport, deliveries, and pickups)
* **Key Commercial Features:**
  * **Free Mapping Visit** (*Ilmainen kartoituskäynti*) to plan services.
  * **-10% Discount** on the first 10-hour service package.
  * **Price Guarantee** (*Hintalupaus*): Promises to beat competitor quotes by 1 €/hour.
* **Contacts:**
  * Emails: `sabarpalvelut@gmail.com`
  * Phones: `046 962 5424`, `046 654 2936`

---

## 2. Local Codebase Review (`peeshi_ngo_final_corrected_v3`)

The local subfolder contains the files for a brand-new project: **Peeshi NGO** (*Yhdessä parempaa elämää* / *Together for a better life*).

### Structure
* [index.html](file:///Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Projects/sabarpalvelut.fi%20/peeshi_ngo_final_corrected_v3/index.html): Localized single-page application structure.
* [script.js](file:///Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Projects/sabarpalvelut.fi%20/peeshi_ngo_final_corrected_v3/script.js): Core logic, localization dictionary (Finnish, English, Arabic), dynamic UI rendering (initiatives, memberships, news, calendar).
* [style.css](file:///Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Projects/sabarpalvelut.fi%20/peeshi_ngo_final_corrected_v3/style.css): Vanilla styling supporting LTR/RTL layouts.
* [README_AR.txt](file:///Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Projects/sabarpalvelut.fi%20/peeshi_ngo_final_corrected_v3/README_AR.txt): Documentation in Arabic detailing how to run the site, edit Stripe links, and host.
* [STRIPE_MEMBERSHIP_LINKS.txt](file:///Users/mahdifarimani/Documents/AntiGravity/Pomegroup/Projects/sabarpalvelut.fi%20/peeshi_ngo_final_corrected_v3/STRIPE_MEMBERSHIP_LINKS.txt): Text guide listing Stripe membership levels and placeholders.

### Key Features of Peeshi NGO
1. **Multilingual Support:** Fully translated into Finnish (`fi`), English (`en`), and Arabic (`ar`), including automatic RTL adjustment.
2. **Umbrella NGO Concept:** Designed as a parent/umbrella platform hosting five sub-initiatives:
   * **Peeshi ry:** Animal protection, shelters, and family-animal connecting programs.
   * **Peeshi Lasten:** Children's safety, events, and creativity.
   * **Peeshi Perhe:** Family counseling, support, and stable everyday life.
   * **Peeshi Immigrants:** Integration support, language training, and societal guidance.
   * **Peeshi Future:** Youth training, technology, AI, and employment initiatives.
3. **Membership Plans:**
   * Under 18 Membership: 25 € / year
   * Individual Membership: 45 € / year
   * Active Member: 75 € / year
   * Association Member: 150 € / year
4. **Stripe Integration:** Integrated placeholder checkout flow for memberships and donations.
5. **Interactive Modules:** Custom booking calendar, Netlify-form-compatible volunteer applications, support requests, and dynamic media/video reel grid placeholders.

---

## 3. Preparation for the Client Meeting

To prepare for the recorded meeting with the client, clarify the following core items:

### 1. Business Relation & Branding
* **Question:** What is the exact relationship between Sabar Palvelut (commercial business) and Peeshi NGO?
* **Why it matters:** Sabar Palvelut focuses on commercial care/cleaning/renovations, while Peeshi is a humanitarian NGO umbrella. Will Peeshi NGO run as a separate brand/domain (e.g., `peeshi.org`), or will it be hosted on a subdomain of Sabar Palvelut?

### 2. Stripe and Payment Gateway
* **Question:** Do they have live Stripe payment links ready for the 4 membership tiers and donations?
* **Why it matters:** Current links in `script.js` are placeholders (`STRIPE_LINK_...`). They need to supply the final URLs from their Stripe Dashboard.

### 3. Hosting & Forms Backend
* **Question:** Where will the Peeshi NGO site be deployed? (Netlify, Vercel, or traditional cPanel/host?)
* **Why it matters:** The contact forms use Netlify forms attributes (`data-netlify="true"`). If they host somewhere else (like cPanel or Vercel), we will need to adjust the form handling logic.

### 4. Interactive Calendars & Bookings
* **Question:** How should the booking calendar behave? 
* **Why it matters:** Currently, the calendar is a static front-end calendar mockup that populates a date in a form. We should verify if they want a real integration (e.g., Google Calendar, Cal.com, Calendly) or just email/form-based notifications.

---

## 4. Domain & Cloudflare Verification (`peeshi.fi`)

* **Current Status:**
  * **Domain:** `peeshi.fi` is active and registered.
  * **IP Address:** `5.44.244.102` (resolves to `web141.webhotelli.fi`, a server managed by Finnish hosting provider **Webhotelli.fi**).
  * **Current Name Servers:** 
    * `ns1.webhotelli.fi`
    * `ns2.webhotelli.fi`

### Can we use Cloudflare?
**Yes, absolutely.** You can use Cloudflare to manage DNS, security, and performance for `peeshi.fi`. Here is the workflow to configure it:

1. **Add Site in Cloudflare:**
   * Go to your Cloudflare dashboard and click **Add a Site**.
   * Enter `peeshi.fi`.
   * Cloudflare will automatically scan the existing DNS records from `webhotelli.fi`.
2. **Retrieve Cloudflare Name Servers:**
   * Cloudflare will assign two custom nameservers (e.g., `xxxx.ns.cloudflare.com` and `yyyy.ns.cloudflare.com`).
3. **Update Nameservers at Registrar:**
   * Log into your domain registrar control panel (likely **Webhotelli.fi** or the registrar where `peeshi.fi` is purchased).
   * Replace the current nameservers (`ns1.webhotelli.fi` / `ns2.webhotelli.fi`) with the new Cloudflare nameservers.
   * *Note: Propagation of `.fi` nameserver changes typically takes anywhere from 1 to 24 hours.*
4. **Configure DNS Records in Cloudflare:**
   * **If hosting on Webhotelli.fi:** Keep the A record pointing to `5.44.244.102`.
   * **If hosting on Netlify/Vercel (Recommended for SPAs):** Point the A/CNAME records to the Netlify or Vercel server targets.
   * Configure Cloudflare's SSL settings to **Full** or **Full (Strict)** to prevent redirection loops, especially when proxying custom single-page apps.

---

## 5. Next Steps

1. **Conduct Client Meeting:** Discuss the branding, domains, payments, and deployment constraints listed above.
2. **Setup Cloudflare:** Have the client add `peeshi.fi` to their Cloudflare account and update nameservers in their registrar.
3. **Review Recording:** Share the transcript or recording of the meeting to outline actionable code updates.
4. **Execution Phase:**
   * Swap out Stripe placeholders with live payment links in `script.js`.
   * Configure backend form handling.
   * Map domain names and deploy the new Peeshi NGO platform.

