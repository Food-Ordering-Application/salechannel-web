export function authHeader() {
  // const accessToken = localStorage.getItem(`token`);
  // const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA5MzUxODUxMzEiLCJzdWIiOiJmYWQxYWMxYy03NDhiLTQ4YjItOWFlNS02YWYzNmI1ZWE2OTUiLCJpc0N1c3RvbWVyIjp0cnVlLCJpYXQiOjE2MTk4ODY2MTQsImV4cCI6MTYxOTk3MzAxNH0.2yLJ5mv964UVHIIWLIrmocRl8I_C-xV9Ibcac8L4_0A`;
const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA5MzUxMjM0NTYiLCJzdWIiOiI0OGQ1M2Q1OS02Njg1LTQzNTktYTk1YS0wNzkzNzMyZDBhOWQiLCJpc0N1c3RvbWVyIjp0cnVlLCJpYXQiOjE2MjAwMzI5OTAsImV4cCI6MTYyMTI0MjU5MH0.9PPBPSlnwh-mHRLCg732VsNb7A4cwbNGp_e31sEhbh0`;
  if (accessToken) {
    return {'Authorization': 'Bearer ' + accessToken};
  } else {
    return {};
  }
}