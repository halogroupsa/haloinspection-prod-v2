import Link from "next/link";
import { ArticleArchive } from "@/components/article-archive";
import { srcSetFor } from "@/components/image";
import { BUSINESS, SITE_URL } from "@/lib/content";
import { blogArchive, blogPosts, type BlogPost } from "@/lib/blog-posts";
import { JsonLd } from "@/lib/seo";
import { PageHero } from "./page-templates";

export function BlogArchivePage({ page = 1 }: { page?: number }) {
  const articles = blogPosts.map((post) => {
    const src = `/images/${post.image}.webp`;
    return {
      href: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      date: post.publishedAt,
      image: { src, srcSet: srcSetFor(src), alt: post.imageAlt },
    };
  }).sort((left, right) => right.date.localeCompare(left.date));
  const title = page === 1 ? blogArchive.title : `${blogArchive.title} · Page ${page}`;

  return (
    <>
      <PageHero eyebrow="Inspection advice" title={title} text={blogArchive.description} breadcrumbs={[{ name: "Blog" }]} cta="" showReviews={false} />
      <div className="container">
        <ArticleArchive articles={articles} archivePage={page} />
      </div>
    </>
  );
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        mainEntityOfPage: url,
        datePublished: post.publishedAt,
        image: `${SITE_URL}/images/${post.image}.webp`,
        author: { "@type": "Organization", name: BUSINESS.name, url: `${SITE_URL}/about` },
        publisher: { "@id": `${SITE_URL}/#business` },
      }} />
      <PageHero
        eyebrow="Pre-purchase guide"
        title={post.title}
        text={post.description}
        image={post.image}
        imageAlt={post.imageAlt}
        breadcrumbs={[{ name: "Blog", href: "/blog" }, { name: post.title }]}
        cta=""
        showReviews={false}
      />
      <article className="section">
        <div className="container">
          <div className="legal-copy">
            <p>{BUSINESS.name} · <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.publishedAt))}</time></p>
            {post.sections.map(({ heading, paragraphs }) => (
              <section key={heading}>
                <h2>{heading}</h2>
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <p>See what a <Link href="/services/pre-purchase">pre-purchase property inspection</Link> can cover. For general context on visual inspection and access limits, read the <a href="https://www.nachi.org/sop.htm">InterNACHI standards of practice</a>.</p>
          </div>
        </div>
      </article>
    </>
  );
}
