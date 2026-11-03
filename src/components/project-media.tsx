"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectImage } from "@/lib/projects";
import { Icon } from "./icon";
import { Img, intrinsicSize } from "./image";
import styles from "./projects.module.css";

export function ProjectFilm({ src, mobileSrc, poster, title, name }: { src: string; mobileSrc: string; poster: ProjectImage; title: string; name: string }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (playing) video.current?.focus(); }, [playing]);
  return (
    <div className={styles.film}>
      <div className={styles.filmFrame}>
        {playing ? (
          <video ref={video} controls autoPlay playsInline preload="none" poster={poster.src} tabIndex={0} aria-label={`${name}: ${title}`} onError={() => setFailed(true)}>
            {/* Browsers that ignore `media` take the first source, so the full film leads. */}
            <source src={src} type="video/mp4" media="(min-width: 641px)" />
            <source src={mobileSrc} type="video/mp4" />
            Your browser cannot play this video. <a href={src}>Open the project film</a>.
          </video>
        ) : (
          <button type="button" className={styles.playButton} onClick={() => setPlaying(true)} aria-label={`Play ${name}: ${title}`}>
            <Img src={poster.src} alt={poster.alt} loading="lazy" sizes="(max-width: 640px) 92vw, 1280px" />
            <span className={styles.playCircle}><svg width="25" height="25" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z" fill="currentColor" /></svg></span>
            <span className={styles.playLabel}>Watch {title.toLowerCase()} <span>00:30</span></span>
          </button>
        )}
      </div>
      {failed && <p role="alert">This film couldn’t play. <a className="text-link" href={src}>Open the video directly <Icon name="arrow" /></a></p>}
      <div className={styles.filmCaption}><span>{title}</span><span>30 seconds · Music only</span></div>
    </div>
  );
}

function ratioOf(image: ProjectImage) {
  const size = intrinsicSize(image.src);
  if (size) return size.width / size.height;
  const [w, h] = image.aspectRatio.split("/").map(Number);
  return w > 0 && h > 0 ? w / h : 4 / 3;
}

function targetRowHeight(width: number, viewportHeight: number) {
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
  if (width < 640) return clamp(viewportHeight * 0.3, 200, 320);
  if (width < 900) return clamp(viewportHeight * 0.4, 260, 380);
  return clamp(viewportHeight * 0.37, 320, 460);
}

/**
 * Justified rows, after the decopaint portfolio: every photo in a row shares one
 * height and the row fills the width. Rather than filling rows greedily — which
 * strands a lone, oversized photo on the last row of a small set — this picks
 * the split whose row heights sit closest to the target, so four landscapes
 * become 2 + 2 and portraits pair up on phones. Returns image indexes per row.
 */
function justifiedRows(ratios: number[], width: number, viewportHeight: number, gap: number, scale: number) {
  const target = targetRowHeight(width, viewportHeight) * scale;
  const maxPerRow = width < 560 ? 2 : width < 900 ? 3 : 4;
  const cost = [0];
  const start = [0];
  for (let end = 1; end <= ratios.length; end++) {
    cost[end] = Infinity;
    let ratioSum = 0;
    for (let size = 1; size <= Math.min(maxPerRow, end); size++) {
      ratioSum += ratios[end - size];
      const height = (width - gap * (size - 1)) / ratioSum;
      const total = cost[end - size] + ((height - target) / target) ** 2;
      if (total < cost[end]) { cost[end] = total; start[end] = end - size; }
    }
  }
  const rows: number[][] = [];
  for (let end = ratios.length; end > 0; end = start[end]) {
    rows.unshift(Array.from({ length: end - start[end] }, (_, i) => start[end] + i));
  }
  return rows;
}

/**
 * Every photo laid out in full on the page — no viewer to click into.
 * `initialCount` photos show before "Load more", and each press adds `moreCount`; both round up to whole rows.
 * `rowScale` scales the target row height: below 1 fits more photos per row, above 1 shows them larger.
 */
export function ProjectGallery({ images, initialCount = 6, moreCount = 6, rowScale = 1 }: { images: ProjectImage[]; initialCount?: number; moreCount?: number; rowScale?: number }) {
  const [requested, setRequested] = useState(initialCount);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  // Laid out for a desktop container until the real width is measured after hydration.
  const [metrics, setMetrics] = useState({ width: 1360, viewportHeight: 900, gap: 12 });
  const grid = useRef<HTMLDivElement>(null);
  const ratios = useMemo(() => images.map(ratioOf), [images]);
  const rows = useMemo(() => justifiedRows(ratios, metrics.width, metrics.viewportHeight, metrics.gap, rowScale), [ratios, metrics, rowScale]);

  // Reveal whole rows only, so a load never leaves a half-filled row.
  const visibleRows: number[][] = [];
  let shown = 0;
  for (const row of rows) {
    if (shown >= requested) break;
    visibleRows.push(row);
    shown += row.length;
  }
  const hasMore = shown < images.length;

  function loadMore() {
    setFocusIndex(shown);
    setRequested(shown + moreCount);
  }

  useEffect(() => {
    const element = grid.current;
    if (!element) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const gap = parseFloat(getComputedStyle(element).rowGap);
        setMetrics({ width: element.clientWidth || 1360, viewportHeight: window.innerHeight || 900, gap: Number.isFinite(gap) ? gap : 12 });
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  // After "Load more", carry keyboard focus to the first newly revealed photo.
  useEffect(() => {
    if (focusIndex === null) return;
    grid.current?.querySelector<HTMLElement>(`[data-index="${focusIndex}"]`)?.focus();
    setFocusIndex(null);
  }, [focusIndex]);

  return (
    <>
      <div ref={grid} className={styles.gallery}>
        {visibleRows.map((row) => (
          <div key={images[row[0]].src} className={styles.galleryRow}>
            {row.map((index) => {
              const image = images[index];
              return (
                <figure key={image.src} tabIndex={-1} data-index={index} style={{ flexGrow: ratios[index], aspectRatio: ratios[index] }}>
                  <Img src={image.src} alt={image.alt} loading="lazy" sizes="(max-width: 640px) 92vw, (max-width: 1000px) 66vw, 760px" />
                  <figcaption className={styles.tileCaption}>{image.caption}</figcaption>
                </figure>
              );
            })}
          </div>
        ))}
      </div>
      {images.length > initialCount && (
        <div className={styles.galleryMore}>
          <p role="status">Showing {shown} of {images.length} photographs</p>
          {hasMore && <button type="button" className="button button-outline" onClick={loadMore}>Load more photographs</button>}
        </div>
      )}
    </>
  );
}
