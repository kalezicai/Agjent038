import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agjent038",
};

export default function RootPage() {
  redirect("/sq");
}
