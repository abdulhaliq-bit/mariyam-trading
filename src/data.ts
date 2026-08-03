/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  MARIYAM TRADING COMPANY — VEHICLE INVENTORY & SITE CONTENT   │
 * │                                                                 │
 * │  HOW TO ADD / EDIT / REMOVE CARS:                              │
 * │                                                                 │
 * │  Option 1: Use the built-in Admin Panel                        │
 * │    → Triple-click the copyright text at the very bottom of     │
 * │      the website. A management panel will open where you can   │
 * │      add, edit, and delete vehicles visually. Changes are      │
 * │      saved in your browser (localStorage).                     │
 * │                                                                 │
 * │  Option 2: Edit this file directly                             │
 * │    → Scroll down to the "vehicles" array below                 │
 * │    → Copy any existing car block {...} and paste it at         │
 * │      the end of the array                                      │
 * │    → Change the values to match your new car                   │
 * │    → Save and rebuild                                          │
 * │                                                                 │
 * │  TEMPLATE — copy this block to add a new car:                  │
 * │                                                                 │
 * │  {                                                              │
 * │    id: "unique-short-id",     ← any short text, no spaces     │
 * │    name: "Toyota Land Cruiser 300",  ← full model name        │
 * │    tagline: "V6 Twin Turbo · 7 seats",  ← key highlights     │
 * │    category: "SUV",           ← SUV | Sedan | Executive |     │
 * │                                  Electric | Performance        │
 * │    price: "LKR 85.0M",       ← displayed price                │
 * │    year: "2024",              ← model year                     │
 * │    mileage: "12,000 km",      ← odometer reading              │
 * │    fuel: "Diesel",            ← Petrol | Diesel | Electric |  │
 * │                                  Hybrid | Mild hybrid          │
 * │    gearbox: "10-Speed Auto",  ← gearbox type                  │
 * │    status: "In stock · Colombo 06",                            │
 * │    statusTone: "stock",       ← stock (green) | transit       │
 * │                                  (amber) | order (grey)        │
 * │    image: "https://...",      ← URL to a car photo            │
 * │    highlight: "Grade 4.5",    ← optional badge (remove line   │
 * │                                  if not needed)                 │
 * │  },                                                             │
 * │                                                                 │
 * │  IMAGES:                                                        │
 * │    → Upload your car photos to any image host (Imgur,          │
 * │      Google Photos shared link, your own server)               │
 * │    → Paste the direct image URL in the "image" field           │
 * │    → Best size: at least 1200px wide, landscape orientation    │
 * │                                                                 │
 * └─────────────────────────────────────────────────────────────────┘
 */

export type Vehicle = {
  id: string;
  name: string;
  tagline: string;
  category: "SUV" | "Sedan" | "Executive" | "Electric" | "Performance" | "Vans and Commercial";
  price: string;
  year: string;
  mileage: string;
  fuel: string;
  gearbox: string;
  status: string;
  statusTone: "stock" | "transit" | "order";
  image: string;
  images?: string[];   // multiple photos — first one is the primary / cover image
  highlight?: string;
};

