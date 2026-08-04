import Link from "next/link";
import { Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-canvas">
      <div className="grid-paper radial-fade pointer-events-none absolute inset-0" />
      <div className="shell relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="font-display mt-6 max-w-xl text-3xl leading-tight md:text-5xl">
          This line is not connected.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
          The page you were looking for does not exist. Our receptionist,
          however, always answers.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy/20"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-navy/20 hover:bg-paper"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  );
}
