const currencyFormatterObject = new Intl.NumberFormat("vi-VN",{style: "currency", currency: "VND"});

export const currencyFormatter = (value) => {
  return `${currencyFormatterObject.format(value)}`;
};