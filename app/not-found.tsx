import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-neutral-600">
        This idea does not exist yet — maybe you should contribute it.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
      >
        Back to all ideas
      </Link>
    </section>
  );
}
