const SEARCH_MODEL = "gemini-3-flash-preview";
const MAPS_MODEL = "gemini-2.5-flash";
const CACHE_KEY = "aetherlex-prospect-hunter-cache-v1";
const LAST_KEY = "aetherlex-prospect-hunter-last-v1";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7;

const SOUTH_JERSEY_KEYWORDS = [
  "south jersey",
  "camden county",
  "burlington county",
  "gloucester county",
  "atlantic county",
  "cape may county",
  "cumberland county",
  "salem county",
  "camden",
  "cherry hill",
  "voorhees",
  "moorestown",
  "mount laurel",
  "marlton",
  "medford",
  "haddonfield",
  "deptford",
  "glassboro",
  "mullica hill",
  "vineland",
  "bridgeton",
  "hammonton",
  "egg harbor",
  "sewell",
  "turnersville",
  "collingswood",
  "southampton",
  "cinnaminson",
  "berlin",
  "audubon",
  "burlington"
];

const PHILLY_METRO_KEYWORDS = [
  "philadelphia",
  "philly",
  "bucks county",
  "montgomery county",
  "chester county",
  "delaware county",
  "conshohocken",
  "king of prussia",
  "west chester",
  "media",
  "malvern",
  "doylestown",
  "lansdale",
  "newtown",
  "feasterville",
  "ardmore"
];

const REGION_KEYWORDS = [
  "new jersey",
  "pennsylvania",
  "delaware",
  "nj",
  "pa",
  "de",
  "tri-state"
];

const VERTICAL_CONFIG = {
  hvac: {
    aliases: ["hvac", "heating", "cooling", "air conditioning", "ac repair"],
    revenueWeight: 1.9,
    subject: "Missed after-hours HVAC leads",
    pitch:
      "Aetherlex AI helps HVAC companies catch missed calls in seconds, automate estimate follow-up, and keep service and install leads moving without adding office headcount. We build practical systems like missed-call text back, booking reminders, and reactivation flows so more inbound demand turns into scheduled work."
  },
  dental: {
    aliases: ["dentist", "dental", "orthodontic", "oral surgery", "periodontic"],
    revenueWeight: 1.8,
    subject: "Treatment-plan follow-up gaps",
    pitch:
      "Aetherlex AI helps dental practices tighten patient follow-up with automated recall, treatment-plan nurture, and front-desk overflow handling. That usually means fewer dropped new-patient inquiries, steadier hygiene reactivation, and less manual chasing for your team."
  },
  med_spa: {
    aliases: ["med spa", "medical spa", "aesthetics", "injectables", "laser", "botox"],
    revenueWeight: 1.7,
    subject: "Consult requests that never convert",
    pitch:
      "Aetherlex AI helps med spas move faster from lead to consult with automated text and email follow-up, no-show reduction, and nurture sequences around high-value treatments. We focus on practical systems that recover missed revenue without making the client experience feel robotic."
  },
  home_services: {
    aliases: [
      "home services",
      "plumbing",
      "electric",
      "electrician",
      "roofer",
      "roofing",
      "landscaping",
      "contractor",
      "pest control",
      "garage door",
      "remodeling",
      "flooring",
      "windows",
      "junk removal",
      "tree service"
    ],
    revenueWeight: 1.6,
    subject: "Slow response on inbound jobs",
    pitch:
      "Aetherlex AI helps local service businesses tighten lead response with missed-call text back, estimate follow-up, booking reminders, and review-request automations. The goal is simple: stop good inbound jobs from dying in voicemail, inboxes, or manual follow-up gaps."
  },
  senior_living: {
    aliases: ["senior living", "assisted living", "memory care", "independent living"],
    revenueWeight: 1.7,
    subject: "Inquiry follow-up that costs move-ins",
    pitch:
      "Aetherlex AI helps senior living teams handle inquiry follow-up faster with automated nurture, tour reminders, and lead routing that keeps prospects from slipping between channels. We focus on practical systems that protect occupancy opportunities while easing staff workload."
  }
};

