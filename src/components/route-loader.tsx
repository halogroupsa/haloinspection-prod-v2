"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Img } from "./image";

/** Long enough to read as a deliberate beat rather than a flicker. */
const MIN_VISIBLE = 520;
/** A navigation that never lands (offline, a failed chunk) must not trap the page. */
const GIVE_UP = 8000;

const trim = (path: string) => path.replace(/\/+$/, "") || "/";

/**
 * A brief branded cover between pages. It goes up the moment an internal link
 * is followed (or history moves), and comes down once the new route has
 * rendered — so the scroll reset and the swap of content happen out of sight.
 *
 * Next's own route announcer already tells assistive technology the page
 * changed, so this stays decorative. Reduced motion skips it entirely: a
 * full-screen flash with no fade is the one version worse than none.
 */
export function RouteLoader() {
  const pathname = usePathname();
  const cover = useRef<HTMLDivElement>(null);
  const shownAt = useRef(0);
  const hideTimer = useRef<number | undefined>(undefined);
  const giveUpTimer = useRef<number | undefined>(undefined);
  const renderedPath = useRef(pathname);

  function show() {
    const el = cover.current;
    if (!el || document.documentElement.dataset.motionMode === "reduced") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearTimeout(hideTimer.current);
    window.clearTimeout(giveUpTimer.current);
    if (el.dataset.state !== "active") shownAt.current = performance.now();
    el.dataset.state = "active";
    giveUpTimer.current = window.setTimeout(hide, GIVE_UP);
  }

  function hide() {
    const el = cover.current;
    if (!el) return;
    window.clearTimeout(giveUpTimer.current);
    const wait = Math.max(0, MIN_VISIBLE - (performance.now() - shownAt.current));
    hideTimer.current = window.setTimeout(() => {
      el.dataset.state = "idle";
    }, wait);
  }

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      // Same page, only a hash or query change: nothing is loading.
      if (trim(url.pathname) === trim(location.pathname)) return;
      // Files under public/ (the checklist download) open in place, not as a route.
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return;
      show();
    }
    function onHistory() {
      // Back or forward between anchors on one page is not a page change.
      if (trim(location.pathname) !== trim(renderedPath.current)) show();
    }
    function onPageShow(event: PageTransitionEvent) {
      // Restored from the back/forward cache with the cover still up.
      if (event.persisted && cover.current) cover.current.dataset.state = "idle";
    }

    // Capture, so the cover is up before next/link starts the transition.
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onHistory);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onHistory);
      window.removeEventListener("pageshow", onPageShow);
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(giveUpTimer.current);
    };
  }, []);

  useEffect(() => {
    if (pathname === renderedPath.current) return;
    renderedPath.current = pathname;
    hide();
  }, [pathname]);

  return (
    <div className="route-loader" data-state="idle" ref={cover} aria-hidden="true">
      <div className="route-loader-mark">
        <Img src="/images/logo.webp" sizes="126px" alt="Halo Property Inspection" width="126" height="48" />
        <span className="route-loader-bar" />
      </div>
    </div>
  );
}
