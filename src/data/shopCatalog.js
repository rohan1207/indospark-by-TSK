/** ICFS product catalog, categories with products inside. Add products one by one. */

const IMG = {
  mortars: "/images/categories/mortars.png",
  guns: "/images/categories/guns.png",
  capsules: "/images/categories/capsules.png",
  studs: "/images/categories/studs.png",
  mechanical: "/images/categories/mechanical.png",
  foam: "/images/categories/foam.png",
  nylon: "/images/categories/nylon.png",
};

const AGNI360_BASE = "/products/chemical-mortars/agni360-cm360p";
const CM350VESF_BASE = "/products/chemical-mortars/cm350vesf";

/** Category definitions (nav, circles, shop filters) */
export const SHOP_CATEGORIES = [
  { id: "all", label: "All products", href: "/shop", image: IMG.mortars },
  {
    id: "mortars",
    label: "Chemical Mortars",
    href: "/shop?category=mortars",
    image: IMG.mortars,
  },
  {
    id: "guns",
    label: "Chemical Guns",
    href: "/shop?category=guns",
    image: IMG.guns,
  },
  {
    id: "capsules",
    label: "Chemical Capsules",
    href: "/shop?category=capsules",
    image: IMG.capsules,
  },
  {
    id: "studs",
    label: "Chemical Anchor Studs",
    href: "/shop?category=studs",
    image: IMG.studs,
  },
  {
    id: "mechanical",
    label: "Mechanical Anchors",
    href: "/shop?category=mechanical",
    image: IMG.mechanical,
  },
  {
    id: "foam",
    label: "PU Foam",
    href: "/shop?category=foam",
    image: IMG.foam,
  },
  {
    id: "nylon",
    label: "Nylon Frame Anchors",
    href: "/shop?category=nylon",
    image: IMG.nylon,
  },
];

export const CATEGORY_SHORTCUTS = SHOP_CATEGORIES.filter((c) => c.id !== "all");

/**
 * Products by category id.
 * Only real products, no dummy SKUs. Add the next product under its category when ready.
 */
