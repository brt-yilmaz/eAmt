export function createVerifyEmailTemplate(hashedToken, locale) {
  const domain = process.env.DOMAIN;
  let template = "";

  if (locale === "en") {
    template = `<p>Click <a href="${domain}/verifyemail?token=${hashedToken}">here</a> to verify your email.
      or copy and paste the link below in your browser. <br> ${domain}/verifyemail?token=${hashedToken}
    </p>`;
  } else {
    template = `<p>Klicken Sie <a href="${domain}/verifyemail?token=${hashedToken}">hier</a>, um Ihr E-Mail zu verifizieren.
      oder kopieren Sie den folgenden Link und fügen Sie ihn in Ihren Browser ein. <br> ${domain}/verifyemail?token=${hashedToken}
    </p>`;
  }

  return template;
}

export function createAmtEmailTemplate(name, taxId, eamtCode, locale) {
  let template = "";

  if (locale === "en") {
    template = `Dear Employee,Please note the following eAmt code for the individual named ${name} with the tax ID ${taxId}: eAmt Code: ${eamtCode}.
    Best regards,
    eAmt Support Team`;
  } else {
    template = `Sehr geehrter Mitarbeiter,
    bitte beachten Sie den folgenden Amtskode für die Person namens ${name} mit der Steuernummer ${taxId}: eAmt-Kode: ${eamtCode}.

    Mit freundlichen Grüßen,
    eAmt Support Team`;
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
  } else {
    if (emailType === "VERIFY") {
      return "E-Mail verifizieren";
    } else if (emailType === "AMTCODE") {
      return "e-Amt Support Team";
    } else if (emailType === "RESET") {
      return "Passwort zurücksetzen";
    }
  }
}
