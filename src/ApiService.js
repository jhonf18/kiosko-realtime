import { VARS } from './config/vars';

export class ApiService {
  async dataFetching({ token, url, method, data }) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  async createOrder(token, order) {
    const result = await this.dataFetching({
      token,
      url: `${VARS.API_BASE_URL}/managment-orders/orders/create-order`,
      method: 'POST',
      data: order
    });
    return result;
  }

  async deleteOrder(toke, orderID) {}
}
