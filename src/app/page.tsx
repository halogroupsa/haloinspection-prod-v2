import Link from "next/link";
import { Icon } from "@/components/icon";
import { InspectionExplorer, ServiceFinder } from "@/components/interactive";
import { HeroWalkthrough } from "@/components/hero-walkthrough";
import { DefectGallery } from "@/components/defect-gallery";
import { InspectionToolsSection } from "@/components/inspection-tools-section";
import { Img } from "@/components/image";
import {
  CTA,
  Eyebrow,
  FAQSection,
  MediaStrip,
  pressMentions,
  Process,
  ReviewBadge,
  TrustStrip,
} from "@/components/shared";
import { generalFAQs, services, locations } from "@/lib/content";
import { JsonLd, metadataFor } from "@/lib/seo";

export const metadata = metadataFor("/");

export default function Home() {
  const featured = [services[1], services[0], services[2]];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: generalFAQs.slice(0, 5).map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <section className="hero-band" id="hero">
        <Img
          className="hero-band-photo"
          src="/images/dubai.webp"
          sizes="100vw"
          alt="Aerial view of the Dubai skyline around Burj Khalifa"
          fetchPriority="high"
        />
        <div className="home-hero container">
          <div className="hero-copy">
            <Eyebrow>PROPERTY INSPECTION & SNAGGING · DUBAI, UAE</Eyebrow>
            <h1>
              Property inspection.
              <br />
              Before your
              <br />
              <span>next move.</span>
            </h1>
            <p>
              Independent property inspections by certified engineers. We check
              the details, document defects and give you clarity before handover,
              purchase or moving in.
            </p>
            <div className="hero-actions">
              <Link href="/quote" className="button button-dark">
                Get your inspection quote
                <Icon name="arrow" />
              </Link>
              <a href="#inspection-checks" className="text-link">
                See what we check
                <Icon name="arrow" />
              </a>
            </div>
            <div className="hero-ratings">
              {[
                { score: "4.9", source: "Google Reviews", count: "150+" },
                { score: "4.8", source: "Trustpilot", count: "100+" },
              ].map((r) => (
                <div className="hero-rating" key={r.source}>
                  <span
                    className="stars"
                    aria-label={`${r.score} out of 5 stars`}
                  >
                    ★★★★★
                  </span>
                  <strong>
                    {r.score} on {r.source}
                  </strong>
                  <span>Based on {r.count} reviews</span>
                </div>
              ))}
            </div>
            <div className="hero-press">
              <span className="tiny-label">AS FEATURED IN</span>
              <div>
                {pressMentions.map((i) => (
                  <Img
                    src={`/images/${i.src}`}
                    sizes="96px"
                    alt={i.alt}
                    width="150"
                    height="50"
                    key={i.alt}
                  />
                ))}
              </div>
            </div>
            <div className="hero-note">
              <Icon name="location" />
              Dubai & across all seven UAE emirates
            </div>
          </div>
          <div className="hero-stage">
            <HeroWalkthrough />
          </div>
        </div>
      </section>
      <div className="container">
        <TrustStrip />
      </div>
      <section className="section home-services">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>FOR EVERY NEXT CHAPTER</Eyebrow>
              <h2>
                Whatever your next move,
                <br />
                make it an informed one.
              </h2>
            </div>
            <Link className="text-link" href="/services">
              Explore all inspections
              <Icon name="arrow" />
            </Link>
          </div>
          <div className="service-cards">
            {featured.map((s) => (
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
                  <span className="service-photo-label">{s.shortName}</span>
                  <span className="circle-arrow">
                    <Icon name="arrow" />
                  </span>
                </div>
                <h3>{s.name}</h3>
                <p>{s.intro}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section inspection-section" id="inspection-checks">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>A BEAUTIFUL FINISH IS ONLY THE START</Eyebrow>
              <h2>
                We see the details.
                <br />
                <span className="muted-heading">
                  So you see the whole picture.
                </span>
              </h2>
            </div>
            <p>
              A systematic 300+ point approach, adapted to your property and the
              accessible areas. Explore what gets our attention.
            </p>
          </div>
          <InspectionExplorer />
        </div>
      </section>
      <InspectionToolsSection />
      <ServiceFinder />
      <Process dark />
      <section className="section report-section" id="inspection-report">
        <div className="container">
          <div className="report-intro">
            <div>
              <Eyebrow>FROM FINDING TO FOLLOW-THROUGH</Eyebrow>
              <h2>
                Real details.
                <br />A report you can act on.
              </h2>
              <p>
                Clear photographs. Specific locations. Practical next steps.
                Your report turns the inspection into a conversation you can
                have with your developer, seller or contractor.
              </p>
              <Link href="/services/secondary-inspection" className="text-link">
                And when it’s fixed, we can recheck it
                <Icon name="arrow" />
              </Link>
            </div>
            <div className="report-summary">
              <Icon name="report" />
              <h3>Clarity comes as standard.</h3>
              <ul className="check-list">
                <li>
                  <Icon name="check" />
                  Photographic record of identified defects
                </li>
                <li>
                  <Icon name="check" />
                  Organised by area and location
                </li>
                <li>
                  <Icon name="check" />
                  Recommendations for the next step
                </li>
                <li>
                  <Icon name="check" />A record for your rectification
                  discussions
                </li>
              </ul>
            </div>
          </div>
          <div className="gallery-heading">
            <h3>A closer look at what we find.</h3>
            <span>Explore actual photos from Halo’s inspection gallery.</span>
          </div>
          <DefectGallery />
        </div>
      </section>
      <section className="section why-section">
        <div className="container why-layout">
          <div className="why-photo">
            <Img
              src="/images/inspector-detail.webp"
              sizes="(max-width: 640px) 92vw, 720px"
              alt="Inspector in Halo's black branded polo examining wall finishes with a torch"
              width="1024"
              height="768"
              loading="lazy"
            />
            <div className="why-photo-label">
              <Icon name="shield" />
              <span>
                A fresh pair of expert eyes.
                <br />
                <strong>Always on your side.</strong>
              </span>
            </div>
          </div>
          <div className="why-copy">
            <Eyebrow>THE HALO DIFFERENCE</Eyebrow>
            <h2>
              Careful by nature.
              <br />
              Independent by design.
            </h2>
            <p>
              Your property is a big decision. We bring a clear, considered
              inspection to the moments that matter.
            </p>
            <div className="why-points">
              {[
                {
                  icon: "shield" as const,
                  title: "Expertise with credentials",
                  text: "DED licensed, RERA approved and InterNACHI certified, as displayed in our company credentials.",
                },
                {
                  icon: "tool" as const,
                  title: "The right tools for the details",
                  text: "Moisture meters, airflow instruments and appropriate non-invasive equipment support our visual assessment.",
                },
                {
                  icon: "report" as const,
                  title: "Plain language. Useful findings.",
                  text: "A photographic report that helps you understand the issues and discuss what happens next.",
                },
              ].map((p) => (
                <div key={p.title}>
                  <Icon name={p.icon} />
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link className="text-link" href="/about">
              Get to know Halo
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <div className="container">
        <MediaStrip />
      </div>
      <section className="section home-locations">
        <div className="container locations-home-layout">
          <div>
            <Eyebrow>LOCAL KNOWLEDGE. UAE-WIDE REACH.</Eyebrow>
            <h2>
              At home in Dubai.
              <br />
              Here for the whole UAE.
            </h2>
            <p>
              From a Marina apartment to a Dubai Hills villa, we adapt our
              inspection to your property and your next step.
            </p>
            <div className="home-location-links">
              {locations.slice(0, 6).map((l) => (
                <Link href={`/locations/${l.slug}`} key={l.slug}>
                  {l.name}
                  <Icon name="arrow" />
                </Link>
              ))}
            </div>
            <Link href="/locations" className="text-link">
              Find your community
              <Icon name="arrow" />
            </Link>
          </div>
          <div className="location-feature-photo">
            <Img
              src="/images/dubai.webp"
              sizes="(max-width: 640px) 92vw, 690px"
              alt="Dubai waterfront and skyline, one of Halo's UAE property inspection service areas"
              width="1600"
              height="1067"
              loading="lazy"
            />
            <div>
              <span>ONE TEAM. SEVEN EMIRATES.</span>
              <strong>
                A closer look,
                <br />
                wherever you call home.
              </strong>
              <Link
                href="/locations"
                aria-label="Explore all Halo service locations"
              >
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>CONFIDENCE, IN THEIR WORDS</Eyebrow>
              <h2>
                A little clarity.
                <br />A lot of peace of mind.
              </h2>
            </div>
            <div className="review-ratings">
              <ReviewBadge />
              <div className="trustpilot-rating">
                <Icon name="star" />
                <strong>4.8</strong>
                <span>Trustpilot · 100+ reviews</span>
              </div>
            </div>
          </div>
          <div className="testimonials-grid">
            {[
              {
                initials: "MA",
                quote:
                  "Halo's thorough inspection saved me from purchasing a property with significant hidden issues. Their detailed report helped me make an informed decision and negotiate a better price.",
                name: "Mohammed Al Falasi",
                role: "Property investor · Palm Jumeirah",
                date: "March 2024",
              },
              {
                initials: "AM",
                quote:
                  "The team identified several critical issues during our villa's handover inspection. Their expertise and attention to detail ensured we received the property in perfect condition.",
                name: "Aisha Malik",
                role: "Homeowner · Emirates Hills",
                date: "April 2024",
              },
              {
                initials: "ST",
                quote:
                  "As a real estate agent, I exclusively recommend Halo to my clients. Their professional approach and comprehensive reports have helped close numerous deals with complete confidence.",
                name: "Sarah Thompson",
                role: "Real estate agent · Dubai Marina",
                date: "February 2024",
              },
            ].map((t) => (
              <figure className="testimonial" key={t.name}>
                <span className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </span>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <span className="avatar-initials">{t.initials}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                    <small>{t.date}</small>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <FAQSection items={generalFAQs.slice(0, 5)} />
      <CTA />
    </>
  );
}
