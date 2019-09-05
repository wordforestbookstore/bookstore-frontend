import api, { getErrorResponse } from '../../common/apiservice'

export async function getAddressList() {
  try {
    let { data } = await api.get('/Shipping', {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

export async function getAddress(id) {
  try {
    let { data } = await api.get(`/Shipping/${id}`, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

export async function addAddress(obj) {
  try {
    let { data } = await api.post('/Shipping', obj, {
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
    let { data } = await api.put(`/ShippingDefault/${id}`, {}, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

export async function updateAddress(id, obj) {
  try {
    let { data } = await api.put(`/Shipping/${id}`, obj, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }  
}

export async function deleteAddress(id) {
  try {
    let { data } = await api.delete(`/Shipping/${id}`, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}