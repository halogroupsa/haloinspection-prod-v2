/** Query params the quote form reads to prefill its fields. */
export const QUOTE_PREFILL_PARAMS = ["service", "location"] as const;

/** `<html>` attribute that hides prefillable fields until the form applies the query. */
export const QUOTE_PREFILL_ATTR = "data-quote-prefill";

/**
 * Inline, pre-hydration script. A static export cannot see the query at build
 * time, so mark a prefilled entry before the default controls can paint.
 * QuoteForm removes the mark once it has applied the values; CSS reveals the
 * fields anyway if hydration never arrives.
 */
export const quotePrefillScript = `(() => {
  const params = new URLSearchParams(location.search);
  if (${JSON.stringify(QUOTE_PREFILL_PARAMS)}.some((p) => params.get(p))) {
    document.documentElement.setAttribute(${JSON.stringify(QUOTE_PREFILL_ATTR)}, "pending");
  }
})();`;
