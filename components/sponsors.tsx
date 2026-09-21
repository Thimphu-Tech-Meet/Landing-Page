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
          {/* Sponsorship enquiries go straight to the organiser's inbox for now. */}
          <a
            className="become"
            href={`mailto:${site.email}?subject=${encodeURIComponent("Sponsoring Thimphu Tech Meet")}`}
          >
            Become a sponsor →
          </a>
        </div>
      </div>
    </div>
  );
}
