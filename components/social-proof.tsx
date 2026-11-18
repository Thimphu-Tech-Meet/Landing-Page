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
  const hasPhotos = photos.length > 0;

  return (
    <article className={hasPhotos ? "proof-item has-photos" : "proof-item"}>
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
            width={isMark ? 40 : 140}
            height={40}
          />
        )}
        {/* Wordmarks already spell the name; marks need a label beside them. */}
        {(isMark || !item.logo) && <span className="proof-name">{item.name}</span>}
      </a>
      <div className="proof-body">
        <div className="proof-meta">
          <span className="eyebrow">{item.kind}</span>
          <span className="mono plain">{item.when}</span>
        </div>
        <p>{item.blurb}</p>
        {item.links && item.links.length > 0 ? (
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
        ) : (
          <a
            className="proof-more"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit site ↗
          </a>
        )}
      </div>

      {hasPhotos && (
        <div className="proof-gallery" role="list" aria-label={`${item.name} photos`}>
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              role="listitem"
              className={
                photo.portrait
                  ? "ph has-img proof-shot is-portrait"
                  : "ph has-img proof-shot"
              }
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  photo.portrait
                    ? "(max-width: 639px) 70vw, (max-width: 899px) 40vw, 28vw"
                    : "(max-width: 639px) 78vw, (max-width: 899px) 45vw, 30vw"
                }
                priority={i === 0}
              />
              {i === 0 && <span>AVS · Paro</span>}
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
