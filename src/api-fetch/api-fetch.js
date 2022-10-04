/* eslint-disable quote-props */
import fetch from 'cross-fetch';
import { HOST_DOMAIN } from '../.env';

export default async function apiFetch({ url, method, body = '' }) {
  try {
    const token = localStorage.getItem('mirandaToken');
    const options = {
      method,
      body: JSON.stringify(body),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
    const res = await fetch(`${HOST_DOMAIN}${url}`, options);

    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }

    const result = await res.json();

    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}
