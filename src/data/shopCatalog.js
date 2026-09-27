/** Shared ICFS product catalog — home shop + /shop page */

export const SHOP_CATEGORIES = [
  {
    id: "all",
    label: "All products",
    href: "/shop",
    image: "/images/products/chemical.png",
  },
  {
    id: "mortars",
    label: "Chemical Mortars",
    href: "/shop?category=mortars",
    image: "/images/categories/mortars.png",
  },
  {
    id: "guns",
    label: "Chemical Guns",
    href: "/shop?category=guns",
    image: "/images/categories/guns.png",
  },
  {
    id: "capsules",
    label: "Chemical Capsules",
    href: "/shop?category=capsules",
    image: "/images/categories/capsules.png",
  },
  {
    id: "studs",
    label: "Anchor Studs",
    href: "/shop?category=studs",
    image: "/images/categories/studs.png",
  },
  {
    id: "mechanical",
    label: "Mechanical Anchors",
    href: "/shop?category=mechanical",
    image: "/images/categories/mechanical.png",
  },
  {
    id: "foam",
    label: "PU Foam",
    href: "/shop?category=foam",
    image: "/images/categories/foam.png",
  },
  {
    id: "nylon",
    label: "Nylon Frame Anchors",
    href: "/shop?category=nylon",
    image: "/images/categories/nylon.png",
  },
];

/** Home “Shop by category” circles — excludes “All” */
export const CATEGORY_SHORTCUTS = SHOP_CATEGORIES.filter((c) => c.id !== "all");

