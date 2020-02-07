export const API_URL = process.env.GATSBY_API_URL;

export default async function request(endpoint, params) {
  const response = await fetch(API_URL + endpoint, params);
  const data = await response.json();
  return data;
}

export async function post(endpoint, data) {
  return request(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
