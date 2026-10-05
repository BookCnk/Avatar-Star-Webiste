import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <>
      <SiteHeader user={user} />
      <div className="flex-1">{children}</div>
    </>
  );
}
