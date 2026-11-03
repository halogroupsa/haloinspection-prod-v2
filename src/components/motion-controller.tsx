"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealTargets = [
  ".hero-copy > *",
  ".page-hero-layout > div:first-child > *",
  ".breadcrumbs",
  ".hero-stage",
  ".trust-strip > *",
  ".section-heading > *",
  ".service-card",
  ".inspection-explorer",
  ".service-finder",
  ".process-step",
  ".process-footnote",
  ".report-intro > *",
  ".gallery-heading",
  ".defect-card",
  ".why-photo",
  ".why-copy > :not(.why-points)",
  ".why-points > *",
  ".media-strip > *",
  ".locations-home-layout > *",
  ".testimonial",
  ".faq-layout > *",
  ".cta-content",
  ".cta-actions",
  ".footer-top > *",
  ".footer-areas",
  ".footer-bottom",
  ".overview-layout > *",
  ".checks-grid > *",
  ".service-directory > *",
  ".location-directory > *",
  ".directory-controls",
  ".directory-title",
  ".directory-note",
  ".nearby-section .container > *",
  ".quote-intro > *",
  ".quote-form-card",
  ".contact-cards > *",
  ".contact-location > *",
  ".about-story > *",
  ".values-grid > *",
  ".credential-grid > *",
  ".faq-page-layout > *",
  ".legal-heading > *",
  ".legal-copy > *",
  ".partnership-link",
  ".not-found > *",
].join(",");

