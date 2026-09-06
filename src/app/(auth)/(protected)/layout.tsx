"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/ui/loader";
import { useAuth } from "@/lib/auth/hooks/use-auth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, isPending } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (!isPending && session?.user) {
      const isSafeRedirect = redirect && /^\/(?!\/)/.test(redirect);
      if (isSafeRedirect) {
        router.replace(redirect);
      } else if (session.user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    }
  }, [session, isPending, redirect, router]);

  if (isPending || session?.user) {
    return <Loader className="" />;
  }

  return <>{children}</>;
}
