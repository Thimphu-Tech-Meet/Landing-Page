import Image from "next/image";
import { socialProof, type ProofItem } from "@/lib/proof";

/** Quiet “elsewhere” strip: venues we presented at, and coverage that named us. */
export function SocialProof() {
  if (socialProof.length === 0) return null;

  return (
    <section id="elsewhere" className="proof">
      <div className="wrap">
        <div className="section-head">
          <h2>Elsewhere</h2>
        </div>
        <p className="proof-lede">
          Moments outside the Saturday room — presentations and write-ups that
          put the community on a wider map.
        </p>
        <ul className="proof-list">
          {socialProof.map((item) => (
            <li key={item.name}>
              <ProofRow item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProofRow({ item }: { item: ProofItem }) {
  const isMark = Boolean(item.logo?.includes("mark"));
  const logoClass = isMark ? "proof-logo" : "proof-logo proof-logo-ink";
  const photos = item.photos ?? [];
  const primaryHref = item.links?.[0]?.href ?? item.href;

  return (
    <article className="proof-item">
      <header className="proof-header">
        <a
          className="proof-brand"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
        >
          {item.logo && (
            // SVGs are static brand marks; plain <img> avoids next/image SVG limits.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className={logoClass}
              src={item.logo}
              alt=""
              width={isMark ? 36 : 132}
              height={36}
            />
          )}
          {(isMark || !item.logo) && (
            <span className="proof-name">{item.name}</span>
          )}
        </a>
        <div className="proof-meta">
          <span className="eyebrow">{item.kind}</span>
          <span className="mono plain">{item.when}</span>
        </div>
      </header>

      <p className="proof-blurb">{item.blurb}</p>

      {photos.length > 0 && (
        <div className="proof-gallery" role="list" aria-label={`${item.name} photos`}>
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              role="listitem"
              className={[
                "ph",
                "has-img",
                "proof-shot",
                photo.portrait ? "is-portrait" : "",
                i === 0 ? "is-lead" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  i === 0
                    ? "(max-width: 639px) 100vw, (max-width: 899px) 50vw, 34vw"
                    : "(max-width: 639px) 50vw, (max-width: 899px) 33vw, 25vw"
                }
                priority={i < 2}
              />
              {i === 0 && <span>AVS · Paro</span>}
            </div>
          ))}
        </div>
      )}

      {item.coverage && (
        <a
          className="proof-coverage"
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.coverage.image && (
            <div className="proof-coverage-media">
              <Image
                src={item.coverage.image}
                alt={item.coverage.imageAlt ?? ""}
                fill
                sizes="(max-width: 639px) 100vw, 280px"
              />
            </div>
          )}
          <div className="proof-coverage-copy">
            <div className="mono">From their post</div>
            <blockquote>
              <p>{item.coverage.excerpt}</p>
            </blockquote>
            {item.links && item.links.length > 0 && (
              <div className="proof-coverage-channels" aria-hidden="true">
                {item.links.map((link) => (
                  <span key={link.href}>{link.label}</span>
                ))}
              </div>
            )}
          </div>
        </a>
      )}

      {!item.coverage && (
        <a
          className="proof-more"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit site ↗
        </a>
      )}

      {item.coverage && item.links && item.links.length > 1 && (
        <div className="proof-links">
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
