import api from './apiservice'

export async function getBookList(l, r, category=null) {
  try {
    let res = await api.get('/booklist', {  
      params: { 
        l, 
        r, 
        cookie: api.getCookie('login'),
        category
      }
    });
    return res.data;
  } catch(err) {
    return { status: 'error' }
  }
}

export async function getBookInfo(id) {
  try {
    let res = await api.get(`/book/${id}`, {
      params: {
        cookie: api.getCookie('login')
      }
    });
    return res.data;
  } catch(err) {
    return { status: 'error' };
  }
}