import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/navigation";
import { SWRConfig } from "swr";

export default function Home({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      {children}
    </SWRConfig>
  )

}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
