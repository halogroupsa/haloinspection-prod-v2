"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { BUSINESS } from "@/lib/content";
import { Icon } from "./icon";
import { Img } from "./image";

const groups = [
  {
    name: "Services",
    sections: ["/services"],
    links: [
      { label: "All inspection services", href: "/services" },
      { label: "Handover & snagging", href: "/services/handover" },
      { label: "Pre-purchase inspections", href: "/services/pre-purchase" },
      { label: "Apartment inspections", href: "/services/apartment" },
      { label: "Villa inspections", href: "/services/villa" },
      {
        label: "Commercial inspections",
        href: "/services/commercial/commercial-inspection",
      },
      { label: "Re-inspections", href: "/services/secondary-inspection" },
    ],
  },
  {
    name: "Locations",
    sections: ["/locations"],
    links: [
      { label: "All locations", href: "/locations" },
      { label: "Dubai Marina", href: "/locations/dubai-marina" },
      { label: "Downtown Dubai", href: "/locations/downtown-dubai" },
      { label: "Palm Jumeirah", href: "/locations/palm-jumeirah" },
      { label: "Dubai Hills Estate", href: "/locations/dubai-hills" },
      { label: "Abu Dhabi", href: "/locations/abu-dhabi" },
      { label: "Sharjah", href: "/locations/sharjah" },
    ],
  },
  {
    name: "Why Halo",
    sections: ["/about", "/company", "/faq", "/inspection-tools"],
    links: [
      { label: "Our story", href: "/about" },
      { label: "Licensing & certifications", href: "/company/certifications" },
      { label: "Inspection tools", href: "/inspection-tools" },
      { label: "Your questions, answered", href: "/faq" },
    ],
  },
  {
    name: "Partnerships",
    sections: ["/partnerships"],
    links: [
      { label: "For developers", href: "/partnerships/developers" },
      {
        label: "For property managers",
        href: "/partnerships/property-managers",
      },
      {
        label: "For real estate agents",
        href: "/partnerships/real-estate-agents",
      },
    ],
  },
];

const within = (path: string, href: string) =>
  path === href || path.startsWith(`${href}/`);

// Overview links (the first in each group) only match their own page, so a
// nested page highlights its specific link rather than "All …".
const isCurrentLink = (path: string, href: string, overview: boolean) =>
  overview ? path === href : within(path, href);

const isCurrentGroup = (path: string, group: (typeof groups)[number]) =>
  group.sections.some((s) => within(path, s));

export function Header() {
  const path = (usePathname() || "/").replace(/(.)\/+$/, "$1");
  const dialog = useRef<HTMLDialogElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    dialog.current?.close();
    header.current
      ?.querySelectorAll("details[open]")
      .forEach((d) => d.removeAttribute("open"));
  }, [path]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape")
        header.current
          ?.querySelectorAll("details[open]")
          .forEach((d) => d.removeAttribute("open"));
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            <span className="status-dot" /> Independent inspections. Informed
            decisions.
          </span>
          <div>
            <span>Dubai & all 7 emirates</span>
            <a href={BUSINESS.phoneLink}>
              <Icon name="phone" />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </div>
      <header className="site-header" ref={header}>
        <div className="container nav-inner">
          <Link
            className="brand"
            href="/"
            aria-label="Halo Property Inspection home"
            onClick={(e) => {
              // Already home: Next skips navigation, so return to the top
              // and drop any #section hash instead.
              if (path !== "/") return;
              e.preventDefault();
              if (location.hash) history.replaceState(null, "", "/");
              window.scrollTo({ top: 0 });
            }}
          >
            <Img
              src="/images/logo.webp"
              sizes="126px"
              alt="Halo Property Inspection"
              width="160"
              height="61"
            />
            {/* Shown instead while the header is clear over a photo hero. */}
            <Img
              className="brand-light"
              src="/images/logo-light.webp"
              sizes="126px"
              alt=""
              aria-hidden="true"
              width="160"
              height="61"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {groups.map((group) => (
              <details
                className="nav-dropdown"
                key={group.name}
                data-current={isCurrentGroup(path, group) || undefined}
                onToggle={(e) => {
                  if (e.currentTarget.open)
                    header.current
                      ?.querySelectorAll("details[open]")
                      .forEach((d) => {
                        if (d !== e.currentTarget) d.removeAttribute("open");
                      });
                }}
              >
                <summary>
                  {group.name}
                  <Icon name="chevron" />
                </summary>
                <div className="dropdown-panel">
                  {group.links.map((l, i) => (
                    <Link
                      href={l.href}
                      prefetch={false}
                      key={l.href}
                      aria-current={
                        isCurrentLink(path, l.href, i === 0) ? "page" : undefined
                      }
                    >
                      {l.label}
                      <Icon name="arrow" />
                    </Link>
                  ))}
                </div>
              </details>
            ))}
            <Link
              href="/projects"
              prefetch={false}
              aria-current={within(path, "/projects") ? "page" : undefined}
            >
              Projects
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              aria-current={within(path, "/contact") ? "page" : undefined}
            >
              Contact
            </Link>
          </nav>
          <Link
            className="button button-dark nav-cta"
            href={path === "/quote" ? "#inspection-enquiry" : "/quote"}
          >
            Get a quote
            <Icon name="arrow" />
          </Link>
          <button
            className="menu-toggle"
            onClick={() => {
              dialog.current
                ?.querySelectorAll<HTMLDetailsElement>("details")
                .forEach((d) => (d.open = d.dataset.current === "true"));
              dialog.current?.showModal();
            }}
            aria-label="Open navigation menu"
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-labelledby="mobile-menu-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="mobile-menu-head">
          <span id="mobile-menu-title">Explore Halo</span>
          <button
            aria-label="Close menu"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {groups.map((g) => (
            <details
              key={g.name}
              data-current={isCurrentGroup(path, g) || undefined}
            >
              <summary>
                {g.name}
                <Icon name="chevron" />
              </summary>
              {g.links.map((l, i) => (
                <Link
                  href={l.href}
                  prefetch={false}
                  key={l.href}
                  aria-current={
                    isCurrentLink(path, l.href, i === 0) ? "page" : undefined
                  }
                  onClick={() => dialog.current?.close()}
                >
                  {l.label}
                </Link>
              ))}
            </details>
          ))}
          <Link
            href="/projects"
            aria-current={within(path, "/projects") ? "page" : undefined}
            onClick={() => dialog.current?.close()}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            aria-current={within(path, "/contact") ? "page" : undefined}
            onClick={() => dialog.current?.close()}
          >
            Contact
          </Link>
          <Link
            className="button button-dark"
            href="/quote"
            onClick={() => dialog.current?.close()}
          >
            Get your inspection quote
            <Icon name="arrow" />
          </Link>
          <a className="mobile-phone" href={BUSINESS.phoneLink}>
            <Icon name="phone" />
            {BUSINESS.phone}
          </a>
        </nav>
      </dialog>
    </>
  );
}

export function MobileBar() {
  const path = usePathname();
  return (
    <div className="mobile-action-bar">
      <a href={BUSINESS.phoneLink}>
        <Icon name="phone" />
        Call us
      </a>
      <Link href={path === "/quote" ? "#inspection-enquiry" : "/quote"}>
        Get a quote
        <Icon name="arrow" />
      </Link>
      <a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Halo on WhatsApp"
      >
        <Icon name="whatsapp" />
      </a>
    </div>
  );
}
