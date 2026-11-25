import { projects, projectPaths } from "./projects";
import legacyRedirectMap from "./legacy-redirects.json";

export { SITE_URL } from "./deployment";
export const BUSINESS = {
  name: "Halo Property Inspection",
  legalName: "Halo Shield LLC",
  phone: "+971 50 514 3610",
  phoneLink: "tel:+971505143610",
  whatsapp: "https://wa.me/971505143610",
  email: "info@haloinspection.ae",
  address: "46MH+G9J, Al Quoz, Dubai, United Arab Emirates",
  map: "https://www.google.com/maps/search/?api=1&query=46MH%2BG9J%20Al%20Quoz%20Dubai",
  instagram: "https://www.instagram.com/halo_property_inspection",
  facebook: "https://www.facebook.com/profile.php?id=61556260847766",
};

export function propertyQuoteHref(slug: string) {
  return `/quote?service=${encodeURIComponent(slug)}#inspection-enquiry`;
}

export type FAQ = { question: string; answer: string };
export type Service = {
  slug: string;
  name: string;
  shortName: string;
  category: "Residential" | "Commercial";
  eyebrow: string;
  headline: string;
  seoTitle?: string;
  description: string;
  image: string;
  imageAlt: string;
  intro: string;
  paragraphs: string[];
  checks: { title: string; text: string }[];
  ideal: string[];
  faqs: FAQ[];
  propertyDetails?: {
    access: string[];
    exclusions: string;
    examples: { image: string; alt: string; caption: string }[];
  };
};

const homeChecks = [
  {
    title: "Finishes & workmanship",
    text: "Wall and ceiling finishes, cracked or hollow tiles, floor levels, paintwork, sealants and visible construction defects.",
  },
  {
    title: "Air conditioning & ventilation",
    text: "Accessible AC equipment, airflow, outlet temperatures, controls, ventilation and signs of condensation or drainage problems.",
  },
  {
    title: "Electrical systems",
    text: "Accessible sockets, switch operation, distribution-board observations and visible signs of unsafe or incomplete installation.",
  },
  {
    title: "Plumbing & wet areas",
    text: "Water flow, drainage, accessible leaks, sanitary fittings, kitchen connections and moisture readings where needed.",
  },
  {
    title: "Doors, windows & joinery",
    text: "Operation, alignment, seals, glass condition, handles, locks, cabinetry and fitted storage.",
  },
  {
    title: "External & accessible areas",
    text: "Balconies, accessible exterior finishes and property-specific features. Villa scopes can include gardens, terraces and boundary areas.",
  },
];

const baseFAQs: FAQ[] = [
  {
    question: "What will my inspection report include?",
    answer:
      "Your digital report records the inspected areas, photographs of identified defects, their locations and recommendations for the next step. It gives you a practical list to discuss with your developer, seller or contractor.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Share the property type, size, location and the reason for the inspection. Halo will confirm the appropriate scope, availability and fee before you book. Re-inspections and specialist testing can be quoted separately.",
  },
  {
    question: "Do the utilities need to be connected?",
    answer:
      "Working electricity and water allow a more complete assessment of AC, sockets, plumbing and drainage. Tell the team in advance if services are disconnected or access is restricted, so limitations can be agreed.",
  },
];

function service(
  input: Omit<Service, "checks" | "faqs"> & {
    checks?: Service["checks"];
    faqs?: FAQ[];
  },
): Service {
  return {
    ...input,
    checks: input.checks || homeChecks,
    faqs: input.faqs || baseFAQs,
  };
}

