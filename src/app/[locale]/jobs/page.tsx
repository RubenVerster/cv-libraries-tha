import { ValidLocale } from "@/i18n/config";
import JobsSearch from "@/components/JobsSearch";

export default function JobsPage({
  params,
  searchParams,
}: {
  params: { locale: ValidLocale };
  searchParams: { view?: string };
}) {
  const { locale } = params;
  const viewParam = searchParams.view;

  const view = viewParam || "location";

  return (
    <JobsSearch locale={locale} initialView={view as "location" | "industry"} />
  );
}