const COMBINED_PROFILE_SCHEMA = {
  type: "OBJECT",
  properties: {
    canonical_name: {type: "STRING"},
    vertical: {type: "STRING"},
    website_url: {type: "STRING", nullable: true},
    contact_url: {type: "STRING", nullable: true},
    phone: {type: "STRING", nullable: true},
    email: {type: "STRING", nullable: true},
    google_rating: {type: "NUMBER", nullable: true},
    google_review_count: {type: "INTEGER", nullable: true},
    google_maps_url: {type: "STRING", nullable: true},
    primary_location: {type: "STRING", nullable: true},
    service_area: {type: "STRING", nullable: true},
    business_summary: {type: "STRING", nullable: true},
    social_profiles: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          platform: {type: "STRING"},
          url: {type: "STRING"}
        },
        required: ["platform", "url"]
      }
    },
    size_signals: {
      type: "OBJECT",
      properties: {
        locations_count: {type: "INTEGER", nullable: true},
        team_size: {type: "STRING", nullable: true},
        years_in_business: {type: "STRING", nullable: true},
        years_in_business_estimate: {type: "INTEGER", nullable: true},
        notes: {
          type: "ARRAY",
          items: {type: "STRING"}
        }
      },
      required: ["notes"]
    },
    automation_signals: {
      type: "OBJECT",
      properties: {
        chatbot_present: {type: "BOOLEAN", nullable: true},
        online_booking_present: {type: "BOOLEAN", nullable: true},
        sms_or_textback_present: {type: "BOOLEAN", nullable: true},
        self_serve_forms_present: {type: "BOOLEAN", nullable: true},
        website_modernity: {type: "STRING", nullable: true},
        slow_response_signals: {
          type: "ARRAY",
          items: {type: "STRING"}
        },
        notes: {
          type: "ARRAY",
          items: {type: "STRING"}
        }
      },
      required: ["slow_response_signals", "notes"]
    },
    fit_notes: {
      type: "ARRAY",
      items: {type: "STRING"}
    },
    revenue_potential_notes: {
      type: "ARRAY",
      items: {type: "STRING"}
    },
    source_urls: {
      type: "ARRAY",
      items: {type: "STRING"}
    }
  },
  required: [
    "canonical_name",
    "vertical",
    "social_profiles",
    "size_signals",
    "automation_signals",
    "fit_notes",
    "revenue_potential_notes",
    "source_urls"
  ]
};

const MAPS_SCHEMA = {
  type: "OBJECT",
  properties: {
    canonical_name: {type: "STRING"},
    phone: {type: "STRING", nullable: true},
    google_rating: {type: "NUMBER", nullable: true},
    google_review_count: {type: "INTEGER", nullable: true},
    google_maps_url: {type: "STRING", nullable: true},
    primary_location: {type: "STRING", nullable: true},
    website_url: {type: "STRING", nullable: true},
    business_summary: {type: "STRING", nullable: true}
  },
  required: ["canonical_name"]
};

function safeJsonParse(value, fallback = null) {
  try {
    return JSON.parse(value);
  } catch (_error) {
    return fallback;
  }
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function nullIfEmpty(value) {
  const text = normalizeText(value);
  return text ? text : null;
}

function titleCase(value) {
  return normalizeText(value)
    .replace(/\s+/g, " ")
    .split(" ")
    .map((part) => part ? part.charAt(0).toUpperCase() + part.slice(1) : "")
    .join(" ");
}

function normalizeUrl(value) {
  const text = normalizeText(value);
  if (!text) return null;
  try {
    const url = new URL(text.startsWith("http") ? text : `https://${text}`);
    return url.toString();
  } catch (_error) {
    return null;
  }
}

function normalizeEmail(value) {
  const text = normalizeText(value).toLowerCase();
  if (!text) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) ? text : null;
}

function normalizePhone(value) {
  const text = normalizeText(value);
  if (!text) return null;
  const digits = text.replace(/[^\d+]/g, "");
  if (digits.length < 10) return text || null;
  return text;
}

