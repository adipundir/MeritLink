import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="text-foreground/70">This page could not be found.</p>
      <Link
        href="/"
        className="text-sm text-foreground/70 underline transition hover:text-foreground"
      >
        Return home
      </Link>
    </div>
  );
}
