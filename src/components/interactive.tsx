"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";
import { Img } from "./image";
import type { Service, Location, FAQ } from "@/lib/content";

const inspectionAreas = [
  {
    id: "finishes",
    name: "Finishes & joinery",
    title: "Good looks are just the beginning.",
    text: "We look closely at the workmanship that makes a home feel complete, checking visible defects and the details you use every day.",
    image: "inspection-detail",
    checks: [
      "Walls, ceilings, paint and sealants",
      "Floor levels, tiles and visible damage",
      "Kitchen cabinets and fitted storage",
      "Door alignment, handles and locks",
    ],
  },
  {
    id: "systems",
    name: "AC, plumbing & electrical",
    title: "The systems behind a comfortable home.",
    text: "We check operation where utilities and access allow, using appropriate instruments to build a clearer picture of accessible services.",
    image: "inspector",
    checks: [
      "AC temperatures, airflow and controls",
      "Water flow, drainage and visible leaks",
      "Sockets, switches and visible installation",
      "Ventilation and accessible service fittings",
    ],
  },
  {
    id: "moisture",
    name: "Moisture & hidden clues",
    title: "Look for the clues beneath the surface.",
    text: "Moisture readings and appropriate non-invasive tools help investigate visible concerns. Where a problem needs a specialist, we flag the next step.",
    image: "thermal",
    checks: [
      "Visible dampness and water staining",
      "Moisture measurements where appropriate",
      "Signs of condensation and drainage issues",
      "Recommendations for further investigation",
    ],
  },
  {
    id: "external",
    name: "Windows & external areas",
    title: "A careful look, inside and out.",
    text: "We adapt the scope to your property, checking glazing, private balconies and agreed accessible exterior features.",
    image: "villa",
    checks: [
      "Window operation, glass and seals",
      "Balcony doors and accessible finishes",
      "Agreed terraces and external areas",
      "Visible drainage and boundary details",
    ],
  },
];
export function InspectionExplorer() {
  const [selected, setSelected] = useState(0);
  const a = inspectionAreas[selected];
  return (
    <div className="inspection-explorer">
      <div
        className="inspection-tabs"
        role="tablist"
        aria-label="Explore inspection checks"
      >
        {inspectionAreas.map((area, i) => (
          <button
            role="tab"
            id={`tab-${area.id}`}
            aria-controls={`panel-${area.id}`}
            aria-selected={selected === i}
            key={area.id}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const n = (selected + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                setSelected(n);
                document
                  .getElementById(`tab-${inspectionAreas[n].id}`)
                  ?.focus();
              }
            }}
            tabIndex={selected === i ? 0 : -1}
          >
            {area.name}
            <Icon name="arrow" />
          </button>
        ))}
      </div>
      <div
        className="inspection-panel motion-swap"
        key={a.id}
        id={`panel-${a.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${a.id}`}
      >
        <div className="inspection-photo">
          <Img
            key={a.image}
            sizes="(max-width: 640px) 92vw, 640px"
            src={`/images/${a.image}.webp`}
            alt={`${a.name} during a property inspection`}
            width="1024"
            height="768"
            loading="lazy"
          />
          <span>
            <Icon name="shield" /> A systematic, independent assessment
          </span>
        </div>
        <div className="inspection-copy">
          <span className="eyebrow">THE DETAILS THAT MATTER</span>
          <h3>{a.title}</h3>
          <p>{a.text}</p>
          <ul className="check-list">
            {a.checks.map((c) => (
              <li key={c}>
                <Icon name="check" />
                {c}
              </li>
            ))}
          </ul>
          <Link
            className="text-link"
            href="/services/residential/snagging-defect"
          >
            Explore snagging & defect detection
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FAQList({
  items,
  searchable = false,
}: {
  items: FAQ[];
  searchable?: boolean;
}) {
  const [search, setSearch] = useState("");
  const filtered = items.filter((f) =>
    (f.question + f.answer).toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="faq-list">
      {searchable ? (
        <label className="search-field">
          <Icon name="search" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your question…"
            aria-label="Search frequently asked questions"
          />
        </label>
      ) : null}
      {filtered.map((f, i) => (
        <details
          key={`${search}:${f.question}`}
          className="faq-item motion-item"
        >
          <summary>
            <span>{f.question}</span>
            <Icon name="plus" />
          </summary>
          <p>{f.answer}</p>
        </details>
      ))}
      {!filtered.length ? (
        <p className="empty-state">
          No matching questions. Try “report”, “cost” or{" "}
          <Link href="/contact">ask our team</Link>.
        </p>
      ) : null}
    </div>
  );
}

