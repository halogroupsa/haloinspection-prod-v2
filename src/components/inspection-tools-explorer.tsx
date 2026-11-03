"use client";

import { useEffect, useRef, useState } from "react";
import { inspectionTools } from "@/lib/inspection-tools";
import { Icon } from "./icon";
import { Img } from "./image";
import styles from "./inspection-tools.module.css";

export function InspectionToolsExplorer({ id = "tools-explorer" }: { id?: string }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const tool = inspectionTools[selected];

  useEffect(() => {
    const button = tabs.current[selected];
    const rail = button?.parentElement;
    if (!button || !rail) return;
    if (rail.scrollHeight > rail.clientHeight) {
      rail.scrollTo({ top: button.offsetTop - (rail.clientHeight - button.offsetHeight) / 2 });
    } else if (rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: button.offsetLeft - (rail.clientWidth - button.offsetWidth) / 2 });
    }
  }, [selected]);

  function selectWithKeyboard(index: number) {
    setSelected(index);
    tabs.current[index]?.focus();
  }

  return (
    <div className={styles.explorer} id={id}>
      <p className={styles.selectionHint}>Select a tool to see how it helps.</p>
      <div className={styles.tabs} role="tablist" aria-label="Explore inspection tools">
        {inspectionTools.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-label={item.name}
            id={`${id}-tab-${item.id}`}
            aria-controls={`${id}-panel`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            ref={(element) => { tabs.current[index] = element; }}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next: number;
              switch (event.key) {
                case "ArrowRight": next = (index + 1) % inspectionTools.length; break;
                case "ArrowLeft": next = (index - 1 + inspectionTools.length) % inspectionTools.length; break;
                case "Home": next = 0; break;
                case "End": next = inspectionTools.length - 1; break;
                default: return;
              }
              event.preventDefault();
              selectWithKeyboard(next);
            }}
          >
            <span className={styles.thumbnail} aria-hidden="true">
              <Img src={item.image} sizes="56px" alt={item.name} loading="lazy" />
            </span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div
        className={styles.panel}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${tool.id}`}
        tabIndex={0}
      >
        <div className={styles.bench}>
          <span className="tiny-label">{tool.category}</span>
          <div className={styles.photo}>
            <Img
              key={tool.image}
              src={tool.image}
              sizes="(max-width: 640px) 85vw, (max-width: 900px) 43vw, 540px"
              alt={tool.imageAlt}
              loading="lazy"
            />
          </div>
          <div className={styles.focus}>
            <Icon name="search" />
            <span>{tool.focus}</span>
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.detailHead}>
            <span className="eyebrow">IN THE INSPECTOR’S KIT</span>
            <div className={styles.controls}>
              <button
                type="button"
                aria-label="Previous inspection tool"
                onClick={() => setSelected((current) => (current - 1 + inspectionTools.length) % inspectionTools.length)}
              >
                <Icon name="arrow" className={styles.previous} />
              </button>
              <button
                type="button"
                aria-label="Next inspection tool"
                onClick={() => setSelected((current) => (current + 1) % inspectionTools.length)}
              >
                <Icon name="arrow" />
              </button>
            </div>
          </div>
          <div key={tool.id} className="motion-swap">
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <ul className="check-list" aria-label={`${tool.name} inspection uses`}>
              {tool.checks.map((check) => (
                <li key={check}><Icon name="check" />{check}</li>
              ))}
            </ul>
            <p className={styles.context}>{tool.context}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
