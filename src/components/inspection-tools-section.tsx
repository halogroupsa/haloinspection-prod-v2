import Link from "next/link";
import { Eyebrow } from "./shared";
import { Icon } from "./icon";
import { InspectionToolsExplorer } from "./inspection-tools-explorer";
import styles from "./inspection-tools.module.css";

export function InspectionToolsSection() {
  return (
    <section className={`section ${styles.section}`} id="inspection-tools" aria-labelledby="inspection-tools-heading">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>THE RIGHT TOOL. A CLEARER PICTURE.</Eyebrow>
            <h2 id="inspection-tools-heading">Expert eyes.<br />A well-equipped inspection.</h2>
          </div>
          <Link href="/inspection-tools" className="text-link">Explore our inspection tools<Icon name="arrow" /></Link>
        </div>
        <InspectionToolsExplorer id="home-tools-explorer" />
      </div>
    </section>
  );
}
