import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/navigation";
import { SWRProvider } from "../swr-provider";
import { ThemeProvider } from "@/components/theme-provider";
function Home({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <SWRProvider>
      {children}

    </SWRProvider>

  )

}

export default Home

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
