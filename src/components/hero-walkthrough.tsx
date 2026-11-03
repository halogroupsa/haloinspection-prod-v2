"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "./icon";
import { Img, srcSetFor } from "./image";
import styles from "./hero-walkthrough.module.css";

const checks = [
  {
    id: "finishes",
    short: "Finishes",
    title: "Finishes & workmanship",
    area: "Living area",
    description:
      "A closer look at tiles, paint, joinery and the details you use every day.",
    finding: "Poor tile finishing",
    photo: "/images/defects/21.webp",
    alt: "Tile finishing defect from Halo’s inspection gallery",
    x: 47,
    y: 81,
  },
  {
    id: "plumbing",
    short: "Plumbing",
    title: "Plumbing & water flow",
    area: "Kitchen & wet areas",
    description:
      "Water flow, drainage and visible leaks, where utilities and access allow.",
    finding: "Poor water flow",
    photo: "/images/defects/8.webp",
    alt: "Water flow being checked during a Halo property inspection",
    x: 35,
    y: 30,
  },
  {
    id: "airflow",
    short: "AC & airflow",
    title: "AC & ventilation",
    area: "Living area",
    description:
      "Airflow, controls and accessible fittings for a clearer picture of comfort.",
    finding: "Damaged AC insulation",
    photo: "/images/defects/11.webp",
    alt: "Damaged air-conditioning insulation from Halo’s inspection gallery",
    x: 43,
    y: 43,
  },
] as const;
const reportIndex = checks.length;
const stepNames = [...checks.map((check) => check.short), "Your report"];

function StepIcon({ step }: { step: number }) {
  if (step === reportIndex) return <Icon name="report" />;
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {step === 0 ? (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M12 4v16M4 12h16" />
        </>
      ) : step === 1 ? (
        <path d="M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12ZM9 16c0 2 1 3 3 3" />
      ) : (
        <>
          <path d="M3 8h12a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h6a3 3 0 1 1-3 3" />
        </>
      )}
    </svg>
  );
}

