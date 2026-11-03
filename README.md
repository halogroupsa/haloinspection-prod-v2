# Halo Property Inspection

A responsive Next.js 16 App Router website with a complete static export. All **49 URLs** in the supplied sitemap are preserved, with `/inspection-tools`, `/projects` and ten project detail pages added for **61 pages**. The public Halo production domain is `https://haloinspection.ae`.

## Run locally

Requires Node.js 24 or newer.

```sh
npm ci
npm run dev
```

For the production export and its checks:

```sh
npm run build
npm run verify
npm run preview
```

The preview serves the actual `out/` export at `http://127.0.0.1:3000`. It supports clean URLs, real 404 responses, and the supplied permanent redirects. Upload the **contents of `out/`** to a compatible static host. No Next.js server, database or image optimisation server is required.

## Features

- Curated project collection with community filters, ten individual project pages, click-to-play project films and keyboard-accessible photo galleries. Videos load only after the visitor chooses to play.
- Responsive navigation with keyboard-accessible mobile dialog and mobile call/quote/WhatsApp bar.
- Animated property cutaway walkthrough: finishes, plumbing, AC checks and a photographic report, with selectable steps and pause/play controls.
- Walkthrough pauses on hover, keyboard focus, page hiding and leaving the viewport; reduced-motion visitors get a static, selectable view.
- Keyboard-accessible inspection tabs.
- Site-wide motion: staggered entrances, card/image responses, menu and photo-dialog transitions, expanding FAQs, animated tab/filter changes and quote steps.
- Motion enhances rendered content without hiding it during loading or when JavaScript is disabled; keyboard focus bypasses entrances and reduced-motion preferences disable them.
- Service finder, searchable service directory and location directory.
- A distinct generated photographic inspection scene for each of the 18 services, used in directory cards and service heroes; responsive WebP sizes and descriptive alt text are included.
- All 20 real findings photos from the `halo-ae-next` inspection gallery, category filters, three initial rows with Load more, and an original/annotated photo viewer.
- Interactive inspection tools explorer on the homepage and a dedicated `/inspection-tools` page, with all ten equipment images copied from `halo-ae-next`, keyboard controls and responsive WebP sizes.
- Guided enquiry form with validation, property/location preselection, review step and WhatsApp/email handoff.
- Searchable FAQs, native accessible accordions and downloadable inspection preparation checklist.
- Existing branding, contact details, certification badges, review claims and testimonials carried over from the public source.
- Optimized local WebP photography and self-hosted fonts; reduced-motion support.

The enquiry form prepares the request in browser memory. **Visitors send it themselves using WhatsApp or their email application.** It does not claim to have delivered an enquiry, confirm a booking or accept payment. No form details are saved to browser storage. A JavaScript-disabled visitor can still use the direct contact links.

## SEO and deployment

The service photographs are generated illustrative marketing assets, not records of completed Halo jobs or portraits of Halo staff. The original defect evidence gallery is retained. Full prompts and asset mappings are saved in `design/service-images/assets.json`; originals are retained locally under `research/generated-images/services/`. Re-encode originals with `node scripts/prepare-service-images.mjs`, then regenerate responsive sizes with `npm run assets:images`.

- Every page is pre-rendered HTML, with its own title, description, H1 and production canonical.
- A 61-entry production sitemap, robots file, business/service/breadcrumb structured data and visible FAQ structured data are included.
- `_redirects` contains 26 page-alias rules (13 aliases and their slash forms) plus 107 original image URL redirects, using 301 status. Regenerate image mappings with `node scripts/generate-image-redirects.mjs` after changing the asset manifest.
- `_headers` contains content-type protection and appropriate static resource caching.
- The verifier independently checks every supplied URL, uniqueness of metadata/headings, sitemap inclusion, structured-data JSON, internal links, image dimensions/alt text and redirect destinations.
- Preserve the original no-trailing-slash URLs. Hosts must resolve `/services` to `/services.html`, and nested equivalents. Do not use a catch-all rewrite to the homepage: missing URLs should return `404.html` with a 404 status.

