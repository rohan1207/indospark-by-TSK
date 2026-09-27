import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import { ServiceDetail } from "@/components/services/ServiceTemplates";
import { SERVICES, getService } from "@/components/services/servicesData";

export default function ServicePage({ service }) {
  if (!service) return null;

  return (
    <>
      <SeoHead
        title={`${service.title} | IndoSpark Services`}
        description={service.short}
        path={`/services/${service.slug}`}
      />
      <Navbar />
      <main>
        <ServiceDetail service={service} />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: SERVICES.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const service = getService(params.slug);
  if (!service) return { notFound: true };
  return { props: { service } };
}