function numberOrNull(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function integerOrNull(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.round(value);
  }
  return null;
}

function boolOrNull(value) {
  return typeof value === "boolean" ? value : null;
}

function dedupeUrls(values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .map(normalizeUrl)
    .filter(Boolean)
    .filter((url) => {
      if (seen.has(url)) return false;
      seen.add(url);
      return true;
    });
}

function dedupeSocialProfiles(values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .map((item) => ({
      platform: titleCase(item?.platform || ""),
      url: normalizeUrl(item?.url || "")
    }))
    .filter((item) => item.platform && item.url)
    .filter((item) => {
      const key = `${item.platform}|${item.url}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function uniqueStrings(values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : [])
    .map((item) => normalizeText(item))
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function encodeBase64Json(value) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
}

function loadStorage(key) {
  try {
    return safeJsonParse(localStorage.getItem(key), null);
  } catch (_error) {
    return null;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_error) {
  }
}

function loadCache() {
  return loadStorage(CACHE_KEY) || {};
}

function saveCache(cache) {
  saveStorage(CACHE_KEY, cache);
}

function cacheProspect(profile) {
  const cache = loadCache();
  const key = cacheKey(profile.canonical_name, profile.primary_location || profile.service_area || "");
  cache[key] = {savedAt: Date.now(), profile};
  saveCache(cache);
  saveStorage(LAST_KEY, profile);
}

function cacheKey(name, hint) {
  return `${normalizeText(name).toLowerCase()}|${normalizeText(hint).toLowerCase()}`;
}

function findCachedProspect(name, hint) {
  const cache = loadCache();
  if (name) {
    const direct = cache[cacheKey(name, hint || "")];
    if (direct && Date.now() - direct.savedAt < CACHE_TTL_MS) return direct.profile;
    const normalizedName = normalizeText(name).toLowerCase();
    const match = Object.values(cache).find((entry) => {
      if (!entry?.profile?.canonical_name) return false;
      if (Date.now() - entry.savedAt >= CACHE_TTL_MS) return false;
      return normalizeText(entry.profile.canonical_name).toLowerCase() === normalizedName;
    });
    if (match) return match.profile;
  }
  return loadStorage(LAST_KEY);
}

function normalizeVertical(value) {
  const text = normalizeText(value).toLowerCase();
  if (!text) return "Local Service Business";
  for (const [key, config] of Object.entries(VERTICAL_CONFIG)) {
    if (config.aliases.some((alias) => text.includes(alias))) {
      if (key === "med_spa") return "Med Spa";
      if (key === "home_services") return "Home Services";
      if (key === "senior_living") return "Senior Living";
      return titleCase(key.replace(/_/g, " "));
    }
  }
  return titleCase(text);
}

function getVerticalKey(vertical) {
  const text = normalizeText(vertical).toLowerCase();
  for (const [key, config] of Object.entries(VERTICAL_CONFIG)) {
    if (config.aliases.some((alias) => text.includes(alias)) || text === key.replace(/_/g, " ")) {
      return key;
    }
  }
  return "home_services";
}

function extractJsonObject(text) {
  const source = normalizeText(text);
  if (!source) return null;
  let depth = 0;
  let start = -1;
  let inString = false;
  let escaped = false;
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }
    if (char === "\"") {
      inString = true;
      continue;
    }
    if (char === "{") {
      if (depth === 0) start = i;
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0 && start >= 0) {
        const candidate = source.slice(start, i + 1);
        return safeJsonParse(candidate, null);
      }
    }
  }
  return safeJsonParse(source, null);
}

function extractResponseText(response) {
  return response?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "";
}

function extractGroundingUrls(response) {
  const chunks = response?.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const urls = [];
  for (const chunk of chunks) {
    const webUri = chunk?.web?.uri;
    const mapsUri = chunk?.maps?.placeUri || chunk?.maps?.directionsUri || chunk?.maps?.uri;
    if (webUri) urls.push(webUri);
    if (mapsUri) urls.push(mapsUri);
  }
  return dedupeUrls(urls);
}

function buildMapsPrompt(input) {
  return [
    "Find the exact local business using Google Maps grounding.",
    `Business clue: ${input.businessName || "Unavailable"}`,
    `Location hint: ${input.locationHint || "Unavailable"}`,
    `Extra notes: ${input.notes || "None"}`,
    "",
    "Return only JSON with the exact business name, phone, rating, review count, Google Maps URL, primary location, official website if visible, and a short summary.",
    "If a value is not visible in Maps, set it to null."
  ].join("\n");
}

function buildStructuredFallbackPrompt(input, mapsData) {
  return [
    "You are researching a prospect for Aetherlex AI.",
    "Return only JSON matching the schema.",
    `Business clue: ${input.businessName || "Unavailable"}`,
    `Location hint: ${input.locationHint || "Unavailable"}`,
    `Photo or text notes: ${input.notes || "None"}`,
    `Google Maps context: ${JSON.stringify(mapsData || {})}`,
    "",
    "Use Google Search and URL Context when useful.",
    "Be conservative and do not invent missing data.",
    "Find official contact details, social profiles, size signals, automation gaps, and public evidence."
  ].join("\n");
}

async function callGemini(apiKey, model, body) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API ${response.status}: ${errorText.slice(0, 500)}`);
  }
  return response.json();
}

