import type { CSSProperties } from "react";

export type IconName =
  | "arrow"
  | "check"
  | "shield"
  | "phone"
  | "location"
  | "mail"
  | "menu"
  | "close"
  | "chevron"
  | "search"
  | "home"
  | "building"
  | "key"
  | "report"
  | "spark"
  | "clock"
  | "whatsapp"
  | "plus"
  | "tool"
  | "star";
const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  shield: (
    <>
      <path d="M12 3 3.5 6v6c0 5 8.5 9 8.5 9s8.5-4 8.5-9V6L12 3Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  phone: (
    <path d="m7 3 3 5-2 2c1.3 2.8 3.2 4.7 6 6l2-2 5 3c-.5 3-2 4-4 4C10 20 4 14 3 7c0-2 1-3.5 4-4Z" />
  ),
  location: (
    <>
      <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7v11H3V10Z" />
      <path d="M9 21v-8h6v8" />
    </>
  ),
  building: (
    <>
      <path d="M5 21V3h14v18M3 21h18M9 21v-4h6v4M9 7h1m4 0h1m-6 5h1m4 0h1" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="5" />
      <path d="m11.5 11.5 9 9M17 16l3-3M14 13l3-3" />
    </>
  ),
  report: (
    <>
      <path d="M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8M8 16h5" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  whatsapp: (
    <>
      <path d="m3 21 1.5-5A9 9 0 1 1 8 20l-5 1Z" />
      <path d="m8 7 2 3-1 1c1 2 2 3 4 4l1-1 3 2c-1 2-3 2-5 1-3-1.5-5-4-5-6 0-2 0-3 1-4Z" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  tool: (
    <>
      <path d="m14 6 4 4 3-3c1 4-3 8-7 6L6 21l-3-3 8-8c-2-4 2-8 6-7l-3 3Z" />
    </>
  ),
  star: (
    <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
  ),
};
export function Icon({
  name,
  className,
  style,
}: {
  name: IconName;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      style={style}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
