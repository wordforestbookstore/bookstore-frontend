<template>
  <div class="head-picture">
    <v-row>
      <v-col align-self="center" cols="9">
        <h1 class="title">
          <span color="black">{{ this.title }}</span>
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
  </div>
</template>

<script>
export default {
  name: 'head-picture',
  data: () => ({

  }),
  props: [
    'title'
  ]
}
</script>

<style>
.head-picture .title {
  text-align: center;
}
.head-picture .title>span {
  display: inline-block;
  padding: 0.3em 1em;
  color: white;
  background-color: black;
}
.head-picture .line {
  width: 100%;
  height: 0.5em;
  background-color: black;
}
</style>