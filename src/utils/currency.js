/**
 * Backend int değerini para birimi koduna çeviren eşleme
 */
export const CURRENCY_CODE_MAP = {
  0: "TL",
  1: "USD",
  2: "EUR",
  3: "GBP",
};

/**
 * int veya string currency değerini para birimi koduna çevirir
 * @param {string|number} currency
 * @returns {string}
 */
export const getCurrencyCode = (currency) => {
  if (typeof currency === "number") {
    return CURRENCY_CODE_MAP[currency] || "TL";
  }
  if (typeof currency === "string" && !isNaN(currency)) {
    // string olarak gelen int
    return CURRENCY_CODE_MAP[Number(currency)] || "TL";
  }
  return currency?.toString().toUpperCase() || "TL";
};
/**
 * Para birimi sembolleri
 */
export const CURRENCY_SYMBOLS = {
  TL: "₺",
  TRY: "₺",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
  RUB: "₽",
  CHF: "Fr",
  CAD: "C$",
  AUD: "A$",
  KRW: "₩",
  INR: "₹",
  BRL: "R$",
  MXN: "Mex$",
  ZAR: "R",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  PLN: "zł",
};

/**
 * Para birimi kodu veya adından sembol döndürür
 * @param {string} currency - Para birimi kodu/adı
 * @returns {string} Para birimi sembolü
 */
export const getCurrencySymbol = (currency) => {
  const code = getCurrencyCode(currency);
  return CURRENCY_SYMBOLS[code] || code;
};

/**
 * Farklı para birimleri için önceden tanımlanmış formatlar
 */
export const CURRENCY_FORMATS = {
  TL: { locale: "tr-TR", symbol: "₺" },
  TRY: { locale: "tr-TR", symbol: "₺" },
  USD: { locale: "en-US", symbol: "$" },
  EUR: { locale: "de-DE", symbol: "€" },
  GBP: { locale: "en-GB", symbol: "£" },
  JPY: { locale: "ja-JP", symbol: "¥" },
  CNY: { locale: "zh-CN", symbol: "¥" },
  RUB: { locale: "ru-RU", symbol: "₽" },
  CHF: { locale: "de-CH", symbol: "Fr" },
  CAD: { locale: "en-CA", symbol: "C$" },
  AUD: { locale: "en-AU", symbol: "A$" },
  KRW: { locale: "ko-KR", symbol: "₩" },
  INR: { locale: "en-IN", symbol: "₹" },
  BRL: { locale: "pt-BR", symbol: "R$" },
  MXN: { locale: "es-MX", symbol: "Mex$" },
  ZAR: { locale: "en-ZA", symbol: "R" },
  SEK: { locale: "sv-SE", symbol: "kr" },
  NOK: { locale: "nb-NO", symbol: "kr" },
  DKK: { locale: "da-DK", symbol: "kr" },
  PLN: { locale: "pl-PL", symbol: "zł" },
};

/**
 * Sayıyı para birimi formatında döndürür
 */
export const formatCurrency = (amount, currency = 0, options = {}) => {
  const {
    locale = "tr-TR",
    showCurrency = true,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    useSymbol = true,
  } = options;

  let actualAmount = amount;
  let actualCurrency = currency;

  if (typeof amount === "object" && amount !== null) {
    actualAmount = amount.amount;
    if (amount.currency !== undefined) {
      actualCurrency = amount.currency;
    }
  }

  if (actualAmount == null || actualAmount === "") {
    actualAmount = 0;
  }

  let numericValue;
  if (typeof actualAmount === "string") {
    const cleanAmount = actualAmount.replace(/[^\d.,\-]/g, "");
    numericValue = parseFloat(cleanAmount);
  } else {
    numericValue = Number(actualAmount);
  }

  if (isNaN(numericValue)) {
    numericValue = 0;
  }

  // currency int ise kodunu bul
  const currencyCode = getCurrencyCode(actualCurrency);
  // locale'yi koddan al
  const currencyFormat = CURRENCY_FORMATS[currencyCode];
  const usedLocale = currencyFormat?.locale || locale;

  const formatted = new Intl.NumberFormat(usedLocale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numericValue);

  if (!showCurrency) {
    return formatted;
  }

  const currencyDisplay = useSymbol
    ? getCurrencySymbol(currencyCode)
    : currencyCode;

  if (currencyCode === "TL" || currencyCode === "TRY") {
    return `${formatted}${currencyDisplay}`;
  } else {
    return `${currencyDisplay}${formatted}`;
  }
};

/**
 * Sadece sayı formatlama (para birimi olmadan)
 */
export const formatNumber = (amount, locale = "tr-TR") => {
  return formatCurrency(amount, "", { locale, showCurrency: false });
};

/**
 * Formatlanmış para string'inden sayısal değeri çıkartır
 */
export const parseCurrency = (formattedAmount) => {
  if (typeof formattedAmount !== "string") {
    return Number(formattedAmount) || 0;
  }

  const cleaned = formattedAmount
    .replace(/[^\d.,\-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return parseFloat(cleaned) || 0;
};

/**
 * Para birimi koduna göre formatlama
 */
export const formatCurrencyByCode = (amount, currency = 0) => {
  const code = getCurrencyCode(currency);
  const currencyConfig = CURRENCY_FORMATS[code];

  if (!currencyConfig) {
    console.warn(`Desteklenmeyen para birimi: ${currency}. TL kullanılıyor.`);
    return formatCurrency(amount, 0);
  }

  return formatCurrency(amount, code, {
    locale: currencyConfig.locale,
    useSymbol: true,
  });
};
