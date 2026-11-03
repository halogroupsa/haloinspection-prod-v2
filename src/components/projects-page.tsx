import Link from "next/link";
import { BUSINESS } from "@/lib/content";
import { projects, type Project } from "@/lib/projects";
import { PageSchema } from "@/lib/seo";
import { Breadcrumbs, CTA, Eyebrow, ReviewBadge } from "./shared";
import { Img } from "./image";
import { Icon } from "./icon";
import { ProjectCard } from "./project-card";
import { ProjectDirectory } from "./project-directory";
import { ProjectFilm, ProjectGallery } from "./project-media";
import styles from "./projects.module.css";

export function ProjectsPage() {
  const featured = projects[0];
  return (
    <>
      <PageSchema path="/projects" name="Our inspection projects" />
      <section className={`hero-band ${styles.hero}`}>
        <Img className={`hero-band-photo ${styles.heroPhoto}`} src={featured.images[0].src} alt={featured.images[0].alt} sizes="(max-width: 640px) 1250px, 100vw" fetchPriority="high" />
        <div className={`container ${styles.heroInner}`}>
          <Breadcrumbs items={[{ name: "Projects" }]} />
          <div className={styles.heroCopy}>
            <Eyebrow>OUR INSPECTION PROJECTS</Eyebrow>
            <h1>A closer look.<br /><span>A clearer picture.</span></h1>
            <p>Beautiful spaces. The details that matter. Explore a selection of Halo inspections through the lens of our team.</p>
            <a className="button button-light" href="#projects">Explore our projects <Icon name="arrow" /></a>
          </div>
          <Link className={styles.featuredLink} href={`/projects/${featured.slug}`}>
            <div><span className="tiny-label">FEATURED PROJECT</span><strong>{featured.title}</strong><span>Waterfront villa inspection</span></div><span className={styles.featuredArrow}><Icon name="arrow" /></span>
          </Link>
        </div>
      </section>
      <section className={`section ${styles.collection}`} id="projects">
        <div className="container">
          <div className="section-heading">
            <div><Eyebrow>ON SITE WITH HALO</Eyebrow><h2>Our work, in focus.</h2></div>
            <p>From waterfront villas to family homes, discover the spaces we inspect and the care we bring to every detail.</p>
          </div>
          <ProjectDirectory items={projects.map((project) => ({ slug: project.slug, community: project.community, card: <ProjectCard project={project} /> }))} />
        </div>
      </section>
      <CTA title="Your property. Our attention to detail." text="Tell us about your home and what you need to understand. We’ll help you arrange the right inspection." />
    </>
  );
}

export function ProjectPage({ project }: { project: Project }) {
  const related = [...projects.filter((p) => p.slug !== project.slug && p.community === project.community), ...projects.filter((p) => p.slug !== project.slug && p.community !== project.community)].slice(0, 2);
  return (
    <>
      <PageSchema path={`/projects/${project.slug}`} name={project.title} />
      <section className="page-hero hero-band" id="hero">
        <Img className="hero-band-photo" src={project.images[0].src} alt={project.images[0].alt} sizes="100vw" fetchPriority="high" />
        <div className="container">
          <Breadcrumbs items={[{ name: "Projects", href: "/projects" }, { name: project.title }]} />
          <div className="page-hero-layout">
            <div>
              <Eyebrow>{project.category.toUpperCase()} · {project.community.toUpperCase()}</Eyebrow>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <div className="hero-actions">
                <a className="button button-dark" href={project.videos.length ? "#project-film" : "#project-gallery"}>{project.videos.length ? "Watch the project film" : "Explore the photo story"}<Icon name="arrow" /></a>
                <a className="text-link" href={BUSINESS.phoneLink}><Icon name="phone" />Talk to Halo</a>
              </div>
              <div className="page-hero-review"><ReviewBadge /></div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <dl className={styles.projectFacts}>
          <div><dt>LOCATION</dt><dd>{project.community === project.emirate ? project.emirate : `${project.community}, ${project.emirate}`}</dd></div>
          <div><dt>PROJECT FOCUS</dt><dd>{project.category}</dd></div>
          <div><dt>INSIDE THIS PROJECT</dt><dd>{project.images.length} selected views{project.videos.length ? ` · ${project.videos.length === 1 ? "Project film" : "2 project films"}` : ""}</dd></div>
        </dl>
      </div>
      <section className={`section ${styles.overview}`}>
        <div className={`container ${styles.overviewLayout}`}>
          <div><Eyebrow>INSIDE THE VISIT</Eyebrow><h2>A thoughtful look<br />at every space.</h2><p>{project.overview}</p><Link className="text-link" href="/services">Explore our inspection services <Icon name="arrow" /></Link></div>
          <div className={styles.focusList}>{project.focus.map((focus) => <div key={focus.title}><span><Icon name="check" /></span><div><h3>{focus.title}</h3><p>{focus.text}</p></div></div>)}</div>
        </div>
      </section>
      {project.videos.length > 0 && <section className={`section ${styles.filmSection}`} id="project-film"><div className="container"><div className="section-heading"><div><Eyebrow>THE VISIT IN MOTION</Eyebrow><h2>Step inside the project.</h2></div><p>A short look at the property and our team at work, filmed during this visit.</p></div>{project.videos.map((film, index) => <ProjectFilm key={film.src} {...film} name={project.title} poster={project.images[index === 0 ? 0 : 1]} />)}</div></section>}
      <section className={`section ${styles.gallerySection}`} id="project-gallery"><div className="container"><div className="section-heading"><div><Eyebrow>SELECTED MOMENTS</Eyebrow><h2>The details, in focus.</h2></div><p>A closer view of the spaces and inspection activity. Every photograph from this visit.</p></div><ProjectGallery images={project.images} initialCount={project.images.length} rowScale={1.25} /></div></section>
      <section className={`section ${styles.related}`}><div className="container"><div className="section-heading"><div><Eyebrow>CONTINUE EXPLORING</Eyebrow><h2>More from our visits.</h2></div><Link className="text-link" href="/projects">All projects <Icon name="arrow" /></Link></div><div className={styles.grid}>{related.map((p) => <ProjectCard key={p.slug} project={p} />)}</div></div></section>
      <CTA title="Let’s take a closer look at your property." text="Share your property and inspection needs with Halo. We’ll confirm the scope and next steps with you." href={`/quote?location=${encodeURIComponent(project.community)}`} />
    </>
  );
}
