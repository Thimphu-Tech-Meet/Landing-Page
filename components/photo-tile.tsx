import Image from "next/image";
import type { MeetupMedia } from "@/lib/meetups";

const VARIANTS = ["", "v2", "v3", "v4"];

interface PhotoTileProps {
  media?: MeetupMedia;
  /** Small caption in the corner, e.g. "05 Sep · Alife night". Falls back to media.caption. */
  label?: string;
  /** Picks one of four placeholder gradients when there is no media. */
  index?: number;
  className?: string;
  sizes?: string;
}

/**
 * A media tile: a photo, a video with native controls, or a coloured
 * placeholder when nothing has been uploaded yet, so galleries keep their
 * layout before organisers add pictures.
 */
export function PhotoTile({ media, label, index = 0, className = "", sizes }: PhotoTileProps) {
  const variant = VARIANTS[index % VARIANTS.length];
  const text = label ?? media?.caption;
  const classes = [
    "ph",
    variant,
    media ? "has-img" : "",
    media?.kind === "video" ? "is-video" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {media?.kind === "photo" && (
        <Image
          src={media.src}
          alt={media.alt ?? text ?? ""}
          fill
          sizes={sizes ?? "(max-width: 820px) 50vw, 25vw"}
        />
      )}
      {media?.kind === "video" && (
        <video controls preload="metadata" playsInline aria-label={media.alt ?? text}>
          <source src={media.src} />
          Your browser does not support embedded video.{" "}
          <a href={media.src}>Download the video</a>.
        </video>
      )}
      {text && <span>{text}</span>}
    </div>
  );
}
