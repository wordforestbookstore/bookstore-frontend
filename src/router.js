import Vue from 'vue'
import Router from 'vue-router'

import { checkLogin } from './common/userservice'
import { hasOwn } from './util'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['./components/index.vue'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/hours',
      component: resolve => require(['./components/info.vue'], resolve),
      meta: {
        title: '实体店信息'
      }
    },
    {
      path: '/faq',
      component: resolve => require(['./components/faq.vue'], resolve),
      meta: {
        title: 'FAQ'
      }
    },
    {
      path: '/user',
      component: resolve => require(['./userview/user.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['./userview/index.vue'], resolve),
          beforeEnter(to, from, next) {
            if (checkLogin()) {
              next();
            } else {
              next('/');
            }
          },
          children: [
            {
              path: '/',
              redirect: 'edit'
            },
            {
              path: 'edit',
              component: resolve => require(['./userview/forms/useredit.vue'], resolve),
              meta: {
                title: '编辑信息'
              }
            },
            {
              path: 'orders',
              component: resolve => require(['./userview/orders/index.vue'], resolve),
              meta: {
                title: '用户订单'
              }
            },
            {
              path: 'billings',
              component: resolve => require(['./userview/billings/index.vue'], resolve),
              children: [
                {
                  path: '',
                  component: resolve => require(['./userview/billings/list.vue'], resolve),
                  meta: {
                    title: '信用卡'
                  }
                },
                {
                  path: 'add',
                  component: resolve => require(['./userview/billings/add.vue'], resolve),
                  meta: {
                    title: '添加信用卡'
                  }
                },
                {
                  path: 'update',
                  component: resolve => require(['./userview/billings/add.vue'], resolve),
                  beforeEnter(to, from, next) {
                    if (hasOwn(to.query, 'id')) {
                      next();
                    } else {
                      next('/user/billings');
                    }
                  },
                  meta: {
                    title: '修改信用卡'
                  }
                }
              ]
            },
            {
              path: 'shipping',
              component: resolve => require(['./userview/shipping/index.vue'], resolve),
              children: [
                {
                  path: '',
                  component: resolve => require(['./userview/shipping/list.vue'], resolve),
                  meta: {
                    title: '邮寄地址'
                  }
                },
                {
                  path: 'add',
                  component: resolve => require(['./userview/shipping/add.vue'], resolve),
                  meta: {
                    title: '添加邮寄地址'
                  }
                },
                {
                  path: 'update'
                }
              ]
            }
          ]
        },
        {
          path: 'login',
          component: resolve => require(['./userview/login.vue'], resolve)
        }
      ],
      meta: {
        title: '账户'
      }
    },
    {
      path: '/newUser',
      component: resolve => require(['./userview/newuser.vue'], resolve)
    },
    {
      path: '/book',
      component: resolve => require(['./bookview/book.vue'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['./bookview/booklist.vue'], resolve),
          meta: {
            title: '书架'
          }
        },
        {
          path: 'bookInfo',
          component: resolve => require(['./bookview/bookinfo.vue'], resolve),
          beforeEnter: (to, from, next) => {
            if (hasOwn(to.query, 'id')) {
              next();
            } else {
              next('/book');
            }
          }
        }
      ]
    },
    {
      path: '/shoppingcart',
      component: resolve => require(['./userview/cart/shoppingcart.vue'], resolve),
      beforeEnter: (to, from, next) => {
        if (checkLogin()) {
          next();
        } else {
          next('/');
        }
      },
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: resolve => require(['./userview/cart/checkout.vue'], resolve),
      beforeEnter: (to, from, next) => {
        if (checkLogin() && hasOwn(to.params, 'items')) {
          next();
        } else {
          next('/');
        }
      },
      meta: {
        title: '创建订单'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (hasOwn(to, 'meta') && hasOwn(to.meta, 'title')) {
    document.title = to.meta.title + ' | 辞林书店';
  }
  next();
});

export default router;