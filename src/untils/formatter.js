import moment from "moment-timezone";

const currencyFormatterObject = new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"});
const dateTimeFormatObject = new Intl.DateTimeFormat("vi-VN", {dateStyle: 'short', timeStyle: 'short'});
const dateFormatObject = new Intl.DateTimeFormat("vi-VN", {dateStyle: 'medium'});

export const currencyFormatter = (value) => {
  return `${currencyFormatterObject.format(value)}`;
};

export const datetimeFormatter = (value) => {
  return `${dateTimeFormatObject.format(value)}`;
};

export const dateFormatter = (value) => {
  try {
    return `${dateFormatObject.format(value)}`;
  } catch (e) {
    console.log(e);
    return ``;
  }
};

export const weekDayOfToday = () => {
  return moment().format(`dddd`);
};