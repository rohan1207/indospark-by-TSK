import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import { TechnologyDetail } from "@/components/services/ServiceTemplates";
import { TECHNOLOGIES, getTechnology } from "@/components/services/servicesData";

export default function TechnologyPage({ tech }) {
  if (!tech) return null;

  return (
    <>
      <SeoHead
        title={`${tech.title} | Technology & Equipment`}
        description={tech.short}
        path={`/services/technology/${tech.slug}`}
      />
      <Navbar />
      <main>
        <TechnologyDetail tech={tech} />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: TECHNOLOGIES.map((t) => ({ params: { slug: t.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tech = getTechnology(params.slug);
  if (!tech) return { notFound: true };
  return { props: { tech } };
}
