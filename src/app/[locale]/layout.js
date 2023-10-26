import Header from "@/components/header/Header";
import "../globals.css";
import StoreProvider from "@/stores/StoreProvider";
import { store } from "@/stores/store";
import { login } from "@/stores/userSlice";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const locales = ["de", "en"];

export default async function LocaleLayout({ children }) {
  const locale = useLocale();
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  await store.dispatch(login({ id: 1, name: "Dirk or Rick" }));
  const user = await store.getState().user;

  return (
    <html lang={locale}>
      <body
        className={
          "min-h-screen w-[100vw] flex flex-col justify-between bg-bgBase "
        }
      >
        <StoreProvider
          preloadedState={{
            user,
          }}
        >
          <Header />
          {children}
          <Footer />
        </StoreProvider>

      </body>
    </html>
  );
}