// ─── DEFAULT VEHICLES (shown when no admin edits exist) ────────────
export const defaultVehicles: Vehicle[] = [
  {
    id: "gv70e",
    name: "Genesis Electrified GV70",
    tagline: "Dual-motor AWD · 483 km range",
    category: "Electric",
    price: "LKR 42.9M",
    year: "2024",
    mileage: "6,400 km",
    fuel: "Electric",
    gearbox: "Single-speed",
    status: "In stock · Colombo 06",
    statusTone: "stock",
    image:
      "https://images.pexels.com/photos/11589801/pexels-photo-11589801.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    highlight: "Chassis-verified",
  },
  {
    id: "g90",
    name: "Genesis G90 3.5T Signature",
    tagline: "Executive rear-cabin package",
    category: "Executive",
    price: "LKR 58.4M",
    year: "2023",
    mileage: "18,200 km",
    fuel: "Petrol",
    gearbox: "8-Speed Auto",
    status: "In transit · ETA 12 days",
    statusTone: "transit",
    image:
      "https://images.pexels.com/photos/12122221/pexels-photo-12122221.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    highlight: "Grade 5 auction sheet",
  },
  {
    id: "x5",
    name: "BMW X5 xDrive40i M Sport",
    tagline: "Panoramic sky lounge · Laser light",
    category: "SUV",
    price: "LKR 64.2M",
    year: "2023",
    mileage: "24,700 km",
    fuel: "Mild hybrid",
    gearbox: "8-Speed Auto",
    status: "In stock · Colombo 06",
    statusTone: "stock",
    image:
      "https://images.pexels.com/photos/14428164/pexels-photo-14428164.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "rx350",
    name: "Lexus RX 350 F Sport",
    tagline: "Mark Levinson · Adaptive suspension",
    category: "SUV",
    price: "LKR 51.6M",
    year: "2024",
    mileage: "11,900 km",
    fuel: "Petrol",
    gearbox: "8-Speed Auto",
    status: "In stock · Colombo 06",
    statusTone: "stock",
    image:
      "https://images.pexels.com/photos/16789399/pexels-photo-16789399.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    highlight: "1-owner, service booked",
  },
  {
    id: "elantra",
    name: "Hyundai Elantra N-Line",
    tagline: "Turbo GDI · Sport-tuned chassis",
    category: "Sedan",
    price: "LKR 21.8M",
    year: "2024",
    mileage: "9,300 km",
    fuel: "Petrol",
    gearbox: "7-Speed DCT",
    status: "Order to import · 6 weeks",
    statusTone: "order",
    image:
      "https://images.pexels.com/photos/14696345/pexels-photo-14696345.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "911",
    name: "Porsche 911 Carrera S",
    tagline: "Sport Chrono · Ceramic composite brakes",
    category: "Performance",
    price: "LKR 128.0M",
    year: "2022",
    mileage: "7,800 km",
    fuel: "Petrol",
    gearbox: "8-Speed PDK",
    status: "By appointment · Vault",
    statusTone: "order",
    image:
      "https://images.pexels.com/photos/33345481/pexels-photo-33345481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    highlight: "Collector grade",
  },
  {
    id: "touareg",
    name: "Volkswagen Touareg R-Line",
    tagline: "Air suspension · IQ.Light matrix",
    category: "SUV",
    price: "LKR 47.3M",
    year: "2023",
    mileage: "21,500 km",
    fuel: "Diesel",
    gearbox: "8-Speed Auto",
    status: "In transit · ETA 19 days",
    statusTone: "transit",
    image:
      "https://images.pexels.com/photos/16646414/pexels-photo-16646414.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "g70",
    name: "Genesis G70 3.3T Sport",
    tagline: "Brembo package · LSD",
    category: "Sedan",
    price: "LKR 33.9M",
    year: "2023",
    mileage: "15,600 km",
    fuel: "Petrol",
    gearbox: "8-Speed Auto",
    status: "In stock · Colombo 06",
    statusTone: "stock",
    image:
      "https://images.pexels.com/photos/11159145/pexels-photo-11159145.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
  {
    id: "hiace",
    name: "Toyota HiAce Super GL Dark Prime II",
    tagline: "Led headlights · Luxury dual A/C · 5-door Van",
    category: "Vans and Commercial",
    price: "LKR 24.5M",
    year: "2023",
    mileage: "18,400 km",
    fuel: "Diesel",
    gearbox: "6-Speed Auto",
    status: "In stock · Colombo 06",
    statusTone: "stock",
    image:
      "https://images.pexels.com/photos/33325114/pexels-photo-33325114.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    highlight: "Dual power doors",
  },
  {
    id: "carry",
    name: "Suzuki Carry Heavy Duty Dump Truck",
    tagline: "4WD High-Low range · Hard-reinforced cargo bed",
    category: "Vans and Commercial",
    price: "LKR 6.8M",
    year: "2024",
    mileage: "1,200 km",
    fuel: "Petrol",
    gearbox: "5-Speed Manual",
    status: "Order to import · 5 weeks",
    statusTone: "order",
    image:
      "https://images.pexels.com/photos/29566905/pexels-photo-29566905.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
  },
];

// ─── RUNTIME VEHICLES (reads localStorage overrides if present) ────
const STORAGE_KEY = "mtc_vehicles";

export function loadVehicles(): Vehicle[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Vehicle[];
  } catch { /* ignore */ }
  return defaultVehicles;
}