export const services: Service[] = [
  service({
    slug: "services/pre-purchase",
    name: "Pre-purchase property inspection",
    shortName: "Pre-purchase",
    category: "Residential",
    eyebrow: "BUY WITH YOUR EYES OPEN",
    headline: "Love the property. Know the condition.",
    description:
      "Independent pre-purchase property inspections in Dubai and across the UAE. Understand visible defects, MEP condition and repair priorities before buying.",
    image: "inspection/pre-purchase",
    imageAlt: "Inspector checking a sliding balcony door in a furnished resale apartment",
    intro:
      "A viewing shows you the potential. A pre-purchase inspection helps you understand what you are taking on.",
    paragraphs: [
      "Before committing to a resale apartment or villa, get an independent assessment of the accessible property. We look beyond presentation to the condition of finishes, doors, windows, plumbing, electrical fittings and air conditioning.",
      "The report helps you ask informed questions, discuss identified issues with the seller and plan repairs. Where specialist investigation is needed, we explain the limitation and the recommended next step.",
    ],
    ideal: [
      "Buyers considering a resale property",
      "Investors comparing property condition",
      "Owners planning repair budgets",
    ],
    faqs: [
      {
        question: "When should I arrange a pre-purchase inspection?",
        answer:
          "Arrange it while you still have time to review the findings before completing your purchase. Coordinate access with the seller or agent and discuss the inspection timing with your transaction adviser.",
      },
      ...baseFAQs,
    ],
  }),
  service({
    slug: "services/handover",
    name: "Handover & snagging inspection",
    shortName: "Handover",
    category: "Residential",
    eyebrow: "BEFORE YOU ACCEPT THE KEYS",
    headline: "A new home deserves a proper once-over.",
    description:
      "New-build handover and property snagging inspections in Dubai and the UAE. Get a clear photographic defect report before accepting your new apartment or villa.",
    image: "inspection/handover",
    imageAlt: "Inspector examining door alignment in an unfurnished new apartment",
    intro:
      "Make your handover about moving forward, with a clear record of the work that still needs attention.",
    paragraphs: [
      "New construction can contain installation problems and unfinished details. Halo checks accessible areas of your new property, from tile finishes and joinery to AC performance and plumbing operation.",
      "We document the findings in an organised snagging report for your developer. Once rectification is completed, a secondary inspection can check the recorded items again.",
    ],
    ideal: [
      "Off-plan apartment handovers",
      "New villa completions",
      "Owners managing developer rectification",
    ],
    faqs: [
      {
        question: "Can you inspect before my developer handover?",
        answer:
          "Yes, subject to your developer permitting access. Share your handover notice and access requirements with Halo so the visit can be coordinated.",
      },
      {
        question: "Can you check the fixes afterwards?",
        answer:
          "A secondary inspection can revisit the original snag list and record whether the identified issues have been addressed. Ask for a re-inspection quote when booking.",
      },
      ...baseFAQs,
    ],
  }),
  service({
    slug: "services/pre-listing",
    name: "Pre-listing property inspection",
    shortName: "Pre-listing",
    category: "Residential",
    eyebrow: "PUT YOUR BEST PROPERTY FORWARD",
    headline: "Know what to fix. Before it goes on the market.",
    description:
      "Pre-listing inspections for UAE property sellers. Identify maintenance and presentation issues before marketing your apartment or villa.",
    image: "inspection/pre-listing",
    imageAlt: "Inspector documenting a window frame in an established villa before sale",
    intro:
      "A clearer picture of your property's condition can make preparing for sale more straightforward.",
    paragraphs: [
      "Selling a property is easier when you understand the issues a buyer may notice. Our pre-listing assessment identifies accessible defects, maintenance concerns and workmanship problems so you can decide what to address before viewings.",
      "The report supports practical conversations with your agent and contractors. It does not replace a buyer's independent inspection, but it gives you a useful starting point for repairs and disclosure.",
    ],
    ideal: [
      "Owners preparing to sell",
      "Agents helping clients get market-ready",
      "Investors planning light refurbishment",
    ],
  }),
  service({
    slug: "services/residential/handover",
    name: "Residential handover inspection",
    shortName: "Residential handover",
    category: "Residential",
    eyebrow: "A CAREFUL START TO HOMEOWNERSHIP",
    headline: "Your home is new. Our attention is thorough.",
    description:
      "Residential handover inspections for new apartments, townhouses and villas in the UAE. Check finishes, fixtures and accessible systems before moving in.",
    image: "inspection/residential-handover",
    imageAlt: "Inspector checking newly installed kitchen cabinetry at residential handover",
    intro: "An inspection shaped around the spaces you will live in every day.",
    paragraphs: [
      "For homeowners receiving a new apartment, townhouse or villa, we inspect rooms systematically and record defects with their locations. Kitchens, bathrooms, balconies, storage and living spaces each receive attention appropriate to the property.",
      "Bring the inspection report into your handover conversation. Clear photographs and descriptions help you track developer rectification, and a follow-up visit can verify the listed work.",
    ],
    ideal: [
      "First-time homeowners",
      "Families receiving a new-build home",
      "Remote owners arranging a handover",
    ],
  }),
  service({
    slug: "services/apartment",
    name: "Apartment inspection",
    shortName: "Apartments",
    category: "Residential",
    eyebrow: "HANDOVER SNAGGING & RESALE INSPECTIONS",
    headline: "Apartment snagging & inspection in Dubai",
    seoTitle: "Apartment Snagging & Inspection in Dubai | Halo",
    description:
      "Book an apartment inspection in Dubai or across the UAE. See what Halo checks in your unit and private balcony, how to arrange access and what your photo report includes.",
    image: "apartment",
    imageAlt: "Property inspector measuring airflow at an apartment air conditioning grille",
    intro:
      "From studios to penthouses, we check accessible rooms, fittings and services before handover, purchase or move-in. You get a photographic report to share with your developer or seller.",
    paragraphs: [
      "For a new-build handover, the inspection records visible snags you can raise with the developer. For a resale apartment, it documents the unit’s condition and issues you may want to discuss with the seller before purchase.",
    ],
    checks: [
      { title: "Living areas & bedrooms", text: "Walls, ceilings, paint, flooring, grout and skirting for visible damage, gaps and uneven finishes." },
      { title: "Kitchen & fitted storage", text: "Worktops, cabinet doors, drawers and fitted wardrobes for finish, alignment and operation. We check the kitchen sink and accessible connections where water is available." },
      { title: "Bathrooms & plumbing", text: "Taps, toilets, showers, drainage, seals and visible leaks. We look for signs of moisture around accessible fittings and finishes." },
      { title: "AC & ventilation", text: "Accessible grilles, controls and airflow where the unit’s cooling and ventilation are operational." },
      { title: "Electrical fittings", text: "Accessible lights, switches and sockets where power is available, plus visible observations of the unit’s distribution board where accessible." },
      { title: "Doors, windows & private balconies", text: "Door and window operation, glass, seals and locks. On accessible private balconies, we check visible finishes, thresholds, drainage and railings." },
    ],
    ideal: [
      "Studio and apartment handovers",
      "Resale apartment buyers",
      "Landlords and tenants preparing to move",
    ],
    propertyDetails: {
      access: [
        "Confirm the tower name, unit access and inspection window with the developer, owner or building management. Ask whether security needs visitor registration or inspector details in advance.",
        "Arrange access to all rooms, private balconies and relevant service panels. If the unit is occupied, coordinate entry with the occupant.",
        "Confirm that electricity, water and cooling are operational. Tell Halo about any disconnected utilities or limits on access before the visit.",
      ],
      exclusions: "The standard scope covers the agreed, accessible parts of your unit and private areas. Shared corridors, lifts, building plant and common roofs are outside the unit inspection. Concealed pipework and wiring, unsafe areas and destructive testing are excluded. The report records any limits on what could be checked.",
      examples: [
        { image: "/images/reports/8.webp", alt: "Inspection photo of weak water flow from a basin tap", caption: "Weak water flow at a basin tap" },
        { image: "/images/reports/9.webp", alt: "Inspection photo of a gap in the finish beside a door frame", caption: "Unfinished gap beside a door frame" },
      ],
    },
    faqs: [
      {
        question: "When should I book apartment snagging?",
        answer: "Enquire as soon as you have a handover date or access window. Allow time for the visit, report and developer follow-up before you accept handover, where your schedule permits.",
      },
      {
        question: "What if the apartment has no water, power or cooling?",
        answer: "Accessible finishes can still be inspected. Functional checks that need the unavailable service will be limited. Tell Halo which utilities are off so we can agree the scope before you book.",
      },
      {
        question: "Can I arrange an inspection from overseas?",
        answer: "Contact Halo with the building details, the proposed inspection window and the person who can arrange access. We’ll discuss the developer’s or building’s requirements and send you the report digitally.",
      },
    ],
  }),
  service({
    slug: "services/villa",
    name: "Villa inspection",
    shortName: "Villas",
    category: "Residential",
    eyebrow: "HANDOVER SNAGGING & RESALE INSPECTIONS",
    headline: "Villa snagging & inspection in Dubai",
    seoTitle: "Villa Snagging & Inspection in Dubai | Halo",
    description:
      "Book a villa or townhouse inspection in Dubai or across the UAE. See what Halo checks indoors and out, what access to arrange and what your photo report includes.",
    image: "inspection/villa",
    imageAlt: "Inspector checking an exterior wall and terrace drainage at a villa",
    intro:
      "We inspect villas and townhouses room by room, with agreed checks for accessible exterior areas. Get a photographic record of defects before handover, purchase or move-in.",
    paragraphs: [
      "For a new villa, use the snag list to raise unfinished work and defects with your developer. For an established villa, use the report to discuss visible repair needs with the seller or plan maintenance. Tell us about separate structures and outdoor areas when you request the quote.",
    ],
    checks: [
      { title: "Interiors & staircases", text: "Walls, ceilings, floor tiles, paint, skirting and accessible stairs and handrails. We look for visible cracks, damage and unfinished work." },
      { title: "Kitchens, bathrooms & utility rooms", text: "Cabinetry, worktops, fittings, water flow and drainage. We look for visible leaks and moisture around accessible plumbing and wet areas." },
      { title: "AC & ventilation", text: "Accessible controls, outlets and equipment. Where systems are operational, we check airflow and look for visible signs of condensation or drainage issues." },
      { title: "Electrical fittings", text: "Accessible lights, switches and sockets where power is available, plus visible observations at accessible distribution boards." },
      { title: "Doors, windows & joinery", text: "Alignment, operation, locks, seals and glazing on accessible internal and external doors and windows, plus fitted cabinetry." },
      { title: "Terraces, exterior & drainage", text: "Where agreed and safe to access, we check terrace finishes, visible exterior defects and surface drainage. Gardens, driveways and boundary features can be included in the agreed scope." },
    ],
    ideal: [
      "New-build villa owners",
      "Buyers of established villas",
      "Families planning maintenance or renovation",
    ],
    propertyDetails: {
      access: [
        "Arrange entry with the developer, seller or occupant. Share any community gate or security requirements and the available inspection window.",
        "Arrange keys or access for each floor and any agreed exterior or service areas. Flag roofs, locked rooms, annexes and areas that may be unsafe to reach.",
        "Confirm that electricity, water and air conditioning are operational. Share any known leaks or other concerns you want the inspector to consider.",
      ],
      exclusions: "The inspection is non-invasive and covers agreed areas that are safe and accessible. Concealed wiring, buried pipework and unsafe or inaccessible roofs are excluded. Ask Halo to confirm separately whether accessible roofs, pools or specialist equipment can be included, or whether they need a specialist visit.",
      examples: [
        { image: "/images/reports/21.webp", alt: "Inspection photo of chipped tiles and a damaged grout joint", caption: "Tile edge damage and incomplete grout" },
        { image: "/images/reports/16.webp", alt: "Inspection photo showing signs of a leak around a water-heater fitting", caption: "Leak at a water-heater connection" },
      ],
    },
    faqs: [
      {
        question: "Can Halo inspect a townhouse as well as a detached villa?",
        answer: "Yes. Share the built-up area, number of floors and any outside or service areas you want checked so we can plan the visit and agree the scope.",
      },
      {
        question: "How long does a villa inspection take?",
        answer: "Time on site depends on the size, number of floors, available access and agreed external areas. Halo will confirm the inspection window and report turnaround with your quote.",
      },
      {
        question: "Can Halo recheck repairs after the developer finishes?",
        answer: "Yes. Ask for a separate re-inspection quote to check the original reported items after the developer or contractor completes the repairs.",
      },
    ],
  }),
  service({
    slug: "services/residential/dlp-inspection",
    name: "Defects liability period inspection",
    shortName: "DLP inspection",
    category: "Residential",
    eyebrow: "BEFORE THE DEADLINE",
    headline: "Catch developing defects. While there is time.",
    description:
      "DLP inspections for UAE homeowners before their defects liability period expires. Document developing issues for discussion with the developer.",
    image: "inspection/dlp-inspection",
    imageAlt: "Inspector taking a moisture reading below a window in an occupied home",
    intro:
      "Some problems become visible only after you have lived in the property.",
    paragraphs: [
      "A defects liability period inspection looks for issues that have developed since handover: recurring moisture, cracks, poorly performing AC, faulty fittings or deterioration in finishes. The assessment gives you a record to raise with your developer.",
      "Check your contract's exact deadlines and warranty terms. An inspection documents condition; the developer determines coverage under the applicable agreement. Book early enough to review and submit your findings.",
    ],
    ideal: [
      "Owners approaching a DLP deadline",
      "Homes showing defects after occupation",
      "Owners tracking recurring developer repairs",
    ],
  }),
  service({
    slug: "services/residential/energy-efficiency",
    name: "Home energy efficiency inspection",
    shortName: "Energy efficiency",
    category: "Residential",
    eyebrow: "A MORE COMFORTABLE HOME",
    headline: "Understand where comfort gets lost.",
    description:
      "Residential energy efficiency inspections in Dubai and the UAE. Assess accessible AC performance, air leakage indicators and building-envelope concerns.",
    image: "inspection/energy-efficiency",
    imageAlt: "Inspector using a thermal camera to assess heat loss around a window",
    intro:
      "Get a practical assessment of the issues that may affect comfort and energy use.",
    paragraphs: [
      "We assess accessible cooling systems, ventilation, window and door seals and visible building-envelope concerns. Appropriate temperature and airflow measurements can help highlight performance problems that deserve attention.",
      "Recommendations focus on the observations made during your visit. This is a condition assessment rather than a guaranteed energy-saving calculation or a formal energy certification.",
    ],
    ideal: [
      "Homes with uneven cooling",
      "Owners investigating high energy use",
      "Properties with draughts or condensation",
    ],
    checks: [
      {
        title: "Cooling performance",
        text: "AC outlet temperatures, accessible controls and airflow observations.",
      },
      {
        title: "Air leakage indicators",
        text: "Door and window seal condition and visible gaps in the accessible envelope.",
      },
      {
        title: "Moisture & condensation",
        text: "Visible dampness and readings where conditions warrant further assessment.",
      },
      {
        title: "Practical recommendations",
        text: "Findings that help you prioritise maintenance and further specialist investigation.",
      },
    ],
  }),
  service({
    slug: "services/residential/post-renovation",
    name: "Post-renovation inspection",
    shortName: "Post-renovation",
    category: "Residential",
    eyebrow: "THE FINAL DETAIL MATTERS",
    headline: "Check the work. Enjoy the transformation.",
    description:
      "Post-renovation property inspections in Dubai and the UAE. Review accessible workmanship, finishes, fittings and systems after refurbishment.",
    image: "inspection/post-renovation",
    imageAlt: "Inspector measuring tile alignment in a recently renovated bathroom",
    intro:
      "An independent review of the completed work, before the renovation becomes your everyday home.",
    paragraphs: [
      "Renovation can change finishes, fittings and building services. We inspect accessible completed work for visible defects, installation issues and operation of relevant systems, with special attention to kitchens, bathrooms and modified spaces.",
      "Share your agreed scope of works in advance. The inspection records observed condition and workmanship; concealed construction and design compliance may require a separate specialist review.",
    ],
    ideal: [
      "Owners completing a refurbishment",
      "New kitchens and bathrooms",
      "Landlords preparing renovated properties",
    ],
  }),
  service({
    slug: "services/residential/pre-listing",
    name: "Residential pre-listing inspection",
    shortName: "Home seller checks",
    category: "Residential",
    eyebrow: "GET YOUR HOME READY FOR VIEWINGS",
    headline: "A more prepared home. A clearer sale.",
    description:
      "Residential pre-listing inspections in Dubai. Help prepare an apartment, townhouse or villa for sale with an independent condition report.",
    image: "inspection/residential-pre-listing",
    imageAlt: "Inspector checking a kitchen tap and sink before a home is listed for sale",
    intro:
      "Prioritise the issues in your home before prospective buyers arrive.",
    paragraphs: [
      "This homeowner-focused assessment checks the everyday condition of your apartment or villa. We document visible repair needs, finish defects and operation issues so you can make a practical preparation list before listing.",
      "Use the findings to brief tradespeople and your selling agent. The report can help distinguish a small presentation fix from an issue that warrants further investigation before marketing.",
    ],
    ideal: [
      "Families selling their home",
      "Owners prioritising pre-sale repairs",
      "Homes being prepared for photography",
    ],
  }),
  service({
    slug: "services/residential/pre-move-in",
    name: "Pre-move-in inspection",
    shortName: "Pre-move-in",
    category: "Residential",
    eyebrow: "SETTLE IN WITH FEWER SURPRISES",
    headline: "Before the boxes. Check the basics.",
    description:
      "Pre-move-in inspections for UAE homes. Document visible condition and check accessible AC, plumbing, electrical fittings and everyday fixtures.",
    image: "inspection/pre-move-in",
    imageAlt: "Inspector testing an electrical socket in a vacant home before move-in",
    intro:
      "Know the condition of your next home before furniture and boxes make access harder.",
    paragraphs: [
      "A pre-move-in visit checks the accessible property while it is easier to inspect. We look at AC operation, wet areas, electrical fittings, doors, windows, cabinetry and visible finish defects.",
      "The photographic record can help you discuss repairs and existing damage with the landlord, agent or owner. It supports a practical move-in checklist and does not replace your tenancy agreement or inventory.",
    ],
    ideal: [
      "Tenants starting a new lease",
      "Families moving into a purchased home",
      "Landlords preparing a vacant unit",
    ],
  }),
  service({
    slug: "services/residential/pre-purchase",
    name: "Residential pre-purchase inspection",
    shortName: "Home buyer checks",
    category: "Residential",
    eyebrow: "A HOME IS A PERSONAL DECISION",
    headline: "Picture your life here. Understand the property first.",
    description:
      "Residential pre-purchase inspections for home buyers in Dubai and the UAE. Review apartment and villa condition before completing a purchase.",
    image: "inspection/residential-pre-purchase",
    imageAlt: "Inspector discussing recorded home inspection findings with a prospective buyer",
    intro:
      "A home buyer's inspection focused on the rooms, fittings and systems your family will rely on.",
    paragraphs: [
      "We inspect the accessible condition of a potential home and explain the findings in clear language. An assessment of bathrooms, kitchens, AC, windows, finishes and visible external features helps you look beyond staging and fresh paint.",
      "Share concerns from your viewing so the inspector can give them particular attention. If an issue needs intrusive investigation or a specialist, the report identifies that next step rather than guessing at concealed conditions.",
    ],
    ideal: [
      "Families purchasing a home",
      "First-time property buyers",
      "Buyers comparing apartments and villas",
    ],
  }),
  service({
    slug: "services/secondary-inspection",
    name: "Secondary & re-inspection",
    shortName: "Re-inspection",
    category: "Residential",
    eyebrow: "CLOSE THE LOOP",
    headline: "Reported. Repaired. Rechecked.",
    description:
      "Secondary property inspections in Dubai and the UAE. Revisit a snagging report and check the condition of developer or contractor rectification work.",
    image: "inspection/secondary-inspection",
    imageAlt: "Inspector rechecking a repaired skirting joint against the original report",
    intro:
      "The original snag list is only useful if the important fixes are followed through.",
    paragraphs: [
      "After your developer or contractor confirms rectification, Halo can revisit the recorded defects. We compare accessible items against the initial report and document their current condition.",
      "A secondary inspection focuses on the agreed original items. New concerns or additional areas can be discussed before the visit so you receive the right scope rather than an assumed full new inspection.",
    ],
    ideal: [
      "Owners checking developer fixes",
      "Clients following up a handover report",
      "Completed contractor rectification",
    ],
    checks: [
      {
        title: "Original snag list",
        text: "Review of the previously recorded findings and their locations.",
      },
      {
        title: "Rectification quality",
        text: "Accessible workmanship and operation checks relevant to the original defect.",
      },
      {
        title: "Outstanding items",
        text: "Clear documentation of issues that remain or need further attention.",
      },
      {
        title: "Updated record",
        text: "Photographic evidence of current condition to support the next discussion.",
      },
    ],
  }),
  service({
    slug: "services/residential/snagging-defect",
    name: "Snagging & defect detection",
    shortName: "Snagging & defects",
    category: "Residential",
    eyebrow: "LOOK A LITTLE CLOSER",
    headline: "Find the small things. Flag the important things.",
    description:
      "Property snagging and defect detection in Dubai and the UAE. Identify visible defects and signs of moisture, installation and workmanship problems.",
    image: "inspection/snagging-defect",
    imageAlt: "Inspector documenting a chipped floor tile during a snagging inspection",
    intro:
      "A systematic inspection turns scattered concerns into a clear, actionable record.",
    paragraphs: [
      "We combine careful visual inspection with appropriate non-invasive tools to check accessible areas of your property. Finish defects, moisture indicators, poorly operating fittings and accessible system concerns are recorded room by room.",
      "Each finding includes its location and relevant photographs. Where an observation points to a concealed problem, the recommendation can include further investigation rather than a claim that an inaccessible area has been checked.",
    ],
    ideal: [
      "New homes with visible snags",
      "Occupied properties with recurring problems",
      "Owners needing an independent defect record",
    ],
  }),
  service({
    slug: "services/commercial/commercial-inspection",
    name: "Commercial property inspection",
    shortName: "Commercial spaces",
    category: "Commercial",
    eyebrow: "CONFIDENCE FOR YOUR NEXT BUSINESS MOVE",
    headline: "A better space for your business starts here.",
    description:
      "Commercial property inspections in Dubai and the UAE. Independent condition assessments of offices, retail units and accessible building services.",
    image: "commercial",
    imageAlt: "Property inspector checking fixtures in an unfurnished commercial office",
    intro:
      "Understand the condition of a commercial space before committing to it or putting it into operation.",
    paragraphs: [
      "Halo assesses accessible commercial interiors, finishes, fittings and relevant building services within an agreed scope. The inspection can support a lease decision, an acquisition or a handover of an office or retail unit.",
      "Share the intended use, fit-out condition and building access requirements when requesting your quote. Specialist systems, statutory approvals and intrusive testing require specific arrangements beyond a general condition inspection.",
    ],
    ideal: [
      "Office and retail tenants",
      "Commercial investors",
      "Businesses receiving a fitted-out unit",
    ],
  }),
  service({
    slug: "services/hotel",
    name: "Hotel property inspection",
    shortName: "Hotels",
    category: "Commercial",
    eyebrow: "EVERY ROOM SHAPES THE EXPERIENCE",
    headline: "Guest-ready begins with the details.",
    description:
      "Hotel inspection and snagging services in the UAE. Agreed assessments of guest rooms, finishes, fixtures and accessible services before opening or refurbishment handover.",
    image: "inspection/hotel",
    imageAlt: "Inspector checking shower fittings in a hotel guest bathroom",
    intro:
      "A repeatable inspection approach for the spaces your guests experience.",
    paragraphs: [
      "Hotel inspections can cover agreed guest rooms, bathrooms, corridors and accessible public-area finishes. We record workmanship, fixture operation and relevant visible condition concerns in an organised report.",
      "For occupied properties, the visit is planned around room access and operations. The inspection scope should identify any specialist systems or compliance assessments that need separate technical appointments.",
    ],
    ideal: [
      "Hotel refurbishment handovers",
      "Operators preparing rooms for opening",
      "Owners reviewing repeated defects",
    ],
  }),
  service({
    slug: "services/developer",
    name: "Developer inspection services",
    shortName: "Developers",
    category: "Commercial",
    eyebrow: "A MORE ORGANISED HANDOVER",
    headline: "Turn a punch list into a better handover.",
    description:
      "Developer snagging and inspection services in Dubai and the UAE. Structured defect reporting for apartments, villas and multi-unit handover programmes.",
    image: "inspection/developer",
    imageAlt: "Inspection engineers recording defects in a newly completed apartment",
    intro:
      "Independent checks that help your team see the work still to be completed.",
    paragraphs: [
      "We work to an agreed unit schedule and inspection scope for developers managing property delivery. Room-by-room reports provide a consistent record of accessible defects and workmanship issues across the inspected units.",
      "Agree access, utilities, report format and rectification milestones before the programme starts. Follow-up inspections can then record the current condition of previously identified defects.",
    ],
    ideal: [
      "Multi-unit residential handovers",
      "Developers planning quality reviews",
      "Teams coordinating contractor rectification",
    ],
  }),
  service({
    slug: "services/commercial/maintenance",
    name: "Commercial maintenance inspection",
    shortName: "Maintenance",
    category: "Commercial",
    eyebrow: "PLAN MAINTENANCE WITH A CLEARER PICTURE",
    headline: "Spot the issues. Set the priorities.",
    description:
      "Commercial maintenance inspections in the UAE. Condition assessments that help owners and managers prioritise accessible defects and planned maintenance.",
    image: "inspection/commercial-maintenance",
    imageAlt: "Inspector checking accessible pipe insulation in a commercial plant room",
    intro:
      "Make your maintenance decisions with a current record of the property's condition.",
    paragraphs: [
      "A maintenance inspection reviews accessible finishes, fittings and relevant systems in an existing commercial property. The findings help managers organise repair discussions and identify issues that deserve specialist attention.",
      "This is a defined condition assessment, not a substitute for routine servicing, mandatory safety certification or continuous facilities monitoring. We agree the areas and systems before visiting.",
    ],
    ideal: [
      "Property managers planning repairs",
      "Owners reviewing occupied assets",
      "Facilities teams investigating recurring issues",
    ],
  }),
];

