import { Suspense } from "react";
import Loader from "@/components/ui/loader";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
