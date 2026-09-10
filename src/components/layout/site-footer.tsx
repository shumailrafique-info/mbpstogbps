import Link from "next/link";
import { CALCULATOR_TOOLS, CONVERTER_TOOLS } from "@/lib/navigation";
import { Brand } from "./brand";
import {
  FacebookIcon,
  LinkedInIcon,
  // Restore alongside their SOCIAL_LINKS entries below.
  // InstagramIcon,
  // XIcon,
  // YouTubeIcon,
} from "./social-icons";

const SITE_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

/**
 * Only the profiles that exist today are linked. The rest are kept here rather
 * than deleted so they can be switched back on with their icon import once the
 * accounts are live.
 */
const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/mbpstogbps",
    Icon: FacebookIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mbps-to-gbps/",
    Icon: LinkedInIcon,
  },
  // {
  //   label: "Instagram",
  //   href: "https://www.instagram.com/mbpstogbps/",
  //   Icon: InstagramIcon,
  // },
  // { label: "X", href: "https://x.com/mbpstogbps", Icon: XIcon },
  // {
  //   label: "YouTube",
  //   href: "https://www.youtube.com/@mbpstogbps",
  //   Icon: YouTubeIcon,
  // },
];

const COLUMN_HEADING =
  "mb-3 font-mono text-[11px] font-semibold tracking-[0.12em] text-primary uppercase";
const COLUMN_LINK =
  "inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-accent/40">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Brand />

            <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
              Straight answers about internet speed. Convert between megabits,
              gigabits and megabytes, then work out what those numbers mean for
              a download, a stream or a whole household.
            </p>

            <ul className="mt-5 flex flex-wrap items-center gap-1.5">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid size-8 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-converters" className="md:col-span-3">
            <h2 id="footer-converters" className={COLUMN_HEADING}>
              Converters
            </h2>
            <ul className="-my-1">
              {CONVERTER_TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link href={tool.path} className={COLUMN_LINK}>
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-calculators" className="md:col-span-3">
            <h2 id="footer-calculators" className={COLUMN_HEADING}>
              Calculators
            </h2>
            <ul className="-my-1">
              {CALCULATOR_TOOLS.map((tool) => (
                <li key={tool.slug}>
                  <Link href={tool.path} className={COLUMN_LINK}>
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-site" className="md:col-span-2">
            <h2 id="footer-site" className={COLUMN_HEADING}>
              Site
            </h2>
            <ul className="-my-1">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={COLUMN_LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-[13px] text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} MbpsToGbps. All rights reserved.
          </p>
          <p className="font-mono">1 Gbps = 1,000 Mbps = 125 MB/s</p>
        </div>
      </div>
    </footer>
  );
}