export function ServiceDirectory({ items }: { items: Service[] }) {
  const [category, setCategory] = useState("All services");
  const [search, setSearch] = useState("");
  const filtered = items.filter(
    (s) =>
      (category === "All services" || s.category === category) &&
      (s.name + s.description).toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="directory-controls">
        <div className="filter-pills" aria-label="Filter services">
          {["All services", "Residential", "Commercial"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Icon name="search" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find an inspection"
            aria-label="Search inspection services"
          />
        </label>
      </div>
      <div className="service-directory" key={`${category}:${search}`}>
        {filtered.map((s) => (
          <Link
            href={`/${s.slug}`}
            key={s.slug}
            className="directory-card"
            prefetch={false}
          >
            <div className="directory-card-photo">
              <Img
                src={`/images/${s.image}.webp`}
                sizes="(max-width: 700px) 92vw, (max-width: 1024px) 44vw, 440px"
                alt={s.imageAlt}
                width="1536"
                height="1024"
                loading="lazy"
              />
            </div>
            <span className="card-category">{s.category}</span>
            <h3>{s.name}</h3>
            <p>{s.intro}</p>
            <span className="text-link">
              Explore service
              <Icon name="arrow" />
            </span>
          </Link>
        ))}
      </div>
      {!filtered.length ? (
        <p className="empty-state">
          No services match that search. Try “villa”, “handover” or
          “commercial”.
        </p>
      ) : null}
    </>
  );
}

export function LocationDirectory({ items }: { items: Location[] }) {
  const [region, setRegion] = useState("All locations");
  const [search, setSearch] = useState("");
  const filtered = items.filter(
    (l) =>
      (region === "All locations" || l.region === region) &&
      l.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <div className="directory-controls">
        <div className="filter-pills" aria-label="Filter locations">
          {["All locations", "Dubai", "Other emirates"].map((r) => (
            <button
              key={r}
              aria-pressed={region === r}
              onClick={() => setRegion(r)}
            >
              {r}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Icon name="search" />
          <input
            aria-label="Search service locations"
            placeholder="Search your community"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="location-directory" key={`${region}:${search}`}>
        {filtered.map((l) => (
          <Link href={`/locations/${l.slug}`} key={l.slug} prefetch={false}>
            <Icon name="location" />
            <span>
              <small>{l.region}</small>
              <strong>{l.name}</strong>
            </span>
            <Icon name="arrow" />
          </Link>
        ))}
      </div>
      {!filtered.length ? (
        <p className="empty-state">
          Your community is not listed?{" "}
          <Link href="/contact">Ask about coverage at your address.</Link>
        </p>
      ) : null}
    </>
  );
}

/**
 * The finder sits in a window onto a photograph that stays put while the page
 * scrolls past it, and the photograph changes with the answer. The backdrop is
 * `position: fixed` inside a `clip-path`ed section rather than a
 * `background-attachment: fixed` image, which iOS ignores.
 */
export function ServiceFinder() {
  const [goal, setGoal] = useState("handover");
  // Fixed layers always intersect the viewport, so `loading="lazy"` would
  // fetch all four on page load; wait until the section is close instead.
  const [near, setNear] = useState(false);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const choices = [
    {
      value: "handover",
      label: "Receiving a new home",
      href: "/services/handover",
      name: "Handover & snagging inspection",
      text: "Get a photographic snag list before accepting your new property.",
      image: "/images/villa.webp",
    },
    {
      value: "buying",
      label: "Buying a resale property",
      href: "/services/pre-purchase",
      name: "Pre-purchase inspection",
      text: "Understand accessible condition before committing to your purchase.",
      image: "/images/dubai.webp",
    },
    {
      value: "moving",
      label: "Moving or renovating",
      href: "/services/residential/pre-move-in",
      name: "Pre-move-in inspection",
      text: "Check the property while access is clear, before you settle in.",
      image: "/images/hero-property.webp",
    },
    {
      value: "business",
      label: "A commercial property",
      href: "/services/commercial/commercial-inspection",
      name: "Commercial inspection",
      text: "Agree a condition assessment around your business space.",
      image: "/images/commercial.webp",
    },
  ];
  const match = choices.find((c) => c.value === goal)!;
  return (
    <section className="section finder-section" ref={section}>
      <div className="finder-backdrop" aria-hidden="true">
        {near
          ? choices.map((c) => (
              <Img
                key={c.value}
                src={c.image}
                sizes="100vw"
                alt=""
                className={c.value === goal ? "is-active" : undefined}
              />
            ))
          : null}
      </div>
      <div className="container">
        <div className="service-finder">
          <span
            className="finder-focus"
            key={`focus-${goal}`}
            aria-hidden="true"
          />
          <div>
            <span className="eyebrow">LET’S FIND YOUR INSPECTION</span>
            <h2>What brings you here?</h2>
            <p>Your property journey starts with the right check.</p>
          </div>
          <div className="finder-options">
            {choices.map((c) => (
              <button
                aria-pressed={goal === c.value}
                key={c.value}
                onClick={() => setGoal(c.value)}
              >
                {c.label}
                <span className="radio-dot" />
              </button>
            ))}
          </div>
          <div
            className="finder-result motion-swap"
            key={goal}
            aria-live="polite"
          >
            <Icon name="shield" />
            <span className="tiny-label">A GOOD PLACE TO START</span>
            <h3>{match.name}</h3>
            <p>{match.text}</p>
            <Link href={match.href} className="text-link">
              See this inspection
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
