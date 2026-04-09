---
name: aetherlex-prospect-hunter
description: Research a local business from a photo or typed name, score it as an Aetherlex AI prospect, then surface a call-first or email-first outreach action.
metadata:
  require-secret: true
  require-secret-description: Paste a Gemini API key from Google AI Studio. This skill uses Gemini grounding with Google Search, Google Maps, and URL Context for live prospect research.
  homepage: https://github.com/broom609/aetherlex-prospect-hunter
---

# Aetherlex Prospect Hunter

Researches a local business prospect for Aetherlex AI, scores the opportunity, then helps you either call immediately or send a tailored cold outreach email.

## Examples

- "Prospect this HVAC company"
- "Research this storefront and score it for Aetherlex"
- "Use this van photo to find the business and prep outreach"
- "Find out if this dental office is a good prospect"

## Instructions

Use only the `run_js` tool with `index.html`.

### First turn: research the business

Call `run_js` with a JSON string in `data` containing:

- `action`: `"research"`
- `businessName`: Required unless the user provided a photo. If the user typed a business name, pass it directly.
- `locationHint`: Optional. Include any city, county, state, neighborhood, phone fragment, or address fragment from the user message or the photo.
- `sourceType`: `"text"` or `"photo"`
- `notes`: Optional. If the user provided a photo, extract the clearest visible business text plus any useful clues like phone number, city, service keyword, trade, or slogan.

### After research

- Present the researched facts and the 1-10 prospect score.
- End by asking exactly: `Call now or send email?`
- Do not invent any missing contact info. If the tool returns `Unavailable`, say so plainly.
- Mention that the preview card also includes quick actions when the tool returns a webview.

### If the user says call

Call `run_js` with:

- `action`: `"call"`
- `businessName`: Optional. Reuse the last researched prospect if the user does not restate it.
- `locationHint`: Optional.

When the tool returns a webview, tell the user to tap the preview card to dial.

### If the user says email

Call `run_js` with:

- `action`: `"email"`
- `businessName`: Optional. Reuse the last researched prospect if the user does not restate it.
- `locationHint`: Optional.

Present the drafted email exactly as returned by the tool. Do not rewrite it unless the user asks you to.

### Important rules

- If the input is a photo, you must first infer the business name or strongest visible business clue from the image and pass it into the tool. The JavaScript tool does not receive the raw image.
- If the user already clearly asks to call or email on the first turn, you may still start with `action: "research"` so the skill can gather the prospect profile first.
- Do not call `run_intent`.