export type Location = {
  slug: string;
  name: string;
  region: "Dubai" | "Other emirates";
  headline: string;
  description: string;
  intro: string;
  details: string[];
  focus: string[];
  nearby: string[];
  image: string;
};
export const locations: Location[] = [
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    region: "Dubai",
    headline: "A closer look at your Marina home.",
    description:
      "Property inspection and apartment snagging in Dubai Marina. Independent handover, pre-purchase and re-inspection services from Halo.",
    intro:
      "Apartment living in Dubai Marina puts comfort, glazing and well-performing cooling systems at the centre of everyday life.",
    details: [
      "Our Dubai Marina inspections give particular attention to accessible balcony details, window and door seals, bathrooms, fitted kitchens and AC performance alongside the room-by-room finish checks.",
      "Coordinate unit access and any required contractor permissions with building management before the visit. For resale properties, ensure electricity and water are connected so more functional checks can be completed.",
    ],
    focus: [
      "Apartment and penthouse handovers",
      "Balcony doors, glazing and seals",
      "AC, drainage and wet-area checks",
    ],
    nearby: ["jbr", "jlt", "palm-jumeirah"],
    image: "dubai",
  },
  {
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    region: "Dubai",
    headline: "High expectations. Careful inspections.",
    description:
      "Property inspections and snagging in Downtown Dubai. Handover and resale apartment assessments with clear photographic reports.",
    intro:
      "From a new apartment handover to a resale purchase, an independent inspection helps you understand a Downtown property beyond the view.",
    details: [
      "We review accessible finishes, cabinetry, glazing, bathrooms and building-service outlets in your unit. The report records observed defects with their locations so your developer or seller can discuss them clearly.",
      "Downtown buildings may have their own access and visitor-registration arrangements. Share the property details and handover date early so Halo can plan the visit around those requirements.",
    ],
    focus: [
      "High-rise apartment finishes",
      "Kitchens, bathrooms and cabinetry",
      "Developer snag lists and re-inspections",
    ],
    nearby: ["business-bay", "dubai-marina", "jumeirah"],
    image: "dubai",
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    region: "Dubai",
    headline: "Exceptional surroundings. Essential checks.",
    description:
      "Property inspection and snagging on Palm Jumeirah. Independent condition assessments for apartments and villas before purchase or handover.",
    intro:
      "Palm Jumeirah properties range from waterfront apartments to large villas, and the inspection scope should reflect the property itself.",
    details: [
      "Apartment assessments focus on the accessible unit; villa inspections can also cover agreed terraces and external areas. Window seals, balcony details and visible signs of moisture receive attention alongside the full interior checklist.",
      "For larger homes, discuss pools, specialist installations and access to service areas at quotation stage. We explain where a separate specialist review is needed.",
    ],
    focus: [
      "Apartment and villa condition",
      "Glazing, seals and moisture indicators",
      "Agreed terrace and external-area checks",
    ],
    nearby: ["dubai-marina", "jbr", "jumeirah"],
    image: "villa",
  },
  {
    slug: "business-bay",
    name: "Business Bay",
    region: "Dubai",
    headline: "Your next home or business space, understood.",
    description:
      "Property inspections in Business Bay, Dubai. Apartment snagging, resale assessments and commercial handover checks by Halo.",
    intro:
      "Business Bay combines residential towers with commercial spaces. We adapt the assessment to how your property will be used.",
    details: [
      "For apartments, we check the accessible rooms, fittings and services. For an office or retail unit, the scope is agreed around its fit-out condition, installed systems and access arrangements.",
      "A clear defect record supports discussions with a developer, landlord or seller. Building-wide systems and compliance approvals sit outside a general unit inspection unless specifically agreed.",
    ],
    focus: [
      "Residential tower handovers",
      "Office and fitted-unit condition",
      "AC operation and installation finishes",
    ],
    nearby: ["downtown-dubai", "jumeirah", "dubai-marina"],
    image: "commercial",
  },
  {
    slug: "jbr",
    name: "Jumeirah Beach Residence",
    region: "Dubai",
    headline: "Beachside living. A clearer property picture.",
    description:
      "Apartment inspections and property snagging in JBR, Dubai. Pre-purchase, handover and pre-move-in condition reports.",
    intro:
      "For a JBR apartment, the everyday details matter just as much as the setting: cooling, water flow, windows and fitted finishes.",
    details: [
      "Halo inspects the accessible apartment interior, private balcony and relevant service outlets. We document visible defects, fixture operation and signs that need further investigation.",
      "Before the appointment, arrange building access and check that utilities are available. If the unit is occupied, let the team know about furniture or access restrictions.",
    ],
    focus: [
      "Apartment resale assessments",
      "Balcony and window condition",
      "Pre-move-in photographic records",
    ],
    nearby: ["dubai-marina", "jlt", "palm-jumeirah"],
    image: "apartment",
  },
  {
    slug: "emirates-hills",
    name: "Emirates Hills",
    region: "Dubai",
    headline: "Every space deserves the same attention.",
    description:
      "Villa inspections in Emirates Hills, Dubai. Independent pre-purchase and condition assessments of interiors and agreed accessible external areas.",
    intro:
      "Large villas call for a carefully defined inspection scope, allowing enough time for interiors, accessible external areas and installed systems.",
    details: [
      "We inspect your villa room by room and record finish defects, fixture operation and visible condition concerns. External features, terraces and service areas are included according to the agreed access and scope.",
      "Share information about specialist equipment and property additions when requesting a quote. Pools and complex systems may need separate specialist appointments.",
    ],
    focus: [
      "Large villa pre-purchase checks",
      "Accessible terraces and external features",
      "Property-specific inspection planning",
    ],
    nearby: ["the-meadows", "the-springs", "dubai-hills"],
    image: "villa",
  },
  {
    slug: "jumeirah",
    name: "Jumeirah",
    region: "Dubai",
    headline: "Old character. New confidence.",
    description:
      "Property inspections in Jumeirah, Dubai. Villa condition assessments, renovation checks and pre-purchase inspection services.",
    intro:
      "Jumeirah's established homes and renovated properties benefit from an inspection that considers both visible condition and completed alterations.",
    details: [
      "Alongside the interior checklist, we look for visible maintenance concerns and moisture indicators in accessible areas. Renovated kitchens, bathrooms and fitted joinery can receive particular attention when relevant to the agreed scope.",
      "For older villas, the report may recommend further investigation of an observed issue. A non-invasive inspection cannot establish the condition of concealed construction or inaccessible services.",
    ],
    focus: [
      "Established villa condition",
      "Post-renovation workmanship",
      "Visible moisture and maintenance concerns",
    ],
    nearby: ["palm-jumeirah", "downtown-dubai", "business-bay"],
    image: "villa",
  },
  {
    slug: "arabian-ranches",
    name: "Arabian Ranches",
    region: "Dubai",
    headline: "A family home, checked with care.",
    description:
      "Villa and townhouse inspections in Arabian Ranches, Dubai. Pre-purchase, handover, DLP and maintenance condition checks.",
    intro:
      "Whether you are buying an established villa or receiving a new home, a clear condition report helps you plan your next step.",
    details: [
      "Our Arabian Ranches inspections cover accessible interiors and agreed external areas, including relevant garden and terrace features. We check finish condition, AC operation, doors, windows, plumbing and electrical fittings.",
      "Let Halo know about alterations, extensions and recent refurbishment so the visit can account for the property's current layout.",
    ],
    focus: [
      "Villas and townhouse assessments",
      "Garden and terrace observations",
      "AC and wet-area checks",
    ],
    nearby: ["dubai-hills", "the-meadows", "the-springs"],
    image: "villa",
  },
  {
    slug: "dubai-hills",
    name: "Dubai Hills Estate",
    region: "Dubai",
    headline: "Your next chapter, properly checked.",
    description:
      "Property inspections and snagging in Dubai Hills Estate. Apartment and villa handover, pre-purchase and DLP checks.",
    intro:
      "Dubai Hills Estate includes apartments, townhouses and villas. Each needs a scope matched to its layout and handover stage.",
    details: [
      "Halo checks accessible finishes and systems and prepares a photographic snag list. For new homes, the report helps organise developer rectification; for resale properties, it supports an informed condition review.",
      "If your defects liability deadline is approaching, share the relevant date when booking. Allow time to review the findings and raise them with the developer.",
    ],
    focus: [
      "New-build handover snagging",
      "Apartment and villa checks",
      "DLP and rectification follow-ups",
    ],
    nearby: ["arabian-ranches", "emirates-hills", "the-meadows"],
    image: "hero-property",
  },
  {
    slug: "jlt",
    name: "Jumeirah Lake Towers",
    region: "Dubai",
    headline: "Apartment or office. Start with the condition.",
    description:
      "Property inspections in JLT, Dubai. Apartment snagging and commercial-unit condition assessments with independent reports.",
    intro:
      "JLT's mix of residential and office towers makes clear unit-level inspection scope especially useful.",
    details: [
      "For a residential unit, we check rooms, fixtures, accessible service outlets and private balcony details. For commercial units, the visit is planned around the existing fit-out and the agreed accessible systems.",
      "Ask the tower's management about inspector registration and visitor access before the appointment. Shared plant and common areas are separate from an individual unit inspection.",
    ],
    focus: [
      "Apartment pre-purchase inspections",
      "Commercial-unit handovers",
      "Tower access and unit-level scope",
    ],
    nearby: ["dubai-marina", "jbr", "the-springs"],
    image: "commercial",
  },
  {
    slug: "the-meadows",
    name: "The Meadows",
    region: "Dubai",
    headline: "See your villa's condition more clearly.",
    description:
      "Villa inspections in The Meadows, Dubai. Independent pre-purchase, pre-listing and maintenance condition reports.",
    intro:
      "Established villas need a careful look at their present condition, particularly where maintenance or refurbishment has changed the property.",
    details: [
      "We assess accessible finishes, fittings, AC and wet areas, alongside agreed external features. The photographic report helps you prioritise visible issues and discuss repairs with the right contractor.",
      "Share any recurring leaks, cooling concerns or previous alterations before the visit. These observations help the inspector focus the assessment while explaining its non-invasive limits.",
    ],
    focus: [
      "Established villa maintenance",
      "Resale buyer and seller checks",
      "Refurbishment and visible defects",
    ],
    nearby: ["the-springs", "emirates-hills", "arabian-ranches"],
    image: "villa",
  },
  {
    slug: "the-springs",
    name: "The Springs",
    region: "Dubai",
    headline: "Small details make a home work better.",
    description:
      "Villa and townhouse inspections in The Springs, Dubai. Pre-purchase, pre-move-in and renovation assessment services.",
    intro:
      "Before moving into a Springs home, an independent assessment can help identify the repairs and condition concerns worth addressing first.",
    details: [
      "We check accessible interiors, fitted storage, bathrooms, kitchens and relevant external areas. Functional observations cover available AC, plumbing, doors, windows and electrical fittings.",
      "If the home has been renovated, provide details of the work so the scope can give appropriate attention to changed areas and installation quality.",
    ],
    focus: [
      "Townhouse and villa condition",
      "Move-in repair priorities",
      "Renovation workmanship reviews",
    ],
    nearby: ["the-meadows", "jlt", "emirates-hills"],
    image: "apartment",
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    region: "Other emirates",
    headline: "Independent inspection. Across Abu Dhabi.",
    description:
      "Property inspections and snagging in Abu Dhabi. Halo provides agreed handover, pre-purchase and commercial condition assessments.",
    intro:
      "Halo offers property inspection appointments in Abu Dhabi, with the visit planned around your property type, location and access requirements.",
    details: [
      "Choose a new-build handover inspection, a resale condition assessment or an agreed commercial scope. We inspect accessible finishes and systems and provide a clear photographic defect report.",
      "Share the exact location and intended date when requesting a quote. The team will confirm travel arrangements, access requirements, scope and availability before booking.",
    ],
    focus: [
      "Apartment and villa handovers",
      "Resale property condition",
      "Commercial scope by arrangement",
    ],
    nearby: ["dubai-marina", "sharjah", "ajman"],
    image: "dubai",
  },
  {
    slug: "sharjah",
    name: "Sharjah",
    region: "Other emirates",
    headline: "A clearer view of your Sharjah property.",
    description:
      "Property inspection and snagging in Sharjah. Independent apartment, villa and commercial condition reports from Halo.",
    intro:
      "From a new apartment to an established villa, our Sharjah appointments are planned around the accessible property and the reason for your inspection.",
    details: [
      "The assessment checks visible workmanship, fixtures and available services, with a report that records the identified defects and recommendations. Handover, resale and move-in scopes are available by arrangement.",
      "Confirm the building's visitor requirements and utility availability in advance. Share your location so Halo can confirm the appointment and quote.",
    ],
    focus: [
      "Residential handover checks",
      "Villa and apartment condition",
      "Move-in and resale assessments",
    ],
    nearby: ["ajman", "umm-al-quwain", "dubai-marina"],
    image: "apartment",
  },
  {
    slug: "ajman",
    name: "Ajman",
    region: "Other emirates",
    headline: "Know your property before your next step.",
    description:
      "Property inspections and snagging in Ajman. Handover and resale condition assessments for apartments and villas.",
    intro:
      "An Ajman property inspection gives you an independent record of the accessible condition before handover, purchase or moving in.",
    details: [
      "Halo checks relevant finishes, doors, windows, plumbing, AC and electrical fittings in an agreed scope. The report organises defects with photos and locations for a practical follow-up conversation.",
      "Tell the team about your property size, exact location and access arrangements so they can confirm the fee and visit date.",
    ],
    focus: [
      "Apartment and villa snagging",
      "Resale buyer checks",
      "Practical photographic reporting",
    ],
    nearby: ["sharjah", "umm-al-quwain", "ras-al-khaimah"],
    image: "hero-property",
  },
  {
    slug: "fujairah",
    name: "Fujairah",
    region: "Other emirates",
    headline: "Your Fujairah property, independently assessed.",
    description:
      "Property inspection services in Fujairah. Agreed residential and commercial condition checks with photographic defect reporting.",
    intro:
      "Arrange an independent condition assessment in Fujairah with a scope matched to your property and access arrangements.",
    details: [
      "We review accessible finishes, fixtures and available systems. Residential and agreed commercial visits can support handover preparation, purchase decisions or maintenance planning.",
      "For appointments outside Dubai, confirm your exact location and required date early. Halo will agree travel, access and any property-specific requirements before booking.",
    ],
    focus: [
      "Residential condition assessments",
      "Commercial inspection by agreement",
      "Location-specific visit planning",
    ],
    nearby: ["ras-al-khaimah", "sharjah", "ajman"],
    image: "villa",
  },
  {
    slug: "ras-al-khaimah",
    name: "Ras Al Khaimah",
    region: "Other emirates",
    headline: "From handover to home. With a clearer picture.",
    description:
      "Property inspections and snagging in Ras Al Khaimah. Apartment, villa and agreed commercial condition checks from Halo.",
    intro:
      "For a Ras Al Khaimah handover or resale property, an inspection helps you understand visible condition and available systems before proceeding.",
    details: [
      "The visit follows an agreed scope covering accessible rooms, finishes and relevant fittings. Villa external areas and commercial features should be discussed before the appointment.",
      "Provide the property location, size and handover notice if applicable. The team will confirm visit arrangements and any access limitations at quotation stage.",
    ],
    focus: [
      "Apartment and villa handovers",
      "Accessible exterior observations",
      "Resale and commercial condition",
    ],
    nearby: ["umm-al-quwain", "fujairah", "ajman"],
    image: "villa",
  },
  {
    slug: "umm-al-quwain",
    name: "Umm Al Quwain",
    region: "Other emirates",
    headline: "Careful checks for your next property decision.",
    description:
      "Property inspections in Umm Al Quwain. Residential snagging, pre-purchase and agreed commercial condition assessments.",
    intro:
      "Halo arranges inspection visits in Umm Al Quwain for owners and buyers who need a practical, independent record of property condition.",
    details: [
      "Your agreed inspection can review accessible workmanship, fittings and available services in a home or commercial property. The report documents findings and recommends appropriate next steps.",
      "Share your exact address, property size and required date. Confirmed scope, travel arrangements and access requirements are provided before you book.",
    ],
    focus: [
      "Home handover and snagging",
      "Pre-purchase condition checks",
      "Commercial visits by arrangement",
    ],
    nearby: ["ajman", "sharjah", "ras-al-khaimah"],
    image: "apartment",
  },
];