/** Enhance rendered HTML; nothing is hidden while JavaScript loads or is disabled. */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<HTMLElement>();
    const animations = new Map<Element, Animation>();
    const ease = "cubic-bezier(.22,1,.36,1)";
    const header = document.querySelector<HTMLElement>(".site-header");
    const topbar = document.querySelector(".topbar");
    let observer: IntersectionObserver | undefined;

    function syncPreference() {
      document.documentElement.dataset.motionMode = preference.matches
        ? "reduced"
        : "full";
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    }
    syncPreference();

    function play(
      target: Element,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
    ) {
      const animation = target.animate(keyframes, {
        easing: ease,
        fill: "backwards",
        ...options,
      });
      animations.set(target, animation);
      const forget = () => {
        if (animations.get(target) === animation) animations.delete(target);
      };
      animation.onfinish = forget;
      animation.oncancel = forget;
    }

    /** Text inside a revealed block follows it in; the markup is left untouched. */
    function revealText(element: HTMLElement, delay: number) {
      const within = (selector: string) =>
        [element, ...element.querySelectorAll(selector)].filter((node) =>
          node.matches(selector),
        );
      within(".eyebrow").forEach((eyebrow) =>
        play(
          eyebrow,
          [
            { opacity: 0, transform: "translateX(-10px)" },
            { opacity: 1, transform: "translateX(0)" },
          ],
          { duration: 600, delay },
        ),
      );
      within(".eyebrow-line").forEach((line) =>
        play(line, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
          duration: 800,
          delay: delay + 120,
        }),
      );
      // Clipping from the top lets multi-line headings arrive line by line.
      within("h1, h2").forEach((heading, i) =>
        play(
          heading,
          [
            {
              clipPath: "inset(-0.25em -0.25em 100% -0.25em)",
              transform: "translateY(0.35em)",
            },
            {
              clipPath: "inset(-0.25em -0.25em -0.25em -0.25em)",
              transform: "translateY(0)",
            },
          ],
          { duration: 950, delay: delay + 80 + i * 60 },
        ),
      );
      within(".check-list > li").forEach((item, i) => {
        const stagger = delay + 180 + Math.min(i, 8) * 70;
        play(
          item,
          [
            { opacity: 0, transform: "translateX(-10px)" },
            { opacity: 1, transform: "translateX(0)" },
          ],
          { duration: 520, delay: stagger },
        );
        const check = item.querySelector(":scope > svg");
        if (check)
          play(
            check,
            [
              { opacity: 0, transform: "scale(0.3)" },
              { opacity: 1, transform: "scale(1)" },
            ],
            { duration: 420, delay: stagger + 90 },
          );
      });
      within(".stars").forEach((stars) =>
        play(
          stars,
          [
            { clipPath: "inset(-4px 100% -4px -4px)" },
            { clipPath: "inset(-4px -4px -4px -4px)" },
          ],
          {
            duration: 900,
            delay: delay + 220,
            easing: "cubic-bezier(.65,0,.35,1)",
          },
        ),
      );
    }

    function reveal(element: HTMLElement) {
      observer?.unobserve(element);
      element.dataset.reveal = "shown";
      if (preference.matches || typeof element.animate !== "function") return;
      const critical = Boolean(element.closest("#hero, .quote-intro"));
      const photo = element.matches(".why-photo");
      const siblings = element.parentElement
        ? Array.from(element.parentElement.children)
        : [];
      const index = siblings.indexOf(element);
      const delay = critical
        ? Math.min(Math.max(index, 0) * 45, 180)
        : (Math.max(index, 0) % 4) * 55;
      const distance = window.innerWidth < 701 ? 12 : 20;
      const start = photo
        ? `translateX(${distance}px)`
        : `translateY(${critical ? 12 : distance}px)`;
      play(
        element,
        [
          { opacity: critical ? 1 : 0.25, transform: start },
          { opacity: 1, transform: "translate(0, 0)" },
        ],
        { duration: critical ? 650 : 560, delay },
      );
      // Already-painted critical text would flash if hidden now; motion.css animates it from first paint.
      if (!critical) revealText(element, delay);
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === topbar) {
              if (header)
                header.dataset.elevated = String(!entry.isIntersecting);
            } else if (entry.isIntersecting) {
              reveal(entry.target as HTMLElement);
            }
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );
      if (topbar) observer.observe(topbar);
    }

    function register(element: HTMLElement) {
      if (
        !element.isConnected ||
        seen.has(element) ||
        element.closest("dialog, .motion-swap")
      )
        return;
      // A selected parent carries its own content, avoiding overlapping entrance effects.
      if (element.parentElement?.closest("[data-reveal]")) return;
      seen.add(element);
      element.dataset.reveal = "ready";
      if (observer && !preference.matches) observer.observe(element);
      else element.dataset.reveal = "shown";
    }
    function scan(root: ParentNode) {
      if (root instanceof HTMLElement && root.matches(revealTargets))
        register(root);
      root.querySelectorAll<HTMLElement>(revealTargets).forEach(register);
    }
    scan(document);

    const changes = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) scan(node);
        });
        record.removedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.hasAttribute("data-reveal")) observer?.unobserve(node);
          node
            .querySelectorAll("[data-reveal]")
            .forEach((element) => observer?.unobserve(element));
          for (const [element, animation] of animations) {
            if (node === element || node.contains(element)) animation.cancel();
          }
        });
      }
    });
    changes.observe(document.body, { childList: true, subtree: true });

    function showFocused(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement)) return;
      const element = event.target.closest<HTMLElement>("[data-reveal]");
      if (!element) return;
      observer?.unobserve(element);
      for (const [target, animation] of animations) {
        if (element.contains(target)) animation.cancel();
      }
      element.dataset.reveal = "shown";
    }
    function pauseHiddenPage() {
      animations.forEach((animation) => {
        if (document.hidden) animation.pause();
        else animation.play();
      });
    }
    preference.addEventListener("change", syncPreference);
    document.addEventListener("focusin", showFocused);
    document.addEventListener("visibilitychange", pauseHiddenPage);

    return () => {
      observer?.disconnect();
      changes.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", syncPreference);
      document.removeEventListener("focusin", showFocused);
      document.removeEventListener("visibilitychange", pauseHiddenPage);
    };
  }, [pathname]);

  return null;
}
