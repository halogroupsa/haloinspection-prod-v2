export type ProjectImage = { src: string; alt: string; caption: string; aspectRatio: string };
export type Project = {
  /** Public URL slug, ending with the emirate for local search, e.g. "palm-jumeirah-dubai". */
  slug: string;
  /** Folder name for the project's photographs and films. */
  media: string;
  name: string;
  /** Display title with the emirate, e.g. "Palm Jumeirah, Dubai". */
  title: string;
  community: string;
  emirate: string;
  category: string;
  description: string;
  overview: string;
  focus: { title: string; text: string }[];
  images: ProjectImage[];
  /** `mobileSrc` is a lighter 540p cut of the same film for small screens. */
  videos: { src: string; mobileSrc: string; title: string }[];
};

type ProjectContent = Omit<Project, "media" | "title" | "images" | "videos"> & {
  captions: [string, string][];
  films?: string[];
};

const collection: ProjectContent[] = [
  {
    slug: "palm-jumeirah", name: "Palm Jumeirah", community: "Palm Jumeirah", emirate: "Dubai", category: "Villa inspection",
    description: "A waterfront villa, from its light-filled interiors to the details behind the finish.",
    overview: "Waterfront views and expansive interiors make a striking first impression. This visit takes a closer look at the villa’s living spaces, bathrooms and bedrooms, with rooftop services also featured in the project film.",
    focus: [
      { title: "Interior finishes", text: "Stone surfaces, cabinetry and large living spaces." },
      { title: "Windows & outdoor spaces", text: "Full-height glazing, terraces and the waterfront setting." },
      { title: "Building services", text: "A look at the accessible rooftop plant and equipment." },
    ],
    captions: [["The waterfront villa", "Contemporary Palm Jumeirah villa exterior with a pool and terrace"], ["Out to the waterfront", "Shaded Palm Jumeirah terrace overlooking the swimming pool and water"], ["Light-filled living spaces", "Open-plan villa living room with chandeliers and full-height glazing"], ["A closer look at the finishes", "Stone bathroom surfaces and vanity fittings in the Palm Jumeirah villa"], ["Through the private spaces", "Bedroom with twin beds and fitted cabinetry in the Palm Jumeirah villa"]],
    films: ["palm-jumeirah"],
  },
  {
    slug: "jumeirah-new", name: "Jumeirah residence", community: "Jumeirah", emirate: "Dubai", category: "Villa inspection",
    description: "A coastal residence with carefully considered interiors and hands-on attention to the details.",
    overview: "The Jumeirah residence pairs open living spaces with detailed joinery and stone finishes. The film follows the team through balcony glazing, bathroom fittings and interior finishes, while the gallery gives those spaces room to breathe.",
    focus: [{ title: "Living spaces", text: "Open-plan interiors, fitted cabinetry and decorative finishes." }, { title: "Glazing & balcony", text: "Hands-on inspection around the glazed waterfront balcony." }, { title: "Bathrooms & fittings", text: "Close inspection of shower fittings and accessible interior details." }],
    captions: [["A view through the residence", "Bright furnished living room in the Jumeirah residence"], ["Crafted interior details", "Long fitted sideboard and decorative glass wall in the Jumeirah residence"], ["At the balcony", "Halo inspector examining the glass balcony railing at the Jumeirah residence"], ["Checking the shower fittings", "Halo inspector examining overhead shower fittings"], ["Attention to the wall finishes", "Halo inspector checking interior wall details with a handheld instrument"]],
    films: ["jumeirah-new"],
  },
  {
    slug: "mbr", name: "MBR City", community: "MBR City", emirate: "Dubai", category: "Villa inspection",
    description: "A bright, contemporary home examined from the glazing to the kitchen and floor finishes.",
    overview: "At this MBR City home, the team moves through bright living areas, kitchen joinery and accessible plumbing. The selected views show the practical, close-up work that sits behind a property inspection.",
    focus: [{ title: "Doors & windows", text: "Glazed doors and window frames throughout the home." }, { title: "Kitchen & plumbing", text: "Cabinetry, joinery and accessible under-sink connections." }, { title: "Interior surfaces", text: "Ceiling details and close examination of floor finishes." }],
    captions: [["Looking beyond the view", "Halo inspector examining full-height glazed doors in an MBR City home"], ["Kitchen joinery", "Halo inspector checking upper kitchen cabinetry"], ["Above eye level", "Halo inspector examining the ceiling in the MBR City home"], ["At floor level", "Halo inspector examining floor finishes with a torch"], ["Behind the cabinetry", "Halo inspector examining accessible plumbing beneath a kitchen sink"]],
    films: ["mbr"],
  },
  {
    slug: "nad-al-sheba-191", name: "Nad Al Sheba 191", community: "Nad Al Sheba", emirate: "Dubai", category: "Villa inspection",
    description: "Modern villa architecture, with a closer look at the roof, exterior and interior details.",
    overview: "The visit at Nad Al Sheba 191 moves from the villa’s exterior to its roof and interior spaces. The film captures the team examining accessible roof details, exterior surfaces, kitchen finishes and fittings.",
    focus: [{ title: "Roof & exterior", text: "Accessible roof details and external wall surfaces." }, { title: "Kitchen finishes", text: "A collaborative examination of the kitchen surfaces." }, { title: "Interior fittings", text: "Close attention to accessible switches and room details." }],
    captions: [["The villa at Nad Al Sheba", "Contemporary villa facade at Nad Al Sheba 191 against a blue sky"], ["A view from the roof", "Inspection team examining the rooftop at Nad Al Sheba 191"], ["Exterior surfaces", "Inspector checking exterior wall finishes beside a villa fence"], ["Around the kitchen", "Inspection team examining the kitchen island at Nad Al Sheba 191"], ["Interior details", "Halo inspector checking a wall fitting inside the villa"]],
    films: ["nad-al-sheba-191"],
  },
  {
    slug: "mudon", name: "Mudon", community: "Mudon", emirate: "Dubai", category: "Villa inspection",
    description: "From ceiling access to floor finishes, a practical look inside a Mudon home.",
    overview: "This Mudon visit follows the team through the home, with close attention to ceiling access, floor finishes, bathroom details and air-conditioning equipment. Original photographs sit alongside two films from the visit.",
    focus: [{ title: "Ceiling access", text: "A closer look above the visible ceiling finish." }, { title: "Floor & bathroom details", text: "Hands-on examination of tiled surfaces and bathroom fittings." }, { title: "Air conditioning", text: "Inspection activity around the accessible outdoor AC equipment." }],
    captions: [["Arriving with the right tools", "Halo inspection team arriving at the Mudon property with their equipment"], ["Beyond the ceiling finish", "Halo inspector examining an open ceiling access panel in Mudon"], ["The details at floor level", "Halo inspector photographing tile finishes beside a glazed door"], ["Bathroom fittings, up close", "Halo inspector documenting a bathroom fitting with a phone and torch"], ["Checking the AC equipment", "Halo inspection team examining outdoor air-conditioning equipment in Mudon"]],
    films: ["mudon", "mudon-portrait"],
  },
  {
    slug: "nas-gardens-188", name: "NAS Gardens 188", community: "Nad Al Sheba", emirate: "Dubai", category: "Villa inspection",
    description: "A contemporary villa, inspected across its glazing, staircase and interior joinery.",
    overview: "At NAS Gardens 188, the team’s work spans open living spaces, full-height windows and the staircase. The selected imagery captures both the architecture and the close inspection of interior finishes.",
    focus: [{ title: "Windows & living spaces", text: "Full-height glazing and the surrounding interior finishes." }, { title: "Staircase details", text: "Close examination of stone surfaces beside the stair." }, { title: "Joinery & terrace", text: "Fitted wardrobes and inspection activity on the terrace." }],
    captions: [["Entering NAS Gardens 188", "Bright villa entrance and internal doors at NAS Gardens 188"], ["At the full-height windows", "Halo inspector examining living-room glazing at NAS Gardens 188"], ["Stonework beside the stair", "Halo inspector checking a stone surface beside a staircase"], ["The view from the terrace", "Halo inspector examining the terrace railing at NAS Gardens 188"], ["Inside the fitted joinery", "Halo inspector examining interior wardrobe cabinetry"]],
    films: ["nas-gardens-188"],
  },
  {
    slug: "d16", name: "D16 residence", community: "Dubai", emirate: "Dubai", category: "Interior inspection",
    description: "Rich materials and detailed interiors, examined with a careful eye for the finish.",
    overview: "The D16 film follows an inspection through a furnished residence with stone surfaces and detailed joinery. The selected images focus on inspection activity around glazing, cabinetry, electrical fittings and interior finishes.",
    focus: [{ title: "Glazing & finishes", text: "The relationship between full-height windows and interior surfaces." }, { title: "Cabinetry & stone", text: "Close attention to joinery and stone-lined interior spaces." }, { title: "Electrical details", text: "Inspection activity around accessible electrical fittings." }],
    captions: [["A closer look at the glazing", "Inspector examining glazing in the furnished D16 residence"], ["Within the stone finishes", "Inspector examining fittings in a stone-lined interior"], ["Checking the fitted cabinetry", "Inspector checking interior cabinetry with a torch"], ["Accessible electrical fittings", "Inspector examining an electrical distribution board at D16"], ["Through the dressing area", "Inspector examining joinery in the D16 dressing area"]],
    films: ["d16"],
  },
  {
    slug: "nad-al-sheba-april", name: "Nad Al Sheba residence", community: "Nad Al Sheba", emirate: "Dubai", category: "Interior inspection",
    description: "An April visit through a furnished home, from intricate joinery to full-height glazing.",
    overview: "This April visit takes a closer look at a furnished Nad Al Sheba residence. Original photographs show the team examining doors, bedroom finishes, balcony details and living spaces; the accompanying film follows the visit through the home.",
    focus: [{ title: "Doors & joinery", text: "Detailed timber doors and fitted interior cabinetry." }, { title: "Bedroom finishes", text: "Inspection activity around mirrors and decorative wall surfaces." }, { title: "Glazing & living areas", text: "Balcony thresholds, full-height windows and living spaces." }],
    captions: [["Inside the fitted interiors", "Halo inspector examining a dressing area in the Nad Al Sheba residence"], ["Looking closely at the door", "Halo inspector examining timber door details with a torch"], ["Bedroom finishes", "Halo inspector checking a mirror and decorative bedroom wall"], ["At the balcony threshold", "Halo inspector examining the balcony threshold in Nad Al Sheba"], ["A shared look at the details", "Halo inspection team in the residence's bright living space"]],
    films: ["nad-al-sheba-april"],
  },
  {
    slug: "nas-gardens-186", name: "NAS Gardens 186", community: "Nad Al Sheba", emirate: "Dubai", category: "Roof & exterior inspection",
    description: "A focused look at roof surfaces, external finishes and accessible building services.",
    overview: "The NAS Gardens 186 footage concentrates on the practical details of the roof and exterior. It shows the team examining surface finishes, roof edges, equipment enclosures and accessible exterior fittings.",
    focus: [{ title: "Roof surfaces", text: "Hands-on examination of roof finishes and perimeter details." }, { title: "Edges & tile finishes", text: "Close attention to transitions between surfaces." }, { title: "Exterior services", text: "Accessible equipment enclosures and external fittings." }],
    captions: [["The team on the roof", "Halo inspection team examining a rooftop at NAS Gardens 186"], ["Looking at the roof surface", "Halo inspector examining a roof surface finish"], ["At the edge of the finish", "Halo inspector examining tiles beside a gravel-covered roof area"], ["Accessible service enclosures", "Halo inspector examining an exterior equipment enclosure"], ["Exterior fittings", "Halo inspector examining a wall fitting on an exterior terrace"]],
    films: ["nas-gardens-186"],
  },
  {
    slug: "dh139", name: "DH139 residence", community: "Dubai", emirate: "Dubai", category: "Interior inspection",
    description: "A photographic look through a residence defined by stone, light and intricate finishes.",
    overview: "The DH139 photographs document an inspection through a furnished home with double-height living spaces, detailed stonework and a private gym. The gallery brings together the clearest views of the spaces and the inspection activity within them.",
    focus: [{ title: "Living spaces & stonework", text: "Double-height interiors and detailed decorative surfaces." }, { title: "Kitchen & glazing", text: "Fitted kitchen cabinetry and large glazed openings." }, { title: "Fittings & private spaces", text: "Accessible interior controls and the home’s gym." }],
    captions: [["Light, space and stone", "Double-height living space with decorative stonework in the DH139 residence"], ["Checking the kitchen cabinetry", "Inspector examining kitchen cabinetry in the DH139 residence"], ["The detail in the wall finishes", "Inspector examining a circular decorative wall panel"], ["Full-height glazing", "Inspector examining tall glazed panels in the DH139 living area"], ["Interior fittings", "Inspector examining accessible interior fittings near a doorway"], ["Through the private gym", "Inspector examining a surface beside gym equipment in DH139"]],
  },
];

export const projects: Project[] = collection.map(({ slug: media, captions, films = [], ...project }) => ({
  ...project,
  slug: `${media}-${project.emirate.toLowerCase().replace(/\s+/g, "-")}`,
  media,
  title: `${project.name}, ${project.emirate}`,
  images: captions.map(([caption, alt], index) => ({
    src: `/images/projects/${media}/${index === 0 ? "cover" : `gallery-${index}`}.webp`,
    alt, caption,
    aspectRatio: media === "nad-al-sheba-april" && index >= 3 ? "3 / 4" : media === "dh139" || (media === "mudon" && index >= 1 && index <= 3) || (media === "nad-al-sheba-april" && index >= 1) ? "4 / 3" : "16 / 9",
  })),
  videos: films.map((slug, index) => ({ src: `/videos/projects/${slug}.mp4`, mobileSrc: `/videos/projects/${slug}-540.mp4`, title: index === 0 ? "Project film" : "More from the visit" })),
}));

export const projectPaths = ["/projects", ...projects.map((p) => `/projects/${p.slug}`)];