export const generalFAQs: FAQ[] = [
  {
    question: "What is property snagging?",
    answer:
      "Snagging is a systematic check for visible defects, incomplete work and installation problems in a property. It is commonly arranged before a new-build handover, but can also help after renovation. Halo records findings in a photographic report so you can discuss rectification.",
  },
  {
    question: "What does Halo check during an inspection?",
    answer:
      "The agreed scope covers accessible finishes, doors, windows, joinery, bathrooms, kitchens, electrical fittings, plumbing and air conditioning. Appropriate tools can help assess airflow, temperatures and moisture indicators. The report explains areas that could not be accessed or tested.",
  },
  {
    question: "How much does a property inspection cost?",
    answer:
      "The fee depends on property type, floor area, location and inspection scope. Share these details through our quote form or WhatsApp. Halo confirms the fee and availability before you commit, and any re-inspection or specialist work is agreed separately.",
  },
  {
    question: "How long does an inspection take?",
    answer:
      "Timing depends on the size, layout, condition and access available. Larger villas and commercial properties can need more time than apartments. Halo confirms a suitable inspection window when the scope is agreed.",
  },
  {
    question: "When will I receive my report?",
    answer:
      "Halo confirms the report turnaround for your property before you book. Share any handover or purchase deadline when requesting your quote.",
  },
  {
    question: "Do you inspect properties outside Dubai?",
    answer:
      "Yes. Halo offers inspections across the seven UAE emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, Ras Al Khaimah and Umm Al Quwain. Share the exact location so the team can confirm travel, availability and pricing.",
  },
  {
    question: "Can I attend the inspection?",
    answer:
      "You can discuss attending with the team when booking. Developer or building access rules may apply. If you cannot attend, the photographic report provides a record of the findings for you to review remotely.",
  },
  {
    question: "Can you check whether the developer fixed the snags?",
    answer:
      "Yes. A secondary inspection can revisit the original snag list and record the current condition of the listed items. It is a separate agreed service, so confirm scope and cost before booking.",
  },
  {
    question: "Can you inspect a property with no electricity or water?",
    answer:
      "A visual inspection can still identify some finish and workmanship issues, but functional checks of AC, sockets, water flow and drainage will be limited. Tell Halo before booking so these limitations can be explained and the visit planned appropriately.",
  },
  {
    question: "Does an inspection guarantee that a property has no defects?",
    answer:
      "An inspection is a non-invasive assessment of accessible areas at the time of the visit. Concealed defects, inaccessible areas and changing conditions may not be identified. Your report records the scope and limitations, and recommends further specialist investigation where appropriate.",
  },
];

