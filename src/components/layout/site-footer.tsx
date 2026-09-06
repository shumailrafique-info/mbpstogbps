import Link from "next/link";
import { FONT_GENERATORS, TEXT_GENERATORS } from "@/lib/navigation";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from "./social-icons";

const SITE_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blogs", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Condition", href: "/terms-and-conditions" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/genzfonts/",
    Icon: InstagramIcon,
  },
  { label: "X", href: "https://x.com/Genzfonts", Icon: XIcon },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@infoGenzfont",
    Icon: YouTubeIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/genzfontgenerator",
    Icon: FacebookIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/genzfonts-generator/",
    Icon: LinkedInIcon,
  },
];

const columnHeading =
  "mb-3 text-[11px] font-semibold tracking-[0.08em] text-blue-700 uppercase";
const columnLink =
  "inline-block py-1 text-sm text-slate-700 transition-colors hover:text-blue-700";

export function SiteFooter() {
  const textPicks = TEXT_GENERATORS.slice(0, 6);
  const fontPicks = FONT_GENERATORS.slice(0, 5);

  return (
    <footer className="mt-24 border-t-2 border-blue-600/70 bg-[#EFF6FF]">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight text-blue-950"
            >
              <span className="font-preview grid size-7 place-items-center rounded bg-blue-600 text-[13px] leading-none text-white">
                &#120126;
              </span>
              <span>
                Gen <span className="text-primary">Z</span> Font Generator
              </span>
            </Link>

            <p className="mt-3.5 max-w-[38ch] text-sm leading-relaxed text-slate-600">
              Turn plain text into hundreds of stylish Unicode fonts. Type once,
              copy the style you like, and paste it anywhere - free, and with
              nothing to install.
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
                    className="grid size-8 place-items-center rounded border border-blue-200 bg-white text-blue-700 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-text" className="md:col-span-3">
            <h2 id="footer-text" className={columnHeading}>
              Famous gaming name generators
            </h2>
            <ul className="-my-1">
              {textPicks.map((item) => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}`} className={columnLink}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-font" className="md:col-span-3">
            <h2 id="footer-font" className={columnHeading}>
              Popular social names generators
            </h2>
            <ul className="-my-1">
              {[
                ...fontPicks,
                {
                  slug: "facebook-font",
                  name: "Facebook Font Generator",
                  icon: "f",
                  group: "font",
                  popular: true,
                },
              ].map((item) => (
                <li key={item.slug}>
                  <Link href={`/${item.slug}`} className={columnLink}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-site" className="md:col-span-2">
            <h2 id="footer-site" className={columnHeading}>
              Popular Pages
            </h2>
            <ul className="-my-1">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={columnLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-blue-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-[13px] text-slate-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Gen Z Font Generator. All rights
            reserved.
          </p>
          <p>Free Unicode text styling for everyone.</p>
        </div>
      </div>
    </footer>
  );
}
