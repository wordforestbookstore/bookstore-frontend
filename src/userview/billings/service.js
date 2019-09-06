import api, { getErrorResponse } from '../../common/apiservice'

export async function getBillingsList() {
  try {
    let { data } = await api.get('/CreditCard', {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

export async function getBilling(id) {
  try {
    let { data } = await api.get(`/CreditCard/${id}`, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

export async function updateDefault(id) {
  try {
    let { data } = await api.put(`/updateDefault/${id}`, {}, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

export async function addBilling(obj) {
  try {
    let { data } = await api.post('/addCreditCard', obj, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

export async function updateBilling(id, obj) {
  try {
    let { data } = await api.put(`/CreditCard/${id}`, obj, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }  
}

export async function deleteBilling(id) {
  try {
    let { data } = await api.delete(`/CreditCard/${id}`, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}