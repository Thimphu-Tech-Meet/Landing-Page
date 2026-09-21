import Image from "next/image";
import { site, weekly } from "@/lib/site";

/**
 * Photo of the venue. The source is public/Locations/LodenOffice.png;
 * the page serves a compressed WebP copy of the same image.
 */
const VENUE_IMAGE = "/Locations/LodenOffice.webp";
const VENUE_ALT =
  "The Loden Foundation building in Thimphu: a white tower with traditional Bhutanese trim, seen from the road";

interface VenuePhotoProps {
  /** Set on the home page hero so the browser fetches it first. */
  priority?: boolean;
  sizes: string;
}

/** The venue photo, linked to the Google Maps pin. */
export function VenuePhoto({ priority = false, sizes }: VenuePhotoProps) {
  return (
    <a
      className="venue-photo"
      href={weekly.map}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${weekly.place} on Google Maps`}
    >
      <Image src={VENUE_IMAGE} alt={VENUE_ALT} fill sizes={sizes} priority={priority} />
      <span>{weekly.place} ↗</span>
    </a>
  );
}

/** "Where we meet" block: photo plus schedule, map and email. */
export function VenueCard() {
  return (
    <div className="venue">
      <VenuePhoto sizes="(max-width: 820px) 100vw, 45vw" />
      <div className="venue-info">
        <div className="eyebrow">Where we meet</div>
        <h3>{weekly.place}</h3>
        <p>
          A casual session, every Saturday from {weekly.time}.
          No sign-up, no agenda you have to follow. Walk in, or email ahead if
          you want to give a talk.
        </p>
        <div className="actions">
          <a className="btn small primary" href={weekly.map} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
          <a className="btn small" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}