const RAW = {
  mortars: [
    { id: "m1", name: "ICFS CM350P Chemical Mortar", image: "/chemical_mortars.png", price: 1890, tag: "ETA" },
    { id: "m2", name: "ICFS CM350 VESF Mortar", image: "/images/categories/mortars.png", price: 2150, tag: "Tropical" },
    { id: "m3", name: "ICFS Rebaring Mortar Pro", image: "/chemical_mortars.png", price: 2480, tag: "Pro" },
    { id: "m4", name: "ICFS Structural Mortar Pack", image: "/images/categories/mortars.png", price: 1720 },
    { id: "m5", name: "ICFS Fast Cure Mortar", image: "/chemical_mortars.png", price: 2050, tag: "Fast cure" },
    { id: "m6", name: "ICFS Heavy Duty Mortar", image: "/images/categories/mortars.png", price: 2690 },
    { id: "m7", name: "ICFS Winter Grade Mortar", image: "/chemical_mortars.png", price: 2320 },
    { id: "m8", name: "ICFS Site Pack Mortar", image: "/images/categories/mortars.png", price: 1980 },
  ],
  guns: [
    { id: "g1", name: "ICFS Dispenser Gun Standard", image: "/images/categories/guns.png", price: 3450 },
    { id: "g2", name: "ICFS Rebaring Caulking Gun", image: "/images/products/guns.png", price: 3890 },
    { id: "g3", name: "ICFS Dual Cartridge Gun", image: "/images/categories/guns.png", price: 4220 },
    { id: "g4", name: "ICFS Heavy Duty Dispenser", image: "/images/products/guns.png", price: 4650 },
    { id: "g5", name: "ICFS Compact Site Gun", image: "/images/categories/guns.png", price: 2980 },
    { id: "g6", name: "ICFS Pro Applicator Gun", image: "/images/products/guns.png", price: 5120, tag: "Pro" },
    { id: "g7", name: "ICFS Mortar Gun Kit", image: "/images/categories/guns.png", price: 5490 },
    { id: "g8", name: "ICFS Trigger Control Gun", image: "/images/products/guns.png", price: 3760 },
  ],
  capsules: [
    { id: "c1", name: "ICFS SuperCap Capsule", image: "/chemical-capsule-supercap.png", price: 420, tag: "Best seller" },
    { id: "c2", name: "ICFS Chemical Capsule M10", image: "/images/categories/capsules.png", price: 380 },
    { id: "c3", name: "ICFS Capsule Pack M12", image: "/chemical-capsule-supercap.png", price: 460 },
    { id: "c4", name: "ICFS Capsule Pack M16", image: "/images/categories/capsules.png", price: 520 },
    { id: "c5", name: "ICFS Glass Capsule Set", image: "/chemical-capsule-supercap.png", price: 610 },
    { id: "c6", name: "ICFS Capsule Bulk Box", image: "/images/categories/capsules.png", price: 2890 },
    { id: "c7", name: "ICFS Quick Set Capsule", image: "/chemical-capsule-supercap.png", price: 445 },
    { id: "c8", name: "ICFS Capsule Starter Kit", image: "/images/categories/capsules.png", price: 1250 },
  ],
  studs: [
    { id: "s1", name: "ICFS Anchor Stud M10", image: "/images/categories/studs.png", price: 95 },
    { id: "s2", name: "ICFS Anchor Stud M12", image: "/anchors_product.png", price: 120 },
    { id: "s3", name: "ICFS Stud + Nut + Washer", image: "/images/categories/studs.png", price: 145 },
    { id: "s4", name: "ICFS Stainless Stud Set", image: "/anchors_product.png", price: 210, tag: "SS" },
    { id: "s5", name: "ICFS Anchor Stud M16", image: "/images/categories/studs.png", price: 165 },
    { id: "s6", name: "ICFS Stud Kit 50pcs", image: "/anchors_product.png", price: 3450 },
    { id: "s7", name: "ICFS Long Embed Stud", image: "/images/categories/studs.png", price: 185 },
    { id: "s8", name: "ICFS Site Stud Assortment", image: "/anchors_product.png", price: 2780 },
  ],
  mechanical: [
    { id: "me1", name: "ICFS Wedge Anchor M10", image: "/images/categories/mechanical.png", price: 55 },
    { id: "me2", name: "ICFS Wedge Anchor M12", image: "/images/products/anchors.png", price: 72 },
    { id: "me3", name: "ICFS Expansion Bolt Set", image: "/images/categories/mechanical.png", price: 98 },
    { id: "me4", name: "ICFS Heavy Wedge Anchor", image: "/images/products/anchors.png", price: 125 },
    { id: "me5", name: "ICFS Mechanical Anchor Kit", image: "/images/categories/mechanical.png", price: 1890 },
    { id: "me6", name: "ICFS Through Bolt Anchor", image: "/images/products/anchors.png", price: 88 },
    { id: "me7", name: "ICFS Sleeve Anchor Pack", image: "/images/categories/mechanical.png", price: 640 },
    { id: "me8", name: "ICFS Pro Mechanical Bundle", image: "/images/products/anchors.png", price: 2450, tag: "Bundle" },
  ],
  foam: [
    { id: "f1", name: "ICFS 1K PU Foam Spray", image: "/pu-foam.png", price: 380 },
    { id: "f2", name: "ICFS Gap Filling Foam", image: "/images/categories/foam.png", price: 420 },
    { id: "f3", name: "ICFS Assembly PU Foam", image: "/pu-foam_3d.png", price: 450 },
    { id: "f4", name: "ICFS Crack Fill Foam", image: "/images/products/foam.png", price: 395 },
    { id: "f5", name: "ICFS PU Foam Twin Pack", image: "/pu-foam.png", price: 720 },
    { id: "f6", name: "ICFS Fire Rated Foam", image: "/images/categories/foam.png", price: 580, tag: "Fire rated" },
    { id: "f7", name: "ICFS Winter PU Foam", image: "/pu-foam_3d.png", price: 490 },
    { id: "f8", name: "ICFS Foam Site Carton", image: "/images/products/foam.png", price: 3960 },
  ],
  nylon: [
    { id: "n1", name: "ICFS Nylon Frame Anchor", image: "/images/categories/nylon.png", price: 28 },
    { id: "n2", name: "ICFS Nylon Plug Pack", image: "/images/categories/nylon.png", price: 180 },
    { id: "n3", name: "ICFS Frame Fixing Kit", image: "/images/categories/nylon.png", price: 340 },
    { id: "n4", name: "ICFS Door Frame Anchors", image: "/images/categories/nylon.png", price: 260 },
    { id: "n5", name: "ICFS Window Frame Set", image: "/images/categories/nylon.png", price: 295 },
    { id: "n6", name: "ICFS Nylon Anchor Assortment", image: "/images/categories/nylon.png", price: 520 },
    { id: "n7", name: "ICFS Long Nylon Anchor", image: "/images/categories/nylon.png", price: 42 },
    { id: "n8", name: "ICFS Nylon Bulk Box", image: "/images/categories/nylon.png", price: 1480 },
  ],
};

