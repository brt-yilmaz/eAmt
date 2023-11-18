import { NextIntlClientProvider, useMessages } from 'next-intl';
import { useLocale } from "next-intl";

function CustomNextIntClientProvider( { children }) {
  const locale = useLocale();

  const messages = useMessages();
  return (

      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >

        {children}
      </NextIntlClientProvider>
  );
}

export default CustomNextIntClientProvider;