const PRODUCTS_BY_CAT = {
  mortars: [
    {
      id: "agni360-cm360p",
      slug: "icfs-agni360-cm360p-polyester-350ml",
      name: "ICFS AGNI360 / CM360P Anchor Bolt Chemical Injection Mortar (Polyester) 350ML",
      shortName: "AGNI360 / CM360P Polyester 350ML",
      sku: "ICFS-AGNI360-CM360P-350",
      tag: "Polyester",
      price: 675,
      compareAtPrice: 1114,
      inStock: true,
      image: `${AGNI360_BASE}/hero.jpg`,
      gallery: [
        `${AGNI360_BASE}/hero.jpg`,
        `${AGNI360_BASE}/product-1.png`,
        `${AGNI360_BASE}/gallery-1.jpg`,
        `${AGNI360_BASE}/gallery-3.jpg`,
        `${AGNI360_BASE}/gallery-5.jpg`,
        `${AGNI360_BASE}/gallery-2.jpg`,
        `${AGNI360_BASE}/gallery-6.jpg`,
        `${AGNI360_BASE}/typical.jpg`,
      ],
      shortDescription:
        "High-performance rapid-curing two-component polyester injection mortar for anchor bolt fixing: 350 ml side-by-side cartridge.",
      description: [
        "The CM360P / AGNI360 is a high performance rapid curing two-component chemical injection anchoring system based on high reactivity unsaturated Polyester resin. The side by side cartridge format comprises of a resin and hardening agent in separated internal compartments that are mixed to the correct ratio when triggered using the required manual dispenser.",
        "The resin is available in grey colour. All features combined make Polyester anchoring resin a versatile and cost effective anchoring system. Polyester CM360P is available in CiC (foil pack), C-CN (co-axial) and S-SN (side-by-side) cartridges.",
      ],
      variant: "350ml side by side cartridge",
      material: "Polyester",
      applications: [
        "Suitable for medium loads in re-baring for non-critical applications",
        "Fast working times for early loading in time-sensitive applications",
        "Use in outdoor environments and anchor bolt fixing",
        "Extremely versatile in masonry, hollow, aerated concrete",
        "Crack and gap-filling repairs in concrete vertical or horizontal",
      ],
      features: [
        "Rapid curing two-component polyester system",
        "Side-by-side cartridge, resin and hardener mixed on dispense",
        "Cost-effective for medium-load anchoring",
        "Grey resin colour for clean site identification",
        "Compatible with ICFS chemical dispenser guns",
      ],
      advantages: [
        "Early loading on time-sensitive jobs",
        "Works in outdoor environments",
        "Versatile across masonry, hollow and aerated concrete",
        "Useful for crack and gap-filling repairs",
      ],
      specs: [
        { label: "Product code", value: "AGNI360 / CM360P" },
        { label: "Material", value: "Polyester" },
        { label: "Variant", value: "350 ml side-by-side cartridge" },
        { label: "System", value: "Two-component chemical injection" },
        { label: "Resin colour", value: "Grey" },
        { label: "Formats", value: "CiC / C-CN / S-SN" },
        { label: "Dispenser", value: "Manual chemical gun (compatible)" },
        { label: "Use", value: "Anchor bolt & rebar fixing" },
      ],
      documents: [
        {
          title: "Product catalogue",
          type: "PDF",
          href: `${AGNI360_BASE}/documents/catalogue.pdf`,
        },
      ],
      loadCharts: [
        { title: "Load chart / technical data", src: `${AGNI360_BASE}/load-chart.jpg` },
        { title: "Technical data (continued)", src: `${AGNI360_BASE}/load-chart-2.jpg` },
      ],
      applicationImage: `${AGNI360_BASE}/applications.jpg`,
      installationImage: `${AGNI360_BASE}/installation.jpg`,
      installationSteps: [
        "Drill the hole to the specified diameter and depth for the stud / rebar.",
        "Clean the hole thoroughly, brush and blow out dust until clear.",
        "Fit the mixing nozzle and dispense a small amount until resin is evenly mixed.",
        "Inject from the bottom of the hole while withdrawing the nozzle.",
        "Insert the stud or rebar with a twisting motion to the required embedment.",
        "Leave undisturbed until the gel / cure time for the site temperature is reached.",
      ],
    },
    {
      id: "cm350vesf",
      slug: "icfs-cm350vesf-vinylester-350ml",
      name: "ICFS CM350VESF Anchor Bolt Chemical Injection Mortar (Vinylester) 350ml",
      shortName: "CM350VESF Vinylester 350ml",
      sku: "ICFS-CM350VESF-350",
      tag: "Vinylester",
      price: 1115,
      compareAtPrice: 1656,
      inStock: true,
      image: `${CM350VESF_BASE}/hero.jpg`,
      gallery: [
        { type: "image", src: `${CM350VESF_BASE}/hero.jpg` },
        { type: "video", src: `${CM350VESF_BASE}/video.mp4`, poster: `${CM350VESF_BASE}/hero.jpg` },
        { type: "image", src: `${CM350VESF_BASE}/gallery-1.jpg` },
        { type: "image", src: `${CM350VESF_BASE}/gallery-2.jpg` },
        { type: "image", src: `${CM350VESF_BASE}/gallery-3.jpg` },
        { type: "image", src: `${CM350VESF_BASE}/gallery-4.jpg` },
        { type: "image", src: `${CM350VESF_BASE}/applications.jpg` },
      ],
      shortDescription:
        "Styrene-free vinylester injection mortar for high-load anchoring in concrete and masonry: 350 ml cartridge with ETA approvals.",
      description: [
        "ICFS CM350VESF is a high-performance styrene-free vinylester chemical injection anchoring system for medium to heavy-duty fixing in concrete and masonry. The dual-component cartridge mixes resin and hardener through the nozzle for consistent bond strength on site.",
        "Engineered for demanding installs, including damp and wet holes, close-to-edge fixing, and outdoor environments: CM350VESF delivers fast working times for early loading when the schedule is tight.",
      ],
      variant: "350ml cartridge",
      material: "Vinylester (styrene free)",
      applications: [
        "Suitable for high load values in concrete and masonry for medium to heavy-duty applications",
        "Fast working times for early loading in time-sensitive applications",
        "Use in outdoor environments and anchor bolt fixing",
        "Suitable for close to edge and reduced anchor center fixing",
        "Usable in damp and wet environment and submerged drill holes",
      ],
      features: [
        "Styrene-free vinylester resin system",
        "ETA bonded injection type anchor approval",
        "ETA approval for rebar connection",
        "Certificate of Constancy of Performance",
        "100-year working life claim (as per product literature)",
        "Compatible with ICFS chemical dispenser guns",
      ],
      advantages: [
        "High load performance in concrete and masonry",
        "Reliable in damp, wet, and submerged holes",
        "Close-to-edge and reduced spacing capability",
        "Fast gel/cure windows for early loading",
        "Outdoor and structural rebar applications",
      ],
      specs: [
        { label: "Product code", value: "CM350VESF" },
        { label: "Material", value: "Vinylester (styrene free)" },
        { label: "Variant", value: "350 ml cartridge" },
        { label: "System", value: "Two-component chemical injection" },
        { label: "Approvals", value: "ETA + Certificate of Constancy" },
        { label: "Use", value: "High-load anchor bolt & rebar fixing" },
        { label: "Environments", value: "Dry / damp / wet / submerged" },
        { label: "Dispenser", value: "Manual chemical gun (compatible)" },
      ],
      documents: [
        {
          title: "Certificate of Constancy of Performance",
          type: "PDF: Approval",
          href: `${CM350VESF_BASE}/documents/certificate-constancy-of-performance.pdf`,
        },
        {
          title: "ETA 14/0170: Bonded injection type anchor",
          type: "PDF: Approval",
          href: `${CM350VESF_BASE}/documents/eta-bonded-injection-anchor.pdf`,
        },
        {
          title: "ETA: Rebar connection",
          type: "PDF: Approval",
          href: `${CM350VESF_BASE}/documents/eta-rebar-connection.pdf`,
        },
        {
          title: "Product catalogue: CM350VESF",
          type: "PDF: Catalogue",
          href: `${CM350VESF_BASE}/documents/product-catalogue.pdf`,
        },
      ],
      loadCharts: [
        { title: "Gel & cure time table", src: `${CM350VESF_BASE}/gel-cure-table.jpg` },
      ],
      technicalDatasheets: [
        {
          title: "Technical datasheet 1",
          type: "PDF",
          href: `${CM350VESF_BASE}/documents/technical-datasheet.pdf`,
        },
        {
          title: "Technical datasheet 2",
          type: "PDF",
          href: `${CM350VESF_BASE}/documents/technical-datasheet-2.pdf`,
        },
      ],
      applicationImage: `${CM350VESF_BASE}/applications.jpg`,
      installationImage: `${CM350VESF_BASE}/installation.jpg`,
      installationSteps: [
        "Drill the hole to the specified diameter and depth for the stud / rebar.",
        "Clean the hole thoroughly, blow and brush until dust-free (follow datasheet cycles).",
        "Fit the mixing nozzle; discard the first mixed resin until colour is uniform.",
        "Inject from the bottom of the hole while withdrawing the nozzle slowly.",
        "Insert the stud or rebar with a twisting motion to full embedment.",
        "Respect gel and cure times for the site temperature before loading.",
      ],
    },
  ],
  guns: [],
  capsules: [],
  studs: [],
  mechanical: [],
  foam: [],
  nylon: [],
};