export const partnerships = [
  {
    slug: "developers",
    name: "Developers",
    title: "A better handover is built together.",
    description:
      "Inspection and snagging partnerships for UAE developers. Coordinate independent unit checks, defect reports and rectification follow-ups.",
    intro:
      "Bring a consistent independent inspection approach to your property delivery programme.",
    items: [
      {
        title: "Agree the programme",
        text: "Define the units, access arrangements, utility readiness and inspection milestones before visits begin.",
      },
      {
        title: "Create a consistent defect record",
        text: "Room-by-room photographic reports make the recorded issues easier for delivery teams to locate and discuss.",
      },
      {
        title: "Check the rectification",
        text: "Agreed follow-up visits document the current condition of the original snag items.",
      },
    ],
    service: "services/developer",
    image: "inspector",
  },
  {
    slug: "property-managers",
    name: "Property managers",
    title: "See the condition. Plan the care.",
    description:
      "Property inspection partnerships for UAE property managers. Independent condition checks for portfolios, move-ins and maintenance planning.",
    intro:
      "Support the decisions behind a well-managed portfolio with a current record of property condition.",
    items: [
      {
        title: "Plan property access",
        text: "Coordinate visits around vacancies, tenant appointments and operational requirements.",
      },
      {
        title: "Prioritise observed issues",
        text: "Use the photographic findings to brief maintenance teams and identify concerns needing specialist attention.",
      },
      {
        title: "Keep a clearer record",
        text: "Agreed inspections at handover, move-in or maintenance milestones document condition over time.",
      },
    ],
    service: "services/commercial/maintenance",
    image: "commercial",
  },
  {
    slug: "real-estate-agents",
    name: "Real estate agents",
    title: "Help your clients move with confidence.",
    description:
      "Property inspection partnerships for UAE real estate agents. Independent pre-purchase and pre-listing checks for buyers and sellers.",
    intro:
      "Give clients access to an independent condition assessment at the right moment in their property journey.",
    items: [
      {
        title: "A clearer buyer decision",
        text: "Pre-purchase reports help clients understand visible defects and the next questions to ask.",
      },
      {
        title: "A more prepared listing",
        text: "Seller inspections provide a practical starting point for repairs before marketing.",
      },
      {
        title: "Straightforward coordination",
        text: "Agree access with the owner and coordinate the inspection around your client's transaction timetable.",
      },
    ],
    service: "services/pre-purchase",
    image: "apartment",
  },
];

