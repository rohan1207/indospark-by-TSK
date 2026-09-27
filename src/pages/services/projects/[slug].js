import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import { ProjectDetail } from "@/components/services/ServiceTemplates";
import { PROJECTS, getProject } from "@/components/services/servicesData";

export default function ProjectPage({ project }) {
  if (!project) return null;

  return (
    <>
      <SeoHead
        title={`${project.title} | IndoSpark Projects`}
        description={project.summary}
        path={`/services/projects/${project.slug}`}
      />
      <Navbar />
      <main>
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: PROJECTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = getProject(params.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
}