async function runMapsResearch(input, apiKey) {
  const response = await callGemini(apiKey, MAPS_MODEL, {
    contents: [{parts: [{text: buildMapsPrompt(input)}]}],
    tools: [{googleMaps: {}}],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: MAPS_SCHEMA
    }
  });
  const parsed = safeJsonParse(extractResponseText(response), null) || extractJsonObject(extractResponseText(response)) || {};
  return {
    profile: parsed,
    sourceUrls: dedupeUrls([...(parsed.source_urls || []), ...extractGroundingUrls(response)])
  };
}

async function runStructuredResearch(input, mapsData, apiKey) {
  const response = await callGemini(apiKey, SEARCH_MODEL, {
    contents: [{parts: [{text: buildStructuredFallbackPrompt(input, mapsData)}]}],
    tools: [{google_search: {}}, {url_context: {}}],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: COMBINED_PROFILE_SCHEMA
    }
  });
  const parsed = safeJsonParse(extractResponseText(response), null) || extractJsonObject(extractResponseText(response));
  if (!parsed) {
    throw new Error("Structured research returned non-JSON output.");
  }
  return {
    profile: parsed,
    sourceUrls: dedupeUrls([...(parsed.source_urls || []), ...extractGroundingUrls(response)])
  };
}

function mergeProfiles(primary, secondary) {
  return {
    canonical_name: primary.canonical_name || secondary.canonical_name || "",
    vertical: primary.vertical || secondary.vertical || "",
    website_url: primary.website_url || secondary.website_url || null,
    contact_url: primary.contact_url || secondary.contact_url || null,
    phone: primary.phone || secondary.phone || null,
    email: primary.email || secondary.email || null,
    google_rating: numberOrNull(primary.google_rating) ?? numberOrNull(secondary.google_rating),
    google_review_count: integerOrNull(primary.google_review_count) ?? integerOrNull(secondary.google_review_count),
    google_maps_url: primary.google_maps_url || secondary.google_maps_url || null,
    primary_location: primary.primary_location || secondary.primary_location || null,
    service_area: primary.service_area || secondary.service_area || null,
    business_summary: primary.business_summary || secondary.business_summary || null,
    social_profiles: dedupeSocialProfiles([...(primary.social_profiles || []), ...(secondary.social_profiles || [])]),
    size_signals: {
      locations_count: integerOrNull(primary.size_signals?.locations_count) ?? integerOrNull(secondary.size_signals?.locations_count),
      team_size: primary.size_signals?.team_size || secondary.size_signals?.team_size || null,
      years_in_business: primary.size_signals?.years_in_business || secondary.size_signals?.years_in_business || null,
      years_in_business_estimate:
        integerOrNull(primary.size_signals?.years_in_business_estimate) ??
        integerOrNull(secondary.size_signals?.years_in_business_estimate),
      notes: uniqueStrings([...(primary.size_signals?.notes || []), ...(secondary.size_signals?.notes || [])])
    },
    automation_signals: {
      chatbot_present: boolOrNull(primary.automation_signals?.chatbot_present) ?? boolOrNull(secondary.automation_signals?.chatbot_present),
      online_booking_present:
        boolOrNull(primary.automation_signals?.online_booking_present) ??
        boolOrNull(secondary.automation_signals?.online_booking_present),
      sms_or_textback_present:
        boolOrNull(primary.automation_signals?.sms_or_textback_present) ??
        boolOrNull(secondary.automation_signals?.sms_or_textback_present),
      self_serve_forms_present:
        boolOrNull(primary.automation_signals?.self_serve_forms_present) ??
        boolOrNull(secondary.automation_signals?.self_serve_forms_present),
      website_modernity:
        primary.automation_signals?.website_modernity || secondary.automation_signals?.website_modernity || null,
      slow_response_signals: uniqueStrings([
        ...(primary.automation_signals?.slow_response_signals || []),
        ...(secondary.automation_signals?.slow_response_signals || [])
      ]),
      notes: uniqueStrings([...(primary.automation_signals?.notes || []), ...(secondary.automation_signals?.notes || [])])
    },
    fit_notes: uniqueStrings([...(primary.fit_notes || []), ...(secondary.fit_notes || [])]),
    revenue_potential_notes: uniqueStrings([
      ...(primary.revenue_potential_notes || []),
      ...(secondary.revenue_potential_notes || [])
    ]),
    source_urls: dedupeUrls([...(primary.source_urls || []), ...(secondary.source_urls || [])])
  };
}