export function saveVehicles(v: Vehicle[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
}

export function resetVehicles() {
  localStorage.removeItem(STORAGE_KEY);
}

// ─── Kept for backward compat — initial static export ──────────────
export const vehicles = defaultVehicles;

export const categories = ["All", "SUV", "Sedan", "Executive", "Electric", "Performance", "Vans and Commercial"] as const;

export const features = [
  {
    icon: "shield",
    title: "Verified import provenance",
    body: "Every unit lands with its auction sheet, de-registration certificate, chassis-level history and an independent 212-point inspection report — shared before you pay a rupee.",
    tag: "212-point inspection",
  },
  {
    icon: "receipt",
    title: "All-in landed pricing",
    body: "CIF value, duty, levies, clearance, registration and our facilitation fee — itemised in one signed sheet. No moving numbers, no surprise calls a week later.",
    tag: "Itemised cost sheet",
  },
  {
    icon: "monitor",
    title: "A digital showroom that never closes",
    body: "Browse live stock with 360° walkarounds, request a video inspection on WhatsApp, and track your vehicle from auction hall to port to number plate.",
    tag: "Live status tracking",
  },
  {
    icon: "exchange",
    title: "Trade-in & upgrade in 48 hours",
    body: "Bring your current vehicle. We value it against real market data, settle any outstanding lease and roll the balance straight into your upgrade.",
    tag: "48-hour valuation",
  },
  {
    icon: "bank",
    title: "Finance desk with 9 partner banks",
    body: "Pre-approval within 24 hours, leasing structures for salaried buyers and corporates, and a rate comparison you can actually read side by side.",
    tag: "24-hour pre-approval",
  },
  {
    icon: "wrench",
    title: "Aftercare that outlasts the sale",
    body: "Extended warranty options, scheduled servicing reminders, genuine parts sourcing and insurance renewals handled by the same team that delivered your car.",
    tag: "3-year aftercare",
  },
] as const;

export const segments = [
  {
    icon: "users",
    title: "First-time & family buyers",
    body: "Straight answers, honest pricing and a hand-held process from shortlist to number plate.",
    points: ["Budget-first shortlisting", "Family safety scoring", "Insurance & registration done"],
  },
  {
    icon: "sparkle",
    title: "Luxury seekers",
    body: "Flagship saloons and marquee SUVs sourced to your exact spec, colour and trim.",
    points: ["Bespoke sourcing brief", "Private viewing suite", "Discreet delivery"],
  },
  {
    icon: "briefcase",
    title: "Corporate & fleet clients",
    body: "Multi-unit procurement, leasing structures and a single account manager for the lot.",
    points: ["Volume pricing tiers", "Fleet servicing plans", "Consolidated invoicing"],
  },
  {
    icon: "bolt",
    title: "Enthusiasts & collectors",
    body: "Grade 4.5+ auction hunting, low-mileage specials and performance builds worth keeping.",
    points: ["Auction-grade hunting", "Originality verification", "Climate-controlled vault"],
  },
] as const;

export const process = [
  {
    step: "01",
    title: "Tell us the brief",
    body: "A 20-minute consultation — in the showroom, on WhatsApp or over a call. Budget, usage, must-haves, timeline.",
  },
  {
    step: "02",
    title: "We source & verify",
    body: "We shortlist from live stock and Japanese, Korean and UK auctions, then run the full inspection and history check.",
  },
  {
    step: "03",
    title: "Landed cost sign-off",
    body: "You receive one itemised sheet covering everything to your driveway. You approve it before we commit a single unit.",
  },
  {
    step: "04",
    title: "Clearance & registration",
    body: "Shipping, customs, duty payment, RMV registration and insurance — tracked live, handled entirely by our desk.",
  },
  {
    step: "05",
    title: "Handover & aftercare",
    body: "Detailed, fuelled and delivered. Then three years of servicing reminders, warranty support and resale guidance.",
  },
] as const;

export const stats = [
  { value: 4800, suffix: "+", label: "Vehicles delivered since 2003" },
  { value: 22, suffix: " yrs", label: "Trading with the same name" },
  { value: 100, suffix: "%", label: "Units with verified provenance" },
  { value: 4.9, decimals: 1, suffix: "/5", label: "Average Google rating" },
] as const;

export const brands = [
  "TOYOTA",
  "HYUNDAI",
  "BMW",
  "MERCEDES-BENZ",
  "LEXUS",
  "LAND ROVER",
  "GENESIS",
  "AUDI",
  "PORSCHE",
  "KIA",
  "VOLVO",
  "NISSAN",
  "SUZUKI",
  "BYD",
];

export type Testimonial = {
  name: string;
  role: string;
  initials: string;
  rating: number;
  badge: string;
  quote: string;
  accent?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Wazeer Nisthar",
    role: "Local Guide · 338 reviews",
    initials: "WN",
    rating: 5,
    badge: "Verified Google review",
    quote:
      "Very trustworthy, honest people. I bought a vehicle, exchanged and upgraded. Seamless service and supportive — a genuinely service-oriented mindset.",
    accent: true,
  },
  {
    name: "Dinesh Weerakoon",
    role: "Director, Ceylon Logistics (Pvt) Ltd",
    initials: "DW",
    rating: 5,
    badge: "Corporate fleet · 12 units",
    quote:
      "We moved our entire sales fleet through Mariyam. One account manager, one invoice, delivery inside the quoted window. Procurement has never been this quiet.",
  },
  {
    name: "Fathima Rizwan",
    role: "First-time buyer, Dehiwala",
    initials: "FR",
    rating: 5,
    badge: "Family SUV",
    quote:
      "They showed me the auction sheet and the full cost breakdown on day one. Nothing changed at the end. As a first-time buyer, that honesty meant everything.",
  },
  {
    name: "Rohan Jayasuriya",
    role: "Collector, Colombo 07",
    initials: "RJ",
    rating: 5,
    badge: "Performance sourcing",
    quote:
      "I asked for a specific spec in a specific colour. They found it, verified originality, and kept me updated with photos every week until it landed.",
  },
  {
    name: "Ayesha Perera",
    role: "Consultant Physician",
    initials: "AP",
    rating: 5,
    badge: "Trade-in & upgrade",
    quote:
      "My trade-in was valued fairly in a day and the lease settlement was handled for me. I drove out in the upgrade the same week.",
  },
  {
    name: "Mohamed Aslam",
    role: "GM Finance, Hela Apparel Group",
    initials: "MA",
    rating: 5,
    badge: "Leasing structure",
    quote:
      "Their finance desk put three bank offers side by side with real numbers. We saved close to nine percent over our previous arrangement.",
  },
];

