# Exact Homepage Wireframe

Conversion-first, SEO/AEO-ready. Mobile is primary (most local leads are phone
calls), so the click-to-call must be reachable at every scroll position. Order
top → bottom.

> Replace `[Service]`, `[City]`, `[Brand]`, `[Phone]`, `[X]` with your specifics.

---

### 0. Sticky header (always visible)
- Left: `[Brand]` logo (links home).
- Center (desktop): nav — Services ▾ | Service Areas ▾ | Reviews | About.
- Right: **`[Phone]` as a tap-to-call button** + **"Free Estimate" CTA button**.
- Mobile: hamburger + persistent **click-to-call bar pinned to bottom of screen**.

### 1. Hero (above the fold) — the conversion zone
- **H1:** `24/7 [Service] in [City], [State]` (exact primary keyword).
- **Subhead (direct-answer, AEO):** one sentence — what you do + the outcome +
  speed. e.g., *"IICRC-certified water damage restoration with 60-minute emergency
  response across [County]. Insurance billing handled."*
- **Trust strip:** ⭐ rating + review count, "Licensed & Insured," "IICRC Certified,"
  "24/7," years in business, badges.
- **Primary CTA:** big **"Call Now [Phone]"** (tap-to-call).
- **Secondary CTA:** **multi-step quote form** (above the fold on desktop, or a
  prominent "Get a Free Estimate" button on mobile). See `lead-capture-form.md`.
- **Urgency line:** "Standing water? Every hour increases damage and cost — call now."
- Background: real photo of work/team (not stock if possible).

### 2. "Why choose us" / value bar (3–4 icons)
Speed (60-min response) · Certified & insured · Works with your insurance ·
Upfront pricing. Each = icon + 3–5 words. Builds trust instantly.

### 3. Services overview (silo links + internal linking)
- H2: `Our [City] [Service] Services`.
- 3–6 cards, each linking to a service page: Water Damage Restoration, Mold
  Remediation, Basement Flood Cleanup, Sewage Cleanup, etc. (card = icon + name +
  one line + "Learn more →").

### 4. Service-area block (local signals + city-page links)
- H2: `Areas We Serve in [County/Metro]`.
- Embedded **Google Map** + a crawlable **link list of every city page**
  (Cherry Hill, Marlton, Voorhees, Moorestown, Mount Laurel…). Reinforces location
  relevance and distributes link equity.

### 5. Process (numbered steps — AEO extractable)
- H2: `How Our [Service] Process Works`.
- 4 steps: 1) Call & dispatch → 2) Inspection & assessment → 3) Mitigation/restoration
  → 4) Final walkthrough & insurance paperwork. Numbered list = voice/AI friendly.

### 6. Social proof (Review + AggregateRating schema)
- H2: `What [City] Homeowners Say`.
- 3–5 **real** review cards (name, rating, text, date) + aggregate rating.
- Marked up with `Review` / `AggregateRating` schema (only real reviews — see §15).

### 7. Trust / credentials (E-E-A-T)
Licenses, certifications (IICRC), insurance, associations, "X years / X jobs
completed," owner photo + short bio. Feeds both Google E-E-A-T and AI trust signals.

### 8. Cost / "what to expect" teaser (commercial-intent + AEO)
- H2: `How Much Does [Service] Cost in [City]?`
- 40–55 word direct-answer block with a real price range + "→ see full cost guide"
  link to the cost resource page.

### 9. FAQ block (FAQPage schema)
- H2: `Frequently Asked Questions`.
- 5–6 concise Q&As (response time, insurance, hours, service area, certifications).
- `FAQPage` JSON-LD matching the visible text.

### 10. Final CTA band (high-contrast)
- H2: `Need [Service] in [City] Now?`
- Big **Call Now [Phone]** + **Get a Free Estimate** form/button + "24/7 emergency
  response" reassurance.

### 11. Footer (crawlable link hub)
- NAP (consistent Name/Address/Phone), hours, license #.
- Full **services list** + full **cities list** (internal links).
- Links: About, Reviews, Contact, Privacy Policy, Terms, **call-recording & SMS
  consent notice**.
- Social profiles (`sameAs` for Organization schema).

---

### Schema on the homepage
`Organization` + `LocalBusiness` (with `aggregateRating`) + `WebSite`
(`SearchAction`) + `FAQPage`. See `schema-markup.md`.

### Conversion rules
- Phone number visible at all times (sticky bar on mobile).
- Form above the fold; ≤4 fields on step one (see `lead-capture-form.md`).
- One primary action per screen; emergency/urgency framing where truthful.
- Page must hit Core Web Vitals (LCP < 2.5s): optimize hero image, lazy-load below
  the fold, minimal JS.
