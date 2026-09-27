import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import ProductDetail from "@/components/shop/ProductDetail";
import { ALL_PRODUCTS, getProductBySlug } from "@/data/shopCatalog";

export default function ProductPage({ product }) {
  if (!product) return null;

  return (
    <>
      <SeoHead
        title={`${product.name} | IndoSpark Shop`}
        description={product.shortDescription}
        path={`/shop/${product.slug}`}
      />
      <Navbar />
      <main>
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ALL_PRODUCTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { notFound: true };
  return { props: { product } };
}
