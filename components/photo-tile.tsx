import Image from "next/image";
import type { MeetupPhoto } from "@/lib/meetups";

const VARIANTS = ["", "v2", "v3", "v4"];

interface PhotoTileProps {
  photo?: MeetupPhoto;
  /** Small caption in the corner, e.g. "05 Sep · Alife night". */
  label?: string;
  /** Picks one of four placeholder gradients when there is no photo. */
  index?: number;
  className?: string;
  sizes?: string;
}

/**
 * A photo tile that degrades to a coloured placeholder when no photo
 * exists yet, so galleries keep their layout before organisers upload.
 */
export function PhotoTile({ photo, label, index = 0, className = "", sizes }: PhotoTileProps) {
  const variant = VARIANTS[index % VARIANTS.length];
  const classes = ["ph", variant, photo ? "has-img" : "", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {photo && (
        <Image
          src={photo.src}
          alt={photo.alt ?? label ?? ""}
          fill
          sizes={sizes ?? "(max-width: 820px) 50vw, 25vw"}
        />
      )}
      {label && <span>{label}</span>}
    </div>
  );
}
