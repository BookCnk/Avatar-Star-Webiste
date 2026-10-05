import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getCurrentUser } from "@/server/auth";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <>
      <SiteHeader user={user} />
      <div className="flex-1">{children}</div>
      <footer id="contact" className="border-t border-border bg-background">
        <div className="flex flex-col gap-4 px-5 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 LinkFlow. Made for your everyday.</p>
          <nav aria-label="Footer navigation" className="flex gap-5">
            <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
            <Link href="/login" className="hover:text-foreground">Sign in</Link>
            <a href="mailto:hello@example.com" className="hover:text-foreground">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
