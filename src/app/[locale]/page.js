import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/navigation";

export default function Home({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);

  return <>{children}</>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
