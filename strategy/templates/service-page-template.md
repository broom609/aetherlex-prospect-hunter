# Exact Service Page Template

For `/services/[service]/` pages (the silo sub-pillars). 800–1,500 words, useful,
AEO/GEO-structured, conversion-equipped.

> Tokens: `[Service]`, `[City]`, `[County]`, `[State]`, `[Brand]`, `[Phone]`.

---

### URL & meta
- **URL:** `/services/[service]/` (e.g., `/services/water-damage-restoration/`)
- **Title tag:** `[Service] in [City], [State] | 24/7 [Brand]` (≤60 chars)
- **Meta description:** benefit + speed + CTA + phone (≤155 chars)
- **One H1:** `[Service] in [City], [State]`

---

### Page structure (top → bottom)

**1. Hero**
- H1 (exact keyword) + 1-line direct-answer subhead + sticky **Call Now** + quote
  form/button + trust strip (rating, certified, insured, 24/7).

**2. Direct-answer / definition block (AEO magnet)**
- H2: `What Is [Service]?`
- First 40–55 words: a clean definition + what's included.
  > *"[Service] is the process of [doing X] to [outcome]. It includes [a], [b], and
  > [c], and should begin within [timeframe] to prevent [consequence]."*

**3. "Key takeaways" summary box (GEO/citation bait)**
- 3–5 bullets: response time, what's included, cost range, certifications, insurance.

**4. Why it matters / the problem (with urgency)**
- Short section on consequences of waiting (damage escalation, mold, cost). Truthful,
  not fear-mongering.

**5. What's included / scope of service**
- Bulleted list of everything covered (inspection, extraction, drying, sanitizing,
  repairs, documentation).

**6. Our process (numbered steps — AEO)**
- H2: `How [Brand]'s [Service] Process Works`
- 4–6 numbered steps with 1–2 sentences each.

**7. Cost guidance (commercial-intent + AEO)**
- H2: `How Much Does [Service] Cost?`
- Direct-answer price range + a small **cost table** (job type → range) + what
  drives cost + "insurance often covers this" note + link to full cost guide.

**8. Why choose [Brand] (E-E-A-T + differentiation)**
- Certifications (IICRC), licensing, insurance, response time, guarantees,
  experience, equipment. Bullets + proof.

**9. Comparison block (optional, AEO table)**
- e.g., `[Service] vs [related service]` mini-table, link to full `/compare/` page.

**10. Service areas (internal links)**
- H2: `Where We Provide [Service]`
- Link list to every `/[service]-[city]/` money page (the city variants of this
  service) + embedded map.

**11. Reviews (Review/AggregateRating schema)**
- 3–4 real reviews specific to this service.

**12. FAQ block (FAQPage schema)**
- 5–8 concise Q&As (timeline, insurance, safety, guarantees, emergency, DIY?).

**13. Final CTA band**
- `Get [Service] in [City] Today` + Call Now + form.

**14. Internal links footer block**
- Up to parent (`/services/`), to related services, to top city money pages, to
  relevant resource posts.

---

### Schema
`Service` (serviceType, provider→LocalBusiness, areaServed, description, offers) +
`FAQPage` + `BreadcrumbList` + `Review`/`AggregateRating`. See `schema-markup.md`.

### Internal linking
- Receives links from: homepage services block, services hub, every related city
  money page, resource posts.
- Links out to: each `[service]-[city]` money page, related services, cost/FAQ
  resources.

### Quality bar (anti-spam)
Real process, real pricing ranges, real credentials, real reviews. Each service
page must stand on its own as the best answer for "[service]" intent in your area.
