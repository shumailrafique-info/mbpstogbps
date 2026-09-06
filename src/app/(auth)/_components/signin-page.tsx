"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Brand } from "@/components/layout/brand";
import { SocialAuthButtons } from "./social-login/social-auth-buttons";

const SigninPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16">
      <div
        aria-hidden
        className="signal-grid pointer-events-none absolute inset-0"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Brand />
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-center text-xl font-semibold tracking-tight text-foreground">
            Sign in
          </h1>
          <p className="mt-1.5 text-center text-[13px] text-muted-foreground">
            Dashboard access is limited to site administrators.
          </p>

          <SocialAuthButtons
            className="mt-6 h-11! w-full"
            redirect={redirect ?? "/admin"}
          />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        <p className="mt-5 text-center font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
          <Link href="/" className="transition-colors hover:text-foreground">
            &larr; Back to home
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SigninPage;
