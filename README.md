# Aetherlex Prospect Hunter

A Google AI Edge Gallery Agent Skill for Gemma 4 that turns a photo or a typed business name into a researched Aetherlex AI prospect.

## What It Does

1. Accepts either a typed business name or a photo of a van, sign, or storefront.
2. Uses Gemini grounding with Google Search, Google Maps, and URL Context to research:
   - business name and vertical
   - website
   - phone
   - email if publicly findable
   - Google rating and review count
   - social profiles
   - rough size signals like locations, team size, and years in business
3. Scores the prospect from 1-10 for Aetherlex AI based on:
   - South Jersey / Philadelphia metro fit
   - likely lack of AI automation
   - revenue potential
4. Gives you quick follow-up paths:
   - `Call now`: shows a big tap-to-dial phone card
   - `Send email`: drafts a cold outreach email in the requested Aetherlex voice

## Files

- `SKILL.md`: Gallery skill definition and model instructions
- `scripts/index.js`: Main skill logic
- `scripts/index.html`: Minimal Gallery JS loader
- `assets/prospect-panel.html`: Webview for call/email action cards

## Import Into Google AI Edge Gallery

Use the GitHub Pages folder URL for import, not the raw GitHub JS file URL.

1. Open Google AI Edge Gallery.
2. Go to Agent Skills.
3. Choose Import from URL.
4. Paste the GitHub Pages URL for this repo root:

   `https://broom609.github.io/aetherlex-prospect-hunter/`

5. When prompted, add a Gemini API key from Google AI Studio.

## Why GitHub Pages Instead Of raw.githubusercontent.com

Google AI Edge Gallery JS skills need a skill folder URL with browser-loadable assets. GitHub raw file URLs serve the JavaScript as a plain raw file, but the Gallery importer expects the hosted skill folder structure.

If you want the direct JS file itself for inspection, the raw file URL is:

`https://raw.githubusercontent.com/broom609/aetherlex-prospect-hunter/main/scripts/index.js`

## Example Prompts

- "Research this HVAC business and score it"
- "Use this storefront photo to find the company"
- "Prospect this med spa"
- "Find out if this dental office is a fit for Aetherlex"

## Notes

- Photo input works by having the model extract the visible business name or clues from the image and pass those into the skill.
- The skill is conservative about missing data and returns `Unavailable` instead of inventing contact details.
- Review the grounding terms for any public or commercial deployment.
