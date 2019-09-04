<template>
<v-container>
  <v-row>
    <v-col cols="9">
      <v-carousel cycle height="275px">
        <v-carousel-item
          v-for="(item, i) in images"
          :key="i">
          <v-img :src="item"></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col cols="3" align-self="center">
      <v-img src="../assets/logo.png" max-height="275px"></v-img>
    </v-col>
  </v-row>
  <v-row><v-divider></v-divider></v-row>

</v-container>
</template>

<script>
export default {
  name: 'indexPage',
  data: () => ({
    images: [
      require('../assets/sports-q-c-1600-500-1.jpg'),
      require('../assets/sports-q-c-1600-500-2.jpg'),
      require('../assets/sports-q-c-1600-500-3.jpg')
    ],
    colors: [
      'primary',
      'secondary',
      'yellow darken-2',
      'red',
      'orange',
    ],
  })
}
</script>

<style>

</style>