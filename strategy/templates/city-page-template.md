# Exact City / Money Page Template

For `/[service]-[city]-[state]/` pages — the **highest commercial-intent money
pages** that win "[service] in [city]" and "[service] near me." These convert the
most, so build them with the most care. 800–1,200 words, **uniquely local** (this
is what separates a ranking asset from doorway spam — see Master §11).

> Tokens: `[Service]`, `[City]`, `[County]`, `[State]`, `[Brand]`, `[Phone]`,
> `[Neighborhoods]`, `[Landmarks]`, `[LocalRisk]`, `[ResponseTime]`.

---

### URL & meta
- **URL:** `/[service]-[city]-[state]/` (e.g., `/water-damage-restoration-cherry-hill-nj/`)
- **Title tag:** `[Service] in [City], [State] | 24/7 Response | [Brand]`
- **Meta description:** `Need [service] in [City]? [Brand] responds in [ResponseTime].
  Licensed, insured, IICRC-certified. Call [Phone] for a free estimate.`
- **One H1:** `[Service] in [City], [State]`

---

### Page structure (top → bottom)

**1. Hero**
- H1 (exact "[Service] in [City], [State]") + direct-answer subhead naming the city
  + sticky **Call Now [Phone]** + quote form + trust strip.

**2. Direct-answer block (AEO) — localized**
- 40–55 words answering "[service] in [city]" with a local hook:
  > *"[Brand] provides 24/7 [service] in [City], [State], with [ResponseTime]
  > response across [County]. Our IICRC-certified crews serve [Neighborhoods] and
  > handle insurance documentation from inspection to final repair."*

**3. Local relevance section (THE uniqueness driver — required)**
- H2: `[Service] in [City]: What Local Homeowners Should Know`
- Use the city's **real data row**: neighborhoods served, local risk factors
  (flood zones, older housing stock, basements, soil, seasonal weather),
  landmarks, proximity from your nearest base, typical local job types. **This
  section must differ meaningfully per city** — never just swap the name.

**4. Services offered in this city (internal links)**
- Bulleted links to each related service for this city / the service pages.

**5. Our process (numbered, AEO)**
- 4–6 steps, framed for this city ("We dispatch to [City] within [ResponseTime]…").

**6. Cost in [City] (commercial + AEO)**
- Direct-answer local price range + small table + insurance note + link to cost guide.

**7. Why [City] homeowners choose [Brand] (E-E-A-T + local proof)**
- Local jobs completed, local reviews, certifications, response time, guarantees.

**8. Local reviews (Review/AggregateRating schema)**
- 3–4 **real** reviews, ideally from customers in or near this city.

**9. Service-area / neighborhoods (local signals + linking)**
- Embedded map centered on the city + list of neighborhoods + links to **neighboring
  city money pages** ("Also serving [next city] →").

**10. FAQ block — localized (FAQPage schema)**
- 5–7 Q&As, some city-specific: "How fast can you reach [City]?", "Do you serve
  [Neighborhood]?", "Does NJ homeowners insurance cover this?"

**11. Final CTA band**
- `[Service] in [City]? We're Ready 24/7` + Call Now + form.

**12. Internal links footer**
- Up to parent service page + parent city/locations hub + neighboring cities +
  relevant resources.

---

### Schema
`LocalBusiness` (or subtype) with `areaServed` = this city + `Service` + `FAQPage`
+ `BreadcrumbList` + `Review`/`AggregateRating`. Address/geo must be truthful (see
Master §15). See `schema-markup.md`.

### Uniqueness checklist (anti-doorway)
- [ ] ≥30% of body content is genuinely city-specific (neighborhoods, risks,
      landmarks, response logistics, local FAQs).
- [ ] Local reviews where possible.
- [ ] Real local price range.
- [ ] Internal links to *neighboring* cities, not just the hub.
- [ ] Human edit pass completed.

### Programmatic build note
Generate from a per-city data row (city, county, ZIPs, neighborhoods, landmarks,
local risks, price range, response time, 2 unique notes). The template provides
structure; the row provides the uniqueness. Stagger publishing 5–15/week.
