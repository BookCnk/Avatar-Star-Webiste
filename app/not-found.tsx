import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-5">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">404 / Not found</p>
        <h1 className="mt-4 text-4xl font-semibold uppercase leading-none tracking-[-0.05em]">Nothing lives here.</h1>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center bg-primary px-5 text-xs font-semibold uppercase tracking-[0.14em] text-on-primary">
          Return home
        </Link>
      </div>
    </main>
  );
}
