import api, { getErrorResponse } from './apiservice'

let user = null;

let once = false;
async function cookieLogin() {
  if (api.isKey('login')) {
    if (once) {
      if (user) return user;
      else return { status: 'error' };
    }
    once = true;
    try {
      let res = await api.get('/login', {
        params: {
          cookie: api.getCookie('login'),
          admin: false
        }
      });
      return user = res.data;
    } catch(err) {
      api.removeCookie('login');
      return { status: 'error' };
    }
  } else {
    return { status: 'error' };
  }
}

async function userLogin(username, password) {
  try {
    let res = await api.post('/login', {
      username, password
    }, {
      params: {
        admin: false
      }
    });
    user = res.data.userInfo;
    api.setCookie('login', res.data.cookieID);
    return user;
  } catch(err) {
    api.removeCookie('login');
    return getErrorResponse(err.response);
  }
}

async function createRegister(obj) {
  try {
    let res = await api.post('/createregister', obj);
    return res.data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

async function userRegister(token, cpw, obj, url='/register') {
  try {
    await api.post(url, obj, {
      params: { 
        token: token,
        currentPassword: cpw 
      }
    });
    let res = await api.post('/login', {
      username: obj.username, 
      password: obj.password
    }, {
      params: {
        admin: false
      }
    });
    user = res.data.userInfo;
    api.setCookie('login', res.data.cookieID);
    return user;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

async function createRecovery(email) {
  try {
    let res = await api.post('/createrecovery', { email });
    return res.data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

async function editUser(cpw, obj) {
  try {
    let res = await api.put('/edit', obj, {
      params: {
        currentPassword: cpw,
        cookie: api.getCookie('login')
      }
    });
    user = obj;
    return res.data;
  } catch(err) {
    return getErrorResponse(err.response);
  }
}

function checkLogin() {
  return !!user;
}

function getUser() {
  return user;
}

function userLogout() {
  api.post('/logout', {}, {
    params: { cookie: api.getCookie('login') }
  }).catch(() => {});
  user = null;
  once = false;
  api.removeCookie('login');
  return true;
}

export {
  cookieLogin,
  userLogin,
  createRegister,
  userRegister,
  createRecovery,
  editUser,
  checkLogin,
  getUser,
  userLogout
};