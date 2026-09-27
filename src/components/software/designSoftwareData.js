export const SOFTWARE_PRODUCTS = [
  {
    slug: "icfs-chemical-anchor-rebar-design",
    code: "01",
    eyebrow: "Mobile & tablet",
    title: "ICFS Chemical Anchor / Rebar Design",
    shortTitle: "Chemical Anchor / Rebar Design",
    tagline: "Size chemical anchors, cartridge volume, and hole depth — on site or at the desk.",
    short:
      "Select configuration, loads, and concrete dimensions. The app suggests ICFS chemical anchor size, embedment, mortar volume, and cartridge quantity.",
    hero:
      "Built for site engineers and applicators who need a fast, reliable chemical-anchor answer — including spacing, edge distance, and design-load factors used in everyday fixing.",
    overview:
      "ICFS Chemical Anchor / Rebar Design helps you move from job conditions to a clear product recommendation. Enter the fixing layout, design loads, and concrete geometry; the app returns the suggested ICFS chemical anchor, required hole depth, mortar volume, and how many cartridges you need. Results respect design load, spacing, and edge-distance factors so the suggestion is practical for site work — not just a catalogue pick.",
    image: "/images/software/rebar-design.png",
    platforms: ["Android", "iOS"],
    category: "Mobile design suite",
    highlights: [
      "Chemical anchor sizing",
      "Cartridge quantity",
      "Rebar / stud layouts",
      "On-site friendly UI",
    ],
    downloadLabel: "Download software",
    downloadNote: "Available for Android and iOS. Request access or the latest build from our team.",
    stats: [
      { value: "3", label: "Built-in modules" },
      { value: "ETA", label: "Aligned product data" },
      { value: "2", label: "Mobile platforms" },
    ],
    outputs: [
      "Suggested ICFS chemical anchor size for the entered layout",
      "Required depth of hole in concrete",
      "Volume of ICFS chemical mortar for the fixing",
      "Quantity of ICFS chemical cartridges required",
      "Checks informed by design load, spacing, and edge distance",
    ],
    workflow: [
      {
        step: "01",
        title: "Define the fixing",
        text: "Choose stud / rebar count, base material, and concrete dimensions for the connection.",
      },
      {
        step: "02",
        title: "Enter loads & spacing",
        text: "Add design loads and layout constraints — including edge distance and spacing between anchors.",
      },
      {
        step: "03",
        title: "Review the suggestion",
        text: "Get recommended chemical type, embedment, mortar volume, and cartridge count in one pass.",
      },
      {
        step: "04",
        title: "Refine if needed",
        text: "Use Design Resistance when non-load-bearing layers change the embedment path.",
      },
    ],
    modules: [
      {
        id: "anchor-design",
        title: "Anchor Design",
        image: "/images/software/module-anchor-design.png",
        summary:
          "Selection of chemical anchors and the volume / quantity of ICFS chemical cartridges required.",
        detail:
          "Configure the desired layout, loads, and concrete dimensions for fixing the anchor(s). Based on these inputs the app suggests size of the ICFS chemical anchor, required depth of hole in concrete, volume of ICFS chemical required, and quantity of ICFS chemical cartridges. Suggestions account for design load, spacing, and edge-distance factors.",
        bullets: [
          "Multi-stud / rebar configurations",
          "Concrete geometry and edge constraints",
          "Mortar volume and cartridge count",
          "Design-load driven recommendations",
        ],
      },
      {
        id: "design-resistance",
        title: "Design Resistance / Chemical consumption",
        image: "/images/software/module-design-resistance.png",
        summary:
          "Refine ICFS chemical anchor selection for special cases with non-load-bearing layers.",
        detail:
          "When finishes, insulation, or other non-load-bearing layers sit in front of the structural concrete, embedment and consumption change. This module lets you refine the Anchor Design suggestion so chemical volume and effective depth stay honest to the build-up on site.",
        bullets: [
          "Non-load-bearing layer thickness",
          "Adjusted effective embedment",
          "Updated chemical consumption",
          "Safer selection for layered substrates",
        ],
      },
      {
        id: "concrete-cutting",
        title: "Concrete Cutting",
        image: "/images/software/module-concrete-cutting.png",
        summary: "ICFS concrete cutting area / volume calculator for planning site works.",
        detail:
          "Select the type of structure and key dimensions to estimate concrete cutting area and volume — useful when chemical fixing work sits alongside selective demolition or openings.",
        bullets: [
          "Structure-type presets",
          "Area and volume estimates",
          "Quick planning inputs",
          "Pairs with site cutting services",
        ],
      },
    ],
    audience: [
      "Site engineers sizing chemical fixings",
      "Applicators estimating cartridge needs",
      "Consultants validating layout assumptions",
      "Contractors coordinating cutting + anchoring",
    ],
    requirements: [
      "Android 8.0+ or recent iOS",
      "Stable internet for first product sync (optional offline thereafter depending on build)",
      "Basic fixing loads and concrete dimensions available",
    ],
  },
  {
    slug: "chemical-anchor-calculation",
    code: "02",
    eyebrow: "Desktop — IndoExperts",
    title: "Chemical Anchor Calculation Software",
    shortTitle: "Chemical Anchor Calculation",
    tagline: "Desktop IndoExperts suite for chemical-anchor calculation and installation planning.",
    short:
      "Professional chemical-anchor calculation software developed for installation design under the IndoExperts brand.",
    hero:
      "A structured calculation environment for chemical anchors — concrete grade, anchor data, loads, and reinforcement inputs in one workspace, with 3D orientation of the fixing.",
    overview:
      "Chemical Anchor Calculation Software (IndoExperts) is built for engineers who need a fuller calculation pass than a mobile checklist. Define anchor type, concrete properties, design loads (including moments), and reinforcement context, then review the connection visually before you specify product and install depth on drawings.",
    image: "/images/software/anchor-calc.png",
    platforms: ["Windows"],
    category: "Desktop calculation",
    highlights: [
      "Chemical calculation",
      "Load & moment inputs",
      "3D fixing view",
      "Design optimization",
    ],
    downloadLabel: "Download software",
    downloadNote: "Windows installer via IndoExperts. Contact us for the current licensed build.",
    stats: [
      { value: "6", label: "Load components" },
      { value: "3D", label: "Fixing preview" },
      { value: "ETA", label: "Product alignment" },
    ],
    outputs: [
      "Chemical anchor calculation summary for the entered load case",
      "Visual check of base plate / pedestal orientation",
      "Inputs ready for design optimization iterations",
      "Clear separation of concrete, anchor, load, and reinforcement data",
    ],
    workflow: [
      {
        step: "01",
        title: "Set concrete & anchor",
        text: "Choose concrete grade, member type, and chemical anchor parameters for the job.",
      },
      {
        step: "02",
        title: "Apply loads",
        text: "Enter tension, shear, and moment components relevant to the base plate or fixture.",
      },
      {
        step: "03",
        title: "Review in 3D",
        text: "Confirm geometry and anchor layout against the on-screen model before issuing.",
      },
      {
        step: "04",
        title: "Optimize & export",
        text: "Iterate with design optimization tools and capture results for documentation.",
      },
    ],
    modules: [
      {
        id: "anchor-inputs",
        title: "Anchor & concrete inputs",
        image: "/images/software/module-anchor-design.png",
        summary: "Structured fields for chemical anchor size, embedment, and concrete grade.",
        detail:
          "Keep product and substrate data in one panel so calculation assumptions stay transparent to reviewers and site teams.",
        bullets: [
          "Concrete grade selection",
          "Anchor diameter and embedment",
          "Base material notes",
          "Traceable input set",
        ],
      },
      {
        id: "load-case",
        title: "Load case builder",
        image: "/images/software/module-design-resistance.png",
        summary: "Fx, Fy, Fz and moment components for realistic fixing checks.",
        detail:
          "Model the governing load case — including combined actions — so chemical anchors are judged on how the fixture actually behaves.",
        bullets: [
          "Force and moment inputs",
          "Combined action awareness",
          "Iteration-friendly edits",
          "Clear load labelling",
        ],
      },
      {
        id: "visual-check",
        title: "3D visual check",
        image: "/images/software/anchor-calc.png",
        summary: "See pedestal, plate, and anchor group orientation while you calculate.",
        detail:
          "A spatial preview reduces layout mistakes before drawings are issued or cartridges are ordered.",
        bullets: [
          "Pedestal / plate preview",
          "Anchor group orientation",
          "Axis reference",
          "Faster design reviews",
        ],
      },
    ],
    audience: [
      "Structural and façade engineers",
      "Design offices specifying ICFS chemicals",
      "EPC teams validating base-plate fixings",
      "Technical sales preparing calculation packs",
    ],
    requirements: [
      "Windows 10/11 (64-bit recommended)",
      "Display suitable for dual-panel engineering UI",
      "Valid IndoExperts licence / access key from IndoSpark",
    ],
  },
  {
    slug: "indoexpert-professional",
    code: "03",
    eyebrow: "Desktop — IndoExperts",
    title: "IndoExpert Professional Anchor Design Software",
    shortTitle: "IndoExpert Professional",
    tagline: "Mechanical anchor calculation for installation — IndoExperts professional desktop suite.",
    short:
      "Professional mechanical-anchor calculation software developed for installation design under the IndoExperts brand.",
    hero:
      "Focused on mechanical anchors — wedge, heavy-duty, and related systems — with the same IndoExperts calculation discipline used on chemical projects.",
    overview:
      "IndoExpert Professional Anchor Design Software supports mechanical anchor calculation for installation. Use it when the connection calls for expansion or other mechanical systems rather than chemical mortars: define loads and substrate conditions, review the recommended mechanical solution, and align site installation with the calculation.",
    image: "/images/software/indoexpert.png",
    platforms: ["Windows"],
    category: "Desktop — mechanical",
    highlights: [
      "Mechanical anchors",
      "Installation design",
      "IndoExperts engine",
      "Professional reports",
    ],
    downloadLabel: "Download software",
    downloadNote: "Windows installer for IndoExpert Professional. Request the current package from our team.",
    stats: [
      { value: "Mech.", label: "Anchor focus" },
      { value: "1", label: "Desktop suite" },
      { value: "ICFS", label: "Product library" },
    ],
    outputs: [
      "Mechanical anchor calculation for the selected installation case",
      "Guidance aligned to ICFS mechanical product families",
      "Inputs suitable for drawings and method statements",
      "Consistent IndoExperts workflow alongside the chemical suite",
    ],
    workflow: [
      {
        step: "01",
        title: "Choose mechanical system",
        text: "Start from the mechanical anchor family appropriate to concrete grade and fixture type.",
      },
      {
        step: "02",
        title: "Enter design actions",
        text: "Capture tension, shear, and geometry so edge and spacing rules can be respected.",
      },
      {
        step: "03",
        title: "Confirm install data",
        text: "Lock hole diameter, embedment, and torque / setting notes for the site pack.",
      },
      {
        step: "04",
        title: "Issue to site",
        text: "Hand over calculation outputs with ICFS product references for procurement.",
      },
    ],
    modules: [
      {
        id: "mechanical-sizing",
        title: "Mechanical sizing",
        image: "/images/software/module-anchor-design.png",
        summary: "Size wedge and heavy-duty mechanical anchors against design actions.",
        detail:
          "Match mechanical anchors to concrete and load conditions without jumping between spreadsheets and catalogues.",
        bullets: [
          "Wedge / heavy-duty paths",
          "Embedment and hole diameter",
          "Edge and spacing awareness",
          "ICFS product alignment",
        ],
      },
      {
        id: "install-pack",
        title: "Installation pack",
        image: "/images/software/module-concrete-cutting.png",
        summary: "Turn calculation into clear install parameters for crews.",
        detail:
          "Give site teams drill diameter, depth, and setting guidance that matches the approved calculation.",
        bullets: [
          "Drill diameter & depth",
          "Setting / torque notes",
          "Fixture orientation cues",
          "Fewer site queries",
        ],
      },
      {
        id: "library",
        title: "ICFS mechanical library",
        image: "/images/software/indoexpert.png",
        summary: "Stay inside the ICFS mechanical range used on IndoSpark projects.",
        detail:
          "Recommendations stay tied to products your procurement and training teams already know.",
        bullets: [
          "Familiar ICFS SKUs",
          "Consistent naming",
          "Easier stock planning",
          "Aligned with training",
        ],
      },
    ],
    audience: [
      "Engineers specifying mechanical wedges",
      "MEP and equipment fixing designers",
      "Site managers issuing drill sheets",
      "Distributors supporting contractor design",
    ],
    requirements: [
      "Windows 10/11 (64-bit recommended)",
      "IndoExperts Professional licence",
      "Basic fixing loads and concrete data",
    ],
  },
];

export function getSoftware(slug) {
  return SOFTWARE_PRODUCTS.find((p) => p.slug === slug) || null;
}

export const SOFTWARE_PLATFORMS = [
  { label: "Android", text: "Chemical / Rebar Design app" },
  { label: "iOS", text: "Chemical / Rebar Design app" },
  { label: "Windows", text: "IndoExperts desktop suites" },
];
