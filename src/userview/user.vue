<template>
  <v-container id="user-index">
    <v-row>
      <v-col align-self="center" cols="9">
        <h1 class="title"><span color="black">用户账号</span></h1>
        <div class="line"></div>
      </v-col>
      <v-col cols="3">
        <v-img src="../assets/logo.png"></v-img>
      </v-col>
    </v-row>
    <v-row class="mb-5">
      <v-img max-height="8em" src="../assets/wood.png"></v-img>
    </v-row>

    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  name: 'userIndex',
  data: () => ({

  }),
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