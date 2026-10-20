/** ICFS site services — Pull Out Test (POT) and Installation only */

export const SERVICE_SECTORS = [
  "Structural fixing",
  "Industrial plant",
  "Infrastructure",
  "Commercial building",
];

export const SERVICES = [
  {
    slug: "pull-out-test",
    title: "Pull Out Test (POT)",
    short:
      "On-site pull-out testing for chemical anchors, mechanical anchors, and rebars — calibrated equipment, clear reports, tested with you on site.",
    hero: "Prove the hold. Test on site. Get a co-signed report.",
    image: "/images/banners/mechanical-anchors.png",
    gallery: [
      "/images/banners/mechanical-anchors.png",
      "/images/banners/chemical-mortars.png",
      "/images/news/exhibition.png",
      "/images/banners/design-software.png",
    ],
    highlights: ["Up to 75 tons", "Dia 8–40 mm", "On-site report"],
    overview:
      "Pull-out tests measure anchor strength under tensile load for mechanical anchors, chemical anchors, and rebars. ICFS runs tests from diameter 8 mm to 40 mm, with capacity up to 75 tons on site. Hydraulic equipment applies tension to extract the rebar or stud so you can see how the fixing performs. Tests happen at your site, with you or your consultant present. Trained staff handle the work for accuracy and safety. You decide how many anchors to test and the target load. After the test, a detailed report is co-signed by your team and ICFS. Reports cover anchor performance and base-material suitability. We use calibrated gauges and equipment. Pull-out testing confirms anchoring quality and whether the substrate can take the planned load.",
    capabilities: [
      "On-site pull-out testing for chemical and mechanical anchors",
      "Rebar pull testing from Ø 8 mm to Ø 40 mm",
      "Capacity up to 75 tons depending on application",
      "Calibrated gauges and hydraulic test equipment",
      "Tests conducted with customer / consultant present",
      "Co-signed detailed test reports with result data",
    ],
    applications: [
      "Validate chemical anchor installations",
      "Check mechanical wedge and through-bolt hold",
      "Confirm rebar embedment strength",
      "Qualify substrate for design loads",
      "Sites across India and neighbouring countries",
    ],
    equipment: {
      model: "IPT-30-Y",
      name: "Pull Out Test Unit — 30 Ton",
      maxForce: "30 tons",
      rebarSizes: "Ø 8–16 mm and Ø 20–38 mm",
      description:
        "The rebar under full test is clamped by a gripper unit with a pair of tapered jaws and hardened serration on the gripping surfaces. The tapered jaws slide in a housing on an inverted hollow jack of 30-ton capacity. When the jack is pressurised with a high-pressure hand pump, the jaws grip the rebar and tension the bar. Load is read on a load-calibrated pressure gauge. Gripper units come in two sizes: IPT 10–16 mm and IPT 20–38 mm.",
      kit: [
        "30-ton centre-hole jack",
        "Hand pump unit and load-calibrated pressure gauge assembly",
        "Rebar puller jaw assembly (10–16 mm) in steel carry box",
        "Rebar puller jaw assembly (20–38 mm) in steel carry box",
      ],
      note: "All equipment is packed in steel carry boxes.",
    },
    comparison: {
      title: "Pull-out testing range by product type",
      rows: [
        {
          product: "Chemical Anchor Stud (CAS) / Rebar",
          light: "6–16 mm (up to ~3.5 ton class)",
          heavy: "8–40 mm (up to ~60 ton class)",
        },
        {
          product: "Indo Wedge Anchor (IWA)",
          light: "6–16 mm",
          heavy: "8–30 mm",
        },
        {
          product: "Through Bolt Anchor (TBA)",
          light: "6–16 mm",
          heavy: "8–24 mm",
        },
        {
          product: "Lite Wedge Anchor (LWA)",
          light: "6–16 mm",
          heavy: "8–24 mm",
        },
        {
          product: "Drop In Anchor (DIA)",
          light: "6–16 mm",
          heavy: "8–24 mm",
        },
        {
          product: "Indo Prime Bolt Zone (IPBZ)",
          light: "6–16 mm",
          heavy: "8–20 mm",
        },
        {
          product: "Indo Concrete Screw (ICS)",
          light: "8–16 mm",
          heavy: "8–12 mm",
        },
        {
          product: "Nylon Frame Plug (NFP)",
          light: "10 mm / 8–12 mm",
          heavy: "5–8 mm",
        },
        {
          product: "Nylon Hammer Fixing Plug (NHF)",
          light: "5–8 mm",
          heavy: "—",
        },
      ],
    },
    procedure: [
      "Fit the correct adaptor to the tester (for example a bolt tester adaptor).",
      "The tester ships with a locking adaptor in the body. Remove it with a 3 mm ball driver to fit other adaptors. When refitting, engage it fully before tightening.",
      "Thread the bolt tester adaptor in until fully engaged, using a quarter turn for position.",
      "Align the adaptor, tester, and fixing. Place the tester so the gauge is easy to read.",
      "Adjust the three legs so they sit on the base material and the load-spreading bridge is level (use the bubble levels).",
      "Set the gauge to zero. Hold the tester and load the fastener by turning the operating handle clockwise.",
      "Hold the fastener securely while it is under load. Watch the displacement scale for signs of movement.",
      "Increase load to the required test load. Hold and check for falling readings that would mean movement or failure.",
      "Record a satisfactory result. Release load by turning the handle anti-clockwise and return the jaw to the start position.",
      "Remove the tester and adaptor. In tight spaces, use the integrated nut with a 22 mm ratchet after removing the handles.",
    ],
    relatedTech: [],
    relatedProjects: [],
  },
  {
    slug: "installation",
    title: "Installation Services",
    short:
      "Professional on-site installation of chemical and mechanical anchors — correct depth, cleaning, and fixing for reliable hold.",
    hero: "Right product. Correct install. Hold you can trust.",
    image: "/images/banners/chemical-mortars.png",
    gallery: [
      "/images/banners/chemical-mortars.png",
      "/images/banners/mechanical-anchors.png",
      "/images/categories/studs.png",
      "/images/news/exhibition.png",
    ],
    highlights: ["Chemical & mechanical", "Site crews", "Spec-led"],
    overview:
      "ICFS installation services cover chemical and mechanical anchor fixing on site. Our teams follow product data sheets for hole diameter, depth, cleaning, and cure times — so the fastener performs as specified. We support new fixing, retrofit work, and project supply with installation where you need trained hands on the tools.",
    capabilities: [
      "Chemical mortar and capsule installation",
      "Mechanical wedge, through-bolt, and drop-in fixing",
      "Hole drilling, cleaning, and correct embedment",
      "Rebar and stud setting to drawing",
      "Coordination with pull-out testing when required",
      "Site support across India",
    ],
    applications: [
      "Structural connections and façade fixing",
      "Machinery bases and equipment anchors",
      "Retrofit and strengthening work",
      "Frame and rail fixing",
      "Industrial and commercial projects",
    ],
    relatedTech: [],
    relatedProjects: [],
  },
];

export const TECHNOLOGIES = [];

export const PROJECTS = [];

export const CERTIFICATES = [
  "Calibrated pull-out equipment",
  "On-site co-signed test reports",
  "Trained POT personnel",
  "India-wide service coverage",
];

export const CUSTOMERS = [
  "Structural consultants",
  "Contractors",
  "Industrial plants",
  "Infrastructure teams",
];

export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug) || null;
}

export function getTechnology(slug) {
  return TECHNOLOGIES.find((t) => t.slug === slug) || null;
}

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export function getRelatedProjects(service) {
  if (!service?.relatedProjects?.length) return [];
  return service.relatedProjects.map(getProject).filter(Boolean);
}

export function getRelatedTechnologies(service) {
  if (!service?.relatedTech?.length) return [];
  return service.relatedTech.map(getTechnology).filter(Boolean);
}
