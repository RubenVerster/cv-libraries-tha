import { ValidLocale } from "@/i18n/config";
import JobsSearch from "@/components/JobsSearch";

export default async function JobsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: ValidLocale }>;
  searchParams: Promise<{ view?: string }>;
}) {
  // Await the params and searchParams
  const { locale } = await params;
  const { view = "location" } = await searchParams;

  return (
    <JobsSearch locale={locale} initialView={view as "location" | "industry"} />
  );
}
