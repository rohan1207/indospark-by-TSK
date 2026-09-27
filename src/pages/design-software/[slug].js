import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import SoftwareDetail from "@/components/software/SoftwareDetail";
import {
  SOFTWARE_PRODUCTS,
  getSoftware,
} from "@/components/software/designSoftwareData";

export default function DesignSoftwareDetailPage({ product }) {
  if (!product) return null;

  return (
    <>
      <SeoHead
        title={`${product.title} | Design Software`}
        description={product.short}
        path={`/design-software/${product.slug}`}
      />
      <Navbar />
      <main>
        <SoftwareDetail product={product} />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: SOFTWARE_PRODUCTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getSoftware(params.slug);
  if (!product) return { notFound: true };
  return { props: { product } };
}
