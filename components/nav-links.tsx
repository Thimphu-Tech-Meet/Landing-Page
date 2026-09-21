"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/ideas", label: "Ideas", also: ["/blog"] },
  { href: "/events", label: "Events", also: [] },
  { href: "/meetups", label: "Meetups", also: [] },
  { href: "/about", label: "About", also: [] },
  { href: "/contribute", label: "Contribute", also: [] },
];

/**
 * Main navigation. Marks the current section with aria-current so the
 * active pill style applies; /blog/* counts as the Ideas section.
 */
export function NavLinks() {
  const pathname = usePathname() ?? "/";

  return (
    <nav className="main" aria-label="Main">
      {links.map(({ href, label, also }) => {
        const active =
          pathname === href ||
          pathname.startsWith(`${href}/`) ||
          also.some((p) => pathname === p || pathname.startsWith(`${p}/`));
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
