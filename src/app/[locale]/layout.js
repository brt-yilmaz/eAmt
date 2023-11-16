import "../globals.css";

import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const locales = ["de", "en"];

export default async function LocaleLayout({ children, params: { locale } }) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();


  unstable_setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body
        className={
          "min-h-screen w-[100vw] flex flex-col gap-10 bg-bgBase "
        }
      >

        {children}
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}




// import "../globals.css";
// import StoreProvider from "@/stores/StoreProvider";
// import { store } from "@/stores/store";
// import { login } from "@/stores/userSlice";
// import { useLocale } from "next-intl";
// import { notFound } from "next/navigation";
// import { unstable_setRequestLocale } from "next-intl/server";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// const locales = ["de", "en"];

// export default async function LocaleLayout({ children, params: { locale } }) {
//   const isValidLocale = locales.some((cur) => cur === locale);
//   if (!isValidLocale) notFound();

//   await store.dispatch(login({ id: 1, name: "Dirk or Rick" }));
//   const user = await store.getState().user;
//   unstable_setRequestLocale(locale);
//   return (
//     <html lang={locale}>
//       <body
//         className={
//           "min-h-screen w-[100vw] flex flex-col justify-between bg-bgBase "
//         }
//       >
//         <StoreProvider
//           preloadedState={{
//             user,
//           }}
//         >
//           {children}
//         </StoreProvider>
//       </body>
//     </html>
//   );
// }

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }
