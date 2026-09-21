import Image from "next/image";
import { site, sponsors } from "@/lib/site";

/** "Supported by" strip shown above the footer on every page. */
export function Sponsors() {
  return (
    <div className="sponsors">
      <div className="wrap">
        <div className="row">
          <div>
            <div className="mono">Supported by</div>
            <div className="logos">
              {sponsors.map((s) => (
                <a
                  key={s.href}
                  className="logo"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={s.logo} alt={`${s.name} logo`} width={40} height={40} />
                  {s.name}
                </a>
              ))}
            </div>
          </div>
          <a
            className="become"
            href={site.newIssue}
            target="_blank"
            rel="noopener noreferrer"
          >
            Become a sponsor →
          </a>
        </div>
      </div>
    </div>
  );
}