function getLocationText(profile) {
  return `${profile.primary_location || ""} ${profile.service_area || ""}`.toLowerCase();
}

function evaluateServiceAreaFit(profile) {
  const locationText = getLocationText(profile);
  if (!locationText.trim()) {
    return {
      score: 1.5,
      label: "Unknown",
      reason: "The business location is not fully clear, so territory fit is only a partial match."
    };
  }
  if (SOUTH_JERSEY_KEYWORDS.some((keyword) => locationText.includes(keyword)) ||
      PHILLY_METRO_KEYWORDS.some((keyword) => locationText.includes(keyword))) {
    return {
      score: 4,
      label: "Strong",
      reason: "The business appears to sit directly inside the South Jersey / Philadelphia target service area."
    };
  }
  if (REGION_KEYWORDS.some((keyword) => locationText.includes(keyword))) {
    return {
      score: 2.5,
      label: "Medium",
      reason: "The business is in the broader NJ / PA / DE region, but not clearly inside the tightest target geography."
    };
  }
  return {
    score: 0.5,
    label: "Weak",
    reason: "The business appears outside the South Jersey / Philadelphia focus area."
  };
}

function isSmallTeam(teamSize) {
  const text = normalizeText(teamSize).toLowerCase();
  if (!text) return false;
  return [
    "1-5",
    "2-10",
    "1-10",
    "3-10",
    "5-10",
    "small",
    "owner-operator",
    "owner operator",
    "under 10"
  ].some((pattern) => text.includes(pattern));
}

