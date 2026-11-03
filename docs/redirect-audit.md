# Redirect audit — 3 November 2026

Checked the [live sitemap](https://haloinspection.ae/sitemap.xml),
[live application router](https://haloinspection.ae/assets/index-D7Y_bsj1.js),
HTTP responses and public DNS against the staged static export.
The machine-readable evidence is `research/redirect-audit-2026-11-03.json`.

All 49 live sitemap URLs are preserved. The live router also defines six
client-side aliases that were missing from the staged `_redirects` file:

| Old path | Direct 301 destination |
| --- | --- |
| `/Contact` | `/contact` |
| `/services/residential/apartment-inspection` | `/services/apartment` |
| `/services/residential/villa-inspection` | `/services/villa` |
| `/services/residential/secondary-inspection` | `/services/secondary-inspection` |
| `/services/commercial/hotel-inspection` | `/services/hotel` |
| `/services/commercial/developer-services` | `/services/developer` |

These aliases are now real HTTP 301s. Both slash forms of all 13 known page
aliases redirect directly to the final URL, without a trailing-slash hop.
The 107 original image redirects are retained: 133 rules in total, including
26 page rules. Unknown paths still return 404.

`src/lib/legacy-redirects.json` is the page alias source of truth. Regenerate
its rules with `npm run redirects:pages`; regenerate image mappings with
`node scripts/generate-image-redirects.mjs`. Both commands preserve the other's
section. `npm run verify:redirects` checks the real exported filenames with
case sensitivity, source conflicts, loops/chains, final destinations, the live
sitemap inventory and known live router aliases. It runs in `npm run check`.

## Verification

The complete production build, TypeScript check, content export verification,
redirect inventory verification and GTM/indexing checks passed. The local
Cloudflare Pages server parsed all 133 rules. Actual HTTP checks confirmed
133 HTTP 301 responses, 119 unique final HTTP 200 destinations, query-string
preservation on all 26 page rules, no extra redirect hops, and real HTTP 404
responses for unknown URLs. The resources gap is explicitly reported and
remains unresolved. No production changes were applied.

## Resources: content migration remains necessary

The live router has `/resources` and `/resources/:slug`, which are absent from
the new site. Its article list is fetched from a public Strapi CMS, rather
than embedded in the bundle or listed in the live sitemap. That CMS endpoint
failed the TLS handshake during this audit, so article slugs and content could
not be recovered. No article inventory has been assumed complete.

Restore the resources listing and recover the article export before cutover,
retaining old URLs or mapping each article to equivalent content. There is no
equivalent target in the staged site today, so no broad resources-to-homepage
or resources-to-services redirect was added. The verifier explicitly reports
these deferred content routes rather than silently treating them as covered.
Search Console and backlink exports may reveal additional historic URLs.

## Canonical host: Cloudflare configuration remains necessary

- `http://haloinspection.ae/` already responds with a 301 to HTTPS.
- `www.haloinspection.ae` returned NXDOMAIN in the
  [public DNS lookup](https://dns.google/resolve?name=www.haloinspection.ae&type=A).
  Add the intended proxied www DNS record and verify TLS coverage, then add
  Cloudflare redirect rules that send www requests to the HTTPS apex and
  preserve the complete path and query string.
- For HTTPS www, the Single Redirect wildcard pattern is
  `https://www.haloinspection.ae/*`, target `https://haloinspection.ae/${1}`,
  status 301, Preserve query string enabled. Use an equivalent HTTP www rule
  targeting the same HTTPS apex if HTTP is not already covered at the edge.
  See [Cloudflare's www-to-root example](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/).
- Do not add an absolute hostname as the source in Pages `_redirects`:
  [domain-level redirects are not supported there](https://developers.cloudflare.com/pages/configuration/redirects/).
- Do not redirect `book.haloinspection.ae` as part of this migration; it is a
  separate booking application, and no retirement instruction was provided.

The live SPA returns HTTP 200 even for unknown paths. This audit uses the
actual router and sitemap inventory, rather than counting those shell
responses as valid pages. No production DNS, redirects or content were changed.
