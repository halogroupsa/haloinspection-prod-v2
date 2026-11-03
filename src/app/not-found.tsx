import Link from "next/link";
import { Icon } from "@/components/icon";
export default function NotFound() {
  return (
    <section className="not-found container">
      <span className="eyebrow">A SMALL DETOUR</span>
      <h1>
        Let’s get you
        <br />
        back home.
      </h1>
      <p>
        This page could not be found. Explore our inspection services or head
        back to Halo.
      </p>
      <div className="hero-actions">
        <Link className="button button-dark" href="/">
          Back to Halo
          <Icon name="arrow" />
        </Link>
        <Link className="text-link" href="/services">
          Explore services
          <Icon name="arrow" />
        </Link>
      </div>
    </section>
  );
}
