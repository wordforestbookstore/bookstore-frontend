<template>
  <v-app style="background-color:white">
    <v-app-bar app dark>
      <v-toolbar-title class="headline">
        <router-link class="white--text" to="/">辞林书店</router-link>
      </v-toolbar-title>
      <v-menu offset-y open-on-hover class="ml-5">
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">菜单</v-btn>
        </template>
        <v-list>
          <v-list-item key="add" to="/book">
            <v-list-item-title>浏览书架</v-list-item-title>
          </v-list-item>
          <v-list-item key="list" to="/hours">
            <v-list-item-title>实体店信息</v-list-item-title>
          </v-list-item>
          <v-list-item key="faq" to="/faq">
            <v-list-item-title>FAQ</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
      <v-row class="ml-1">
        <v-col md="6">
          <v-text-field v-model="search" @keydown.enter="goSearch"
            light rounded solo clearable hide-details single-line>
            <template v-slot:prepend-inner>
              <v-icon>search</v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
      <v-btn v-if="user" text to="/shoppingcart">
        <span>购物车</span>
      </v-btn>
      <v-btn v-if="!user" text to="/user/login">
        <span>登录</span>
      </v-btn>
      <v-menu v-else offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">我的账户</v-btn>
        </template>
        <v-list>
          <v-list-item key="profile" to="/user">
            <v-list-item-title>账户信息</v-list-item-title>
          </v-list-item>
          <v-list-item key="logout" @click="logout">
            <v-list-item-title>退出</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer dark>
      <v-container fluid>
        <v-row>
          <v-col class="pb-0" cols="2">
            <v-img class="mb-1" src="./assets/logo.png"></v-img>
            <div>辞林书店。</div>
            <div>真诚地服务每一位顾客。</div>
          </v-col>
          <v-col class="pb-0" cols="4">
            <h2 class="mb-4">联系方式</h2>
            <p>
              <div><v-icon>home</v-icon> 江苏省，南京市，玄武区</div>
              <div class="ml-4 pl-3">孝陵卫街道 200 号，南京理工大学</div>
            </p>
            <p><v-icon>phone</v-icon> 固定电话：+ 1 999 999 999</p>
            <p><v-icon>email</v-icon> 邮箱：<a style="color: white" href="mailto:info@lebookstore.com">info@lebookstore.com</a></p>
          </v-col>
          <v-col class="pb-0" cols="3">
            <h2 class="mb-4">相关链接</h2>
            <p><a href="#" style="color: #BDBDBD">隐私条款</a></p>
            <p><a href="#" style="color: #BDBDBD">条款</a></p>
            <p><a href="#" style="color: #BDBDBD">常见问题</a></p>
          </v-col>
          <v-col class="pb-0" cols="3">
            <h2 class="mb-4">营业时间</h2>
            <p>周一至周六：上午 9 点至下午 11 点</p>
            <p>周日：上午 10 点至下午 10 点</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-left">&copy; 2017 - All Rights Reserved</v-col>
          <v-col align-self="end" class="text-right">
            <a href="#" style="color: white">关于我们</a>
            <span class="no-select mx-2">/</span>
            <a href="#" style="color: white">博客</a>
            <span class="no-select mx-2">/</span>
            <a href="#" style="color: white">FAQ</a>
            <span class="no-select mx-2">/</span>
            <a href="#" style="color: white">联系我们</a>
            <span class="no-select mx-2">/</span>
            <a href="#" style="color: white">网站地图</a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { cookieLogin, checkLogin, getUser, userLogout } from './common/userservice'
import { hasOwn } from './util'

export default {
  name: 'App',
  components: {

  },
  data: () => ({
    search: '',
    user: null
  }),
  methods: {
    logout() {
      this.user = null;
      userLogout();
      this.$router.push('/');
    },
    goSearch() {
      this.$router.push({
        path: '/book',
        query: {
          search: this.search
        }
      });
    }
  },
  async created() {
    let res = await cookieLogin();
    if (!hasOwn(res, 'status')) {
      this.user = res;
    }
  },
  updated() {
    if (this.user === null && checkLogin()) {
      this.user = getUser();
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
.no-select {
  user-select: none;
}
</style>