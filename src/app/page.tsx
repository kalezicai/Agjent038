import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agjent038",
};

export default function RootPage() {
  return (
    <main className="shell relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <meta httpEquiv="refresh" content="0; url=/sq" />
      <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
        Redirecting to <a href="/sq" className="text-gold underline">agjent038.com</a>&hellip;
      </p>
    </main>
  );
}
