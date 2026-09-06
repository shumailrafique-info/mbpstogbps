/**
 * Content for the informational pages.
 *
 * These routes render nothing but their managed content, so an empty row here
 * means the page 404s. Legal copy is a starting template rather than advice -
 * have it reviewed before launch.
 */

import type { PageSeed } from "./page-content-seed-data";

export const PAGE_SEEDS_STATIC: PageSeed[] = [
  {
    slug: "about-us",
    title: "About MbpsToGbps",
    description:
      "A small set of tools that answer one question properly: what does this internet speed actually mean?",
    metaTitle: "About MbpsToGbps - Speed and Bandwidth Tools",
    metaDescription:
      "MbpsToGbps builds free, accurate converters and calculators for internet speed, bandwidth and data transfer.",
    lead: "MbpsToGbps exists because internet speed is quoted in units almost nobody has a feel for. A plan is sold in megabits, a download is measured in megabytes, a data cap is counted in gigabytes, and the relationship between the three is left as an exercise for the reader.",
    sections: [
      {
        heading: "What we build",
        paragraphs: [
          "Every tool here does one thing and shows its working. The converters handle the arithmetic between bits, bytes and metric prefixes. The calculators take it further and answer the question underneath: how long will this take, how much will it use, and what plan do I actually need.",
        ],
        list: [
          "Free to use, with no account and no limits",
          "No data leaves your browser - every calculation runs locally",
          "Decimal and binary units kept separate and clearly labelled",
          "Real-world overhead shown rather than hidden",
        ],
      },
      {
        heading: "How we pick our numbers",
        paragraphs: [
          "The reference figures behind the calculators - streaming bitrates, typical file sizes, per-activity bandwidth - come from providers' own published recommendations wherever one exists. Where it does not, we use a widely reported average and say so.",
          "None of them are guarantees. Real bitrates vary with content, real connections vary with the time of day, and every estimate here is a starting point you can edit.",
        ],
      },
      {
        heading: "Getting in touch",
        paragraphs: [
          "Corrections are welcome, particularly on the reference figures. If something here is wrong or out of date, tell us on the [contact page](/contact-us) and we will fix it.",
        ],
      },
    ],
  },
  {
    slug: "contact-us",
    title: "Contact Us",
    description:
      "Questions, corrections and suggestions for new tools are all welcome.",
    metaTitle: "Contact MbpsToGbps",
    metaDescription:
      "Get in touch with MbpsToGbps about corrections, suggestions or partnership enquiries.",
    lead: "We read everything that comes in, and corrections to the reference figures get priority over everything else.",
    sections: [
      {
        heading: "What to get in touch about",
        paragraphs: [
          "A short message with the page and the specific figure is far more useful than a general report, and it means the fix can go out the same day.",
        ],
        list: [
          "A number that looks wrong, with the page it is on",
          "A tool you expected to find here and did not",
          "A conversion that behaves oddly in your browser",
          "Partnership and advertising enquiries",
        ],
      },
      {
        heading: "What we cannot help with",
        paragraphs: [
          "We are not able to diagnose an individual connection, contact a provider on your behalf, or advise on which plan to buy in a particular area. The [internet speed calculator](/internet-speed-calculator) will give you a defensible number to take to a provider, which is usually the more useful step.",
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "What this site collects, what it does not, and how anything collected is handled.",
    metaTitle: "Privacy Policy - MbpsToGbps",
    metaDescription:
      "How MbpsToGbps handles data. Calculations run entirely in your browser and are never sent to a server.",
    lead: "Every calculation on this site runs in your browser. The numbers you type into a converter are never transmitted anywhere, never logged and never stored.",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "We use privacy-respecting analytics to understand which pages are used and where they fail. That covers page addresses, referrers, approximate region and general device type. It does not identify you, and it does not include anything you type into a tool.",
        ],
      },
      {
        heading: "Cookies and local storage",
        paragraphs: [
          "The site stores your light or dark theme preference in your browser so it survives a reload. That preference stays on your device and is not readable by us.",
        ],
      },
      {
        heading: "Third parties",
        paragraphs: [
          "Pages may embed content such as video from third-party services, which set their own cookies under their own policies. We do not sell or share personal information, because we do not collect any that could be sold.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          "If this policy changes, the updated version will appear on this page with a new date. Questions can go through the [contact page](/contact-us).",
        ],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    description: "The terms that apply to using this site and the tools on it.",
    metaTitle: "Terms and Conditions - MbpsToGbps",
    metaDescription:
      "Terms of use for MbpsToGbps, including accuracy, acceptable use and limitation of liability.",
    lead: "By using this site you accept these terms. They are deliberately short, and they exist mainly to set expectations about accuracy.",
    sections: [
      {
        heading: "Use of the tools",
        paragraphs: [
          "Everything here is free to use for personal and commercial purposes. You may quote our figures with attribution. You may not scrape the site at a rate that degrades it for others, or republish it wholesale as your own.",
        ],
      },
      {
        heading: "Accuracy",
        paragraphs: [
          "The conversions are exact arithmetic. The calculators are estimates built on published averages, and real results depend on your connection, your hardware and the server at the other end.",
          "Nothing here should be treated as a guarantee of performance or as the sole basis for a purchase. Check the figures against your own measurements before committing to a plan or a contract.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "The site is provided as is, without warranty of any kind. We are not liable for any loss arising from the use of these tools or reliance on their output.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "These terms may be updated from time to time, and the current version always appears on this page.",
        ],
      },
    ],
  },
];
