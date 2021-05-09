export function authHeader() {
const accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjA5MzUxODUxMzEiLCJzdWIiOiI4M2E5MDNlNi0zYjUxLTRlMjctYTk1MS0xZTliMGE5NjIxYzYiLCJpc0N1c3RvbWVyIjp0cnVlLCJpYXQiOjE2MjA1NTExNDcsImV4cCI6MTYyMTc2MDc0N30.r5Hg3z-A3fF_HZfFWzcMoVx6yrKlzjltHRvEjl3iGmQ`;
  if (accessToken) {
    return {'Authorization': 'Bearer ' + accessToken};
  } else {
    return {};
  }
}