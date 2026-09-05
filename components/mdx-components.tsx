import Image from "next/image";
import type { MDXComponents } from "mdx/types";

/**
 * Standard markdown images (`![alt](src)`) are swapped for next/image.
 * next/image gives us lazy loading, modern formats, and fixed dimensions
 * out of the box, which prevents Cumulative Layout Shift (a Core Web Vital).
 *
 * Markdown has no syntax for width/height, so we default to a 16:9 box and
 * let CSS (`h-auto w-full`) keep the real aspect ratio.
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
      sizes="(max-width: 768px) 100vw, 72ch"
      className="my-6 h-auto w-full rounded-lg border border-neutral-200"
    />
  );
}

/**
 * Component map passed to MDXRemote. Every primitive gets Tailwind classes
 * so contributed markdown renders consistently without contributors needing
 * to know any CSS.
 */
export const mdxComponents: MDXComponents = {
  img: MdxImage,
  h2: (props) => (
    <h2 className="mt-10 text-2xl font-bold tracking-tight" {...props} />
  ),
  h3: (props) => <h3 className="mt-8 text-xl font-semibold" {...props} />,
  p: (props) => <p className="my-4 leading-7 text-neutral-700" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-800"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-neutral-700" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-neutral-700" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-neutral-300 pl-4 italic text-neutral-600"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-neutral-800"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-neutral-200" />,
};