For Nginx, use `try_files $uri $uri.html $uri/ =404;`, define `error_page 404 /404.html;`, and translate the `_redirects` entries to permanent redirect rules. On hosts supporting `_redirects` and `_headers`, verify those rules are actually enabled. Hosting providers can normalize the homepage canonical's trailing slash; `https://haloinspection.ae` and `https://haloinspection.ae/` identify the same homepage.

Before domain cutover, verify the new host's clean URLs, redirects, TLS, HTTP 404 handling and sitemap. Keep the old site available for rollback. Preserve existing analytics/Search Console verification in the hosting/account configuration and reconnect conversion tracking if used. GTM `GTM-W22N4NV4` loads once on the HTTPS production hostname; configure advertising and analytics tags inside that container. Submit the production sitemap and monitor coverage and organic traffic after launch. Technical SEO checks cannot guarantee unchanged rankings or a higher ranking.

### Private review deployment

The regenerated inspector photographs use the existing black Halo polo, sleeve branding and back slogan as uniform references. Their complete prompts and reference mapping are in `design/uniform-images/assets.json`, with originals and reference copies retained locally under `research/generated-images/uniform/`. Replacing `inspector.webp` also regenerates its responsive derivatives, including `inspector-768.webp`.

The Sites project is owner-private and separate from `haloinspection.ae`. Build its review archive with:

```sh
NEXT_PUBLIC_NOINDEX=true npm run build
```

The private archive emits noindex metadata and an empty sitemap, while keeping Halo production canonicals when NEXT_PUBLIC_SITE_URL is unchanged. For the actual production site, build with `NEXT_PUBLIC_NOINDEX=false` (the default), then run the verifier. `.openai/hosting.json` declares `out` as the static directory.

## Content and assets

- `src/lib/projects.ts` and `src/components/projects-page.tsx`: project content and listing/detail layouts, using the existing Urbanist/Manrope typography and Halo color tokens.
- `research/project-media.json`: exact source mapping for 51 selected images and ten optimized project films. DH139 remains a separate photo project; the matching Mudon photo and video sets share one page.
- `scripts/prepare-project-media.py`: reproducible media preparation from the supplied property-inspection-resources folder. Original photos are visually curated; additional stills come from the corresponding project's original footage with its existing HDR conversion. Originals remain untouched and outside deployment output.
- `src/lib/content.ts`: business details, service copy, location copy, FAQs and the page inventory.
- `src/components/page-templates.tsx`: service, location, company, contact and partnership layouts.
- `src/app/page.tsx`: homepage.
- `src/components/hero-walkthrough.tsx` and its CSS module: interactive hero; its property model is illustrative and its example photographs come from Halo’s existing inspection gallery.
- `src/lib/inspection-tools.ts` and `src/components/inspection-tools-explorer.tsx`: equipment content and the shared interactive tools component. Image provenance is recorded in `research/inspection-tools-assets.json`.
- `design/hero-animation/asset.json`: generated cutaway asset prompt and provenance. Optimized transparent WebP variants are 169 KB for desktop and 68 KB for mobile.
- `src/app/globals.css`: design tokens and responsive styles.
- `research/business-audit.json`: original public claims and factual source evidence.
- `research/assets.json`: asset provenance and optimized file details.
- `research/original-images/`: full downloaded originals, retained locally and excluded from Git/deployment packaging.

Original Google (4.9 / 150+) and Trustpilot (4.8 / 100+) claims, certification logos and named testimonials were retained from Halo's public website. Public certificate numbers and direct review-profile evidence were unavailable. Confirm current credentials, ratings and permissions for media/customer logos before replacing production. No new rankings, customers, guarantees or invented reviews are added to the site.

The original site has a legal-entity inconsistency: its footer names **Halo Shield LLC**, while its published privacy/terms name **Halo Interiors LLC**. The footer/business schema follow the footer identity; the legal pages preserve their existing named operator. Resolve that existing discrepancy with the business before public launch.