export const mainPages = [
  "/",
  "/services",
  "/quote",
  "/contact",
  "/about",
  "/faq",
  "/privacy-policy",
  "/terms-of-service",
  "/locations",
  "/company/certifications",
  "/inspection-tools",
];
export const allPaths = [
  ...projectPaths,
  ...mainPages,
  ...services.map((s) => `/${s.slug}`),
  ...locations.map((l) => `/locations/${l.slug}`),
  ...partnerships.map((p) => `/partnerships/${p.slug}`),
];
export const legacyRedirects: Record<string, string> = legacyRedirectMap;

export function pageInfo(path: string): { title: string; description: string } {
  const project = projects.find((p) => `/projects/${p.slug}` === path);
  if (project) return {
    title: `${project.title} | ${project.category.replace(/\b[a-z]/g, (c) => c.toUpperCase())} Project | Halo`,
    description: `Explore Halo’s inspection at ${project.title}. ${project.description} View selected photographs${project.videos.length ? " and the project film" : " from the visit"}.`,
  };
  const s = services.find((s) => `/${s.slug}` === path);
  if (s)
    return {
      title: s.seoTitle ?? `${s.name} in Dubai & UAE | Halo`,
      description: s.description,
    };
  const l = locations.find((l) => `/locations/${l.slug}` === path);
  if (l)
    return {
      title: `Property Inspection & Snagging in ${l.name} | Halo`,
      description: l.description,
    };
  const p = partnerships.find((p) => `/partnerships/${p.slug}` === path);
  if (p)
    return {
      title: `Inspection Partnerships for ${p.name} | Halo`,
      description: p.description,
    };
  const info: Record<string, { title: string; description: string }> = {
    "/projects": {
      title: "Property Inspection Projects in Dubai | Halo",
      description: "Explore Halo property inspection projects across Dubai. View selected photographs and project films from Palm Jumeirah, Nad Al Sheba, Mudon and more.",
    },
    "/": {
      title: "Property Inspection & Snagging in Dubai, UAE | Halo",
      description:
        "Independent property inspection and snagging in Dubai and across the UAE. Certified engineers, 300+ checks and clear photographic reports. Get a Halo quote.",
    },
    "/services": {
      title: "Property Inspection & Snagging Services in Dubai | Halo",
      description:
        "Explore Halo's UAE property inspection services: handover snagging, pre-purchase, villa, apartment, DLP, renovation and commercial inspections.",
    },
    "/quote": {
      title: "Get a Property Inspection Quote in Dubai & UAE | Halo",
      description:
        "Request a tailored Halo property inspection quote. Share your property type, size, location and inspection needs through WhatsApp or email.",
    },
    "/contact": {
      title: "Contact Halo Property Inspection | Dubai & UAE",
      description:
        "Speak with Halo Property Inspection in Dubai. Call +971 50 514 3610, email info@haloinspection.ae or send your inspection enquiry on WhatsApp.",
    },
    "/about": {
      title: "About Halo Property Inspection | Independent UAE Inspectors",
      description:
        "Meet Halo Property Inspection by Halo Shield LLC. Independent property snagging and condition assessments for UAE homeowners, buyers and businesses.",
    },
    "/faq": {
      title: "Property Inspection & Snagging FAQs | Halo Dubai",
      description:
        "Answers about property snagging in Dubai: inspection scope, pricing, report turnaround, utilities, access, re-inspections and UAE service coverage.",
    },
    "/locations": {
      title: "Property Inspection Locations Across Dubai & UAE | Halo",
      description:
        "Find Halo property inspection and snagging services across Dubai communities and all seven UAE emirates. Explore coverage and request a quote.",
    },
    "/company/certifications": {
      title: "Licensing & Certifications | Halo Property Inspection",
      description:
        "Explore Halo's inspection credentials, DED licensing, RERA approval and InterNACHI certification. Ask our team for current credential documentation.",
    },
    "/inspection-tools": {
      title: "Property Inspection Tools & Equipment | Halo Dubai",
      description:
        "Explore Halo's property inspection equipment: moisture meters, endoscope cameras, airflow instruments, electrical testers and digital photographic reporting.",
    },
    "/privacy-policy": {
      title: "Privacy Policy | Halo Property Inspection",
      description:
        "How Halo Property Inspection handles your enquiry details, property information, communication preferences and website privacy.",
    },
    "/terms-of-service": {
      title: "Terms of Service | Halo Property Inspection",
      description:
        "Read the website and inspection enquiry terms for Halo Property Inspection: agreed scope, access, limitations, quotes and external communication services.",
    },
  };
  return info[path] || info["/"];
}
