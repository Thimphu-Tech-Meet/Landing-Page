import Image from "next/image";
import type { MDXComponents } from "mdx/types";

/**
 * Standard markdown images (`![alt](src)`) are swapped for next/image.
 * Markdown has no syntax for width/height, so we default to a 16:9 box and
 * let CSS keep the real aspect ratio.
 */
function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt } = props;
  if (typeof src !== "string" || src.length === 0) return null;

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={1200}
      height={675}
      sizes="(max-width: 768px) 100vw, 680px"
    />
  );
}

/** External links open in a new tab; internal ones stay in place. */
function MdxLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = typeof props.href === "string" && /^https?:\/\//i.test(props.href);
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    />
  );
}

/**
 * Component map passed to MDXRemote. Typography for headings, lists,
 * code and quotes is handled by the `.article .prose` styles in
 * globals.css, so contributors' markdown renders consistently without
 * any per-element classes here.
 */
export const mdxComponents: MDXComponents = {
  img: MdxImage,
  a: MdxLink,
};
