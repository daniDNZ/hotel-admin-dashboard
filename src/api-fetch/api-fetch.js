/* eslint-disable quote-props */
import { toast } from 'react-toastify';
import fetch from 'cross-fetch';
import { HOST_DOMAIN } from '../.env';

export default async function apiFetch({ url, method, body = undefined }) {
  try {
    const AUTH_DATA = JSON.parse(localStorage.getItem('AUTH_DATA'));
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
      toast.error('Error 400');
      throw new Error('');
    }
    if (res.status >= 500) {
      toast.error('Server Error');
      throw new Error('');
    }

    const data = await res.json();

    return data;
  } catch (err) {
    return [];
  }
}