## Validation

Production build and TypeScript checks pass. The static verifier checks all 61 pages. Browser checks cover phone layouts, menus, hotspot/tab interactions, filters, photo dialogs, client navigation and the prepared quote payload. No test enquiry was sent. QA output is stored locally in `qa/`.

## Deployment configuration and production sync

Production origin: `https://haloinspection.ae`. GTM container: `GTM-W22N4NV4`.
Leave `NEXT_PUBLIC_SITE_URL` unset for production, or set it to that origin
(a trailing slash is accepted). Set it to the staging deployment's own origin
before preview builds. `NEXT_PUBLIC_NOINDEX=true` explicitly disables indexing;
the legacy `NEXT_PUBLIC_ALLOW_INDEXING=false` switch also disables it. Remove
staging-only overrides from production build settings.

Public production pages are indexable and included in the sitemap. Preview
builds emit `noindex, nofollow` metadata and an empty sitemap, with no sitemap
advertised by robots.txt. Crawling remains allowed so search engines can read
the noindex directives. Cloudflare `_headers` additionally applies noindex to
all request hosts except `https://haloinspection.ae`, even for a shared production export.
Use equivalent hostname-based headers on another hosting platform. No manual
edits to `_headers` are needed when syncing source.

GTM's standard bootstrap is present in the HTML head and runs only once on
HTTPS at exactly `haloinspection.ae`. It remains inactive on local, staging, Pages and
other hosts. A noscript tracker is omitted because it cannot check the runtime
hostname in a shared static export. Publish and verify the container's tags
through GTM Tag Assistant after deploying. Configure any www-to-apex redirect
in Cloudflare; analytics and indexing use the apex domain.

```sh
make check
NEXT_PUBLIC_SITE_URL=https://staging.haloinspection.ae npm run check
# Rebuild for production after checking a preview build.
make build
make start
```

`make check` also runs the local repo sync tests, requiring Bash, Git and rsync.
The Cloudflare build command is `npm run check`, with output directory `out`;
it regenerates route types before checking TypeScript, then checks the full
static export, existing content/redirect inventory,
GTM's runtime host restriction and indexing rules. `make start` uses the pinned
Cloudflare Wrangler to test the real header rules locally.

The production destination defaults to the sibling `haloinspection-prod-v2` checkout.
It is configurable; the old production application is never modified implicitly.
Clone the intended production repo first, then run:

```sh
make sync-to-prod-dry-run PROD_DIR=/absolute/path/to/production-repo
make sync-to-prod PROD_DIR=/absolute/path/to/production-repo
```

Sync previews changes before asking for confirmation; use `CONFIRM=1` only
after reviewing the preview. It requires a separate, clean Git checkout,
removes obsolete application files, and preserves Git history, secrets,
dependencies, build output, local hosting config and agent settings. Large raw
research/media and local QA files are excluded. Sync does not commit or push.

For manual deployment from the reviewed production checkout:

```sh
make deploy PAGES_PROJECT=your-actual-production-pages-project
```

The explicit project name prevents selecting a deployment destination by
accident. All build/export checks run before uploading. Attach `haloinspection.ae` as
the production Pages custom domain. After deployment, verify the live response
has no noindex header, check robots.txt and sitemap.xml, and confirm the
published GTM tags in Tag Assistant. Local verification sends no real enquiries
or analytics requests.

## Live-site redirect audit

The 3 November 2026 [redirect audit](docs/redirect-audit.md) compares the live
sitemap and router with the export. Six previously missing aliases are added,
including `/Contact`, and all known page aliases have direct trailing-slash
variants. `npm run verify:redirects` validates the live URL inventory and
checks for case errors, source collisions and chains during the build checks.
The old resources/CMS section still needs content migration, and www DNS plus
canonical-host redirects must be configured in Cloudflare before cutover.
