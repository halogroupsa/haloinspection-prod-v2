"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { archivePath, archivePageCount, PAGE_SIZE } from "@/lib/archive-pagination";
import styles from "./article-archive.module.css";

export type ArchiveCard = {
  href: string;
  title: string;
  description: string;
  keywords?: readonly string[];
  date: string;
  dateLabel?: string;
  image: { src: string; srcSet?: string; alt: string };
};

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" });

function searchWords(text: string) {
  return text.toLowerCase().normalize("NFKD").replace(/\p{M}/gu, "").match(/[\p{L}\p{N}]+/gu) ?? [];
}

export function ArticleArchive({ articles, archivePage = 1 }: { articles: readonly ArchiveCard[]; archivePage?: number }) {
  const [query, setQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const searchId = useId();
  const resultsId = useId();

  const terms = searchWords(query);
  const searching = terms.length > 0;
  const matches = searching
    ? articles.filter(({ title, description, keywords }) => {
        const text = searchWords([title, description, ...(keywords ?? [])].join(" ")).join(" ");
        return terms.every((term) => text.includes(term));
      })
    : articles;
  const page = searching ? searchPage : archivePage;
  const pages = archivePageCount(matches.length);
  const start = (page - 1) * PAGE_SIZE;
  const visible = matches.slice(start, start + PAGE_SIZE);

  function updateQuery(value: string) {
    setQuery(value);
    setSearchPage(1);
  }

  function paginationLink(number: number, label: string) {
    const current = page === number ? "page" : undefined;
    return searching ? (
      <button type="button" onClick={() => setSearchPage(number)} aria-controls={resultsId} aria-current={current}>
        {label}
      </button>
    ) : (
      <Link href={archivePath(number)} prefetch={false} aria-current={current}>{label}</Link>
    );
  }

  return (
    <section className={styles.archive} aria-label="Guide archive">
      <div className={styles.toolbar}>
        <div className={styles.search} role="search" aria-label="Guide search">
          <label htmlFor={searchId}>Search guides</label>
          <div className={styles.field}>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="10.75" cy="10.75" r="6.75" />
              <path d="m16 16 4 4" />
            </svg>
            <input id={searchId} type="search" placeholder="Search by topic" value={query} aria-controls={resultsId} onChange={(event) => updateQuery(event.target.value)} />
            {query && <button type="button" onClick={() => { updateQuery(""); document.getElementById(searchId)?.focus(); }}>Clear</button>}
          </div>
        </div>
        <p className={styles.status} role="status">
          {matches.length === 0 ? "No guides found" : pages > 1
            ? `${start + 1}–${start + visible.length} of ${matches.length} guides`
            : `${matches.length} ${matches.length === 1 ? "guide" : "guides"}`}
        </p>
      </div>

      <div id={resultsId}>
        {visible.length ? (
          <div className={styles.grid} data-single={matches.length === 1 ? "true" : undefined}>
            {visible.map(({ href, title, description, date, dateLabel, image }, index) => (
              <article key={href} className={styles.article}>
                <Link href={href} prefetch={false} className={styles.card} aria-labelledby={`${resultsId}-${index}`}>
                  <div className={styles.media}>
                    <img
                      src={image.src}
                      srcSet={image.srcSet}
                      sizes={matches.length === 1
                        ? "(max-width: 699px) 92vw, (max-width: 1450px) 52vw, 730px"
                        : "(max-width: 599px) 92vw, (max-width: 959px) 44vw, 31vw"}
                      alt={image.alt}
                      width="720"
                      height="480"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                  <div className={styles.body}>
                    <p className={styles.date}>{dateLabel && `${dateLabel} `}<time dateTime={date}>{dateFormat.format(new Date(date))}</time></p>
                    <h2 id={`${resultsId}-${index}`}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                    <span aria-hidden="true" className={styles.read}>Read guide <span>↗</span></span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : <p className={styles.empty}>{searching ? "Try a different search term." : "Guides will appear here when available."}</p>}
      </div>

      {pages > 1 && (
        <nav className={styles.pagination} aria-label="Guide pages">
          {page > 1 && paginationLink(page - 1, "Previous")}
          <span>Page {page} of {pages}</span>
          {page < pages && paginationLink(page + 1, "Next")}
        </nav>
      )}
    </section>
  );
}
