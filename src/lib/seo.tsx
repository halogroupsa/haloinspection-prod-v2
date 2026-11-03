import type { Metadata } from "next";
import { BUSINESS, SITE_URL, pageInfo, services, type FAQ } from "./content";
import { projects } from "./projects";

export function metadataFor(path: string): Metadata {
  const { title, description } = pageInfo(path);
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const service = services.find((s) => `/${s.slug}` === path);
  const project = path === "/projects" ? projects[0] : projects.find((p) => `/projects/${p.slug}` === path);
  const image = project ? project.images[0].src : service ? `/images/${service.image}.webp` : "/images/dubai.webp";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS.name,
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: `${SITE_URL}${image}`,
          ...(project ? {} : { width: service ? 1536 : 1600, height: service ? 1024 : 1067 }),
          alt: project?.images[0].alt || service?.imageAlt || "Halo Property Inspection in Dubai and the UAE",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${image}`],
    },
  };
}
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function BusinessSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfessionalService",
            "@id": `${SITE_URL}/#business`,
            name: BUSINESS.name,
            legalName: BUSINESS.legalName,
            url: SITE_URL,
            telephone: "+971505143610",
            email: BUSINESS.email,
            image: `${SITE_URL}/images/inspector.webp`,
            logo: `${SITE_URL}/images/logo.webp`,
            address: {
              "@type": "PostalAddress",
              streetAddress: "46MH+G9J, Al Quoz",
              addressLocality: "Dubai",
              addressCountry: "AE",
            },
            areaServed: [
              "Dubai",
              "Abu Dhabi",
              "Sharjah",
              "Ajman",
              "Fujairah",
              "Ras Al Khaimah",
              "Umm Al Quwain",
            ],
            sameAs: [BUSINESS.instagram, BUSINESS.facebook],
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: BUSINESS.name,
            inLanguage: "en",
            publisher: { "@id": `${SITE_URL}/#business` },
          },
        ],
      }}
    />
  );
}
export function PageSchema({
  path,
  name,
  faqs,
  service = false,
}: {
  path: string;
  name: string;
  faqs?: FAQ[];
  service?: boolean;
}) {
  const pieces = path.split("/").filter(Boolean);
  const items = [{ name: "Home", item: `${SITE_URL}/` }];
  if (pieces.length > 1)
    items.push({
      name:
        pieces[0] === "services"
          ? "Services"
          : pieces[0] === "locations"
            ? "Locations"
            : pieces[0] === "projects"
              ? "Projects"
            : pieces[0] === "partnerships"
              ? "About Halo"
              : "About Halo",
      item: `${SITE_URL}/${["services", "locations", "projects"].includes(pieces[0]) ? pieces[0] : "about"}`,
    });
  items.push({ name, item: `${SITE_URL}${path}` });
  const graph: unknown[] = [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}${path}#page`,
      url: `${SITE_URL}${path}`,
      name,
      description: pageInfo(path).description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: items.map((i, n) => ({
        "@type": "ListItem",
        position: n + 1,
        name: i.name,
        item: i.item,
      })),
    },
  ];
  if (service)
    graph.push({
      "@type": "Service",
      name,
      description: pageInfo(path).description,
      url: `${SITE_URL}${path}`,
      serviceType: "Property inspection and snagging",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
    });
  if (faqs?.length)
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  return (
    <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
  );
}
