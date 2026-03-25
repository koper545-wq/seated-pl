import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const session = await auth();

    if (session?.user) {
      if ((session.user as { userType?: string }).userType !== "ADMIN") {
        redirect("/");
      }
    }
    // If no session, allow rendering for demo mode (client pages handle their own data)
  } catch {
    // Auth failed (e.g. no DB connection in demo mode) — allow rendering the admin shell
    console.warn("Admin layout: auth check failed, rendering shell for demo mode");
  }

  return <AdminShell>{children}</AdminShell>;
}
