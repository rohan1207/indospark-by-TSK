import Head from "next/head";

const SITE_NAME = "ICFS";
const SITE_URL = "https://www.indospark.com";
const DEFAULT_DESCRIPTION =
  "ICFS — chemical and mechanical anchor fasteners for construction. Shop mortars, studs, capsules, guns, and accessories online across India.";

export default function SeoHead({
  title = "Chemical & Mechanical Anchor Fasteners",
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = `${SITE_URL}/og-image.jpg`,
  type = "website",
}) {
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ICFS",
    alternateName: "Indo Construction Fastening Systems",
    description:
      "ICFS manufactures and supplies chemical and mechanical anchor fasteners for construction projects across India.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: "email@icfs.in",
    telephone: "+91-1800-123-500-023",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "198 E, Tararani Chowk, Near Geeta Mandir",
        addressLocality: "Kolhapur",
        postalCode: "416003",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress:
          "H.No. 128, Telephone Exchange, Opposite Matoshri Medical, Near Unity Complex, Ambegaon Budruk",
        addressLocality: "Pune",
        postalCode: "411046",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    ],
    sameAs: [],
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="ICFS, anchor fasteners, chemical anchors, mechanical anchors, chemical mortar, rebar anchoring, wedge anchors, construction fasteners, India"
      />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#c9342e" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
    </Head>
  );
}