function formatInr(n) {
  return `₹${Number(n).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function normalizeGalleryItem(item, fallbackPoster) {
  if (!item) return null;
  if (typeof item === "string") {
    const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(item);
    return {
      type: isVideo ? "video" : "image",
      src: item,
      poster: isVideo ? fallbackPoster || null : null,
    };
  }
  const type =
    item.type || (/\.(mp4|webm|ogg|mov)$/i.test(item.src || "") ? "video" : "image");
  return {
    type,
    src: item.src,
    poster: item.poster || (type === "video" ? fallbackPoster || null : null),
  };
}

function enrich(categoryId, product) {
  const cat = SHOP_CATEGORIES.find((c) => c.id === categoryId);
  const rawGallery = product.gallery?.length ? product.gallery : [product.image];
  const gallery = rawGallery.map((item) => normalizeGalleryItem(item, product.image)).filter(Boolean);
  return {
    ...product,
    categoryId,
    categoryLabel: cat?.label || categoryId,
    href: `/shop/${product.slug}`,
    priceLabel: formatInr(product.price),
    compareAtLabel: product.compareAtPrice ? formatInr(product.compareAtPrice) : null,
    gallery,
    inStock: product.inStock !== false,
  };
}

/** Flat catalog */
export const ALL_PRODUCTS = Object.entries(PRODUCTS_BY_CAT).flatMap(([categoryId, items]) =>
  items.map((p) => enrich(categoryId, p))
);

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

/** Card-friendly lists for home ProductShop */
export const PRODUCTS_BY_CATEGORY = Object.fromEntries(
  Object.keys(PRODUCTS_BY_CAT).map((id) => [
    id,
    ALL_PRODUCTS.filter((p) => p.categoryId === id).map((p) => ({
      id: p.id,
      slug: p.slug,
      href: p.href,
      name: p.name,
      shortName: p.shortName,
      image: p.image,
      price: p.priceLabel,
      priceLabel: p.priceLabel,
      compareAtLabel: p.compareAtLabel,
      tag: p.tag,
      categoryLabel: p.categoryLabel,
      inStock: p.inStock,
    })),
  ])
);

export const HOME_SHOP_TABS = SHOP_CATEGORIES.filter((c) => c.id !== "all").map((c) => ({
  id: c.id,
  label: c.label,
  href: c.href,
}));

export const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to high" },
  { id: "price-desc", label: "Price: High to low" },
  { id: "name-asc", label: "Name: A-Z" },
  { id: "name-desc", label: "Name: Z-A" },
];

export function filterShopProducts({
  categoryId = "all",
  query = "",
  sort = "featured",
  taggedOnly = false,
}) {
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
        p.sku.toLowerCase().includes(q) ||
        (p.shortName && p.shortName.toLowerCase().includes(q))
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
