//import fetch from 'node-fetch';
import { VARS } from '../config/vars';

const url = `${VARS.API_BASE_URL}/auth/verify-token`;

/**
 * It makes a request to a server with a token, and if the server responds with a 200 status code, it
 * resolves with an object containing a boolean and a promise.
 * @returns A promise that resolves to an object with two properties: isValid and dataPromise.
 */
export const isValidToken = token => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          resolve({ isValid: true, dataPromise: res.json() });
        } else {
          resolve({ isValid: false });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
