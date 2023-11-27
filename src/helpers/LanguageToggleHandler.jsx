

export function languageToggleHandler( locale ,pathname, langCode) {

  if(langCode === locale) {
    return pathname
  }

  let correctedPathName;

  if (locale !== "de") {
    correctedPathName = pathname.slice(3)
  } else {
    correctedPathName = pathname
  }

  return `/${langCode}${correctedPathName}`

  
}

