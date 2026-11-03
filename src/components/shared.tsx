import Link from "next/link";
import { BUSINESS, locations, services, type FAQ } from "@/lib/content";
import { Icon } from "./icon";
import { Img } from "./image";
import { FAQList } from "./interactive";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="eyebrow-line" />
      {children}
    </span>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item, i) => (
        <span key={`${item.name}-${i}`}>
          <span aria-hidden="true">/</span>
          {item.href ? (
            <Link href={item.href}>{item.name}</Link>
          ) : (
            <span aria-current="page">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function ReviewBadge() {
  return (
    <div className="review-badge">
      <span className="google-g" aria-hidden="true">
        G
      </span>
      <div>
        <span className="stars" aria-label="4.9 out of 5 stars">
          ★★★★★
        </span>
        <span>
          <strong>4.9</strong> on Google{" "}
          <span className="muted">· 150+ reviews</span>
        </span>
      </div>
    </div>
  );
}

export function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`trust-strip ${compact ? "compact" : ""}`}>
      <div className="trust-title">
        <Icon name="shield" />
        <span>
          Expert eyes.
          <br />
          <strong>Credentials that count.</strong>
        </span>
      </div>
      <div className="trust-credential">
        <Img
          src="/images/cpi.webp"
          sizes="78px"
          alt="InterNACHI Certified Professional Inspector badge"
          width="100"
          height="72"
          loading="lazy"
        />
        <span>
          InterNACHI
          <br />
          <strong>Certified inspectors</strong>
        </span>
      </div>
      <div className="trust-credential">
        <Img
          src="/images/govt-of-dubai.webp"
          sizes="78px"
          alt="Government of Dubai licensing logo displayed by Halo"
          width="100"
          height="72"
          loading="lazy"
        />
        <span>
          DED licensed
          <br />
          <strong>Dubai registered</strong>
        </span>
      </div>
      <div className="trust-credential">
        <Img
          src="/images/land-department.webp"
          sizes="78px"
          alt="Dubai Land Department logo displayed by Halo"
          width="100"
          height="72"
          loading="lazy"
        />
        <span>
          RERA approved
          <br />
          <strong>Professional standards</strong>
        </span>
      </div>
      <Link
        className="trust-more"
        href="/company/certifications"
        aria-label="Explore Halo licensing and certifications"
      >
        <Icon name="arrow" />
      </Link>
    </div>
  );
}

export const pressMentions = [
  { src: "gulf-news.webp", alt: "Gulf News" },
  { src: "khaleej-times.webp", alt: "Khaleej Times" },
  { src: "gulf-today.webp", alt: "Gulf Today" },
  { src: "yahoo-news.webp", alt: "Yahoo News" },
  { src: "business-insider.webp", alt: "Business Insider" },
];

export function MediaStrip() {
  return (
    <div className="media-strip">
      <span className="tiny-label">AS FEATURED IN</span>
      <div>
        {pressMentions.map((i) => (
          <Img
            src={`/images/${i.src}`}
            sizes="120px"
            alt={i.alt}
            width="150"
            height="50"
            loading="lazy"
            key={i.alt}
          />
        ))}
      </div>
    </div>
  );
}

