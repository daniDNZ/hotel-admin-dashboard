/* eslint-disable quote-props */
import fetch from 'cross-fetch';
import { HOST_DOMAIN } from '../.env';

export default async function apiFetch({ url, method, body = undefined }) {
  try {
    const AUTH_DATA = localStorage.getItem('AUTH_DATA');
    const options = {
      method,
      body: body ? JSON.stringify(body) : undefined,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_DATA !== null ? AUTH_DATA.token : ''}`,
      },
    };
    const res = await fetch(`${HOST_DOMAIN}${url}`, options);

    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }

    const data = await res.json();

    return data;
  } catch (err) {
    return err;
  }
}