export function HeroWalkthrough() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const isReport = active === reportIndex;
  const check = checks[isReport ? 0 : active];
  const running =
    playing &&
    !reducedMotion &&
    visible &&
    pageVisible &&
    !hovered &&
    !focusPaused;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motion.matches);
    setPlaying(!motion.matches);
    const updateMotion = () => {
      setReducedMotion(motion.matches);
      if (motion.matches) setPlaying(false);
    };
    const updateVisibility = () => setPageVisible(!document.hidden);
    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    updateVisibility();
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setActive((previous) => (previous + 1) % stepNames.length),
      isReport ? 7000 : 5500,
    );
    return () => window.clearTimeout(timer);
  }, [active, isReport, running]);

  function selectStep(index: number) {
    setActive(index);
    setPlaying(false);
  }

  return (
    <div
      ref={root}
      className={styles.walkthrough}
      role="region"
      aria-label="Interactive property inspection walkthrough"
      data-step={isReport ? "report" : check.id}
      data-animating={running}
      data-reduced-motion={reducedMotion}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!(event.target as HTMLElement).closest("[data-play-control]"))
          setFocusPaused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocusPaused(false);
      }}
    >
      <div className={styles.topline}>
        <span>
          <span className={styles.statusDot} />A CLOSER LOOK, ROOM BY ROOM
        </span>
        <button
          type="button"
          className={styles.playControl}
          data-play-control
          disabled={reducedMotion}
          aria-label={
            reducedMotion
              ? "Walkthrough animation disabled by your reduced-motion preference"
              : playing
                ? "Pause inspection walkthrough"
                : "Play inspection walkthrough"
          }
          onClick={() => {
            setFocusPaused(false);
            setHovered(false);
            setPlaying((value) => !value);
          }}
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            {playing ? (
              <>
                <rect x="4" y="3" width="2.5" height="10" rx=".5" />
                <rect x="9.5" y="3" width="2.5" height="10" rx=".5" />
              </>
            ) : (
              <path d="m5 3 8 5-8 5V3Z" />
            )}
          </svg>
          {reducedMotion ? "Motion off" : playing ? "Pause" : "Play"}
        </button>
      </div>

      <div className={styles.scene}>
        <picture>
          <source
            media="(max-width: 600px)"
            srcSet={srcSetFor("/images/hero-inspection-cutaway-mobile.webp")}
            sizes="92vw"
          />
          <Img
            className={styles.property}
            src="/images/hero-inspection-cutaway.webp"
            sizes="520px"
            alt="Illustrative cutaway apartment with a Halo inspector checking the kitchen, alongside a living area, bathroom and balcony"
            width="1200"
            height="900"
            fetchPriority="high"
          />
        </picture>
        <svg
          className={styles.route}
          aria-hidden="true"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M47 81C52 65 29 52 35 30Q42 32 43 43" />
        </svg>
        <div
          className={styles.scanner}
          aria-hidden="true"
          style={
            {
              "--scan-x": `${check.x}%`,
              "--scan-y": `${check.y}%`,
            } as CSSProperties
          }
        >
          <div className={styles.scanZone}>
            <div className={styles.scanSweep} />
            <span className={styles.crosshair} />
          </div>
        </div>
        {checks.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={styles.marker}
            data-active={!isReport && active === index}
            data-complete={isReport}
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
            aria-label={`Explore ${item.title}`}
            aria-pressed={!isReport && active === index}
            onClick={() => selectStep(index)}
          >
            <span className={styles.markerCore}>
              {isReport ? <Icon name="check" /> : index + 1}
            </span>
            {!isReport && active === index && (
              <span className={styles.markerLabel}>{item.area}</span>
            )}
          </button>
        ))}
        {isReport && (
          <div className={styles.reportReady}>
            <Icon name="report" />
            <span>
              From careful checks
              <br />
              <strong>to clear findings.</strong>
            </span>
          </div>
        )}
      </div>

      <div
        className={styles.evidence}
        aria-live={playing ? "off" : "polite"}
        aria-atomic="true"
      >
        {isReport ? (
          <div className={styles.report} key="report">
            <div className={styles.reportHeading}>
              <span className={styles.kicker}>
                YOUR INSPECTION REPORT
              </span>
              <strong>A report you can act on.</strong>
              <p>Photographs. Locations. Clear next steps.</p>
            </div>
            <div className={styles.reportFindings}>
              {checks.map((item) => (
                <div key={item.id}>
                  <Img
                    src={item.photo}
                    sizes="31px"
                    alt={item.alt}
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                  <span>{item.finding}</span>
                  <Icon name="check" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.finding} key={check.id}>
            <div className={styles.findingCopy}>
              <span className={styles.kicker}>
                WHAT WE CHECK · {String(active + 1).padStart(2, "0")}
              </span>
              <strong>{check.title}</strong>
              <p>{check.description}</p>
            </div>
            <figure className={styles.findingPhoto}>
              <Img
                src={check.photo}
                sizes="126px"
                alt={check.alt}
                width="160"
                height="120"
                loading="lazy"
              />
              <figcaption>
                <span>HALO GALLERY EXAMPLE</span>
                {check.finding}
              </figcaption>
            </figure>
          </div>
        )}
      </div>

      <div
        className={styles.steps}
        role="group"
        aria-label="Choose an inspection walkthrough step"
      >
        {stepNames.map((name, index) => (
          <button
            type="button"
            key={name}
            data-selected={active === index}
            aria-pressed={active === index}
            onClick={() => selectStep(index)}
          >
            <StepIcon step={index} />
            <span>{name}</span>
            {active === index && (
              <span
                key={`${index}-${running}`}
                className={styles.progress}
                style={
                  {
                    "--step-duration": isReport ? "7s" : "5.5s",
                  } as CSSProperties
                }
              />
            )}
          </button>
        ))}
      </div>
      <div className={styles.caption}>
        <span>Illustrative walkthrough · Real gallery examples</span>
        <a href={isReport ? "#inspection-report" : "#inspection-checks"}>
          {isReport ? "Explore real findings" : "See all checks"}
          <Icon name="arrow" />
        </a>
      </div>
    </div>
  );
}