function evaluateAutomationGap(profile) {
  let score = 0.5;
  const reasons = [];
  if (profile.automation_signals.chatbot_present === false) {
    score += 1.1;
    reasons.push("no obvious chatbot or instant-response layer");
  } else if (profile.automation_signals.chatbot_present == null) {
    score += 0.4;
  }
  if (profile.automation_signals.online_booking_present === false) {
    score += 0.6;
    reasons.push("no clear online booking or self-serve scheduling");
  }
  if (profile.automation_signals.sms_or_textback_present === false) {
    score += 0.4;
    reasons.push("no visible missed-call text back or SMS automation");
  }
  if (isSmallTeam(profile.size_signals.team_size)) {
    score += 0.5;
    reasons.push("team-size signals suggest a lean staff");
  }
  if (integerOrNull(profile.size_signals.locations_count) != null && profile.size_signals.locations_count <= 2) {
    score += 0.3;
  }
  if ((profile.automation_signals.slow_response_signals || []).length > 0) {
    score += 0.7;
    reasons.push("public signals hint at slow or manual follow-up");
  }
  if ((profile.automation_signals.notes || []).length > 0 && reasons.length < 3) {
    reasons.push(profile.automation_signals.notes[0]);
  }
  return {
    score: Math.min(3, score),
    reason:
      reasons.length > 0 ?
        `Likely automation gap: ${reasons.slice(0, 3).join(", ")}.` :
        "Likely some automation headroom, but the public evidence is mixed."
  };
}

function evaluateRevenuePotential(profile) {
  const verticalKey = getVerticalKey(profile.vertical);
  const config = VERTICAL_CONFIG[verticalKey] || VERTICAL_CONFIG.home_services;
  let score = config.revenueWeight || 1.4;
  const reasons = [`${normalizeVertical(profile.vertical)} is a strong Aetherlex target vertical`];
  if ((profile.google_review_count || 0) >= 150) {
    score += 0.6;
    reasons.push("high review volume suggests established demand");
  } else if ((profile.google_review_count || 0) >= 40) {
    score += 0.4;
  } else if ((profile.google_review_count || 0) >= 10) {
    score += 0.2;
  }
  if ((profile.size_signals.locations_count || 0) >= 2) {
    score += 0.4;
    reasons.push("multiple locations expand automation upside");
  }
  if ((profile.size_signals.years_in_business_estimate || 0) >= 5) {
    score += 0.2;
  }
  if ((profile.google_rating || 0) >= 4.4) {
    score += 0.2;
  }
  if ((profile.revenue_potential_notes || []).length > 0 && reasons.length < 3) {
    reasons.push(profile.revenue_potential_notes[0]);
  }
  return {
    score: Math.min(3, score),
    reason: `Revenue potential looks solid: ${reasons.slice(0, 3).join(", ")}.`
  };
}

function buildScore(profile) {
  const fit = evaluateServiceAreaFit(profile);
  const gap = evaluateAutomationGap(profile);
  const revenue = evaluateRevenuePotential(profile);
  const total = Math.max(1, Math.min(10, Math.round(fit.score + gap.score + revenue.score)));
  return {
    score: total,
    territory_fit: fit.label,
    score_reasoning: [fit.reason, gap.reason, revenue.reason]
  };
}

function bestLocationPhrase(profile) {
  return profile.primary_location || profile.service_area || "your market";
}

function bestCredibilityPhrase(profile) {
  if (profile.google_rating && profile.google_review_count) {
    return `a ${profile.google_rating.toFixed(1)} Google rating across ${profile.google_review_count} reviews`;
  }
  if (profile.size_signals.years_in_business) {
    return `${profile.size_signals.years_in_business} in business`;
  }
  if (profile.website_url) {
    return `your site at ${profile.website_url}`;
  }
  return "your business online";
}

function buildEmailDraft(profile) {
  const verticalKey = getVerticalKey(profile.vertical);
  const config = VERTICAL_CONFIG[verticalKey] || VERTICAL_CONFIG.home_services;
  const subject = `${config.subject} at ${profile.canonical_name}`;
  const greeting = `Hi ${profile.canonical_name} team,`;
  const opening = `I came across ${profile.canonical_name} in ${bestLocationPhrase(profile)} and noticed ${bestCredibilityPhrase(profile)}.`;
  const pitch = config.pitch;
  const cta = `If helpful, I can put together a free AI Revenue Audit for ${profile.canonical_name} and show where automation could recover missed revenue.`;
  const signature = [
    "Steven",
    "Aetherlex AI",
    "(609) 464-0755",
    "hello@aetherlexai.com"
  ].join("\n");
  return {
    subject,
    body: [greeting, "", opening, "", pitch, "", cta, "", signature].join("\n")
  };
}

