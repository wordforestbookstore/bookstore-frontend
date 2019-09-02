import api from './apiservice'

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
    let msg = { status: 'error', message: '登录失败' };
    if (err.response) {
      if (err.response.data === 'Wrong password!') {
        msg.message = '用户名或密码错误';
      } else if (err.response.data === 'Username not exits!') {
        msg.message = '用户名不存在';
      }
    } else {
      msg.message = '服务器错误';
    }
    return msg;
  }
}

async function createRegister(obj) {
  try {
    let res = await api.post('/createregister', obj);
    return res.data;
  } catch(err) {
    let msg = { status: 'error', message: '提交失败' };
    if (err.response) {
      if (err.response.data === 'Your email has been registered') {
        msg.message = '您的邮箱已经被注册';
      } else if (err.response.data === 'Your username has been registered') {
        msg.message = '您的用户名已经被注册';
      }
    } else {
      msg.message = '服务器错误';
    }
    return msg;
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
    let msg = { status: 'error', message: '提交失败' };
    if (err.response) {
      if (err.response.data === 'Wrong CurrentPassword') {
        msg.message = '原密码错误';
      }
    } else {
      msg.message = '服务器错误';
    }
    return msg;
  }
}

async function createRecovery(email) {
  try {
    let res = await api.post('/createrecovery', { email });
    return res.data;
  } catch(err) {
    let msg = { status: 'error', message: '提交失败' };
    if (err.response) {
      if (err.response.data === 'This email is not exist') {
        msg.message = '邮箱不存在';
      }
    } else {
      msg.message = '服务器错误';
    }
    return msg;
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
    let msg = { status: 'error', message: '提交失败' };
    if (err.response) {
      if (err.response.data === 'Wrong CurrentPassword') {
        msg.message = '原密码错误';
      }
    } else {
      msg.message = '服务器错误';
    }
    return msg;
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