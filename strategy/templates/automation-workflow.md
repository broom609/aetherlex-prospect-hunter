# Exact Automation Workflow

The end-to-end lead machine: **capture → validate → score → route → notify →
track → bill.** Built on Make or n8n (spine) + Twilio (SMS/voice) + Airtable/Sheets
(data) + Stripe (billing) + your CRM (GHL/HubSpot). Target **speed-to-lead < 2 min.**

---

## Workflow A — Lead intake → score → route (core money flow)

```
[Trigger] Webhook: form submit (or CallRail "call completed")
   │
1. Normalize payload (name, phone, email, zip, service, urgency, source_page, utm)
   │
2. Validate phone (Twilio Lookup / NumVerify)  ──fail──► tag "invalid", log, stop
   │
3. Spam check (honeypot, submit-timing, IP geo)  ──spam──► log "spam", stop
   │
4. Location match: ZIP ∈ active buyer service area?  ──no──► log "out of area"
   │
5. Score lead (0–100):
      + urgency (emergency/standing water)        +30
      + service match to active buyer             +20
      + completeness (name/email/address)         +15
      + intent keywords in description (AI parse) +20
      + business-hours / valid phone              +15
   │
6. Branch: score ≥ threshold (e.g., 60)?
   ├─ NO  ──► CRM record tag "unqualified" → optional nurture → stop
   └─ YES ──► continue
   │
7. Create CRM record (pipeline stage "New Lead") + write row to Airtable/Sheet
   │
8. Route by model:
   ├─ EXCLUSIVE: send to the one buyer who owns this ZIP/service
   ├─ SHARED:    send to 2–4 buyers simultaneously (cap count)
   └─ ROUND-ROBIN: next buyer in rotation for this area
   │
9. Notify buyer < 2 min:
      • SMS (Twilio): "New [service] lead in [City]: [name], [phone], [urgency]. Details: [link]"
      • Email: full details + call recording/transcript link
      • (optional) Warm phone transfer / click-to-call to the lead
   │
10. Confirm to lead: SMS/email "Thanks [name], a certified [service] pro will call you shortly."
   │
11. Start follow-up sequence (Workflow D) + update dashboard (Workflow E)
```

---

## Workflow B — Missed-call text-back
```
[Trigger] CallRail/Twilio "call missed/unanswered"
   1. Wait 30 seconds
   2. SMS caller: "Sorry we missed you! Reply here and we'll dispatch help to [City] right away."
   3. Create lead record (source: missed call) → feed into Workflow A from step 5
   4. Alert you/buyer of the missed call
```
Recovers 20–40% of otherwise-lost phone leads.

---

## Workflow C — Call lead scoring (AI transcript)
```
[Trigger] CallRail "transcription ready"
   1. Send transcript to LLM (Claude/GPT) with scoring rubric
   2. Extract: service, location, urgency, qualified (bool), summary
   3. Update lead record with score + summary + qualified flag
   4. If qualified & not yet routed → enter Workflow A at step 6
```

---

## Workflow D — Follow-up & outcome capture
```
[Trigger] Lead routed (from A)
   To BUYER:
     +15 min: SMS reminder if lead not marked "contacted"
     +1 day:  email "Did you reach [name]? Mark outcome: [Won][Lost][No contact]"
   To LEAD (if you own relationship):
     +1 hr / +1 day / +3 days nurture (helpful tips + reassurance + recontact)
   Outcome reply → updates CRM stage (Contacted→Quoted→Won/Lost) → feeds reporting
```

---

## Workflow E — Reporting refresh
```
[Trigger] Nightly schedule
   1. Pull calls (CallRail), leads + outcomes (Airtable), traffic (GA4/GSC)
   2. Compute: leads, % qualified, CPL, close rate, revenue/lead, by city/buyer
   3. Write to the reporting Sheet/Airtable view
   4. Looker Studio dashboard auto-refreshes (client + internal views)
```

---

## Workflow F — Client billing
```
PAY-PER-LEAD:
   [Trigger] Monthly (1st) → count "qualified & delivered" leads per buyer
      → multiply × per-lead price → create Stripe invoice → email → auto-charge
      → on failure: dunning sequence

RETAINER / RANK-AND-RENT:
   Stripe subscription auto-charges monthly → receipt email
      → on failed payment: dunning + pause lead delivery until resolved
```

---

## Recommended node mapping
| Step | Tool |
|---|---|
| Webhooks / orchestration | Make or n8n |
| Phone validation | Twilio Lookup / NumVerify |
| SMS / voice / AI receptionist | Twilio (+ Retell/Vapi for AI voice qualify 24/7) |
| Data store | Airtable (or Google Sheets) |
| CRM / pipeline | GoHighLevel or HubSpot |
| Call tracking + transcription | CallRail (or GHL native) |
| AI scoring | Claude / GPT via API node |
| Billing | Stripe |
| Dashboard | Looker Studio |

## Build order (MVP first)
1. Workflow A (intake→route→notify) — without this you can't sell leads.
2. Workflow B (missed-call text-back) — biggest quick win.
3. Workflow E (reporting) — needed to prove ROI to buyers.
4. Workflow F (billing) — once you have a paying buyer.
5. Workflows C & D (AI scoring + nurture) — optimization layer.
