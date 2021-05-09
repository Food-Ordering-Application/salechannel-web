const currencyFormatterObject = new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"});
const dateTimeFormatObject = new Intl.DateTimeFormat("vi-VN", {dateStyle: 'short', timeStyle: 'short'});

export const currencyFormatter = (value) => {
  return `${currencyFormatterObject.format(value)}`;
};

export const datetimeFormatter = (value) => {
  return `${dateTimeFormatObject.format(value)}`;
};