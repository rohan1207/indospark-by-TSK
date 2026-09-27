import Head from "next/head";

const SITE_NAME = "IndoSpark";
const SITE_URL = "https://www.indospark.com";
const DEFAULT_DESCRIPTION =
  "IndoSpark — India's leading construction fastening systems company. Shop ICFS chemical & mechanical anchors online, and book concrete cutting, rebaring, core drilling, and wire sawing services.";

export default function SeoHead({
  title = "Anchor Fastening Systems & Concrete Cutting Services",
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
    name: "IndoSpark",
    alternateName: "Indo Construction Fastening Systems",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: "email@indospark.com",
    telephone: "+91-1800-1235-00023",
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
        content="IndoSpark, ICFS, chemical anchors, mechanical anchors, construction fastening, concrete cutting, rebaring, core drilling, wire sawing, PU foam, India"
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
