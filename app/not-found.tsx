import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="wrap nf">
        <div className="eyebrow">404</div>
        <h1>Page not found</h1>
        <p>This idea does not exist yet — maybe you should contribute it.</p>
        <div className="actions" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn primary" href="/ideas">
            Back to all ideas
          </Link>
          <Link className="btn" href="/contribute">
            Write it
          </Link>
        </div>
      </div>
    </section>
  );
}
