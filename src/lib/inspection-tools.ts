export type InspectionTool = {
  id: string;
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  focus: string;
  description: string;
  checks: string[];
  context: string;
};

export const inspectionTools: InspectionTool[] = [
  {
    id: "moisture-meter",
    name: "Moisture meter",
    category: "Moisture & finishes",
    image: "/images/tools/moisture-meter.webp",
    imageAlt: "Inspector taking a wall reading with a moisture meter",
    focus: "Clues to dampness",
    description: "Moisture readings help us investigate areas of concern in walls, floors and ceilings, including places where dampness is not obvious during a viewing.",
    checks: ["Wall and ceiling readings", "Wet areas and visible staining", "Areas needing further investigation"],
    context: "Readings are considered alongside the surface material and visible condition.",
  },
  {
    id: "endoscope-camera",
    name: "Endoscope inspection camera",
    category: "Concealed areas",
    image: "/images/tools/endoscope-inspection-camera.webp",
    imageAlt: "Inspector using an endoscope camera to examine an accessible ceiling opening",
    focus: "A view into tight spaces",
    description: "A flexible camera helps us look through available openings into hard-to-reach spaces, recording details that cannot be seen from the room itself.",
    checks: ["Accessible ceiling voids", "Openings behind fixtures", "Ducts and service cavities"],
    context: "Checks depend on existing openings and safe access to the area.",
  },
  {
    id: "tds-tester",
    name: "Handheld TDS tester",
    category: "Water readings",
    image: "/images/tools/handheld-tds-tester.webp",
    imageAlt: "Gloved inspector using a handheld TDS tester in a water sample",
    focus: "Dissolved-solids readings",
    description: "A handheld tester provides an indicative total dissolved solids reading from a water sample, adding a measurement to our observations of the available water supply.",
    checks: ["Accessible water samples", "Indicative dissolved-solids levels", "Readings for further review"],
    context: "A TDS reading alone does not establish drinking-water safety or identify contaminants.",
  },
  {
    id: "anemometer",
    name: "Digital anemometer",
    category: "AC & ventilation",
    image: "/images/tools/digital-anemometer.webp",
    imageAlt: "Inspector holding a digital anemometer at an air-conditioning outlet",
    focus: "Airflow at the outlet",
    description: "An anemometer measures air velocity at accessible vents, helping us assess how an operating AC or ventilation system distributes air around the property.",
    checks: ["Air velocity at supply vents", "Airflow differences between outlets", "Ventilation performance indicators"],
    context: "Measurements require an operating system and accessible outlets.",
  },
  {
    id: "hammer",
    name: "Inspection hammer",
    category: "Moisture & finishes",
    image: "/images/tools/hammer.webp",
    imageAlt: "Small inspection hammer with a black and orange handle",
    focus: "Hollow-sounding finishes",
    description: "Light tapping can help identify hollow-sounding tiles and differences in surface response, giving us another clue to the condition of accessible finishes.",
    checks: ["Hollow-sounding tiles", "Loose finish indicators", "Differences in surface response"],
    context: "Surface observations help flag concerns for assessment by the relevant contractor.",
  },
  {
    id: "torch",
    name: "LED torch",
    category: "Visual checks",
    image: "/images/tools/torch.webp",
    imageAlt: "Black LED inspection torch",
    focus: "Details in low light",
    description: "Focused lighting makes dark corners and uneven finishes easier to examine, helping us document details inside cabinets, service areas and accessible ceiling voids.",
    checks: ["Cabinet interiors", "Accessible service corners", "Wall and ceiling finish details"],
    context: "Lighting supports the visual inspection of accessible areas.",
  },
  {
    id: "humidity-meter",
    name: "Temperature & humidity meter",
    category: "AC & ventilation",
    image: "/images/tools/mini-temperature-humidity-meter.webp",
    imageAlt: "Inspector checking indoor conditions with a compact temperature and humidity meter",
    focus: "Indoor conditions",
    description: "Temperature and relative humidity readings add context to concerns about comfort, ventilation and condensation at the time of the inspection.",
    checks: ["Indoor temperature", "Relative humidity", "Conditions around dampness concerns"],
    context: "Readings describe conditions during the visit and can change with weather and system use.",
  },
  {
    id: "mobile-app",
    name: "Inspection reporting app",
    category: "Reporting",
    image: "/images/tools/mobile-application.webp",
    imageAlt: "Halo photographic inspection report displayed on a laptop, tablet and phone",
    focus: "From finding to report",
    description: "Digital documentation brings photographs, locations and written observations together, turning the inspection into a clear record for your rectification discussions.",
    checks: ["Photographic records", "Defect descriptions and locations", "Organised report preparation"],
    context: "Your report explains the findings, access limitations and recommended next steps.",
  },
  {
    id: "socket-tester",
    name: "Socket tester",
    category: "Electrical checks",
    image: "/images/tools/socket-tester.webp",
    imageAlt: "Gloved inspector checking a wall outlet with a socket tester",
    focus: "Outlet wiring indicators",
    description: "A socket tester screens accessible outlets for certain wiring faults, helping us identify concerns to record for a qualified electrician to assess.",
    checks: ["Socket polarity indicators", "Earth connection indicators", "Detected wiring fault patterns"],
    context: "Socket screening is carried out where power and access allow within the agreed scope.",
  },
  {
    id: "voltage-pen",
    name: "Voltage pen",
    category: "Electrical checks",
    image: "/images/tools/voltage-pen.webp",
    imageAlt: "Blue non-contact voltage detector pen",
    focus: "Live-voltage indications",
    description: "A non-contact detector helps screen for indications of voltage near accessible electrical points, supporting our observations of installation concerns.",
    checks: ["Accessible switch points", "Visible electrical installation concerns", "Indications requiring specialist review"],
    context: "Voltage indications support screening; detailed electrical assessment requires a qualified electrician.",
  },
];
