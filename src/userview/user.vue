<template>
  <v-container id="user-index">
    <v-row>
      <v-col align-self="center" cols="9">
        <h1 class="title">
          <span color="black">{{ this.user ? this.user.firstName + '老板' : '用户账户' }}</span>
        </h1>
        <div class="line"></div>
      </v-col>
      <v-col cols="3">
        <v-img src="../assets/logo.png"></v-img>
      </v-col>
    </v-row>
    <v-row class="mb-5">
      <v-col>
        <v-img max-height="8em" src="../assets/wood.png"></v-img>
      </v-col>
    </v-row>

    <router-view></router-view>
  </v-container>
</template>

<script>
import { checkLogin, getUser } from '../common/userservice'

export default {
  name: 'userIndex',
  data: () => ({
    user: null
  }),
  created() {
    document.title = '账户 - 辞林书店';
    if (checkLogin()) {
      this.user = getUser();
    }
  }
}
</script>

<style>
#user-index .title {
  text-align: center;
}
#user-index .title>span {
  display: inline-block;
  padding: 0.3em 1em;
  color: white;
  background-color: black;
}
#user-index .line {
  width: 100%;
  height: 0.5em;
  background-color: black;
}
</style>