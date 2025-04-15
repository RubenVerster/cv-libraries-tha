import { redirect } from "next/navigation";
import { ValidLocale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: ValidLocale }>;
}) {
  // Extract locale to avoid direct property access
  const { locale } = await params;

  // Redirect to the jobs page
  redirect(`/${locale}/jobs`);
}
