import { redirect } from "next/navigation";
import { ValidLocale } from "@/i18n/config";

export default function Home(props: { params: { locale: ValidLocale } }) {
  // Extract locale to avoid direct property access
  const locale = props.params.locale;

  // Redirect to the jobs page
  redirect(`/${locale}/jobs`);
}
