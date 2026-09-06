import Link from "next/link";
import { POPULAR_GENERATORS } from "@/lib/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-20">
      <p
        className="font-preview text-[32px] leading-none text-blue-300"
        aria-hidden
      >
        𝟜𝟘𝟜
      </p>
      <h1 className="mt-5 text-[26px] leading-[1.2] font-semibold tracking-tight text-blue-950 sm:text-[30px]">
        Page not found
      </h1>
      <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-slate-600">
        That address does not match any generator on the site. Try one of these
        instead.
      </p>

      <ul className="mt-7 flex flex-wrap gap-2">
        {POPULAR_GENERATORS.slice(0, 8).map((generator) => (
          <li key={generator.slug}>
            <Link
              href={`/${generator.slug}`}
              className="inline-flex rounded border border-blue-200 bg-white px-2.5 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              {generator.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-8 inline-flex rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Back to home
      </Link>
    </div>
  );
}
