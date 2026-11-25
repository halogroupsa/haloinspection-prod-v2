import Link from "next/link";
import { quotePrefillScript } from "@/lib/quote-prefill";
import {
  BUSINESS,
  services,
  locations,
  partnerships,
  generalFAQs,
  propertyQuoteHref,
  type Service,
  type Location,
} from "@/lib/content";
import { Icon } from "./icon";
import { Img } from "./image";
import {
  Breadcrumbs,
  CTA,
  Eyebrow,
  FAQSection,
  Process,
  RelatedServices,
  ReviewBadge,
  TrustStrip,
} from "./shared";
import {
  FAQList,
  InspectionExplorer,
  LocationDirectory,
  ServiceDirectory,
} from "./interactive";
import { QuoteForm } from "./quote-form";
import { PageSchema } from "@/lib/seo";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  breadcrumbs,
  cta = "Get an inspection quote",
  href = "/quote",
  showReviews = true,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  breadcrumbs: { name: string; href?: string }[];
  cta?: string;
  href?: string;
  showReviews?: boolean;
}) {
  return (
    <section className="page-hero hero-band" id="hero">
      {/* The page's own photo sits behind the copy; pages without one share
          the skyline so every hero reads as the same band. */}
      <Img
        className="hero-band-photo"
        src={`/images/${image ?? "dubai"}.webp`}
        sizes="100vw"
        alt={image ? imageAlt || title : "Aerial view of the Dubai skyline"}
        fetchPriority="high"
      />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        <div className="page-hero-layout">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1>{title}</h1>
            <p>{text}</p>
            {cta ? (
              <div className="hero-actions">
                <Link href={href} className="button button-dark">
                  {cta}
                  <Icon name="arrow" />
                </Link>
                <a href={BUSINESS.phoneLink} className="text-link">
                  <Icon name="phone" />
                  Talk to Halo
                </a>
              </div>
            ) : null}
            {image && showReviews ? (
              <div className="page-hero-review">
                <ReviewBadge />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicePage({ service: s }: { service: Service }) {
  const details = s.propertyDetails;
  const quoteHref = details
    ? propertyQuoteHref(s.slug)
    : `/quote?service=${encodeURIComponent(s.slug)}`;
  return (
    <>
      <PageSchema path={`/${s.slug}`} name={s.name} service faqs={s.faqs} />
      <PageHero
        eyebrow={s.eyebrow}
        title={s.headline}
        text={details ? s.intro : `${s.name} in Dubai and across the UAE. ${s.intro}`}
        image={s.image}
        imageAlt={s.imageAlt}
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: s.name },
        ]}
        cta={details ? `Get your ${s.name.toLowerCase()} quote` : undefined}
        href={quoteHref}
        showReviews={!details}
      />
      {details ? null : (
        <div className="container">
          <TrustStrip compact />
        </div>
      )}
      <section className="section service-overview">
        <div className="container overview-layout">
          <div>
            {details ? (
              <h2>When to arrange an inspection</h2>
            ) : (
              <>
                <Eyebrow>THE RIGHT INSPECTION FOR YOUR NEXT STEP</Eyebrow>
                <h2>
                  {s.name},<br />
                  with a clearer picture.
                </h2>
              </>
            )}
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {details ? (
              <p className="property-inspection-links">
                We serve Dubai and the UAE. Choose{" "}
                <Link href="/services/handover">handover snagging</Link> for a
                new build or a{" "}
                <Link href="/services/pre-purchase">pre-purchase inspection</Link>{" "}
                before buying a resale property.
              </p>
            ) : null}
          </div>
          <aside className="scope-aside">
            <Icon name={s.category === "Commercial" ? "building" : "home"} />
            <h3>A good fit for</h3>
            <ul className="check-list">
              {s.ideal.map((i) => (
                <li key={i}>
                  <Icon name="check" />
                  {i}
                </li>
              ))}
            </ul>
            <div className="aside-divider" />
            <span className="tiny-label">YOUR VISIT, YOUR SCOPE</span>
            <p>
              We confirm your inspection scope, access, timing and fee before
              booking.
            </p>
            <Link
              className="text-link"
              href={quoteHref}
            >
              Tell us about your property
              <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </section>
      <section className="section scope-section">
        <div className="container">
          <div className="section-heading">
            <div>
              {details ? null : <Eyebrow>A SYSTEMATIC LOOK AT THE DETAILS</Eyebrow>}
              <h2>{details ? "What we check" : "What gets our attention."}</h2>
            </div>
            <p>
              Checks depend on the agreed scope, safe access and available
              utilities. Your report records any limitations.
            </p>
          </div>
          <div className="checks-grid">
            {s.checks.map((c, i) => (
              <div key={c.title}>
                <span className="check-icon">
                  <Icon
                    name={
                      ["spark", "tool", "shield", "report", "key", "home"][
                        i % 6
                      ] as "spark"
                    }
                  />
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {details ? <PropertyInspectionDetails details={details} /> : <Process />}
      <FAQSection title="Before you book." items={s.faqs} />
      <RelatedServices exclude={s.slug} />
      <CTA
        title={details ? `Book your ${s.name.toLowerCase()}` : "Make your next property decision with confidence."}
        text={details ? "Send your property location, approximate size if known and preferred date by WhatsApp or email. We’ll confirm the scope, price, report timing and available appointments before you book." : undefined}
        href={quoteHref}
      />
    </>
  );
}

function PropertyInspectionDetails({
  details,
}: {
  details: NonNullable<Service["propertyDetails"]>;
}) {
  return (
    <>
      <section className="section">
        <div className="container overview-layout">
          <div>
            <h2>How to prepare for the visit</h2>
            <ul className="check-list property-access">
              {details.access.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="scope-aside">
            <h3>What’s outside the scope</h3>
            <p>{details.exclusions}</p>
          </aside>
        </div>
      </section>
      <section className="section scope-section" id="inspection-report">
        <div className="container property-report">
          <div>
            <h2>What your inspection report includes</h2>
            <p>
              Your digital report lists the areas checked, defects found, their
              locations, photographs and recommended next steps. It also records
              access or utility restrictions so you know what could be tested.
            </p>
            <p>
              Share the report with your developer, seller or contractor. If
              repairs are completed, ask for a{" "}
              <Link href="/services/secondary-inspection">re-inspection</Link>{" "}
              of the original items.
            </p>
            <p>
              Halo confirms your report turnaround when you book. Share your
              handover or purchase deadline when requesting a quote.
            </p>
          </div>
          <div>
            <h3>Examples from Halo inspections</h3>
            <div className="property-finding-grid">
              {details.examples.map(({ image, alt, caption }) => (
                <figure key={image}>
                  <Img
                    src={image}
                    alt={alt}
                    sizes="(max-width: 767px) 42vw, 280px"
                    loading="lazy"
                  />
                  <figcaption>{caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function LocationPage({ location: l }: { location: Location }) {
  const faqs = [
    {
      question: `Can Halo inspect my property in ${l.name}?`,
      answer: `Halo offers property inspection appointments in ${l.name}, subject to scope, access and availability. Share the exact address, property type and size when requesting your quote so the team can confirm the visit.`,
    },
    {
      question: `What should I arrange before an inspection in ${l.name}?`,
      answer:
        "Coordinate access with the owner, developer or building management. Keep electricity and water connected where possible, make rooms and service areas accessible and tell the team about any restrictions.",
    },
    {
      question: "Can I arrange a follow-up inspection?",
      answer:
        "Yes. A secondary inspection can check the original reported items after your developer or contractor completes rectification. Agree the follow-up scope and fee with Halo before booking.",
    },
  ];
  return (
    <>
      <PageSchema
        path={`/locations/${l.slug}`}
        name={`Property inspection in ${l.name}`}
        faqs={faqs}
        service
      />
      <PageHero
        eyebrow={`PROPERTY INSPECTION & SNAGGING · ${l.name.toUpperCase()}`}
        title={l.headline}
        text={l.intro}
        image={l.image}
        breadcrumbs={[
          { name: "Locations", href: "/locations" },
          { name: l.name },
        ]}
        href={`/quote?location=${encodeURIComponent(l.name)}`}
      />
      <section className="section">
        <div className="container overview-layout">
          <div>
            <Eyebrow>YOUR PROPERTY. YOUR LOCATION. YOUR NEXT STEP.</Eyebrow>
            <h2>
              Property inspections
              <br />
              in {l.name}.
            </h2>
            {l.details.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              Our UAE inspection team provides an independent photographic
              record of observed condition. Whether your next step is handover,
              purchase or moving in, the findings help you discuss defects and
              plan the appropriate follow-up.
            </p>
          </div>
          <aside className="scope-aside">
            <Icon name="location" />
            <h3>A closer look in {l.name}</h3>
            <ul className="check-list">
              {l.focus.map((f) => (
                <li key={f}>
                  <Icon name="check" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              className="text-link"
              href={`/quote?location=${encodeURIComponent(l.name)}`}
            >
              Request your local quote
              <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </section>
      <section className="section scope-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>CHOOSE THE CHECK THAT FITS</Eyebrow>
              <h2>What brings you to {l.name}?</h2>
            </div>
          </div>
          <div className="service-directory">
            {services
              .filter((s) =>
                [
                  "services/handover",
                  "services/pre-purchase",
                  "services/apartment",
                  "services/villa",
                  "services/residential/dlp-inspection",
                  "services/secondary-inspection",
                ].includes(s.slug),
              )
              .map((s) => (
                <Link
                  href={`/${s.slug}`}
                  className="directory-card"
                  key={s.slug}
                >
                  <span className="card-category">{s.category}</span>
                  <h3>{s.name}</h3>
                  <p>{s.intro}</p>
                  <span className="text-link">
                    Explore inspection
                    <Icon name="arrow" />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <FAQSection title={`Planning an inspection in ${l.name}?`} items={faqs} />
      <section className="section nearby-section">
        <div className="container">
          <Eyebrow>ALSO NEARBY</Eyebrow>
          <h2>Explore other service areas.</h2>
          <div className="nearby-links">
            {l.nearby.map((slug) => {
              const n = locations.find((n) => n.slug === slug)!;
              return (
                <Link href={`/locations/${slug}`} key={slug}>
                  <Icon name="location" />
                  {n.name}
                  <Icon name="arrow" />
                </Link>
              );
            })}
            <Link href="/locations">
              All UAE locations
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <CTA
        title={`A clearer picture of your ${l.name} property.`}
        href={`/quote?location=${encodeURIComponent(l.name)}`}
      />
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageSchema path="/services" name="Property inspection services" />
      <PageHero
        eyebrow="THE RIGHT CHECK. AT THE RIGHT TIME."
        title="Every property journey deserves a clearer picture."
        text="Independent residential and commercial inspections for the moments that matter. Find the right service for your property and your next step."
        image="inspection-detail"
        breadcrumbs={[{ name: "Services" }]}
      />
      <section className="section">
        <div className="container">
          <Eyebrow>EXPLORE YOUR OPTIONS</Eyebrow>
          <h2 className="directory-title">What do you need to know?</h2>
          <ServiceDirectory items={services} />
        </div>
      </section>
      <Process />
      <CTA />
    </>
  );
}

export function LocationsPage() {
  return (
    <>
      <PageSchema path="/locations" name="Dubai and UAE inspection locations" />
      <PageHero
        eyebrow="DUBAI ROOTS. UAE-WIDE REACH."
        title="Here for the place you call home."
        text="Property inspection and snagging services across Dubai communities and all seven emirates. Explore your area, then tell us about your property."
        image="dubai"
        breadcrumbs={[{ name: "Locations" }]}
      />
      <section className="section">
        <div className="container">
          <Eyebrow>FIND YOUR COMMUNITY</Eyebrow>
          <h2 className="directory-title">A closer look, closer to home.</h2>
          <LocationDirectory items={locations} />
          <p className="directory-note">
            Appointments are confirmed around your exact location, access
            arrangements and inspection scope.
          </p>
        </div>
      </section>
      <CTA
        title="Your community isn’t listed? Let’s talk."
        text="Share your property address and we’ll confirm coverage and availability."
      />
    </>
  );
}

export function QuotePage() {
  return (
    <>
      <PageSchema path="/quote" name="Request an inspection quote" />
      <section className="quote-page container">
        <Breadcrumbs items={[{ name: "Get a quote" }]} />
        <div className="quote-layout">
          <div className="quote-intro">
            <h1>Request an inspection quote</h1>
            <p>
              Tell us about your property, then send your request by WhatsApp or
              email. Halo will confirm the scope, fee, report timing and
              appointment with you.
            </p>
            <div className="quote-benefits">
              {[
                "A scope matched to your property",
                "Clear pricing before you book",
                "A practical photographic report",
              ].map((i) => (
                <div key={i}>
                  <Icon name="check" />
                  {i}
                </div>
              ))}
            </div>
            <div className="quote-help">
              <Icon name="phone" />
              <div>
                <strong>Prefer a conversation?</strong>
                <a href={BUSINESS.phoneLink}>{BUSINESS.phone}</a>
              </div>
            </div>
            <a className="text-link" href={BUSINESS.whatsapp}>
              Message Halo on WhatsApp
              <Icon name="whatsapp" />
            </a>
            <a
              href="/downloads/inspection-preparation-checklist.txt"
              className="text-link"
              download
            >
              Download your preparation checklist
              <Icon name="report" />
            </a>
          </div>
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: quotePrefillScript }}
          />
          <QuoteForm />
        </div>
      </section>
      <FAQSection items={generalFAQs.filter((_, i) => [2, 3, 4].includes(i))} />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageSchema path="/contact" name="Contact Halo Property Inspection" />
      <PageHero
        eyebrow="REAL PEOPLE. CLEAR ANSWERS."
        title="Let’s talk about your property."
        text="A handover coming up, a home you’re considering or a detail that worries you? Tell us what you need and we’ll help you find the next step."
        breadcrumbs={[{ name: "Contact" }]}
        cta="Start your inspection enquiry"
      />
      <section className="section contact-section">
        <div className="container">
          <div className="contact-cards">
            <a href={BUSINESS.phoneLink}>
              <Icon name="phone" />
              <h2>Call Halo</h2>
              <p>Talk through your property and the inspection you need.</p>
              <strong>{BUSINESS.phone}</strong>
              <Icon name="arrow" />
            </a>
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              <h2>Start a WhatsApp chat</h2>
              <p>Share your location, property size and preferred date.</p>
              <strong>Message our team</strong>
              <Icon name="arrow" />
            </a>
            <a href={`mailto:${BUSINESS.email}`}>
              <Icon name="mail" />
              <h2>Send an email</h2>
              <p>For inspection enquiries, reports and partnerships.</p>
              <strong>{BUSINESS.email}</strong>
              <Icon name="arrow" />
            </a>
          </div>
          <div className="contact-location">
            <div>
              <Eyebrow>DUBAI BASED. UAE WIDE.</Eyebrow>
              <h2>
                A local team,
                <br />
                with a wider reach.
              </h2>
              <p>{BUSINESS.address}</p>
              <a
                className="text-link"
                href={BUSINESS.map}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open location in Google Maps
                <Icon name="arrow" />
              </a>
              <div className="contact-socials">
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                  <Icon name="arrow" />
                </a>
                <a
                  href={BUSINESS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                  <Icon name="arrow" />
                </a>
              </div>
            </div>
            <Img
              src="/images/dubai.webp"
              sizes="(max-width: 640px) 92vw, 640px"
              alt="Dubai skyline and UAE property inspection coverage"
              width="1600"
              height="1067"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <CTA
        title="Have the property details ready?"
        text="Our guided quote form helps you prepare a complete enquiry in a few simple steps."
      />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageSchema path="/about" name="About Halo Property Inspection" />
      <PageHero
        eyebrow="INDEPENDENT EYES. A HUMAN APPROACH."
        title="We care about the details. Because you care about the home."
        text="Halo Property Inspection by Halo Shield LLC helps UAE homeowners, buyers and businesses understand their property's condition, one careful check at a time."
        image="inspector"
        breadcrumbs={[{ name: "About Halo" }]}
      />
      <div className="container">
        <TrustStrip />
      </div>
      <section className="section">
        <div className="container about-story">
          <div>
            <Eyebrow>WHY WE LOOK A LITTLE CLOSER</Eyebrow>
            <h2>
              A property is more
              <br />
              than a first impression.
            </h2>
          </div>
          <div>
            <p>
              A new home, a first investment, a business space: each comes with
              a decision you want to get right. Our role is to give you an
              independent record of the accessible property's condition, so you
              can move forward with a clearer understanding.
            </p>
            <p>
              We combine systematic inspection with appropriate equipment and
              straightforward reporting. From a snag in the finish to a concern
              with an accessible system, we document what we find and explain
              where further specialist investigation may be needed.
            </p>
            <p>
              We work across Dubai and the other UAE emirates, with the
              inspection scope agreed around your property, access and next
              step. Our company credentials include DED licensing, RERA approval
              and InterNACHI certification.
            </p>
          </div>
        </div>
        <div className="container values-grid">
          {[
            {
              title: "Independent perspective",
              text: "A considered condition assessment that helps you understand your property and discuss the findings.",
            },
            {
              title: "Attention in the right places",
              text: "A systematic approach to accessible finishes and systems, with an agreed scope and clear limitations.",
            },
            {
              title: "Clarity after the visit",
              text: "Useful photographic reporting, a conversation about the results and follow-up checks when agreed.",
            },
          ].map((v) => (
            <div key={v.title}>
              <Icon name="shield" />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <Process dark />
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>WORKING TOGETHER</Eyebrow>
              <h2>
                For homes. For portfolios.
                <br />
                For better handovers.
              </h2>
            </div>
            <p>
              We work with individual owners and property professionals. Explore
              how we can support your next project.
            </p>
          </div>
          <div className="service-directory">
            {partnerships.map((p) => (
              <Link
                className="directory-card"
                href={`/partnerships/${p.slug}`}
                key={p.slug}
              >
                <span className="card-category">Partnerships</span>
                <h3>For {p.name.toLowerCase()}</h3>
                <p>{p.intro}</p>
                <span className="text-link">
                  Explore partnership
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function CertificationsPage() {
  return (
    <>
      <PageSchema
        path="/company/certifications"
        name="Halo licensing and certifications"
      />
      <PageHero
        eyebrow="TESTED. TRUSTED. PROFESSIONALLY QUALIFIED."
        title="Confidence starts with the right credentials."
        text="Halo’s company credentials bring professional standards to your property inspection. Explore our licensing and certification, and request current documents from the team."
        breadcrumbs={[
          { name: "About", href: "/about" },
          { name: "Licensing & certifications" },
        ]}
        cta="Ask about our credentials"
        href="/contact"
      />
      <section className="section">
        <div className="container credential-grid">
          {[
            {
              image: "govt-of-dubai.webp",
              title: "DED licensing",
              text: "Dubai business licensing is part of the company credentials displayed by Halo. Ask our team for the current trade licence and registered activity details.",
            },
            {
              image: "land-department.webp",
              title: "RERA approval",
              text: "Halo presents RERA approval among its professional credentials. Request current supporting documents for your inspection or procurement requirements.",
            },
            {
              image: "cpi.webp",
              title: "InterNACHI certification",
              text: "The Certified Professional Inspector badge represents the inspection qualification displayed by Halo. The team can provide inspector-specific credential details.",
            },
            {
              image: "official-vendor.webp",
              title: "Professional documentation",
              text: "For a commercial project or procurement review, share your documentation requirements. We will confirm the relevant current licensing and qualification records.",
            },
          ].map((c) => (
            <article key={c.title}>
              <div className="credential-logo">
                <Img
                  src={`/images/${c.image}`}
                  sizes="180px"
                  alt={c.title}
                  width="180"
                  height="110"
                  loading="lazy"
                />
              </div>
              <h2>{c.title}</h2>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section scope-section">
        <div className="container overview-layout">
          <div>
            <Eyebrow>STANDARDS IN PRACTICE</Eyebrow>
            <h2>
              Credentials matter.
              <br />
              So does the actual visit.
            </h2>
            <p>
              We agree the inspection scope before booking, use appropriate
              equipment for the accessible areas and document findings clearly.
              The report records the condition observed at the time of the
              inspection and any limitations.
            </p>
            <p>
              For specialist systems, regulatory approvals or intrusive
              investigations, a separate technical scope may be required.
              Discuss these needs with Halo before the appointment.
            </p>
          </div>
          <aside className="scope-aside">
            <Icon name="report" />
            <h3>Need documents for your project?</h3>
            <p>
              Tell us which credentials your developer, building manager or
              procurement team requires.
            </p>
            <Link href="/contact" className="text-link">
              Request current documentation
              <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function FAQsPage() {
  return (
    <>
      <PageSchema
        path="/faq"
        name="Property inspection frequently asked questions"
        faqs={generalFAQs}
      />
      <PageHero
        eyebrow="A LITTLE CLARITY BEFORE YOU BOOK"
        title="Good questions deserve clear answers."
        text="What gets checked, when your report arrives and what to arrange before the visit. Find the answers to the questions we hear most."
        breadcrumbs={[{ name: "Frequently asked questions" }]}
        cta=""
      />
      <section className="section">
        <div className="container faq-page-layout">
          <aside>
            <h2>Still wondering?</h2>
            <p>
              Your property might have a question of its own. We’re happy to
              help.
            </p>
            <Link className="button button-dark" href="/contact">
              Talk to Halo
              <Icon name="arrow" />
            </Link>
            <a
              className="text-link"
              href="/downloads/inspection-preparation-checklist.txt"
              download
            >
              Preparation checklist
              <Icon name="report" />
            </a>
          </aside>
          <FAQList items={generalFAQs} searchable />
        </div>
      </section>
      <CTA />
    </>
  );
}

export function PartnershipPage({ slug }: { slug: string }) {
  const p = partnerships.find((p) => p.slug === slug)!;
  return (
    <>
      <PageSchema
        path={`/partnerships/${slug}`}
        name={`Inspection partnerships for ${p.name}`}
      />
      <PageHero
        eyebrow={`INSPECTION PARTNERSHIPS · ${p.name.toUpperCase()}`}
        title={p.title}
        text={p.intro}
        image={p.image}
        breadcrumbs={[
          { name: "About Halo", href: "/about" },
          { name: `For ${p.name.toLowerCase()}` },
        ]}
        cta="Discuss a partnership"
        href={`/contact`}
      />
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>A CLEARER WAY TO WORK TOGETHER</Eyebrow>
              <h2>
                Independent checks.
                <br />
                Useful collaboration.
              </h2>
            </div>
            <p>
              Each partnership starts with an agreed scope, clear access
              arrangements and the reporting your project needs.
            </p>
          </div>
          <div className="values-grid">
            {p.items.map((item, i) => (
              <div key={item.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="partnership-link">
            <Link href={`/${p.service}`} className="text-link">
              Explore the relevant inspection service
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section scope-section">
        <div className="container overview-layout">
          <div>
            <Eyebrow>LET’S DEFINE THE DETAILS</Eyebrow>
            <h2>
              Tell us what your
              <br />
              project needs.
            </h2>
            <p>
              Share the number of properties, their locations, the planned
              inspection dates and the reason for the assessment. If you have
              building access requirements or a particular report format,
              include those too.
            </p>
            <p>
              Halo will confirm a suitable approach, the inspection scope and
              the commercial terms before the programme begins. Re-inspections
              and specialist requirements are agreed separately.
            </p>
          </div>
          <aside className="scope-aside">
            <Icon name="building" />
            <h3>Your project, clearly scoped</h3>
            <ul className="check-list">
              <li>
                <Icon name="check" />
                Unit numbers and property sizes
              </li>
              <li>
                <Icon name="check" />
                Locations and access contacts
              </li>
              <li>
                <Icon name="check" />
                Inspection and handover dates
              </li>
              <li>
                <Icon name="check" />
                Reporting and follow-up needs
              </li>
            </ul>
            <a
              href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(`Inspection partnership — ${p.name}`)}`}
              className="text-link"
            >
              Email your project details
              <Icon name="arrow" />
            </a>
          </aside>
        </div>
      </section>
      <CTA
        title="Build a clearer property picture together."
        text="Talk to Halo about your portfolio, project or client inspection needs."
        href="/contact"
      />
    </>
  );
}
