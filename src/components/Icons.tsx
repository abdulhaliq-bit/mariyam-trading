import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ShieldCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5.2c0 4.4-2.9 8.4-7 9.8-4.1-1.4-7-5.4-7-9.8V6l7-3z" />
    <path d="M9 12.2l2 2 4-4.2" />
  </svg>
);

export const Receipt = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3h12v18l-2.2-1.5L13.6 21l-2.2-1.5L9.2 21 7 19.5 6 21V3z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </svg>
);

export const Monitor = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="4" width="19" height="13" rx="2" />
    <path d="M9 21h6M12 17v4" />
    <path d="M6.5 12l2.5-3 2.5 2.6L14.5 8l3 4" />
  </svg>
);

export const Exchange = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 8h13l-3-3" />
    <path d="M20 16H7l3 3" />
  </svg>
);

export const Bank = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 10l9-5 9 5" />
    <path d="M5 10v8M10 10v8M14 10v8M19 10v8" />
    <path d="M3 21h18" />
  </svg>
);

export const Wrench = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M15.5 3.5a5 5 0 00-6.3 6.3L3.8 15.2a2 2 0 102.8 2.8l5.4-5.4a5 5 0 006.3-6.3l-2.8 2.8-2.6-.7-.7-2.6 2.8-2.8z" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const Star = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.6l2.7 5.8 6.3.8-4.6 4.3 1.2 6.2L12 16.8 6.4 19.7l1.2-6.2L3 9.2l6.3-.8L12 2.6z" />
  </svg>
);

export const Quote = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M9.6 6C6.5 7.3 4.8 9.9 4.8 13.4c0 2.7 1.6 4.6 4 4.6 2.1 0 3.6-1.5 3.6-3.5s-1.4-3.4-3.3-3.4c-.3 0-.6 0-.8.1.4-1.5 1.6-2.7 3.2-3.5L9.6 6zm8.4 0c-3.1 1.3-4.8 3.9-4.8 7.4 0 2.7 1.6 4.6 4 4.6 2.1 0 3.6-1.5 3.6-3.5s-1.4-3.4-3.3-3.4c-.3 0-.6 0-.8.1.4-1.5 1.6-2.7 3.2-3.5L18 6z" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6.2 3.5h3l1.4 3.6-1.9 1.3a12 12 0 005.9 5.9l1.3-1.9 3.6 1.4v3a2 2 0 01-2.2 2A16.5 16.5 0 014.2 5.7a2 2 0 012-2.2z" />
  </svg>
);

export const WhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.52 3.68 1.44 5.2L2 22l5.12-1.6a9.8 9.8 0 004.92 1.3h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2zm0 17.9c-1.6 0-3.1-.43-4.4-1.2l-.32-.18-3.04.95.97-2.96-.2-.32a8.1 8.1 0 01-1.25-4.35c0-4.5 3.7-8.16 8.25-8.16 2.2 0 4.27.86 5.83 2.4a8.1 8.1 0 012.42 5.77c0 4.5-3.7 8.05-8.26 8.05zm4.53-6.03c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12s-.64.8-.79.97c-.14.16-.29.19-.54.06a6.6 6.6 0 01-1.95-1.19 7.3 7.3 0 01-1.35-1.66c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.84.82-.84 1.99s.86 2.31.98 2.47c.13.16 1.7 2.58 4.11 3.62.58.25 1.02.4 1.37.5.58.19 1.1.16 1.51.1.46-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.11-.22-.17-.47-.3z" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Gauge = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 18a8 8 0 1116 0" />
    <path d="M12 14l4-3.5" />
  </svg>
);

export const Fuel = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 21V5a2 2 0 012-2h4a2 2 0 012 2v16" />
    <path d="M4 21h10M6 10h6" />
    <path d="M16 8l2 2v7a2 2 0 004 0V9l-3-3" />
  </svg>
);

export const Cog = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
  </svg>
);

export const Calendar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
  </svg>
);

export const Bolt = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M13 2L4.5 13.5H11L10.5 22 19.5 10H13l0-8z" />
  </svg>
);

export const Users = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.8 20a6.2 6.2 0 0112.4 0" />
    <path d="M16 5.4a3.2 3.2 0 010 5.2M17.5 20a6.3 6.3 0 00-2.2-4.8" />
  </svg>
);

export const Briefcase = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
    <path d="M9 7.5V6a2 2 0 012-2h2a2 2 0 012 2v1.5M3 12.5h18" />
  </svg>
);

export const Car = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 16.5V13l1.8-4.6A2 2 0 017.7 7h8.6a2 2 0 011.9 1.4L20 13v3.5" />
    <path d="M4 13h16" />
    <circle cx="7.5" cy="16.8" r="1.7" />
    <circle cx="16.5" cy="16.8" r="1.7" />
  </svg>
);

export const Globe = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.3l3.2 2" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    <path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
  </svg>
);

export const Play = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8 5.2v13.6L19 12 8 5.2z" />
  </svg>
);

export const Plus = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Google = (p: IconProps) => (
  <svg viewBox="0 0 24 24" {...p}>
    <path
      fill="#4285F4"
      d="M21.6 12.23c0-.68-.06-1.34-.18-1.96H12v3.71h5.38a4.6 4.6 0 01-2 3.02v2.5h3.24c1.9-1.74 2.98-4.3 2.98-7.27z"
    />
    <path
      fill="#34A853"
      d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.6-4.12H3.06v2.58A10 10 0 0012 22z"
    />
    <path fill="#FBBC05" d="M6.4 13.91a6 6 0 010-3.82V7.5H3.06a10 10 0 000 9l3.34-2.59z" />
    <path
      fill="#EA4335"
      d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86C16.95 2.99 14.7 2 12 2A10 10 0 003.06 7.5L6.4 10.1c.8-2.37 3-4.12 5.6-4.12z"
    />
  </svg>
);

export const Lock = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4.5" y="10" width="15" height="10" rx="2" />
    <path d="M8 10V7.5a4 4 0 018 0V10" />
  </svg>
);
