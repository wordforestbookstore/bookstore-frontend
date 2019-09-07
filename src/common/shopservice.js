import api, { getErrorResponse } from './apiservice'

export async function addShoppingCart(id, num=1) {
  try {
    let { data } = await api.post(`/shopping/${id}`, {}, {
      params: {
        cookie: api.getCookie('login'),
        num
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

export async function delShoppingCart(id, num=1) {
  try {
    let { data } = await api.delete(`/cart/${id}`, {
      params: {
        cookie: api.getCookie('login'),
        num
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

export async function getShoppingCartList() {
  try {
    let { data } = await api.get('/cart', {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

let flag = false;
export async function userCheckout(obj) {
  if (flag) return getErrorResponse(null);
  try {
    flag = true;
    let { data } = await api.post('/Order', obj, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    flag = false;
    return data;
  } catch(err) {
    flag = false;
    return getErrorResponse(err.response);
  }
}

export async function getOrdersList() {
  try {
    let { data } = await api.get('/Order', {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

export async function getOrder(id) {
  try {
    let { data } = await api.get(`/Order/${id}`, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}