function composeWebviewUrl(mode, profile) {
  const data = encodeBase64Json({mode, profile});
  return `../assets/prospect-panel.html?mode=${encodeURIComponent(mode)}&data=${encodeURIComponent(data)}&v=${Date.now()}`;
}

function formatValue(value, fallback = "Unavailable") {
  return value == null || value === "" ? fallback : value;
}

function formatReviewLine(profile) {
  if (profile.google_rating && profile.google_review_count) {
    return `${profile.google_rating.toFixed(1)} stars from ${profile.google_review_count} Google reviews`;
  }
  if (profile.google_rating) {
    return `${profile.google_rating.toFixed(1)} Google rating`;
  }
  return "Unavailable";
}

function formatSocialLine(profile) {
  if (!profile.social_profiles.length) return "Unavailable";
  return profile.social_profiles.map((item) => item.platform).join(", ");
}

function formatSizeLine(profile) {
  const parts = [];
  if (profile.size_signals.locations_count != null) parts.push(`${profile.size_signals.locations_count} location(s)`);
  if (profile.size_signals.team_size) parts.push(`team: ${profile.size_signals.team_size}`);
  if (profile.size_signals.years_in_business) parts.push(profile.size_signals.years_in_business);
  return parts.length ? parts.join("; ") : "Unavailable";
}

function buildResearchResult(profile) {
  const lines = [
    `**${profile.canonical_name}**`,
    `Vertical: ${formatValue(profile.vertical)}`,
    `Website: ${formatValue(profile.website_url)}`,
    `Phone: ${formatValue(profile.phone)}`,
    `Email: ${formatValue(profile.email)}`,
    `Google reviews: ${formatReviewLine(profile)}`,
    `Social: ${formatSocialLine(profile)}`,
    `Size signals: ${formatSizeLine(profile)}`,
    "",
    `Prospect score: **${profile.score}/10**`,
    `- ${profile.score_reasoning[0]}`,
    `- ${profile.score_reasoning[1]}`,
    `- ${profile.score_reasoning[2]}`,
    "",
    "Sources:"
  ];
  const sources = profile.source_urls.slice(0, 6);
  if (sources.length) {
    for (const url of sources) lines.push(`- ${url}`);
  } else {
    lines.push("- No source URLs captured");
  }
  lines.push("");
  lines.push("Call now or send email?");
  lines.push("The preview card includes quick actions for both.");
  return lines.join("\n");
}

function buildCallResult(profile) {
  return [
    `**${profile.canonical_name}**`,
    `Phone: ${formatValue(profile.phone)}`,
    "",
    "Tap the preview card to dial."
  ].join("\n");
}

function buildEmailResult(profile) {
  return [
    `Subject: ${profile.email_draft.subject}`,
    "",
    profile.email_draft.body,
    "",
    "The preview card includes a ready-to-open mail draft."
  ].join("\n");
}

async function researchProspect(input, apiKey) {
  const maps = await runMapsResearch(input, apiKey).catch((_error) => ({profile: {}, sourceUrls: []}));
  const search = await runStructuredResearch(input, maps.profile, apiKey);
  const merged = mergeProfiles(search.profile, maps.profile || {});
  return finalizeProfile(input, merged, dedupeUrls([...(search.sourceUrls || []), ...(maps.sourceUrls || [])]));
}

