import { notFound } from "next/navigation";
import { BlogArchivePage, BlogPostPage } from "@/components/blog-pages";
import { blogPosts } from "@/lib/blog-posts";
import { archivePageFromPath } from "@/lib/archive-pagination";
import { allPaths, services, locations } from "@/lib/content";
import { metadataFor } from "@/lib/seo";
import {
  AboutPage,
  CertificationsPage,
  ContactPage,
  FAQsPage,
  LocationPage,
  LocationsPage,
  PartnershipPage,
  QuotePage,
  ServicePage,
  ServicesPage,
} from "@/components/page-templates";
import { LegalPage } from "@/components/legal-page";
import { InspectionToolsPage } from "@/components/inspection-tools-page";
import { projects } from "@/lib/projects";
import { ProjectPage, ProjectsPage } from "@/components/projects-page";

export const dynamicParams = false;
export function generateStaticParams() {
  return allPaths
    .filter((p) => p !== "/")
    .map((p) => ({ slug: p.slice(1).split("/") }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return metadataFor(`/${slug.join("/")}`);
}
export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const post = blogPosts.find((entry) => `/blog/${entry.slug}` === path);
  if (post) return <BlogPostPage post={post} />;
  const archivePage = archivePageFromPath(path, blogPosts.length);
  if (archivePage) return <BlogArchivePage page={archivePage} />;
  const project = projects.find((p) => `/projects/${p.slug}` === path);
  if (project) return <ProjectPage project={project} />;
  const service = services.find((s) => `/${s.slug}` === path);
  if (service) return <ServicePage service={service} />;
  const location = locations.find((l) => `/locations/${l.slug}` === path);
  if (location) return <LocationPage location={location} />;
  if (slug[0] === "partnerships") return <PartnershipPage slug={slug[1]} />;
  switch (path) {
    case "/projects":
      return <ProjectsPage />;
    case "/services":
      return <ServicesPage />;
    case "/locations":
      return <LocationsPage />;
    case "/quote":
      return <QuotePage />;
    case "/contact":
      return <ContactPage />;
    case "/about":
      return <AboutPage />;
    case "/inspection-tools":
      return <InspectionToolsPage />;
    case "/faq":
      return <FAQsPage />;
    case "/company/certifications":
      return <CertificationsPage />;
    case "/privacy-policy":
    case "/terms-of-service":
      return <LegalPage privacy={path === "/privacy-policy"} />;
    default:
      notFound();
  }
}