function formatInr(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

function toSlug(name, id) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base}-${id}`;
}

const CATEGORY_DETAIL = {
  mortars: {
    blurb:
      "ETA-backed chemical injection mortar for structural rebaring and heavy-duty fastening in concrete.",
    long:
      "ICFS chemical mortars are formulated for reliable bond strength across cracked and non-cracked concrete. Suitable for rebaring, threaded rod fixing, and structural upgrades on live sites — with controlled curing windows and site-ready cartridge formats.",
    specs: [
      { label: "System", value: "Injectable chemical mortar" },
      { label: "Base", value: "Epoxy / Vinylester / Polyester grades" },
      { label: "Approvals", value: "ETA international grades (select SKUs)" },
      { label: "Use with", value: "Threaded rods, rebar, studs" },
      { label: "Pack format", value: "Cartridge / site pack" },
      { label: "Storage", value: "Cool, dry — follow label" },
    ],
    applications: [
      "Structural rebaring",
      "Heavy equipment base fixing",
      "Facade and steel connections",
      "Retrofit and strengthening",
    ],
  },
  guns: {
    blurb: "Dispenser guns engineered for clean, controlled extrusion of ICFS chemical cartridges on site.",
    long:
      "Professional applicator guns for chemical mortars and dual-cartridge systems. Built for site durability with trigger control options from compact tools to heavy-duty dispensers used on rebaring and high-volume fastening jobs.",
    specs: [
      { label: "Type", value: "Manual / dual cartridge dispenser" },
      { label: "Compatibility", value: "ICFS mortar cartridges" },
      { label: "Duty", value: "Site and workshop" },
      { label: "Control", value: "Trigger / ratio (model dependent)" },
      { label: "Maintenance", value: "Clean nozzles after use" },
      { label: "Warranty", value: "Manufacturer terms apply" },
    ],
    applications: [
      "Chemical mortar application",
      "Rebaring crews",
      "High-volume site fastening",
      "Workshop prep and kits",
    ],
  },
  capsules: {
    blurb: "Glass and chemical capsule systems for precise, measured anchoring in concrete.",
    long:
      "ICFS capsules deliver pre-measured resin systems for reliable chemical anchoring. Ideal when you need consistent mix ratios, clean holes, and fast installation of studs and rods across mid-load applications.",
    specs: [
      { label: "Type", value: "Chemical / glass capsule" },
      { label: "Sizes", value: "M10–M16 ranges (SKU dependent)" },
      { label: "Install", value: "Drill → clean → insert → set stud" },
      { label: "Set time", value: "Per product datasheet" },
      { label: "Pack", value: "Single / multipack / bulk" },
      { label: "Best for", value: "Repeatable mid-load fixes" },
    ],
    applications: [
      "Railings and fixtures",
      "Steel base plates",
      "Machinery pads",
      "General construction anchoring",
    ],
  },
  studs: {
    blurb: "Threaded anchor studs and kits matched to ICFS chemical and capsule systems.",
    long:
      "Precision-cut anchor studs with optional nut and washer sets. Available in carbon and stainless options for chemical anchoring, rebaring interfaces, and site kits sized for common diameters.",
    specs: [
      { label: "Material", value: "Carbon steel / stainless (SKU)" },
      { label: "Thread", value: "Metric (M10–M16 typical)" },
      { label: "Finish", value: "Zinc / SS grades" },
      { label: "Includes", value: "Stud / kit components as listed" },
      { label: "Pair with", value: "ICFS mortar or capsules" },
      { label: "QA", value: "Dimensional site checks recommended" },
    ],
    applications: [
      "Chemical anchor assemblies",
      "Base plate fixing",
      "Structural connections",
      "Site assortment kits",
    ],
  },
  mechanical: {
    blurb: "Wedge, sleeve, and through-bolt mechanical anchors for fast, torque-controlled fixing.",
    long:
      "ICFS mechanical anchors cover wedge, sleeve, and through-bolt patterns for medium to heavy duty fixing where chemical systems are not required. Designed for predictable installation and load paths in concrete and masonry.",
    specs: [
      { label: "Type", value: "Wedge / sleeve / through bolt" },
      { label: "Material", value: "Carbon steel zinc plated" },
      { label: "Install", value: "Drill → clean → set → torque" },
      { label: "Diameter", value: "SKU dependent" },
      { label: "Environment", value: "Interior / protected (SS for exposed)" },
      { label: "Packs", value: "Piece / kit / bundle" },
    ],
    applications: [
      "Steel brackets and frames",
      "HVAC and MEP supports",
      "Machinery fixing",
      "General construction",
    ],
  },
  foam: {
    blurb: "PU foam for filling, sealing, and insulating gaps on construction and fit-out sites.",
    long:
      "ICFS PU foams cover gap filling, assembly, crack sealing, and specialty grades (including fire-rated and winter formulas). Reliable expansion and adhesion for doors, windows, and building envelope detailing.",
    specs: [
      { label: "Type", value: "1K polyurethane foam" },
      { label: "Use", value: "Fill / seal / insulate" },
      { label: "Grades", value: "Standard / fire / winter (SKU)" },
      { label: "Application", value: "Gun or straw (SKU)" },
      { label: "Cure", value: "Follow can instructions" },
      { label: "Storage", value: "Upright, away from heat" },
    ],
    applications: [
      "Door and window frames",
      "Gap and cavity fill",
      "Crack sealing",
      "Site cartons for crews",
    ],
  },
  nylon: {
    blurb: "Nylon frame anchors and plugs for reliable light-to-medium fixing in masonry and concrete.",
    long:
      "Nylon frame anchors deliver dependable fixing for doors, windows, and light fixtures. Available as singles, kits, and bulk boxes for contractors who need consistent frame fastening at scale.",
    specs: [
      { label: "Material", value: "High-grade nylon" },
      { label: "Use", value: "Frame and light-medium fixing" },
      { label: "Substrate", value: "Concrete / masonry / block" },
      { label: "Lengths", value: "Standard and long (SKU)" },
      { label: "Pack", value: "Piece / kit / bulk box" },
      { label: "Install", value: "Drill → insert → screw" },
    ],
    applications: [
      "Door frames",
      "Window frames",
      "Fixtures and fittings",
      "Contractor bulk supply",
    ],
  },
};

const EXTRA_GALLERY = {
  mortars: ["/chemical_mortars.png", "/images/categories/mortars.png", "/images/banners/chemical-mortars.png"],
  guns: ["/images/categories/guns.png", "/images/products/guns.png"],
  capsules: ["/chemical-capsule-supercap.png", "/images/categories/capsules.png"],
  studs: ["/images/categories/studs.png", "/anchors_product.png"],
  mechanical: ["/images/categories/mechanical.png", "/images/products/anchors.png", "/images/banners/mechanical-anchors.png"],
  foam: ["/pu-foam.png", "/pu-foam_3d.png", "/images/categories/foam.png"],
  nylon: ["/images/categories/nylon.png"],
};

/** Flat catalog with category + PDP metadata */
export const ALL_PRODUCTS = Object.entries(RAW).flatMap(([categoryId, items]) => {
  const cat = SHOP_CATEGORIES.find((c) => c.id === categoryId);
  const meta = CATEGORY_DETAIL[categoryId] || CATEGORY_DETAIL.mortars;
  const extras = EXTRA_GALLERY[categoryId] || [];

  return items.map((p) => {
    const slug = toSlug(p.name, p.id);
    const gallery = [p.image, ...extras.filter((src) => src !== p.image)].slice(0, 4);
    return {
      ...p,
      slug,
      href: `/shop/${slug}`,
      categoryId,
      categoryLabel: cat?.label || categoryId,
      priceLabel: formatInr(p.price),
      sku: `ICFS-${p.id.toUpperCase()}`,
      inStock: true,
      shortDescription: meta.blurb,
      description: `${p.name} — ${meta.long}`,
      specs: meta.specs,
      applications: meta.applications,
      gallery,
    };
  });
});

export function getProductBySlug(slug) {
  return ALL_PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getProductById(id) {
  return ALL_PRODUCTS.find((p) => p.id === id) || null;
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  return ALL_PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, limit);
}

/** Products grouped by category id (for home ProductShop) */
export const PRODUCTS_BY_CATEGORY = Object.fromEntries(
  Object.keys(RAW).map((id) => [
    id,
    ALL_PRODUCTS.filter((p) => p.categoryId === id).map((p) => ({
      id: p.id,
      slug: p.slug,
      href: p.href,
      name: p.name,
      image: p.image,
      price: p.priceLabel,
      priceLabel: p.priceLabel,
      tag: p.tag,
      categoryLabel: p.categoryLabel,
    })),
  ])
);

/** Tabs used on home ProductShop (no “All”) */
export const HOME_SHOP_TABS = SHOP_CATEGORIES.filter((c) => c.id !== "all").map((c) => ({
  id: c.id,
  label: c.label,
  href: c.href,
}));

export const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to high" },
  { id: "price-desc", label: "Price: High to low" },
  { id: "name-asc", label: "Name: A–Z" },
  { id: "name-desc", label: "Name: Z–A" },
];

export function filterShopProducts({ categoryId = "all", query = "", sort = "featured", taggedOnly = false }) {
  let list = ALL_PRODUCTS;

  if (categoryId && categoryId !== "all") {
    list = list.filter((p) => p.categoryId === categoryId);
  }

  const q = query.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.tag && p.tag.toLowerCase().includes(q)) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  if (taggedOnly) {
    list = list.filter((p) => Boolean(p.tag));
  }

  const sorted = [...list];
  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return sorted;
}
