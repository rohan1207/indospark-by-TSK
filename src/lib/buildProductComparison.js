/**
 * Pure product-comparison builder.
 * Takes enriched catalog products and returns a concise, difference-aware table
 * suitable for the compare page (and reusable by a future API route).
 */

function norm(value) {
  if (value == null) return "";
  return String(value).trim().replace(/\s+/g, " ").toLowerCase();
}

function uniq(list) {
  const seen = new Set();
  const out = [];
  for (const item of list) {
    const key = norm(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function valuesEqual(values) {
  if (values.length <= 1) return true;
  const first = norm(values[0]);
  return values.every((v) => norm(v) === first);
}

function money(n) {
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

function pickSpec(product, labels) {
  const specs = product.specs || [];
  for (const label of labels) {
    const hit = specs.find((s) => norm(s.label) === norm(label));
    if (hit?.value) return hit.value;
  }
  return null;
}

function row(id, label, values, { highlightDiff = true, group = "overview" } = {}) {
  const same = valuesEqual(values);
  return {
    id,
    label,
    values,
    same,
    differs: !same,
    highlight: highlightDiff && !same,
    group,
  };
}

/**
 * @param {Array<object>} products - enriched shop products (2+)
 * @returns {{
 *   products: object[],
 *   rows: object[],
 *   differenceRows: object[],
 *   sharedRows: object[],
 *   insights: object[],
 *   groups: { id: string, label: string }[]
 * }}
 */
export function buildProductComparison(products = []) {
  const list = (products || []).filter(Boolean);
  if (list.length < 2) {
    return {
      products: list,
      rows: [],
      differenceRows: [],
      sharedRows: [],
      insights: [],
      groups: [],
    };
  }

  const overviewRows = [
    row(
      "category",
      "Category",
      list.map((p) => p.categoryLabel || "—"),
      { group: "overview" }
    ),
    row(
      "price",
      "Price",
      list.map((p) => p.priceLabel || money(p.price)),
      { group: "overview" }
    ),
    row(
      "stock",
      "Availability",
      list.map((p) => (p.inStock === false ? "Out of stock" : "In stock")),
      { group: "overview" }
    ),
    row(
      "sku",
      "SKU",
      list.map((p) => p.sku || "—"),
      { group: "overview", highlightDiff: false }
    ),
    row(
      "tag",
      "Chemistry / type",
      list.map((p) => p.tag || p.material || "—"),
      { group: "overview" }
    ),
    row(
      "material",
      "Material",
      list.map((p) => p.material || pickSpec(p, ["Material"]) || "—"),
      { group: "overview" }
    ),
    row(
      "variant",
      "Pack / variant",
      list.map((p) => p.variant || pickSpec(p, ["Variant"]) || "—"),
      { group: "overview" }
    ),
  ];

  const technicalLabels = [
    "Product code",
    "System",
    "Resin colour",
    "Approvals",
    "Formats",
    "Environments",
    "Dispenser",
    "Use",
  ];

  const technicalRows = technicalLabels
    .map((label) => {
      const values = list.map((p) => pickSpec(p, [label]) || "—");
      if (values.every((v) => v === "—")) return null;
      return row(`spec-${norm(label)}`, label, values, { group: "technical" });
    })
    .filter(Boolean);

  const featureUniverse = uniq(list.flatMap((p) => p.features || []));
  const featureRows = featureUniverse.slice(0, 12).map((feature) =>
    row(
      `feature-${norm(feature)}`,
      feature,
      list.map((p) => ((p.features || []).some((f) => norm(f) === norm(feature)) ? "Yes" : "No")),
      { group: "features" }
    )
  );

  const appUniverse = uniq(list.flatMap((p) => p.applications || []));
  const applicationRows = appUniverse.slice(0, 10).map((app) =>
    row(
      `app-${norm(app)}`,
      app,
      list.map((p) =>
        (p.applications || []).some((a) => norm(a) === norm(app)) ? "Yes" : "No"
      ),
      { group: "applications" }
    )
  );

  const docsRows = [
    row(
      "docs",
      "Documents available",
      list.map((p) => {
        const n =
          (p.documents?.length || 0) + (p.technicalDatasheets?.length || 0);
        return n ? `${n} file${n === 1 ? "" : "s"}` : "None listed";
      }),
      { group: "docs" }
    ),
    row(
      "eta",
      "ETA / approvals listed",
      list.map((p) => {
        const docs = [...(p.documents || []), ...(p.technicalDatasheets || [])];
        const hasEta = docs.some((d) => /eta|approval|constancy/i.test(`${d.title} ${d.type}`));
        const spec = pickSpec(p, ["Approvals"]);
        if (hasEta || (spec && /eta/i.test(spec))) return "Yes";
        if (spec) return spec;
        return "Not listed";
      }),
      { group: "docs" }
    ),
  ];

  const rows = [
    ...overviewRows,
    ...technicalRows,
    ...featureRows,
    ...applicationRows,
    ...docsRows,
  ];

  const differenceRows = rows.filter((r) => r.differs);
  const sharedRows = rows.filter((r) => r.same);

  const prices = list.map((p) => Number(p.price) || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const cheapest = list.filter((p) => Number(p.price) === minPrice);
  const sameCategory = list.every((p) => p.categoryId === list[0].categoryId);
  const materials = uniq(list.map((p) => p.material || p.tag).filter(Boolean));

  const insights = [];
  if (sameCategory) {
    insights.push({
      id: "same-cat",
      tone: "neutral",
      text: `All ${list.length} products are in ${list[0].categoryLabel}.`,
    });
  } else {
    insights.push({
      id: "cross-cat",
      tone: "warn",
      text: "You are comparing across categories. Focus on use-case fit, not only price.",
    });
  }

  if (maxPrice > minPrice && cheapest.length === 1) {
    insights.push({
      id: "price",
      tone: "good",
      text: `${cheapest[0].shortName || cheapest[0].name} is the lowest price at ${money(minPrice)}.`,
    });
  } else if (maxPrice === minPrice) {
    insights.push({
      id: "price-same",
      tone: "neutral",
      text: "List prices match across the compared products.",
    });
  }

  if (materials.length > 1) {
    insights.push({
      id: "chem",
      tone: "good",
      text: `Chemistry differs: ${materials.join(" vs ")}. Pick based on load and site conditions.`,
    });
  }

  const etaYes = list.filter((p) => {
    const docs = [...(p.documents || []), ...(p.technicalDatasheets || [])];
    return (
      docs.some((d) => /eta|approval|constancy/i.test(`${d.title} ${d.type}`)) ||
      /eta/i.test(pickSpec(p, ["Approvals"]) || "")
    );
  });
  if (etaYes.length && etaYes.length < list.length) {
    insights.push({
      id: "eta",
      tone: "good",
      text: `${etaYes.map((p) => p.shortName || p.name).join(", ")} list ETA / approval documents.`,
    });
  }

  if (differenceRows.length) {
    insights.push({
      id: "diff-count",
      tone: "neutral",
      text: `${differenceRows.length} clear differences across ${rows.length} compared points.`,
    });
  }

  return {
    products: list,
    rows,
    differenceRows,
    sharedRows,
    insights,
    groups: [
      { id: "overview", label: "Overview" },
      { id: "technical", label: "Technical" },
      { id: "features", label: "Features" },
      { id: "applications", label: "Applications" },
      { id: "docs", label: "Documents" },
    ],
  };
}

/** Suggest products to add when compare list has fewer than 2 items. */
export function getCompareSuggestions(selectedProducts, catalog, limit = 6) {
  const selected = selectedProducts || [];
  const selectedIds = new Set(selected.map((p) => p.id));
  const pool = (catalog || []).filter((p) => !selectedIds.has(p.id));

  if (!pool.length) return [];

  const seed = selected[0];
  if (!seed) return pool.slice(0, limit);

  const sameCat = pool.filter((p) => p.categoryId === seed.categoryId);
  const other = pool.filter((p) => p.categoryId !== seed.categoryId);
  return [...sameCat, ...other].slice(0, limit);
}
