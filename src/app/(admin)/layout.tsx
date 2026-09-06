import { redirect } from "next/navigation";
import { ensureAuthenticatedUser } from "@/lib/auth/guards";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const guard = await ensureAuthenticatedUser();

  if (!guard?.session) {
    redirect("/sign-in");
  }

  if (guard.session.user.role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
}