export type Plan = {
  name: string;
  audience: string;
  priceStock: string;
  priceOrder: string;
  unit: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Essential",
    audience: "For buyers who already know the car",
    priceStock: "0%",
    priceOrder: "1.5%",
    unit: "facilitation fee",
    blurb: "Buy from verified live stock or place a straightforward import order.",
    features: [
      "Full inspection & auction sheet access",
      "Itemised landed-cost sheet",
      "Customs clearance & RMV registration",
      "Insurance activation on handover",
      "12-month aftercare helpline",
    ],
    cta: "Browse live stock",
  },
  {
    name: "Signature Concierge",
    audience: "For luxury seekers & bespoke briefs",
    priceStock: "1.5%",
    priceOrder: "3%",
    unit: "facilitation fee",
    blurb: "We hunt the exact spec, colour and grade — then manage everything to your driveway.",
    features: [
      "Everything in Essential",
      "Bespoke auction sourcing across 3 markets",
      "Independent 212-point inspection report",
      "Weekly photo & video progress updates",
      "Private viewing suite & doorstep delivery",
      "36-month aftercare with priority servicing",
    ],
    cta: "Start a sourcing brief",
    featured: true,
  },
  {
    name: "Corporate Fleet",
    audience: "For companies buying 3+ vehicles",
    priceStock: "Custom",
    priceOrder: "Custom",
    unit: "volume agreement",
    blurb: "Structured procurement, leasing and lifecycle management for your whole fleet.",
    features: [
      "Everything in Signature Concierge",
      "Dedicated account manager & SLA",
      "Volume pricing & consolidated invoicing",
      "Leasing structures via 9 partner banks",
      "Fleet servicing & replacement scheduling",
      "Quarterly resale-value reporting",
    ],
    cta: "Talk to fleet desk",
  },
];

