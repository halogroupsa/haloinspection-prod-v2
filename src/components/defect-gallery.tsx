"use client";

import { useRef, useState } from "react";
import { Icon } from "./icon";
import { Img } from "./image";

const findings = [
  {
    id: 19,
    category: "Moisture",
    title: "High moisture in a wall",
    text: "A moisture measurement helps investigate areas that may need further attention.",
  },
  {
    id: 2,
    category: "Electrical",
    title: "Unsafe wiring",
    text: "Accessible installation issues are documented for a qualified electrician to assess.",
  },
  {
    id: 11,
    category: "AC & plumbing",
    title: "Damaged AC insulation",
    text: "Accessible insulation damage is recorded with a location and photographic evidence.",
  },
  {
    id: 16,
    category: "AC & plumbing",
    title: "Leaking water heater",
    text: "Visible leaks can be raised with the developer or maintenance team before they worsen.",
  },
  {
    id: 21,
    category: "Workmanship",
    title: "Tile finish and damage",
    text: "Close inspection captures visible defects that can be missed during a viewing.",
  },
  {
    id: 23,
    category: "Workmanship",
    title: "Damaged woodwork",
    text: "Joinery and door finish defects are recorded as part of the accessible condition checks.",
  },
  {
    id: 1,
    category: "Electrical",
    title: "Misaligned light switch",
    text: "Switch alignment is checked and photographed so the installation can be corrected.",
  },
  {
    id: 3,
    category: "Electrical",
    title: "Exposed switch wiring",
    text: "Exposed wiring and insecure switches are documented for a qualified electrician to assess.",
  },
  {
    id: 5,
    category: "Ceiling",
    title: "Poor finishing above the ceiling",
    text: "Accessible ceiling voids can reveal unfinished work that is hidden from a normal viewing.",
  },
  {
    id: 6,
    category: "Ceiling",
    title: "Damaged ceiling ducting",
    text: "Visible duct damage above the ceiling is photographed for the maintenance team to investigate.",
  },
  {
    id: 7,
    category: "Ceiling",
    title: "Temporary ceiling repairs",
    text: "Temporary repairs in accessible ceiling voids are recorded for review and proper rectification.",
  },
  {
    id: 8,
    category: "AC & plumbing",
    title: "Poor water flow",
    text: "Water flow at accessible outlets is checked to identify issues that need further plumbing investigation.",
  },
  {
    id: 9,
    category: "Workmanship",
    title: "Poor door-frame finishing",
    text: "Gaps and unfinished details around door frames are photographed to support rectification discussions.",
  },
  {
    id: 12,
    category: "Workmanship",
    title: "Heat ingress at window frames",
    text: "Thermal imaging helps identify temperature differences around window frames that may need further investigation.",
  },
  {
    id: 13,
    category: "AC & plumbing",
    title: "Noisy AC system",
    text: "Noise measurements help document an AC concern for the maintenance team to investigate.",
  },
  {
    id: 14,
    category: "Workmanship",
    title: "Poor wall finishing",
    text: "Uneven finishes and visible wall defects are recorded with photographs and their locations.",
  },
  {
    id: 15,
    category: "Ventilation",
    title: "Poor extraction workmanship",
    text: "Accessible extraction duct connections and installation details are checked for visible workmanship issues.",
  },
  {
    id: 17,
    category: "AC & plumbing",
    title: "Poor plumbing workmanship",
    text: "Visible plumbing installation defects are photographed for a qualified plumber to assess.",
  },
  {
    id: 20,
    category: "Ventilation",
    title: "Dirty ventilation duct",
    text: "An inspection camera helps document contamination inside accessible ventilation ductwork for cleaning and maintenance review.",
  },
  {
    id: 22,
    category: "AC & plumbing",
    title: "Damaged pipework",
    text: "Visible pipework damage is recorded with photographic evidence so the affected installation can be assessed.",
  },
];
export function DefectGallery() {
  const [filter, setFilter] = useState("All findings");
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(findings[0]);
  const [annotated, setAnnotated] = useState(true);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = findings.filter(
    (f) => filter === "All findings" || f.category === filter,
  );
  return (
    <>
      <div className="filter-pills gallery-filters">
        {[
          "All findings",
          "AC & plumbing",
          "Electrical",
          "Moisture",
          "Workmanship",
          "Ceiling",
          "Ventilation",
        ].map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            onClick={() => {
              setFilter(f);
              setExpanded(false);
            }}
          >
            {f}
          </button>
        ))}
      </div>
      <div
        className={`defect-grid${expanded ? " is-expanded" : ""}`}
        id="findings-grid"
        key={filter}
      >
        {filtered.map((f) => (
          <button
            className="defect-card"
            key={f.id}
            onClick={() => {
              setSelected(f);
              setAnnotated(true);
              dialog.current?.showModal();
            }}
          >
            <div>
              <Img
                src={`/images/defects/${f.id}.webp`}
                sizes="(max-width: 640px) 46vw, 420px"
                alt={f.title}
                loading="lazy"
              />
              <span className="photo-zoom">
                <Icon name="plus" />
              </span>
            </div>
            <span className="tiny-label">{f.category}</span>
            <h3>{f.title}</h3>
          </button>
        ))}
      </div>
      {filtered.length > 6 ? (
        <div className={`findings-load-more${filtered.length <= 9 ? " mobile-only" : ""}`}>
          <button
            className="button button-outline"
            aria-controls="findings-grid"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Load more"}
            <Icon name={expanded ? "chevron" : "plus"} />
          </button>
        </div>
      ) : null}
      <dialog
        className="finding-dialog"
        aria-labelledby="finding-title"
        ref={dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="finding-head">
          <span className="eyebrow">FROM THE INSPECTION GALLERY</span>
          <button
            aria-label="Close finding"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <Img
          key={`${selected.id}-${annotated}`}
          sizes="(max-width: 812px) calc(100vw - 32px), 780px"
          className="motion-swap"
          src={`/images/${annotated ? "reports" : "defects"}/${selected.id}.webp`}
          alt={
            annotated
              ? `Annotated inspection photograph: ${selected.title}`
              : selected.title
          }
        />
        <div className="finding-copy">
          <h3 id="finding-title">{selected.title}</h3>
          <p>{selected.text}</p>
          <button
            className="text-link"
            onClick={() => setAnnotated(!annotated)}
          >
            {annotated ? "View original photo" : "View report annotation"}
            <Icon name="arrow" />
          </button>
        </div>
      </dialog>
    </>
  );
}
