import Link from "next/link";
import { PageSchema } from "@/lib/seo";
import { inspectionTools } from "@/lib/inspection-tools";
import { PageHero } from "./page-templates";
import { CTA, Eyebrow } from "./shared";
import { Img } from "./image";
import { Icon } from "./icon";
import { InspectionToolsExplorer } from "./inspection-tools-explorer";
import styles from "./inspection-tools.module.css";

export function InspectionToolsPage() {
  return (
    <>
      <PageSchema path="/inspection-tools" name="Inspection tools" />
      <PageHero
        eyebrow="INSIDE THE INSPECTOR’S KIT"
        title="The tools behind a closer look."
        text="Explore the equipment that supports Halo’s property inspections, from moisture and airflow readings to photographs of hard-to-reach areas. Each tool adds context to an expert visual assessment."
        breadcrumbs={[{ name: "Inspection tools" }]}
        cta="Explore the equipment"
        href="#tools-explorer"
      />
      <section className="section" aria-label="Interactive inspection equipment explorer">
        <div className="container"><InspectionToolsExplorer /></div>
      </section>
      <section className={`section ${styles.catalog}`}>
        <div className="container">
          <div className="section-heading">
            <div><Eyebrow>WHAT EACH TOOL BRINGS</Eyebrow><h2>Measurements. Observations.<br />A more useful report.</h2></div>
            <p>Equipment is selected for the agreed scope, the property’s condition and the access available during your visit.</p>
          </div>
          <div className={styles.catalogGrid}>
            {inspectionTools.map((tool) => (
              <article className={styles.catalogCard} key={tool.id}>
                <Img src={tool.image} sizes="(max-width: 640px) 74px, (max-width: 1150px) 100px, 140px" alt={tool.imageAlt} loading="lazy" />
                <div>
                  <span className="tiny-label">{tool.category}</span>
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                  <p className={styles.catalogFocus}>{tool.focus}</p>
                  <p className={styles.context}>{tool.context}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.reportLink}>
            <p>Useful readings become useful findings when they are recorded with their location, a photograph and clear next steps.</p>
            <Link href="/#inspection-report" className="text-link">See real inspection findings<Icon name="arrow" /></Link>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
