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
          <v-text-field v-model="search" 
            light rounded solo clearable hide-details single-line>
            <template v-slot:prepend-inner>
              <v-icon>search</v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
      <v-btn v-if="user" text to="/cart">
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
      <v-row>
        <v-col class="text-left">&copy; 2017 - All Rights Reserved</v-col>
        <v-col align-self="end" class="text-right">
          <span>关于我们</span>
          <span class="no-select mx-2">/</span>
          <span>博客</span>
          <span class="no-select mx-2">/</span>
          <span>FAQ</span>
          <span class="no-select mx-2">/</span>
          <span>联系我们</span>
          <span class="no-select mx-2">/</span>
          <span>网站地图</span>
        </v-col>
      </v-row>
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