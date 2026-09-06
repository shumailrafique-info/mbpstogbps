"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SocialAuthButtons } from "./social-login/social-auth-buttons";

const SigninPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.5]" />
        <div className="pointer-events-none absolute -left-32 top-10 h-105 w-105 rounded-full bg-lime/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-105 w-105 rounded-full bg-lime/10 blur-[120px]" />

        <div className="relative mx-auto flex max-w-xl flex-col px-6 py-20 lg:py-28">
          {/* google button  */}
          <SocialAuthButtons
            className="w-full h-12!"
            redirect={redirect ?? "/admin"}
          />
          {/* bottom  */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            New ?{" "}
            <Link
              type="button"
              href={"/sign-up"}
              className="text-foreground underline-offset-4 transition-colors hover:text-lime hover:underline"
            >
              Start free
            </Link>
          </div>
          <div className="mt-4 text-center font-jetbrains-mono uppercase tracking-[0.12rem] text-[10px] text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              ← Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
