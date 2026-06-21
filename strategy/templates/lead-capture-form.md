# Exact Lead-Capture Form Fields

Multi-step "quote" form. **Fewer fields = more leads, but you need enough to
qualify and route.** Solution: a 3-step form where step 1 is frictionless and
later steps capture qualifiers. Each step submits progressively (capture the lead
even if they abandon at step 2–3).

> Tune fields to your niche. Example shown for water damage restoration.

---

## Step 1 — Frictionless hook (the only required step)
Goal: capture a usable lead with minimum friction. Submit/persist on completion of
this step.

| Field | Type | Required | Notes |
|---|---|---|---|
| What do you need help with? | Select / buttons | ✅ | Service options (Water Damage, Mold, Basement Flood, Sewage…) — also routes/qualifies |
| Your ZIP code | Text (5-digit) | ✅ | Drives location qualification + routing |
| Phone number | Tel (validated) | ✅ | Primary contact; validate format/real number |

CTA button: **"Get My Free Estimate →"** (not "Submit").

## Step 2 — Qualification
| Field | Type | Required | Notes |
|---|---|---|---|
| Is this an emergency / standing water now? | Yes / No | ✅ | Urgency score + routing priority |
| Property type | Residential / Commercial | ✅ | Job-type filter |
| When did it happen? | Today / This week / Older | optional | Urgency + insurance window |
| Will you be using insurance? | Yes / No / Not sure | optional | Job value signal |

## Step 3 — Contact details (capture & confirm)
| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | Text | ✅ | |
| Email | Email | optional | Secondary contact + receipts |
| Street address | Text | optional | Dispatch + precise area match |
| Brief description | Textarea | optional | Free-text intent (feeds AI lead scoring) |
| Consent checkbox | Checkbox | ✅ | "I agree to be contacted by phone/SMS/email and to the privacy policy." (TCPA/consent — see Master §15) |

CTA button: **"Request My Free Estimate"** → redirect to `/thank-you/` (tracking
fires there).

---

## Hidden / system fields (auto-captured, not shown)
| Field | Source | Purpose |
|---|---|---|
| `source_page` | URL of page | Which money page produced the lead |
| `service` | derived from page/Step 1 | Routing |
| `city` | derived from page/ZIP | Routing + reporting |
| `gclid` / `utm_*` | URL params | Attribution |
| `tracking_number` | CallRail/DNI | Call attribution |
| `timestamp` | server | Speed-to-lead + dedupe |
| `landing_page` / `referrer` | analytics | Attribution |
| `device` / `ip_geo` | request | Spam/location sanity check |
| `lead_score` | automation | Computed after submit (see automation-workflow.md) |

---

## Qualification logic (what makes a lead "sellable")
A lead is **qualified** (deliver to buyer) when:
- Service ∈ buyer's offered services, **and**
- ZIP ∈ buyer's service area, **and**
- Phone validates as real, **and**
- Not flagged spam (honeypot/timing/IP), **and**
- Score ≥ threshold (urgency + intent + completeness).

Otherwise: log as unqualified (don't sell), optionally nurture.

## Anti-spam
- Honeypot field (hidden; bots fill it → reject).
- Time-to-complete check (sub-2-second submits → bot).
- Phone validation (Twilio Lookup / NumVerify).
- Optional reCAPTCHA v3 (invisible) on final step.

## Conversion best practices
- ≤3 fields on step 1; progress bar shown.
- Mobile-first, big tap targets, numeric keypad for phone/ZIP.
- Persist partial submissions (don't lose abandoners after step 1).
- Inline validation, no page reloads.
- Always pair the form with a **click-to-call** alternative (many prefer to call).
