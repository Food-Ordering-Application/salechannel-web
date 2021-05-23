const emailRegex = `^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`;

export function emailValidator(email) {
  if (email && email.length > 0) {
    if (email.match(emailRegex)) {
      return true;
    }
    throw new Error(`Không phải email hợp lệ`);
  } else {
    throw new Error(`Nhập email đi bạn ơi`);
  }
}