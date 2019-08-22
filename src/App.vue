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
          <v-list-item key="add" to="/book/add">
            <v-list-item-title>浏览书架</v-list-item-title>
          </v-list-item>
          <v-list-item key="list" to="/book/bookList">
            <v-list-item-title>实体店信息</v-list-item-title>
          </v-list-item>
          <v-list-item key="faq" to="/book/bookList">
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
      <v-btn text to="/login">
        <span>登录</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer dark absolute>
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
export default {
  name: 'App',
  components: {

  },
  data: () => ({
    search: '',
  }),
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