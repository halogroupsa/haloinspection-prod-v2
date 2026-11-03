import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Img } from "./image";
import { Icon } from "./icon";
import styles from "./projects.module.css";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <Link href={`/projects/${project.slug}`} className={styles.cardLink}>
        <div className={styles.cardPhoto}>
          <Img src={project.images[0].src} alt={project.images[0].alt} sizes="(max-width: 640px) 92vw, (max-width: 1150px) 46vw, 620px" loading="lazy" />
          <span className={styles.mediaBadge}>{project.videos.length ? <><span aria-hidden="true">▷</span> Project film</> : "Photo story"}</span>
          <span className={styles.cardArrow}><Icon name="arrow" /></span>
        </div>
        <div className={styles.cardBody}>
          <span className="tiny-label">{project.community} · {project.category}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <span className="text-link">Explore project <Icon name="arrow" /></span>
        </div>
      </Link>
    </article>
  );
}
