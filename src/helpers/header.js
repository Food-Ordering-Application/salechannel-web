export function authHeader() {
  const accessToken = localStorage.getItem(`token`);
  if (accessToken) {
    return {'Authorization': 'Bearer ' + accessToken};
  } else {
    return {};
  }
}

export function getUserId() {
  return  localStorage.getItem(`id`);
}