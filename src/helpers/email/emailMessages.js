export function createVerifyEmailTemplate(hashedToken, locale) {
  const domain = process.env.DOMAIN;
  let template = "";

  if (locale === "en") {
    template = `<p>Click <a href="${domain}/dashboard/verifyEmail?token=${hashedToken}">here</a> to verify your email.
      or copy and paste the link below in your browser. <br> ${domain}/dashboard/verifyEmail?token=${hashedToken}
    </p>`;
  } else if (locale === "tr") {
    template = `<p>E-postanızı doğrulamak için <a href="${domain}/dashboard/verifyEmail?token=${hashedToken}">buraya</a> tıklayın.
      veya aşağıdaki bağlantıyı tarayıcınıza kopyalayın ve yapıştırın. <br> ${domain}/dashboard/verifyEmail?token=${hashedToken}
    </p>`;
  } else if (locale === "uk") {
    template = `<p>Натисніть <a href="${domain}/dashboard/verifyEmail?token=${hashedToken}">тут</a>, щоб підтвердити свою електронну адресу.
      або скопіюйте та вставте посилання нижче у свій браузер. <br> ${domain}/dashboard/verifyEmail?token=${hashedToken}
    </p>`;
  } else {
    template = `<p>Klicken Sie <a href="${domain}/dashboard/verifyEmail?token=${hashedToken}">hier</a>, um Ihre E-Mail zu verifizieren.
      oder kopieren Sie den folgenden Link und fügen Sie ihn in Ihren Browser ein. <br> ${domain}/dashboard/verifyEmail?token=${hashedToken}
    </p>`;
  }

  return template;
}
export function createAmtEmailTemplate(name, taxId, eamtCode, locale) {
  let template = "";

  if (locale === "en") {
    template = `Dear Employee, Please note the following eAmt code for the individual named ${name} with the tax ID ${taxId}: eAmt Code: ${eamtCode}. Best regards, eAmt Support Team`;
  } else if (locale === "tr") {
    template = `Sayın Çalışan, Lütfen şu eAmt kodunu dikkate alın, adı ${name}, vergi kimlik numarası ${taxId}: eAmt Kodu: ${eamtCode}. Saygılarımla, eAmt Destek Ekibi`;
  } else if (locale === "uk") {
    template = `Шановний працівнику, Зверніть увагу на наступний код eAmt для особи на ім'я ${name} із податковим ідентифікатором ${taxId}: eAmt-код: ${eamtCode}. З найкращими побажаннями, Команда підтримки eAmt`;
  } else {
    template = `Liebe Mitarbeiterin, lieber Mitarbeiter, bitte beachten Sie den folgenden eAmt-Code für die Person namens ${name} mit der Steueridentifikationsnummer ${taxId}: eAmt-Code: ${eamtCode}. Mit freundlichen Grüßen, Ihr eAmt Support Team`;
  }

  return template;
}

export function createSubject(emailType, locale) {
  if (locale === "en") {
    if (emailType === "VERIFY") {
      return "Verify your email";
    } else if (emailType === "AMTCODE") {
      return "e-Amt Support Team";
    } else if (emailType === "RESET") {
      return "Reset your password";
    }
  } else if (locale === "tr") {
    if (emailType === "VERIFY") {
      return "E-postanızı doğrulayın";
    } else if (emailType === "AMTCODE") {
      return "e-Amt Destek Ekibi";
    } else if (emailType === "RESET") {
      return "Şifrenizi sıfırlayın";
    }
  } else if (locale === "uk") {
    if (emailType === "VERIFY") {
      return "Підтвердіть свою електронну адресу";
    } else if (emailType === "AMTCODE") {
      return "Команда підтримки e-Amt";
    } else if (emailType === "RESET") {
      return "Скидання вашого пароля";
    }
  } else {
    if (emailType === "VERIFY") {
      return "Bestätigen Sie Ihre E-Mail";
    } else if (emailType === "AMTCODE") {
      return "e-Amt Support Team";
    } else if (emailType === "RESET") {
      return "Setzen Sie Ihr Passwort zurück";
    }
  }
}