export const faqs = [
  {
    q: "How do I know the vehicle's history is genuine?",
    a: "Every imported unit arrives with its original auction sheet, export certificate and de-registration document. We attach an independent 212-point inspection report and a chassis-level history check, and we hand you the physical file at delivery. If any document can't be verified, the vehicle never reaches our floor.",
  },
  {
    q: "Is the quoted price really the final price?",
    a: "Yes. Before you commit, you receive a signed landed-cost sheet that itemises CIF value, duty and levies, port and clearance charges, registration, insurance and our facilitation fee. That figure is locked for the agreed timeline — the only variable we cannot control is a government duty revision, and we tell you in writing the day one is announced.",
  },
  {
    q: "Can I trade in my current vehicle?",
    a: "Absolutely. Send photos and documents on WhatsApp for an indicative figure within a few hours, or bring it in for a formal valuation. We benchmark against live market data, settle any outstanding lease directly with your bank, and apply the balance to your upgrade — most exchanges complete within 48 hours.",
  },
  {
    q: "How long does an import order take?",
    a: "Typically six to ten weeks from sign-off to registration, depending on the source market and shipping schedule. You track each stage — sourced, purchased, shipped, berthed, cleared, registered — from a live link, and your account manager checks in weekly.",
  },
  {
    q: "Do you arrange leasing and finance?",
    a: "We work with nine partner banks and leasing companies. Share your documents once and we return a side-by-side comparison of rates, tenures and monthly instalments, usually with pre-approval inside 24 hours. There is no obligation to use our partners.",
  },
  {
    q: "I live outside Colombo. Can everything be done remotely?",
    a: "Yes. Consultations run on WhatsApp video, documents are signed digitally, payments go through traceable bank channels, and we deliver island-wide on a covered carrier. Roughly a third of our clients complete their purchase without visiting the showroom.",
  },
  {
    q: "What happens after I take delivery?",
    a: "Your aftercare plan begins immediately: servicing reminders, genuine parts sourcing, warranty administration, insurance renewals and an annual valuation so you always know where you stand on resale. Same team, same phone number.",
  },
] as const;

export const navLinks = [
  { label: "Inventory", href: "#inventory" },
  { label: "Why Mariyam", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

// ─── ENQUIRY INBOX SYSTEM ──────────────────────────────────────────
export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  interest: string;
  notes?: string;
  timestamp: string;
  resolved?: boolean;
};

const ENQUIRIES_KEY = "mtc_enquiries";

export function loadEnquiries(): Enquiry[] {
  try {
    const raw = localStorage.getItem(ENQUIRIES_KEY);
    if (raw) return JSON.parse(raw) as Enquiry[];
  } catch { /* ignore */ }
  return [];
}

export function saveEnquiries(e: Enquiry[]) {
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(e));
}