function finalizeProfile(input, rawProfile, extraSources) {
  const merged = mergeProfiles(rawProfile || {}, {});
  const profile = {
    canonical_name: merged.canonical_name || input.businessName || "Unknown Prospect",
    vertical: normalizeVertical(merged.vertical),
    website_url: normalizeUrl(merged.website_url),
    contact_url: normalizeUrl(merged.contact_url),
    phone: normalizePhone(merged.phone),
    email: normalizeEmail(merged.email),
    google_rating: numberOrNull(merged.google_rating),
    google_review_count: integerOrNull(merged.google_review_count),
    google_maps_url: normalizeUrl(merged.google_maps_url),
    primary_location: nullIfEmpty(merged.primary_location),
    service_area: nullIfEmpty(merged.service_area),
    business_summary: nullIfEmpty(merged.business_summary),
    social_profiles: dedupeSocialProfiles(merged.social_profiles),
    size_signals: {
      locations_count: integerOrNull(merged.size_signals.locations_count),
      team_size: nullIfEmpty(merged.size_signals.team_size),
      years_in_business: nullIfEmpty(merged.size_signals.years_in_business),
      years_in_business_estimate: integerOrNull(merged.size_signals.years_in_business_estimate),
      notes: uniqueStrings(merged.size_signals.notes)
    },
    automation_signals: {
      chatbot_present: boolOrNull(merged.automation_signals.chatbot_present),
      online_booking_present: boolOrNull(merged.automation_signals.online_booking_present),
      sms_or_textback_present: boolOrNull(merged.automation_signals.sms_or_textback_present),
      self_serve_forms_present: boolOrNull(merged.automation_signals.self_serve_forms_present),
      website_modernity: nullIfEmpty(merged.automation_signals.website_modernity),
      slow_response_signals: uniqueStrings(merged.automation_signals.slow_response_signals),
      notes: uniqueStrings(merged.automation_signals.notes)
    },
    fit_notes: uniqueStrings(merged.fit_notes),
    revenue_potential_notes: uniqueStrings(merged.revenue_potential_notes),
    source_urls: dedupeUrls([...(merged.source_urls || []), ...(extraSources || [])]),
    researched_at: new Date().toISOString()
  };
  const scoring = buildScore(profile);
  profile.score = scoring.score;
  profile.territory_fit = scoring.territory_fit;
  profile.score_reasoning = scoring.score_reasoning;
  profile.email_draft = buildEmailDraft(profile);
  return profile;
}

function normalizeInput(raw) {
  return {
    action: normalizeText(raw?.action || "research").toLowerCase() || "research",
    businessName: nullIfEmpty(raw?.businessName),
    locationHint: nullIfEmpty(raw?.locationHint),
    sourceType: normalizeText(raw?.sourceType || "text").toLowerCase() || "text",
    notes: nullIfEmpty(raw?.notes)
  };
}

function missingKeyMessage() {
  return JSON.stringify({
    error:
      "Gemini API key missing. Add a Google AI Studio key in the skill secret prompt so the prospect research can run."
  });
}

window["ai_edge_gallery_get_result"] = async (dataStr, secret) => {
  try {
    if (!secret) return missingKeyMessage();
    const input = normalizeInput(safeJsonParse(dataStr, {}));
    const cached = findCachedProspect(input.businessName, input.locationHint);
    if (!cached && !input.businessName) {
      return JSON.stringify({
        error:
          "No business clue was provided yet. Send a typed business name, or use a photo and include the visible name or location hint in the tool input."
      });
    }
    const needsFreshResearch = input.action === "research" || !cached || (input.businessName && normalizeText(cached.canonical_name).toLowerCase() !== normalizeText(input.businessName).toLowerCase());
    const profile = needsFreshResearch ? await researchProspect(input, secret) : cached;
    cacheProspect(profile);

    if (input.action === "call") {
      return JSON.stringify({
        webview: {url: composeWebviewUrl("call", profile)},
        result: buildCallResult(profile)
      });
    }

    if (input.action === "email") {
      return JSON.stringify({
        webview: {url: composeWebviewUrl("email", profile)},
        result: buildEmailResult(profile)
      });
    }

    return JSON.stringify({
      webview: {url: composeWebviewUrl("decision", profile)},
      result: buildResearchResult(profile)
    });
  } catch (error) {
    console.error(error);
    return JSON.stringify({
      error: `Aetherlex Prospect Hunter failed: ${error.message}`
    });
  }
};