export function Process({ dark = false }: { dark?: boolean }) {
  return (
    <section
      className={`process-section section ${dark ? "dark-surface" : ""}`}
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>A CLEAR PATH TO PEACE OF MIND</Eyebrow>
            <h2>
              Three steps.
              <br />
              One informed decision.
            </h2>
          </div>
          <p>
            From the first conversation to your report, we make the next step
            easy to understand.
          </p>
        </div>
        <div className="process-grid">
          {[
            {
              n: "01",
              icon: "key" as const,
              title: "Tell us about your property",
              text: "Share the type, size, location and inspection you need. We agree your scope, fee and appointment.",
            },
            {
              n: "02",
              icon: "search" as const,
              title: "We take a closer look",
              text: "Our team systematically checks accessible areas, using appropriate equipment and recording the findings.",
            },
            {
              n: "03",
              icon: "report" as const,
              title: "Get a clear picture",
              text: "Receive your photographic report, discuss the findings and arrange a re-inspection if you need one.",
            },
          ].map((p) => (
            <div key={p.n} className="process-step">
              <div className="process-step-top">
                <span>{p.n}</span>
                <Icon name={p.icon} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        <div className="process-footnote">
          <Icon name="clock" />
          Reports usually within 24 hours. Confirm timing for your property when
          booking.
        </div>
      </div>
    </section>
  );
}

export function CTA({
  title = "A beautiful property starts with a clearer picture.",
  text = "Tell us about your property. We’ll help you take the right next step.",
  href = "/quote",
}: {
  title?: string;
  text?: string;
  href?: string;
}) {
  return (
    <section className="cta-section container">
      <div className="cta-panel">
        <div className="cta-orbit" aria-hidden="true" />
        <div className="cta-content">
          <Eyebrow>LET’S LOOK A LITTLE CLOSER</Eyebrow>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Link className="button button-light" href={href}>
            Get your inspection quote
            <Icon name="arrow" />
          </Link>
          <a className="cta-phone" href={BUSINESS.phoneLink}>
            <Icon name="phone" />
            {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function FAQSection({
  items,
  title = "A few things you might be wondering.",
}: {
  items: FAQ[];
  title?: string;
}) {
  return (
    <section className="section faq-section">
      <div className="container faq-layout">
        <div>
          <Eyebrow>GOOD QUESTIONS. CLEAR ANSWERS.</Eyebrow>
          <h2>{title}</h2>
          <p>Still have a question? We’re happy to talk it through.</p>
          <Link href="/contact" className="text-link">
            Talk to our team
            <Icon name="arrow" />
          </Link>
        </div>
        <FAQList items={items} />
      </div>
    </section>
  );
}

export function RelatedServices({
  exclude,
  limit = 3,
}: {
  exclude?: string;
  limit?: number;
}) {
  const list = services.filter((s) => s.slug !== exclude).slice(0, limit);
  return (
    <section className="section related-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>THE RIGHT CHECK AT THE RIGHT TIME</Eyebrow>
            <h2>Explore other inspections.</h2>
          </div>
          <Link href="/services" className="text-link">
            All services
            <Icon name="arrow" />
          </Link>
        </div>
        <div className="service-cards">
          {list.map((s) => (
            <Link href={`/${s.slug}`} className="service-card" key={s.slug}>
              <div className="service-card-photo">
                <Img
                  src={`/images/${s.image}.webp`}
                  sizes="(max-width: 640px) 92vw, 440px"
                  alt={s.imageAlt}
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
                <span className="circle-arrow">
                  <Icon name="arrow" />
                </span>
              </div>
              <span className="tiny-label">{s.eyebrow}</span>
              <h3>{s.name}</h3>
              <p>{s.intro}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <Img
                src="/images/logo.webp"
                sizes="126px"
                alt="Halo Property Inspection"
                width="160"
                height="61"
              />
            </Link>
            <p>
              Independent eyes.
              <br />
              For your most important investment.
            </p>
            <a href={BUSINESS.phoneLink} className="footer-phone">
              {BUSINESS.phone}
            </a>
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            <a
              className="footer-address"
              href={BUSINESS.map}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="location" />
              {BUSINESS.address}
            </a>
          </div>
          <div>
            <h3>Inspections</h3>
            {services
              .filter(
                (s, i) =>
                  i < 3 ||
                  [
                    "services/apartment",
                    "services/villa",
                    "services/secondary-inspection",
                    "services/commercial/commercial-inspection",
                  ].includes(s.slug),
              )
              .map((s) => (
                <Link href={`/${s.slug}`} prefetch={false} key={s.slug}>
                  {s.shortName}
                </Link>
              ))}
            <Link className="text-link" href="/services">
              All services
              <Icon name="arrow" />
            </Link>
          </div>
          <div>
            <h3>Explore Halo</h3>
            {[
              { name: "About us", href: "/about" },
              { name: "Our projects", href: "/projects" },
              { name: "Inspection tools", href: "/inspection-tools" },
              {
                name: "Licensing & certifications",
                href: "/company/certifications",
              },
              { name: "Questions & answers", href: "/faq" },
              { name: "Contact", href: "/contact" },
              { name: "Get a quote", href: "/quote" },
              { name: "For developers", href: "/partnerships/developers" },
              {
                name: "For property managers",
                href: "/partnerships/property-managers",
              },
              {
                name: "For real estate agents",
                href: "/partnerships/real-estate-agents",
              },
            ].map((l) => (
              <Link href={l.href} key={l.href} prefetch={false}>
                {l.name}
              </Link>
            ))}
          </div>
          <div>
            <h3>Across the UAE</h3>
            {locations
              .filter((l) =>
                [
                  "dubai-marina",
                  "downtown-dubai",
                  "palm-jumeirah",
                  "dubai-hills",
                  "abu-dhabi",
                  "sharjah",
                ].includes(l.slug),
              )
              .map((l) => (
                <Link
                  href={`/locations/${l.slug}`}
                  key={l.slug}
                  prefetch={false}
                >
                  {l.name}
                </Link>
              ))}
            <Link className="text-link" href="/locations">
              All locations
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
        <div className="footer-areas">
          <span>Dubai communities</span>
          {locations
            .filter((l) => l.region === "Dubai")
            .map((l) => (
              <Link href={`/locations/${l.slug}`} prefetch={false} key={l.slug}>
                {l.name}
              </Link>
            ))}
        </div>
        <div className="footer-bottom">
          <p>© {2026} Halo Property Inspection by Halo Shield LLC.</p>
          <div>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-of-service">Terms of service</Link>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
              <Icon name="arrow" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
