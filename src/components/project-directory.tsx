"use client";

import { useState, type ReactNode } from "react";
import styles from "./projects.module.css";

export function ProjectDirectory({ items }: { items: { slug: string; community: string; card: ReactNode }[] }) {
  const [community, setCommunity] = useState("All projects");
  const communities = ["All projects", ...new Set(items.map((p) => p.community))];
  const visible = community === "All projects" ? items : items.filter((p) => p.community === community);
  return (
    <>
      <div className={styles.directoryBar}>
        <div className={styles.filters} role="group" aria-label="Filter projects by community">
          {communities.map((name) => (
            <button type="button" key={name} aria-pressed={community === name} aria-controls="project-collection" onClick={() => setCommunity(name)}>
              {name}<span>{name === "All projects" ? items.length : items.filter((p) => p.community === name).length}</span>
            </button>
          ))}
        </div>
        <p role="status" className={styles.resultCount}>{visible.length} {visible.length === 1 ? "project" : "projects"}</p>
      </div>
      <div id="project-collection" className={styles.grid}>
        {visible.map((p) => <div key={p.slug}>{p.card}</div>)}
      </div>
    </>
  );
}
