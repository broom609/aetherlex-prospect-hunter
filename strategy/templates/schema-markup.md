# Schema Markup Plan — Copy-Paste JSON-LD

Use **JSON-LD** in `<head>` or end of `<body>`. One logical graph per page.
**Validate** with Google Rich Results Test + Schema.org validator.
**Truthfulness is mandatory** — only mark up real, on-page, substantiable data
(see Master §15). Replace bracketed tokens.

---

## 1. Organization (site-wide, e.g. homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://[domain]/#organization",
  "name": "[Brand]",
  "url": "https://[domain]/",
  "logo": "https://[domain]/logo.png",
  "image": "https://[domain]/storefront.jpg",
  "telephone": "+1-[phone]",
  "sameAs": [
    "https://www.facebook.com/[brand]",
    "https://www.instagram.com/[brand]",
    "https://www.google.com/maps?cid=[gbp-cid]"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-[phone]",
    "contactType": "customer service",
    "areaServed": "US-NJ",
    "availableLanguage": "English"
  }
}
```

## 2. LocalBusiness (home + city + money pages)
Use the most specific subtype available (e.g., `HomeAndConstructionBusiness`,
`Plumber`, `RoofingContractor`).
```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://[domain]/#localbusiness",
  "name": "[Brand]",
  "image": "https://[domain]/team.jpg",
  "url": "https://[domain]/",
  "telephone": "+1-[phone]",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[real street address]",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[zip]",
    "addressCountry": "US"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": [lat], "longitude": [lng] },
  "areaServed": [
    { "@type": "City", "name": "Cherry Hill" },
    { "@type": "City", "name": "Marlton" },
    { "@type": "City", "name": "Voorhees" }
  ],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00", "closes": "23:59"
  }],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
}
```
> Only include `aggregateRating` if it reflects real, verifiable reviews. Only use
> an `address` you actually operate from.

## 3. Service (service + money pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "[Service]",
  "name": "[Service] in [City], [State]",
  "description": "[1–2 sentence factual description].",
  "provider": { "@id": "https://[domain]/#localbusiness" },
  "areaServed": { "@type": "City", "name": "[City]" },
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "USD",
      "minPrice": "[min]",
      "maxPrice": "[max]"
    }
  }
}
```

## 4. FAQPage (any page with a visible FAQ block — text MUST match)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How fast can you respond in [City]?",
      "acceptedAnswer": { "@type": "Answer",
        "text": "We dispatch crews to [City] 24/7 and typically arrive within [ResponseTime]." }
    },
    {
      "@type": "Question",
      "name": "Does insurance cover [service] in [State]?",
      "acceptedAnswer": { "@type": "Answer",
        "text": "In most cases, yes. We document the damage and bill your insurer directly. Coverage depends on your policy and the cause of loss." }
    }
  ]
}
```

## 5. Review + AggregateRating (reviews page / money pages)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://[domain]/#localbusiness",
  "name": "[Brand]",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" },
  "review": [{
    "@type": "Review",
    "author": { "@type": "Person", "name": "[Real Customer Name]" },
    "datePublished": "2026-05-12",
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "[Real review text]."
  }]
}
```
> Real reviews only. Fabricated reviews/ratings violate Google policy and FTC law.

## 6. BreadcrumbList (every deep page)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://[domain]/" },
    { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://[domain]/locations/" },
    { "@type": "ListItem", "position": 3, "name": "Cherry Hill", "item": "https://[domain]/water-damage-restoration-cherry-hill-nj/" }
  ]
}
```

## 7. WebSite + WebPage (site-wide)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://[domain]/#website",
  "url": "https://[domain]/",
  "name": "[Brand]",
  "publisher": { "@id": "https://[domain]/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://[domain]/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

## 8. Offer / Product (only if selling a defined package)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Service] Package — [City]",
  "description": "[What's included].",
  "brand": { "@id": "https://[domain]/#organization" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "[price]",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## Page → schema matrix
| Page | Schemas |
|---|---|
| Homepage | Organization, LocalBusiness (+aggregateRating), WebSite, FAQPage |
| Service page | Service, LocalBusiness, FAQPage, BreadcrumbList, Review/AggregateRating |
| City money page | LocalBusiness (areaServed=city), Service, FAQPage, BreadcrumbList, Review/AggregateRating |
| Reviews page | LocalBusiness + Review + AggregateRating |
| Resource/blog | Article/BlogPosting, FAQPage (if FAQ), BreadcrumbList |
| Comparison | FAQPage/Article, BreadcrumbList |

## Validation routine
1. Google Rich Results Test (per template).
2. Schema.org validator (syntax).
3. Search Console → Enhancements (monitor errors post-launch).
4. Re-check after any template change.
